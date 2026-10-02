/*
 * Architectures for the System Explorer and the Architecture Gallery.
 * Every architecture follows Input -> Processing -> Intelligence -> Decision -> Output.
 * The explorer flattens the stages into one vertical flow.
 */
(function () {
  const P = (window.PTP = window.PTP || {});
  P.data = P.data || {};

  const n = (label, info) => ({ label: label, info: info });

  P.data.stageNames = ['Input', 'Processing', 'Intelligence', 'Decision', 'Output'];

  P.data.architectures = [
    {
      id: 'kyc',
      name: 'KYC AI',
      explorer: true,
      gallery: true,
      project: 'kyc',
      summary: 'Turns an identity document into an explainable approve-or-review decision.',
      stages: [
        [n('Document', 'The identity document enters the system through the React reviewer interface.')],
        [
          n('Vision model', 'A GPT-4 Vision model reads the document layout, text, and visual features.'),
          n('Extraction', 'Structured fields are extracted into a schema so later steps work on data, not pixels.'),
          n('Validation', 'Extracted fields are checked for format and for consistency with each other.')
        ],
        [n('Agent orchestration', 'Skill-based agents run asynchronously: fraud and inconsistency detection, and a clarification agent for ambiguities.')],
        [
          n('Decision', 'A decision agent combines all findings into a recommendation.'),
          n('Confidence score', 'The recommendation carries a confidence score that determines what happens next.')
        ],
        [
          n('Approve / Review', 'High-confidence cases are approved. The rest go to a human reviewer with reasoning attached.'),
          n('Audit trail', 'Every step and its reasoning is recorded so the decision can be explained later.')
        ]
      ]
    },
    {
      id: 'regulatory',
      name: 'Regulatory AI',
      explorer: true,
      gallery: false,
      project: 'regulatory',
      summary: 'Compares regulatory clauses with organizational controls and reports coverage gaps with citations.',
      stages: [
        [
          n('Regulatory documents', 'Regulations, guidance notes, and historical audits from multiple agencies.'),
          n('Organizational controls', 'The controls the organization says it has in place.')
        ],
        [
          n('Ingest and chunk', 'Documents are parsed and split into retrievable passages.'),
          n('Embed and index', 'Passages are embedded and stored in a vector store.')
        ],
        [
          n('RAG retrieval', 'Finds the evidence relevant to each control and clause.'),
          n('Agent orchestration', 'Coverage-scoring and gap-analysis agents are coordinated.')
        ],
        [
          n('Coverage and gap analysis', 'Scores coverage per clause and flags weak or missing coverage.')
        ],
        [n('Explainable report', 'Findings with citations that link back to the source passages.')]
      ]
    },
    {
      id: 'tm',
      name: 'Transaction Monitoring',
      explorer: true,
      gallery: true,
      project: 'tm',
      summary: 'Classifies monitoring alerts so analysts spend their time on real risk.',
      stages: [
        [n('Transaction data', 'Historical alerts and analyst dispositions.')],
        [
          n('ETL and validation', 'Cleansing and normalization of data from source systems.'),
          n('Feature engineering', 'Behavioural and customer signals for the models.')
        ],
        [n('ML models', 'Random Forest and XGBoost classifiers, compared and validated on later data.')],
        [n('Alert classification', 'Each alert gets a class and a score, reducing false positives. 91% classification accuracy.')],
        [
          n('Analyst workflow', 'Alerts reach analysts ordered and explained by the signals behind the score.'),
          n('Dashboards', 'Predictive insights for stakeholders.')
        ]
      ]
    },
    {
      id: 'rag',
      name: 'RAG',
      explorer: true,
      gallery: true,
      project: 'rag',
      summary: 'Answers questions only from retrieved evidence, with citations.',
      stages: [
        [
          n('Documents', 'The source of truth for the knowledge base.'),
          n('User question', 'A natural-language question from the user.')
        ],
        [
          n('Chunking', 'Documents are split into passages that can be read on their own.'),
          n('Embeddings', 'Passages and questions are converted into vectors.'),
          n('Vector search', 'The closest passages are found in the vector store (Chroma).')
        ],
        [
          n('Prompt with evidence', 'Retrieved passages are the only evidence the model may use.'),
          n('LLM reasoning', 'The model reasons over the evidence or reports that it is insufficient.')
        ],
        [n('Grounding check', 'The answer is checked against the evidence it cites.')],
        [n('Explainable answer', 'An answer with citations the user can verify.')]
      ]
    },
    {
      id: 'agentic',
      name: 'Agentic AI',
      explorer: true,
      gallery: true,
      project: 'kyc',
      summary: 'A planner delegates to skill-based agents that use tools through MCP servers.',
      stages: [
        [n('Task or goal', 'A business task such as "review this case" or "assess this clause".')],
        [
          n('Planner', 'A deep agent breaks the task into steps and delegates them.'),
          n('MCP tool layer', 'MCP servers expose enterprise data and tools with narrow permissions.')
        ],
        [n('Skill-based agents', 'Specialised agents with structured outputs, each owning one skill.')],
        [
          n('Guardrails', 'Schema validation and deterministic checks on agent output.'),
          n('Confidence and human review', 'Low-confidence results are routed to a person.')
        ],
        [n('Result with reasoning trace', 'The outcome plus the steps that produced it, ready for audit.')]
      ]
    },
    {
      id: 'compliance',
      name: 'Compliance Intelligence',
      explorer: false,
      gallery: true,
      project: 'regulatory',
      summary: 'A platform view: documents, transactions, and regulations feed agents, ML, and RAG into audit-ready decisions.',
      stages: [
        [
          n('Customer documents', 'Identity and onboarding documents.'),
          n('Transactions', 'Transaction and alert data.'),
          n('Regulations', 'Regulatory text and guidance.')
        ],
        [
          n('Document extraction', 'Vision and extraction services for documents.'),
          n('Data pipelines', 'ETL, validation, and feature preparation.'),
          n('Knowledge ingestion', 'Chunking, embeddings, and indexing.')
        ],
        [
          n('Agents', 'Specialised agents for review and gap analysis.'),
          n('ML models', 'Classifiers for alerts and risk.'),
          n('RAG', 'Evidence retrieval for explanation.')
        ],
        [n('Risk and coverage decisions', 'Approve, escalate, classify, or flag, each with a confidence score.')],
        [
          n('Reports and dashboards', 'Outputs for analysts and stakeholders.'),
          n('Audit trail', 'Evidence and reasoning kept with every decision.')
        ]
      ]
    },
    {
      id: 'microservices',
      name: 'Microservices',
      explorer: false,
      gallery: true,
      project: 'perf',
      summary: 'Independent services with clear contracts, observability, and room for model-backed services.',
      stages: [
        [n('Client request', 'A user or system calls the platform through an API.')],
        [
          n('Services (Flask / FastAPI)', 'Each capability is a small service with a defined API.'),
          n('Queues and async workers', 'Slow or parallel work runs outside the request path.')
        ],
        [
          n('Model-backed services', 'ML or LLM capabilities exposed behind the same kind of API.'),
          n('Data layer', 'SQL and NoSQL stores with tuned queries and indexes.')
        ],
        [n('Rules and routing', 'Business rules decide how results are combined and returned.')],
        [
          n('Response', 'The result returns to the caller.'),
          n('Logs and traces', 'Structured logs and distributed traces make issues fast to root-cause.')
        ]
      ]
    },
    {
      id: 'fastapi-react',
      name: 'FastAPI + React',
      explorer: false,
      gallery: true,
      project: 'kyc',
      summary: 'A responsive React interface over an asynchronous FastAPI backend that orchestrates AI work.',
      stages: [
        [n('React UI', 'The reviewer submits work and sees progress in real time.')],
        [
          n('FastAPI endpoints', 'Async endpoints accept requests.'),
          n('Schema validation', 'Typed request and response models reject bad input early.')
        ],
        [
          n('Agent orchestration', 'Agents and LLM calls run asynchronously.'),
          n('Data and tools', 'Databases and MCP-exposed tools.')
        ],
        [n('Confidence thresholds', 'Decide whether a result is final or needs review.')],
        [
          n('Live updates', 'Results stream back to the interface.'),
          n('Audit trail', 'Stored with the case.')
        ]
      ]
    }
  ];
})();
