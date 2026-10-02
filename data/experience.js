/* Engineering journey and education. Roles, dates, and facts come from the resume. */
(function () {
  const P = (window.PTP = window.PTP || {});
  P.data = P.data || {};

  P.data.journey = [
    {
      id: 'y2017',
      year: '2017',
      headline: 'Python / Data Analytics',
      role: 'Python Developer',
      org: 'Spry Technologies · Bangalore, Karnataka',
      period: '08/2017 – 01/2020',
      tech: ['Python', 'Power BI', 'Selenium'],
      responsibilities: ['Built dashboards for data analysis and reporting.', 'Wrote web automation scripts to test application functionality.'],
      accomplishments: ['Started the career in Python, data analysis, and test automation.']
    },
    {
      id: 'y2020',
      year: '2020',
      headline: 'Software Engineering / ML',
      role: 'Software Engineer',
      org: 'Smart Auto Systems · Hyderabad, Telangana',
      period: '02/2020 – 05/2021',
      tech: ['Python', 'Machine Learning', 'Flask', 'SQL Server', 'VueJS', 'HTML5 / CSS'],
      responsibilities: ['Developed single page applications.', 'Tuned machine learning algorithms and cleaned data.'],
      accomplishments: ['Improved ML algorithm performance to 87% through parameter tuning and data cleaning.']
    },
    {
      id: 'y2021',
      year: '2021',
      headline: 'KYC / Microservices / Platform Optimization',
      role: 'Senior Software Engineer',
      org: 'EY GDS · Bangalore, Karnataka',
      period: '05/2021 – 08/2023',
      tech: ['Python', 'Flask', 'SQL', 'AKS', 'Distributed tracing', 'PowerApps'],
      responsibilities: [
        'Developed features for a Flask-based KYC microservice application, including image classification and text detection.',
        'Led the performance improvement team.',
        'Automated data cleansing pipelines with PowerApps and Python web apps.'
      ],
      accomplishments: ['Improved application performance by 200%.', 'Added structured logging and distributed tracing for faster troubleshooting.'],
      project: 'perf'
    },
    {
      id: 'y2023',
      year: '2023',
      headline: "AI Master's / Advanced AI",
      role: "Master's in Artificial Intelligence",
      org: 'University of Bridgeport · Bridgeport, CT',
      period: '08/2023 – 12/2024',
      tech: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Python'],
      responsibilities: ['Advanced coursework in AI.', 'Teaching Assistant (01/2024 – 05/2024): prepared assignments, coding documents, and starter scripts, and supported and graded student work.'],
      accomplishments: ["Completed a Master's in Artificial Intelligence."]
    },
    {
      id: 'y2024',
      year: '2024',
      headline: 'LLMs / RAG / AI Applications',
      role: 'Software Engineering Intern',
      org: 'SS8 Networks · Milpitas, CA',
      period: '06/2024 – 12/2024',
      tech: ['LLMs', 'RAG', 'Microservices', 'NLP'],
      responsibilities: ['Built LLM-based proof-of-concepts for audio, image, and video analysis.', 'Created text analytics and microservices, and researched OSINT data.'],
      accomplishments: ['Built a RAG model for OSINT search.'],
      project: 'osint'
    },
    {
      id: 'y2025',
      year: '2025',
      headline: 'AML / ML / Compliance Technology',
      role: 'Senior Analyst',
      org: 'EY US LLC · San Antonio, TX',
      period: '02/2025 – present',
      tech: ['Python', 'SQL', 'Random Forest', 'XGBoost', 'Actimize', 'OFAC'],
      responsibilities: [
        'Perform AML gap assessments and design technical workflows to detect cross-system discrepancies.',
        'Work directly with clients and stakeholders to gather requirements and translate them into technical solutions.',
        'Develop Python and SQL data validation tools with cross-functional teams.',
        'Automate stress testing and model validation for OFAC, Red Flags, and Actimize models.'
      ],
      accomplishments: ['Built ML models for transaction monitoring alert classification at 91% accuracy.'],
      project: 'tm'
    },
    {
      id: 'y2026',
      year: '2026',
      headline: 'Agentic AI / AI Engineering',
      role: 'Senior Analyst',
      org: 'EY US LLC · San Antonio, TX',
      period: 'Present',
      tech: ['GPT-4o', 'GPT-4 Vision', 'RAG', 'Agents', 'MCP servers', 'FastAPI', 'React'],
      responsibilities: [
        'Design agentic compliance and KYC systems using RAG, GPT-4o, and GPT-4 Vision.',
        'Lead client-facing requirement gathering with stakeholders before designing each system.',
        'Build deep agents and skill-based agents with tools exposed through MCP servers.'
      ],
      accomplishments: ['Agentic regulatory coverage system reduced manual review effort by 60–70%.'],
      project: 'regulatory'
    }
  ];

  P.data.education = [
    { degree: "Master's in Artificial Intelligence", school: 'University of Bridgeport · Bridgeport, CT', period: '08/2023 – 12/2024' }
  ];
})();
