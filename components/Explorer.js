/* EXPLORE A SYSTEM: pick an architecture, see it rendered as an animated vertical flow, click components for details. */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;

  P.Explorer = {
    mount(root) {
      const archs = P.data.architectures.filter((a) => a.explorer);
      root.innerHTML =
        '<div class="explorer">' +
        '<div class="ex-tabs" role="tablist" aria-label="Systems">' +
        archs.map((a, i) => '<button type="button" role="tab" class="ex-tab" id="ex-tab-' + a.id + '" data-id="' + a.id + '" aria-selected="false" tabindex="' + (i ? -1 : 0) + '">' + esc(a.name) + '</button>').join('') +
        '</div>' +
        '<div class="ex-body" role="tabpanel" id="ex-panel">' +
        '<div class="ex-diagram" id="ex-diagram"></div>' +
        '<aside class="ex-side"><p class="ex-name" id="ex-name"></p><p class="ex-summary" id="ex-summary"></p><div class="dinfo" id="ex-info" aria-live="polite"></div></aside>' +
        '</div></div>';

      const tabs = P.$$('.ex-tab', root);
      const diagram = P.$('#ex-diagram', root);
      const panel = P.$('#ex-panel', root);

      function show(id, focus) {
        const a = P.byId(archs, id);
        tabs.forEach((t) => {
          const on = t.getAttribute('data-id') === id;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          if (on && focus) t.focus();
        });
        panel.setAttribute('aria-labelledby', 'ex-tab-' + id);
        const nodes = P.Diagram.flatten(a);
        diagram.innerHTML = P.Diagram.vertical(nodes);
        P.$('#ex-name', root).textContent = a.name;
        P.$('#ex-summary', root).textContent = a.summary;
        P.Diagram.bind(diagram, nodes, P.$('#ex-info', root), () =>
          a.project ? '<button type="button" class="link-btn lg" data-open="' + a.project + '">Open the related case study →</button>' : '');
      }

      root.addEventListener('click', (e) => {
        const t = e.target.closest('.ex-tab');
        if (t) { show(t.getAttribute('data-id')); return; }
        const o = e.target.closest('[data-open]');
        if (o) P.openProject(o.getAttribute('data-open'));
      });
      P.$('.ex-tabs', root).addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const cur = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
        const next = (cur + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        show(tabs[next].getAttribute('data-id'), true);
      });

      show(archs[0].id);
    }
  };
})();
