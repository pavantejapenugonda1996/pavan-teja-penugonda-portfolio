/*
 * Hero: story strip (PROBLEM -> ... -> IMPACT) and a canvas that draws an AI pipeline:
 * data sources -> retrieval -> agents -> decisions -> outputs, with request packets travelling along edges.
 * Pauses when off-screen or when the tab is hidden. Draws one static frame under prefers-reduced-motion.
 */
(function () {
  const P = (window.PTP = window.PTP || {});

  const STORY = [
    { label: 'PROBLEM', text: 'Business problem, risk, constraints', href: '#process' },
    { label: 'ENGINEERING', text: 'Clean, tested, production code', href: '#lab' },
    { label: 'AI', text: 'LLMs, RAG, agents, ML where they add value', href: '#build' },
    { label: 'ARCHITECTURE', text: 'Observable, explainable systems', href: '#architectures' },
    { label: 'IMPACT', text: 'Measured outcomes', href: '#impact' }
  ];

  const LAYERS = ['INGEST', 'RETRIEVE', 'REASON', 'DECIDE', 'EXPLAIN'];
  const ACCENT = '61,217,192';
  const AMBER = '230,180,80';

  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function mountStory() {
    const root = P.$('#hero-story');
    if (!root) return;
    root.innerHTML = STORY.map((s, i) =>
      '<li><a href="' + s.href + '"><span class="story-n">0' + (i + 1) + '</span><strong>' + s.label + '</strong><span class="story-t">' + P.esc(s.text) + '</span></a></li>'
    ).join('');
  }

  function mountCanvas() {
    const canvas = P.$('#hero-canvas');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;
    const reduced = P.reducedMotion();
    let w = 0, h = 0, dpr = 1, nodes = [], edges = [], packets = [], running = false, visible = true, last = 0, spawnAt = 0, raf = 0;

    function build() {
      const rand = rng(7);
      const mobile = w < 720;
      const x0 = mobile ? w * 0.06 : w * 0.52;
      const x1 = mobile ? w * 0.94 : w * 0.96;
      const counts = mobile ? [3, 4, 4, 3, 2] : [4, 6, 6, 5, 3];
      const top = h * (mobile ? 0.12 : 0.18), bottom = h * (mobile ? 0.62 : 0.80);
      nodes = []; edges = [];
      const cols = counts.map((c, li) => {
        const col = [];
        for (let i = 0; i < c; i++) {
          const x = x0 + (x1 - x0) * (li / (LAYERS.length - 1)) + (rand() - 0.5) * (mobile ? 6 : 22);
          const y = top + (bottom - top) * ((i + 0.5) / c) + (rand() - 0.5) * 18;
          const node = { x: x, y: y, layer: li, pulse: 0, out: [] };
          nodes.push(node); col.push(node);
        }
        return col;
      });
      for (let li = 0; li < cols.length - 1; li++) {
        cols[li].forEach((a, i) => {
          const sorted = cols[li + 1].slice().sort((p, q) => Math.abs(p.y - a.y) - Math.abs(q.y - a.y));
          const k = rand() > 0.55 ? 2 : 1;
          for (let j = 0; j < k && j < sorted.length; j++) {
            const e = { a: a, b: sorted[j] };
            edges.push(e); a.out.push(e);
          }
        });
        /* make sure every node in the next layer has an inbound edge */
        cols[li + 1].forEach((b) => {
          if (!edges.some((e) => e.b === b)) {
            const a = cols[li].slice().sort((p, q) => Math.abs(p.y - b.y) - Math.abs(q.y - b.y))[0];
            const e = { a: a, b: b }; edges.push(e); a.out.push(e);
          }
        });
      }
      packets = [];
    }

    function resize() {
      const rect = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw(0);
    }

    function curve(e, t) {
      const a = e.a, b = e.b, mx = (b.x - a.x) / 2;
      const u = 1 - t;
      const x = u * u * u * a.x + 3 * u * u * t * (a.x + mx) + 3 * u * t * t * (b.x - mx) + t * t * t * b.x;
      const y = u * u * u * a.y + 3 * u * u * t * a.y + 3 * u * t * t * b.y + t * t * t * b.y;
      return { x: x, y: y };
    }

    function drawNode(n) {
      const glow = n.pulse;
      const col = n.layer >= 3 ? AMBER : ACCENT;
      if (glow > 0.02) {
        ctx.fillStyle = 'rgba(' + col + ',' + (0.18 * glow) + ')';
        ctx.beginPath(); ctx.arc(n.x, n.y, 14 * glow + 5, 0, 6.283); ctx.fill();
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(' + col + ',' + (0.35 + 0.5 * glow) + ')';
      ctx.fillStyle = 'rgba(10,14,20,0.95)';
      const L = n.layer;
      if (L === 0) { ctx.fillRect(n.x - 4, n.y - 4, 8, 8); ctx.strokeRect(n.x - 4, n.y - 4, 8, 8); }
      else if (L === 3) {
        ctx.beginPath(); ctx.moveTo(n.x, n.y - 6); ctx.lineTo(n.x + 6, n.y); ctx.lineTo(n.x, n.y + 6); ctx.lineTo(n.x - 6, n.y); ctx.closePath(); ctx.fill(); ctx.stroke();
      } else {
        const r = L === 2 ? 6 : 4;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 6.283); ctx.fill(); ctx.stroke();
        if (L === 2) { ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, 6.283); ctx.fillStyle = 'rgba(' + col + ',0.8)'; ctx.fill(); }
      }
    }

    function draw(dt) {
      ctx.clearRect(0, 0, w, h);
      /* layer guides + labels */
      ctx.font = '500 10px "JetBrains Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      const seen = {};
      nodes.forEach((n) => { if (!seen[n.layer]) seen[n.layer] = { x: 0, c: 0 }; seen[n.layer].x += n.x; seen[n.layer].c++; });
      Object.keys(seen).forEach((k) => {
        const x = seen[k].x / seen[k].c;
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.beginPath(); ctx.moveTo(x, h * 0.1); ctx.lineTo(x, h * 0.9); ctx.stroke();
        ctx.fillStyle = 'rgba(155,165,180,0.55)';
        ctx.fillText(LAYERS[k], x, h * (w < 720 ? 0.08 : 0.13));
      });
      /* edges */
      ctx.lineWidth = 1;
      edges.forEach((e) => {
        ctx.strokeStyle = 'rgba(255,255,255,0.11)';
        ctx.beginPath(); ctx.moveTo(e.a.x, e.a.y);
        const mx = (e.b.x - e.a.x) / 2;
        ctx.bezierCurveTo(e.a.x + mx, e.a.y, e.b.x - mx, e.b.y, e.b.x, e.b.y); ctx.stroke();
      });
      nodes.forEach((n) => { n.pulse = Math.max(0, n.pulse - dt * 1.6); drawNode(n); });
      /* packets */
      packets.forEach((p) => {
        const col = p.edge.b.layer >= 3 ? AMBER : ACCENT;
        const head = curve(p.edge, p.t);
        const tail = curve(p.edge, Math.max(0, p.t - 0.22));
        const g = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        g.addColorStop(0, 'rgba(' + col + ',0)'); g.addColorStop(1, 'rgba(' + col + ',0.9)');
        ctx.strokeStyle = g; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(tail.x, tail.y); ctx.lineTo(head.x, head.y); ctx.stroke();
        ctx.fillStyle = 'rgba(' + col + ',1)';
        ctx.beginPath(); ctx.arc(head.x, head.y, 2.2, 0, 6.283); ctx.fill();
      });
    }

    function step(dt) {
      spawnAt -= dt;
      if (spawnAt <= 0 && packets.length < (w < 720 ? 5 : 9)) {
        const starts = edges.filter((e) => e.a.layer === 0);
        packets.push({ edge: starts[Math.floor(Math.random() * starts.length)], t: 0, speed: 0.55 + Math.random() * 0.35 });
        spawnAt = 0.55 + Math.random() * 0.5;
      }
      packets = packets.filter((p) => {
        p.t += dt * p.speed;
        if (p.t >= 1) {
          p.edge.b.pulse = 1;
          const next = p.edge.b.out;
          if (!next.length) return false;
          p.edge = next[Math.floor(Math.random() * next.length)]; p.t = 0;
        }
        return true;
      });
    }

    function loop(ts) {
      if (!running) return;
      const dt = Math.min(0.05, (ts - last) / 1000 || 0);
      last = ts;
      step(dt); draw(dt);
      raf = requestAnimationFrame(loop);
    }

    function start() { if (running || reduced || !visible || document.hidden) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
    function stop() { running = false; cancelAnimationFrame(raf); }

    resize();
    if (reduced) {
      /* one static frame with a few lit nodes */
      nodes.forEach((n, i) => { if (i % 4 === 0) n.pulse = 0.7; });
      draw(0);
    }
    let rt = 0;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((es) => { visible = es[0].isIntersecting; visible ? start() : stop(); }, { threshold: 0 }).observe(hero);
    }
    start();
  }

  P.Hero = {
    mount() { mountStory(); mountCanvas(); }
  };
})();
