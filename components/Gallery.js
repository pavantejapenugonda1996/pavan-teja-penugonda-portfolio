/* SYSTEM ARCHITECTURES: seven reference diagrams (Input -> Processing -> Intelligence -> Decision -> Output) with zoom and click. */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;
  const MIN = 0.75, MAX = 1.5, STEP = 0.125;

  P.Gallery = {
    mount(root) {
      const archs = P.data.architectures.filter((a) => a.gallery);
      let zoom = 1;
      root.innerHTML =
        '<div class="gallery">' +
        '<div class="g-bar"><div class="g-tabs" role="tablist" aria-label="Architectures">' +
        archs.map((a, i) => '<button type="button" role="tab" class="g-tab" data-id="' + a.id + '" aria-selected="false" tabindex="' + (i ? -1 : 0) + '">' + esc(a.name) + '</button>').join('') +
        '</div><div class="g-zoom" role="group" aria-label="Zoom">' +
        '<button type="button" data-z="out" aria-label="Zoom out">−</button><span id="g-zoom-val" aria-live="polite">100%</span>' +
        '<button type="button" data-z="in" aria-label="Zoom in">+</button><button type="button" data-z="reset" class="txt">Reset</button></div></div>' +
        '<p class="g-summary" id="g-summary"></p>' +
        '<div class="g-viewport" id="g-viewport" tabindex="0" role="region" aria-label="Architecture diagram, scrollable"><div class="g-canvas" id="g-canvas"></div></div>' +
        '<div class="dinfo" id="g-info" aria-live="polite"></div></div>';

      const tabs = P.$$('.g-tab', root);
      const canvas = P.$('#g-canvas', root);
      const val = P.$('#g-zoom-val', root);

      function setZoom(z) {
        zoom = Math.max(MIN, Math.min(MAX, z));
        canvas.style.setProperty('--z', zoom);
        val.textContent = Math.round(zoom * 100) + '%';
      }

      function show(id, focus) {
        const a = P.byId(archs, id);
        tabs.forEach((t) => {
          const on = t.getAttribute('data-id') === id;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          if (on && focus) t.focus();
        });
        P.$('#g-summary', root).textContent = a.summary;
        canvas.innerHTML = P.Diagram.stages(a);
        P.$('#g-viewport', root).scrollLeft = 0;
        const nodes = P.Diagram.flatten(a);
        P.Diagram.bind(canvas, nodes, P.$('#g-info', root), () =>
          a.project ? '<button type="button" class="link-btn lg" data-open="' + a.project + '">Open the related case study →</button>' : '');
      }

      root.addEventListener('click', (e) => {
        const t = e.target.closest('.g-tab');
        if (t) { show(t.getAttribute('data-id')); return; }
        const z = e.target.closest('[data-z]');
        if (z) {
          const k = z.getAttribute('data-z');
          setZoom(k === 'in' ? zoom + STEP : k === 'out' ? zoom - STEP : 1);
          return;
        }
        const o = e.target.closest('[data-open]');
        if (o) P.openProject(o.getAttribute('data-open'));
      });
      P.$('.g-tabs', root).addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const cur = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
        show(tabs[(cur + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length].getAttribute('data-id'), true);
      });
      /* Ctrl/Cmd + wheel zooms the diagram only while the pointer is over it. */
      P.$('#g-viewport', root).addEventListener('wheel', (e) => {
        if (!(e.ctrlKey || e.metaKey)) return;
        e.preventDefault();
        setZoom(zoom + (e.deltaY < 0 ? STEP : -STEP));
      }, { passive: false });

      setZoom(1);
      show(archs[0].id);
    }
  };
})();
