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
      <a class="ct-nav-brand" href="index.html">Tools</a>
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

  // ── Mobile tab bar (inputs / results) ──────────────────────────────────
  // Only inject on pages that have the two-panel calculator layout.
  function initMobileTabs() {
    const panel      = document.querySelector('.panel');
    const resultsCol = document.querySelector('.results-col');
    if (!panel || !resultsCol) return;

    const bar = document.createElement('div');
    bar.id = 'ct-tab-bar';
    bar.innerHTML = `
      <button class="ct-tab" id="ct-tab-results">📊 Results</button>
      <button class="ct-tab" id="ct-tab-inputs">🎚 Inputs</button>
    `;
    document.body.appendChild(bar);

    function showTab(active) {
      const isResults = active === 'results';
      panel.classList.toggle('ct-mobile-hidden', isResults);
      resultsCol.classList.toggle('ct-mobile-hidden', !isResults);
      document.getElementById('ct-tab-results').classList.toggle('ct-tab-active', isResults);
      document.getElementById('ct-tab-inputs').classList.toggle('ct-tab-active', !isResults);
      // Scroll to top when switching tabs so the user sees the content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.getElementById('ct-tab-results').addEventListener('click', () => showTab('results'));
    document.getElementById('ct-tab-inputs').addEventListener('click', () => showTab('inputs'));

    function applyMobileLayout() {
      const isMobile = window.innerWidth <= 720;
      bar.style.display = isMobile ? 'flex' : 'none';
      if (!isMobile) {
        // Reset any hidden state when returning to desktop
        panel.classList.remove('ct-mobile-hidden');
        resultsCol.classList.remove('ct-mobile-hidden');
      } else {
        // Ensure a tab is always active on mobile
        const noneActive = !panel.classList.contains('ct-mobile-hidden') &&
                           !resultsCol.classList.contains('ct-mobile-hidden');
        if (noneActive) showTab('results');
      }
    }

    applyMobileLayout();
    window.addEventListener('resize', applyMobileLayout);
  }

  // Run after DOM is ready (navbar.js is called at top of body, so defer slightly)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileTabs);
  } else {
    initMobileTabs();
  }
})();
