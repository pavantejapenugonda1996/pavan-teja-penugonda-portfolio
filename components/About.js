/* ABOUT: concise positioning, focus areas, client-facing strengths, and key facts. */
(function () {
  const P = (window.PTP = window.PTP || {});
  const esc = P.esc;

  const FOCUS = [
    ['Architecture', 'Simple, observable designs that fit the business need and can grow.'],
    ['Problem solving', 'Root-cause analysis and proof-of-concepts before big commitments.'],
    ['Automation', 'Replacing repetitive review work with reliable pipelines and agents.'],
    ['AI systems', 'LLMs, RAG, agents, and ML used where they create value.'],
    ['Performance', 'Measured, profiled improvements, such as a 200% speedup.'],
    ['Explainability', 'Citations, confidence scores, and audit trails by design.'],
    ['Business impact', 'Outcomes measured against the problem, such as 60–70% less review effort.']
  ];

  const CLIENT = [
    ['Requirement gathering', 'Turning business needs into clear, testable requirements.'],
    ['Stakeholder management', 'Aligning business, compliance, and technical teams.'],
    ['Client communication', 'Explaining AI results in plain language, with demos and documentation.'],
    ['Delivery ownership', 'Estimating, refining stories, and delivering with global teams.']
  ];

  const DOMAINS = ['AML / BSA', 'KYC and identity verification', 'OFAC sanctions and PEP screening', 'Enhanced due diligence', 'Transaction monitoring', 'Fraud detection', 'Regulatory coverage (FDA, EMA, SEC, ISO)', 'Model validation and stress testing', 'Audit readiness', 'OSINT and media analytics'];

  P.About = {
    mount(root) {
      const s = P.data.site;
      root.innerHTML =
        '<div class="about">' +
        '<div class="about-main reveal">' +
        '<p class="about-lead">A Senior Software Engineer working at the intersection of <strong>software engineering</strong>, <strong>AI</strong>, <strong>machine learning</strong>, and <strong>compliance technology</strong>.</p>' +
        '<p>I start from the business problem, design the architecture, build the software, and bring in AI only where it creates value. Then I measure the outcome and make the system explainable enough to stand up in an audit.</p>' +
        '<p>With 7+ years across Python backends, microservices, ML models, and agentic LLM systems, my recent work supports AML, KYC, and sanctions programs for major U.S. banks through EY, working directly with clients and stakeholders.</p>' +
        '<h3 class="mini-title">Domain areas</h3><ul class="tags">' + DOMAINS.map((d) => '<li>' + esc(d) + '</li>').join('') + '</ul>' +
        '</div>' +
        '<ul class="facts reveal">' +
        '<li><span>Location</span>' + esc(s.location) + '</li>' +
        '<li><span>Work status</span>' + esc(s.workStatus) + '</li>' +
        '<li><span>Current</span>Senior Analyst, EY US LLC</li>' +
        '<li><span>Education</span>' + esc(P.data.education[0].degree) + '</li>' +
        '<li><span>Industry</span>Major U.S. banks and financial institutions</li></ul></div>' +
        '<div class="focus reveal">' + FOCUS.map((f) => '<div class="focus-item"><h4>' + esc(f[0]) + '</h4><p>' + esc(f[1]) + '</p></div>').join('') + '</div>' +
        '<h3 class="mini-title">Client-facing strengths</h3>' +
        '<div class="client reveal">' + CLIENT.map((f) => '<div class="client-item"><h4>' + esc(f[0]) + '</h4><p>' + esc(f[1]) + '</p></div>').join('') + '</div>';
    }
  };
})();
