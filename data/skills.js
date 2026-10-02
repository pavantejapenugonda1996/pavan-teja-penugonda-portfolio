/*
 * Technologies, capability map layout, and expandable skill categories.
 * Which projects use a technology is derived from `tech` in data/projects.js.
 */
(function () {
  const P = (window.PTP = window.PTP || {});
  P.data = P.data || {};

  const t = (id, label, group) => ({ id: id, label: label, group: group });

  P.data.technologies = [
    t('llms', 'LLMs', 'AI / ML'), t('gpt', 'GPT', 'AI / ML'), t('rag', 'RAG', 'AI / ML'),
    t('agentic', 'Agentic AI', 'AI / ML'), t('ml', 'Machine Learning', 'AI / ML'),
    t('xgboost', 'XGBoost', 'AI / ML'), t('rf', 'Random Forest', 'AI / ML'), t('dl', 'Deep Learning', 'AI / ML'),

    t('python', 'Python', 'Software Engineering'), t('fastapi', 'FastAPI', 'Software Engineering'),
    t('flask', 'Flask', 'Software Engineering'), t('react', 'React', 'Software Engineering'),
    t('js', 'JavaScript', 'Software Engineering'), t('sql', 'SQL', 'Software Engineering'),
    t('microservices', 'Microservices', 'Software Engineering'),

    t('postgres', 'PostgreSQL', 'Data'), t('mongodb', 'MongoDB', 'Data'), t('dynamodb', 'DynamoDB', 'Data'),
    t('elasticsearch', 'Elasticsearch', 'Data'), t('chroma', 'Chroma', 'Data'), t('pipelines', 'Data Pipelines', 'Data'),

    t('aws', 'AWS', 'Cloud / DevOps'), t('azure', 'Azure', 'Cloud / DevOps'), t('gcp', 'GCP', 'Cloud / DevOps'),
    t('docker', 'Docker', 'Cloud / DevOps'), t('cicd', 'CI/CD', 'Cloud / DevOps'),

    t('aml', 'AML', 'Compliance Technology'), t('bsa', 'BSA', 'Compliance Technology'),
    t('kyc', 'KYC', 'Compliance Technology'), t('tm', 'Transaction Monitoring', 'Compliance Technology'),
    t('ofac', 'OFAC', 'Compliance Technology'), t('pep', 'PEP', 'Compliance Technology'),
    t('edd', 'EDD', 'Compliance Technology'), t('regcov', 'Regulatory Coverage', 'Compliance Technology')
  ];

  /* Capability map: AI branches into LLM / RAG / ML chains, which feed Applications, which branch into compliance domains. */
  P.data.capabilityMap = {
    root: { label: 'AI' },
    ai: [
      [{ label: 'LLM', tech: 'llms' }, { label: 'GPT', tech: 'gpt' }, { label: 'Agents', tech: 'agentic' }],
      [{ label: 'RAG', tech: 'rag' }, { label: 'Retrieval', tech: 'chroma' }, { label: 'Knowledge', tech: 'regcov' }],
      [{ label: 'ML', tech: 'ml' }, { label: 'XGBoost', tech: 'xgboost' }, { label: 'Models', tech: 'rf' }]
    ],
    applications: { label: 'APPLICATIONS' },
    domains: [
      [{ label: 'KYC', tech: 'kyc' }, { label: 'OFAC', tech: 'ofac' }],
      [{ label: 'AML', tech: 'aml' }, { label: 'EDD', tech: 'edd' }],
      [{ label: 'TM', tech: 'tm' }, { label: 'PEP', tech: 'pep' }]
    ]
  };

  /*
   * Expandable categories. Items with `tech` show the projects they were used in (derived).
   * `note` adds a short outcome or context line.
   */
  P.data.skillCategories = [
    {
      id: 'ai-ml',
      title: 'AI / ML',
      blurb: 'Models and retrieval that turn data into decisions.',
      items: [
        { label: 'XGBoost', tech: 'xgboost', note: '91% accuracy' },
        { label: 'Random Forest', tech: 'rf', note: 'Alert classification' },
        { label: 'RAG', tech: 'rag', note: 'Compliance knowledge systems' },
        { label: 'LLMs', tech: 'llms', note: 'Reasoning over evidence' },
        { label: 'GPT-4 / GPT-4o / GPT-4 Vision', tech: 'gpt', note: 'Document understanding and reasoning' },
        { label: 'Deep learning', tech: 'dl', note: 'M.S. in Artificial Intelligence' },
        { label: 'Image and text classification', note: 'KYC workflow at EY GDS' }
      ]
    },
    {
      id: 'software',
      title: 'Software Engineering',
      blurb: 'Production backends, interfaces, and services.',
      items: [
        { label: 'FastAPI', tech: 'fastapi', note: 'Agentic systems' },
        { label: 'Flask', tech: 'flask', note: 'KYC microservices' },
        { label: 'React', tech: 'react', note: 'Real-time reviewer UI' },
        { label: 'Python', tech: 'python', note: 'Primary language, 7+ years' },
        { label: 'Microservices', tech: 'microservices', note: 'Independent, scalable services' },
        { label: 'SQL', tech: 'sql', note: 'Query tuning and indexing' },
        { label: 'JavaScript', tech: 'js' },
        { label: 'Java, C#, VueJS, PowerApps, Selenium' }
      ]
    },
    {
      id: 'ai-eng',
      title: 'AI Engineering',
      blurb: 'Making LLM systems reliable, explainable, and safe to run.',
      items: [
        { label: 'Agentic workflows', tech: 'agentic', note: 'Async agent orchestration' },
        { label: 'Deep agents and skill-based agents', note: 'Plan, delegate, call reusable tools' },
        { label: 'MCP servers', note: 'Scoped access to enterprise data and tools' },
        { label: 'Confidence scoring', note: 'Routes low-confidence cases to humans' },
        { label: 'Explainability and audit trails', note: 'Citations and reasoning traces' },
        { label: 'Fine-tuning' }
      ]
    },
    {
      id: 'data',
      title: 'Data',
      blurb: 'Stores and pipelines behind the models.',
      items: [
        { label: 'Chroma', tech: 'chroma', note: 'Vector search for RAG' },
        { label: 'Data pipelines', tech: 'pipelines', note: 'ETL, cleansing, and validation' },
        { label: 'PostgreSQL', tech: 'postgres' },
        { label: 'MongoDB', tech: 'mongodb' },
        { label: 'DynamoDB', tech: 'dynamodb' },
        { label: 'Elasticsearch', tech: 'elasticsearch' },
        { label: 'MSSQL Server, Power BI' }
      ]
    },
    {
      id: 'cloud',
      title: 'Cloud / DevOps',
      blurb: 'Shipping and running systems reliably.',
      items: [
        { label: 'Azure', tech: 'azure', note: 'AKS configuration for performance' },
        { label: 'AWS', tech: 'aws' },
        { label: 'GCP', tech: 'gcp' },
        { label: 'Docker', tech: 'docker' },
        { label: 'CI/CD', tech: 'cicd', note: 'Pipelines with automated tests' },
        { label: 'Azure DevOps, GitHub' }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance Technology',
      blurb: 'The financial-crime and regulatory domain I build for.',
      items: [
        { label: 'KYC', tech: 'kyc', note: 'Agentic review and platform performance' },
        { label: 'Transaction Monitoring', tech: 'tm', note: 'ML alert classification' },
        { label: 'AML', tech: 'aml', note: 'Gap assessments and validation' },
        { label: 'OFAC', tech: 'ofac', note: 'Sanctions validation cases' },
        { label: 'Regulatory Coverage', tech: 'regcov', note: 'FDA, EMA, SEC, ISO mapping' },
        { label: 'BSA', tech: 'bsa' },
        { label: 'PEP', tech: 'pep' },
        { label: 'EDD', tech: 'edd' },
        { label: 'Case management, Model validation, Stress testing, Audit readiness' }
      ]
    }
  ];
})();
