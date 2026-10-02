/* Footer. */
(function () {
  const P = (window.PTP = window.PTP || {});

  P.Footer = {
    mount(root) {
      const s = P.data.site;
      root.innerHTML =
        '<div class="container footer-inner"><div><p class="footer-name">' + P.esc(s.name) + '</p><p class="footer-tag">' + P.esc(s.footerTagline) + '</p></div>' +
        '<p class="footer-links"><a href="' + P.esc(s.github) + '" target="_blank" rel="noopener">GitHub</a>' +
        '<a href="' + P.esc(s.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' +
        '<a href="mailto:' + P.esc(s.email) + '">Email</a></p></div>' +
        '<div class="container"><p class="copyright">&copy; ' + new Date().getFullYear() + ' ' + P.esc(s.name) + '. All rights reserved.</p></div>';
    }
  };
})();
