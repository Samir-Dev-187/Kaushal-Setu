import {
  ProviderProfile,
  CourseCatalogueItem,
  PriorityActionItem,
  GovernmentNoticeItem,
  TrainerItem,
  EquipmentUpgradeItem,
  OnlineContentItem,
  RequestApplicationItem,
  NotificationItem,
  IndustryUpdateItem,
  HumanValidationReview
} from '../types/trainingCentre';

export const PRIMARY_OFFLINE_PROVIDER: ProviderProfile = {
  id: 'inst-kalyani-01',
  name: 'Kalyani ITI',
  campusName: 'Automobile Engineering Campus',
  district: 'Nashik',
  state: 'Maharashtra',
  providerType: 'offline',
  affiliation: 'Directorate of Vocational Education & Training (DVET) / NCVT',
  registrationNumber: 'MH-NSK-ITI-2018-042',
  verified: true,
  profileCompletion: 82,
  lastIntelligenceUpdate: 'Today, 10:30 AM',
  statusText: 'Market intelligence active',
  totalStudents: 840,
  totalTrainers: 18,
  establishedYear: 1994,
  contactEmail: 'principal@kalyani-iti.ac.in',
  contactPhone: '+91 (0253) 238-9042',
  address: 'Plot B-14, MIDC Ambad Industrial Area, Nashik, Maharashtra 422010',
  website: 'https://kalyani-iti.ac.in'
};

export const SECONDARY_ONLINE_PROVIDER: ProviderProfile = {
  id: 'inst-online-02',
  name: 'Kaushal Online Academy',
  campusName: 'Digital Vocational Learning Studio',
  district: 'Pune (Central Hub)',
  state: 'Maharashtra',
  providerType: 'online',
  affiliation: 'Skill India Digital Hub / Maharashtra State Skill University',
  registrationNumber: 'MH-DIG-ACAD-2022-811',
  verified: true,
  profileCompletion: 94,
  lastIntelligenceUpdate: 'Today, 11:15 AM',
  statusText: 'Market intelligence active',
  totalStudents: 14200,
  totalTrainers: 24,
  establishedYear: 2022,
  contactEmail: 'academics@kaushalonline.edu.in',
  contactPhone: '+91 (020) 679-3300',
  address: 'Level 5, Cyber Park, Senapati Bapat Road, Pune, Maharashtra 411016',
  website: 'https://kaushalonline.edu.in'
};

export const TRAINING_CENTRE_COURSES: CourseCatalogueItem[] = [
  {
    id: 'course-mmv-01',
    code: 'MMV-201',
    name: 'Automobile Engineering (Mechanic Motor Vehicle)',
    sector: 'Automotive & Clean Mobility',
    nsqfLevel: 4,
    qualificationCode: 'DEMO-Q-2026-AUT',
    status: 'Review',
    marketDemand: 'MEDIUM',
    placementRate: 58,
    prevPlacementRate: 64,
    techObsolescenceRisk: 'HIGH',
    techRiskExplanation: '72% of regional automotive postings now specify electric powertrain, BMS, and high-voltage diagnostics rather than carburettor and mechanical diesel injection.',
    oversupplyRisk: 'MEDIUM',
    oversupplyExplanation: 'Traditional ICE mechanic output matches regional baseline repair shops, but premium OEM hiring centers are shifting exclusively to EV/hybrid roles.',
    alignmentScore: 54,
    annualCapacity: 120,
    currentEnrolment: 114,
    annualGraduates: 108,
    durationMonths: 24,
    dimensionalHealth: {
      curriculum: 52,
      industryDemand: 74,
      trainerReadiness: 45,
      equipmentReadiness: 40,
      assessmentReadiness: 56,
      placementOutcomes: 58
    },
    demandTrend3Yr: 'Declining',
    historicalDemand: [
      { year: '2024', demand: 180, seats: 120, placed: 78 },
      { year: '2025', demand: 140, seats: 120, placed: 70 },
      { year: '2026 (Est)', demand: 95, seats: 120, placed: 62 }
    ],
    topMissingSkills: ['EV Battery Diagnostics', 'PMSM Motor Control', 'High-Voltage Safety', 'Regenerative Braking Systems', 'OBD-II CAN-Bus Scanning'],
    currentCurriculumModules: [
      'Engine Principles (Four-Stroke / Two-Stroke)',
      'Carburettors & Mechanical Fuel Injection Pumps',
      'Clutch & Manual Gearbox Overhaul',
      'Exhaust & Conventional Emission Systems',
      'Lead-Acid Battery & Starter Alternator Testing'
    ],
    recommendedAddModules: [
      'Module EV-1: High-Voltage Safety Protocols & PPE Disconnect (30 hrs)',
      'Module EV-2: Permanent Magnet Synchronous Motors & Controllers (40 hrs)',
      'Module EV-3: Lithium-Ion BMS Cell Chemistry & Thermal Runaway Prevention (30 hrs)',
      'Module EV-4: DC Fast-Charging Protocols & Diagnostic Scanners (20 hrs)'
    ],
    recommendedUpdateModules: [
      'Update Electrical & Electronics from 12V DC basics to modern CAN-Bus sensor telemetry'
    ],
    recommendedReduceModules: [
      'Reduce mechanical carburettor tuning and lead-acid trickle-charging practical hours by 50%'
    ],
    aiRecommendationSummary: 'Transition to Modular EV Technology Curriculum (120-Hour Add-on Annexure) ratified by DVET automotive working group.',
    aiConfidenceScore: 89
  },
  {
    id: 'course-elec-02',
    code: 'ELE-101',
    name: 'Electrician (Commercial & Industrial)',
    sector: 'Power, Construction & Green Energy',
    nsqfLevel: 4,
    qualificationCode: 'DEMO-Q-2026-ELE',
    status: 'Current',
    marketDemand: 'HIGH',
    placementRate: 76,
    prevPlacementRate: 72,
    techObsolescenceRisk: 'LOW',
    techRiskExplanation: 'Core AC/DC distribution, wiring regulations, switchgear, and safety standards remain in high ongoing industrial demand.',
    oversupplyRisk: 'LOW',
    oversupplyExplanation: 'Industrial expansion in Nashik MIDC (Ambad and Satpur) continues to absorb qualified licensed wiremen and industrial electricians.',
    alignmentScore: 84,
    annualCapacity: 140,
    currentEnrolment: 138,
    annualGraduates: 132,
    durationMonths: 24,
    dimensionalHealth: {
      curriculum: 88,
      industryDemand: 92,
      trainerReadiness: 82,
      equipmentReadiness: 78,
      assessmentReadiness: 80,
      placementOutcomes: 76
    },
    demandTrend3Yr: 'Growing',
    historicalDemand: [
      { year: '2024', demand: 160, seats: 140, placed: 98 },
      { year: '2025', demand: 185, seats: 140, placed: 104 },
      { year: '2026 (Est)', demand: 210, seats: 140, placed: 106 }
    ],
    topMissingSkills: ['Solar Inverter Grid-Tying', 'PLC Basics', 'Harmonic Filter Maintenance'],
    currentCurriculumModules: [
      'Basic Electricity & Magnetism',
      'Single & Three-Phase Wiring',
      'AC/DC Machines & Starters',
      'Transformer Testing & Maintenance',
      'Earthing & Lightning Arrestors'
    ],
    recommendedAddModules: [
      'Solar Rooftop PV Inverter Grid Interfacing (25 hrs)'
    ],
    recommendedUpdateModules: [
      'Integrate digital smart energy meters into practical switchgear tests'
    ],
    recommendedReduceModules: [],
    aiRecommendationSummary: 'Course is sound; introduce optional 25-hour Solar Grid-Tie booster badge.',
    aiConfidenceScore: 94
  },
  {
    id: 'course-fit-03',
    code: 'FIT-102',
    name: 'Fitter (Mechanical Fabrication & Assembly)',
    sector: 'Capital Goods & Mechanical Engineering',
    nsqfLevel: 4,
    qualificationCode: 'DEMO-Q-2026-FIT',
    status: 'Oversupplied',
    marketDemand: 'HIGH',
    placementRate: 72,
    prevPlacementRate: 74,
    techObsolescenceRisk: 'LOW',
    techRiskExplanation: 'Mechanical fitting, precision measurement, and tolerancing skills remain fundamentally useful in fabrication shops.',
    oversupplyRisk: 'HIGH',
    oversupplyExplanation: 'Across Nashik district alone, 14 institutes produce 1,840 fitters annually, while local projected job absorption is capped at ~1,100.',
    alignmentScore: 68,
    annualCapacity: 160,
    currentEnrolment: 156,
    annualGraduates: 148,
    durationMonths: 24,
    dimensionalHealth: {
      curriculum: 80,
      industryDemand: 82,
      trainerReadiness: 85,
      equipmentReadiness: 82,
      assessmentReadiness: 76,
      placementOutcomes: 72
    },
    demandTrend3Yr: 'Stable',
    historicalDemand: [
      { year: '2024', demand: 150, seats: 160, placed: 112 },
      { year: '2025', demand: 145, seats: 160, placed: 115 },
      { year: '2026 (Est)', demand: 130, seats: 160, placed: 106 }
    ],
    topMissingSkills: ['Hydraulic & Pneumatic Circuit Diagnostics', 'CNC Tool Pre-Setting'],
    currentCurriculumModules: [
      'Bench Work & Hand Filing',
      'Precision Marking & Drilling',
      'Lathe Basics & Screw Cutting',
      'Pipe Fitting & Flange Alignment',
      'Bearing Fitment & Maintenance'
    ],
    recommendedAddModules: [
      'Electro-Pneumatic Actuators and Solenoid Valves (30 hrs)'
    ],
    recommendedUpdateModules: [
      'Shift focus from basic hand-filing to pneumatic jigs and hydraulic fixture alignment'
    ],
    recommendedReduceModules: [
      'Consider reallocating 40 annual seats from Fitter into Industrial Automation / EV Technician'
    ],
    aiRecommendationSummary: 'Regionally oversupplied. Recommend capping admission seats by 25% and shifting training capacity into CNC / Robotics.',
    aiConfidenceScore: 91
  },
  {
    id: 'course-ev-04',
    code: 'EV-301',
    name: 'Electric Vehicle Technician (Powertrain & Battery)',
    sector: 'Clean Mobility & Automotive Tech',
    nsqfLevel: 5,
    qualificationCode: 'DEMO-Q-2026-EVT',
    status: 'Expand',
    marketDemand: 'VERY HIGH',
    placementRate: 82,
    prevPlacementRate: 75,
    techObsolescenceRisk: 'LOW',
    techRiskExplanation: 'Direct sunrise trade with escalating 38% annual hiring expansion across Maharashtra automotive corridors.',
    oversupplyRisk: 'LOW',
    oversupplyExplanation: 'Massive employer talent deficit in Nashik, Pune, and Chhatrapati Sambhajinagar clusters.',
    alignmentScore: 92,
    annualCapacity: 60,
    currentEnrolment: 60,
    annualGraduates: 58,
    durationMonths: 12,
    dimensionalHealth: {
      curriculum: 94,
      industryDemand: 98,
      trainerReadiness: 74,
      equipmentReadiness: 68,
      assessmentReadiness: 84,
      placementOutcomes: 82
    },
    demandTrend3Yr: 'Growing',
    historicalDemand: [
      { year: '2024', demand: 110, seats: 40, placed: 32 },
      { year: '2025', demand: 190, seats: 60, placed: 50 },
      { year: '2026 (Est)', demand: 320, seats: 60, placed: 58 }
    ],
    topMissingSkills: ['Battery Swapping Station Maintenance', 'Telemetry Fleet Analytics'],
    currentCurriculumModules: [
      'EV Architecture & High-Voltage Architecture',
      'Lithium-Ion Cell Chemistry, Pack Assembly & BMS',
      'BLDC / PMSM Motor Diagnostics',
      'Onboard Charger (OBC) & DC Fast Charging Protocols',
      'CAN Bus Diagnostics & Fault Code Analysis'
    ],
    recommendedAddModules: [
      'Fleet Battery Health Telemetry & Swapping Station Hardware'
    ],
    recommendedUpdateModules: [
      'Add live battery fire-suppression simulation'
    ],
    recommendedReduceModules: [],
    aiRecommendationSummary: 'Urgent capacity expansion recommended. Increase intake from 60 to 120 seats per batch to absorb unmet employer requisitions.',
    aiConfidenceScore: 96
  },
  {
    id: 'course-sol-05',
    code: 'SOL-202',
    name: 'Solar PV Technician (Suryamitra Certified)',
    sector: 'Renewable Energy',
    nsqfLevel: 4,
    qualificationCode: 'DEMO-Q-2026-SOL',
    status: 'Current',
    marketDemand: 'VERY HIGH',
    placementRate: 79,
    prevPlacementRate: 73,
    techObsolescenceRisk: 'LOW',
    techRiskExplanation: 'Surging installations under PM Surya Ghar Muft Bijli Yojana driving sustained technician requisitions.',
    oversupplyRisk: 'LOW',
    oversupplyExplanation: 'Local demand outstrips certified technicians by 1.8x across North Maharashtra.',
    alignmentScore: 88,
    annualCapacity: 80,
    currentEnrolment: 78,
    annualGraduates: 74,
    durationMonths: 12,
    dimensionalHealth: {
      curriculum: 90,
      industryDemand: 94,
      trainerReadiness: 84,
      equipmentReadiness: 80,
      assessmentReadiness: 86,
      placementOutcomes: 79
    },
    demandTrend3Yr: 'Growing',
    historicalDemand: [
      { year: '2024', demand: 90, seats: 60, placed: 44 },
      { year: '2025', demand: 130, seats: 80, placed: 60 },
      { year: '2026 (Est)', demand: 175, seats: 80, placed: 72 }
    ],
    topMissingSkills: ['Micro-Inverter Setup', 'Drone-Assisted Solar Thermography'],
    currentCurriculumModules: [
      'Solar Radiation & Cell Physics',
      'Rooftop Structure Mounting & Shadow Analysis',
      'Grid-Tied vs Off-Grid Inverters',
      'DC Cabling, Protections & Net Metering',
      'Preventive Maintenance & Cleaning Robotics'
    ],
    recommendedAddModules: [
      'Micro-inverter installations and smart cloud-monitoring telemetry'
    ],
    recommendedUpdateModules: [],
    recommendedReduceModules: [],
    aiRecommendationSummary: 'Strong market performance with excellent placement conversion; maintain and scale.',
    aiConfidenceScore: 93
  },
  {
    id: 'course-dra-09',
    code: 'DRM-105',
    name: 'Draughtsman Mechanical (2D Manual Drafting)',
    sector: 'Engineering Design & Manufacturing',
    nsqfLevel: 4,
    qualificationCode: 'DEMO-Q-2026-DRM',
    status: 'Obsolete',
    marketDemand: 'LOW',
    placementRate: 51,
    prevPlacementRate: 56,
    techObsolescenceRisk: 'HIGH',
    techRiskExplanation: 'Manual drafting boards and 2D-only blueprints have been 95% replaced by 3D Parametric CAD/CAM and generative design software.',
    oversupplyRisk: 'HIGH',
    oversupplyExplanation: 'Firms no longer recruit pure draughtsmen; they hire digital CAD/CAM modellers with 3D printing literacy.',
    alignmentScore: 42,
    annualCapacity: 60,
    currentEnrolment: 42,
    annualGraduates: 38,
    durationMonths: 24,
    dimensionalHealth: {
      curriculum: 38,
      industryDemand: 34,
      trainerReadiness: 50,
      equipmentReadiness: 42,
      assessmentReadiness: 46,
      placementOutcomes: 51
    },
    demandTrend3Yr: 'Declining',
    historicalDemand: [
      { year: '2024', demand: 45, seats: 60, placed: 24 },
      { year: '2025', demand: 32, seats: 60, placed: 18 },
      { year: '2026 (Est)', demand: 20, seats: 60, placed: 14 }
    ],
    topMissingSkills: ['SolidWorks / CATIA 3D Modelling', 'Additive Manufacturing (3D Printing)', 'Reverse Engineering Scanners'],
    currentCurriculumModules: [
      'Drawing Board Instrument Handling',
      'Geometric Construction & Orthographic Projection',
      'Sectional Views & Isometric Projections',
      'Basic 2D AutoCAD Commands',
      'Fastener & Spring Detailing'
    ],
    recommendedAddModules: [
      'Parametric 3D Solid Modelling (SolidWorks / Fusion 360)',
      '3D Printing Slicing & Additive Prototyping'
    ],
    recommendedUpdateModules: [
      'Retire 70% of manual drawing board practical hours; migrate all assignments to CAD computer workstations'
    ],
    recommendedReduceModules: [
      'Complete sunset of pencil trace paper drafting examinations'
    ],
    aiRecommendationSummary: 'Urgent obsolescence intervention. Recommend re-registering course as "Digital Design & Additive Manufacturing Specialist".',
    aiConfidenceScore: 92
  }
];

export const TOP_KPI_CARDS_DATA = [
  {
    id: 'total-courses',
    title: 'Total Courses',
    value: '12',
    badge: '9 current • 2 review • 1 critical',
    trend: '+2 new trades added',
    trendType: 'neutral' as const,
    icon: 'BookOpen',
    context: 'Across Automobile, Mechanical & Green Energy trades',
    targetRoute: '/training-centres/courses'
  },
  {
    id: 'market-alignment',
    title: 'Market Alignment',
    value: '76%',
    badge: 'Good Alignment',
    trend: '↑ 8% from previous analysis',
    trendType: 'positive' as const,
    icon: 'Target',
    context: 'Composite match score against live Maharashtra job postings',
    targetRoute: '/training-centres/market-intelligence'
  },
  {
    id: 'flagged-courses',
    title: 'Flagged Courses',
    value: '3',
    badge: '2 curriculum • 1 capacity',
    trend: 'Automobile, Fitter, Draughtsman',
    trendType: 'warning' as const,
    icon: 'AlertTriangle',
    context: 'Require immediate academic or seat quota intervention',
    targetRoute: '/training-centres/curriculum'
  },
  {
    id: 'pending-actions',
    title: 'Pending Actions',
    value: '5',
    badge: '2 urgent',
    trend: 'Requires principal review',
    trendType: 'danger' as const,
    icon: 'CheckSquare',
    context: 'Action items pending institution submission',
    targetRoute: '/training-centres#priority-actions'
  },
  {
    id: 'placement-rate',
    title: 'Placement Rate',
    value: '68%',
    badge: 'Active Placements',
    trend: '↑ 4.2% YoY growth',
    trendType: 'positive' as const,
    icon: 'TrendingUp',
    context: 'Average placement across graduated cohorts (2024-2025)',
    targetRoute: '/training-centres/placements'
  },
  {
    id: 'ai-recommendations',
    title: 'AI Recommendations',
    value: '7',
    badge: '3 critical',
    trend: 'Curriculum & lab tooling upgrades',
    trendType: 'info' as const,
    icon: 'Sparkles',
    context: 'Generated from real-time labour market telemetry',
    targetRoute: '/training-centres/curriculum'
  }
];

export const PRIORITY_ACTIONS: PriorityActionItem[] = [
  {
    id: 'action-01',
    number: 1,
    title: 'Curriculum Update Required',
    targetCourseOrArea: 'Automobile Engineering (MMV-201)',
    priority: 'CRITICAL',
    reason: 'EV-related demand has surged (+38% regional job postings). Traditional ICE curriculum will lead to suppressed graduate placement rates.',
    ctaText: 'Review Curriculum & Evidence',
    actionRouteOrType: 'curriculum-review'
  },
  {
    id: 'action-02',
    number: 2,
    title: 'Trainer Certification Required',
    targetCourseOrArea: 'Automotive Faculty Cell (2 Trainers Flagged)',
    priority: 'HIGH',
    reason: 'Instructors Rajesh Kumar and Priya Sharma have high skill gaps in EV Battery Management & PMSM Motor diagnostics.',
    ctaText: 'View Trainers & Upskilling Plan',
    actionRouteOrType: 'trainers-review'
  },
  {
    id: 'action-03',
    number: 3,
    title: 'Equipment Upgrade Request',
    targetCourseOrArea: 'Automobile Workshop Lab #3',
    priority: 'HIGH',
    reason: 'Battery diagnostic trainer kit and EV simulator recommended to conduct mandatory hands-on practical assessments.',
    ctaText: 'View Equipment Plan',
    actionRouteOrType: 'equipment-plan'
  },
  {
    id: 'action-04',
    number: 4,
    title: 'Capacity & Quota Review',
    targetCourseOrArea: 'Fitter Trade (FIT-102)',
    priority: 'MEDIUM',
    reason: 'Fitter course is regionally oversupplied (1,840 trainees vs 1,100 projected jobs). Consider reallocating 40 seats to EV or Solar PV.',
    ctaText: 'View Supply vs Demand Analysis',
    actionRouteOrType: 'capacity-review'
  },
  {
    id: 'action-05',
    number: 5,
    title: 'Government Data Verification',
    targetCourseOrArea: 'Annual Institute Compliance Portal',
    priority: 'CRITICAL',
    reason: 'DVET Annual Training Centre Data Verification window closes on 30 Sep 2026. Required for state funding eligibility.',
    ctaText: 'Complete Verification Now',
    actionRouteOrType: 'government-submission'
  }
];

export const GOVERNMENT_NOTICES: GovernmentNoticeItem[] = [
  {
    id: 'gov-not-01',
    title: 'Annual Training Centre Data Verification Window (AY 2026-27)',
    authority: 'Directorate of Vocational Education & Training (DVET), Maharashtra',
    date: '12 Sep 2026',
    deadline: '30 Sep 2026',
    priority: 'Important',
    description: 'Mandatory annual verification of workshop carpet area, active student enrolment registers, instructor NCVET certifications, and biometric attendance records for all affiliated ITIs and SDCs.',
    pdfFileName: 'DVET_Circular_Verification_2026_09.pdf',
    isRead: false,
    actionRequired: true,
    status: 'Active'
  },
  {
    id: 'gov-not-02',
    title: 'Special Capital Subsidy Scheme for Electric Vehicle & Green Tech Workshops',
    authority: 'Ministry of Skill Development & Entrepreneurship (MSDE), New Delhi',
    date: '18 Sep 2026',
    deadline: '15 Oct 2026',
    priority: 'Action Required',
    description: 'Up to 75% reimbursement on capital tooling expenditures for procuring EV battery simulators, charging test benches, and solar micro-inverter kits under the National Green Skilling Mission.',
    pdfFileName: 'MSDE_GreenTech_Subsidy_Norms_2026.pdf',
    isRead: false,
    actionRequired: true,
    status: 'Active'
  },
  {
    id: 'gov-not-03',
    title: 'Mandatory Implementation of Dual-System of Training (DST) MoUs',
    authority: 'Maharashtra State Skill Development Society (MSSDS)',
    date: '05 Sep 2026',
    deadline: '25 Oct 2026',
    priority: 'Deadline',
    description: 'Every training provider offering Mechanical, Automotive, and Electrical trades must formalize at least 2 industrial OEM apprenticeship partnerships to comply with NCVET Dual-System accreditation.',
    pdfFileName: 'MSSDS_DST_Compliance_Guidelines.pdf',
    isRead: true,
    actionRequired: false,
    status: 'Under Review'
  },
  {
    id: 'gov-not-04',
    title: 'Advisory on Alignment of Vocational Courses to NSQF Revised Levels 2026',
    authority: 'National Council for Vocational Education and Training (NCVET)',
    date: '28 Aug 2026',
    deadline: '30 Nov 2026',
    priority: 'Information',
    description: 'Standard guidelines on transitioning older modular employable skills (MES) to creditized NSQF Level 4 and Level 5 qualification packs under the National Credit Framework (NCrF).',
    pdfFileName: 'NCVET_NSQF_Migration_Advisory_2026.pdf',
    isRead: true,
    actionRequired: false,
    status: 'Completed'
  }
];

export const TRAINERS_LIST: TrainerItem[] = [
  {
    id: 'tr-01',
    name: 'Rajesh Kumar',
    roleTitle: 'Senior Vocational Instructor',
    qualification: 'Diploma in Automobile Engg (BTE Mumbai) + CITS Certified',
    experienceYears: 14,
    specialization: 'Automobile Engineering (Mechanic Motor Vehicle)',
    currentSkills: ['ICE Overhaul', 'Transmission Tuning', 'Carburettor Servicing', 'Shop Safety'],
    requiredSkills: ['Electric Motor Diagnostics (PMSM)', 'EV High-Voltage PPE & Disconnect', 'CAN-Bus Telemetry'],
    certificationStatus: 'In Progress',
    progressPercent: 60,
    skillGap: 'EV Systems & Motor Diagnostics',
    recommendedCourses: ['ARAI Certified EV Powertrain Specialist (40 hrs)', 'Tata Motors E-Mobility Train-the-Trainer (TTT)'],
    oemPartners: ['Tata Motors Pune Tech Centre', 'Mahindra Last Mile Mobility'],
    lastCertifiedDate: 'Nov 2022',
    email: 'rajesh.kumar@kalyani-iti.ac.in',
    phone: '+91 98230 44101'
  },
  {
    id: 'tr-02',
    name: 'Priya Sharma',
    roleTitle: 'Automotive Workshop Instructor',
    qualification: 'B.E. Mechanical Engineering + NCVT Instructor Badge',
    experienceYears: 6,
    specialization: 'Automobile Engineering & Diagnostics',
    currentSkills: ['Diesel Fuel Injection', 'Engine Diagnostics', 'Brake Systems'],
    requiredSkills: ['Lithium-Ion Battery Chemistry', 'BMS Cell Balancing', 'DC Fast Charger Maintenance'],
    certificationStatus: 'Not Started',
    progressPercent: 30,
    skillGap: 'Battery Management Systems (BMS)',
    recommendedCourses: ['IIT Madras E-Mobility Faculty Booster', 'ASDDC Battery Safety Protocols'],
    oemPartners: ['Bajaj Auto Waluj', 'Exide Energy Solutions'],
    lastCertifiedDate: 'Aug 2023',
    email: 'priya.sharma@kalyani-iti.ac.in',
    phone: '+91 94222 18902'
  },
  {
    id: 'tr-03',
    name: 'Suresh Patil',
    roleTitle: 'Head of Electrical Trade',
    qualification: 'B.E. Electrical + Master Instructor Certificate',
    experienceYears: 18,
    specialization: 'Electrician & Industrial Switchgear',
    currentSkills: ['Substation Maintenance', 'Motor Rewinding', 'AC/DC Drives', 'Industrial Earthing'],
    requiredSkills: ['Solar Inverter Grid Interfacing', 'Smart Micro-Grid Telemetry'],
    certificationStatus: 'Certified',
    progressPercent: 95,
    skillGap: 'Minor (Micro-Grid Telemetry)',
    recommendedCourses: ['National Institute of Solar Energy (NISE) Suryamitra Master'],
    oemPartners: ['Schneider Electric Training Academy', 'L&T Electrical'],
    lastCertifiedDate: 'Jan 2026',
    email: 'suresh.patil@kalyani-iti.ac.in',
    phone: '+91 98220 99403'
  },
  {
    id: 'tr-04',
    name: 'Ananya Deshmukh',
    roleTitle: 'Lead Instructor (Renewable Energy)',
    qualification: 'M.Tech Energy Systems + Suryamitra Certified Trainer',
    experienceYears: 8,
    specialization: 'Solar PV & Storage Technologies',
    currentSkills: ['PV Array Designing', 'Net Metering Protocols', 'Inverter Setup', 'LiFePO4 Storage'],
    requiredSkills: ['Green Hydrogen Electrolyzer Basics'],
    certificationStatus: 'Certified',
    progressPercent: 100,
    skillGap: 'None',
    recommendedCourses: ['MNRE Advanced Hydrogen Safety'],
    oemPartners: ['Waaree Solar', 'Tata Power Solar'],
    lastCertifiedDate: 'Feb 2026',
    email: 'ananya.deshmukh@kalyani-iti.ac.in',
    phone: '+91 99701 55214'
  },
  {
    id: 'tr-05',
    name: 'Ganesh More',
    roleTitle: 'Machinist & Toolroom Instructor',
    qualification: 'Diploma Mechanical + Tool & Die Specialization',
    experienceYears: 12,
    specialization: 'Fitter & CNC Machining',
    currentSkills: ['Lathe Operation', 'Precision Filing', 'Milling', 'Manual Tapping'],
    requiredSkills: ['Electro-Pneumatic Diagnostics', 'Fanuc CNC G-Code Simulation'],
    certificationStatus: 'Action Required',
    progressPercent: 45,
    skillGap: 'Electro-Pneumatics & CNC Automation',
    recommendedCourses: ['Indo-German Tool Room (IGTR) Aurangabad Faculty Track'],
    oemPartners: ['Bharat Forge', 'Godrej & Boyce Tooling'],
    lastCertifiedDate: 'Oct 2021',
    email: 'ganesh.more@kalyani-iti.ac.in',
    phone: '+91 98902 33115'
  }
];

export const EQUIPMENT_UPGRADE_PLAN: EquipmentUpgradeItem[] = [
  {
    id: 'eq-01',
    name: 'EV Battery Diagnostic & Balancing Trainer Rig',
    category: 'EV Systems',
    estimatedCostLakhs: 4.5,
    priority: 'Critical',
    studentsImpactedPerYear: 120,
    targetCourse: 'Automobile Engineering / EV Technician',
    requiredFor: 'Hands-on practicals for Lithium-Ion Cell Testing, BMS Error-Code Simulation, and Thermal Runaway Protocols.',
    budgetTier: 'Full Modernization',
    status: 'Recommended',
    recommendedVendorSpecs: 'Integrated 48V-72V modular LiFePO4 battery pack with CAN-enabled master BMS, programmable fault-injection matrix, and live laptop telemetry interface.'
  },
  {
    id: 'eq-02',
    name: 'PMSM Motor & Inverter Drive Test Bench',
    category: 'EV Systems',
    estimatedCostLakhs: 2.2,
    priority: 'High',
    studentsImpactedPerYear: 90,
    targetCourse: 'Automobile Engineering / EV Technician',
    requiredFor: 'Regenerative braking curve analysis, Hall sensor alignment, and field-oriented motor control practicals.',
    budgetTier: 'Medium',
    status: 'Requested',
    recommendedVendorSpecs: '3kW Permanent Magnet Synchronous Motor coupled to eddy-current dynamometer load, regenerative power feedback, and oscilloscope tap points.'
  },
  {
    id: 'eq-03',
    name: 'Dual-Gun AC/DC EV Fast-Charging Simulator',
    category: 'EV Systems',
    estimatedCostLakhs: 1.1,
    priority: 'Medium',
    studentsImpactedPerYear: 120,
    targetCourse: 'Automobile Engineering / Electrician',
    requiredFor: 'CCS2 & Bharat DC-001 plug pinout testing, handshake protocol simulation, and ground isolation safety tests.',
    budgetTier: 'Low',
    status: 'Recommended',
    recommendedVendorSpecs: 'Benchtop CCS-2 / Type-2 test box with pilot-signal generator, fault inject switch, and digital multimeter outputs.'
  },
  {
    id: 'eq-04',
    name: 'Electro-Pneumatic Industrial Automation Training Rig',
    category: 'Automation',
    estimatedCostLakhs: 1.8,
    priority: 'Medium',
    studentsImpactedPerYear: 160,
    targetCourse: 'Fitter / Electrician',
    requiredFor: 'Upgrading manual fitters with pneumatic cylinder circuit assembly and 24V DC solenoid valve troubleshooting.',
    budgetTier: 'Medium',
    status: 'Approved',
    recommendedVendorSpecs: 'Festo / SMC compatible grooved aluminum profile panel with dual-acting cylinders, 5/2 solenoid valves, and mini air compressor.'
  }
];

export const ONLINE_CONTENT_ITEMS: OnlineContentItem[] = [
  {
    id: 'cont-01',
    courseName: 'Electric Vehicle Powertrain Engineering (Online)',
    moduleName: 'Module 3: Battery Management Systems & Thermal Mitigation',
    freshnessScore: 48,
    videoCoveragePercent: 62,
    practicalSimulationAvailable: false,
    assessmentCoveragePercent: 55,
    status: 'Missing Content',
    recommendationText: 'High-voltage BMS live diagnostics module is missing interactive simulated circuit testing.',
    interactiveAdditions: ['Web-based BMS cell voltage balancer simulator', 'Thermal runaway prevention virtual lab', 'Interactive CAN-Bus packet decoder']
  },
  {
    id: 'cont-02',
    courseName: 'Industrial Automation & Robotics Basics (Online)',
    moduleName: 'Module 2: Ladder Logic & PLC Programming',
    freshnessScore: 88,
    videoCoveragePercent: 92,
    practicalSimulationAvailable: true,
    assessmentCoveragePercent: 86,
    status: 'Fresh',
    recommendationText: 'Content is up-to-date with current industry standards.',
    interactiveAdditions: ['Cloud PLC compiler', 'Virtual conveyor sorting simulation']
  },
  {
    id: 'cont-03',
    courseName: 'Solar PV Grid-Tie Design (Online)',
    moduleName: 'Module 4: Net Metering & Inverter Selection',
    freshnessScore: 68,
    videoCoveragePercent: 75,
    practicalSimulationAvailable: false,
    assessmentCoveragePercent: 70,
    status: 'Update Recommended',
    recommendationText: 'Update regulations to match PM Surya Ghar 2026 net-metering subsidy guidelines.',
    interactiveAdditions: ['Rooftop solar yield calculator', 'Tariff payback estimator']
  }
];

export const REQUESTS_APPLICATIONS: RequestApplicationItem[] = [
  {
    id: 'req-01',
    title: 'EV Battery Diagnostic & Motor Training Rig Procurement Subsidy',
    type: 'Equipment Request',
    submittedDate: '02 Sep 2026',
    status: 'Under Review',
    referenceNumber: 'REQ-EQ-NSK-2026-091',
    notes: 'Submitted under MSDE Green Tech Capital Subsidy Scheme. Estimated capital outlay: ₹6.7 Lakhs.',
    stageTimeline: [
      { stage: 'Draft Prepared', date: '28 Aug 2026', completed: true },
      { stage: 'Submitted to DVET', date: '02 Sep 2026', completed: true },
      { stage: 'Technical Committee Evaluation', date: '08 Sep 2026', completed: true, current: true },
      { stage: 'State Sanction Order', completed: false },
      { stage: 'Vendor GeM Procurement', completed: false }
    ]
  },
  {
    id: 'req-02',
    title: 'Faculty Deputation for ARAI Pune EV Train-the-Trainer Cohort',
    type: 'Trainer Certification',
    submittedDate: '15 Aug 2026',
    status: 'Approved',
    referenceNumber: 'REQ-TR-ARAI-2026-114',
    notes: 'Deputation of instructors Rajesh Kumar and Priya Sharma for 2-week residential hands-on training at ARAI Chakan.',
    stageTimeline: [
      { stage: 'Application Submitted', date: '15 Aug 2026', completed: true },
      { stage: 'DVET NOC Issued', date: '22 Aug 2026', completed: true },
      { stage: 'Seat Confirmed at ARAI', date: '01 Sep 2026', completed: true, current: true },
      { stage: 'Batch Commencement (Oct 2026)', completed: false }
    ]
  },
  {
    id: 'req-03',
    title: 'Annual Institute Data Verification Dossier (AY 2026-27)',
    type: 'Government Submission',
    submittedDate: 'Pending Submission',
    status: 'Draft',
    referenceNumber: 'REQ-GOV-ANN-2026-DRAFT',
    notes: 'Awaiting biometric student attendance summary and equipment asset register upload.',
    stageTimeline: [
      { stage: 'Dossier Initiated', date: '10 Sep 2026', completed: true, current: true },
      { stage: 'Digital Signature & Submission', completed: false },
      { stage: 'District Verification Officer Scrutiny', completed: false },
      { stage: 'Final DVET Clearance', completed: false }
    ]
  }
];

export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'notif-01',
    title: 'Automobile Engineering curriculum review recommended',
    message: 'AI engine detected 72% EV keyword frequency in local job postings. Review suggested 120-hr modular upgrade.',
    timestamp: '15 mins ago',
    category: 'AI Intelligence',
    isRead: false,
    priority: 'critical',
    linkTarget: '/training-centres/curriculum'
  },
  {
    id: 'notif-02',
    title: 'New government notice published by DVET Maharashtra',
    message: 'Annual training centre data verification window open. Submission deadline: 30 Sep 2026.',
    timestamp: '2 hours ago',
    category: 'Government',
    isRead: false,
    priority: 'critical',
    linkTarget: '/training-centres/notices'
  },
  {
    id: 'notif-03',
    title: 'Trainer certification deadline approaching',
    message: 'Instructors Rajesh Kumar and Priya Sharma need enrollment confirmation for the upcoming October ARAI batch.',
    timestamp: 'Yesterday',
    category: 'Trainer',
    isRead: false,
    priority: 'warning',
    linkTarget: '/training-centres/trainers'
  },
  {
    id: 'notif-04',
    title: 'New industry demand signal detected in Nashik cluster',
    message: 'Mahindra & Mahindra expands EV battery assembly unit; +240 apprenticeship requisitions expected.',
    timestamp: '2 days ago',
    category: 'Industry',
    isRead: false,
    priority: 'info',
    linkTarget: '/training-centres/market-intelligence'
  },
  {
    id: 'notif-05',
    title: 'Equipment subsidy request moved to Technical Evaluation',
    message: 'Application REQ-EQ-NSK-2026-091 has passed initial administrative screening.',
    timestamp: '3 days ago',
    category: 'Equipment',
    isRead: false,
    priority: 'info',
    linkTarget: '/training-centres/requests'
  }
];

export const INDUSTRY_UPDATES: IndustryUpdateItem[] = [
  {
    id: 'ind-01',
    sector: 'Automotive & Electric Mobility',
    trendTitle: 'EV Manufacturing & Battery Pack Assembly Expansion',
    headline: 'Tata Motors & Mahindra scale clean mobility assembly in Pune-Nashik industrial corridor.',
    skillImpact: 'High surge in demand for Battery Testing Technicians, High-Voltage Wiremen, and PMSM Motor Assemblers (+38% YoY).',
    recommendedAction: 'Incorporate 120-hr EV diagnostic module into existing Mechanic Motor Vehicle trade curriculum.',
    date: '10 Sep 2026',
    clusterLocation: 'Nashik MIDC (Ambad & Satpur) / Chakan'
  },
  {
    id: 'ind-02',
    sector: 'Renewable Energy & Solar',
    trendTitle: 'Residential & Agricultural Solar Grid Interfacing',
    headline: 'PM Surya Ghar & Solar Ag-feeder schemes unlock 3,200 installation contracts in North Maharashtra.',
    skillImpact: 'Strong requirement for certified Suryamitra technicians with micro-inverter and net-metering literacy.',
    recommendedAction: 'Expand Solar PV Technician batch size by 25 seats for upcoming admission intake.',
    date: '04 Sep 2026',
    clusterLocation: 'Nashik, Dindori & Malegaon'
  },
  {
    id: 'ind-03',
    sector: 'Precision Engineering & Tooling',
    trendTitle: 'Shift to Multi-Axis CNC & Automated Fixture Fabrication',
    headline: 'Export engineering suppliers mandate automated CNC and pneumatics knowledge for apprentices.',
    skillImpact: 'Firms are rejecting manual-only fitters; average placement salaries for CNC-literate trades are 35% higher.',
    recommendedAction: 'Implement pneumatic simulator kit and integrate Fanuc G-code programming exercises into final year.',
    date: '28 Aug 2026',
    clusterLocation: 'Sinnar Industrial Zone'
  }
];

export const DEMAND_VS_SUPPLY_DATA = [
  { trade: 'EV Technician', projectedJobs: 60000, currentCapacity: 40000, gapOrSurplus: -20000, type: 'DEFICIT' },
  { trade: 'Solar PV Tech', projectedJobs: 35000, currentCapacity: 22000, gapOrSurplus: -13000, type: 'DEFICIT' },
  { trade: 'Automation / PLC', projectedJobs: 28000, currentCapacity: 16000, gapOrSurplus: -12000, type: 'DEFICIT' },
  { trade: 'Electrician', projectedJobs: 48000, currentCapacity: 45000, gapOrSurplus: -3000, type: 'BALANCED' },
  { trade: 'Fitter', projectedJobs: 25000, currentCapacity: 42000, gapOrSurplus: +17000, type: 'OVERSUPPLIED' },
  { trade: 'Draughtsman (2D)', projectedJobs: 8000, currentCapacity: 19000, gapOrSurplus: +11000, type: 'OVERSUPPLIED' }
];

export const TOP_GROWING_SKILLS = [
  { name: 'EV Diagnostics & CAN-Bus Scanning', growth: '+38%', sector: 'Automotive' },
  { name: 'Lithium-Ion Battery Management Systems (BMS)', growth: '+34%', sector: 'Clean Tech' },
  { name: 'Industrial Automation & PLC Interfacing', growth: '+29%', sector: 'Manufacturing' },
  { name: 'Solar Rooftop Grid-Tied Inverters', growth: '+26%', sector: 'Renewables' },
  { name: 'Data Centre Electrical Infrastructure & UPS', growth: '+24%', sector: 'Digital Infrastructure' }
];

export const DECLINING_SKILLS = [
  { name: 'Legacy ICE Carburettor Overhaul & Tuning', decline: '-28%', risk: 'HIGH' },
  { name: 'Manual 2D Drawing Board Drafting', decline: '-32%', risk: 'HIGH' },
  { name: 'Mechanical Diesel Rotary Fuel Pump Servicing', decline: '-18%', risk: 'MEDIUM' },
  { name: 'Basic Manual Hand Filing & Scribing Only', decline: '-15%', risk: 'MEDIUM' }
];

export const HUMAN_VALIDATION_WORKFLOW: HumanValidationReview = {
  courseId: 'course-mmv-01',
  courseName: 'Automobile Engineering (Mechanic Motor Vehicle)',
  currentStage: 'Training Centre Review',
  progressIndex: 1,
  aiDraftedDate: '02 Sep 2026',
  reviewedByCentre: false,
  reviewedByEmployer: false,
  statusText: 'Under Review',
  reviewNotes: [
    '02 Sep 2026: Kaushal Setu AI engine drafted 120-hour modular EV syllabus annexure based on 72% regional automotive job posting signals.',
    '04 Sep 2026: Head of Automobile Department initiated internal faculty review with instructor Rajesh Kumar.',
    'Pending: Employer Advisory Council sign-off (Tata Motors / Mahindra vendor committee) and DVET Academic Board final ratification.'
  ]
};
