#!/usr/bin/env python3
"""NOMAD Command Center server: the launcher pages, plus videos played straight out of the ZIM files.

    python3 serve.py [port]        (Start NOMAD.command runs this on 8090)

  /                     web/ on this drive (static files, with Range support)
  /guides/...           guides/ on this drive (also works on exFAT, where web/guides can't be a symlink)
  /zim/<book>/<path>    one entry from zim/<book>.zim, e.g. /zim/urban-prepper_en_all_2026-08/videos/<id>/video.webm

Videos sit in uncompressed ZIM clusters, so they stream (and seek) straight from the file. Small
compressed entries need zstd: built into Python 3.14+, else the `zstandard` package. Standard library
only; works on the stock macOS python3 and the portable Windows Python in windows/python.
Listens on 127.0.0.1 only.
"""
import http.server, lzma, os, re, socketserver, struct, sys, threading, urllib.parse
from functools import lru_cache

try:
    from compression import zstd as _zstd                      # Python 3.14+
    def unzstd(b): return _zstd.decompress(b)
except ImportError:
    try:
        import zstandard as _zs                                # pip install zstandard
        def unzstd(b): return _zs.ZstdDecompressor().decompressobj().decompress(b)
    except ImportError:
        unzstd = None

ROOT = os.path.dirname(os.path.abspath(__file__))
WEB, ZIMS, GUIDES = (os.path.join(ROOT, d) for d in ("web", "zim", "guides"))
# Set types here, not from the system: Windows takes them from the registry, which often has .js as text/plain.
TYPES = {".html": "text/html", ".htm": "text/html", ".js": "text/javascript", ".mjs": "text/javascript",
         ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
         ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif",
         ".pdf": "application/pdf", ".txt": "text/plain; charset=utf-8", ".csv": "text/csv; charset=utf-8",
         ".webm": "video/webm", ".mp4": "video/mp4", ".pbf": "application/x-protobuf", ".wasm": "application/wasm",
         ".woff2": "font/woff2", ".ico": "image/x-icon"}


class Zim:
    """Minimal read-only ZIM reader (format 5/6): path lookup and blob location."""

    def __init__(self, path):
        self.path, self.f, self.lock = path, open(path, "rb"), threading.Lock()
        h = self.read(0, 80)
        magic, self.major, _minor = struct.unpack_from("<IHH", h, 0)
        if magic != 72173914:
            raise ValueError("not a ZIM file")
        self.entries, self.clusters = struct.unpack_from("<II", h, 24)
        self.path_ptr, _title_ptr, self.cluster_ptr, mime_pos = struct.unpack_from("<QQQQ", h, 32)
        self.mimes, m = [], self.read(mime_pos, 4096).split(b"\0")
        for s in m:
            if not s:
                break
            self.mimes.append(s.decode())
        self.checksum_pos = struct.unpack_from("<Q", h, 72)[0]

    def read(self, pos, n):
        with self.lock:
            self.f.seek(pos)
            return self.f.read(n)

    def dirent(self, i):
        pos = struct.unpack("<Q", self.read(self.path_ptr + 8 * i, 8))[0]
        d = self.read(pos, 512)
        mime = struct.unpack_from("<H", d, 0)[0]
        ns = chr(d[3])
        if mime == 0xFFFF:                                     # redirect
            target = struct.unpack_from("<I", d, 8)[0]
            rest = d[12:]
            return ns, rest.split(b"\0", 1)[0].decode("utf-8", "replace"), {"redirect": target}
        cluster, blob = struct.unpack_from("<II", d, 8)
        rest = d[16:]
        return ns, rest.split(b"\0", 1)[0].decode("utf-8", "replace"), {"mime": self.mimes[mime], "cluster": cluster, "blob": blob}

    def find(self, path):
        return self._find(path, "C") or (self._find(path, "A") if self.major < 6 else None)

    def _find(self, path, ns):
        key, lo, hi = (ns + path).encode(), 0, self.entries - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            n, p, info = self.dirent(mid)
            k = (n + p).encode()
            if k == key:
                for _ in range(10):                             # follow redirects
                    if "redirect" not in info:
                        return info
                    _n, _p, info = self.dirent(info["redirect"])
                return None
            if k < key:
                lo = mid + 1
            else:
                hi = mid - 1
        return None

    def locate(self, cluster, blob):
        """(kind, a, b): ('raw', file_offset, length) or ('data', bytes, None) for compressed clusters."""
        c0, c1 = struct.unpack("<QQ", self.read(self.cluster_ptr + 8 * cluster, 16)) if cluster + 1 < self.clusters \
            else (struct.unpack("<Q", self.read(self.cluster_ptr + 8 * cluster, 8))[0], None)
        info = self.read(c0, 1)[0]
        comp, ext = info & 0x0F, bool(info & 0x10)
        osz = 8 if ext else 4
        if comp in (0, 1):                                     # uncompressed: read offsets in place
            o0, o1 = struct.unpack("<QQ" if ext else "<II", self.read(c0 + 1 + osz * blob, 2 * osz))
            return "raw", c0 + 1 + o0, o1 - o0
        data = self.cluster_bytes(c0, c1 if c1 else self.checksum_pos, comp)
        o0, o1 = struct.unpack_from("<QQ" if ext else "<II", data, osz * blob)
        return "data", data[o0:o1], None

    @lru_cache(maxsize=16)
    def cluster_bytes(self, start, end, comp):
        raw = self.read(start + 1, end - start - 1)
        if comp == 4:
            return lzma.decompress(raw)
        if comp == 5:
            if not unzstd:
                raise RuntimeError("zstd not available (needs Python 3.14+ or `pip3 install zstandard`)")
            return unzstd(raw)
        raise RuntimeError("unsupported cluster compression %d" % comp)


_zims, _zlock = {}, threading.Lock()
def zim(book):
    if not re.fullmatch(r"[A-Za-z0-9._-]+", book):
        return None
    with _zlock:
        if book not in _zims:
            p = os.path.join(ZIMS, book + ".zim")
            _zims[book] = Zim(p) if os.path.isfile(p) else None
        return _zims[book]


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=WEB, **k)

    def log_message(self, *a):
        pass

    def guess_type(self, path):
        return TYPES.get(os.path.splitext(path)[1].lower()) or super().guess_type(path)

    def translate_path(self, path):
        # /guides/... comes from guides/ next to web/, whether or not web/guides is a symlink.
        p = urllib.parse.unquote(urllib.parse.urlsplit(path).path)
        if (p == "/guides" or p.startswith("/guides/")) and not os.path.isdir(os.path.join(WEB, "guides")):
            parts = [x for x in p.split("/")[2:] if x and x not in (".", "..") and ":" not in x and "\\" not in x]
            return os.path.join(GUIDES, *parts) + ("/" if p.endswith("/") else "")
        return super().translate_path(path)

    def end_headers(self):
        self.send_header("Accept-Ranges", "bytes")
        if not self.path.startswith("/zim/"):
            self.send_header("Cache-Control", "no-cache")      # pages update on rebuild; always revalidate
        super().end_headers()

    def do_HEAD(self):
        self.do_GET(head=True)

    def do_GET(self, head=False):
        u = urllib.parse.urlsplit(self.path)
        parts = urllib.parse.unquote(u.path).split("/", 3)
        if len(parts) == 4 and parts[1] == "zim":
            return self.serve_zim(parts[2], parts[3], head)
        fs = self.translate_path(self.path)
        if os.path.isfile(fs) and self.headers.get("Range"):
            size = os.path.getsize(fs)
            with open(fs, "rb") as f:
                return self.send_range(lambda a, n: (f.seek(a), f.read(n))[1], size, self.guess_type(fs), head)
        return super().do_HEAD() if head else super().do_GET()

    def serve_zim(self, book, path, head):
        z = zim(book)
        info = z and z.find(path)
        if not info:
            return self.send_error(404, "Not in this collection")
        try:
            kind, a, b = z.locate(info["cluster"], info["blob"])
        except Exception as e:                                 # noqa: BLE001 - report, don't crash the server
            return self.send_error(500, str(e))
        mime = info["mime"]
        if kind == "raw":
            return self.send_range(lambda off, n: z.read(a + off, n), b, mime, head)
        return self.send_range(lambda off, n: a[off:off + n], len(a), mime, head)

    def send_range(self, read, size, mime, head):
        start, end, status = 0, size - 1, 200
        m = re.fullmatch(r"bytes=(\d*)-(\d*)", self.headers.get("Range", "").strip())
        if m and (m.group(1) or m.group(2)):
            if m.group(1):
                start = int(m.group(1))
                end = min(int(m.group(2)), size - 1) if m.group(2) else size - 1
            else:
                start = max(0, size - int(m.group(2)))
            if start > end or start >= size:
                self.send_response(416)
                self.send_header("Content-Range", "bytes */%d" % size)
                self.end_headers()
                return
            status = 206
        self.send_response(status)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(end - start + 1))
        if self.path.startswith("/zim/"):
            self.send_header("Cache-Control", "max-age=3600")
        if status == 206:
            self.send_header("Content-Range", "bytes %d-%d/%d" % (start, end, size))
        self.end_headers()
        if head:
            return
        pos = start
        try:
            while pos <= end:
                n = min(1 << 20, end - pos + 1)
                self.wfile.write(read(pos, n))
                pos += n
        except (BrokenPipeError, ConnectionResetError):
            pass                                               # the browser seeks by dropping the connection


class Server(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8090
    print("NOMAD Command Center on http://127.0.0.1:%d/" % port, flush=True)
    Server(("127.0.0.1", port), Handler).serve_forever()
