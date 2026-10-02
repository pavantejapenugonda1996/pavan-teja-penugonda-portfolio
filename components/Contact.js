/* CONTACT: action buttons and a minimal form that opens the visitor's email client (no backend needed). */
(function () {
  const P = (window.PTP = window.PTP || {});
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  P.Contact = {
    mount(root) {
      const s = P.data.site;
      root.innerHTML =
        '<div class="contact">' +
        '<div class="contact-actions reveal">' +
        '<a class="btn primary" href="#contact-form" data-talk>Let\'s Talk</a>' +
        '<a class="btn" href="' + P.esc(s.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a>' +
        '<a class="btn" href="' + P.esc(s.github) + '" target="_blank" rel="noopener">GitHub</a>' +
        '<a class="btn" href="mailto:' + P.esc(s.email) + '">Email</a>' +
        '<button type="button" class="btn ghost" id="copy-email">Copy email</button></div>' +
        '<form id="contact-form" class="cform reveal" novalidate>' +
        '<label for="cf-name">Name<input id="cf-name" name="name" type="text" required maxlength="100" autocomplete="name"></label>' +
        '<label for="cf-email">Email<input id="cf-email" name="email" type="email" required maxlength="150" autocomplete="email"></label>' +
        '<label for="cf-message" class="full">What problem are you solving?<textarea id="cf-message" name="message" rows="5" required maxlength="2000"></textarea></label>' +
        '<div class="full cform-foot"><button type="submit" class="btn primary">Send message</button><p id="cf-status" class="form-status" role="status" aria-live="polite"></p></div>' +
        '</form></div>';

      const form = P.$('#contact-form', root);
      const status = P.$('#cf-status', root);

      P.$('[data-talk]', root).addEventListener('click', (e) => {
        e.preventDefault();
        form.scrollIntoView({ behavior: P.reducedMotion() ? 'auto' : 'smooth', block: 'center' });
        P.$('#cf-name', root).focus({ preventScroll: true });
      });

      P.$('#copy-email', root).addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const done = (msg) => { btn.textContent = msg; setTimeout(() => { btn.textContent = 'Copy email'; }, 1800); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(s.email).then(() => done('Copied'), () => done(s.email));
        } else { done(s.email); }
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = P.$('#cf-name', form).value.trim();
        const email = P.$('#cf-email', form).value.trim();
        const message = P.$('#cf-message', form).value.trim();
        status.className = 'form-status';
        if (!name || !email || !message) { status.textContent = 'Please fill in all fields.'; status.classList.add('error'); return; }
        if (!EMAIL_RE.test(email)) { status.textContent = 'Please enter a valid email address.'; status.classList.add('error'); return; }
        const subject = encodeURIComponent('Portfolio inquiry from ' + name);
        const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>');
        window.location.href = 'mailto:' + s.email + '?subject=' + subject + '&body=' + body;
        status.textContent = 'Opening your email app. If nothing opens, email me directly at ' + s.email + '.';
        status.classList.add('ok');
      });
    }
  };
})();
