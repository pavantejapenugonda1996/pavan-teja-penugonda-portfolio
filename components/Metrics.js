/* Engineering impact metrics: animated counters, each linked to its case study. */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;

  function animate(el, to, done) {
    if (P.reducedMotion()) { el.textContent = to; return; }
    const dur = 1300;
    const t0 = performance.now();
    function tick(now) {
      const k = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(to * eased);
      if (k < 1) requestAnimationFrame(tick); else if (done) done();
    }
    requestAnimationFrame(tick);
  }

  P.Metrics = {
    mount(root) {
      root.innerHTML = '<ul class="metrics">' + P.data.metrics.map((m) =>
        '<li class="reveal"><button type="button" class="metric" data-metric="' + m.id + '" aria-label="' + esc(m.value + m.suffix + ' ' + m.label + '. ' + m.cta) + '">' +
        '<span class="metric-val"><span data-count="' + m.value + '">0</span><span class="metric-suf">' + esc(m.suffix) + '</span></span>' +
        '<span class="metric-label">' + esc(m.label) + '</span>' +
        '<span class="metric-ctx">' + esc(m.context) + '</span>' +
        '<span class="metric-cta">' + esc(m.cta) + ' <i aria-hidden="true">→</i></span></button></li>'
      ).join('') + '</ul>';

      root.addEventListener('click', (e) => {
        const b = e.target.closest('.metric');
        if (!b) return;
        const m = P.byId(P.data.metrics, b.getAttribute('data-metric'));
        if (m.target.project) P.openProject(m.target.project); else if (m.target.section) P.scrollToId(m.target.section);
      });

      const counters = P.$$('[data-count]', root);
      P.onceVisible(root, () => counters.forEach((c) => animate(c, Number(c.getAttribute('data-count')))), '0px 0px -10% 0px');
    }
  };
})();
