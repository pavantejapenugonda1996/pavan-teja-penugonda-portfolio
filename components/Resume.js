/* RESUME: compact strip with download and profile links. */
(function () {
  const P = (window.PTP = window.PTP || {});

  P.Resume = {
    mount(root) {
      const s = P.data.site;
      root.innerHTML =
        '<div class="resume reveal"><div><p class="kicker">RESUME</p>' +
        '<h2 class="resume-title">The full record, in one page.</h2>' +
        '<p class="resume-text">7+ years of experience · ' + P.esc(P.data.education[0].degree) + ' · ' + P.esc(s.location) + '</p></div>' +
        '<div class="resume-actions"><a class="btn primary" href="' + P.esc(s.resume) + '" target="_blank" rel="noopener">Download Resume</a>' +
        '<a class="btn" href="' + P.esc(s.github) + '" target="_blank" rel="noopener">GitHub</a>' +
        '<a class="btn" href="' + P.esc(s.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' +
        '<a class="btn" href="mailto:' + P.esc(s.email) + '">Email</a></div></div>';
    }
  };
})();
