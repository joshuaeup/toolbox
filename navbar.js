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
  const currentLink = NAV_LINKS.find(({ href }) => href === currentFile) || NAV_LINKS[0];

  // ── Navbar ──
  const nav = document.createElement('nav');
  nav.id = 'ct-navbar';
  nav.setAttribute('aria-label', 'Site navigation');
  nav.innerHTML = `
    <div class="ct-nav-inner">
      <a class="ct-nav-brand" href="index.html">Tools</a>
      <span class="ct-nav-current">/ <span>${currentLink.label}</span></span>
      <button class="ct-nav-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="ct-nav-dropdown">
        Pages
        <svg class="ct-nav-toggle-chevron" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="2,4 7,10 12,4"/>
        </svg>
      </button>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);

  // ── Dropdown ──
  const dropdown = document.createElement('div');
  dropdown.id = 'ct-nav-dropdown';
  dropdown.setAttribute('role', 'menu');
  dropdown.innerHTML = NAV_LINKS.map(({ href, label }) => {
    const active = href === currentFile;
    return `<a href="${href}" role="menuitem"${active ? ' class="ct-active" aria-current="page"' : ''}>${label}</a>`;
  }).join('');
  document.body.appendChild(dropdown);

  // ── Backdrop ──
  const backdrop = document.createElement('div');
  backdrop.id = 'ct-nav-backdrop';
  document.body.appendChild(backdrop);

  // ── Toggle logic ──
  const toggle = nav.querySelector('.ct-nav-toggle');

  function openDropdown() {
    dropdown.classList.add('ct-open');
    backdrop.classList.add('ct-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    dropdown.classList.remove('ct-open');
    backdrop.classList.remove('ct-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    dropdown.classList.contains('ct-open') ? closeDropdown() : openDropdown();
  });

  backdrop.addEventListener('click', closeDropdown);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDropdown();
  });

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
