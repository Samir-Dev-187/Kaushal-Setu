export type SupportedLang = 'en' | 'mr' | 'hi';

export interface SiteTranslations {
  // Government Top Bar
  govIndia: string;
  stateMaharashtra: string;
  portalTitle: string;
  accessibility: string;
  helpdesk: string;
  contact: string;

  // Nav Bar
  home: string;
  about: string;
  howItWorks: string;
  skillIntelligence: string;
  trainingCentres: string;
  candidates: string;
  employers: string;
  government: string;
  insights: string;
  schemes: string;
  signIn: string;
  register: string;

  // Dropdown Subitems
  tcPortal: string;
  curriculumIntel: string;
  courseCat: string;
  marketDemand: string;
  candPortal: string;
  outcomeCheck: string;
  skillPassport: string;
  napsApprentice: string;
  empSurvey: string;
  demandSignals: string;
  curriculumFeedback: string;
  mapsPipeline: string;
  heatmap36: string;
  pdfInference: string;
  itiSanctions: string;
  dsdpPlanning: string;
  budgetRoi: string;

  // Home Hero Section
  heroBadge: string;
  heroHeading: string;
  heroHeadingHighlight: string;
  heroSubheading: string;
  checkCourseTruth: string;
  exploreDistrictMap: string;
  empSignalBadge: string;
  activeSanctionsBadge: string;
  placementsCountBadge: string;

  // Feature Cards
  truthEngineTitle: string;
  truthEngineDesc: string;
  heatmapTitle: string;
  heatmapDesc: string;
  curriculumTitle: string;
  curriculumDesc: string;
  passportTitle: string;
  passportDesc: string;

  // Why Kaushal Setu Section
  whyTitle: string;
  whySubtitle: string;
  traditionalVsSetuTitle: string;
  traditional1: string;
  traditional2: string;
  traditional3: string;
  setu1: string;
  setu2: string;
  setu3: string;

  // How It Works Section
  howTitle: string;
  howStep1Title: string;
  howStep1Desc: string;
  howStep2Title: string;
  howStep2Desc: string;
  howStep3Title: string;
  howStep3Desc: string;

  // Case Study & Footer
  caseStudyTitle: string;
  caseStudySubtitle: string;
  footerTagline: string;
  footerDept: string;
  footerRights: string;
}

export const SITE_TRANSLATIONS: Record<SupportedLang, SiteTranslations> = {
  en: {
    govIndia: 'Government of India',
    stateMaharashtra: 'State of Maharashtra',
    portalTitle: 'Skill Development & Entrepreneurship Portal Initiative',
    accessibility: 'Accessibility',
    helpdesk: 'Helpdesk',
    contact: 'Contact',

    home: 'Home',
    about: 'About Kaushal Setu',
    howItWorks: 'How It Works',
    skillIntelligence: 'Skill Intelligence',
    trainingCentres: 'Training Centres',
    candidates: 'Candidates',
    employers: 'Employers',
    government: 'Government',
    insights: 'Insights & Reports',
    schemes: 'Schemes & Initiatives',
    signIn: 'Sign In',
    register: 'Register',

    tcPortal: 'Training Centre Portal',
    curriculumIntel: 'Curriculum Intelligence',
    courseCat: 'Course Catalogue & Diagnostics',
    marketDemand: 'Market Demand Telemetry',
    candPortal: 'Candidate Vocational Portal',
    outcomeCheck: 'Course Outcome Check',
    skillPassport: 'Verified Skill Passport (DigiLocker)',
    napsApprentice: 'NAPS Apprenticeships & Openings',
    empSurvey: 'Employer Survey Window',
    demandSignals: 'Skill Demand Signals & Vacancies',
    curriculumFeedback: 'Curriculum Feedback & Co-Design',
    mapsPipeline: 'MAPS / NAPS Apprenticeship Pipeline',
    heatmap36: '36-District Predictive Heatmap',
    pdfInference: '5-Parameter PDF Inference',
    itiSanctions: '652 ITI Units Sanctioning Workflow',
    dsdpPlanning: 'District Planning (DSDP)',
    budgetRoi: 'Skilling Budget & Scheme ROI',

    heroBadge: 'Continuous Labour Market & Vocational Telemetry System',
    heroHeading: 'Bridging Maharashtra’s Vocational Skills with ',
    heroHeadingHighlight: 'Real Industry Demand',
    heroSubheading: 'Aligning 652+ Government ITIs, 4,200+ Private Training Centres, and 12,000+ Employers across Maharashtra using real-time telemetry and AI curriculum diagnostics.',
    checkCourseTruth: 'Check Trade Truth Data',
    exploreDistrictMap: 'Explore 36-District Skill Map',
    empSignalBadge: 'Live Employer Signals',
    activeSanctionsBadge: 'Active ITI Unit Sanctions',
    placementsCountBadge: 'Verified Annual Placements',

    truthEngineTitle: 'Trade Truth Data Engine',
    truthEngineDesc: 'Instant placement reality check for 120+ ITI & Vocational trades across 36 Maharashtra districts.',
    heatmapTitle: '36-District Demand Heatmap',
    heatmapDesc: 'Granular MIDC industrial cluster telemetry identifying high-growth vs obsolete skills in real-time.',
    curriculumTitle: 'AI Curriculum Diagnostics',
    curriculumDesc: 'Automated 5-parameter scoring of course syllabi against active NCVET and industry standards.',
    passportTitle: 'Verified DigiLocker Skill Passport',
    passportDesc: 'Tamper-proof digital credentials linked to candidate Aadhar and DigiLocker for instant employer verification.',

    whyTitle: 'Why Kaushal Setu?',
    whySubtitle: 'Transforming Maharashtra from static annual skill surveys to dynamic real-time labour market intelligence.',
    traditionalVsSetuTitle: 'Traditional Approach vs Kaushal Setu Architecture',
    traditional1: 'Static annual survey reports published months out of date',
    traditional2: 'Curriculum unchanged for 5–10 years despite industry shifts',
    traditional3: 'Candidates spending 2 years on trades with declining placement',
    setu1: 'Real-time telemetry from MIDC hubs, GST data, and job boards',
    setu2: 'AI-driven quarterly curriculum diagnostics & course sanctions',
    setu3: 'Transparent placement truth data guiding candidates to high-demand trades',

    howTitle: 'How Kaushal Setu Operates',
    howStep1Title: '1. Ingest Industrial Signals',
    howStep1Desc: 'Automated telemetry collects hiring signals, NAPS apprenticeships, and district investment data.',
    howStep2Title: '2. Diagnose & Sanction',
    howStep2Desc: 'AI algorithms evaluate course syllabi and recommend unit expansion or obsolescence phase-outs.',
    howStep3Title: '3. Empower Candidates & Employers',
    howStep3Desc: 'Candidates receive personalized pathway guidance while employers access verified skilled talent.',

    caseStudyTitle: 'EV Transition Case Study',
    caseStudySubtitle: 'How Chakan-Pimpri Auto Cluster modernized 14 ITI trades from ICE engines to High-Voltage EV battery assembly.',
    footerTagline: 'Kaushal Setu — Maharashtra Skill Intelligence Platform',
    footerDept: 'Maharashtra State Innovation Society (MSInS) • Dept. of Skills, Employment, Entrepreneurship & Innovation',
    footerRights: 'Official Government Portal Prototype for SIH 2026. All rights reserved.'
  },

  mr: {
    govIndia: 'भारत सरकार',
    stateMaharashtra: 'महाराष्ट्र शासन',
    portalTitle: 'कौशल्य विकास आणि उद्योजकता पोर्टल उपक्रम',
    accessibility: 'सुलभता पर्याय',
    helpdesk: 'मदत कक्ष',
    contact: 'संपर्क',

    home: 'मुख्य पृष्ठ',
    about: 'कौशल सेतूबद्दल',
    howItWorks: 'हे कसे कार्य करते',
    skillIntelligence: 'कौशल्य माहिती प्रणाली',
    trainingCentres: 'प्रशिक्षण केंद्रे',
    candidates: 'उमेदवार',
    employers: 'रोजगारदाते',
    government: 'शासकीय विभाग',
    insights: 'अहवाल आणि माहिती',
    schemes: 'शासकीय योजना',
    signIn: 'लॉगिन करा',
    register: 'नोंदणी करा',

    tcPortal: 'प्रशिक्षण केंद्र पोर्टल',
    curriculumIntel: 'अभ्यासक्रम बुद्धिमत्ता प्रणाली',
    courseCat: 'ट्रेड सूची व निदान',
    marketDemand: 'बाजार मागणी टेलिमेट्री',
    candPortal: 'उमेदवार व्यावसायिक पोर्टल',
    outcomeCheck: 'ट्रेड सत्यता तपासणी',
    skillPassport: 'प्रमाणित कौशल्य पासपोर्ट (डिजिलॉकर)',
    napsApprentice: 'NAPS प्रशिक्षणार्थी व नोकऱ्या',
    empSurvey: 'रोजगारदाते सर्वेक्षण विंडो',
    demandSignals: 'कौशल्य मागणी संकेत व रिक्त पदे',
    curriculumFeedback: 'अभ्यासक्रम अभिप्राय व सह-रचना',
    mapsPipeline: 'MAPS / NAPS प्रशिक्षणार्थी पाइपलाइन',
    heatmap36: '३६-जिल्हे अंदाज नकाशा',
    pdfInference: '५-घटक PDF निष्कर्ष इंजिन',
    itiSanctions: '६५२ ITI मंजुरी कार्यप्रवाह',
    dsdpPlanning: 'जिल्हा नियोजन (DSDP)',
    budgetRoi: 'कौशल्य बजेट व योजना परतावा',

    heroBadge: 'सतत कामगार बाजार आणि व्यावसायिक टेलिमेट्री प्रणाली',
    heroHeading: 'महाराष्ट्रातील व्यावसायिक कौशल्यांची ',
    heroHeadingHighlight: 'उद्योग मागणीशी थेट सांगड',
    heroSubheading: '६५२+ शासकीय ITIs, ४,२००+ खाजगी प्रशिक्षण केंद्रे आणि १२,०००+ उद्योगांना रिअल-टाइम टेलिमेट्रीद्वारे जोडणारी आधुनिक प्रणाली.',
    checkCourseTruth: 'ट्रेड सत्यता डेटा तपासा',
    exploreDistrictMap: '३६-जिल्हे नकाशा पहा',
    empSignalBadge: 'थेट उद्योग संकेत',
    activeSanctionsBadge: 'सक्रिय ITI तुकडी मंजुरी',
    placementsCountBadge: 'प्रमाणित वार्षिक रोजगार',

    truthEngineTitle: 'ट्रेड सत्यता डेटा इंजिन',
    truthEngineDesc: '३६ जिल्ह्यांतील १२०+ ITI व व्यावसायिक ट्रेडचे थेट रोजगार प्रमाण तपासा.',
    heatmapTitle: '३६-जिल्हे मागणी नकाशा',
    heatmapDesc: 'MIDC औद्योगिक क्षेत्रातील नवीन आणि कालबाह्य कौशल्यांचे रिअल-टाइम विश्लेषण.',
    curriculumTitle: 'AI अभ्यासक्रम निदान',
    curriculumDesc: 'NCVET आणि उद्योग मानकांनुसार अभ्यासक्रमाचे स्वयंचलित मूल्यमापन.',
    passportTitle: 'डिजिलॉकर कौशल्य पासपोर्ट',
    passportDesc: 'उमेदवाराच्या आधार व डिजिलॉकरशी जोडलेले डिजिटल प्रमाणपत्र.',

    whyTitle: 'कौशल सेतू का?',
    whySubtitle: 'महाराष्ट्राला वार्षिक स्थिर सर्वेक्षणांमधून रिअल-टाइम कामगार बाजार बुद्धिमत्तेकडे नेणारा उपक्रम.',
    traditionalVsSetuTitle: 'पारंपरिक पद्धत विरुद्ध कौशल सेतू रचना',
    traditional1: 'जुने आणि कालबाह्य झालेले वार्षिक सर्वेक्षण अहवाल',
    traditional2: 'उद्योग बदलूनही ५-१० वर्षे न बदलणारा अभ्यासक्रम',
    traditional3: 'कमी मागणी असलेल्या ट्रेडवर उमेदवारांचे २ वर्षे वाया जाणे',
    setu1: 'MIDC हब आणि उद्योग डेटावरून रिअल-टाइम टेलिमेट्री संग्रह',
    setu2: 'AI-आधारित त्रैमासिक अभ्यासक्रम निदान आणि तुकडी मंजुरी',
    setu3: 'उमेदवारांना योग्य आणि उच्च मागणी असलेल्या ट्रेडकडे मार्गदर्शन',

    howTitle: 'कौशल सेतू कसे कार्य करते',
    howStep1Title: '१. औद्योगिक संकेत संकलन',
    howStep1Desc: 'भरती संकेत, NAPS प्रशिक्षणार्थी आणि गुंतवणूक डेटाचे स्वयंचलित संकलन.',
    howStep2Title: '२. निदान आणि मंजुरी',
    howStep2Desc: 'AI अल्गोरिदमद्वारे अभ्यासक्रमाचे मूल्यमापन आणि तुकडी मंजुरी.',
    howStep3Title: '३. उमेदवार व उद्योग सक्षमीकरण',
    howStep3Desc: 'उमेदवारांना करिअर मार्गदर्शन तर उद्योगांना कुशल मनुष्यबळ.',

    caseStudyTitle: 'EV तांत्रिक बदल केस स्टडी',
    caseStudySubtitle: 'चाकण-पिंपरी ऑटो क्लस्टरने १४ ITI ट्रेडचे EV बॅटरी तंत्रज्ञानात केलेले आधुनिक रूपांतर.',
    footerTagline: 'कौशल सेतू — महाराष्ट्र कौशल्य बुद्धिमत्ता प्लॅटफॉर्म',
    footerDept: 'महाराष्ट्र शासन • कौशल्य, रोजगार, उद्योजकता आणि नाविन्यता विभाग',
    footerRights: 'SIH २०२६ साठी अधिकृत शासकीय पोर्टल प्रोटोटाइप. सर्व हक्क सुरक्षित.'
  },

  hi: {
    govIndia: 'भारत सरकार',
    stateMaharashtra: 'महाराष्ट्र सरकार',
    portalTitle: 'कौशल विकास एवं उद्यमिता पोर्टल पहल',
    accessibility: 'सुगमता विकल्प',
    helpdesk: 'हेल्पडेस्क',
    contact: 'संपर्क',

    home: 'मुख्य पृष्ठ',
    about: 'कौशल सेतु के बारे में',
    howItWorks: 'यह कैसे काम करता है',
    skillIntelligence: 'स्किल इंटेलिजेंस',
    trainingCentres: 'प्रशिक्षण केंद्र',
    candidates: 'उम्मीदवार',
    employers: 'नियोक्ता',
    government: 'सरकारी विभाग',
    insights: 'रिपोर्ट्स और अंतर्दृष्टि',
    schemes: 'सरकारी योजनाएं',
    signIn: 'साइन इन करें',
    register: 'पंजीकरण करें',

    tcPortal: 'प्रशिक्षण केंद्र पोर्टल',
    curriculumIntel: 'पाठ्यक्रम बुद्धिमत्ता',
    courseCat: 'ट्रेड सूची और निदान',
    marketDemand: 'बाजार मांग टेलीमेट्री',
    candPortal: 'उम्मीदवार व्यावसायिक पोर्टल',
    outcomeCheck: 'ट्रेड सत्यता जांच',
    skillPassport: 'सत्यापित कौशल पासपोर्ट (डिजीजिलॉकर)',
    napsApprentice: 'NAPS शिक्षुता और रिक्तियां',
    empSurvey: 'नियोक्ता सर्वेक्षण विंडो',
    demandSignals: 'कौशल मांग संकेत एवं रिक्तियां',
    curriculumFeedback: 'पाठ्यक्रम प्रतिक्रिया एवं सह-डिजाइन',
    mapsPipeline: 'MAPS / NAPS शिक्षुता पाइपलाइन',
    heatmap36: '36-जिला पूर्वानुमान हीटमैप',
    pdfInference: '5-पैरामीटर PDF निष्कर्ष इंजन',
    itiSanctions: '652 ITI मंजूरी कार्यप्रवाह',
    dsdpPlanning: 'जिला योजना (DSDP)',
    budgetRoi: 'कौशल बजट और योजना प्रतिफल',

    heroBadge: 'सतत श्रम बाजार और व्यावसायिक टेलीमेट्री प्रणाली',
    heroHeading: 'महाराष्ट्र के व्यावसायिक कौशलों को ',
    heroHeadingHighlight: 'उद्योग की वास्तविक मांग से जोड़ना',
    heroSubheading: '652+ सरकारी ITI, 4,200+ निजी प्रशिक्षण केंद्रों और 12,000+ उद्योगों को वास्तविक समय टेलीमेट्री द्वारा जोड़ना।',
    checkCourseTruth: 'ट्रेड सत्यता डेटा जांचें',
    exploreDistrictMap: '36-जिला मानचित्र देखें',
    empSignalBadge: 'लाइव उद्योग संकेत',
    activeSanctionsBadge: 'सक्रिय ITI इकाई मंजूरियां',
    placementsCountBadge: 'सत्यापित वार्षिक प्लेसमेंट',

    truthEngineTitle: 'ट्रेड सत्यता डेटा इंजन',
    truthEngineDesc: '36 महाराष्ट्र जिलों में 120+ ITI ट्रेडों की वास्तविक प्लेसमेंट स्थिति जांचें।',
    heatmapTitle: '36-जिला मांग हीटमैप',
    heatmapDesc: 'MIDC औद्योगिक क्षेत्रों से नई और पुरानी कलाओं का वास्तविक समय विश्लेषण।',
    curriculumTitle: 'AI पाठ्यक्रम निदान',
    curriculumDesc: 'NCVET और उद्योग मानकों के अनुसार पाठ्यक्रम का स्वचालित मूल्यांकन।',
    passportTitle: 'सत्यापित डिजीजिलॉकर कौशल पासपोर्ट',
    passportDesc: 'उम्मीदवार के आधार और डिजीजिलॉकर से जुड़ा सुरक्षित डिजिटल प्रमाण पत्र।',

    whyTitle: 'कौशल सेतु क्यों?',
    whySubtitle: 'महाराष्ट्र को वार्षिक स्थिर सर्वेक्षणों से गतिशील वास्तविक समय श्रम बाजार बुद्धिमत्ता की ओर ले जाना।',
    traditionalVsSetuTitle: 'पारंपरिक दृष्टिकोण बनाम कौशल सेतु वास्तुकला',
    traditional1: 'पुराने और समय से पीछे वार्षिक सर्वेक्षण रिपोर्ट',
    traditional2: 'उद्योग परिवर्तन के बावजूद 5-10 वर्षों से अपरिवर्तित पाठ्यक्रम',
    traditional3: 'कम मांग वाले ट्रेडों में उम्मीदवारों का 2 वर्ष बर्बाद होना',
    setu1: 'MIDC केंद्रों और उद्योग डेटा से वास्तविक समय टेलीमेट्री',
    setu2: 'AI-आधारित त्रैमासिक पाठ्यक्रम निदान और इकाई स्वीकृति',
    setu3: 'उम्मीदवारों को उच्च मांग वाले ट्रेडों की ओर पारदर्शी मार्गदर्शन',

    howTitle: 'कौशल सेतु कैसे काम करता है',
    howStep1Title: '1. औद्योगिक संकेत संग्रह',
    howStep1Desc: 'भर्ती संकेतों, शिक्षुता और निवेश डेटा का स्वचालित संग्रह।',
    howStep2Title: '2. निदान और स्वीकृति',
    howStep2Desc: 'AI एल्गोरिदम द्वारा पाठ्यक्रम मूल्यांकन और नई इकाइयों की स्वीकृति।',
    howStep3Title: '3. उम्मीदवार और उद्योग सशक्तिकरण',
    howStep3Desc: 'उम्मीदवारों को व्यक्तिगत मार्गदर्शन और उद्योगों को कुशल कार्यबल।',

    caseStudyTitle: 'EV परिवर्तन केस स्टडी',
    caseStudySubtitle: 'चाकन-पिंपरी ऑटो क्लस्टर ने 14 ITI ट्रेडों को EV तकनीक में कैसे आधुनिक बनाया।',
    footerTagline: 'कौशल सेतु — महाराष्ट्र कौशल बुद्धिमत्ता प्लेटफॉर्म',
    footerDept: 'महाराष्ट्र सरकार • कौशल, रोजगार, उद्यमिता एवं नवाचार विभाग',
    footerRights: 'SIH 2026 के लिए आधिकारिक सरकारी पोर्टल प्रोटोटाइप। सर्वाधिकार सुरक्षित।'
  }
};
