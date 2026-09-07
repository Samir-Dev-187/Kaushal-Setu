import {
  CandidateProfile,
  CourseItem,
  OutlookSector,
  LeaderboardEntry,
  SkillPassportItem,
  JobMatchItem,
  StreakHistoryDay,
  CandidateNotification,
  AchievementBadge
} from '../types/candidate';

// TODO: replace with API call to /api/institutes/search
export const MOCK_INSTITUTES: string[] = [
  'COEP Technological University, Pune (Engineering & Automation)',
  'Veermata Jijabai Technological Institute (VJTI), Mumbai',
  'Government College of Engineering, Chhatrapati Sambhajinagar',
  'Government Medical & Allied Health Sciences Academy, Pune',
  'Maharashtra State Skill University (MSSU), Mumbai',
  'Government ITI, Satpur (Nashik)',
  'Government ITI, Aundh (Pune)',
  'Government ITI, Railway Station Rd (Chhatrapati Sambhajinagar)',
  'Government ITI, Shraddhanand Peth (Nagpur)',
  'Government ITI, Wagle Estate (Thane)',
  'Government ITI, Shiroli (Kolhapur)',
  'Government ITI, Akkalkot Rd (Solapur)',
  'Government ITI, Amravati',
  'Government ITI, Nanded',
  'Government ITI, Miraj (Sangli)',
  'Government ITI, Ratnagiri (Konkan)',
  'Government ITI, Latur',
  'Government Polytechnic, Pune',
  'Government Polytechnic, Nashik',
  'Government Polytechnic, Chhatrapati Sambhajinagar',
  'Government Polytechnic, Nagpur',
  'Don Bosco ITI, Kurla (Mumbai)',
  'Tata STRIVE Skill Development Centre, Pune',
  'K. K. Wagh Polytechnic & Engineering Institute, Nashik',
  'Marathwada Auto Cluster Skill Centre, Waluj',
  'Mahindra Skill Academy, Chakan (Pune)'
];

// TODO: replace with API call to /api/candidates/profile/default
export const DEFAULT_CANDIDATE_PROFILE: CandidateProfile = {
  id: 'cand_9042',
  name: 'Samir Shaw',
  displayName: 'Samir S.',
  isAnonymous: false,
  email: 'samir.shaw@example.in',
  phone: '+91 98230 45891',
  aim: 'job-urgent',
  highestQualification: '12th',
  instituteName: 'Government ITI, Satpur (Nashik)',
  tradeOrField: 'Automobile & EV / Data Engineering',
  currentStatus: 'studying',
  workExperienceYears: 0,
  sectorsOfInterest: ['Data Engineering & Cloud', 'Automobile & EV', 'Solar & Renewable Energy'],
  district: 'Nashik',
  liteMode: false,
  language: 'en',
  onboardingCompleted: true,
  savedCourseIds: ['c-data-eng', 'c-ev-powertrain'],
  points: 540,
  rank: 47,
  pointsToNextRank: 120,
  domainAssessment: {
    domainName: 'Automobile, EV & Data Telemetry Systems',
    assessedScore: 68,
    overallLevel: 'Practitioner',
    industryMatchPercent: 74,
    lastAssessedDate: '2026-09-05',
    skills: [
      {
        skillName: 'EV Battery Management System (BMS) Telemetry',
        candidateLevel: 3,
        industryDemandedLevel: 5,
        gap: 2,
        districtDeficitPercent: 78,
        recommendedAction: 'Complete Virtual Lab Sandbox Module #04: BMS Contactor Isolation'
      },
      {
        skillName: 'PLC & Industrial CAN-Bus Data Logging',
        candidateLevel: 2,
        industryDemandedLevel: 4,
        gap: 2,
        districtDeficitPercent: 64,
        recommendedAction: 'Enroll in 2-Week Micro-Certification: CAN Protocol Diagnostics'
      },
      {
        skillName: 'Python Sensor Pipeline & Data Parsing',
        candidateLevel: 4,
        industryDemandedLevel: 4,
        gap: 0,
        districtDeficitPercent: 42,
        recommendedAction: 'Proficiency matched! Verified for NAPS Industrial Apprenticeships.'
      },
      {
        skillName: 'Precision CNC Tooling Calibration',
        candidateLevel: 2,
        industryDemandedLevel: 4,
        gap: 2,
        districtDeficitPercent: 71,
        recommendedAction: 'Take 3D G-Code Virtual Simulation Practice in Kaushal Setu Sandbox'
      }
    ]
  }
};

// TODO: replace with API call to /api/stats/local-outlook?district={district}&sectors={sectors}
export const MOCK_LOCAL_STATS = {
  evPlacementRate: 86,
  decliningFitterRate: 36,
  districtDemandGap: 14200,
  districtName: 'Nashik & Western Maharashtra Industrial Belt'
};

// TODO: replace with API call to /api/sectors/market-outlook
export const MOCK_OUTLOOK_SECTORS: OutlookSector[] = [
  {
    id: 'sec-data-engineering',
    name: 'Data Engineering & Cloud Data Pipeline Operations',
    marathiName: 'डेटा इंजिनिअरिंग व क्लाऊड डेटा पाईपलाईन ऑपरेशन्स',
    type: 'rising',
    reason: 'Hinjawadi & Magarpatta tech parks along with MIDC industrial IoT clusters created over 12,500 data pipeline technician openings.',
    marathiReason: 'हिंजवडी, मगरपट्टा व एमआयडीसी आयओटी पार्कमध्ये १२,५०० पेक्षा जास्त डेटा तंत्रज्ञांची गरज निर्माण झाली आहे.',
    trendIndicator: '+54% Hiring Surge',
    hiringDelta: '+54%',
    relevantTags: ['Data Engineering & Cloud', 'IT/ITeS']
  },
  {
    id: 'sec-ai-ops',
    name: 'Artificial Intelligence Operations & Vision Data Annotation',
    marathiName: 'एआय ऑपरेशन्स व व्हिजन डेटा अ‍ॅनोटेशन',
    type: 'rising',
    reason: 'Automated factory inspection and computer vision deployment created massive demand for AI dataset labelers & edge-node operators.',
    marathiReason: 'ऑटोमेटेड कारखाने व संगणक दृष्टी प्रणालीसाठी एआय ऑपरेटर व डेटा अ‍ॅनोटेटरची मोठी भरती सुरू आहे.',
    trendIndicator: '+48% Hiring Increase',
    hiringDelta: '+48%',
    relevantTags: ['AI Operations & Automation', 'IT/ITeS']
  },
  {
    id: 'sec-drone',
    name: 'DGCA Drone Pilot & Agricultural Robotics Maintenance',
    marathiName: 'डीजीसीए ड्रोन पायलट व कृषी रोबोटिक्स तंत्रज्ञ',
    type: 'rising',
    reason: 'Maharashtra Krishi Vikas Yojana mandate for drone spraying & land surveys generated 6,200 DGCA-certified drone technician roles.',
    marathiReason: 'ड्रोनद्वारे औषध फवारणी व जमीन मोजणीसाठी ६,२०० डीजीसीए-प्रमाणित तंत्रज्ञांची तातडीने निवड सुरू आहे.',
    trendIndicator: '+41% Hiring Increase',
    hiringDelta: '+41%',
    relevantTags: ['Drone & Spatial Tech', 'Healthcare']
  },
  {
    id: 'sec-semiconductor',
    name: 'OSAT Semiconductor Packaging & Micro-Electronics Assembly',
    marathiName: 'सेमीकंडक्टर पॅकेजिंग व मायक्रो-इलेक्ट्रॉनिक्स असेंब्ली',
    type: 'rising',
    reason: 'New Navi Mumbai & Talegaon electronics manufacturing clusters established OSAT cleanrooms requiring micro-assembly technicians.',
    marathiReason: 'नवी मुंबई व तळेगाव इलेक्ट्रॉनिक्स क्लस्टरमध्ये सेमीकंडक्टर पॅकेजिंगसाठी विशेष क्लीनरूम तंत्रज्ञांची तातडीची गरज.',
    trendIndicator: '+36% Hiring Increase',
    hiringDelta: '+36%',
    relevantTags: ['Semiconductor & Electronics', 'Electronics']
  },
  {
    id: 'sec-ev',
    name: 'Electric Vehicle Powertrain & Battery Packs',
    marathiName: 'इलेक्ट्रिक वाहन पॉवरट्रेन व बॅटरी पॅक',
    type: 'rising',
    reason: 'Chakan & Ambad auto clusters transitioned 60% of tier-1 component contracts to electric sub-assemblies.',
    marathiReason: 'चाकण व अंबड औद्योगिक पट्ट्यात ६०% पेक्षा जास्त उत्पादन ईव्ही घटकांकडे वळवले आहे.',
    trendIndicator: '+42% Hiring Increase',
    hiringDelta: '+42%',
    relevantTags: ['Automobile & EV', 'Electrical']
  },
  {
    id: 'sec-solar',
    name: 'Rooftop Solar & Micro-Grid Installation',
    marathiName: 'रूफटॉप सोलर व मायक्रोग्रिड इन्स्टॉलेशन',
    type: 'rising',
    reason: 'PM-Surya Ghar Scheme backed by MSEDCL created 8,400 certified solar wireman requirements across rural & peri-urban talukas.',
    marathiReason: 'पीएम सूर्यघर योजनेमुळे महावितरण अंतर्गत ८,४०० प्रमाणित सोलर वायरमनची तातडीची गरज निर्माण झाली आहे.',
    trendIndicator: '+38% Hiring Increase',
    hiringDelta: '+38%',
    relevantTags: ['Solar & Renewable Energy', 'Electrical']
  },
  {
    id: 'sec-cnc-robotics',
    name: 'Industrial Robotic Welder & CNC Multi-Axis',
    marathiName: 'औद्योगिक रोबोटिक वेल्डर व सीएनसी मशीनिंग',
    type: 'rising',
    reason: 'Heavy fabrication units in Waluj & Bhosari mandated robotic cell technicians to comply with ISO export tolerances.',
    marathiReason: 'वाळूज व भोसरी येथील हेवी फॅब्रिकेशन युनिट्समध्ये रोबोटिक ऑपरेटरची थेट भरती सुरू आहे.',
    trendIndicator: '+29% Hiring Increase',
    hiringDelta: '+29%',
    relevantTags: ['Automobile & EV', 'Electronics']
  },
  {
    id: 'sec-carburettor',
    name: 'Manual Carburettor & ICE Diesel Fuel Injector Tuning',
    marathiName: 'पारंपरिक कार्बोरेटर व डिझेल मेकॅनिक ट्यूनिंग',
    type: 'declining',
    reason: 'Bharat Stage VI phase-out replaced mechanical carburettors with electronic ECUs; independent garage business down 54%.',
    marathiReason: 'बीएस-६ नियमांमुळे मेकॅनिकल कार्बोरेटर पूर्णपणे बंद झाले असून आता ईसीयू डायग्नोस्टिक्स अनिवार्य आहे.',
    trendIndicator: '-48% Intake Decline',
    hiringDelta: '-48%',
    relevantTags: ['Automobile & EV']
  },
  {
    id: 'sec-bench-fitting',
    name: 'Manual Bench Fitting & Hand Chipping',
    marathiName: 'पारंपरिक बेंच फिटिंग व हॅन्ड फायलिंग',
    type: 'declining',
    reason: 'Automated fibre laser-cutting & CNC milling rendered manual hacksawing and filing benches redundant in tier-1 workshops.',
    marathiReason: 'फायबर लेझर कटिंगमुळे हाताने फाईल आणि कटिंग करण्याचे काम कारखान्यांतून जवळजवळ संपले आहे.',
    trendIndicator: '-39% Intake Decline',
    hiringDelta: '-39%',
    relevantTags: ['Construction', 'Automobile & EV']
  },
  {
    id: 'sec-manual-drafting',
    name: 'Manual Paper Drafting & Tracing',
    marathiName: 'मॅन्युअल पेपर ड्रॉइंग व ट्रेसिंग',
    type: 'declining',
    reason: '100% of MIDC architectural and tooling consultancies mandate 3D SolidWorks or BIM; manual drafters have negligible placement.',
    marathiReason: 'सर्व डिझाईन कार्यालयांमध्ये ३डी सॉलिडवर्क्स अनिवार्य असल्याने हाताने ड्रॉइंग काढणाऱ्यांना काम उरलेले नाही.',
    trendIndicator: '-72% Intake Decline',
    hiringDelta: '-72%',
    relevantTags: ['Construction', 'IT/ITeS']
  }
];

// TODO: replace with API call to /api/courses/recommended?district={district}&aim={aim}&status={status}
export const MOCK_COURSES: CourseItem[] = [
  {
    id: 'c-embedded-robotics-eng',
    name: 'Embedded Systems & Industrial Robotics Hardware Engineer',
    marathiName: 'इम्बेडेड सिस्टीम्स व इंडस्ट्रियल रोबोटिक्स हार्डवेअर अभियंता',
    district: 'Pune',
    institute: 'COEP Technological University, Pune (Engineering & Automation)',
    duration: '1 Year (Advanced Post-Diploma / Degree Industry Co-Design)',
    sector: 'AI Operations & Automation',
    status: 'High demand',
    placementRate: 96,
    avgStartingSalary: '₹42,000/month',
    personalizationBadge: 'Degree / B.Tech Engineering Specialization',
    virtualLabAvailable: true,
    virtualLabTitle: 'ROS2 Kinematics & 6-Axis Industrial Robotic Arm Virtual Lab',
    virtualLabUrl: 'https://vlab.coep.ac.in/robotics-simulation',
    description: 'Design ARM Cortex microcontrollers, RTOS firmware for KUKA & ABB 6-axis industrial robots, and ROS2 autonomous navigation systems for smart manufacturing.',
    marathiDescription: 'एआरएम मायक्रोकंट्रोलर्स, रोबोटिक्स फर्मवेअर (आरटीओएस) आणि ऑटोमेशन इंजिनिअरिंगचे उच्च तंत्रज्ञान काम.',
    curriculumHighlights: [
      'RTOS C/C++ Firmware & CAN-Bus Probing',
      'ROS2 Industrial Robot Kinematics & SLAM',
      'PCB Layout & EMI/EMC Testing Standards',
      'PLC to Edge-AI Gateway Integration'
    ],
    eligibility: 'B.E / B.Tech (Electronics/Mech/CS) or Poly Diploma',
    seatsTotal: 40,
    seatsAvailable: 5
  },
  {
    id: 'c-biomedical-eng',
    name: 'Biomedical Equipment & Hospital Telemetry Specialist',
    marathiName: 'बायोमेडिकल उपकरणे व हॉस्पिटल टेलिमेट्री तज्ज्ञ',
    district: 'Pune',
    institute: 'Government Medical & Allied Health Sciences Academy, Pune',
    duration: '1 Year (Specialty Med-Tech Fellowship)',
    sector: 'Healthcare',
    status: 'High demand',
    placementRate: 94,
    avgStartingSalary: '₹35,000/month',
    personalizationBadge: 'Medical / Healthcare & Bio-Tech Specialization',
    virtualLabAvailable: true,
    virtualLabTitle: 'ICU Ventilator Pneumatics & Patient Telemetry Virtual Simulator',
    virtualLabUrl: 'https://vlab.medtech.gov.in/icu-ventilator-sim',
    description: 'Calibrate ICU ventilators, MRI/CT Scanners, dialysis units, and DICOM PACS hospital telemetry networks for tier-1 medical centers.',
    marathiDescription: 'आयसीयू व्हेंटिलेटर, एमआरआय/सीटी स्कॅनर आणि वैद्यकीय उपकरणांची अचूक कॅलिब्रेशन व देखभाल.',
    curriculumHighlights: [
      'ISO 13485 Medical Device Safety & Compliance',
      'ICU Ventilators & Anaesthesia Workstation Calibration',
      'DICOM & HL7 Hospital Data Standards',
      'IoT Patient Telemetry Sensor Probing'
    ],
    eligibility: 'Medical Degree / B.Sc Med-Tech / B.E Biomedical',
    seatsTotal: 30,
    seatsAvailable: 4
  },
  {
    id: 'c-data-eng',
    name: 'Data Engineering & Cloud Data Pipeline Operations Technician',
    marathiName: 'डेटा इंजिनिअरिंग व क्लाऊड डेटा पाईपलाईन ऑपरेशन्स तंत्रज्ञ',
    district: 'Pune',
    institute: 'Government Polytechnic, Pune',
    duration: '1 Year (Advanced Diploma + Industry Apprenticeship)',
    sector: 'Data Engineering & Cloud',
    status: 'High demand',
    placementRate: 93,
    avgStartingSalary: '₹32,000/month',
    personalizationBadge: 'Top Salary & 93% Tech Placement',
    virtualLabAvailable: true,
    virtualLabTitle: 'SQL Data Warehouse & Apache Airflow ETL Pipeline Sandbox',
    virtualLabUrl: 'https://vlab.gppune.ac.in/data-pipeline-sandbox',
    description: 'Master SQL data warehousing, Python ETL pipelines, Airflow scheduling, Spark big data processing, and cloud database administration for enterprise telemetry.',
    marathiDescription: 'एसक्यूएल डेटा वेअरहाऊस डिझाईन, पायथन ईटीएल पाईपलाईन, एअरफ्लो आणि क्लाऊड डेटाबेसचे प्रगत कारखान्यातील काम.',
    curriculumHighlights: [
      'Relational & NoSQL Database Schema Design',
      'Python Data Pipelines & Apache Airflow DAGs',
      'Cloud Data Warehousing (AWS Redshift & Snowflake)',
      'Real-Time Industrial IoT Data Streaming'
    ],
    eligibility: '12th Pass (Math/Science) or Diploma / Graduate',
    seatsTotal: 60,
    seatsAvailable: 7
  },
  {
    id: 'c-ai-ops',
    name: 'AI Operations & Computer Vision Data Specialist',
    marathiName: 'एआय ऑपरेशन्स व कॉम्प्युटर व्हिजन डेटा स्पेशालिस्ट',
    district: 'Thane',
    institute: 'Government ITI, Wagle Estate, Thane',
    duration: '6 Months (Fast-Track AI Certification)',
    sector: 'AI Operations & Automation',
    status: 'High demand',
    placementRate: 90,
    avgStartingSalary: '₹28,500/month',
    personalizationBadge: 'Emerging High-Growth AI Domain',
    description: 'Learn dataset annotation, bounding box labeling for YOLO models, edge-AI deployment on Raspberry Pi & NVIDIA Jetson, and quality control vision inspection.',
    marathiDescription: 'ऑटोमेटेड कारखान्यांसाठी एआय व्हिजन डेटा अ‍ॅनोटेशन, अ‍ॅज-एआय मॉडेल्स आणि कॉम्प्युटर व्हिजन क्वॉलिटी इन्स्पेक्शन.',
    curriculumHighlights: [
      'Computer Vision Dataset Labeling & Bounding Boxes',
      'YOLO & OpenCV Edge-AI Model Testing',
      'Industrial Defect Detection Camera Setup',
      'Generative AI Prompt Engineering for Enterprise'
    ],
    eligibility: '10th / 12th Pass with basic computer literacy',
    seatsTotal: 40,
    seatsAvailable: 4
  },
  {
    id: 'c-cloud-cyber',
    name: 'Cloud Infrastructure & Cyber Security SOC Operator',
    marathiName: 'क्लाऊड इन्फ्रास्ट्रक्चर व सायबर सुरक्षा सॉक ऑपरेटर',
    district: 'Nagpur',
    institute: 'Government ITI, Shraddhanand Peth, Nagpur',
    duration: '1 Year (NCVT Certified Cyber Operator)',
    sector: 'Data Engineering & Cloud',
    status: 'High demand',
    placementRate: 89,
    avgStartingSalary: '₹27,000/month',
    personalizationBadge: 'National Cyber Security Partner',
    description: 'Hands-on system administration, Linux shell scripting, AWS/Azure server management, and Security Operations Centre (SOC) monitoring.',
    marathiDescription: 'लिनक्स सिस्टीम अ‍ॅडमिनिस्ट्रेशन, एडब्ल्यूएस क्लाऊड सर्वर आणि सायबर सुरक्षा सॉक मॉनिटरिंगचे प्रात्यक्षिक.',
    curriculumHighlights: [
      'Linux Administration & Bash Scripting',
      'AWS / Azure Cloud IAM & Network Security',
      'SIEM Log Analysis & Incident Response',
      'Zero Trust Network Access Setup'
    ],
    eligibility: '12th Pass or ITI Electronics/COPA',
    seatsTotal: 50,
    seatsAvailable: 6
  },
  {
    id: 'c-drone-agri',
    name: 'DGCA Certified Drone Pilot & Agri-Robotics Maintenance',
    marathiName: 'डीजीसीए प्रमाणित ड्रोन पायलट व कृषी रोबोटिक्स तंत्रज्ञ',
    district: 'Chhatrapati Sambhajinagar',
    institute: 'Marathwada Auto Cluster Skill Centre, Waluj',
    duration: '6 Months (DGCA Dual Certification)',
    sector: 'Drone & Spatial Tech',
    status: 'High demand',
    placementRate: 87,
    avgStartingSalary: '₹25,000/month',
    personalizationBadge: 'DGCA Approved Remote Pilot License',
    description: 'Fly agricultural & survey drones, execute multispectral land mapping, repair Li-Po batteries and BLDC motors, and operate autonomous spray rigs.',
    marathiDescription: 'ड्रोन उडवण्याचे परवानाधारक प्रशिक्षण, शेती औषध फवारणी, जमीन मोजणी आणि बॅटरी-मोटर दुरुस्ती.',
    curriculumHighlights: [
      'DGCA Remote Pilot License (RPL) Simulator & Flight Test',
      'Multispectral Crop Health & Topographic Mapping',
      'BLDC Motor Swapping & ESC Calibration',
      'Autonomous Flight Mission Planning (QGroundControl)'
    ],
    eligibility: '10th Pass with 18+ age',
    seatsTotal: 30,
    seatsAvailable: 3
  },
  {
    id: 'c-semicon-packaging',
    name: 'OSAT Semiconductor Packaging & Cleanroom Technician',
    marathiName: 'सेमीकंडक्टर पॅकेजिंग व क्लीनरूम ओसॅट तंत्रज्ञ',
    district: 'Pune',
    institute: 'Tata STRIVE Skill Development Centre, Pune',
    duration: '1 Year (Industry-Backed Specialty)',
    sector: 'Semiconductor & Electronics',
    status: 'High demand',
    placementRate: 92,
    avgStartingSalary: '₹30,000/month',
    personalizationBadge: 'Direct Entry to OSAT Cleanrooms',
    description: 'Work in Class 100 ESD cleanrooms, perform wafer dicing inspection, wire bonding quality checks, and SMT surface-mount pick-and-place operation.',
    marathiDescription: 'सेमीकंडक्टर चिप असेंब्ली, मायक्रो वायर बाँडिंग आणि सरफेस माऊंट एसएमटी मशीन्सचे क्लीनरूम प्रशिक्षण.',
    curriculumHighlights: [
      'Class 100 Cleanroom ESD Protocol & Safety Gowning',
      'Wafer Dicing & Substrate Wire Bonding Inspection',
      'Surface Mount Technology (SMT) Line Setup',
      'Automated Optical Inspection (AOI) Diagnostics'
    ],
    eligibility: '12th Science or ITI Electronics / Electrician',
    seatsTotal: 40,
    seatsAvailable: 5
  },
  {
    id: 'c-ev-powertrain',
    name: 'Electric Vehicle Powertrain & Battery Diagnostic Technician',
    marathiName: 'ईव्ही पॉवरट्रेन व बॅटरी डायग्नोस्टिक तंत्रज्ञ',
    district: 'Nashik',
    institute: 'Government ITI, Satpur, Nashik',
    duration: '1 Year (Fast-Track Certificate + On-the-job Training)',
    sector: 'Automobile & EV',
    status: 'High demand',
    placementRate: 88,
    avgStartingSalary: '₹21,500/month',
    personalizationBadge: 'Matches your EV interest & Satpur cluster',
    description: 'Master high-voltage safety interlocks, Lithium Ferro Phosphate (LFP) cell balancing, regenerative braking diagnostics, and CAN bus sensor probing.',
    marathiDescription: 'हाय-व्होल्टेज सुरक्षा, लिथियम बॅटरी सेल बॅलन्सिंग, मोटर कंट्रोलर आणि कॅन-बस डायग्नोस्टिक्सचे संपूर्ण प्रात्यक्षिक प्रशिक्षण.',
    curriculumHighlights: [
      'High Voltage Isolation & NFPA 70E Safety',
      'PMSM & BLDC Traction Motor Overhaul',
      'Battery Management System (BMS) Firmware Flash',
      'DC Fast Charging Protocols (CCS-2 & Bharat DC-001)'
    ],
    eligibility: '10th Pass with Science/Math or ITI Electrical/Mechanic',
    seatsTotal: 60,
    seatsAvailable: 8
  },
  {
    id: 'c-solar-pv',
    name: 'Solar PV Grid Integration & Micro-Inverter Specialist',
    marathiName: 'सोलर पीव्ही ग्रिड इंटिग्रेशन व इन्व्हर्टर स्पेशालिस्ट',
    district: 'Nashik',
    institute: 'K. K. Wagh Polytechnic, Nashik',
    duration: '6 Months (Intensive Vocational)',
    sector: 'Solar & Renewable Energy',
    status: 'High demand',
    placementRate: 84,
    avgStartingSalary: '₹18,500/month',
    personalizationBadge: 'Matches Solar interest • PM-Surya Ghar Partner',
    description: 'Learn solar array string sizing, rooftop mounting structural stability, hybrid net-metering synchronization, and SCADA monitoring.',
    marathiDescription: 'सोलर पॅनेल स्ट्रिंग डिझाईन, रूफटॉप माउंटिंग, नेट-मीटरिंग ग्रिड सिंक्रोनायझेशन आणि स्काडा मॉनिटरिंग.',
    curriculumHighlights: [
      'Single & Three-Phase Net Metering Setup',
      'Inverter MPPT Troubleshooting',
      'Earthing & Lightning Arrester Installation',
      'MSEDCL Solar Rooftop Portal Compliance'
    ],
    eligibility: '10th / 12th Pass or Electrician Wireman diploma',
    seatsTotal: 40,
    seatsAvailable: 5
  },
  {
    id: 'c-iiot-electrician',
    name: 'Industrial Automation Electrician (PLC & Sensors)',
    marathiName: 'इंडस्ट्रियल ऑटोमेशन इलेक्ट्रिशियन (पीएलसी व सेन्सर्स)',
    district: 'Pune',
    institute: 'Government ITI, Aundh, Pune',
    duration: '2 Years (NCVT Affiliated Diploma)',
    sector: 'Electrical',
    status: 'High demand',
    placementRate: 91,
    avgStartingSalary: '₹24,000/month',
    personalizationBadge: 'Top Placement in Chakan-Talegaon',
    description: 'Hands-on programming of Siemens & Allen Bradley PLCs, pneumatic solenoid valves, optical proximity sensors, and variable frequency drives (VFDs).',
    marathiDescription: 'सिमेन्स पीएलसी प्रोग्रामिंग, न्युमॅटिक व्हॉल्व्ह्ज, ऑप्टिकल सेन्सर्स आणि व्हीएफडी ड्राइव्हचे प्रगत कारखान्यातील काम.',
    curriculumHighlights: [
      'Ladder Logic & Functional Block Programming',
      'Industrial Variable Frequency Drives (VFD)',
      'Smart Sensor Wiring (PNP/NPN 24V DC)',
      'Preventive Maintenance on Production Lines'
    ],
    eligibility: '10th Pass with Math and Science',
    seatsTotal: 80,
    seatsAvailable: 12
  },
  {
    id: 'c-cnc-machining',
    name: 'Precision CNC Machining & Multi-Axis Milling',
    marathiName: 'प्रिसिजन सीएनसी मशिनिंग व मल्टि-अ‍ॅक्सिस मिलिंग',
    district: 'Chhatrapati Sambhajinagar',
    institute: 'Marathwada Auto Cluster Skill Centre, Waluj',
    duration: '1 Year (Dual Training System)',
    sector: 'Automobile & EV',
    status: 'Current',
    placementRate: 79,
    avgStartingSalary: '₹19,000/month',
    personalizationBadge: 'Direct Factory Apprenticeship',
    description: 'Operate Fanuc and Siemens controlled CNC lathes and vertical machining centres (VMC) producing transmission gears and aluminum battery casings.',
    marathiDescription: 'फॅनूक व सिमेन्स कंट्रोल सीएनसी लेथ आणि व्हीएमसी मशीनिंग ऑपरेशन्सचे प्रत्यक्ष काम.',
    curriculumHighlights: [
      'G-Code & M-Code Programming',
      'Micrometer & Coordinate Measuring Machine (CMM) Inspection',
      'Tool Wear Offset Compensation',
      'Cycle Time Optimization in Batch Production'
    ],
    eligibility: '10th Pass or Fitter/Turner ITI',
    seatsTotal: 50,
    seatsAvailable: 14
  },
  {
    id: 'c-ice-mechanic',
    name: 'Conventional ICE Engine Mechanic (Motor Mechanic Vehicle - MMV)',
    marathiName: 'पारंपरिक अंतर्गत ज्वलन इंजिन मेकॅनिक (एमएमव्ही)',
    district: 'Nashik',
    institute: 'Private ITI Ambad, Nashik',
    duration: '2 Years (Standard Legacy Syllabus)',
    sector: 'Automobile & EV',
    status: 'Obsolete',
    placementRate: 36,
    avgStartingSalary: '₹9,500/month',
    personalizationBadge: '⚠️ Critical Syllabus Obsolescence Alert',
    isFlagged: true,
    description: 'Focuses heavily on carburettor cleaning, distributor timing points, mechanical fuel pump rebuilds, and manual pushrod tappet adjustments.',
    marathiDescription: 'पारंपरिक मेकॅनिकल कार्बोरेटर आणि जुन्या डिझेल पंपांवर आधारित जुनाट अभ्यासक्रम.',
    curriculumHighlights: [
      '4-Stroke Carburettor Disassembly',
      'Mechanical Fuel Injection Pump Timing',
      'Drum Brake Lining Riveting'
    ],
    eligibility: '10th Pass',
    seatsTotal: 120,
    seatsAvailable: 78,
    obsolescenceWarning: {
      reason: '72% of recent graduates took longer than 14 months to find a job, with starting wages stagnant below ₹9,500/month. Modern workshops do not repair carburettors.',
      marathiReason: '७२% पदवीधरांना नोकरी मिळण्यासाठी १४ महिन्यांपेक्षा जास्त काळ लागला, आणि वेतन अवघे ₹९,५०० आहे. कारखान्यांत आता कार्बोरेटर दुरुस्ती उरलेली नाही.',
      placementDrop: 'Down from 78% in 2018 to 36% in 2025',
      jobWaitMonths: '14.2 months average job search time',
      startingPayOld: '₹9,500/month',
      alternativeCourseId: 'c-ev-powertrain',
      alternativeCourseName: 'EV Powertrain & Battery Diagnostic Technician',
      marathiAlternativeName: 'ईव्ही पॉवरट्रेन व बॅटरी डायग्नोस्टिक तंत्रज्ञ',
      betterPlacementRate: 88,
      betterAvgStartingSalary: '₹21,500/month',
      modernSkillsAdded: [
        'High-Voltage Safety & Battery Management',
        'CAN-Bus Diagnostics with OBD-II Scanners',
        'Direct 88% Placement in Chakan & Ambad EV Hubs'
      ]
    }
  },
  {
    id: 'c-bench-fitter',
    name: 'General Bench Fitter (Traditional Trade)',
    marathiName: 'जनरल बेंच फिटर (पारंपरिक ट्रेड)',
    district: 'Nashik',
    institute: 'Government ITI, Satpur, Nashik',
    duration: '2 Years (Legacy Heavy Mechanical)',
    sector: 'Automobile & EV',
    status: 'Oversupplied',
    placementRate: 41,
    avgStartingSalary: '₹10,500/month',
    personalizationBadge: '⚠️ Market Oversupply Alert (3.4x surplus)',
    isFlagged: true,
    description: 'Teaches manual filing, hacksawing, and hand tapping. Over 18,000 fitters graduate annually across Maharashtra for fewer than 4,500 manual fitting vacancies.',
    marathiDescription: 'हाताने फाईलिंग आणि कटिंगचे जुने काम; महाराष्ट्रात दरवर्षी १८,००० फिटर बाहेर पडतात पण जागा फक्त ४,५०० आहेत.',
    curriculumHighlights: [
      'Hand Filing to 0.02mm Tolerance',
      'Manual Scraping & Chipping',
      'Simple Drilling Machine Operation'
    ],
    eligibility: '10th Pass',
    seatsTotal: 160,
    seatsAvailable: 95,
    obsolescenceWarning: {
      reason: '3.4 candidates graduate for every single manual fitter job in Maharashtra. Factories use automated laser cutters and require CNC or Robotic operators instead.',
      marathiReason: 'एका नोकरीसाठी ३.४ फिटर पदवीधर बाजारात आहेत. कारखाने आता लेझर कटिंग आणि रोबोटिक वेल्डिंग तंत्रज्ञ शोधत आहेत.',
      placementDrop: 'Placements drop 8% every year as manual lines automate',
      jobWaitMonths: '11.8 months average job search time',
      startingPayOld: '₹10,500/month',
      alternativeCourseId: 'c-cnc-machining',
      alternativeCourseName: 'Precision CNC Machining & Multi-Axis Milling',
      marathiAlternativeName: 'प्रिसिजन सीएनसी मशिनिंग व मल्टि-अ‍ॅक्सिस मिलिंग',
      betterPlacementRate: 79,
      betterAvgStartingSalary: '₹19,000/month',
      modernSkillsAdded: [
        'G-Code Programming & VMC Setup',
        'Zero manual hacksawing; 100% computerized precision',
        'Direct industry demand in Nashik & Waluj MIDC'
      ]
    }
  }
];

// TODO: replace with API call to /api/leaderboard?scope={district|state}&timeframe={week|month|all}
export const MOCK_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    rank: 1,
    name: 'Pooja Kadam',
    avatar: '👩‍🔧',
    district: 'Pune',
    points: 1240,
    assessmentsCompleted: 18,
    verifiedCertificates: 4,
    modulesFinished: 32,
    streakDays: 24
  },
  {
    id: 'lead-2',
    rank: 2,
    name: 'Akash Jadhav',
    avatar: '👨‍🔧',
    district: 'Nashik',
    points: 1120,
    assessmentsCompleted: 15,
    verifiedCertificates: 3,
    modulesFinished: 28,
    streakDays: 19
  },
  {
    id: 'lead-3',
    rank: 3,
    name: 'Sneha More',
    avatar: '👩‍💻',
    district: 'Chhatrapati Sambhajinagar',
    points: 980,
    assessmentsCompleted: 14,
    verifiedCertificates: 3,
    modulesFinished: 24,
    streakDays: 16
  },
  {
    id: 'lead-4',
    rank: 4,
    name: 'Ganesh Shinde',
    avatar: '👨‍🔧',
    district: 'Kolhapur',
    points: 890,
    assessmentsCompleted: 12,
    verifiedCertificates: 2,
    modulesFinished: 22,
    streakDays: 14
  },
  {
    id: 'lead-5',
    rank: 5,
    name: 'Nikhil Patil',
    avatar: '👨‍🔧',
    district: 'Nashik',
    points: 820,
    assessmentsCompleted: 11,
    verifiedCertificates: 2,
    modulesFinished: 19,
    streakDays: 11
  },
  {
    id: 'lead-6',
    rank: 6,
    name: 'Priyanka Salunkhe',
    avatar: '👩‍🔧',
    district: 'Nagpur',
    points: 760,
    assessmentsCompleted: 10,
    verifiedCertificates: 2,
    modulesFinished: 18,
    streakDays: 9
  },
  {
    id: 'lead-cand',
    rank: 47,
    name: 'Samir Shaw (You)',
    avatar: '⭐',
    district: 'Nashik',
    points: 540,
    isCurrentUser: true,
    assessmentsCompleted: 7,
    verifiedCertificates: 1,
    modulesFinished: 12,
    streakDays: 5
  }
];

// TODO: replace with API call to /api/candidates/passport
export const MOCK_SKILL_PASSPORT: SkillPassportItem[] = [
  {
    id: 'pass-1',
    title: 'High-Voltage Safety & NFPA 70E Protocol (Level 2)',
    marathiTitle: 'हाय-व्होल्टेज सुरक्षा व एनएफपीए ७०ई प्रोटोकॉल (स्तर २)',
    issuer: 'National Council for Vocational Education & Training (NCVET)',
    issueDate: '12 Jan 2026',
    verificationId: 'NCVET-MH-2026-EV-99412',
    verified: true,
    skillsAcquired: ['400V Isolation Lockout/Tagout', 'Arc-Flash PPE Class 2', 'Rescue Hook Procedures']
  },
  {
    id: 'pass-2',
    title: 'Lithium-Ion Battery Pack Diagnostics & BMS Testing',
    marathiTitle: 'लिथियम-आयन बॅटरी पॅक व बीएमएस चाचणी',
    issuer: 'Directorate of Vocational Education & Training, Maharashtra (DVET)',
    issueDate: '28 Feb 2026',
    verificationId: 'DVET-MUM-BAT-88231',
    verified: true,
    skillsAcquired: ['CAN Bus Analyser', 'Cell Balancing Delta V', 'Thermal Runaway Detection']
  },
  {
    id: 'pass-3',
    title: 'Secondary School Certificate (Class 10 - 78.4%)',
    marathiTitle: 'माध्यमिक शाळा प्रमाणपत्र (१०वी - ७८.४%)',
    issuer: 'Maharashtra State Board of Secondary and Higher Secondary Education (DigiLocker Verified)',
    issueDate: 'June 2023',
    verificationId: 'DL-MSBSHSE-2023-77192',
    verified: true,
    skillsAcquired: ['Mathematics', 'Physical Sciences', 'Applied Mechanics']
  }
];

// TODO: replace with API call to /api/jobs/matched?district={district}&passportId={id}
export const MOCK_MATCHED_JOBS: JobMatchItem[] = [
  {
    id: 'job-1',
    title: 'NAPS Graduate Apprentice — EV Powertrain Diagnostics',
    marathiTitle: 'NAPS शिकाऊ उमेदवार — ईव्ही पॉवरट्रेन डायग्नोस्टिक्स',
    company: 'Mahindra Electric Mobility Ltd (Ambad MIDC Plant)',
    location: 'Nashik, Maharashtra',
    type: 'NAPS Apprenticeship',
    stipend: '₹16,500/month + Subsidized Canteen & Transport',
    matchScore: 94,
    requiredSkills: ['High Voltage Safety', 'CAN-Bus Diagnostics', 'Lithium Battery Inspection'],
    deadline: '18 Sept 2026',
    openings: 24
  },
  {
    id: 'job-2',
    title: 'Junior Service Engineer — Commercial EV Fleet Support',
    marathiTitle: 'कनिष्ठ सर्व्हिस इंजिनिअर — कमर्शियल ईव्ही फ्लीट सपोर्ट',
    company: 'Tata Motors Electric Mobility (Pune & Nashik Operations)',
    location: 'Pune / Nashik Highway, Maharashtra',
    type: 'Full-time',
    stipend: '₹22,000 – ₹25,500/month + Overtime + ESI/PF',
    matchScore: 89,
    requiredSkills: ['OBD-II Scanning', 'BMS Firmware Flash', 'Traction Motor Servicing'],
    deadline: '22 Sept 2026',
    openings: 12
  },
  {
    id: 'job-3',
    title: 'Solar Grid Commissioning Technician (PM-Surya Ghar)',
    marathiTitle: 'सोलर ग्रिड कमिशनिंग तंत्रज्ञ (पीएम सूर्यघर)',
    company: 'Suzlon Energy / SunPower EPC Ltd',
    location: 'Nashik Rural & Dindori, Maharashtra',
    type: 'Apprenticeship',
    stipend: '₹15,000/month + Travel Allowance (₹3,000)',
    matchScore: 82,
    requiredSkills: ['Single-Phase Net Metering', 'Inverter Wiring', 'Earthing Testing'],
    deadline: '30 Sept 2026',
    openings: 18
  }
];

// Mock 30-day streak history
export const MOCK_STREAK_HISTORY: StreakHistoryDay[] = [
  { date: 'Day -29', dayLabel: '8 Aug', active: true, activityName: 'Checked EV Course' },
  { date: 'Day -28', dayLabel: '9 Aug', active: true, activityName: 'Completed NFPA Safety Quiz' },
  { date: 'Day -27', dayLabel: '10 Aug', active: false },
  { date: 'Day -26', dayLabel: '11 Aug', active: true, activityName: 'Logged in from Satpur' },
  { date: 'Day -25', dayLabel: '12 Aug', active: true, activityName: 'Reviewed Battery Pack Module' },
  { date: 'Day -24', dayLabel: '13 Aug', active: true, activityName: 'Checked Solar Salary' },
  { date: 'Day -23', dayLabel: '14 Aug', active: false },
  { date: 'Day -22', dayLabel: '15 Aug', active: false },
  { date: 'Day -21', dayLabel: '16 Aug', active: true, activityName: 'Verified Certificate' },
  { date: 'Day -20', dayLabel: '17 Aug', active: true, activityName: 'Completed Skill Assessment' },
  { date: 'Day -19', dayLabel: '18 Aug', active: false },
  { date: 'Day -18', dayLabel: '19 Aug', active: false },
  { date: 'Day -17', dayLabel: '20 Aug', active: true, activityName: 'Searched NAPS Jobs' },
  { date: 'Day -16', dayLabel: '21 Aug', active: false },
  { date: 'Day -15', dayLabel: '22 Aug', active: false },
  { date: 'Day -14', dayLabel: '23 Aug', active: true, activityName: 'Lesson on BMS Protocols' },
  { date: 'Day -13', dayLabel: '24 Aug', active: true, activityName: 'Checked Leaderboard' },
  { date: 'Day -12', dayLabel: '25 Aug', active: true, activityName: 'Took CAN-Bus Test' },
  { date: 'Day -11', dayLabel: '26 Aug', active: false },
  { date: 'Day -10', dayLabel: '27 Aug', active: true, activityName: 'Reviewed EV Wiring diagram' },
  { date: 'Day -9', dayLabel: '28 Aug', active: false },
  { date: 'Day -8', dayLabel: '29 Aug', active: false },
  { date: 'Day -7', dayLabel: '30 Aug', active: false },
  { date: 'Day -6', dayLabel: '31 Aug', active: false },
  { date: 'Day -5', dayLabel: '1 Sept', active: true, activityName: 'Logged in from mobile' },
  { date: 'Day -4', dayLabel: '2 Sept', active: true, activityName: 'Completed Cell Balancing Quiz' },
  { date: 'Day -3', dayLabel: '3 Sept', active: true, activityName: 'Applied to Mahindra NAPS' },
  { date: 'Day -2', dayLabel: '4 Sept', active: true, activityName: 'Passed ISO Tooling Test' },
  { date: 'Day -1', dayLabel: '5 Sept', active: true, activityName: 'Saved 2 High-Demand Courses' },
  { date: 'Today', dayLabel: '6 Sept', active: true, activityName: 'Active now on Candidate Portal' }
];

// Mock notifications
export const MOCK_NOTIFICATIONS: CandidateNotification[] = [
  {
    id: 'notif-1',
    title: 'New NAPS Apprenticeship Match in Nashik',
    message: 'Mahindra Electric Mobility posted 24 vacancies matching your High-Voltage Level 2 certificate.',
    date: '2 hours ago',
    read: false,
    type: 'job'
  },
  {
    id: 'notif-2',
    title: 'Course Alert: New EV Lab Inaugurated in Satpur ITI',
    message: 'Satpur Govt. ITI received 4 new simulation rigs for PMSM motors; admissions open for 2026 session.',
    date: 'Yesterday',
    read: false,
    type: 'course'
  },
  {
    id: 'notif-3',
    title: '🔥 5-Day Learning Streak Active!',
    message: 'You have logged learning activity for 5 consecutive days. Complete 1 more module to claim the 7-day badge!',
    date: '2 days ago',
    read: true,
    type: 'streak'
  },
  {
    id: 'notif-4',
    title: 'Career Counselor Free Slot Available',
    message: 'Shri D. B. Shinde (District Skill Officer, Nashik) has 3 free phone consultation slots this Wednesday.',
    date: '3 days ago',
    read: true,
    type: 'counselor'
  }
];

// Mock Achievement Badges
export const MOCK_ACHIEVEMENT_BADGES: AchievementBadge[] = [
  {
    id: 'badge-1',
    title: 'First Step Diagnosed',
    marathiTitle: 'पहिली कौशल्य चाचणी',
    description: 'Completed your first self-assessment diagnostic.',
    unlocked: true,
    iconName: 'Sparkles',
    unlockedAt: '15 Aug 2026'
  },
  {
    id: 'badge-2',
    title: '5-Day Momentum',
    marathiTitle: '५ दिवसांचे सातत्य',
    description: 'Kept learning active for 5 days in a row.',
    unlocked: true,
    iconName: 'Flame',
    unlockedAt: 'Today'
  },
  {
    id: 'badge-3',
    title: 'Verified Passport',
    marathiTitle: 'प्रमाणित पासपोर्ट',
    description: 'Linked your first tamper-proof government credential.',
    unlocked: true,
    iconName: 'ShieldCheck',
    unlockedAt: '28 Feb 2026'
  },
  {
    id: 'badge-4',
    title: 'Truth-Seeker',
    marathiTitle: 'सत्यशोधक',
    description: 'Compared 3 courses to check real job outcomes before enrolling.',
    unlocked: true,
    iconName: 'CheckCheck',
    unlockedAt: '4 Sept 2026'
  },
  {
    id: 'badge-5',
    title: '7-Day Streak Master',
    marathiTitle: '७ दिवसांचा मास्टर',
    description: 'Reach 7 consecutive active days on Kaushal Setu.',
    unlocked: false,
    iconName: 'Trophy'
  },
  {
    id: 'badge-6',
    title: 'DigiLocker Integrated',
    marathiTitle: 'डिजीलॉकर जोडले',
    description: 'Pulled 10th/12th certificate directly from DigiLocker.',
    unlocked: false,
    iconName: 'CloudCheck'
  }
];

// TODO: replace with API call to /api/ai/ask-setu
export const MOCK_ASK_SETU_QA = [
  {
    trigger: 'why is fitter flagged',
    keywords: ['fitter', 'oversupplied', 'flagged', 'why', 'bench'],
    answer:
      "Honest truth: Maharashtra ITIs graduate over 18,000 manual bench fitters every year, but MIDC factories only post ~4,500 fitting vacancies. Most companies have moved to CNC laser cutting and robotic welding. If you love mechanical tooling, take **Precision CNC Machining** instead — starting salaries are ₹19,000/mo instead of ₹10,000/mo and placement rates are 79%."
  },
  {
    trigger: 'ev salary and jobs',
    keywords: ['ev', 'electric vehicle', 'salary', 'stipend', 'jobs', 'pay'],
    answer:
      "EV powertrain technicians in the Chakan (Pune) and Ambad (Nashik) belts currently start at **₹18,000 to ₹24,000/month**, compared to ₹9,500–₹11,000/month for traditional ICE engine mechanics. Tata Motors, Mahindra, and local tier-1 battery pack suppliers are offering direct NAPS apprenticeships with canteen, bus transport, and ESI/PF benefits."
  },
  {
    trigger: 'what is naps stipend',
    keywords: ['naps', 'apprenticeship', 'stipend', 'rules', 'money'],
    answer:
      "Under the National Apprenticeship Promotion Scheme (NAPS), the Government of India directly transfers 25% of the stipend (up to ₹1,500/month) to your bank account via DBT, while the employer pays the remaining amount (typically ₹12,000 to ₹16,500 total). You also get an official National Apprenticeship Certificate (NAC) which is valued over normal work experience."
  },
  {
    trigger: 'how to use digilocker',
    keywords: ['digilocker', 'marksheets', 'certificates', 'import'],
    answer:
      "Click the 'Pull from DigiLocker' button on your Skill Passport. You will authenticate with your Aadhaar OTP on the official DigiLocker portal. Kaushal Setu will read your verified 10th, 12th, or ITI marksheet directly without you having to scan paper copies."
  }
];
