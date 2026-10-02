/* WHAT I BUILD: interactive capability map. Selecting a technology highlights related stack nodes and the projects that use it. */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;

  function nodeBtn(n) {
    return '<button type="button" class="mnode" data-tech="' + n.tech + '" aria-pressed="false">' + esc(n.label) + '</button>';
  }

  function column(chain) {
    return '<div class="map-col">' + chain.map((n, i) => (i ? '<span class="mlink" aria-hidden="true"></span>' : '') + nodeBtn(n)).join('') + '</div>';
  }

  function bracket(kind) {
    return '<div class="bracket ' + kind + '" aria-hidden="true"><i></i><i></i><i></i></div>';
  }

  P.SkillGraph = {
    mount(root) {
      const map = P.data.capabilityMap;
      const groups = {};
      P.data.technologies.forEach((t) => { (groups[t.group] = groups[t.group] || []).push(t); });

      root.innerHTML =
        '<div class="skillgraph">' +
        '<div class="map" role="group" aria-label="Capability map">' +
        '<div class="map-root"><span class="mnode root">' + esc(map.root.label) + '</span></div>' + bracket('split') +
        '<div class="map-cols">' + map.ai.map(column).join('') + '</div>' + bracket('join') +
        '<div class="map-root"><span class="mnode root apps">' + esc(map.applications.label) + '</span></div>' + bracket('split') +
        '<div class="map-cols">' + map.domains.map(column).join('') + '</div>' +
        '</div>' +
        '<div class="map-side">' +
        '<div class="used-in" id="used-in" aria-live="polite"></div>' +
        Object.keys(groups).map((g) =>
          '<div class="tgroup"><p class="tg-name">' + esc(g) + '</p><div class="chips">' +
          groups[g].map((t) => '<button type="button" class="chip" data-tech="' + t.id + '" aria-pressed="false">' + esc(t.label) + '</button>').join('') +
          '</div></div>'
        ).join('') +
        '</div></div>';

      const panel = P.$('#used-in', root);
      const all = P.$$('[data-tech]', root);
      let selected = null;

      function emptyPanel() {
        panel.innerHTML = '<p class="used-hint">Select a technology on the map or in the list to see the systems where I used it.</p>';
      }

      function apply() {
        if (!selected) {
          all.forEach((b) => { b.classList.remove('is-selected', 'is-related', 'is-dim'); b.setAttribute('aria-pressed', 'false'); });
          emptyPanel();
          document.dispatchEvent(new CustomEvent('ptp:tech', { detail: { tech: null, projects: [] } }));
          return;
        }
        const projects = P.projectsUsing(selected);
        const related = {};
        projects.forEach((p) => p.tech.forEach((t) => { related[t] = true; }));
        all.forEach((b) => {
          const t = b.getAttribute('data-tech');
          const isSel = t === selected;
          b.classList.toggle('is-selected', isSel);
          b.classList.toggle('is-related', !isSel && !!related[t]);
          b.classList.toggle('is-dim', !isSel && !related[t]);
          b.setAttribute('aria-pressed', String(isSel));
        });
        panel.innerHTML = '<p class="used-label"><strong>' + esc(P.techLabel(selected)) + '</strong> ' +
          (projects.length ? 'is used in ' + projects.length + (projects.length === 1 ? ' system' : ' systems') : 'is part of my day-to-day stack') +
          '<button type="button" class="link-btn" data-clear>Clear</button></p>' +
          (projects.length
            ? '<ul class="used-list">' + projects.map((p) =>
              '<li><button type="button" data-open="' + p.id + '"><span class="ul-n">' + esc(p.num) + '</span><span class="ul-t">' + esc(p.title) + '</span><span class="ul-m">' + esc(p.impact.metric) + '</span></button></li>').join('') + '</ul>'
            : '<p class="used-hint">Used across engagements, not tied to a single featured system.</p>');
        document.dispatchEvent(new CustomEvent('ptp:tech', { detail: { tech: selected, projects: projects.map((p) => p.id) } }));
      }

      root.addEventListener('click', (e) => {
        const open = e.target.closest('[data-open]');
        if (open) { P.openProject(open.getAttribute('data-open')); return; }
        if (e.target.closest('[data-clear]')) { selected = null; apply(); return; }
        const b = e.target.closest('[data-tech]');
        if (!b) return;
        const t = b.getAttribute('data-tech');
        selected = selected === t ? null : t;
        apply();
      });

      emptyPanel();
    }
  };
})();
