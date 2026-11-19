// Light / dark switch for every Command Center page. Load it in <head> so the page never flashes.
// With no saved choice the page follows the system setting. The choice is kept per browser.
(() => {
  const KEY = 'nomad.theme', root = document.documentElement;
  const sys = matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch {}
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;

  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : sys.matches;
  const SUN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  function label() {
    const d = isDark(), text = d ? 'Light mode' : 'Dark mode';
    document.querySelectorAll('[data-theme-label]').forEach(el => el.textContent = text);
    document.querySelectorAll('.theme-fab').forEach(b => { b.innerHTML = d ? SUN : MOON; b.title = b.ariaLabel = text; });
  }
  function toggleTheme() {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch {}
    label();
    dispatchEvent(new CustomEvent('themechange', { detail: next }));
  }
  window.isDark = isDark;
  window.toggleTheme = toggleTheme;
  sys.addEventListener('change', () => { if (!root.dataset.theme) { label(); dispatchEvent(new CustomEvent('themechange', { detail: isDark() ? 'dark' : 'light' })); } });

  addEventListener('DOMContentLoaded', () => {
    // Pages with their own button (data-theme-label) skip the floating one.
    if (!document.querySelector('[data-theme-label]')) {
      const b = document.createElement('button');
      b.className = 'theme-fab'; b.type = 'button'; b.onclick = toggleTheme;
      document.body.appendChild(b);
    }
    label();
  });
  // The floating button's look, shared by every page (each page's own colors come through currentColor).
  const css = document.createElement('style');
  css.textContent = `.theme-fab{position:fixed;right:16px;bottom:16px;z-index:50;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;
    cursor:pointer;border:1px solid rgba(127,127,127,.35);background:rgba(127,127,127,.16);color:inherit;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
    .theme-fab:hover{background:rgba(127,127,127,.28)}@media print{.theme-fab{display:none}}`;
  document.head.appendChild(css);
})();
