/* Profile and site configuration. */
(function () {
  const P = (window.PTP = window.PTP || {});
  P.data = P.data || {};

  P.data.site = {
    name: 'Pavan Teja Penugonda',
    title: 'Senior Software Engineer',
    tagline: 'Senior Software Engineer · AI / LLM · Solution Architecture · Compliance Technology',
    footerTagline: 'Senior Software Engineer · AI / LLM · Solution Architecture',
    email: 'pavantejapenugonda3@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pavantejapenugonda',
    linkedinLabel: 'linkedin.com/in/pavantejapenugonda',
    github: 'https://github.com/pavantejapenugonda1996',
    githubLabel: 'github.com/pavantejapenugonda1996',
    resume: 'Pavan_Teja_Penugonda_01_25_2026.pdf',
    location: 'San Antonio, TX, USA',
    workStatus: 'H-1B',

    /*
     * Ask Pavan's AI configuration.
     *   mode: 'mock' answers from the curated knowledge base in data/chat.js.
     *   mode: 'api'  POSTs { question, history } to `endpoint` and expects
     *                { answer: string, sources?: [{ id, title }] }.
     * Future backend: React -> FastAPI -> Query Router -> Embeddings -> Vector DB -> Portfolio KB -> LLM -> Answer.
     */
    chat: { mode: 'mock', endpoint: '/api/chat' }
  };
})();
