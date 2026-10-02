/* SKILLS: expandable categories; each skill is shown with the systems it was used in. */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;

  function row(item) {
    const projects = item.tech ? P.projectsUsing(item.tech).slice(0, 2) : [];
    let ctx = '';
    projects.forEach((p) => { ctx += '<span class="sk-arrow" aria-hidden="true">→</span><button type="button" class="sk-proj" data-open="' + p.id + '">' + esc(p.title) + '</button>'; });
    if (item.note) ctx += '<span class="sk-arrow" aria-hidden="true">→</span><span class="sk-note">' + esc(item.note) + '</span>';
    return '<li><span class="sk-name">' + esc(item.label) + '</span><span class="sk-ctx">' + ctx + '</span></li>';
  }

  P.Skills = {
    mount(root) {
      root.innerHTML = '<div class="acc">' + P.data.skillCategories.map((c, i) =>
        '<div class="acc-item' + (i === 0 ? ' open' : '') + '">' +
        '<h3><button type="button" class="acc-btn" id="acc-b-' + c.id + '" aria-expanded="' + (i === 0) + '" aria-controls="acc-p-' + c.id + '">' +
        '<span class="acc-title">' + esc(c.title) + '</span><span class="acc-blurb">' + esc(c.blurb) + '</span>' +
        '<span class="acc-count">' + c.items.length + '</span><i class="acc-icon" aria-hidden="true"></i></button></h3>' +
        '<div class="acc-panel" id="acc-p-' + c.id + '" role="region" aria-labelledby="acc-b-' + c.id + '"' + (i === 0 ? '' : ' hidden') + '>' +
        '<ul class="skill-rows">' + c.items.map(row).join('') + '</ul></div></div>'
      ).join('') + '</div>';

      root.addEventListener('click', (e) => {
        const o = e.target.closest('[data-open]');
        if (o) { P.openProject(o.getAttribute('data-open')); return; }
        const b = e.target.closest('.acc-btn');
        if (!b) return;
        const open = b.getAttribute('aria-expanded') === 'true';
        b.setAttribute('aria-expanded', String(!open));
        b.parentElement.parentElement.classList.toggle('open', !open);
        P.$('#' + b.getAttribute('aria-controls'), root).hidden = open;
      });
    }
  };
})();
