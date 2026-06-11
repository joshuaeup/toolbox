/**
 * Shared navbar for claude-tools.
 *
 * HOW TO ADD A NEW APP
 * --------------------
 * 1. Add your .html file to the repo root.
 * 2. Add an entry to the NAV_LINKS array below:
 *      { href: 'your-file.html', label: 'Your App Name' }
 * 3. That's it — the link appears in every page's navbar automatically.
 *
 * The navbar auto-highlights the active page by comparing href to the
 * current URL, so no per-page configuration is needed.
 */

const NAV_LINKS = [
  { href: 'index.html',                          label: 'Home' },
  { href: 'home_affordability_calculator_v6.html', label: 'Affordability Calculator' },
  { href: 'rent_vs_buy_calculator.html',          label: 'Rent vs. Buy' },
  // ↑ ADD NEW APPS HERE
];

(function () {
  // Inject navbar.css if not already on the page
  if (!document.querySelector('link[href*="navbar.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'navbar.css';
    document.head.insertBefore(link, document.head.firstChild);
  }

  const currentFile = location.pathname.split('/').pop() || 'index.html';

  const nav = document.createElement('nav');
  nav.id = 'ct-navbar';
  nav.setAttribute('aria-label', 'Site navigation');
  nav.innerHTML = `
    <div class="ct-nav-inner">
      <a class="ct-nav-brand" href="index.html">Claude Tools</a>
      <div class="ct-nav-divider" aria-hidden="true"></div>
      <ul class="ct-nav-links">
        ${NAV_LINKS.map(({ href, label }) => {
          const active = href === currentFile || (currentFile === '' && href === 'index.html');
          return `<li><a href="${href}"${active ? ' class="ct-active" aria-current="page"' : ''}>${label}</a></li>`;
        }).join('\n        ')}
      </ul>
    </div>
  `;

  document.body.insertBefore(nav, document.body.firstChild);
  document.body.classList.add('ct-has-navbar');
})();
