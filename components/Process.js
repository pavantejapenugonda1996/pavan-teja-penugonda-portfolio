/* HOW I TURN PROBLEMS INTO SYSTEMS: animated five-stage workflow plus the two engineering lenses. */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;

  P.Process = {
    mount(root) {
      const stages = P.data.processStages;
      root.innerHTML =
        '<div class="workflow" id="workflow"><div class="wf-track" aria-hidden="true"><i class="wf-fill"></i><i class="wf-pulse"></i></div>' +
        '<ol class="wf-steps">' + stages.map((s, i) =>
          '<li class="wf-step" style="--i:' + i + '"><button type="button" class="wf-btn" aria-expanded="false" data-i="' + i + '">' +
          '<span class="wf-num">' + esc(s.num) + '</span><span class="wf-title">' + esc(s.title) + '</span><span class="wf-text">' + esc(s.text) + '</span></button>' +
          '<p class="wf-detail" hidden>' + esc(s.detail) + '</p></li>'
        ).join('') + '</ol></div>' +
        '<div class="lenses">' + P.data.lenses.map((l) =>
          '<details class="lens"><summary>' + esc(l.title) + '</summary><ul>' +
          l.points.map((p) => '<li><strong>' + esc(p[0]) + '.</strong> ' + esc(p[1]) + '</li>').join('') + '</ul></details>'
        ).join('') + '</div>';

      const wf = P.$('#workflow', root);
      P.onceVisible(wf, () => wf.classList.add('lit'), '0px 0px -15% 0px');

      root.addEventListener('click', (e) => {
        const b = e.target.closest('.wf-btn');
        if (!b) return;
        const open = b.getAttribute('aria-expanded') === 'true';
        P.$$('.wf-btn', root).forEach((x) => { x.setAttribute('aria-expanded', 'false'); x.nextElementSibling.hidden = true; });
        if (!open) { b.setAttribute('aria-expanded', 'true'); b.nextElementSibling.hidden = false; }
      });
    }
  };
})();
