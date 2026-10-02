/* Verified figures from the resume only. Do not add metrics here that are not in the resume. */
(function () {
  const P = (window.PTP = window.PTP || {});
  P.data = P.data || {};

  P.data.metrics = [
    {
      id: 'years',
      value: 7,
      suffix: '+',
      label: 'Years of Engineering',
      context: 'Python, microservices, ML, and agentic AI',
      cta: 'See the journey',
      target: { section: 'journey' }
    },
    {
      id: 'tm-accuracy',
      value: 91,
      suffix: '%',
      label: 'Transaction Monitoring ML Accuracy',
      context: 'Random Forest and XGBoost alert classification',
      cta: 'View case study',
      target: { project: 'tm' }
    },
    {
      id: 'performance',
      value: 200,
      suffix: '%',
      label: 'Application Performance Improvement',
      context: 'KYC website performance improvement',
      cta: 'View case study',
      target: { project: 'perf' }
    },
    {
      id: 'review-effort',
      value: 60,
      suffix: '–70%',
      label: 'Manual Review Effort Reduction',
      context: 'Agentic regulatory coverage analysis',
      cta: 'View case study',
      target: { project: 'regulatory' }
    }
  ];
})();
