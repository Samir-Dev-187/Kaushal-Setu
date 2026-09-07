import { CandidateProfile, CourseItem, JobMatchItem, SkillPassportItem } from '../types/candidate';
import { SupportedLang } from '../data/candidateTranslations';

export type CandidateDomainType =
  | 'it_cyber'
  | 'auto_ev'
  | 'solar_renewable'
  | 'healthcare'
  | 'manufacturing_cnc';

/**
 * Detects the domain archetype for a candidate profile based on trade, sectors, role, and assessment.
 */
export function detectDomain(profile?: Partial<CandidateProfile> | null): CandidateDomainType {
  if (!profile) return 'auto_ev';

  const text = [
    profile.tradeOrField || '',
    ...(profile.sectorsOfInterest || []),
    profile.domainAssessment?.domainName || '',
    (profile as any).targetRole || ''
  ]
    .join(' ')
    .toLowerCase();

  if (
    text.includes('cyber') ||
    text.includes('software') ||
    text.includes('computer') ||
    text.includes('it /') ||
    text.includes('it/ites') ||
    text.includes('soc ') ||
    text.includes('cloud') ||
    text.includes('data engineering') ||
    text.includes('python') ||
    text.includes('coding') ||
    text.includes('web') ||
    text.includes('network security') ||
    text.includes('ethical hack')
  ) {
    return 'it_cyber';
  }

  if (
    text.includes('solar') ||
    text.includes('renewable') ||
    text.includes('pv ') ||
    text.includes('net meter')
  ) {
    return 'solar_renewable';
  }

  if (
    text.includes('health') ||
    text.includes('medical') ||
    text.includes('biomedical') ||
    text.includes('pharma') ||
    text.includes('nursing')
  ) {
    return 'healthcare';
  }

  if (
    text.includes('cnc') ||
    text.includes('machining') ||
    text.includes('milling') ||
    text.includes('turner') ||
    text.includes('tool')
  ) {
    return 'manufacturing_cnc';
  }

  return 'auto_ev';
}

/**
 * Domain-specific Local Telemetry & Hero Statistics
 */
export interface DomainTelemetryStats {
  primarySectors: string;
  placementRate: number;
  placementRateLabel: string;
  decliningRate: number;
  decliningRateLabel: string;
  demandGap: number;
  demandGapLabel: string;
  searchChips: Array<{ label: string; query: string; color: 'emerald' | 'rose' | 'amber' }>;
  defaultFlaggedCourseId: string;
  defaultAlternativeCourseId: string;
}

export function getDomainTelemetry(
  domain: CandidateDomainType,
  district: string,
  language: SupportedLang
): DomainTelemetryStats {
  if (domain === 'it_cyber') {
    return {
      primarySectors: language === 'mr' ? 'सायबर सुरक्षा, क्लाऊड व सॉफ्टवेअर' : 'Cybersecurity, Cloud & Software',
      placementRate: 94,
      placementRateLabel: language === 'mr' ? 'क्लाऊड व सायबर सुरक्षा प्लेसमेंट दर' : 'Cloud & Cyber Security Placement Rate',
      decliningRate: 24,
      decliningRateLabel: language === 'mr' ? 'पारंपरिक डेटा एन्ट्री / मॅन्युअल टायपिंग' : 'Legacy Data Entry & Manual Typing',
      demandGap: 18500,
      demandGapLabel: language === 'mr' ? 'पुणे व एमएमआर आयटी पार्क तुटवडा' : 'Cyber & Cloud Openings in Pune & MMR',
      searchChips: [
        { label: 'Cybersecurity SOC (High Demand)', query: 'Cyber Security', color: 'emerald' },
        { label: 'Cloud Infrastructure', query: 'Cloud', color: 'emerald' },
        { label: 'Data Engineering', query: 'Data Engineering', color: 'emerald' },
        { label: 'COPA Data Entry (Obsolete)', query: 'Data Entry', color: 'rose' }
      ],
      defaultFlaggedCourseId: 'c-copa-legacy',
      defaultAlternativeCourseId: 'c-cloud-cyber'
    };
  }

  if (domain === 'solar_renewable') {
    return {
      primarySectors: language === 'mr' ? 'रूफटॉप सोलर व ग्रीन एनर्जी' : 'Rooftop Solar & Green Energy',
      placementRate: 88,
      placementRateLabel: language === 'mr' ? 'सोलर रूफटॉप व ग्रिड तंत्रज्ञ दर' : 'Solar Rooftop & Grid Technician Rate',
      decliningRate: 38,
      decliningRateLabel: language === 'mr' ? 'पारंपरिक डोमेस्टिक वायरमन' : 'Traditional Domestic Wireman Intake',
      demandGap: 11200,
      demandGapLabel: language === 'mr' ? 'पीएम-सूर्यघर प्रमाणित तंत्रज्ञ गरज' : 'PM-Surya Ghar Certified Technician Gap',
      searchChips: [
        { label: 'Solar PV (High Demand)', query: 'Solar', color: 'emerald' },
        { label: 'Automation Electrician', query: 'Automation', color: 'emerald' },
        { label: 'Manual Wireman (Saturated)', query: 'Wireman', color: 'amber' }
      ],
      defaultFlaggedCourseId: 'c-bench-fitter',
      defaultAlternativeCourseId: 'c-solar-pv'
    };
  }

  if (domain === 'healthcare') {
    return {
      primarySectors: language === 'mr' ? 'बायोमेडिकल व हॉस्पिटल टेलिमेट्री' : 'Biomedical & Healthcare Telemetry',
      placementRate: 94,
      placementRateLabel: language === 'mr' ? 'बायोमेडिकल उपकरण तंत्रज्ञ दर' : 'Biomedical Device Specialist Placement',
      decliningRate: 40,
      decliningRateLabel: language === 'mr' ? 'पारंपरिक वॉर्ड असिस्टंट' : 'Manual Ward Attendant Intake',
      demandGap: 8600,
      demandGapLabel: language === 'mr' ? 'सुपर-स्पेशालिटी हॉस्पिटल तंत्रज्ञ तुटवडा' : 'Super-Specialty Hospital Tech Shortfall',
      searchChips: [
        { label: 'Biomedical Specialist (High Demand)', query: 'Biomedical', color: 'emerald' },
        { label: 'ICU Telemetry', query: 'Telemetry', color: 'emerald' }
      ],
      defaultFlaggedCourseId: 'c-bench-fitter',
      defaultAlternativeCourseId: 'c-biomedical-eng'
    };
  }

  // Default: Automobile & EV
  return {
    primarySectors: language === 'mr' ? 'इलेक्ट्रिक वाहने (EV) व बॅटरी पॉवरट्रेन' : 'Electric Vehicles (EV) & Powertrain',
    placementRate: 86,
    placementRateLabel: language === 'mr' ? 'ईव्ही व स्वच्छ ऊर्जा प्लेसमेंट दर' : 'EV & Clean Energy Placement Rate',
    decliningRate: 36,
    decliningRateLabel: language === 'mr' ? 'पारंपरिक फिटर / मेकॅनिक दर' : 'Traditional ICE Fitter Placement Rate',
    demandGap: 14200,
    demandGapLabel: language === 'mr' ? 'स्थानिक औद्योगिक तुटवडा (MIDC)' : 'EV & Auto Component Gap Across MIDCs',
    searchChips: [
      { label: 'EV Powertrain (High Demand)', query: 'EV', color: 'emerald' },
      { label: 'CNC Machining', query: 'CNC', color: 'emerald' },
      { label: 'ICE Mechanic (Obsolete)', query: 'ICE Engine', color: 'rose' },
      { label: 'Fitter (Oversupplied)', query: 'Fitter', color: 'amber' }
    ],
    defaultFlaggedCourseId: 'c-ice-mechanic',
    defaultAlternativeCourseId: 'c-ev-powertrain'
  };
}

/**
 * Filter and prioritize courses for a given candidate profile
 */
export function rankCoursesForCandidate(
  courses: CourseItem[],
  profile: CandidateProfile
): CourseItem[] {
  const domain = detectDomain(profile);

  return [...courses].sort((a, b) => {
    const scoreA = computeCourseScore(a, domain, profile);
    const scoreB = computeCourseScore(b, domain, profile);
    return scoreB - scoreA;
  });
}

function computeCourseScore(
  course: CourseItem,
  domain: CandidateDomainType,
  profile: CandidateProfile
): number {
  let score = 0;
  const courseText = `${course.name} ${course.sector} ${course.description} ${course.curriculumHighlights.join(' ')}`.toLowerCase();

  // Domain affinity
  if (domain === 'it_cyber') {
    if (courseText.includes('cyber') || courseText.includes('soc')) score += 100;
    if (courseText.includes('data engineering') || courseText.includes('cloud')) score += 80;
    if (courseText.includes('ai') || courseText.includes('software')) score += 70;
    if (courseText.includes('embedded') || courseText.includes('semiconductor')) score += 40;
    // Lower priority for pure automotive/diesel
    if (courseText.includes('carburettor') || courseText.includes('ice diesel') || courseText.includes('fitter')) score -= 60;
    if (courseText.includes('ev powertrain')) score -= 20;
  } else if (domain === 'auto_ev') {
    if (courseText.includes('ev powertrain') || courseText.includes('battery diagnostic')) score += 100;
    if (courseText.includes('cnc') || courseText.includes('iiot') || courseText.includes('robotics')) score += 80;
    if (courseText.includes('solar')) score += 50;
    if (courseText.includes('cyber') || courseText.includes('software')) score -= 20;
  } else if (domain === 'solar_renewable') {
    if (courseText.includes('solar')) score += 100;
    if (courseText.includes('electrician') || courseText.includes('iiot')) score += 70;
  } else if (domain === 'healthcare') {
    if (courseText.includes('biomedical') || courseText.includes('hospital')) score += 100;
  }

  // District match
  if (course.district && profile.district && course.district.toLowerCase() === profile.district.toLowerCase()) {
    score += 15;
  }

  // Flagged courses go below active high-demand courses unless specifically searched
  if (course.isFlagged) {
    score -= 30;
  } else if (course.status === 'High demand') {
    score += 20;
  }

  return score;
}

/**
 * Filter and prioritize jobs for candidate
 */
export function rankJobsForCandidate(
  jobs: JobMatchItem[],
  profile: CandidateProfile
): JobMatchItem[] {
  const domain = detectDomain(profile);

  return [...jobs].sort((a, b) => {
    const scoreA = computeJobScore(a, domain, profile);
    const scoreB = computeJobScore(b, domain, profile);
    return scoreB - scoreA;
  });
}

function computeJobScore(
  job: JobMatchItem,
  domain: CandidateDomainType,
  profile: CandidateProfile
): number {
  let score = job.matchScore || 70;
  const jobText = `${job.title} ${job.company} ${job.requiredSkills.join(' ')}`.toLowerCase();

  if (domain === 'it_cyber') {
    if (jobText.includes('cyber') || jobText.includes('soc') || jobText.includes('security')) score += 60;
    if (jobText.includes('cloud') || jobText.includes('devops') || jobText.includes('software') || jobText.includes('python')) score += 50;
    if (jobText.includes('ev powertrain') || jobText.includes('solar')) score -= 40;
  } else if (domain === 'auto_ev') {
    if (jobText.includes('ev') || jobText.includes('powertrain') || jobText.includes('motor')) score += 60;
    if (jobText.includes('cyber') || jobText.includes('software')) score -= 30;
  } else if (domain === 'solar_renewable') {
    if (jobText.includes('solar') || jobText.includes('grid')) score += 60;
  }

  return score;
}

/**
 * Get domain-tailored Skill Passport credentials
 */
export function getDomainPassportItems(
  domain: CandidateDomainType,
  language: SupportedLang
): SkillPassportItem[] {
  if (domain === 'it_cyber') {
    return [
      {
        id: 'pass-cyber-1',
        title: 'Network Defense & Linux System Administration (Level 2)',
        marathiTitle: 'नेटवर्क डिफेन्स व लिनक्स सिस्टीम अ‍ॅडमिनिस्ट्रेशन (स्तर २)',
        issuer: 'NCVET / NASSCOM FutureSkills Prime',
        issueDate: '15 Jan 2026',
        verificationId: 'NCVET-MH-2026-CYB-10842',
        verified: true,
        skillsAcquired: ['TCP/IP Packet Filtering', 'Linux PAM & Firewall Rules (iptables/ufw)', 'SSH Key Authentication']
      },
      {
        id: 'pass-cyber-2',
        title: 'Python Scripting & OWASP Web Security Fundamentals',
        marathiTitle: 'पायथन स्क्रिप्टिंग व ओवास्प वेब सिक्युरिटी',
        issuer: 'Directorate of Vocational Education & Training, Maharashtra (DVET)',
        issueDate: '24 Feb 2026',
        verificationId: 'DVET-PUN-CYB-77401',
        verified: true,
        skillsAcquired: ['SQL Injection Prevention', 'API Token Authentication (JWT)', 'Automated Vulnerability Probing']
      },
      {
        id: 'pass-cyber-3',
        title: 'Diploma in Computer Engineering / IT (Class 12 Equivalent - 82.6%)',
        marathiTitle: 'संगणक अभियांत्रिकी पदविका (८२.६%)',
        issuer: 'Maharashtra State Board of Technical Education (MSBTE) via DigiLocker',
        issueDate: 'June 2024',
        verificationId: 'DL-MSBTE-2024-99120',
        verified: true,
        skillsAcquired: ['Data Structures', 'Operating Systems', 'Relational Databases (MySQL)']
      }
    ];
  }

  // Automobile & EV Default
  return [
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
}
