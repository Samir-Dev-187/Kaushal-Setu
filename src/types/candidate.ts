export type CandidateAim = 'job-urgent' | 'new-skill' | 'switch-career' | 'exploring';

export type CandidateQualification =
  | '10th'
  | '12th'
  | 'ITI certificate'
  | 'Polytechnic Diploma'
  | 'B.E / B.Tech Engineering'
  | 'Medical / Allied Healthcare Degree'
  | 'B.Sc / M.Sc Domain Specialist'
  | 'Post-Graduate / MBA'
  | 'Other Specialization';

export type CandidateStatus = 'studying' | 'completed-seeking' | 'currently-working';

export type CourseStatus = 'High demand' | 'Current' | 'Oversupplied' | 'Obsolete';

export interface CandidateProfile {
  id: string;
  name: string;
  displayName: string;
  isAnonymous: boolean;
  email: string;
  phone: string;
  aim: CandidateAim;
  highestQualification: CandidateQualification;
  instituteName: string;
  tradeOrField: string;
  currentStatus: CandidateStatus;
  workExperienceYears: number;
  sectorsOfInterest: string[];
  district: string;
  liteMode: boolean;
  language: 'en' | 'mr' | 'hi';
  onboardingCompleted: boolean;
  savedCourseIds: string[];
  points: number;
  rank: number;
  pointsToNextRank: number;
  domainAssessment?: DomainProficiencyAssessment;
}

export interface SkillProficiencyMetric {
  skillName: string;
  candidateLevel: number; // 1 to 5 scale
  industryDemandedLevel: number; // 1 to 5 scale
  gap: number; // industryDemandedLevel - candidateLevel
  districtDeficitPercent: number; // % shortage in MIDC cluster
  recommendedAction: string;
}

export interface DomainProficiencyAssessment {
  domainName: string;
  assessedScore: number; // 0 - 100
  overallLevel: 'Novice' | 'Practitioner' | 'Proficient' | 'Advanced Specialist' | 'Industry Master';
  industryMatchPercent: number; // % match with current MIDC employer demand
  skills: SkillProficiencyMetric[];
  lastAssessedDate?: string;
}

export interface ObsolescenceWarning {
  reason: string;
  marathiReason: string;
  placementDrop: string;
  jobWaitMonths: string;
  startingPayOld: string;
  alternativeCourseId: string;
  alternativeCourseName: string;
  marathiAlternativeName: string;
  betterPlacementRate: number;
  betterAvgStartingSalary: string;
  modernSkillsAdded: string[];
}

export interface CourseItem {
  id: string;
  name: string;
  marathiName: string;
  district: string;
  institute: string;
  duration: string;
  sector: string;
  status: CourseStatus;
  placementRate: number;
  avgStartingSalary: string;
  personalizationBadge?: string;
  isFlagged?: boolean;
  obsolescenceWarning?: ObsolescenceWarning;
  description: string;
  marathiDescription: string;
  curriculumHighlights: string[];
  eligibility: string;
  seatsTotal: number;
  seatsAvailable: number;
  virtualLabAvailable?: boolean;
  virtualLabTitle?: string;
  virtualLabUrl?: string;
}

export interface OutlookSector {
  id: string;
  name: string;
  marathiName: string;
  type: 'rising' | 'declining';
  reason: string;
  marathiReason: string;
  trendIndicator: string;
  hiringDelta: string;
  relevantTags: string[];
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  district: string;
  points: number;
  isCurrentUser?: boolean;
  assessmentsCompleted: number;
  verifiedCertificates: number;
  modulesFinished: number;
  streakDays: number;
}

export interface SkillPassportItem {
  id: string;
  title: string;
  marathiTitle: string;
  issuer: string;
  issueDate: string;
  verificationId: string;
  verified: boolean;
  skillsAcquired: string[];
  credentialUrl?: string;
}

export interface JobMatchItem {
  id: string;
  title: string;
  marathiTitle: string;
  company: string;
  location: string;
  type: 'Apprenticeship' | 'Full-time' | 'NAPS Apprenticeship';
  stipend: string;
  matchScore: number;
  requiredSkills: string[];
  deadline: string;
  openings: number;
}

export interface StreakHistoryDay {
  date: string;
  dayLabel: string;
  active: boolean;
  activityName?: string;
}

export interface CandidateNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'job' | 'course' | 'streak' | 'counselor';
}

export interface AchievementBadge {
  id: string;
  title: string;
  marathiTitle: string;
  description: string;
  unlocked: boolean;
  iconName: string;
  unlockedAt?: string;
}
