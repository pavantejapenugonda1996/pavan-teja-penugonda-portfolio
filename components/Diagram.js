/*
 * Shared architecture diagram renderers.
 *   flow()      horizontal flow on desktop, vertical on mobile (project dialog)
 *   vertical()  vertical flow with stage tags (System Explorer)
 *   stages()    five-column Input -> Output diagram (Architecture Gallery)
 * All nodes are buttons. bind() wires click and keyboard selection to an info panel.
 */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;
  const pad = (i) => (i < 9 ? '0' : '') + (i + 1);

  function node(n, i, extra) {
    return '<button type="button" class="dnode" data-i="' + i + '" aria-pressed="false">' +
      '<span class="dnode-n">' + pad(i) + '</span><span class="dnode-l">' + esc(n.label) + '</span>' +
      (extra || '') + '</button>';
  }

  P.Diagram = {
    flatten(arch) {
      const out = [];
      arch.stages.forEach((nodes, si) => nodes.forEach((n) => out.push({ label: n.label, info: n.info, stage: P.data.stageNames[si] })));
      return out;
    },

    flow(nodes) {
      return '<ol class="flow">' + nodes.map((n, i) =>
        (i ? '<li class="flow-link" aria-hidden="true"><i></i></li>' : '') + '<li>' + node(n, i) + '</li>'
      ).join('') + '</ol>';
    },

    vertical(nodes) {
      return '<ol class="vflow">' + nodes.map((n, i) =>
        (i ? '<li class="vlink" aria-hidden="true"><i></i></li>' : '') +
        '<li class="vitem" style="--i:' + i + '">' + node(n, i, '<span class="dnode-s">' + esc(n.stage) + '</span>') + '</li>'
      ).join('') + '</ol>';
    },

    stages(arch) {
      let idx = 0;
      return '<div class="stages">' + arch.stages.map((nodes, si) => {
        const html = nodes.map((n) => node(n, idx++)).join('');
        return (si ? '<div class="stage-link" aria-hidden="true"><i></i></div>' : '') +
          '<div class="stage"><p class="stage-name">' + esc(P.data.stageNames[si]) + '</p><div class="stage-nodes">' + html + '</div></div>';
      }).join('') + '</div>';
    },

    infoHtml(n, i, extra) {
      return '<p class="dinfo-tag">' + esc(n.stage || 'Step ' + pad(i)) + ' · ' + pad(i) + '</p><h4>' + esc(n.label) + '</h4><p>' + esc(n.info) + '</p>' + (extra || '');
    },

    /* Select a node and render its explanation into `panel`. Returns { select }. */
    bind(root, nodes, panel, extraFn) {
      const buttons = P.$$('.dnode', root);
      function select(i) {
        buttons.forEach((b) => {
          const on = Number(b.getAttribute('data-i')) === i;
          b.classList.toggle('active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        if (nodes[i]) panel.innerHTML = P.Diagram.infoHtml(nodes[i], i, extraFn ? extraFn(nodes[i], i) : '');
      }
      root.addEventListener('click', (e) => {
        const b = e.target.closest('.dnode');
        if (b && root.contains(b)) select(Number(b.getAttribute('data-i')));
      });
      select(0);
      return { select: select };
    }
  };
})();
