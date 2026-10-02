/* Application entry: mounts every component from the structured data. */
(function () {
  const P = window.PTP;

  function mount(name, id) {
    const root = document.getElementById(id);
    if (root && P[name]) {
      try { P[name].mount(root); } catch (err) { console.error('Failed to mount ' + name, err); }
    }
  }

  function init() {
    P.Nav.init();
    P.Project.init();
    P.Hero.mount();

    mount('Metrics', 'metrics-root');
    mount('SkillGraph', 'skillgraph-root');
    mount('Lab', 'lab-root');
    mount('Explorer', 'explorer-root');
    mount('Process', 'process-root');
    mount('Gallery', 'gallery-root');
    mount('Timeline', 'timeline-root');
    mount('AIChat', 'chat-root');
    mount('Skills', 'skills-root');
    mount('About', 'about-root');
    mount('Resume', 'resume-root');
    mount('Contact', 'contact-root');
    mount('Footer', 'footer-root');

    const cs = document.querySelector('[data-case-studies]');
    if (cs) cs.addEventListener('click', (e) => { e.preventDefault(); P.scrollToId('lab'); });

    P.watchLive(P.$$('[data-live]'));
    P.reveal(document);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
