import { DistrictData, HeroSlideData, QuickServiceItem, SchemeItem, UpdateItem } from '../types';

export const DEMO_CREDENTIALS = [
  {
    role: 'training-centre' as const,
    label: 'Training Centre',
    sublabel: 'Training Providers & Skill Centres',
    id: 'training_123',
    password: 'training@123',
    name: 'Kalyani Government ITI Admin',
    orgName: 'Govt. Industrial Training Institute, Pune',
    redirect: '/training-centres'
  },
  {
    role: 'employer' as const,
    label: 'Employer',
    sublabel: 'Enterprises & Hiring Partners',
    id: 'employer_123',
    password: 'employer@123',
    name: 'Vikram Mehta (Talent Lead)',
    orgName: 'AutoTech Dynamics & EV Systems Ltd',
    redirect: '/employers'
  },
  {
    role: 'candidate' as const,
    label: 'Candidate',
    sublabel: 'Students & Job Seekers',
    id: 'samir_123',
    password: 'samir@1234',
    name: 'Samir Shaw',
    orgName: 'Diploma Candidate (Automotive/EV)',
    redirect: '/candidates'
  },
  {
    role: 'admin' as const,
    label: 'Government / Admin',
    sublabel: 'State & District Skill Officers',
    id: 'admin_123',
    password: 'admin@123',
    name: 'Dr. Sunita Deshmukh',
    orgName: 'Maharashtra State Skill Development Society (MSSDS)',
    redirect: '/admin'
  }
];

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 1,
    category: 'LABOUR MARKET INTELLIGENCE',
    title: 'Bridging Skills with Industry Demand',
    text: 'Kaushal Setu connects employers, training providers, candidates and government through one continuously updated labour-market intelligence system.',
    ctaText: 'Explore Kaushal Setu',
    ctaAction: '#how-it-works',
    secondaryCtaText: 'View Live Intelligence',
    secondaryCtaAction: '#market-glance',
    badge: 'SIH 2026 Innovation Prototype',
    highlights: ['Multi-stakeholder loop', 'Real-time industry telemetry', 'Curriculum risk scoring'],
    visualType: 'stakeholders'
  },
  {
    id: 2,
    category: 'INDUSTRY DEMAND',
    title: 'What Industry Needs Today',
    text: 'Kaushal Setu ingests high-frequency market telemetry from live job postings, structured employer demand surveys, and regional industrial growth clusters.',
    ctaText: 'View Skill Intelligence',
    ctaAction: '#maharashtra-map',
    secondaryCtaText: 'Employer Portal',
    secondaryCtaAction: '/login?role=employer',
    badge: 'Signals & Analytics Engine',
    highlights: ['Live posting NLP parsing', 'Quarterly employer surveys', 'Micro-skill taxonomy mapping'],
    visualType: 'signals'
  },
  {
    id: 3,
    category: 'FUTURE SKILLS',
    title: "Prepare for Tomorrow's Jobs",
    text: 'Identify growing skills across Electric Vehicles, Solar Energy, Data Centres, and Advanced Automation before regional workforce deficits widen.',
    ctaText: 'Explore Emerging Skills',
    ctaAction: '#ice-ev-case',
    secondaryCtaText: 'District Insights',
    secondaryCtaAction: '#maharashtra-map',
    badge: 'Predictive Horizon 2026-2030',
    highlights: ['Electric Vehicles', 'Solar & Green Hydrogen', 'Industrial IoT & Robotics'],
    visualType: 'sectors'
  },
  {
    id: 4,
    category: 'CURRICULUM MODERNIZATION',
    title: 'Keep Training Aligned with Industry',
    text: 'Kaushal Setu flags obsolete or oversupplied course modules, generating evidence-backed updates for training providers, Polytechnics, and Vocational Academies.',
    ctaText: 'See Curriculum Intelligence',
    ctaAction: '#ice-ev-case',
    secondaryCtaText: 'Training Centre Portal',
    secondaryCtaAction: '/login?role=training-centre',
    badge: 'Evidence-Based Course Health',
    highlights: ['Automobile to EV migration', 'Obsolete topic detection', 'Industry-validated modules'],
    visualType: 'curriculum'
  },
  {
    id: 5,
    category: 'TRAINING CENTRES',
    title: 'Smarter Training Centres',
    text: 'Training providers can evaluate how their equipment, syllabi, trainer competencies, and practical labs score against genuine regional industry vacancies.',
    ctaText: 'Training Centre Login',
    ctaAction: '/login?role=training-centre',
    secondaryCtaText: 'Explore Curriculum Tools',
    secondaryCtaAction: '#ice-ev-case',
    badge: 'Institutional Enablement',
    highlights: ['Curriculum health metrics', 'Lab equipment benchmarks', 'Trainer upskilling pathways'],
    visualType: 'training'
  },
  {
    id: 6,
    category: 'CAREERS & ASPIRATIONS',
    title: 'Choose a Career with Better Visibility',
    text: 'Candidates and parents can understand which vocational trades offer strong hiring momentum, fair compensation, and durable longevity before enrolling.',
    ctaText: 'Explore Careers',
    ctaAction: '/login?role=candidate',
    secondaryCtaText: 'View District Demand',
    secondaryCtaAction: '#maharashtra-map',
    badge: 'Citizen-Centric Transparency',
    highlights: ['Demand trajectory index', 'Regional placement heatmaps', 'Step-by-step bridge courses'],
    visualType: 'candidate'
  },
  {
    id: 7,
    category: 'INDUSTRY PARTNERSHIP',
    title: 'Let Industry Shape Future Skills',
    text: 'Enterprises and MSMEs can directly feed competency gaps, emerging software stacks, and hiring requirements into state training boards.',
    ctaText: 'Employer Portal',
    ctaAction: '/login?role=employer',
    secondaryCtaText: 'Take Employer Survey',
    secondaryCtaAction: '/signup/employer',
    badge: 'Co-Governance Framework',
    highlights: ['Direct curriculum inputs', 'Apprenticeship matching', 'Cluster skill forecasting'],
    visualType: 'employer'
  },
  {
    id: 8,
    category: 'GOVERNANCE & POLICY',
    title: 'Turn Skill Gaps into Better Investment Decisions',
    text: 'Government departments can utilize predictive district skill-gap analytics to optimize budgetary allocations, sanction new trades, and modernize labs.',
    ctaText: 'Government Intelligence',
    ctaAction: '/login?role=admin',
    secondaryCtaText: 'District Map',
    secondaryCtaAction: '#maharashtra-map',
    badge: 'Data-Driven Public Value',
    highlights: ['District budget optimization', 'Public training ROI metrics', 'NSQF / NCVET compliance'],
    visualType: 'governance'
  },
  {
    id: 9,
    category: 'INCLUSIVITY & REACH',
    title: 'Bridging the Rural–Urban Skill Gap',
    text: 'Empower candidates and training institutes across Tier-2 and Tier-3 districts to access the same high-resolution market intelligence as metro hubs.',
    ctaText: 'Explore Maharashtra Reach',
    ctaAction: '#maharashtra-map',
    secondaryCtaText: 'Read Inclusivity Mission',
    secondaryCtaAction: '#impact-section',
    badge: 'Multilingual & Grassroots Ready',
    highlights: ['Marathi, Hindi & English UI', 'Low-bandwidth IVR/SMS mode', 'Sub-district talent pipelines'],
    visualType: 'rural'
  },
  {
    id: 10,
    category: 'CONTINUOUS FEEDBACK LOOP',
    title: 'One Connected Skill Ecosystem',
    text: 'Every new industrial job posting or graduate placement outcome triggers a verified cycle of analysis, human expert validation, and curriculum adjustment.',
    ctaText: 'See How It Works',
    ctaAction: '#how-it-works',
    secondaryCtaText: 'Join the Platform',
    secondaryCtaAction: '/login',
    badge: 'Closed-Loop Architecture',
    highlights: ['Market Signals', 'AI Processing', 'Expert Human Validation', 'Policy Impact'],
    visualType: 'ecosystem'
  }
];

export const QUICK_SERVICES: QuickServiceItem[] = [
  {
    id: 'find-training',
    title: 'Find Training Centres',
    marathiTitle: 'प्रशिक्षण केंद्रे शोधा',
    hindiTitle: 'प्रशिक्षण केंद्र खोजें',
    description: 'Locate certified training providers, Polytechnics, and Vocational Centres mapped to high-demand skills in your district.',
    marathiDescription: 'तुमच्या जिल्ह्यातील उच्च मागणी असलेल्या कौशल्यांनुसार प्रमाणित ITI आणि प्रशिक्षण केंद्रे शोधा.',
    hindiDescription: 'अपने जिले में उच्च मांग वाले कौशलों के अनुसार प्रमाणित ITI और प्रशिक्षण केंद्र खोजें।',
    iconName: 'Building2',
    targetRole: 'candidate',
    path: '/candidates',
    badge: 'For Learners'
  },
  {
    id: 'explore-careers',
    title: 'Explore Future Careers',
    marathiTitle: 'भविष्यातील करिअर शोधा',
    hindiTitle: 'भविष्य के करियर खोजें',
    description: 'Discover emerging vocational careers, placement velocity, and recommended prerequisite skill paths.',
    marathiDescription: 'उभरते व्यावसायिक करिअर, प्लेसमेंट दर आणि शिफारस केलेले कौशल्य मार्ग शोधा.',
    hindiDescription: 'उभरते व्यावसायिक करियर, प्लेसमेंट दर और अनुशंसित कौशल मार्ग खोजें।',
    iconName: 'Compass',
    targetRole: 'candidate',
    path: '/candidates',
    badge: 'Career Path'
  },
  {
    id: 'skill-demand',
    title: 'View Skill Demand',
    marathiTitle: 'कौशल्य मागणी पहा',
    hindiTitle: 'कौशल मांग देखें',
    description: 'Explore district-level job postings, high-growth industrial sectors, and localized workforce deficits.',
    marathiDescription: 'जिल्हास्तरीय नोकरीच्या जाहिराती, उच्च-वाढ औद्योगिक क्षेत्रे आणि स्थानिक कौशल्य तुटवडा पहा.',
    hindiDescription: 'जिला स्तरीय नौकरी की पोस्टिंग, उच्च विकास औद्योगिक क्षेत्र और स्थानीय कौशल कमी देखें।',
    iconName: 'TrendingUp',
    targetRole: 'candidate',
    path: '#maharashtra-map',
    badge: 'Live Insights'
  },
  {
    id: 'employer-survey',
    title: 'Employer Skill Input',
    marathiTitle: 'उद्योग कौशल्य नोंदणी',
    hindiTitle: 'उद्योग कौशल इनपुट',
    description: 'Submit hiring requirements, equipment standards, and practical competencies required by your firm.',
    marathiDescription: 'तुमच्या उद्योगासाठी आवश्यक असलेल्या भरती गरजा आणि उपकरणांचे निकष नोंदवा.',
    hindiDescription: 'अपने उद्योग के लिए आवश्यक भर्ती आवश्यकताओं और उपकरणों के मानक दर्ज करें।',
    iconName: 'Briefcase',
    targetRole: 'employer',
    path: '/employers',
    badge: 'Industry Voice'
  },
  {
    id: 'training-portal',
    title: 'Training Centre Portal',
    marathiTitle: 'प्रशिक्षण केंद्र पोर्टल',
    hindiTitle: 'प्रशिक्षण केंद्र पोर्टल',
    description: 'Review curriculum health scores, submit batch outcome data, and download modernized syllabi modules.',
    marathiDescription: 'अभ्यासक्रम आरोग्य गुण तपासा आणि आधुनिक अभ्यासक्रम मॉड्युल्स डाउनलोड करा.',
    hindiDescription: 'पाठ्यक्रम स्वास्थ्य स्कोर जांचें और आधुनिक पाठ्यक्रम मॉड्यूल डाउनलोड करें।',
    iconName: 'GraduationCap',
    targetRole: 'training-centre',
    path: '/training-centres',
    badge: 'Institutions'
  },
  {
    id: 'gov-intelligence',
    title: 'Government Intelligence',
    marathiTitle: 'शासकीय माहिती प्रणाली',
    hindiTitle: 'सरकारी इंटेलिजेंस',
    description: 'Access district-level predictive analytics to guide capital outlay, lab modernizations, and scheme rollout.',
    marathiDescription: 'जिल्हास्तरीय अंदाज विश्लेषणाद्वारे शासकीय योजना आणि बजेटचे योग्य नियोजन करा.',
    hindiDescription: 'जिला स्तरीय पूर्वानुमान विश्लेषण के माध्यम से सरकारी योजनाओं और बजट का उचित नियोजन करें।',
    iconName: 'ShieldCheck',
    targetRole: 'admin',
    path: '/admin',
    badge: 'Policy & Admin'
  }
];

export const MARKET_GLANCE_STATS = [
  {
    id: 'postings',
    label: 'Job Postings Analysed',
    marathiLabel: 'विश्लेषण केलेल्या जाहिराती',
    hindiLabel: 'विश्लेषित नौकरी पोस्टिंग',
    value: '24,860',
    numeric: 24860,
    change: '+14% this month',
    detail: 'Across Maharashtra industrial belts and tech corridors',
    marathiDetail: 'महाराष्ट्रातील औद्योगिक पट्टे आणि तंत्रज्ञान कॉरिडोअरमधून',
    hindiDetail: 'महाराष्ट्र के औद्योगिक क्षेत्रों और तकनीकी कॉरिडोर से'
  },
  {
    id: 'skills',
    label: 'Emerging Skills Detected',
    marathiLabel: 'नवीन कौशल्ये आढळली',
    hindiLabel: 'नवीन कौशल खोजे गए',
    value: '1,284',
    numeric: 1284,
    change: '88 new micro-competencies',
    detail: 'Spanning EV, Renewable Energy, and Automation',
    marathiDetail: 'ईव्ही, अक्षय ऊर्जा आणि ऑटोमेशन क्षेत्रातील',
    hindiDetail: 'ईवी, अक्षय ऊर्जा और ऑटोमेशन क्षेत्रों से'
  },
  {
    id: 'courses',
    label: 'Courses Flagged for Review',
    marathiLabel: 'पुनरावलोकनासाठी कालबाह्य कोर्स',
    hindiLabel: 'समीक्षा हेतु चिह्नित पाठ्यक्रम',
    value: '327',
    numeric: 327,
    change: 'Outdated or oversupplied',
    detail: 'Recommended for curriculum modernization',
    marathiDetail: 'अभ्यासक्रम आधुनिकतेसाठी शिफारस केलेले',
    hindiDetail: 'पाठ्यक्रम आधुनिकीकरण के लिए अनुशंसित'
  },
  {
    id: 'signals',
    label: 'Employer Signals Received',
    marathiLabel: 'उद्योग संकेत प्राप्त',
    hindiLabel: 'उद्योग संकेत प्राप्त',
    value: '84',
    numeric: 84,
    change: 'Direct industry consultations',
    detail: 'From manufacturing, green energy, and IT clusters',
    marathiDetail: 'उत्पादन, हरित ऊर्जा आणि आयटी क्लस्टरमधून',
    hindiDetail: 'विनिर्माण, हरित ऊर्जा और आईटी क्लस्टर से'
  },
  {
    id: 'districts',
    label: 'Districts Monitored',
    marathiLabel: 'जिल्हे समाविष्ट',
    hindiLabel: 'निगरानी वाले जिले',
    value: '36',
    numeric: 36,
    change: '100% state coverage',
    detail: 'Including urban hubs and rural aspirational zones',
    marathiDetail: 'शहरी हब आणि ग्रामीण आकांक्षात्मक क्षेत्रांसह',
    hindiDetail: 'शहरी केंद्र और ग्रामीण आकांक्षी क्षेत्रों सहित'
  },
  {
    id: 'sectors',
    label: 'High-Growth Sectors',
    marathiLabel: 'उच्च-वाढ क्षेत्रे',
    hindiLabel: 'उच्च-विकास क्षेत्र',
    value: '18',
    numeric: 18,
    change: 'Key sunrise industries',
    detail: 'Prioritized for targeted state skilling investments',
    marathiDetail: 'शासकीय कौशल्य गुंतवणुकीसाठी प्राधान्य दिलेले',
    hindiDetail: 'सरकारी कौशल निवेश के लिए प्राथमिकता वाले'
  }
];

export const MAHARASHTRA_DISTRICTS: DistrictData[] = [
  {
    id: 'pune',
    name: 'Pune',
    marathiName: 'पुणे',
    region: 'Western Maharashtra',
    trainingEcosystem: ['Govt. ITI Aundh', 'Kalyani ITI', 'Government Polytechnic Pune', 'JSS Pune', 'PM Vishwakarma Centres', 'Private Tech Academies'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Electric Vehicles', 'Advanced Manufacturing', 'IT / Digital Services', 'Industrial IoT'],
    topSkills: ['EV Battery Diagnostics', 'PLC Automation', 'Python & Embedded C', 'Precision CNC Tooling'],
    demandLevel: 'VERY HIGH',
    trainingCapacity: 'HIGH',
    potentialSkillGap: 'Acute deficit in EV powertrain calibration and battery safety specialists (Illustrative prototype data)',
    recommendedFocus: 'Upgrade existing ICE automotive trade into dedicated EV & Hybrid systems lab modules.',
    activeInstitutesCount: 142,
    openSkillVacancies: 6420,
    coordinates: { x: 230, y: 310 }
  },
  {
    id: 'mumbai',
    name: 'Mumbai City & Suburban',
    marathiName: 'मुंबई',
    region: 'Konkan',
    trainingEcosystem: ['Govt. ITI Mumbai', 'Veermata Jijabai Technological Institute (VJTI)', 'Skill Development Training Centre', 'Online Hybrid Centres'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Financial Technology', 'Data Centres', 'Healthcare Technology', 'Green Building Maintenance'],
    topSkills: ['Cloud Infrastructure', 'Medical Equipment Maintenance', 'HVAC Automation', 'Logistics Analytics'],
    demandLevel: 'VERY HIGH',
    trainingCapacity: 'HIGH',
    potentialSkillGap: 'High demand for specialized data centre technicians and facility automation engineers (Illustrative prototype data)',
    recommendedFocus: 'Introduce modular certifications for data centre cooling systems and server hardware maintenance.',
    activeInstitutesCount: 188,
    openSkillVacancies: 8910,
    coordinates: { x: 120, y: 260 }
  },
  {
    id: 'nashik',
    name: 'Nashik',
    marathiName: 'नाशिक',
    region: 'North Maharashtra',
    trainingEcosystem: ['Govt. ITI Satpur', 'Government Polytechnic Nashik', 'JSS Nashik', 'PM Vishwakarma Hub'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Advanced Manufacturing', 'Agri-Tech & Food Processing', 'Electrical Equipment', 'Defense Ancillary'],
    topSkills: ['Solar Pump Maintenance', 'CNC Programming', 'Food Preservation Tech', 'Sensor Calibration'],
    demandLevel: 'HIGH',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Shortage of certified technicians for solar-powered micro-irrigation and robotic welding (Illustrative prototype data)',
    recommendedFocus: 'Modernize agricultural machinery trades to include smart telemetry and sensorized farm tools.',
    activeInstitutesCount: 76,
    openSkillVacancies: 3140,
    coordinates: { x: 200, y: 200 }
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    marathiName: 'नागपूर',
    region: 'Vidarbha',
    trainingEcosystem: ['Govt. ITI Nagpur', 'Government Polytechnic Sadar', 'MIHAN Skill Hub', 'Central Institute of Petrochemicals Tech'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Multimodal Logistics & Warehousing', 'Aviation Maintenance', 'Renewable Energy', 'Textile Automation'],
    topSkills: ['Automated Warehouse Management', 'Avionics Support', 'Solar Grid Installation', 'PLC Weaving Tech'],
    demandLevel: 'HIGH',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Rising requirement for automated cold-chain logistics staff and aircraft ground service personnel (Illustrative prototype data)',
    recommendedFocus: 'Expand MIHAN-adjacent logistics and aerospace supply-chain training apprenticeships.',
    activeInstitutesCount: 94,
    openSkillVacancies: 4230,
    coordinates: { x: 620, y: 150 }
  },
  {
    id: 'thane',
    name: 'Thane',
    marathiName: 'ठाणे',
    region: 'Konkan',
    trainingEcosystem: ['Govt. ITI Thane', 'Navi Mumbai Skill Park', 'Bhiwandi Logistics Academy', 'PM Vishwakarma Cluster'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Supply Chain & Logistics', 'Chemical & Pharma Processing', 'Clean Energy', 'IT Infrastructure'],
    topSkills: ['Warehouse Robotics', 'GMP Compliance in Pharma', 'Industrial Water Treatment', 'Cybersecurity Ops'],
    demandLevel: 'VERY HIGH',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'High demand for automated inventory controllers and certified clean-room operators in pharma (Illustrative prototype data)',
    recommendedFocus: 'Establish public-private apprenticeships with Bhiwandi warehousing clusters and Belapur pharma corridors.',
    activeInstitutesCount: 82,
    openSkillVacancies: 5120,
    coordinates: { x: 150, y: 240 }
  },
  {
    id: 'chhatrapati-sambhajinagar',
    name: 'Chhatrapati Sambhajinagar',
    marathiName: 'छत्रपती संभाजीनगर',
    region: 'Marathwada',
    trainingEcosystem: ['Govt. ITI Chhatrapati Sambhajinagar', 'AURIC Shendra-Bidkin Training Park', 'Polytechnic Institute', 'JSS'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Auto Components', 'AURIC Smart City Infrastructure', 'Pharmaceuticals', 'Brewing & Food Tech'],
    topSkills: ['Industrial Robotics', 'Smart Grid Monitoring', 'Sterile Processing', 'Metallurgy Quality Testing'],
    demandLevel: 'HIGH',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Need for smart manufacturing technicians within the AURIC DMIC industrial corridor (Illustrative prototype data)',
    recommendedFocus: 'Align local ITI trades directly with EV battery pack assembly and automated press tool manufacturing.',
    activeInstitutesCount: 68,
    openSkillVacancies: 2980,
    coordinates: { x: 330, y: 230 }
  },
  {
    id: 'kolhapur',
    name: 'Kolhapur',
    marathiName: 'कोल्हापूर',
    region: 'Western Maharashtra',
    trainingEcosystem: ['Govt. ITI Kolhapur', 'Foundry Cluster Skill Centre', 'Polytechnic Institute', 'PM Vishwakarma Artisans'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Precision Foundry & Casting', 'Agri-Equipment', 'Leather & Footwear Handicrafts', 'Textiles'],
    topSkills: ['Induction Furnace Operation', 'CNC Pattern Making', 'Digital Craft Design', 'Eco-Tanning Chemistry'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Foundry sector requires urgent transition from traditional sand casting to automated 3D core printing (Illustrative prototype data)',
    recommendedFocus: 'Modernize traditional metallurgy and pattern-making labs with digital simulations and safety gear.',
    activeInstitutesCount: 54,
    openSkillVacancies: 1850,
    coordinates: { x: 230, y: 450 }
  },
  {
    id: 'satara',
    name: 'Satara',
    marathiName: 'सातारा',
    region: 'Western Maharashtra',
    trainingEcosystem: ['Govt. ITI Satara', 'Karad Engineering & Skill Hub', 'JSS Satara', 'Gramin Skill Academy'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Renewable Energy (Wind & Hydro)', 'Food Processing & Dairy', 'Auto Ancillaries', 'Tourism Services'],
    topSkills: ['Wind Turbine Tech', 'Cold-Chain Dairy Processing', 'Precision Lathe & Milling', 'Eco-Tourism Mgmt'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Technician shortage for servicing wind turbines and solar micro-grids in hilly Western Ghats (Illustrative prototype data)',
    recommendedFocus: 'Set up specialized renewable energy maintenance labs and high-altitude safety training modules.',
    activeInstitutesCount: 42,
    openSkillVacancies: 1420,
    coordinates: { x: 210, y: 380 }
  },
  {
    id: 'solapur',
    name: 'Solapur',
    marathiName: 'सोलापूर',
    region: 'Western Maharashtra',
    trainingEcosystem: ['Govt. ITI Solapur', 'Textile Development Centre', 'Polytechnic Institute', 'PM Vishwakarma Handloom'],
    skillAssessmentStatus: 'Expanding',
    highGrowthSectors: ['Powerloom & Technical Textiles', 'Solar Energy Parks', 'Ethanol & Biofuel Plants', 'Garmenting'],
    topSkills: ['Electronic Jacquard Programming', 'Solar Inverter Maintenance', 'Biomass Boiler Ops', 'Apparel Quality QA'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Shift toward technical textiles requires digital jacquard programming skills currently absent in legacy courses (Illustrative prototype data)',
    recommendedFocus: 'Introduce computer-aided textile design and high-efficiency solar park operation modules.',
    activeInstitutesCount: 48,
    openSkillVacancies: 1680,
    coordinates: { x: 330, y: 380 }
  },
  {
    id: 'amravati',
    name: 'Amravati',
    marathiName: 'अमरावती',
    region: 'Vidarbha',
    trainingEcosystem: ['Govt. ITI Amravati', 'Nandgaon Peth Textile Park Skill Cell', 'Polytechnic Institute', 'JSS'],
    skillAssessmentStatus: 'Expanding',
    highGrowthSectors: ['Textile Processing', 'Agri-Commodity Storage', 'Light Engineering', 'Healthcare Auxiliaries'],
    topSkills: ['Automated Spinning Tech', 'Warehouse Environmental Control', 'Basic Medical Tech', 'Fabric Dyeing Chem'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'EMERGING',
    potentialSkillGap: 'Textile zone expansion demands operators trained on synchronized spinning machinery (Illustrative prototype data)',
    recommendedFocus: 'Fast-track equipment modernization at ITI Amravati with Industry 4.0 textile test rigs.',
    activeInstitutesCount: 38,
    openSkillVacancies: 1210,
    coordinates: { x: 500, y: 160 }
  },
  {
    id: 'ahmednagar',
    name: 'Ahmednagar',
    marathiName: 'अहमदनगर',
    region: 'Western Maharashtra',
    trainingEcosystem: ['Govt. ITI Ahmednagar', 'Sugar & Biofuel Research Skill Unit', 'Polytechnic Institute'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Agriculture', 'Apparel', 'Automotive', 'Electronics'],
    topSkills: ['Dairy Farmer & Entrepreneur', 'Two-Wheeler Service Tech', 'CCTV Installation Tech', 'Irrigation Tech'],
    demandLevel: 'HIGH',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'High candidate aspiration for IT/ITeS (3,000+ candidates) vs strong local DSDP focus in Agriculture & Apparel.',
    recommendedFocus: 'Bridge candidate aspirations with high-volume local agriculture processing and garmenting opportunities.',
    activeInstitutesCount: 42,
    openSkillVacancies: 1980,
    coordinates: { x: 260, y: 280 }
  },
  {
    id: 'akola',
    name: 'Akola',
    marathiName: 'अकोला',
    region: 'Vidarbha',
    trainingEcosystem: ['Govt. ITI Akola', 'Cotton Processing Skill Hub', 'VTP Training Center'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Agriculture', 'Healthcare', 'Automotive', 'Electronics'],
    topSkills: ['Quality Seed Grower', 'Four-Wheeler Service Assistant', 'Phlebotomist', 'Solar Pump Technician'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Healthcare sector is topmost aspired by youth followed by IT/ITeS, whereas DSDP has highest seats in Agriculture & Automotive.',
    recommendedFocus: 'Expand short-term healthcare auxiliary and medical lab technician courses in district ITIs.',
    activeInstitutesCount: 32,
    openSkillVacancies: 1450,
    coordinates: { x: 470, y: 180 }
  },
  {
    id: 'beed',
    name: 'Beed',
    marathiName: 'बीड',
    region: 'Marathwada',
    trainingEcosystem: ['Govt. ITI Beed', 'Pramod Mahajan Kaushalya Kendra', 'JSS Beed'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Electronics', 'Apparel', 'Tourism & Hospitality', 'IT/ITeS'],
    topSkills: ['Solar Panel Installation Tech', 'Fashion Designer', 'Domestic Data Entry Operator', 'Field Technician'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'DSDP focuses on Electronics & Apparel, while youth aspirational preference leans strongly toward IT/ITeS.',
    recommendedFocus: 'Introduce hybrid digital-vocational modules in Electronics & Solar installation to boost youth engagement.',
    activeInstitutesCount: 28,
    openSkillVacancies: 1120,
    coordinates: { x: 360, y: 310 }
  },
  {
    id: 'bhandara',
    name: 'Bhandara',
    marathiName: 'भंडारा',
    region: 'Vidarbha',
    trainingEcosystem: ['Govt. ITI Bhandara', 'Metal & Alloy Skill Center', 'Vocational Training Center'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Electronics', 'Agriculture', 'Apparel', 'Healthcare'],
    topSkills: ['Electrical Technician', 'Assistant Electrician', 'Sewing Machine Operator', 'Accounts Executive'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'EMERGING',
    potentialSkillGap: 'Electronics is the topmost aspired sector among youth (600+ aspirants), requiring lab equipment upgrades.',
    recommendedFocus: 'Upgrade Electronics and Household Appliance repair labs across district ITIs.',
    activeInstitutesCount: 22,
    openSkillVacancies: 890,
    coordinates: { x: 650, y: 140 }
  },
  {
    id: 'buldhana',
    name: 'Buldhana',
    marathiName: 'बुलढाणा',
    region: 'Vidarbha',
    trainingEcosystem: ['Govt. ITI Buldhana', 'Shegaon Skill Development Center', 'VTP Hub'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Capital Goods', 'Agriculture', 'Apparel', 'Tourism & Hospitality'],
    topSkills: ['Mushroom Grower', 'Automotive Welding Operator', 'AC Field Technician', 'IT Coordinator'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Capital Goods is top sector in DSDP (1,459 seats), while youth aspire to Healthcare & IT/ITeS.',
    recommendedFocus: 'Align Capital Goods training with CNC & Mechatronics to attract young graduates.',
    activeInstitutesCount: 30,
    openSkillVacancies: 1280,
    coordinates: { x: 420, y: 190 }
  },
  {
    id: 'chandrapur',
    name: 'Chandrapur',
    marathiName: 'चंद्रपूर',
    region: 'Vidarbha',
    trainingEcosystem: ['Govt. ITI Chandrapur', 'Mining & Heavy Equipment Training Institute'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Mining', 'Iron & Steel', 'Automotive', 'Agriculture'],
    topSkills: ['Bulldozer Operator', 'Mine Electrician', 'Welding Technician', 'Tipper Operator'],
    demandLevel: 'HIGH',
    trainingCapacity: 'HIGH',
    potentialSkillGap: 'High industrial demand in Mining & Metallurgy (1,100+ seats) vs candidate aspirations favoring IT/ITeS & Electronics.',
    recommendedFocus: 'Integrate heavy machinery simulators and digital mine safety modules into vocational trades.',
    activeInstitutesCount: 36,
    openSkillVacancies: 2150,
    coordinates: { x: 640, y: 220 }
  },
  {
    id: 'dhule',
    name: 'Dhule',
    marathiName: 'धुळे',
    region: 'North Maharashtra',
    trainingEcosystem: ['Govt. ITI Dhule', 'Textile & Powerloom Skill Center'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Electronics', 'Healthcare', 'Apparel', 'Agriculture', 'Textile'],
    topSkills: ['Micro Irrigation Technician', 'Solar & LED Technician', 'Warehouse Picker', 'Graphic Designer'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'IT/ITeS is top aspired by candidates (750+), while local DSDP focuses heavily on Electronics & Healthcare.',
    recommendedFocus: 'Provide IT-enabled vocational courses in solar micro-grid maintenance and digital healthcare.',
    activeInstitutesCount: 26,
    openSkillVacancies: 1050,
    coordinates: { x: 180, y: 160 }
  },
  {
    id: 'gadchiroli',
    name: 'Gadchiroli',
    marathiName: 'गडचिरोली',
    region: 'Vidarbha',
    trainingEcosystem: ['Govt. ITI Gadchiroli', 'Tribal Vocational Skill Development Center'],
    skillAssessmentStatus: 'Expanding',
    highGrowthSectors: ['Agriculture', 'IT/ITeS', 'Automotive', 'Electronics', 'Apparel'],
    topSkills: ['Horticulturist', 'Pesticide & Fertilizer Applicator', 'Tractor Service Mechanic', 'Application Developer'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'EMERGING',
    potentialSkillGap: 'Healthcare & Agriculture lead candidate aspirations; limited local industry presence requires self-employment skilling.',
    recommendedFocus: 'Strengthen forest-based agro-processing and protected horticulture entrepreneurship modules.',
    activeInstitutesCount: 18,
    openSkillVacancies: 620,
    coordinates: { x: 700, y: 240 }
  },
  {
    id: 'gondia',
    name: 'Gondia',
    marathiName: 'गोंदिया',
    region: 'Vidarbha',
    trainingEcosystem: ['Govt. ITI Gondia', 'Rice Mill & Food Processing Skill Hub'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Agriculture', 'Electronics', 'Healthcare', 'Automotive', 'Construction'],
    topSkills: ['Automotive Machining Operator', 'Domestic Data Entry Operator', 'Loading Supervisor', 'Electrical Winder'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Electronics is top aspired trade (180+ candidates), while Agriculture & Rice processing dominate local DSDP.',
    recommendedFocus: 'Introduce automated food-grain sorting and electronic sensor maintenance in agricultural trades.',
    activeInstitutesCount: 24,
    openSkillVacancies: 940,
    coordinates: { x: 680, y: 130 }
  },
  {
    id: 'hingoli',
    name: 'Hingoli',
    marathiName: 'हिंगोली',
    region: 'Marathwada',
    trainingEcosystem: ['Govt. ITI Hingoli', 'PMGKVK Center'],
    skillAssessmentStatus: 'Expanding',
    highGrowthSectors: ['Media & Entertainment', 'Electronics', 'Construction', 'Agriculture'],
    topSkills: ['Hand Embroiderer', 'Manual Metal Arc Welder', 'Helper Electrician', 'TV Repair Technician'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'EMERGING',
    potentialSkillGap: 'Electronics is top candidate aspiration, while DSDP capacity is concentrated in Media & Construction.',
    recommendedFocus: 'Expand short-term electrical and solar appliance repair certifications.',
    activeInstitutesCount: 16,
    openSkillVacancies: 580,
    coordinates: { x: 440, y: 250 }
  },
  {
    id: 'jalgaon',
    name: 'Jalgaon',
    marathiName: 'जळगाव',
    region: 'North Maharashtra',
    trainingEcosystem: ['Govt. ITI Jalgaon', 'Poly Polymer & PVC Pipe Industry Skill Center'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Electronics', 'IT/ITeS', 'Agriculture', 'Apparel', 'Management'],
    topSkills: ['Banana Farmer & Processor', 'Junior Instrumentation Technician', 'Accounts Executive', 'Assistant Spa Therapist'],
    demandLevel: 'HIGH',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Strong industry presence in Plastics & PVC processing requires updated instrumentation & PLC control labs.',
    recommendedFocus: 'Modernize process control and industrial instrumentation labs for plastic manufacturing units.',
    activeInstitutesCount: 38,
    openSkillVacancies: 1820,
    coordinates: { x: 280, y: 160 }
  },
  {
    id: 'jalna',
    name: 'Jalna',
    marathiName: 'जालना',
    region: 'Marathwada',
    trainingEcosystem: ['Govt. ITI Jalna', 'Steel Re-Rolling & Seed Industry Training Hub'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Agriculture', 'Capital Goods', 'Iron & Steel', 'IT/ITeS'],
    topSkills: ['CNC Operator Turning', 'Mechanical Fitter', 'Field Technician AC', 'Micro Irrigation Technician'],
    demandLevel: 'HIGH',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Iron & Steel re-rolling mills need certified fitters, while candidate aspirations lean toward IT/ITeS & Beauty.',
    recommendedFocus: 'Integrate CAD/CAM and automated steel machining units into traditional fitter trades.',
    activeInstitutesCount: 29,
    openSkillVacancies: 1390,
    coordinates: { x: 370, y: 240 }
  },
  {
    id: 'latur',
    name: 'Latur',
    marathiName: 'लातूर',
    region: 'Marathwada',
    trainingEcosystem: ['Govt. ITI Latur', 'Marathwada Railway Coach Skill Center'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Apparel', 'IT/ITeS', 'Agriculture', 'Electronics', 'Automotive'],
    topSkills: ['Sampling Tailor', 'CCTV Installation Technician', 'Lineman Distribution', 'Broadband Technician'],
    demandLevel: 'HIGH',
    trainingCapacity: 'HIGH',
    potentialSkillGap: 'New Railway Coach Factory in Latur creates high demand for certified aluminum welders and electrical fitters.',
    recommendedFocus: 'Sanction specialized railway coach manufacturing and precision welding ITI units.',
    activeInstitutesCount: 44,
    openSkillVacancies: 2100,
    coordinates: { x: 420, y: 340 }
  },
  {
    id: 'nanded',
    name: 'Nanded',
    marathiName: 'नांदेड',
    region: 'Marathwada',
    trainingEcosystem: ['Govt. ITI Nanded', 'SGGS Institute Skill Cell'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Healthcare', 'Telecom', 'Apparel', 'Electronics', 'Agriculture'],
    topSkills: ['CCTV Installation Tech', 'UPS & Inverter Tech', 'Front Office Executive', 'Self Employed Tailor'],
    demandLevel: 'HIGH',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Electronics leads candidate aspirations (2,500+ candidates), matching DSDP healthcare & telecom plans.',
    recommendedFocus: 'Expand biomedical equipment repair and telecom fiber technician courses.',
    activeInstitutesCount: 35,
    openSkillVacancies: 1640,
    coordinates: { x: 460, y: 280 }
  },
  {
    id: 'nandurbar',
    name: 'Nandurbar',
    marathiName: 'नंदुरबार',
    region: 'North Maharashtra',
    trainingEcosystem: ['Govt. ITI Nandurbar', 'Tribal Youth Skilling Center'],
    skillAssessmentStatus: 'Expanding',
    highGrowthSectors: ['Agriculture', 'Healthcare', 'Automotive', 'Electronics', 'Power'],
    topSkills: ['Organic Grower', 'Fruit Pulp Processing Tech', 'Grain Mill Operator', 'Beauty Therapist'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'EMERGING',
    potentialSkillGap: 'Healthcare is top aspired by youth (700+ aspirants), while DSDP capacity is highest in Agriculture (1,200+).',
    recommendedFocus: 'Strengthen eco-farming and community health worker training schemes.',
    activeInstitutesCount: 20,
    openSkillVacancies: 720,
    coordinates: { x: 140, y: 130 }
  },
  {
    id: 'dharashiv',
    name: 'Dharashiv',
    marathiName: 'धाराशिव',
    region: 'Marathwada',
    trainingEcosystem: ['Govt. ITI Osmanabad/Dharashiv', 'PMGKVK Center'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Apparel', 'Agriculture', 'IT/ITeS', 'Electronics', 'Power'],
    topSkills: ['Sewing Machine Operator', 'Sampling Coordinator', 'Spice Processing Tech', 'Lineman Distribution'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'IT/ITeS is top candidate aspiration (600+), while local DSDP focuses heavily on Garmenting & Apparel.',
    recommendedFocus: 'Introduce digital garment design and e-commerce marketing in textile trades.',
    activeInstitutesCount: 26,
    openSkillVacancies: 1180,
    coordinates: { x: 380, y: 360 }
  },
  {
    id: 'parbhani',
    name: 'Parbhani',
    marathiName: 'परभणी',
    region: 'Marathwada',
    trainingEcosystem: ['Govt. ITI Parbhani', 'VNMKV Agricultural University Skill Cell'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Apparel', 'Electronics', 'Healthcare', 'Agriculture', 'IT/ITeS'],
    topSkills: ['Sericulturist', 'Small Poultry Farmer', 'Dresser (Medical)', 'Led Light Repair Technician'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'Electronics is top candidate aspiration (1,700+ aspirants), while DSDP targets Apparel & Healthcare.',
    recommendedFocus: 'Establish smart agritech and solar pump repair labs linked with VNMKV agricultural ecosystem.',
    activeInstitutesCount: 27,
    openSkillVacancies: 1090,
    coordinates: { x: 420, y: 280 }
  },
  {
    id: 'raigad',
    name: 'Raigad',
    marathiName: 'रायगड',
    region: 'Konkan',
    trainingEcosystem: ['Govt. ITI Panvel/Nagothane', 'Patalganga & Roha Chemical Skill Hub'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Logistics', 'Green Jobs', 'Agriculture', 'IT/ITeS', 'Automotive'],
    topSkills: ['Fitter Electrical & Electronics', 'Inventory Clerk', 'Consignment Tracking Exec', 'Solar PV Installer'],
    demandLevel: 'VERY HIGH',
    trainingCapacity: 'HIGH',
    potentialSkillGap: 'Rapid expansion in JNPT Port logistics and chemical manufacturing requires automated warehouse operators.',
    recommendedFocus: 'Expand chemical plant operations and hazardous material safety certification courses.',
    activeInstitutesCount: 45,
    openSkillVacancies: 3450,
    coordinates: { x: 140, y: 300 }
  },
  {
    id: 'ratnagiri',
    name: 'Ratnagiri',
    marathiName: 'रत्नागिरी',
    region: 'Konkan',
    trainingEcosystem: ['Govt. ITI Ratnagiri', 'Finolex Skill Development Center'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Agriculture', 'Healthcare', 'Automotive', 'Electronics', 'Power'],
    topSkills: ['Gardener', 'Mushroom Grower', 'Guest House Caretaker', 'Automotive Welding Assistant'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'IT/ITeS leads candidate aspirations (1,100+), while local industry demand centers on Food Processing & Marine Logistics.',
    recommendedFocus: 'Promote mango/cashew processing automation and coastal tourism management trades.',
    activeInstitutesCount: 31,
    openSkillVacancies: 1320,
    coordinates: { x: 150, y: 410 }
  },
  {
    id: 'sangli',
    name: 'Sangli',
    marathiName: 'सांगली',
    region: 'Western Maharashtra',
    trainingEcosystem: ['Govt. ITI Sangli', 'Walchand Engineering Skill Cell'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Agriculture', 'Apparel', 'Automotive', 'Electronics', 'Food Processing'],
    topSkills: ['Light Motor Vehicle Driver', 'Beauty Therapist', 'Fruits & Vegetables Drying Tech', 'Jacquard Weaver'],
    demandLevel: 'HIGH',
    trainingCapacity: 'HIGH',
    potentialSkillGap: 'IT/ITeS leads candidate aspirations (2,800+), matching strong local DSDP focus in Agriculture & Apparel.',
    recommendedFocus: 'Enhance grape & sugarcane processing technology labs with modern automated testing equipment.',
    activeInstitutesCount: 46,
    openSkillVacancies: 2240,
    coordinates: { x: 260, y: 440 }
  },
  {
    id: 'sindhudurg',
    name: 'सिंधुदुर्ग',
    marathiName: 'सिंधुदुर्ग',
    region: 'Konkan',
    trainingEcosystem: ['Govt. ITI Sawantwadi', 'Chipi Airport & Tourism Skill Hub'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Agriculture', 'Healthcare', 'Automotive', 'Electronics', 'Power'],
    topSkills: ['Draughtsman Mechanical', 'Desktop Publishing Associate', 'Account Director', 'Gardener'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'BFSI & IT/ITeS top candidate aspirations, while local economy relies on Hospitality, Horticulture & Marine Tourism.',
    recommendedFocus: 'Establish ecotourism, resort management, and food preservation vocational academies.',
    activeInstitutesCount: 20,
    openSkillVacancies: 780,
    coordinates: { x: 160, y: 480 }
  },
  {
    id: 'wardha',
    name: 'Wardha',
    marathiName: 'वर्धा',
    region: 'Vidarbha',
    trainingEcosystem: ['Govt. ITI Wardha', 'Mahatma Gandhi Institute Skill Cell'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Agriculture', 'Apparel', 'IT/ITeS', 'Electronics', 'Automotive'],
    topSkills: ['Cereal Crop Grower', 'Automotive Welding Machine Operator', 'Search Engine Marketing Exec', 'Nursery Worker'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'IT/ITeS & Media lead candidate aspirations (650+), while DSDP capacity is in Agriculture & Garmenting.',
    recommendedFocus: 'Promote organic farming certification and solar energy equipment maintenance.',
    activeInstitutesCount: 25,
    openSkillVacancies: 980,
    coordinates: { x: 570, y: 160 }
  },
  {
    id: 'washim',
    name: 'Washim',
    marathiName: 'वाशीम',
    region: 'Vidarbha',
    trainingEcosystem: ['Govt. ITI Washim', 'PMGKVK Center'],
    skillAssessmentStatus: 'Expanding',
    highGrowthSectors: ['Agriculture', 'Automotive', 'Electronics', 'Healthcare', 'Food Processing'],
    topSkills: ['Organic Grower', 'DTH Set Top Box Tech', 'Dairy Products Processor', 'Medical Records Assistant'],
    demandLevel: 'MODERATE',
    trainingCapacity: 'EMERGING',
    potentialSkillGap: 'Healthcare is top candidate aspiration (300+), while Agriculture leads DSDP planned capacity (2,500+).',
    recommendedFocus: 'Expand short-term pulse processing and agricultural machinery repair courses.',
    activeInstitutesCount: 19,
    openSkillVacancies: 640,
    coordinates: { x: 500, y: 210 }
  },
  {
    id: 'yavatmal',
    name: 'Yavatmal',
    marathiName: 'यवतमाळ',
    region: 'Vidarbha',
    trainingEcosystem: ['Govt. ITI Yavatmal', 'Textile Ginning & Pressing Skill Hub'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Agriculture', 'Healthcare', 'Automotive', 'Electronics', 'Power'],
    topSkills: ['Agriculture Extension Service Provider', 'Cabling Technician', 'Welding Assistant', 'Handheld Devices Repair'],
    demandLevel: 'HIGH',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'BFSI & Agriculture top candidate aspirations; cotton textile cluster requires modern ginning & spinning operators.',
    recommendedFocus: 'Modernize cotton ginning and technical textile processing labs in Yavatmal ITIs.',
    activeInstitutesCount: 34,
    openSkillVacancies: 1520,
    coordinates: { x: 540, y: 220 }
  },
  {
    id: 'palghar',
    name: 'Palghar',
    marathiName: 'पालघर',
    region: 'Konkan',
    trainingEcosystem: ['Govt. ITI Palghar/Boisar', 'Tarapur MIDC Skill Center'],
    skillAssessmentStatus: 'Monitored & Active',
    highGrowthSectors: ['Agriculture', 'Power', 'Plumbing', 'Apparel', 'BFSI'],
    topSkills: ['Nursery Worker', 'Chemical Plant Operator', 'Domestic IT Helpdesk Attendant', 'Counter Sales Executive'],
    demandLevel: 'HIGH',
    trainingCapacity: 'MEDIUM',
    potentialSkillGap: 'BFSI & IT/ITeS lead candidate aspirations (1,300+), while Tarapur industrial belt requires chemical & plastics operators.',
    recommendedFocus: 'Set up industrial safety and automated plastics processing skill academies in Boisar/Tarapur cluster.',
    activeInstitutesCount: 33,
    openSkillVacancies: 1760,
    coordinates: { x: 130, y: 200 }
  }
];


export const PROBLEM_CARDS = [
  {
    number: '01',
    problemTitle: 'Outdated Curriculum & Infrastructure',
    problemText: 'Training courses, equipment and practical skills frequently lag behind fast-moving industry advancements, leaving institutes teaching obsolete methods.',
    solutionTitle: 'Continuous Course Health Scoring',
    solutionText: 'Kaushal Setu evaluates live curriculum relevance against industrial telemetry, flagging obsolete modules and recommending targeted lab upgrades.'
  },
  {
    number: '02',
    problemTitle: 'Skill Mismatch with Industry Demand',
    problemText: 'There is no continuous mechanism connecting real-time job-market requirements and hiring standards with what vocational institutes actually teach.',
    solutionTitle: 'Live Telemetry & Direct Employer Input',
    solutionText: 'Real-time NLP parsing of job postings paired with quarterly employer competency surveys feeds directly into curriculum advisory panels.'
  },
  {
    number: '03',
    problemTitle: 'Poor Career & Placement Visibility',
    problemText: 'Candidates and families lack reliable foresight on which trades yield strong employment, often spending critical years training for declining jobs.',
    solutionTitle: 'Predictive Career Trajectories',
    solutionText: 'Open, transparent demand analytics give students early visibility into job placement velocity, salary bands, and prerequisite learning paths.'
  },
  {
    number: '04',
    problemTitle: 'Inefficient Government Planning',
    problemText: 'Public skill-development budgets often rely on outdated census or historic figures rather than predictive, district-level workforce demand analytics.',
    solutionTitle: 'District-Level Precision Governance',
    solutionText: 'District collectors and skill development societies access real-time demand maps to prioritize new trade sanctions and lab capital investments.'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Market Signals',
    marathiTitle: '१. बाजार संकेत',
    hindiTitle: '1. बाजार संकेत',
    subtitle: 'High-Frequency Ingestion',
    marathiSubtitle: 'थेट डेटा संकलन',
    hindiSubtitle: 'सक्रिय डेटा संग्रह',
    description: 'Aggregates structured signals: active job postings, employer surveys, sector growth projections, placement records, and emerging technological shifts.',
    marathiDescription: 'नोकरीच्या जाहिराती, उद्योग सर्वेक्षणे, क्षेत्रनिहाय वाढीचा अंदाज आणि प्लेसमेंट नोंदींचे थेट संकलन.',
    hindiDescription: 'सक्रिय नौकरी पोस्टिंग, नियोक्ता सर्वेक्षण, क्षेत्र विकास पूर्वानुमान और प्लेसमेंट रिकॉर्ड का संग्रह।',
    inputs: ['Job Postings', 'Employer Surveys', 'Industry Trends', 'Placement Outcomes', 'Technological Shifts']
  },
  {
    step: 2,
    title: 'AI / NLP Engine',
    marathiTitle: '२. AI आणि NLP इंजिन',
    hindiTitle: '2. AI और NLP इंजन',
    subtitle: 'Semantic Competency Mapping',
    marathiSubtitle: 'कौशल्य जुळवणी',
    hindiSubtitle: 'कौशल संरेखन',
    description: 'Processes unstructured job requirements, normalizes skills against NSQF standards, identifies emerging clusters, and detects obsolete syllabus sections.',
    marathiDescription: 'कौशल्यांची NSQF मानकांनुसार वर्गवारी, नवीन क्षेत्रांची ओळख आणि कालबाह्य घटकांचे विश्लेषण.',
    hindiDescription: 'कौशलों का NSQF मानकों के अनुसार वर्गीकरण, नए क्षेत्रों की पहचान और पुराने भागों का विश्लेषण।',
    inputs: ['Skill Taxonomy Matching', 'Risk Scoring', 'Deficit Forecasting', 'Cluster Analysis']
  },
  {
    step: 3,
    title: 'Recommendations',
    marathiTitle: '३. शिफारसी',
    hindiTitle: '3. सिफारिशें',
    subtitle: 'Targeted Institutional Outputs',
    marathiSubtitle: 'नियोजित आउटपुट',
    hindiSubtitle: 'लक्षित आउटपुट',
    description: 'Generates tailored intelligence: course health ratings for training centres, talent pipelines for employers, career roadmaps for students, and district priority reports for government.',
    marathiDescription: 'प्रशिक्षण केंद्रांसाठी आरोग्य दर, उद्योगांसाठी मनुष्यबळ आणि विद्यार्थ्यांसाठी करिअर मार्गदर्शन.',
    hindiDescription: 'प्रशिक्षण केंद्रों के लिए स्कोरकार्ड, नियोक्ताओं के लिए प्रतिभा और छात्रों के लिए करियर मार्गदर्शन।',
    inputs: ['Curriculum Upgrades', 'Trainer Gap Reports', 'Student Pathways', 'District Priority Lists']
  },
  {
    step: 4,
    title: 'Validation & Action',
    marathiTitle: '४. पडताळणी आणि कृती',
    hindiTitle: '4. सत्यापन एवं कार्रवाई',
    subtitle: 'Human-in-the-Loop Governance',
    marathiSubtitle: 'तज्ज्ञ समिती मंजुरी',
    hindiSubtitle: 'विशेषज्ञ समिति स्वीकृति',
    description: 'Crucial safeguard: AI recommendations are reviewed by academic councils, industry mentors, and state directorates before formal adoption.',
    marathiDescription: 'AI शिफारसी शैक्षणिक परिषद, उद्योग तज्ज्ञ आणि राज्य संचालक मंडळाकडून स्वीकृत केल्या जातात.',
    hindiDescription: 'AI सिफारिशों की समीक्षा शैक्षणिक परिषदों, उद्योग विशेषज्ञों और राज्य निदेशालयों द्वारा की जाती है।',
    inputs: ['Academic Review', 'Industry Endorsement', 'State Directorate Sanction', 'Lab Readiness Check']
  },
  {
    step: 5,
    title: 'Outcomes & Deployment',
    marathiTitle: '५. निकाल आणि अंमलबजावणी',
    hindiTitle: '5. परिणाम एवं कार्यान्वयन',
    subtitle: 'Empowered Ecosystem',
    marathiSubtitle: 'सक्षम परिसंस्था',
    hindiSubtitle: 'सशक्त पारिस्थितिकी तंत्र',
    description: 'Training centres roll out modernized modules; employers hire certified talent; candidates secure durable livelihoods; public funds yield measurable ROI.',
    marathiDescription: 'आधुनिक अभ्यासक्रमाची अंमलबजावणी, उमेदवारांना रोजगार आणि उद्योगांना कुशल मनुष्यबळ.',
    hindiDescription: 'आधुनिक पाठ्यक्रम लागू करना, उम्मीदवारों को रोजगार और उद्योगों को कुशल कार्यबल देना।',
    inputs: ['Modernized Syllabi', 'Practical Lab Tests', 'Higher Placement Rates', 'Optimal Public Outlay']
  },
  {
    step: 6,
    title: 'Continuous Feedback',
    marathiTitle: '६. सतत अभिप्राय चक्र',
    hindiTitle: '6. निरंतर प्रतिक्रिया चक्र',
    subtitle: 'Perpetual Alignment',
    marathiSubtitle: 'सतत अद्ययावत',
    hindiSubtitle: 'निरंतर अद्यतन',
    description: 'Graduate performance, retention statistics, and fresh industrial developments feed straight back into Step 1, ensuring zero curriculum stagnation.',
    marathiDescription: 'उमेदवारांचे कार्यप्रदर्शन आणि नवीन उद्योग गरजा थेट पुन्हा टप्पा १ मध्ये समाविष्ट केल्या जातात.',
    hindiDescription: 'उम्मीदवारों का प्रदर्शन और नए उद्योग विकास सीधे चरण 1 में पुनः फीड किए जाते हैं।',
    inputs: ['Workplace Feedback', 'Alumni Trajectories', 'Fresh Market Postings', 'Iterative AI Calibration']
  }
];

export const STAKEHOLDERS_DATA = [
  {
    role: 'training-centre' as const,
    title: 'Training Centres',
    marathiTitle: 'प्रशिक्षण संस्था',
    tagline: 'Align curricula, infrastructure, trainers and assessments with real market demand.',
    description: 'ITIs, Polytechnics, and private vocational centres get actionable course health audits, equipment gap checklists, and trainer development roadmaps.',
    features: [
      'Course Health Index & Obsolete Module Warnings',
      'Recommended Lab & Tool Modernization Checklists',
      'Trainer Competency & Upskilling Modules',
      'Automated NSQF / NCVET Alignment Reports'
    ],
    ctaText: 'Training Centre Portal',
    route: '/login?role=training-centre'
  },
  {
    role: 'employer' as const,
    title: 'Employers & Industry',
    marathiTitle: 'उद्योग व नियोजक',
    tagline: 'Share skill requirements and help validate future-ready curricula.',
    description: 'Companies from automotive, renewables, manufacturing, and IT shape the next generation of technicians through quarterly competency feedback.',
    features: [
      'Micro-Competency & Skill Demand Feedback Form',
      'Curriculum Co-Design & Advisory Contribution',
      'Apprenticeship & Direct Recruitment Pipelines',
      'Cluster Hiring Forecasts & Benchmarking'
    ],
    ctaText: 'Employer Portal',
    route: '/login?role=employer'
  },
  {
    role: 'candidate' as const,
    title: 'Candidates & Learners',
    marathiTitle: 'उमेदवार व विद्यार्थी',
    tagline: 'Discover future skills, career paths and high-growth learning opportunities.',
    description: 'Students and job seekers can evaluate trade viability, review district placement histories, and access personalized bridge-learning suggestions.',
    features: [
      'District-Level Career Opportunity Heatmaps',
      'Trade Longevity & Salary Benchmark Insights',
      'Self-Assessed Skill Gap & Recommended Bridge Courses',
      'Verified Apprenticeship & Scheme Opportunities'
    ],
    ctaText: 'Candidate Portal',
    route: '/login?role=candidate'
  },
  {
    role: 'admin' as const,
    title: 'Government & Policy Makers',
    marathiTitle: 'शासन व धोरणकर्ते',
    tagline: 'Monitor skill gaps and support data-driven district planning.',
    description: 'State directorates and district administrations gain predictive insights to optimize infrastructure budgets, sanction new trades, and evaluate ROI.',
    features: [
      '36-District Predictive Skill Gap Dashboard',
      'Training Capacity vs. Labour Deficit Analytics',
      'Evidence-Based Trade Sanctioning & Budgeting',
      'State-Level Skilling ROI & Placement Tracking'
    ],
    ctaText: 'Government Intelligence',
    route: '/login?role=admin'
  }
];

export const WHY_DIFFERENT_PILLARS = [
  {
    title: 'Continuous Intelligence',
    subtitle: 'Not a one-time static curriculum review',
    description: 'Traditional government syllabus revisions happen once every 5 to 7 years. Kaushal Setu monitors market signals continuously, generating quarterly advisory updates so syllabi evolve alongside technology.',
    iconName: 'Activity'
  },
  {
    title: 'Early Risk Detection',
    subtitle: 'Separately identifies obsolete vs oversupplied trades',
    description: 'Differentiates between technologically obsolete courses (methods no longer used) and regionally oversupplied courses (too many graduates for limited local openings), allowing surgical interventions.',
    iconName: 'AlertTriangle'
  },
  {
    title: 'AI + Human Validation',
    subtitle: 'AI drafts recommendations; experts validate before rollout',
    description: 'No automated disruption. Machine learning synthesizes thousands of job market data points into draft recommendations, which academic boards and industry councils rigorously review before adoption.',
    iconName: 'CheckCircle2'
  },
  {
    title: 'One Connected Ecosystem',
    subtitle: 'Unified single source of truth across 4 stakeholders',
    description: 'Instead of isolated reports, Training Centres, Employers, Candidates, and Government officials view the identical, synchronised telemetry. Everyone moves in the same strategic direction.',
    iconName: 'Network'
  }
];

export const RELATED_SCHEMES: SchemeItem[] = [
  {
    id: 'iti',
    name: 'Industrial Training Institutes (ITI)',
    abbr: 'ITI / DGT',
    type: 'Central Initiative',
    description: 'National network of post-secondary vocational training institutes imparting craftsman training in engineering and non-engineering trades.',
    targetAudience: '10th / 12th pass students seeking technical trades'
  },
  {
    id: 'jss',
    name: 'Jan Shikshan Sansthan',
    abbr: 'JSS',
    type: 'Central Initiative',
    description: 'Provides vocational skills to non-literates, neo-literates, and school dropouts in rural and semi-urban communities.',
    targetAudience: 'Grassroots learners, women, and rural artisans'
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Scheme',
    abbr: 'PM-V',
    type: 'Central Initiative',
    description: 'End-to-end holistic support to traditional artisans and craftspeople working with hands and traditional tools across 18 trades.',
    targetAudience: 'Traditional artisans, carpenters, blacksmiths, potters'
  },
  {
    id: 'naps',
    name: 'National Apprenticeship Promotion Scheme',
    abbr: 'NAPS',
    type: 'Apprenticeship',
    description: 'Financial support and stipendiary sharing to encourage enterprises to hire trade apprentices across manufacturing and services.',
    targetAudience: 'Enterprises and newly certified trade graduates'
  },
  {
    id: 'ncs',
    name: 'National Career Service',
    abbr: 'NCS',
    type: 'Central Initiative',
    description: 'Nationwide digital employment exchange bridging candidates, career counsellors, and hiring employers.',
    targetAudience: 'Job seekers, career counsellors, recruiting agencies'
  },
  {
    id: 'skill-india',
    name: 'Skill India Mission (PMKVY)',
    abbr: 'PMKVY',
    type: 'Certification',
    description: 'Short-term skill training, recognition of prior learning (RPL), and specialized certification across high-priority national job roles.',
    targetAudience: 'Youth seeking rapid skilling and formal trade certification'
  },
  {
    id: 'nptel',
    name: 'National Programme on Technology Enhanced Learning',
    abbr: 'NPTEL / SWAYAM',
    type: 'Central Initiative',
    description: 'Free open online technical and engineering courses curated by IITs and IISc for curriculum enrichment and self-paced learning.',
    targetAudience: 'Polytechnic and engineering students and trade instructors'
  },
  {
    id: 'mssds',
    name: 'Maharashtra State Skill Development Society',
    abbr: 'MSSDS',
    type: 'State Initiative',
    description: 'Nodal Maharashtra agency coordinating skill initiatives, district skill development committees, and Pramod Mahajan skilling programs.',
    targetAudience: 'Maharashtra candidates and registered state training providers'
  }
];

export const LATEST_UPDATES: UpdateItem[] = [
  {
    id: 'up-1',
    title: 'Q3 2026 Skill Demand Intelligence Report: Pune & Chhatrapati Sambhajinagar Industrial Corridors',
    category: 'Skill Demand',
    date: '04 Sep 2026',
    summary: 'Identified a 38% increase in demand for Electric Vehicle battery diagnostics and automated warehouse material handling technicians.',
    tag: 'Report Release'
  },
  {
    id: 'up-2',
    title: 'Curriculum Advisory: Modular EV Systems Addition to ITI Mechanic Motor Vehicle Trade',
    category: 'Curriculum',
    date: '28 Aug 2026',
    summary: 'Academic expert committee validates 120-hour practical EV conversion module covering lithium-ion safety, inverter maintenance, and regenerative braking.',
    tag: 'Curriculum Advisory'
  },
  {
    id: 'up-3',
    title: 'District Skill Planning Advisory issued to 36 District Skill Committees',
    category: 'District Planning',
    date: '19 Aug 2026',
    summary: 'Predictive analytics released to guide district collectors in prioritizing FY 2026-27 vocational equipment sanctions based on local industry telemetry.',
    tag: 'Administrative'
  },
  {
    id: 'up-4',
    title: 'Employer Skill Demand Survey Window Opened for Maharashtra Renewable Energy Sector',
    category: 'Employer Survey',
    date: '10 Aug 2026',
    summary: 'Solar EPC contractors and wind turbine maintenance companies invited to submit required field competencies and tooling requirements.',
    tag: 'Industry Window'
  },
  {
    id: 'up-5',
    title: 'Pilot Programme Milestone: 14 Model ITIs Integrated with Live Curriculum Feedback',
    category: 'Pilot Initiative',
    date: '01 Aug 2026',
    summary: 'Smart India Hackathon prototype pilot demonstrates successful telemetry ingestion across 14 training institutions with 92% mentor alignment score.',
    tag: 'Milestone'
  }
];

export const EXPECTED_IMPACTS = [
  {
    category: 'SOCIAL IMPACT',
    color: 'border-blue-600',
    points: [
      'Reduces youth unemployment and underemployment by aligning education with actual hiring needs.',
      'Ensures candidates from Tier-2 and Tier-3 districts access the same high-resolution intelligence as metro job seekers.',
      'Protects household finances by preventing families from investing time and money into obsolete or saturated trades.',
      'Supports adult reskilling and career transitions for workers facing automation disruptions.'
    ]
  },
  {
    category: 'ECONOMIC IMPACT',
    color: 'border-amber-600',
    points: [
      'Maximizes public return on investment (ROI) for state and central vocational education funding.',
      'Significantly compresses hiring lead-times and onboarding costs for manufacturing and MSME employers.',
      'Narrows localized talent bottlenecks in sunrise industries (EV, solar, automation), accelerating project completion.',
      'Enhances regional wage earning capacity through verified, industry-accredited trade credentials.'
    ]
  },
  {
    category: 'ENVIRONMENTAL IMPACT',
    color: 'border-emerald-600',
    points: [
      'Accelerates the transition to green jobs by rapidly supplying certified solar, EV, and bio-energy technicians.',
      'Paperless, digital curriculum workflow reduces institutional waste across hundreds of training centres.',
      'Minimizes forced distress migration to distant metro cities by fostering localized district-level employment hubs.'
    ]
  },
  {
    category: 'GOVERNANCE & TECHNICAL IMPACT',
    color: 'border-indigo-600',
    points: [
      'Pioneers Explainable AI with mandatory human-in-the-loop expert validation before policy or curriculum change.',
      'Provides state administrators with predictive, defensible data for district-level budget allocations.',
      'Full architectural compatibility with NSQF (National Skills Qualifications Framework) and NCVET standards.'
    ]
  }
];
