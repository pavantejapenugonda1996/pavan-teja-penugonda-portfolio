/* Project detail view: Problem, Approach, Architecture, Technology, Decisions, AI Layer, Impact, Lessons. */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;
  let dialog = null;
  let currentId = null;

  function sec(num, title, body, cls) {
    return '<section class="dsec ' + (cls || '') + '"><h4><span>' + num + '</span>' + title + '</h4>' + body + '</section>';
  }

  function render(p) {
    const cs = P.data.caseStudies[p.id] || {};
    const list = P.data.projects;
    const i = list.indexOf(p);
    const prev = list[(i - 1 + list.length) % list.length];
    const next = list[(i + 1) % list.length];

    return '<div class="dlg-inner">' +
      '<div class="dlg-head"><div><p class="kicker">SYSTEM ' + esc(p.num) + ' · ' + esc(p.context) + '</p>' +
      '<h3 id="dlg-title">' + esc(p.title) + '</h3><p class="dlg-kind">' + esc(p.kind) + '</p></div>' +
      '<button type="button" class="dlg-close" data-close aria-label="Close project view">×</button></div>' +
      '<div class="dlg-body">' +
      sec('01', 'Problem', '<p>' + esc(cs.problem) + '</p>') +
      sec('02', 'Approach', '<p>' + esc(cs.approach) + '</p>') +
      sec('03', 'Architecture', P.Diagram.flow(p.flow) + '<div class="dinfo" id="dlg-info" aria-live="polite"></div>', 'wide') +
      sec('04', 'Technology', '<ul class="badges">' + p.badges.map((b) => '<li>' + esc(b) + '</li>').join('') + '</ul>') +
      sec('05', 'Engineering decisions', '<div class="decisions">' + (cs.decisions || []).map((d) =>
        '<div class="decision"><h5>' + esc(d.t) + '</h5><p>' + esc(d.d) + '</p></div>').join('') + '</div>', 'wide') +
      sec('06', 'AI layer', '<p>' + esc(cs.aiLayer) + '</p>') +
      sec('07', 'Impact', '<div class="impact"><strong>' + esc(p.impact.metric) + '</strong><span>' + esc(p.impact.label) + '</span></div><p>' + esc(cs.impact) + '</p>', 'impact-sec') +
      sec('08', 'Lessons', '<ul class="lessons">' + (cs.lessons || []).map((l) => '<li>' + esc(l) + '</li>').join('') + '</ul>') +
      '<p class="dlg-note">Described at a general level. No confidential client information is shown.</p>' +
      '</div>' +
      '<div class="dlg-foot">' +
      '<button type="button" class="btn ghost" data-go="' + prev.id + '">← ' + esc(prev.title) + '</button>' +
      '<button type="button" class="btn ghost" data-go="' + next.id + '">' + esc(next.title) + ' →</button></div></div>';
  }

  function show(id) {
    const p = P.getProject(id);
    if (!p) return;
    currentId = id;
    dialog.innerHTML = render(p);
    const body = P.$('.dlg-body', dialog);
    body.scrollTop = 0;
    P.Diagram.bind(P.$('.flow', dialog), p.flow, P.$('#dlg-info', dialog));
  }

  P.Project = {
    init() {
      dialog = P.$('#project-dialog');
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog || e.target.closest('[data-close]')) { dialog.close ? dialog.close() : dialog.removeAttribute('open'); return; }
        const go = e.target.closest('[data-go]');
        if (go) show(go.getAttribute('data-go'));
      });
      dialog.addEventListener('close', () => document.documentElement.classList.remove('modal-open'));
    },
    open(id) {
      if (!dialog) return;
      show(id);
      document.documentElement.classList.add('modal-open');
      if (!dialog.open) { dialog.showModal ? dialog.showModal() : dialog.setAttribute('open', ''); }
    }
  };
  P.openProject = (id) => P.Project.open(id);
})();
