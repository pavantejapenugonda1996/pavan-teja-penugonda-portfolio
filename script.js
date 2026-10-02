(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  const menu = document.getElementById("menu");
  const menuBtn = document.getElementById("menu-toggle");
  menuBtn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    })
  );

  document.getElementById("year").textContent = new Date().getFullYear();

  // Contact form: opens the visitor's mail client with a prefilled message
  const EMAIL = "pavantejapenugonda3@gmail.com";
  const form = document.getElementById("contact-form");
  const status = document.getElementById("cf-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cf-name").value.trim();
    const from = document.getElementById("cf-email").value.trim();
    const msg = document.getElementById("cf-message").value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from);
    if (!name || !msg || !valid) {
      status.textContent = "Please enter your name, a valid email, and a message.";
      status.classList.add("error");
      return;
    }
    status.classList.remove("error");
    const subject = encodeURIComponent("Portfolio inquiry from " + name);
    const body = encodeURIComponent(msg + "\n\n-- " + name + " (" + from + ")");
    window.location.href = "mailto:" + EMAIL + "?subject=" + subject + "&body=" + body;
    status.textContent = "Opening your email app. If nothing opens, email me directly at " + EMAIL + ".";
  });

  const copyBtn = document.getElementById("copy-email");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      copyBtn.textContent = "Copied!";
    } catch {
      copyBtn.textContent = EMAIL;
    }
    setTimeout(() => (copyBtn.textContent = "Copy email address"), 2000);
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // Count-up stats
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduce) {
      el.textContent = target + suffix;
      return;
    }
    const start = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * p) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  // Case study tabs
  const tabs = document.querySelectorAll(".case-tab");
  const panels = document.querySelectorAll(".case-panel");
  tabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", String(on));
      });
      panels.forEach((p) => {
        const on = p.id === tab.dataset.case;
        p.hidden = !on;
        p.classList.toggle("active", on);
      });
    })
  );

  // Active nav link
  const links = [...menu.querySelectorAll("a")];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => s && spy.observe(s));
})();
