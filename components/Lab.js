/* AI ENGINEERING LAB: each project is shown as an engineering system with a pipeline, tech, impact, and an Explore button. */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;

  function card(p) {
    return '<article class="sys reveal" data-project="' + p.id + '">' +
      '<header class="sys-head"><span class="sys-num">SYSTEM ' + esc(p.num) + '</span><span class="sys-ctx">' + esc(p.context) + '</span>' +
      '<span class="sys-match" aria-hidden="true">uses selected tech</span></header>' +
      '<div class="sys-body">' +
      '<div class="sys-main"><h3>' + esc(p.title) + '</h3><p class="sys-kind">' + esc(p.kind) + '</p>' +
      '<p class="sys-problem"><span>Problem</span>' + esc(p.problem) + '</p>' +
      '<div class="sys-impact"><strong>' + esc(p.impact.metric) + '</strong><span>' + esc(p.impact.label) + '</span></div>' +
      '<ul class="badges">' + p.badges.map((b) => '<li>' + esc(b) + '</li>').join('') + '</ul>' +
      '<button type="button" class="btn primary sm" data-explore="' + p.id + '">EXPLORE SYSTEM <span aria-hidden="true">→</span></button></div>' +
      '<div class="sys-arch"><p class="sys-label">Architecture</p><ol class="pipe">' +
      p.flow.map((n, i) => '<li style="--i:' + i + '"><span class="pipe-dot" aria-hidden="true"></span>' + esc(n.label) + '</li>').join('') +
      '</ol></div></div></article>';
  }

  P.Lab = {
    mount(root) {
      root.innerHTML = '<div class="sys-list">' + P.data.projects.map(card).join('') + '</div>';
      root.addEventListener('click', (e) => {
        const b = e.target.closest('[data-explore]');
        if (b) P.openProject(b.getAttribute('data-explore'));
      });
      /* Highlight systems that use the technology selected in the capability map. */
      document.addEventListener('ptp:tech', (e) => {
        const ids = e.detail.projects;
        P.$$('.sys', root).forEach((c) => {
          c.classList.toggle('is-match', ids.indexOf(c.getAttribute('data-project')) !== -1);
          c.classList.toggle('is-dim', !!e.detail.tech && ids.indexOf(c.getAttribute('data-project')) === -1);
        });
      });
    }
  };
})();
