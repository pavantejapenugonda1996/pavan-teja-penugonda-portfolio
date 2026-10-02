/* "How I turn problems into systems" stages and the two engineering lenses. */
(function () {
  const P = (window.PTP = window.PTP || {});
  P.data = P.data || {};

  P.data.processStages = [
    { num: '01', title: 'UNDERSTAND', text: 'Business problem, users, constraints, risk', detail: 'I start from the business problem, not the tool. Requirements are gathered with stakeholders and turned into user stories and acceptance criteria.' },
    { num: '02', title: 'DESIGN', text: 'Architecture, data flow, AI strategy', detail: 'I pick the simplest architecture that meets the need and can grow, and decide where AI creates value and where plain code is better.' },
    { num: '03', title: 'BUILD', text: 'APIs, services, models, agents', detail: 'Thin vertical slices with tests, so feedback comes early. Small services with clear contracts.' },
    { num: '04', title: 'EVALUATE', text: 'Accuracy, performance, reliability, explainability', detail: 'Prove it on real, hard cases with the metrics that matter to the business, not just clean data.' },
    { num: '05', title: 'OPERATE', text: 'Monitoring, automation, continuous improvement', detail: 'Logging, tracing, and monitoring after launch, with outputs explainable enough to stand up in an audit.' }
  ];

  P.data.lenses = [
    {
      id: 'software',
      title: 'As a software engineer',
      points: [
        ['Start with requirements', 'Gather the need with stakeholders and agree on acceptance criteria before writing code.'],
        ['Profile, do not guess', 'Logging and distributed tracing show where the time goes.'],
        ['Small services, clear contracts', 'Each microservice can be developed, tested, scaled, and deployed independently.'],
        ['Resilient by design', 'Async processing with timeouts, retries, and queues.'],
        ['Tests that guard quality', 'Unit, integration, and regression tests, with load tests as release gates.'],
        ['Ship safely', 'CI/CD pipelines and rollback, with traces that make issues fast to root-cause.']
      ]
    },
    {
      id: 'ai',
      title: 'As an AI engineer',
      points: [
        ['Ground, do not guess', 'Retrieval first: models answer from retrieved evidence with citations.'],
        ['Narrow skills over one giant prompt', 'Specialised, skill-based agents with structured outputs are easier to test and swap.'],
        ["Do not trust the model alone", 'Pair LLM output with deterministic checks and route low-confidence cases to a human.'],
        ['Pick the metric by risk', 'Track recall, false-positive reduction, and citation correctness, not just accuracy.'],
        ['Evaluate on the hard cases', 'Use reviewer-labelled samples before anything goes live.'],
        ['Explain and guard', 'Confidence scores, schema-validated outputs, least-privilege MCP tools, and drift monitoring.']
      ]
    }
  ];
})();
