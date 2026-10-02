/*
 * Projects shown in the AI Engineering Lab.
 * `flow` is the architecture: each node has a label and an explanation used by the interactive diagrams.
 * `tech` holds technology ids from data/skills.js and powers the capability map highlighting.
 * Client-sensitive details are intentionally kept generic.
 */
(function () {
  const P = (window.PTP = window.PTP || {});
  P.data = P.data || {};

  P.data.projects = [
    {
      id: 'regulatory',
      num: '01',
      title: 'Regulatory Intelligence',
      kind: 'Agentic regulatory coverage and gap analysis system',
      context: 'EY US LLC · 2025 to present',
      problem: 'Regulatory documents and organizational controls need to be compared.',
      badges: ['LLMs', 'GPT-4o', 'RAG', 'Python', 'Agents', 'Chroma'],
      tech: ['llms', 'gpt', 'rag', 'agentic', 'python', 'chroma', 'regcov'],
      impact: { metric: '60–70%', label: 'reduction in manual review effort' },
      flow: [
        { label: 'Document ingestion', info: 'Regulations, guidance notes, and historical audits are parsed, chunked, and embedded into a vector store.' },
        { label: 'RAG', info: 'Retrieves the clauses and evidence relevant to each control, so GPT-4o reasons over source text instead of model memory.' },
        { label: 'Agent orchestration', info: 'Coverage-scoring and gap-analysis agents are coordinated with plan-and-delegate steps.' },
        { label: 'Coverage analysis', info: 'Maps organizational controls to regulatory clauses and scores how well each clause is covered.' },
        { label: 'Gap analysis', info: 'Flags clauses with weak or missing coverage, along with the evidence behind that judgment.' },
        { label: 'Explainable report', info: 'An auto-generated report where each finding links back to the source passage it was based on.' }
      ]
    },
    {
      id: 'kyc',
      num: '02',
      title: 'KYC Intelligence',
      kind: 'Agentic KYC documentation and review system',
      context: 'EY US LLC · 2025 to present',
      problem: 'Reviewers inspect identity documents by hand and struggle to explain approve or reject decisions.',
      badges: ['GPT Vision', 'Python', 'FastAPI', 'React', 'Agent orchestration', 'Confidence scoring'],
      tech: ['llms', 'gpt', 'agentic', 'python', 'fastapi', 'react', 'js', 'kyc'],
      impact: { metric: 'Explainable', label: 'decisions with confidence scores and audit trails' },
      flow: [
        { label: 'Document', info: 'An identity document is submitted for review through the React interface.' },
        { label: 'GPT Vision', info: 'A GPT-4 Vision model reads the document, including layout, text, and visual features.' },
        { label: 'Data extraction', info: 'Structured fields such as name, date of birth, and document numbers are extracted into a schema.' },
        { label: 'Validation', info: 'Extracted data is checked against format rules and against the other fields on the document.' },
        { label: 'Fraud / inconsistency detection', info: 'Agents look for tampering signals and for mismatches between fields or documents.' },
        { label: 'Clarification agent', info: 'When something is ambiguous, an agent resolves it or asks for the specific missing information.' },
        { label: 'Decision agent', info: 'Combines validation results and agent findings into a recommendation with a confidence score.' },
        { label: 'Approve / Review', info: 'High-confidence cases are approved. Everything else goes to a human reviewer with the reasoning attached.' }
      ]
    },
    {
      id: 'tm',
      num: '03',
      title: 'Transaction Monitoring ML',
      kind: 'Machine learning alert classification',
      context: 'EY US LLC · 2025 to present',
      problem: 'Most monitoring alerts are false positives, so analysts spend time on noise instead of real risk.',
      badges: ['Python', 'Random Forest', 'XGBoost', 'Dashboards'],
      tech: ['ml', 'rf', 'xgboost', 'python', 'sql', 'pipelines', 'tm', 'aml'],
      impact: { metric: '91%', label: 'classification accuracy' },
      flow: [
        { label: 'Transaction data', info: 'Historical alerts and the analyst dispositions that closed them form the training data.' },
        { label: 'Feature engineering', info: 'Cleaned, validated data is turned into behavioural and customer signals the models can learn from.' },
        { label: 'ML model', info: 'Random Forest and XGBoost classifiers are trained and compared on held-out data.' },
        { label: 'Alert classification', info: 'Each new alert gets a class and a score, reducing the false positives analysts have to open.' },
        { label: 'Analyst workflow', info: 'Dashboards show scores and the signals behind them so analysts can verify and act.' }
      ]
    },
    {
      id: 'rag',
      num: '04',
      title: 'Compliance Intelligence / RAG',
      kind: 'Evidence-grounded knowledge system for compliance content',
      context: 'EY US LLC · 2025 to present',
      problem: 'Compliance teams need answers they can trace back to the exact regulatory source.',
      badges: ['RAG', 'GPT-4o', 'Chroma', 'Python', 'Embeddings'],
      tech: ['llms', 'gpt', 'rag', 'chroma', 'python', 'regcov'],
      impact: { metric: 'Cited', label: 'answers grounded in source documents' },
      flow: [
        { label: 'Regulatory documents', info: 'Regulations, guidance notes, and historical audits are the source of truth.' },
        { label: 'Chunking', info: 'Documents are split into passages that can be retrieved and read on their own.' },
        { label: 'Embeddings', info: 'Each passage is converted into a vector so it can be searched by meaning, not just keywords.' },
        { label: 'Vector search', info: 'A question is embedded and matched against the vector store (Chroma) to find the closest passages.' },
        { label: 'RAG', info: 'The retrieved passages are placed into the prompt as the only evidence the model may use.' },
        { label: 'LLM reasoning', info: 'GPT-4o reasons over the evidence to answer the question and to flag when evidence is missing.' },
        { label: 'Evidence', info: 'Source passages are attached to the answer so a reviewer can verify each statement.' },
        { label: 'Explainable answer', info: 'The final answer pairs the reasoning with citations, which makes it audit-ready.' }
      ]
    },
    {
      id: 'perf',
      num: '05',
      title: 'Performance Engineering',
      kind: 'Performance improvement of a Flask-based KYC microservice platform',
      context: 'EY GDS · 2021 to 2023',
      problem: 'A KYC microservice application was slow under load and hard to troubleshoot.',
      badges: ['Python', 'Flask', 'SQL', 'AKS', 'Distributed tracing', 'Multi-threading'],
      tech: ['python', 'flask', 'sql', 'microservices', 'azure', 'kyc'],
      impact: { metric: '200%', label: 'application performance improvement' },
      flow: [
        { label: 'Application bottleneck', info: 'Slow responses under load, with little visibility into where the time was going.' },
        { label: 'Profiling', info: 'Structured logging and distributed tracing show which calls and queries dominate the latency.' },
        { label: 'Code optimization', info: 'Hot paths in the service code are fixed first, based on the measurements.' },
        { label: 'SQL optimization', info: 'Slow queries are rewritten and tuned.' },
        { label: 'Indexing', info: 'Indexes are added where the query plans show scans on large tables.' },
        { label: 'Multithreading', info: 'Independent work is run in parallel instead of one step at a time.' },
        { label: 'Infrastructure optimization', info: 'AKS configuration changes remove infrastructure-level limits.' },
        { label: 'Improved performance', info: 'Re-measured performance confirms a 200% improvement.' }
      ]
    },
    {
      id: 'aml',
      num: '06',
      title: 'AML & Sanctions Validation Toolkit',
      kind: 'Validation and automation tooling for AML and sanctions programs',
      context: 'EY US LLC · 2025 to present',
      problem: 'AML gap assessments and sanctions screening need repeatable, evidence-backed validation.',
      badges: ['Python', 'SQL', 'ETL', 'Actimize'],
      tech: ['python', 'sql', 'pipelines', 'aml', 'bsa', 'ofac', 'pep', 'edd', 'tm'],
      impact: { metric: 'Automated', label: 'validation and model-testing reports' },
      flow: [
        { label: 'Source data', info: 'Data from multiple systems is pulled together for assessment.' },
        { label: 'ETL and validation', info: 'Optimized ETL pipelines cleanse the data and detect cross-system discrepancies.' },
        { label: 'OFAC test cases', info: 'Validation cases aligned with OFAC lists strengthen screening accuracy.' },
        { label: 'Stress testing and model validation', info: 'Automated stress tests and validation for OFAC, Red Flags, and Actimize models.' },
        { label: 'Reports', info: 'Standardized reports and workflows across TM, EDD, and PEP / sanctions work.' }
      ]
    },
    {
      id: 'osint',
      num: '07',
      title: 'OSINT & Multimodal RAG',
      kind: 'LLM proof-of-concepts for media and open-source intelligence',
      context: 'SS8 Networks · 2024',
      problem: 'Audio, image, video, and text intelligence is too large to review by hand.',
      badges: ['LLMs', 'RAG', 'Microservices', 'NLP'],
      tech: ['llms', 'rag', 'microservices'],
      impact: { metric: 'Multimodal', label: 'insight from one search experience' },
      flow: [
        { label: 'Media inputs', info: 'Audio, image, video, and text arrive as raw intelligence data.' },
        { label: 'Modality microservices', info: 'Separate services handle transcription and translation, image and video summarization, and text analytics.' },
        { label: 'Text and metadata', info: 'Every modality is converted into searchable text with timestamps and source references.' },
        { label: 'Search layer', info: 'One retrieval layer sits across all OSINT content.' },
        { label: 'RAG answers', info: 'A RAG model answers questions grounded in the retrieved source content.' }
      ]
    }
  ];
})();
