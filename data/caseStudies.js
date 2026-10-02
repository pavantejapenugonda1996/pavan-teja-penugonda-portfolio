/*
 * Case-study detail for each project (same ids as data/projects.js).
 * Written at a generalized level. No client-confidential details.
 */
(function () {
  const P = (window.PTP = window.PTP || {});
  P.data = P.data || {};

  P.data.caseStudies = {
    regulatory: {
      problem: 'Regulated firms must show that their controls cover clauses from many regulators (FDA, EMA, SEC, ISO). Comparing documents and controls by hand is slow, inconsistent, and hard to defend in an audit.',
      approach: 'Split the work into clear roles: ingest, retrieve evidence, score, explain. Ground the LLM in real documents with RAG instead of model memory, and require a citation for every claim.',
      decisions: [
        { t: 'Retrieval before reasoning', d: 'The model answers from retrieved evidence, and "insufficient evidence" is an accepted output. This keeps findings defensible.' },
        { t: 'Roles instead of one giant prompt', d: 'Coverage scoring and gap analysis are separate agents with structured outputs, which makes each one easier to test and improve.' },
        { t: 'Citations are a requirement', d: 'Every finding must point to a source passage so a reviewer can verify it quickly.' }
      ],
      aiLayer: 'GPT-4o reasons over evidence retrieved from a RAG knowledge layer built on regulatory documents, guidance notes, and historical audits. Coverage-scoring and gap-analysis agents, using deep-agent and skill-based agent patterns, turn that reasoning into structured results.',
      impact: 'Manual review effort dropped by 60–70%, and explainable citations improved audit readiness.',
      lessons: ['Evidence-grounded output earns reviewer trust faster than fluent output.', 'Separating agent roles makes failures easier to locate and fix.']
    },
    kyc: {
      problem: 'KYC reviewers manually inspect identity documents, look for inconsistencies and fraud signals, and often cannot explain why a case was approved or rejected.',
      approach: 'Model the review as a team of specialised agents running asynchronously for throughput, keep a human reviewer in the loop, and attach a confidence score and reasoning trace to every decision.',
      decisions: [
        { t: 'Asynchronous orchestration', d: 'A FastAPI backend runs agents asynchronously so independent checks do not wait on each other.' },
        { t: 'Human in the loop by confidence', d: 'Only high-confidence cases are auto-approved. Low-confidence cases route to a reviewer with the reasoning attached.' },
        { t: 'Tools behind MCP servers', d: 'Agents reach data and tools through MCP servers with narrow permissions, instead of unrestricted access.' },
        { t: 'Audit trail by default', d: 'Every step is logged, so a decision can be explained after the fact.' }
      ],
      aiLayer: 'GPT-4 Vision understands the document. Python agents extract and validate fields, detect inconsistencies, resolve ambiguities, and recommend a decision. A confidence score and reasoning trace accompany every output.',
      impact: 'Explainable decisions with confidence scores, audit-ready reasoning traces, and real-time reviewer feedback.',
      lessons: ['Confidence scores are only useful when they decide what happens next.', 'Explainability has to be designed into the data flow, not added at the end.']
    },
    tm: {
      problem: 'Transaction monitoring generates large alert volumes, and most turn out to be false positives. Analysts spend their time triaging noise instead of investigating real risk.',
      approach: 'Frame it as supervised classification on historical, analyst-dispositioned alerts. Start with simple baselines, optimize for catching real risk, and keep the output explainable for compliance.',
      decisions: [
        { t: 'Metric chosen by risk', d: 'Accuracy alone can hide missed risk, so recall and false-positive reduction are tracked alongside it.' },
        { t: 'Time-aware evaluation', d: 'Models are validated on later data than they were trained on, to avoid leakage and over-optimistic results.' },
        { t: 'Compare tree-based models', d: 'Random Forest and XGBoost are compared and kept explainable enough for model review.' }
      ],
      aiLayer: 'Classical machine learning, not LLMs. Random Forest and XGBoost classify alerts, and dashboards surface the signals behind each score so analysts can verify the result.',
      impact: '91% classification accuracy with a significant reduction in false positives.',
      lessons: ['The right model is the one analysts can trust and verify.', 'Good features and clean data mattered more than model complexity.']
    },
    rag: {
      problem: 'Compliance teams need answers they can trace back to the exact regulatory source. A fluent answer without evidence is not usable in an audit.',
      approach: 'Treat the knowledge base as the source of truth. Retrieve first, answer second, and show the evidence next to every answer.',
      decisions: [
        { t: 'Ground answers in retrieved evidence', d: 'The model may only use the passages it is given, which limits unsupported statements.' },
        { t: 'Show the evidence with the answer', d: 'Citations let a reviewer check a claim in seconds instead of re-reading the document.' },
        { t: '"Not enough evidence" is valid', d: 'The system is allowed to say it cannot answer, which is safer than guessing.' }
      ],
      aiLayer: 'Embeddings and a vector store (Chroma) find relevant passages by meaning. GPT-4o reasons over only those passages and returns an answer with its supporting evidence.',
      impact: 'Evidence-backed, citation-based answers that make compliance outputs explainable and audit-ready.',
      lessons: ['Retrieval quality limits answer quality, so it deserves its own evaluation.', 'Users trust a cited answer more than a confident one.']
    },
    perf: {
      problem: 'A Flask-based KYC microservice application needed new capabilities and was slow under load, and it was hard to troubleshoot because there was little visibility into where time was going.',
      approach: 'Measure before changing anything: add structured logging and distributed tracing, find the real bottlenecks, fix the highest-impact ones first, then verify with performance tests.',
      decisions: [
        { t: 'Profile, do not guess', d: 'Tracing showed where time went, so effort went to the biggest wins first.' },
        { t: 'Fix the data layer and the code', d: 'Query tuning and indexing were combined with code-level and threading changes instead of relying on one fix.' },
        { t: 'Include infrastructure', d: 'AKS configuration changes were part of the plan, because some limits were not in the code.' }
      ],
      aiLayer: 'This is classic engineering rather than AI. The platform also includes image classification and text detection I built for the KYC workflow, and the profiling and tracing approach carries over directly to AI workloads.',
      impact: '200% application performance improvement, and much faster root-cause analysis through tracing.',
      lessons: ['Observability pays for itself on the first incident.', 'Re-measure after every change, otherwise it is only an opinion.']
    },
    aml: {
      problem: 'AML gap assessments and OFAC sanctions screening need repeatable, evidence-backed validation across several systems, and manual checks do not scale.',
      approach: 'Automate the repeatable parts: cleanse and validate data, build test cases aligned with OFAC lists, and generate standardized stress-test and validation reports.',
      decisions: [
        { t: 'Validation as code', d: 'Python and SQL tooling makes checks repeatable and reviewable instead of one-off.' },
        { t: 'Standardized workflows', d: 'Shared workflows across TM, EDD, and PEP / sanctions work keep results comparable.' }
      ],
      aiLayer: 'Mostly deterministic validation. AI and LLM proof-of-concepts were explored alongside this with cross-functional teams.',
      impact: 'Stronger screening accuracy and automated stress-testing and model-validation reports for OFAC, Red Flags, and Actimize models.',
      lessons: ['Boring, repeatable validation is what makes the AI layer safe to trust.']
    },
    osint: {
      problem: 'Analysts face large volumes of audio, image, video, and text intelligence, and finding what matters by hand does not scale.',
      approach: 'Turn every modality into searchable text with metadata, put it behind one retrieval layer, and build each capability as a small proof-of-concept service before scaling it.',
      decisions: [
        { t: 'One service per modality', d: 'Microservices let each capability be developed, scaled, and replaced independently.' },
        { t: 'Common text layer', d: 'Converting everything to text plus metadata gives a single retrieval layer.' }
      ],
      aiLayer: 'LLMs for transcription, translation, and summarization, plus a RAG model for OSINT search.',
      impact: 'Multimodal insights from one search experience, delivered through scalable microservices.',
      lessons: ['Proof-of-concepts are most useful when they are small, separate services.']
    }
  };
})();
