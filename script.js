/* =========================================================
   CAVO — script.js
   Each feature lives in its own function and bails out
   quietly if its elements aren't on the current page.
   ========================================================= */

/* ---------- Mobile navigation ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const desktopQuery = window.matchMedia('(min-width: 56.25em)'); // same as CSS

  function openNav() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');   // stops page scrolling behind menu
  }

  function closeNav() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  // 1. Button toggles the menu
  toggle.addEventListener('click', () => (isOpen() ? closeNav() : openNav()));

  // 2. Escape closes it and returns focus to the button
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      closeNav();
      toggle.focus();
    }
  });

  // 3. Clicking any link closes it (useful for same-page links)
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeNav();
  });

  // 4. Growing the window to desktop width resets the state
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) closeNav();
  });
}

/* ---------- Mark the current page in the nav ---------- */
function markCurrentPage() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav__link').forEach((link) => {
    if (link.getAttribute('href') === current) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ---------- Footer year ---------- */
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Start everything ---------- */
initMobileNav();
markCurrentPage();
setFooterYear();
