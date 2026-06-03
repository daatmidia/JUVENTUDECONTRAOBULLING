(function () {
  'use strict';

  function initDadosBars() {
    const cards = document.querySelectorAll('.dados-stat-card[data-bar]');
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-visible'));
      return;
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    cards.forEach((card) => obs.observe(card));
  }

  function initDadosCounters() {
    const nums = document.querySelectorAll('[data-target][data-decimals]');
    if (!nums.length || !('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        if (Number.isNaN(target)) return;
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const dur = 1400;
        const t0 = performance.now();

        const step = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(decimals);
          if (p < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.3 });

    nums.forEach((n) => obs.observe(n));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDadosBars();
    initDadosCounters();
  });
})();
