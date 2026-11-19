"""Wraps a plain-text book in a readable, self-contained HTML page (light/dark with the Command Center toggle, no outside requests).
Usage: python3 txt2html.py book.txt book.html"""
import html, re, sys
src, dst = sys.argv[1], sys.argv[2]
text = open(src, encoding="utf-8-sig", errors="replace").read().replace("\r\n", "\n")
m = re.search(r"^Title:\s*(.+)$", text, re.M)
title = (m.group(1).strip() if m else re.sub(r"[-_]+", " ", src.rsplit("/", 1)[-1][:-4])).title()
open(dst, "w", encoding="utf-8").write(f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<style>
  :root {{ --bg:#faf8f3; --ink:#1d1d1b; color-scheme:light; }}
  :root[data-theme="dark"] {{ --bg:#151514; --ink:#e8e6e1; color-scheme:dark; }}
  @media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{ --bg:#151514; --ink:#e8e6e1; color-scheme:dark; }} }}
  body {{ margin:0; background:var(--bg); color:var(--ink); }}
  pre {{ max-width:42em; margin:0 auto; padding:24px 16px 64px; white-space:pre-wrap; word-wrap:break-word;
        font:17px/1.6 Georgia, "Times New Roman", serif; }}
</style>
<script src="/theme.js?v=2"></script></head>
<body><pre>{html.escape(text)}</pre></body></html>
""")
