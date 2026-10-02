/* Shared helpers. Loaded first. Everything lives under the PTP namespace. */
(function () {
  const P = (window.PTP = window.PTP || {});
  P.data = P.data || {};

  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  P.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ESC[c]);
  P.$ = (sel, root) => (root || document).querySelector(sel);
  P.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  P.reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  P.byId = (list, id) => list.find((x) => x.id === id);

  P.getProject = (id) => P.byId(P.data.projects, id);
  P.techLabel = (id) => (P.byId(P.data.technologies, id) || {}).label || id;
  P.projectsUsing = (techId) => P.data.projects.filter((p) => p.tech.indexOf(techId) !== -1);

  /* Run cb once when el is near the viewport. */
  P.onceVisible = (el, cb, margin) => {
    if (!('IntersectionObserver' in window)) { cb(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); cb(); }
    }, { rootMargin: margin || '0px', threshold: 0.15 });
    io.observe(el);
  };

  /* Toggle .is-live on elements while they are on screen, so CSS animations only run when visible. */
  P.watchLive = (elements) => {
    if (!('IntersectionObserver' in window)) { elements.forEach((e) => e.classList.add('is-live')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle('is-live', e.isIntersecting));
    }, { rootMargin: '80px 0px' });
    elements.forEach((e) => io.observe(e));
  };

  /* Fade-in on scroll. Elements are visible by default when JS or IntersectionObserver is missing. */
  P.reveal = (root) => {
    const items = P.$$('.reveal:not(.in)', root);
    if (!('IntersectionObserver' in window) || P.reducedMotion()) { items.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach((e) => io.observe(e));
  };

  P.scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: P.reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + id);
  };
})();
