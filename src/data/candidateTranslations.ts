export type SupportedLang = 'en' | 'mr' | 'hi';

export interface Translations {
  portalTagline: string;
  portalTitle: string;
  streakDays: string;
  streakActiveToday: string;
  streakBrokenEncouragement: string;
  notifications: string;
  liteModeOn: string;
  liteModeOff: string;
  editPreferences: string;
  myProfile: string;
  logout: string;
  courseCheckPlaceholder: string;
  checkCourseBtn: string;
  verifiedDataLabel: string;
  honestNotice: string;
  statsSectionTitle: string;
  statPlacementEV: string;
  statPlacementDeclining: string;
  statDemandGap: string;
  outlookSectionTitle: string;
  outlookSubheading: string;
  risingSectors: string;
  decliningSectors: string;
  recommendedSectionTitle: string;
  recommendedSubheading: string;
  compareBtn: string;
  beforeYouEnrollTitle: string;
  beforeYouEnrollSubtitle: string;
  warningAlertHeading: string;
  switchCurriculumBtn: string;
  leaderboardTitle: string;
  leaderboardSubtitle: string;
  yourRankPinned: string;
  howPointsEarned: string;
  skillPassportTitle: string;
  skillPassportSubtitle: string;
  digiLockerBanner: string;
  digiLockerBtn: string;
  matchedJobsTitle: string;
  matchedJobsSubtitle: string;
  viewJobBtn: string;
  reskillingTitle: string;
  reskillingSubtitle: string;
  reskillingAction: string;
  askSetuFloating: string;
  askSetuTitle: string;
  counselorConnectTitle: string;
  counselorConnectBtn: string;
  tabThisWeek: string;
  tabThisMonth: string;
  tabAllTime: string;
  scopeDistrict: string;
  scopeState: string;
  statusHighDemand: string;
  statusCurrent: string;
  statusOversupplied: string;
  statusObsolete: string;
  anonymousToggle: string;
  savedCoursesTab: string;
}

export const TRANSLATIONS: Record<SupportedLang, Translations> = {
  en: {
    portalTagline: 'Government of Maharashtra • MSInS • Dept. of Skills',
    portalTitle: 'Candidate Vocational Outlook',
    streakDays: 'Day Learning Streak',
    streakActiveToday: 'Active today! Keep going.',
    streakBrokenEncouragement: "Streaks reset, but knowledge stays. Let's do 1 quick review to start fresh!",
    notifications: 'Notifications',
    liteModeOn: 'Lite Mode (2G/3G)',
    liteModeOff: 'Standard Mode',
    editPreferences: 'Edit Preferences',
    myProfile: 'Candidate Profile',
    logout: 'Log Out',
    courseCheckPlaceholder: 'Search any trade (e.g. Fitter, Electrician, EV, Diesel Mechanic)...',
    checkCourseBtn: 'Check Truth Data',
    verifiedDataLabel: 'Real Employer Telemetry from 36 Districts',
    honestNotice: 'Honest Truth: 2 years of your life is too valuable to spend on an outdated syllabus.',
    statsSectionTitle: 'Local Reality Check',
    statPlacementEV: 'EV & Clean Energy Placement Rate',
    statPlacementDeclining: 'Traditional ICE Fitter Placement Rate',
    statDemandGap: 'Local Skill Shortfall Across MIDCs',
    outlookSectionTitle: 'Your Trade Outlook',
    outlookSubheading: 'What Maharashtra factories & workshops are actually hiring for right now versus cutting down.',
    risingSectors: 'Rising Competencies (Expanding Intake)',
    decliningSectors: 'Declining Trades (Shrinking / Redundant)',
    recommendedSectionTitle: 'Recommended Courses For You',
    recommendedSubheading: 'Ranked specifically by your aim, district, and high-demand hiring signals.',
    compareBtn: 'Compare',
    beforeYouEnrollTitle: 'Before You Enroll: Real Numbers',
    beforeYouEnrollSubtitle: 'Live warning test: When a trade is outdated, here is the honest evidence and the direct upgrade.',
    warningAlertHeading: 'High Obsolescence & Oversupply Warning',
    switchCurriculumBtn: 'Switch to Modernized EV Curriculum',
    leaderboardTitle: 'Vocational Learning Community',
    leaderboardSubtitle: 'Ranked purely by skills learned, modules cleared, and verified quizzes — never by wealth or job status.',
    yourRankPinned: "You're ranked",
    howPointsEarned: 'How points are earned',
    skillPassportTitle: 'Verified Skill Passport',
    skillPassportSubtitle: 'Tamper-proof certifications issued by NCVET, DVET, and state skill academies.',
    digiLockerBanner: 'Have 10th/12th or existing ITI marksheets on DigiLocker?',
    digiLockerBtn: 'Pull from DigiLocker',
    matchedJobsTitle: 'Apprenticeships & Jobs Matched To You',
    matchedJobsSubtitle: 'NAPS and industrial openings in your target district matching your passport.',
    viewJobBtn: 'View Details',
    reskillingTitle: 'Reskilling Bridge for Working Candidates',
    reskillingSubtitle: 'Already working in a shrinking trade? Upgrade in 6 evening weeks without quitting your job.',
    reskillingAction: 'Explore Bridge Modules',
    askSetuFloating: 'Ask Setu',
    askSetuTitle: 'Ask Setu — Candid Career Assistant',
    counselorConnectTitle: 'Need to talk to a human counselor?',
    counselorConnectBtn: 'Book 15-Min Free Guidance Call',
    tabThisWeek: 'This Week',
    tabThisMonth: 'This Month',
    tabAllTime: 'All Time',
    scopeDistrict: 'My District',
    scopeState: 'All Maharashtra',
    statusHighDemand: 'High Demand',
    statusCurrent: 'Current',
    statusOversupplied: 'Oversupplied',
    statusObsolete: 'Obsolete',
    anonymousToggle: 'Display anonymized handle on public board',
    savedCoursesTab: 'Saved Trades'
  },
  mr: {
    portalTagline: 'महाराष्ट्र शासन • MSInS • कौशल्य, रोजगार व नाविन्यता विभाग',
    portalTitle: 'उमेदवार व्यवसाय व करिअर दिशा',
    streakDays: 'दिवसांची अभ्यासाची मालिका',
    streakActiveToday: 'आज सक्रिय! अभ्यास चालू ठेवा.',
    streakBrokenEncouragement: 'मालिका थांबली तरी ज्ञान कायम राहते. आज पुन्हा एक सराव पूर्ण करून नवीन सुरुवात करा!',
    notifications: 'सूचना',
    liteModeOn: 'लाईट मोड (कमी डेटा)',
    liteModeOff: 'सामान्य मोड',
    editPreferences: 'माहिती बदला',
    myProfile: 'माझे प्रोफाईल',
    logout: 'बाहेर पडा',
    courseCheckPlaceholder: 'कोणताही व्यवसाय शोधा (उदा. फिटर, वायरमन, ईव्ही, डिझेल मेकॅनिक)...',
    checkCourseBtn: 'सत्य पडताळणी',
    verifiedDataLabel: '३६ जिल्ह्यांमधील थेट औद्योगिक माहिती',
    honestNotice: 'स्पष्ट सत्य: तुमच्या आयुष्याची दोन वर्षे जुन्या अभ्यासक्रमात वाया घालवू नका.',
    statsSectionTitle: 'स्थानिक रोजगाराचे वास्तव',
    statPlacementEV: 'ईव्ही व सौर ऊर्जा प्लेसमेंट दर',
    statPlacementDeclining: 'पारंपरिक फिटरचा प्लेसमेंट दर',
    statDemandGap: 'एमआयडीसी कारखान्यांमधील कुशल कामगारांची तूट',
    outlookSectionTitle: 'तुमच्या क्षेत्रातील भविष्य',
    outlookSubheading: 'महाराष्ट्रातील कंपन्या प्रत्यक्ष कोणाला कामावर घेत आहेत आणि कोणाची मागणी घटत आहे.',
    risingSectors: 'वाढती मागणी असलेली कौशल्ये',
    decliningSectors: 'घटती मागणी असलेले जुने ट्रेड',
    recommendedSectionTitle: 'तुमच्यासाठी शिफारस केलेले अभ्यासक्रम',
    recommendedSubheading: 'तुमचे ध्येय, जिल्हा आणि उद्योगांच्या गरजेनुसार क्रमवारी लावलेली.',
    compareBtn: 'तुलना करा',
    beforeYouEnrollTitle: 'प्रवेश घेण्यापूर्वी: खरे आकडे तपासा',
    beforeYouEnrollSubtitle: 'थेट चेतावणी चाचणी: जुन्या ट्रेडमधील धोका आणि आधुनिक पर्यायाचे स्पष्ट पुरावे.',
    warningAlertHeading: 'अभ्यासक्रम जुनाट व अतिरिक्त पुरवठा चेतावणी',
    switchCurriculumBtn: 'आधुनिक ईव्ही अभ्यासक्रमात प्रवेश घ्या',
    leaderboardTitle: 'कौशल्य साधक गुणतक्ता',
    leaderboardSubtitle: 'केवळ शिकलेल्या कौशल्यांवर आणि चाचण्यांवर आधारित — नोकरीच्या स्थितीवर नाही.',
    yourRankPinned: 'तुमचा क्रमांक',
    howPointsEarned: 'गुण कसे मिळतात?',
    skillPassportTitle: 'प्रमाणित कौशल्य पासपोर्ट',
    skillPassportSubtitle: 'NCVET आणि DVET द्वारे जारी केलेले अधिकृत प्रमाणपत्र.',
    digiLockerBanner: 'तुमचे १०वी/१२वी किंवा आयटीआय गुणपत्रक डिजीपत्रावर आहे का?',
    digiLockerBtn: 'डिजीलॉकरमधून आणा',
    matchedJobsTitle: 'तुमच्यासाठी योग्य शिकाऊ (NAPS) व नोकऱ्या',
    matchedJobsSubtitle: 'तुमच्या जिल्ह्यातील आणि कौशल्यांशी जुळणाऱ्या थेट संधी.',
    viewJobBtn: 'तपशील पहा',
    reskillingTitle: 'काम करणाऱ्या उमेदवारांसाठी अपस्किलिंग ब्रिज',
    reskillingSubtitle: 'जुन्या क्षेत्रात काम करत आहात? नोकरी न सोडता संध्याकाळी ६ आठवड्यांत ईव्हीत अपग्रेड व्हा.',
    reskillingAction: 'ब्रिज कोर्स पहा',
    askSetuFloating: 'सेतू विचारा',
    askSetuTitle: 'सेतू एआय — प्रामाणिक करिअर मार्गदर्शक',
    counselorConnectTitle: 'सरकारी करिअर समुपदेशकांशी बोलायचे आहे का?',
    counselorConnectBtn: '१५ मिनिटांचा विनामूल्य कॉल बुक करा',
    tabThisWeek: 'या आठवड्यात',
    tabThisMonth: 'या महिन्यात',
    tabAllTime: 'सर्व वेळ',
    scopeDistrict: 'माझा जिल्हा',
    scopeState: 'संपूर्ण महाराष्ट्र',
    statusHighDemand: 'उच्च मागणी',
    statusCurrent: 'सध्याचा',
    statusOversupplied: 'अतिरिक्त पुरवठा',
    statusObsolete: 'जुनाट',
    anonymousToggle: 'सार्वजनिक फलकावर टोपणनाव दाखवा',
    savedCoursesTab: 'जतन केलेले ट्रेड'
  },
  hi: {
    portalTagline: 'महाराष्ट्र सरकार • MSInS • कौशल विकास एवं नवाचार विभाग',
    portalTitle: 'उम्मीदवार व्यावसायिक एवं करियर आउटलुक',
    streakDays: 'दिवसीय अध्ययन श्रृंखला',
    streakActiveToday: 'आज सक्रिय! अभ्यास जारी रखें।',
    streakBrokenEncouragement: 'श्रृंखला टूटने पर भी ज्ञान बना रहता है। आइए 1 त्वरित पुनरीक्षण के साथ नई शुरुआत करें!',
    notifications: 'सूचनाएं',
    liteModeOn: 'लाइट मोड (कम डेटा)',
    liteModeOff: 'मानक मोड',
    editPreferences: 'प्राथमिकताएं बदलें',
    myProfile: 'उम्मीदवार प्रोफाइल',
    logout: 'लॉग आउट',
    courseCheckPlaceholder: 'किसी भी ट्रेड को खोजें (जैसे फिटर, इलेक्ट्रिशियन, ईवी, डीजल मेकेनिक)...',
    checkCourseBtn: 'सत्य डेटा जांचें',
    verifiedDataLabel: '36 जिलों से वास्तविक नियोक्ता डेटा',
    honestNotice: 'सच्चाई: अपने जीवन के 2 वर्ष पुराने पाठ्यक्रम पर खर्च करना उचित नहीं है।',
    statsSectionTitle: 'स्थानीय रोजगार की वास्तविकता',
    statPlacementEV: 'ईवी एवं स्वच्छ ऊर्जा प्लेसमेंट दर',
    statPlacementDeclining: 'पारंपरिक फिटर प्लेसमेंट दर',
    statDemandGap: 'एमआईडीसी उद्योगों में कुशल कार्यबल की कमी',
    outlookSectionTitle: 'आपके ट्रेड का भविष्य',
    outlookSubheading: 'महाराष्ट्र के कारखाने वर्तमान में किसे नियुक्त कर रहे हैं और किसकी मांग घट रही है।',
    risingSectors: 'बढ़ती मांग वाले कौशल',
    decliningSectors: 'घटती मांग वाले ट्रेड',
    recommendedSectionTitle: 'आपके लिए अनुशंसित पाठ्यक्रम',
    recommendedSubheading: 'आपके लक्ष्य, जिले और उद्योग की मांग के अनुसार क्रमित।',
    compareBtn: 'तुलना करें',
    beforeYouEnrollTitle: 'नामांकन से पहले: वास्तविक आंकड़े',
    beforeYouEnrollSubtitle: 'चेतावनी परीक्षण: पुराने ट्रेड का जोखिम और आधुनिक विकल्प के साक्ष्य।',
    warningAlertHeading: 'उच्च अप्रचलन एवं अतिरिक्त आपूर्ति चेतावनी',
    switchCurriculumBtn: 'आधुनिक ईव्ही पाठ्यक्रम में बदलें',
    leaderboardTitle: 'कौशल शिक्षार्थी समुदाय',
    leaderboardSubtitle: 'केवल सीखे गए कौशलों और क्विज़ पर आधारित रैंकिंग।',
    yourRankPinned: 'आपकी रैंक',
    howPointsEarned: 'अंक कैसे अर्जित करें',
    skillPassportTitle: 'सत्यापित कौशल पासपोर्ट',
    skillPassportSubtitle: 'NCVET और DVET द्वारा जारी प्रामाणिक प्रमाणपत्र।',
    digiLockerBanner: 'क्या आपकी 10वीं/12वीं अंकसूची डिजिलॉकर पर है?',
    digiLockerBtn: 'डिजिलॉकर से प्राप्त करें',
    matchedJobsTitle: 'आपके लिए अनुशंसित अप्रेंटिसशिप एवं नौकरियां',
    matchedJobsSubtitle: 'आपके लक्षित जिले में आपके पासपोर्ट से मेल खाती रिक्तियां।',
    viewJobBtn: 'विवरण देखें',
    reskillingTitle: 'कार्यरत उम्मीदवारों के लिए अपस्किलिंग ब्रिज',
    reskillingSubtitle: 'क्या आप घटती मांग वाले ट्रेड में कार्यरत हैं? 6 सप्ताह में ईव्ही में अपग्रेड करें।',
    reskillingAction: 'ब्रिज मॉड्यूल देखें',
    askSetuFloating: 'सेतु से पूछें',
    askSetuTitle: 'सेतु एआई — सत्यनिष्ठ करियर सहायक',
    counselorConnectTitle: 'क्या आप सरकारी परामर्शदाता से बात करना चाहते हैं?',
    counselorConnectBtn: '15-मिनट की निःशुल्क कॉल बुक करें',
    tabThisWeek: 'इस सप्ताह',
    tabThisMonth: 'इस महीने',
    tabAllTime: 'अब तक',
    scopeDistrict: 'मेरा जिला',
    scopeState: 'संपूर्ण महाराष्ट्र',
    statusHighDemand: 'उच्च मांग',
    statusCurrent: 'वर्तमान',
    statusOversupplied: 'अतिरिक्त आपूर्ति',
    statusObsolete: 'पुरानाट/अमान्य',
    anonymousToggle: 'सार्वजनिक बोर्ड पर छद्म नाम दिखाएं',
    savedCoursesTab: 'सहेजे गए ट्रेड'
  }
};
