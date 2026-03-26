(function () {
  'use strict';
  const LANG_KEY = 'jsb_lang';
  const PT_BR = 'pt-BR';
  const EN_US = 'en-US';
  const applyPtBr = () => {
    document.documentElement.lang = PT_BR;
    localStorage.setItem(LANG_KEY, PT_BR);
  };
  const applyEnUs = () => {
    document.documentElement.lang = EN_US;
    localStorage.setItem(LANG_KEY, EN_US);
    document.title = 'About the Project — Youth Without Bullying';
    const setText = (sel, txt) => { const el = document.querySelector(sel); if (el) el.textContent = txt; };
    const setHtml = (sel, html) => { const el = document.querySelector(sel); if (el) el.innerHTML = html; };
    setHtml('.logo-text', 'Youth <strong>Without Bullying</strong>');
    const nav = document.querySelectorAll('#navLinks li a');
    if (nav[0]) nav[0].textContent = 'News';
    if (nav[1]) nav[1].textContent = 'About';
    if (nav[2]) nav[2].textContent = 'About the Project';
    if (nav[3]) nav[3].textContent = 'Ombudsman';
    if (nav[4]) nav[4].textContent = '🔐 Admin Login';
    setText('.proj-tag', 'Education and citizenship');
    setText('.proj-hero h1', 'About the Project');
  };
  const storedLang = localStorage.getItem(LANG_KEY) || PT_BR;
  if (storedLang === EN_US) applyEnUs();
  else applyPtBr();
  document.querySelectorAll('.js-lang-ptbr').forEach((el) => {
    const handler = (e) => {
      e.preventDefault();
      applyPtBr();
      window.location.reload();
    };
    el.addEventListener('click', handler);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') handler(e);
    });
  });
  document.querySelectorAll('.js-lang-enus').forEach((el) => {
    const handler = (e) => {
      e.preventDefault();
      localStorage.setItem(LANG_KEY, EN_US);
      window.location.reload();
    };
    el.addEventListener('click', handler);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') handler(e);
    });
  });

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));
})();
