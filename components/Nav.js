/* Sticky navigation: compact on scroll, scroll progress, scroll-spy, mobile menu. */
(function () {
  const P = (window.PTP = window.PTP || {});

  P.Nav = {
    init() {
      const nav = P.$('#nav');
      const toggle = P.$('#menu-toggle');
      const menu = P.$('#menu');
      const bar = P.$('#nav-progress');
      const links = P.$$('a[href^="#"]', menu);
      const sections = P.$$('section[data-nav]');
      let ticking = false;

      function update() {
        const y = window.scrollY;
        nav.classList.toggle('is-compact', y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';

        let active = 'home';
        const line = window.innerHeight * 0.35;
        sections.forEach((s) => { if (s.getBoundingClientRect().top <= line) active = s.getAttribute('data-nav'); });
        links.forEach((a) => {
          const on = a.getAttribute('href') === '#' + active;
          a.classList.toggle('active', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
        ticking = false;
      }

      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      }

      function setMenu(open) {
        menu.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
      }

      toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
      menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
      document.addEventListener('click', (e) => { if (!nav.contains(e.target)) setMenu(false); });

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update();
    }
  };
})();
