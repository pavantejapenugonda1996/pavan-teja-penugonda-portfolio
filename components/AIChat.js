/*
 * ASK PAVAN'S AI.
 * UI -> ChatService.ask() -> provider. Switch providers in data/site.js (chat.mode).
 *   mock: routes the question to the curated knowledge base in data/chat.js.
 *   api : POST { question, history } to chat.endpoint, expects { answer, sources?: [{ id, title }] }.
 */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;

  const FALLBACK = "I don't have a good answer for that in my knowledge base yet. Try one of the suggested questions, or use the contact form to ask Pavan directly.";

  function has(text, pattern) {
    const p = pattern.trim();
    if (p.length <= 4) return new RegExp('\\b' + p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(text);
    return text.indexOf(p) !== -1;
  }

  const providers = {
    mock(question) {
      const q = question.toLowerCase();
      let best = null, bestScore = 0;
      P.data.chatKnowledge.forEach((entry) => {
        const score = entry.patterns.reduce((s, p) => s + (has(q, p) ? p.trim().length : 0), 0);
        if (score > bestScore) { best = entry; bestScore = score; }
      });
      const result = best
        ? { answer: best.answer, sources: (best.projects || []).map((id) => ({ id: id, title: P.getProject(id).title })) }
        : { answer: FALLBACK, sources: [] };
      return new Promise((resolve) => setTimeout(() => resolve(result), 450));
    },

    api(question, history) {
      return fetch(P.data.site.chat.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question, history: history })
      }).then((r) => {
        if (!r.ok) throw new Error('Chat service returned ' + r.status);
        return r.json();
      });
    }
  };

  P.ChatService = {
    ask(question, history) {
      const mode = P.data.site.chat.mode;
      return (providers[mode] || providers.mock)(question, history);
    }
  };

  P.AIChat = {
    mount(root) {
      root.innerHTML =
        '<div class="chat">' +
        '<div class="chat-main"><div class="chat-bar"><span class="chat-dot" aria-hidden="true"></span><span>Portfolio assistant</span><em>Demo mode: answers come from a curated knowledge base</em></div>' +
        '<div class="chat-log" id="chat-log" role="log" aria-live="polite" aria-label="Conversation"></div>' +
        '<form class="chat-form" id="chat-form" autocomplete="off"><label class="sr-only" for="chat-input">Ask a question</label>' +
        '<input id="chat-input" type="text" maxlength="300" placeholder="Ask about skills, systems, or experience" required>' +
        '<button type="submit" class="btn primary sm">Ask</button></form></div>' +
        '<aside class="chat-side"><p class="chat-side-title">Suggested questions</p><div class="chat-sugg" id="chat-sugg">' +
        P.data.chatSuggestions.map((s) => '<button type="button" class="sugg">' + esc(s) + '</button>').join('') + '</div>' +
        '<p class="chat-side-title">Production path</p><ol class="chat-path">' +
        ['React', 'FastAPI', 'Query Router', 'Embeddings', 'Vector Database', 'Portfolio Knowledge Base', 'LLM', 'Answer'].map((s) => '<li>' + s + '</li>').join('') +
        '</ol></aside></div>';

      const log = P.$('#chat-log', root);
      const form = P.$('#chat-form', root);
      const input = P.$('#chat-input', root);
      const history = [];
      let busy = false;

      function bubble(role, text, sources) {
        const el = document.createElement('div');
        el.className = 'msg ' + role;
        const body = document.createElement('p');
        body.textContent = text;
        el.appendChild(body);
        log.appendChild(el);
        log.scrollTop = log.scrollHeight;
        return el;
      }

      function typeInto(el, text, done) {
        const p = el.firstChild;
        if (P.reducedMotion()) { p.textContent = text; done(); return; }
        const words = text.split(' ');
        let i = 0;
        p.textContent = '';
        const timer = setInterval(() => {
          i = Math.min(words.length, i + 2);
          p.textContent = words.slice(0, i).join(' ');
          log.scrollTop = log.scrollHeight;
          if (i >= words.length) { clearInterval(timer); done(); }
        }, 28);
      }

      function addSources(el, sources) {
        if (!sources || !sources.length) return;
        const wrap = document.createElement('div');
        wrap.className = 'msg-sources';
        wrap.innerHTML = '<span>Related systems</span>' + sources.map((s) =>
          '<button type="button" data-open="' + esc(s.id) + '">' + esc(s.title) + '</button>').join('');
        el.appendChild(wrap);
        log.scrollTop = log.scrollHeight;
      }

      function ask(question) {
        const q = question.trim();
        if (!q || busy) return;
        busy = true;
        bubble('user', q);
        history.push({ role: 'user', text: q });
        const pending = bubble('bot pending', 'Thinking…');
        P.ChatService.ask(q, history.slice(-6)).then((res) => {
          pending.className = 'msg bot';
          typeInto(pending, res.answer, () => { addSources(pending, res.sources); history.push({ role: 'assistant', text: res.answer }); busy = false; });
        }).catch(() => {
          pending.className = 'msg bot error';
          pending.firstChild.textContent = 'The assistant could not be reached. Please try again, or use the contact form below.';
          busy = false;
        });
      }

      form.addEventListener('submit', (e) => { e.preventDefault(); const v = input.value; input.value = ''; ask(v); });
      root.addEventListener('click', (e) => {
        const s = e.target.closest('.sugg');
        if (s) { ask(s.textContent); return; }
        const o = e.target.closest('[data-open]');
        if (o) P.openProject(o.getAttribute('data-open'));
      });

      bubble('bot', "Hi, I'm a demo assistant that answers from Pavan's portfolio. Pick a suggested question or type your own.");
    }
  };
})();
