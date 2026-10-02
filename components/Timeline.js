/* ENGINEERING JOURNEY: horizontal timeline on desktop, vertical on mobile. Select a year to see its details. */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;

  function detail(j) {
    return '<div class="tl-card"><p class="tl-period">' + esc(j.period) + '</p>' +
      '<h3>' + esc(j.role) + '</h3><p class="tl-org">' + esc(j.org) + '</p>' +
      '<div class="tl-cols"><div><h4>Technology</h4><ul class="badges">' + j.tech.map((t) => '<li>' + esc(t) + '</li>').join('') + '</ul></div>' +
      '<div><h4>Responsibilities</h4><ul>' + j.responsibilities.map((r) => '<li>' + esc(r) + '</li>').join('') + '</ul></div>' +
      '<div><h4>Accomplishments</h4><ul>' + j.accomplishments.map((r) => '<li>' + esc(r) + '</li>').join('') + '</ul></div></div>' +
      (j.project ? '<button type="button" class="link-btn lg" data-open="' + j.project + '">View the related system →</button>' : '') + '</div>';
  }

  P.Timeline = {
    mount(root) {
      const items = P.data.journey;
      root.innerHTML =
        '<div class="timeline"><ol class="tl" role="tablist" aria-label="Engineering journey">' +
        items.map((j, i) =>
          '<li class="tl-item"><button type="button" role="tab" class="tl-btn" id="tl-' + j.id + '" data-id="' + j.id + '" aria-selected="false" tabindex="' + (i === items.length - 1 ? 0 : -1) + '">' +
          '<span class="tl-dot" aria-hidden="true"></span><span class="tl-year">' + esc(j.year) + '</span><span class="tl-head">' + esc(j.headline) + '</span></button>' +
          '<div class="tl-panel-m" data-for="' + j.id + '"></div></li>'
        ).join('') +
        '</ol><div class="tl-detail" id="tl-detail" role="tabpanel" aria-live="polite"></div></div>';

      const btns = P.$$('.tl-btn', root);
      const detailEl = P.$('#tl-detail', root);

      function show(id, focus) {
        const j = P.byId(items, id);
        btns.forEach((b) => {
          const on = b.getAttribute('data-id') === id;
          b.setAttribute('aria-selected', String(on));
          b.tabIndex = on ? 0 : -1;
          b.parentElement.classList.toggle('active', on);
          if (on && focus) b.focus();
        });
        P.$$('.tl-panel-m', root).forEach((p) => { p.innerHTML = p.getAttribute('data-for') === id ? detail(j) : ''; });
        detailEl.innerHTML = detail(j);
        detailEl.setAttribute('aria-labelledby', 'tl-' + id);
      }

      root.addEventListener('click', (e) => {
        const b = e.target.closest('.tl-btn');
        if (b) { show(b.getAttribute('data-id')); return; }
        const o = e.target.closest('[data-open]');
        if (o) P.openProject(o.getAttribute('data-open'));
      });
      root.addEventListener('keydown', (e) => {
        const k = e.key;
        if (!P.$('.tl', root).contains(e.target)) return;
        if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].indexOf(k) === -1) return;
        e.preventDefault();
        const cur = btns.findIndex((b) => b.getAttribute('aria-selected') === 'true');
        const dir = k === 'ArrowRight' || k === 'ArrowDown' ? 1 : -1;
        show(btns[(cur + dir + btns.length) % btns.length].getAttribute('data-id'), true);
      });

      show(items[items.length - 1].id);
    }
  };
})();
