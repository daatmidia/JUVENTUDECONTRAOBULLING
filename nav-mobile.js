(function () {
  'use strict';

  if (window.__jsbNavMobileInit) return;
  window.__jsbNavMobileInit = true;

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  const MQ = window.matchMedia('(max-width: 1024px)');
  const navContainer = navLinks.parentElement;
  let navLinksOnBody = false;

  function isMobileNav() {
    return MQ.matches;
  }

  function setupToggleChrome() {
    if (navToggle.querySelector('.nav-toggle-icon')) return;

    const spans = [...navToggle.querySelectorAll('span')];
    if (spans.length === 3) {
      const icon = document.createElement('span');
      icon.className = 'nav-toggle-icon';
      icon.setAttribute('aria-hidden', 'true');
      spans.forEach((span) => icon.appendChild(span));
      navToggle.insertBefore(icon, navToggle.firstChild);
    }

    const label = document.createElement('span');
    label.className = 'nav-toggle-label';
    label.textContent = 'Menu';
    navToggle.appendChild(label);
  }

  function mountNavLinksOnBody() {
    if (navLinksOnBody || !isMobileNav()) return;
    document.body.appendChild(navLinks);
    navLinks.classList.add('nav-links--mobile');
    navLinksOnBody = true;
  }

  function restoreNavLinks() {
    if (!navLinksOnBody || !navContainer) return;
    navContainer.appendChild(navLinks);
    navLinks.classList.remove('nav-links--mobile');
    navLinksOnBody = false;
  }

  function openMobileNav() {
    mountNavLinksOnBody();
    navLinks.querySelectorAll('.nav-item-submenu').forEach((item) => {
      item.classList.add('is-expanded');
    });
    navLinks.classList.add('open');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fechar menu');
    document.body.classList.add('nav-open');
  }

  function closeMobileNav() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('nav-open');
  }

  setupToggleChrome();
  mountNavLinksOnBody();

  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) closeMobileNav();
    else openMobileNav();
  });

  navLinks.querySelectorAll('.nav-item-submenu').forEach((item) => {
    const trigger = item.querySelector(':scope > .nav-link-has-submenu, :scope > .nav-link-trigger');
    const submenu = item.querySelector(':scope > .nav-submenu');
    if (!trigger || !submenu) return;

    trigger.addEventListener('click', (event) => {
      if (!isMobileNav() || !navLinks.classList.contains('open')) return;
      if (trigger.tagName !== 'BUTTON') return;

      event.preventDefault();
      event.stopPropagation();
      item.classList.toggle('is-expanded');
    });
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (isMobileNav()) closeMobileNav();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMobileNav();
      navToggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('open')) return;
    if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
    closeMobileNav();
  });

  MQ.addEventListener('change', () => {
    if (isMobileNav()) {
      mountNavLinksOnBody();
      return;
    }
    closeMobileNav();
    restoreNavLinks();
  });

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();
