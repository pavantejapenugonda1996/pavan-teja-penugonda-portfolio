/*
 * Knowledge base for the mock "Ask Pavan's AI" provider.
 * Each entry: patterns (lowercase phrases used for routing), answer, and optional related project ids.
 * A real backend would replace this routing with: Query Router -> Embeddings -> Vector DB -> Portfolio KB -> LLM.
 */
(function () {
  const P = (window.PTP = window.PTP || {});
  P.data = P.data || {};

  P.data.chatSuggestions = [
    "What are Pavan's strongest AI skills?",
    'Explain the KYC AI system.',
    'How has Pavan used RAG?',
    'What is his AML experience?',
    'What is his experience with machine learning?',
    'What makes Pavan different from a typical AI engineer?',
    'Show me the most impactful project.'
  ];

  P.data.chatKnowledge = [
    {
      id: 'strongest',
      patterns: ['strongest', 'ai skills', 'best at', 'top skills', 'core skills', 'skills'],
      answer: "Pavan's strongest AI skills are agentic LLM systems (GPT-4o, GPT-4 Vision, deep agents, skill-based agents, and MCP servers), RAG knowledge layers over regulatory documents, and classical machine learning (Random Forest and XGBoost) for alert classification at 91% accuracy. What ties them together is explainability: confidence scores, citations, and audit-ready reasoning traces.",
      projects: ['kyc', 'regulatory', 'tm']
    },
    {
      id: 'kyc',
      patterns: ['kyc', 'know your customer', 'identity document', 'vision'],
      answer: 'The KYC AI system takes an identity document, reads it with GPT-4 Vision, extracts structured data, validates it, and runs fraud and inconsistency detection. A clarification agent resolves ambiguities, and a decision agent produces a recommendation with a confidence score. High-confidence cases are approved. Others go to a human reviewer with the reasoning attached, and every step is logged in an audit trail. It runs on a FastAPI backend with asynchronous agent orchestration and a React front end.',
      projects: ['kyc']
    },
    {
      id: 'rag',
      patterns: ['rag', 'retrieval', 'vector', 'embedding', 'knowledge base', 'chroma'],
      answer: 'Pavan has used RAG in three places. In Regulatory Intelligence, a knowledge layer over regulatory documents, guidance notes, and historical audits grounds GPT-4o so that coverage and gap findings carry citations. In Compliance Intelligence, the same pattern powers cited, audit-ready answers. In the SS8 Networks internship, he built a RAG model for OSINT search. In all cases the principle is the same: retrieve first, answer only from the evidence, and say so when evidence is missing.',
      projects: ['regulatory', 'rag', 'osint']
    },
    {
      id: 'aml',
      patterns: ['aml', 'anti-money', 'money laundering', 'bsa', 'sanction', 'ofac', 'compliance'],
      answer: 'Since 02/2025 at EY US LLC, Pavan has performed AML gap assessments, built Python and SQL data validation tools, and automated stress testing and model validation for OFAC, Red Flags, and Actimize models. He standardized workflows across transaction monitoring, EDD, and PEP / sanctions work, and built the transaction monitoring ML models. Earlier at EY GDS he worked on a KYC platform. This work has been for major U.S. banks and financial institutions.',
      projects: ['aml', 'tm']
    },
    {
      id: 'ml',
      patterns: ['machine learning', 'ml', 'xgboost', 'random forest', 'classifier'],
      answer: 'Pavan built Random Forest and XGBoost models that classify transaction monitoring alerts at 91% accuracy and significantly reduce false positives. At Smart Auto Systems he improved an ML algorithm to 87% through parameter tuning and data cleaning, and at EY GDS he built image classification and text detection for KYC. He also holds a Master\'s in Artificial Intelligence from the University of Bridgeport.',
      projects: ['tm']
    },
    {
      id: 'different',
      patterns: ['different', 'typical', 'unique', 'stand out', 'why pavan', 'why hire'],
      answer: "Many AI engineers can call a model. Pavan designs and builds the whole system around it: requirements, architecture, APIs, data pipelines, evaluation, performance, and monitoring. He brings 7+ years of production software engineering, a Master's in AI, and deep compliance-domain experience, and he is comfortable working directly with clients and stakeholders. He builds explainability in from the start, with citations, confidence scores, and audit trails.",
      projects: ['perf', 'kyc']
    },
    {
      id: 'impact',
      patterns: ['impactful', 'most impact', 'best project', 'biggest', 'highlight', 'achievement', 'results'],
      answer: 'The most impactful project by business outcome is Regulatory Intelligence, an agentic coverage and gap-analysis system that reduced manual review effort by 60–70% with explainable citations. Two other measured results: transaction monitoring ML at 91% classification accuracy, and a 200% performance improvement of a production KYC microservice platform.',
      projects: ['regulatory', 'tm', 'perf']
    },
    {
      id: 'performance',
      patterns: ['performance', 'optimiz', 'speed', 'latency', 'scal'],
      answer: 'At EY GDS, Pavan led the performance improvement team for a Flask-based KYC microservice application. He added structured logging and distributed tracing to find the real bottlenecks, then used multi-threading, SQL query optimization, indexing, and AKS configuration changes to improve performance by 200%.',
      projects: ['perf']
    },
    {
      id: 'agents',
      patterns: ['agent', 'mcp', 'agentic', 'deep agent', 'skill-based'],
      answer: 'Pavan builds agentic systems from skill-based agents with structured outputs, coordinated by deep agents that plan and delegate. Agents reach enterprise data and tools through MCP servers with narrow permissions, run asynchronously, and attach confidence scores and reasoning traces to results, with low-confidence cases routed to a human.',
      projects: ['kyc', 'regulatory']
    },
    {
      id: 'stack',
      patterns: ['tech stack', 'technologies', 'languages', 'python', 'fastapi', 'react', 'cloud', 'aws', 'azure', 'tools'],
      answer: 'Python (FastAPI, Flask), JavaScript and React, and SQL are the core. On the AI side: GPT-4 / GPT-4o / GPT-4 Vision, RAG with Chroma, Random Forest, and XGBoost. Data stores include PostgreSQL, MongoDB, DynamoDB, Elasticsearch, and MSSQL. He deploys across AWS, Azure, and GCP with Docker and CI/CD.',
      projects: []
    },
    {
      id: 'experience',
      patterns: ['background', 'career', 'work history', 'worked at', 'companies', 'employer', 'years of'],
      answer: 'Pavan has 7+ years of experience: Python Developer at Spry Technologies (2017 to 2020), Software Engineer at Smart Auto Systems (2020 to 2021), Senior Software Engineer at EY GDS (2021 to 2023), a Master\'s in AI at the University of Bridgeport (2023 to 2024) with a Teaching Assistant role, a Software Engineering Intern at SS8 Networks (2024), and Senior Analyst at EY US LLC since 02/2025.',
      projects: []
    },
    {
      id: 'contact',
      patterns: ['contact', 'hire', 'email', 'reach', 'linkedin', 'github', 'talk', 'available'],
      answer: 'You can reach Pavan at pavantejapenugonda3@gmail.com, on LinkedIn at linkedin.com/in/pavantejapenugonda, or through the contact form at the bottom of this page.',
      projects: []
    },
    {
      id: 'location',
      patterns: ['where', 'location', 'based', 'visa', 'work status', 'h-1b', 'h1b'],
      answer: 'Pavan is based in San Antonio, TX, USA, and his work status is H-1B.',
      projects: []
    }
  ];
})();
