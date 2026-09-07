import { QuestionnaireItem, EmployerSuggestionItem } from '../types/questionnaire';

// ==========================================
// PART A — CANDIDATE ONBOARDING SURVEY (25 Questions)
// ==========================================
export const CANDIDATE_QUESTIONS_BANK: QuestionnaireItem[] = [
  // A1. A Bit About You (Q1–Q5)
  {
    id: 'A1',
    number: 1,
    sectionId: 'A1',
    sectionTitle: 'A Bit About You',
    tag: 'MCQ: Journey Stage',
    conversationalIntro: 'Hey there! Welcome to Kaushal Setu. Let\'s start with where you are right now so we can tailor everything to your exact step.',
    question: 'Where are you right now in your journey — studying, recently graduated, working, between jobs, or thinking about switching things up?',
    answerType: 'mcq',
    options: [
      'Student',
      'Recent Graduate',
      'Working Professional',
      'Unemployed & Job-Seeking',
      'Career Switcher'
    ]
  },
  {
    id: 'A2',
    number: 2,
    sectionId: 'A1',
    sectionTitle: 'A Bit About You',
    tag: 'MCQ: Highest Education',
    conversationalIntro: 'Awesome! Understanding your educational foundation helps us match courses with proper certification levels.',
    question: 'What\'s the highest level of education you\'ve completed so far?',
    answerType: 'mcq',
    options: [
      'Below 10th',
      '10th + 2 (HSC)',
      'Diploma / Polytechnic',
      'Undergraduate (B.E / B.Sc / B.Com / B.A)',
      'Postgraduate (M.Tech / M.Sc / MBA)',
      'ITI / Vocational Trade'
    ]
  },
  {
    id: 'A3',
    number: 3,
    sectionId: 'A1',
    sectionTitle: 'A Bit About You',
    tag: 'Open text / Dropdown of domains',
    conversationalIntro: 'Got it! What was your major subject, trade, or the field you\'ve been active in?',
    question: 'What did you study, or what field have you mostly worked in?',
    answerType: 'dropdown',
    options: [
      'Automobile & Electric Vehicles (EV)',
      'Mechanical & CNC Machining',
      'Electrical & Power Systems',
      'Computer Science & IT / Software',
      'Electronics & Telecommunications',
      'Civil & Construction Engineering',
      'Solar & Renewable Energy',
      'Healthcare & Allied Medical Trades',
      'Commerce, Accounts & BFSI',
      'Other Field'
    ],
    placeholder: 'Select or specify your trade / domain'
  },
  {
    id: 'A4',
    number: 4,
    sectionId: 'A1',
    sectionTitle: 'A Bit About You',
    tag: 'Conditional open text',
    conversationalIntro: 'Since you have professional experience, tell us a bit about your current day-to-day.',
    question: 'Are you working right now? If so, what\'s your role and industry?',
    answerType: 'open_text',
    placeholder: 'e.g., Junior Maintenance Tech in Auto Ancillary, or Freelance Coder',
    // Asked only if candidate is working or switching careers
    condition: (answers) => answers['A1'] === 'Working Professional' || answers['A1'] === 'Career Switcher'
  },
  {
    id: 'A5',
    number: 5,
    sectionId: 'A1',
    sectionTitle: 'A Bit About You',
    tag: 'Dropdown + Yes/No',
    conversationalIntro: 'Location matters! Many high-demand industrial clusters in Maharashtra offer housing & relocation stipends.',
    question: 'Which state or region are you in — and would you be open to relocating for the right opportunity?',
    answerType: 'location_relocation',
    options: [
      'Pune Industrial Belt (Pimpri-Chinchwad / Chakan)',
      'Mumbai Metropolitan Region (MMR)',
      'Nashik Manufacturing Zone',
      'Chhatrapati Sambhajinagar (AURIC)',
      'Nagpur & Vidarbha Region',
      'Kolhapur & Western Maharashtra',
      'Solapur & Marathwada',
      'Other District in Maharashtra',
      'Outside Maharashtra'
    ]
  },

  // A2. Where You Want to Go (Q6–Q10)
  {
    id: 'A6',
    number: 6,
    sectionId: 'A2',
    sectionTitle: 'Where You Want to Go',
    tag: 'MCQ: Platform Objective',
    conversationalIntro: 'Now, let\'s talk ambitions. What is the single biggest milestone you want to achieve here?',
    question: 'What\'s the main reason you\'re here on this platform?',
    answerType: 'mcq',
    options: [
      'Get my first job',
      'Switch careers',
      'Upskill in current job',
      'Prepare for higher studies',
      'Start a business',
      'Just exploring'
    ]
  },
  {
    id: 'A7',
    number: 7,
    sectionId: 'A2',
    sectionTitle: 'Where You Want to Go',
    tag: 'Multi-select: Target Industries',
    conversationalIntro: 'Which sectors spark your interest? Select up to 3 sectors you\'d love to build a career in.',
    question: 'Which industries genuinely excite you as places to build a career?',
    answerType: 'multi_select',
    maxSelections: 3,
    options: [
      'IT / Software',
      'Manufacturing',
      'Healthcare',
      'BFSI (Banking & Finance)',
      'Retail',
      'Agriculture & Agri-Tech',
      'Construction',
      'Logistics & Supply Chain',
      'Creative / Design',
      'EV & Clean Mobility'
    ]
  },
  {
    id: 'A8',
    number: 8,
    sectionId: 'A2',
    sectionTitle: 'Where You Want to Go',
    tag: 'Open text: Target Role',
    conversationalIntro: 'Imagine yourself 1 to 2 years from today. What title would make you proud?',
    question: 'What job role would you love to be doing a year or two from now?',
    answerType: 'open_text',
    placeholder: 'e.g., EV Battery Diagnostic Specialist, Full-Stack Developer, Quality Assurance Lead'
  },
  {
    id: 'A9',
    number: 9,
    sectionId: 'A2',
    sectionTitle: 'Where You Want to Go',
    tag: 'MCQ: 5-Year Vision',
    conversationalIntro: 'Thinking longer term helps us pick foundational skills with lifelong mileage.',
    question: 'Fast-forward five years — where do you picture yourself?',
    answerType: 'mcq',
    options: [
      'Senior technical expert',
      'Manager / Team lead',
      'Entrepreneur / Business Owner',
      'Government job / Public Sector',
      'Not sure yet'
    ]
  },
  {
    id: 'A10',
    number: 10,
    sectionId: 'A2',
    sectionTitle: 'Where You Want to Go',
    tag: 'Rating scale 1–5: Urgency',
    conversationalIntro: 'Honest check: How quickly do you need placement or revenue coming in?',
    question: 'How urgently do you need a job or income right now, on a scale of 1 to 5?',
    answerType: 'rating_scale',
    minRating: 1,
    maxRating: 5,
    ratingLabels: { min: '1 - Exploring / No rush', max: '5 - Immediate / Urgent Need' }
  },

  // A3. Taking Stock of Your Skills (Q11–Q15)
  {
    id: 'A11',
    number: 11,
    sectionId: 'A3',
    sectionTitle: 'Taking Stock of Your Skills',
    tag: 'Multi-select / tag input: Existing Skills',
    conversationalIntro: 'Let\'s take inventory of your toolbox. Pick up to 5 capabilities you already possess.',
    question: 'What are up to 5 skills you already bring to the table — technical or soft skills?',
    answerType: 'multi_select',
    maxSelections: 5,
    options: [
      'Electrical Circuit Wiring',
      'Basic Mechanical Assembly',
      'Python / JavaScript Basics',
      'Troubleshooting & Problem Solving',
      'CAD / Blueprint Reading',
      'Customer Communication',
      'Data Entry & MS Excel',
      'Welding & Fabrication',
      'Teamwork & Coordination',
      'English Verbal Skills',
      'Digital Literacy & Internet Tools'
    ]
  },
  {
    id: 'A12',
    number: 12,
    sectionId: 'A3',
    sectionTitle: 'Taking Stock of Your Skills',
    tag: 'Rating scale 1–5: Strongest Skill Level',
    conversationalIntro: 'How would you rate your confidence in your number-one strongest skill?',
    question: 'How would you honestly rate your ability in your strongest skill area?',
    answerType: 'rating_scale',
    minRating: 1,
    maxRating: 5,
    ratingLabels: { min: '1 - Beginner', max: '5 - Industry Expert' }
  },
  {
    id: 'A13',
    number: 13,
    sectionId: 'A3',
    sectionTitle: 'Taking Stock of Your Skills',
    tag: 'Open text / Select: Certifications',
    conversationalIntro: 'Credentials give recruiters trust in your training background.',
    question: 'Have you earned any certifications? If so, where from — NSDC, Coursera, your college, an ITI, or somewhere else?',
    answerType: 'open_text',
    placeholder: 'e.g., NCVT ITI Certificate (MMV), NSDC Level 4, or None yet'
  },
  {
    id: 'A14',
    number: 14,
    sectionId: 'A3',
    sectionTitle: 'Taking Stock of Your Skills',
    tag: 'Multi-select: Weakest Spots',
    conversationalIntro: 'Everyone has growth edges. Recognizing them is how we fast-track your prep!',
    question: 'Which of these feels like your weakest spot right now?',
    answerType: 'multi_select',
    maxSelections: 3,
    options: [
      'Technical / domain skills',
      'Communication & English fluency',
      'Digital literacy & tech tools',
      'Problem-solving & aptitude tests',
      'Teamwork & workplace culture',
      'Resume & interview confidence'
    ]
  },
  {
    id: 'A15',
    number: 15,
    sectionId: 'A3',
    sectionTitle: 'Taking Stock of Your Skills',
    tag: 'MCQ: Interview History',
    conversationalIntro: 'Have you stepped into an interview room or assessment center yet?',
    question: 'Have you gone through any job interviews or skill tests before? How did that go?',
    answerType: 'mcq',
    options: [
      'Never tried yet',
      'Tried but not selected',
      'Selected but skills mismatch',
      'Selected and currently working'
    ]
  },

  // A4. How You Like to Learn (Q16–Q20)
  {
    id: 'A16',
    number: 16,
    sectionId: 'A4',
    sectionTitle: 'How You Like to Learn',
    tag: 'Multi-select: Platform Features Needed',
    conversationalIntro: 'We want Kaushal Setu to be your ultimate toolkit. What tools would help you most?',
    question: 'What would make this platform genuinely useful for you?',
    answerType: 'multi_select',
    maxSelections: 3,
    options: [
      'Job-ready skill courses',
      '1-on-1 Mentorship from industry seniors',
      'Direct job & apprentice listings',
      'Government verified certification',
      'Mock interviews & skill tests',
      'AI Resume builder & portfolio'
    ]
  },
  {
    id: 'A17',
    number: 17,
    sectionId: 'A4',
    sectionTitle: 'How You Like to Learn',
    tag: 'MCQ: Learning Style',
    conversationalIntro: 'People absorb knowledge in different ways. What sticks best for you?',
    question: 'What\'s your favorite way to actually learn something new?',
    answerType: 'mcq',
    options: [
      'Hands-on projects & lab rigs',
      'Live interactive classes with instructors',
      'Short bite-sized video lectures',
      'In-person / offline workshop training',
      'Reading guides & schematics'
    ]
  },
  {
    id: 'A18',
    number: 18,
    sectionId: 'A4',
    sectionTitle: 'How You Like to Learn',
    tag: 'MCQ: Weekly Time Budget',
    conversationalIntro: 'Real talk on schedules: balancing family, studies, and jobs is hard.',
    question: 'Realistically, how many hours a week can you set aside for learning?',
    answerType: 'mcq',
    options: [
      '< 2 hours / week (Light)',
      '2–5 hours / week (Steady)',
      '5–10 hours / week (Accelerated)',
      '10+ hours / week (Immersive Bootcamp)'
    ]
  },
  {
    id: 'A19',
    number: 19,
    sectionId: 'A4',
    sectionTitle: 'How You Like to Learn',
    tag: 'MCQ: Pricing & Subsidy Stance',
    conversationalIntro: 'Government subsidies cover most approved courses, but advanced badges exist too.',
    question: 'Would you stick to free content, or are you open to paying for premium or certified courses?',
    answerType: 'mcq',
    options: [
      'Free / fully-subsidized only',
      'Willing to pay a small nominal fee (₹200–₹500)',
      'Willing to pay for certification with guaranteed placement support'
    ]
  },
  {
    id: 'A20',
    number: 20,
    sectionId: 'A4',
    sectionTitle: 'How You Like to Learn',
    tag: 'Dropdown: Preferred Language',
    conversationalIntro: 'Language shouldn\'t be a barrier to high-paying engineering or trades.',
    question: 'Which language would you prefer learning content in?',
    answerType: 'dropdown',
    options: [
      'Marathi (मराठी)',
      'Hindi (हिन्दी)',
      'English',
      'Bilingual (Marathi + English)',
      'Bilingual (Hindi + English)'
    ]
  },

  // A5. Roadblocks & Awareness (Q21–Q25)
  {
    id: 'A21',
    number: 21,
    sectionId: 'A5',
    sectionTitle: 'Roadblocks & Awareness',
    tag: 'MCQ: Biggest Obstacle',
    conversationalIntro: 'What\'s been the friction point in your path so far?',
    question: 'What\'s been the single biggest obstacle standing between you and job-ready skills?',
    answerType: 'mcq',
    options: [
      'Lack of guidance & clear roadmaps',
      'Lack of money / high tuition fees',
      'Lack of time due to current obligations',
      'Lack of good local training centers near me',
      'Don\'t know what skills are actually in demand',
      'Language barrier'
    ]
  },
  {
    id: 'A22',
    number: 22,
    sectionId: 'A5',
    sectionTitle: 'Roadblocks & Awareness',
    tag: 'MCQ: Market Awareness',
    conversationalIntro: 'Industry moves fast with EV, AI, and automation.',
    question: 'Do you have a good sense of which skills are in demand in the industry you\'re targeting?',
    answerType: 'mcq',
    options: [
      'Very aware (I follow hiring trends)',
      'Somewhat aware (I know general buzzwords)',
      'Not aware at all (Need honest guidance)'
    ]
  },
  {
    id: 'A23',
    number: 23,
    sectionId: 'A5',
    sectionTitle: 'Roadblocks & Awareness',
    tag: 'Yes/No + which one: Govt Schemes',
    conversationalIntro: 'Maharashtra runs multiple PMKVY, MSSDS, and Apprenticeship subsidies.',
    question: 'Have you ever used a government skilling scheme, like PMKVY or Skill India?',
    answerType: 'yes_no_text',
    placeholder: 'If yes, specify which scheme (e.g., PMKVY, NAPS, MSSDS)'
  },
  {
    id: 'A24',
    number: 24,
    sectionId: 'A5',
    sectionTitle: 'Roadblocks & Awareness',
    tag: 'Yes/No: Personalized Path',
    conversationalIntro: 'Almost at the finish line! Can our AI intelligence engine craft a custom pathway for you?',
    question: 'Would it help if we personalized a learning path for you based on your answers here?',
    answerType: 'yes_no'
  },
  {
    id: 'A25',
    number: 25,
    sectionId: 'A5',
    sectionTitle: 'Roadblocks & Awareness',
    tag: 'Open text: Candidate Demand Signal',
    conversationalIntro: 'Your voice directly shapes Maharashtra\'s vocational curriculum!',
    question: 'Is there a specific skill, course, or job role you wish this platform offered but doesn\'t?',
    answerType: 'open_text',
    placeholder: 'e.g., EV Battery Swap Station Operations, Solar Micro-inverter Telemetry, CNC 5-Axis'
  }
];

// ==========================================
// PART B — EMPLOYER / INDUSTRY PARTNER SURVEY (25 Questions)
// ==========================================
export const EMPLOYER_QUESTIONS_BANK: QuestionnaireItem[] = [
  // B1. Tell Us About Your Organization (Q1–Q4)
  {
    id: 'B1',
    number: 1,
    sectionId: 'B1',
    sectionTitle: 'Tell Us About Your Organization',
    tag: 'Dropdown: Industry Sector',
    conversationalIntro: 'Welcome! By sharing your hiring signals, you directly align ITIs, polytechnics, and skill centers with real industry demand.',
    question: 'Which industry sector does your organization belong to?',
    answerType: 'dropdown',
    options: [
      'Automotive & EV Manufacturing',
      'IT / Software & Technology',
      'Renewable Energy & Solar',
      'Capital Goods, CNC & Precision Engineering',
      'Healthcare & Pharmaceuticals',
      'BFSI (Banking, Financial Services & Insurance)',
      'Retail & E-Commerce',
      'Logistics & Warehousing',
      'Construction & Infrastructure',
      'Other Industry'
    ]
  },
  {
    id: 'B2',
    number: 2,
    sectionId: 'B1',
    sectionTitle: 'Tell Us About Your Organization',
    tag: 'MCQ: Organization Size',
    conversationalIntro: 'Understanding your team scale helps us forecast hiring band requirements.',
    question: 'How big is your organization?',
    answerType: 'mcq',
    options: [
      'Startup (< 50 employees)',
      'SME (50–500 employees)',
      'Large Enterprise (500+ employees)'
    ]
  },
  {
    id: 'B3',
    number: 3,
    sectionId: 'B1',
    sectionTitle: 'Tell Us About Your Organization',
    tag: 'MCQ: Role in Hiring',
    conversationalIntro: 'What seat do you sit in during the hiring and talent management lifecycle?',
    question: 'What\'s your role in hiring decisions?',
    answerType: 'mcq',
    options: [
      'HR / Talent Acquisition Recruiter',
      'Hiring Manager / Technical Head',
      'Founder / Managing Director / Plant Head',
      'L&D / Corporate Training Head'
    ]
  },
  {
    id: 'B4',
    number: 4,
    sectionId: 'B1',
    sectionTitle: 'Tell Us About Your Organization',
    tag: 'MCQ ranges: Annual Hiring Volume',
    conversationalIntro: 'Estimating regional volume lets state skill planners allocate batch seats accurately.',
    question: 'On average, how many entry-level or skilled candidates do you hire in a year?',
    answerType: 'mcq',
    options: [
      '1–10 candidates / year',
      '11–50 candidates / year',
      '51–200 candidates / year',
      '200+ candidates / year'
    ]
  },

  // B2. What You Look For in Candidates (Q5–Q10)
  {
    id: 'B5',
    number: 5,
    sectionId: 'B2',
    sectionTitle: 'What You Look For in Candidates',
    tag: 'Ranking: Essential Entry Skills',
    conversationalIntro: 'When reviewing fresh talent, what competencies carry the most weight?',
    question: 'When you hire freshers or entry-level candidates, which skills matter most to you? (Rank top priorities)',
    answerType: 'ranking',
    options: [
      'Hands-on Technical / Trade Skills',
      'Clear Workplace Communication',
      'Problem-solving & Troubleshooting Aptitude',
      'Teamwork & Collaboration',
      'Digital Literacy & Basic Tools',
      'Adaptability & Willingness to Learn',
      'Deep Domain & Theory Knowledge'
    ]
  },
  {
    id: 'B6',
    number: 6,
    sectionId: 'B2',
    sectionTitle: 'What You Look For in Candidates',
    tag: 'Rating scale 1–5: Candidate Job-Readiness',
    conversationalIntro: 'From your experience interviewing graduates from vocational institutes, what\'s the honest verdict?',
    question: 'On a scale of 1 to 5, how job-ready are the candidates you typically interview from skilling programs?',
    answerType: 'rating_scale',
    minRating: 1,
    maxRating: 5,
    ratingLabels: { min: '1 - Far from ready (Needs months of retraining)', max: '5 - Fully Day-1 ready' }
  },
  {
    id: 'B7',
    number: 7,
    sectionId: 'B2',
    sectionTitle: 'What You Look For in Candidates',
    tag: 'Open text / Multi-select: Most Frequent Gap',
    conversationalIntro: 'What\'s the recurring bottleneck you encounter during technical evaluations?',
    question: 'What\'s the skill gap you run into most often with candidates today?',
    answerType: 'multi_select',
    maxSelections: 3,
    options: [
      'Outdated machinery knowledge (analog vs digital)',
      'Lack of electrical & battery safety awareness',
      'Inability to read technical schematics / CAD drawings',
      'Weak oral and written communication in English/Hindi',
      'Lack of shop-floor discipline and standard operating protocols',
      'No hands-on project exposure outside theory textbooks'
    ]
  },
  {
    id: 'B8',
    number: 8,
    sectionId: 'B2',
    sectionTitle: 'What You Look For in Candidates',
    tag: 'MCQ: Skilling Certifications vs Degrees',
    conversationalIntro: 'Modern recruitment is shifting towards skills-first evaluation over credentialism.',
    question: 'Do you weigh certifications from skilling platforms as heavily as formal degrees?',
    answerType: 'mcq',
    options: [
      'Yes, equally if practical competencies are proven',
      'Somewhat, depends on live workshop assessment',
      'No, we still mandate traditional degree certificates',
      'Only if verified by NCVET, NSDC, or government bodies'
    ]
  },
  {
    id: 'B9',
    number: 9,
    sectionId: 'B2',
    sectionTitle: 'What You Look For in Candidates',
    tag: 'Multi-select: Missing Soft Skills',
    conversationalIntro: 'Hard skills get people an interview; behavioral readiness keeps them on the job.',
    question: 'Which soft skills do you find candidates lacking most?',
    answerType: 'multi_select',
    maxSelections: 3,
    options: [
      'Professional communication & reporting',
      'Punctuality & shift discipline',
      'Critical thinking & Root Cause Analysis',
      'Team collaboration across departments',
      'Ownership & personal accountability for work'
    ]
  },
  {
    id: 'B10',
    number: 10,
    sectionId: 'B2',
    sectionTitle: 'What You Look For in Candidates',
    tag: 'MCQ: Offer Internships / Apprenticeships',
    conversationalIntro: 'Apprenticeships under NAPS offer significant government stipend reimbursement.',
    question: 'Would your organization consider offering internships or apprenticeships to candidates trained here?',
    answerType: 'mcq',
    options: [
      'Yes, actively interested (NAPS / NEEM / Dual-System)',
      'Maybe, with specific pre-screening conditions',
      'No, current policy does not support apprenticeships'
    ]
  },

  // B3. Looking Ahead — Next 6 Months (Q11–Q16)
  {
    id: 'B11',
    number: 11,
    sectionId: 'B3',
    sectionTitle: 'Looking Ahead — Next 6 Months',
    tag: 'Multi-select + Other: Surging Tech Skills',
    conversationalIntro: 'Which skills are going to be in extreme deficit on your plant floors or tech teams?',
    question: 'Which technical skills do you expect to need more of over the next 6 months?',
    answerType: 'multi_select',
    maxSelections: 4,
    options: [
      'EV Powertrain & Battery Management Systems (BMS)',
      'CNC 5-Axis Turning & Milling Programming',
      'Industrial IoT & PLC Automation',
      'Solar Photovoltaic Inverter & Storage Microgrids',
      'AI / ML & Practical Computer Vision',
      'Cloud Architecture & DevOps',
      'Cybersecurity & Network Defense',
      'Data Analytics & Warehouse Telemetry',
      'Precision Welding & Robotic Arm Welding'
    ]
  },
  {
    id: 'B12',
    number: 12,
    sectionId: 'B3',
    sectionTitle: 'Looking Ahead — Next 6 Months',
    tag: 'Open text: New Tools & Adoptions',
    conversationalIntro: 'Are there specific software suites, machine rigs, or diagnostic kits your teams are adopting?',
    question: 'Are there any new tools or technologies your team is adopting that candidates should be trained on?',
    answerType: 'open_text',
    placeholder: 'e.g., SolidWorks 2025, Siemens TIA Portal, CANalyzer, ROS2 Robotics'
  },
  {
    id: 'B13',
    number: 13,
    sectionId: 'B3',
    sectionTitle: 'Looking Ahead — Next 6 Months',
    tag: 'Ranking: 2-Quarter Hiring Priorities',
    conversationalIntro: 'Prioritizing these helps training providers tune their exit assessments.',
    question: 'Over the next two quarters, how would you rank these hiring priorities?',
    answerType: 'ranking',
    options: [
      'Demonstrated Technical / Domain Skill',
      'Prior Project / Hands-on Internship Experience',
      'Workplace Soft Skills & Attitude',
      'Recognized Government / Industry Certification',
      'Professional Communication in English/Hindi'
    ]
  },
  {
    id: 'B14',
    number: 14,
    sectionId: 'B3',
    sectionTitle: 'Looking Ahead — Next 6 Months',
    tag: 'MCQ: 6-Month Hiring Velocity',
    conversationalIntro: 'What direction is your entry-level headcount trending?',
    question: 'Do you expect your hiring volume for skilled entry-level roles to rise, fall, or stay flat in the next 6 months?',
    answerType: 'mcq',
    options: [
      'Rise (+20% or more)',
      'Moderate Rise (+5% to +15%)',
      'No change (Stable retention)',
      'Fall (Hiring freeze / contraction)',
      'Not sure / Macroeconomic uncertainty'
    ]
  },
  {
    id: 'B15',
    number: 15,
    sectionId: 'B3',
    sectionTitle: 'Looking Ahead — Next 6 Months',
    tag: 'Open text: Hardest Roles to Fill',
    conversationalIntro: 'Which specific job titles take you the longest to recruit qualified candidates for?',
    question: 'Which roles are proving hardest for you to fill right now?',
    answerType: 'open_text',
    placeholder: 'e.g., High-Voltage EV Wiring Harness Specialists, 5-Axis CNC Turners'
  },
  {
    id: 'B16',
    number: 16,
    sectionId: 'B3',
    sectionTitle: 'Looking Ahead — Next 6 Months',
    tag: 'Yes/No + role name: Co-Design Module',
    conversationalIntro: 'Under Maharashtra\'s Flexi-MoU scheme, companies can co-design 2–4 week modules with government ITIs.',
    question: 'Would you be interested in co-designing a short, 2–4 week "industry-ready" module with us for a specific role?',
    answerType: 'yes_no_text',
    placeholder: 'If yes, specify target trade or skill (e.g., EV Battery Testing, Smart Metering)'
  },

  // B4. Feedback on the Curriculum (Q17–Q21)
  {
    id: 'B17',
    number: 17,
    sectionId: 'B4',
    sectionTitle: 'Feedback on the Curriculum',
    tag: 'Rating scale 1–5: Current Syllabus Alignment',
    conversationalIntro: 'Let\'s evaluate the current state syllabi taught in local institutions.',
    question: 'Based on the candidates you\'ve interviewed or hired, how well does the current training curriculum match real industry needs?',
    answerType: 'rating_scale',
    minRating: 1,
    maxRating: 5,
    ratingLabels: { min: '1 - Outdated / Not aligned', max: '5 - Fully aligned with modern industry' }
  },
  {
    id: 'B18',
    number: 18,
    sectionId: 'B4',
    sectionTitle: 'Feedback on the Curriculum',
    tag: 'Open text: Outdated Topics to Trim',
    conversationalIntro: 'Removing obsolete syllabus hours frees up room for high-voltage and automated lab work.',
    question: 'Which topics feel outdated and could be trimmed or removed from the curriculum?',
    answerType: 'open_text',
    placeholder: 'e.g., Carburetor mechanical tuning, manual gear calculation on paper, obsolete relays'
  },
  {
    id: 'B19',
    number: 19,
    sectionId: 'B4',
    sectionTitle: 'Feedback on the Curriculum',
    tag: 'Open text: Missing Topics to Add',
    conversationalIntro: 'What should be mandatory in every graduate\'s final semester?',
    question: 'What\'s missing from the curriculum that you think should be added?',
    answerType: 'open_text',
    placeholder: 'e.g., CAN-bus diagnostics, battery management isolation protocols, git version control'
  },
  {
    id: 'B20',
    number: 20,
    sectionId: 'B4',
    sectionTitle: 'Feedback on the Curriculum',
    tag: 'MCQ: Curriculum Review Frequency',
    conversationalIntro: 'How frequently should state trade councils modernize vocational syllabi?',
    question: 'How often do you think the curriculum should be reviewed to keep pace with industry change?',
    answerType: 'mcq',
    options: [
      'Every 3 months (Quarterly agile updates)',
      'Every 6 months (Bi-annual refresh)',
      'Yearly (Annual academic cycle)',
      'Only when major tech shifts happen'
    ]
  },
  {
    id: 'B21',
    number: 21,
    sectionId: 'B4',
    sectionTitle: 'Feedback on the Curriculum',
    tag: 'Yes/No: Industry Advisory Panel',
    conversationalIntro: 'Would your engineering leadership lend their expertise to the State Skill Council?',
    question: 'Would you be willing to sit on an industry advisory panel to review and approve curriculum changes?',
    answerType: 'yes_no'
  },

  // B5. Your Voice, Ongoing — Voting & Upvoting (Q22–Q25)
  {
    id: 'B22',
    number: 22,
    sectionId: 'B5',
    sectionTitle: 'Your Voice, Ongoing — Voting & Upvoting',
    tag: 'Open text → Becomes a votable suggestion card',
    conversationalIntro: 'This powers our live "Industry Pulse" board! Your submission will be voted on by fellow employers.',
    question: 'What\'s one specific change you\'d make to the current syllabus? (e.g., "Add cloud deployment basics to the web development module.")',
    answerType: 'open_text',
    placeholder: 'e.g., Add 40 hours of high-voltage battery safety and isolation gear protocols to MMV trade'
  },
  {
    id: 'B23',
    number: 23,
    sectionId: 'B5',
    sectionTitle: 'Your Voice, Ongoing — Voting & Upvoting',
    tag: 'Upvote/downvote UI on live running list',
    conversationalIntro: 'Check out live suggestions submitted by other Maharashtra plant heads and talent leads in your sector. Cast your vote!',
    question: 'Take a look at what other employers in your sector have suggested — upvote the ones you agree with.',
    answerType: 'upvote_suggestion'
  },
  {
    id: 'B24',
    number: 24,
    sectionId: 'B5',
    sectionTitle: 'Your Voice, Ongoing — Voting & Upvoting',
    tag: 'Single-select ranking from live top-5 list',
    conversationalIntro: 'Among the highest-rated proposals from peer industries, which one is an absolute must-have?',
    question: 'Of the top 5 trending suggestions in your sector right now, which feels most urgent to you personally?',
    answerType: 'mcq',
    options: [
      'Mandatory High-Voltage Safety Certification for all Auto ITIs',
      'Replace Manual Lathe hours with 5-Axis CNC Simulation',
      'Add Micro-inverter Telemetry & Solar Battery Storage',
      'Integrate Git, Clean Code & API testing in Computer Trades',
      'Introduce Shop-floor 5S and Total Productive Maintenance (TPM)'
    ]
  },
  {
    id: 'B25',
    number: 25,
    sectionId: 'B5',
    sectionTitle: 'Your Voice, Ongoing — Voting & Upvoting',
    tag: 'Rating scale 1–5: Hiring Likelihood',
    conversationalIntro: 'Final question: If colleges train students on this employer-endorsed curriculum, would you hire them?',
    question: 'Compared to a candidate trained on the old syllabus, how much more likely would you be to hire someone trained under this updated, employer-informed curriculum?',
    answerType: 'rating_scale',
    minRating: 1,
    maxRating: 5,
    ratingLabels: { min: '1 - Not likely (Same skepticism)', max: '5 - Extremely likely (First in line for interviews)' }
  }
];

// Initial mock employer suggestions for live voting (Q23)
export const INITIAL_EMPLOYER_SUGGESTIONS: EmployerSuggestionItem[] = [
  {
    id: 'sug-1',
    sector: 'Automotive & EV Manufacturing',
    text: 'Add 60 hours of High-Voltage (400V+) Battery Disconnect and PPE Isolation training to the Mechanic Motor Vehicle syllabus.',
    upvotes: 42,
    submittedBy: 'Tata Motors EV Powertrain Lead (Pune)',
    timestamp: '2 days ago'
  },
  {
    id: 'sug-2',
    sector: 'Capital Goods, CNC & Precision Engineering',
    text: 'Shift 40% of manual gear-cutting lathe coursework into conversational G-Code and CAM multi-axis toolpath programming.',
    upvotes: 38,
    submittedBy: 'Bharat Forge Precision Machinist Head',
    timestamp: '3 days ago'
  },
  {
    id: 'sug-3',
    sector: 'Renewable Energy & Solar',
    text: 'Include bidirectional microgrid telemetry and smart inverter RS485/Modbus communication in Wireman/Electrician trades.',
    upvotes: 29,
    submittedBy: 'Mahindra Susten Solar Ops Manager',
    timestamp: '1 week ago'
  },
  {
    id: 'sug-4',
    sector: 'IT / Software & Technology',
    text: 'Add Git collaboration, Linux terminal fundamentals, and REST API testing before teaching frontend frameworks.',
    upvotes: 34,
    submittedBy: 'Infosys Hinjawadi Campus Recruitment Lead',
    timestamp: '4 days ago'
  },
  {
    id: 'sug-5',
    sector: 'Automotive & EV Manufacturing',
    text: 'Standardize CAN-bus diagnostic scanner usage so students can read and clear live OBD fault codes on actual vehicles.',
    upvotes: 27,
    submittedBy: 'Bajaj Auto R&D Specialist (Akurdi)',
    timestamp: '5 days ago'
  }
];

// ==========================================
// ADAPTIVE QUESTION SELECTION LOGIC (Max 15 Questions)
// ==========================================

/**
 * Returns the adaptive active question list for Candidates (Part A),
 * guaranteeing a smart conversational flow and strictly ≤ 15 questions.
 */
export function getCandidateAdaptiveQuestions(answers: Record<string, any>): QuestionnaireItem[] {
  // Base planned sequence across all 5 sections:
  // 1. A1 (Journey)
  // 2. A2 (Education)
  // 3. A3 (Domain studied)
  // 4. A4 (Conditional: only if Working Professional or Career Switcher)
  // 5. A5 (Region & Relocation)
  // 6. A6 (Platform Objective)
  // 7. A7 (Target Industries)
  // 8. A8 (Target Role in 1-2 yrs)
  // 9. A10 (Urgency rating 1-5)
  // 10. A11 (Existing skills)
  // 11. A12 (Strongest skill confidence)
  // 12. A14 (Weakest spot)
  // 13. A16 (Features needed)
  // 14. A17 or A18 (Learning style / time budget)
  // 15. A25 (Demand signal: wish platform offered)

  const isWorkingOrSwitcher = answers['A1'] === 'Working Professional' || answers['A1'] === 'Career Switcher';

  // Candidate Question IDs in order
  const activeIds: string[] = [
    'A1',
    'A2',
    'A3',
    ...(isWorkingOrSwitcher ? ['A4'] : []),
    'A5',
    'A6',
    'A7',
    'A8',
    'A10',
    'A11',
    'A12',
    'A14',
    'A16',
    'A17',
    'A25'
  ];

  // Guarantee maximum 14 questions (strictly below the 15 cap requested by user)
  const candidateQuestionsMap = new Map(CANDIDATE_QUESTIONS_BANK.map((q) => [q.id, q]));
  return activeIds
    .map((id) => candidateQuestionsMap.get(id))
    .filter((q): q is QuestionnaireItem => Boolean(q))
    .slice(0, 14);
}

/**
 * Returns the adaptive active question list for Employers (Part B),
 * ensuring max 12–14 questions, highlighting curriculum feedback and upvoting.
 */
export function getEmployerAdaptiveQuestions(answers: Record<string, any>): QuestionnaireItem[] {
  // Planned active sequence:
  // B1 (Sector), B2 (Size), B3 (Role), B4 (Hiring volume)
  // B5 (Key skills priority), B6 (Readiness rating), B9 (Soft skills lacking), B10 (Internships)
  // B11 (Tech skills next 6 months), B14 (Hiring volume trend)
  // B17 (Curriculum alignment rating), B19 (Missing skills)
  // B22 (Submit a syllabus change suggestion), B23 (Upvote/downvote live suggestions), B25 (Hiring likelihood under new curriculum)

  const activeIds: string[] = [
    'B1',
    'B2',
    'B3',
    'B4',
    'B5',
    'B6',
    'B9',
    'B10',
    'B11',
    'B14',
    'B17',
    'B19',
    'B22',
    'B23',
    'B25'
  ];

  const employerQuestionsMap = new Map(EMPLOYER_QUESTIONS_BANK.map((q) => [q.id, q]));
  return activeIds
    .map((id) => employerQuestionsMap.get(id))
    .filter((q): q is QuestionnaireItem => Boolean(q))
    .slice(0, 14);
}
