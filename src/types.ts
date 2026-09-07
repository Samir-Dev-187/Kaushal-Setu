export type UserRole = 'training-centre' | 'employer' | 'candidate' | 'admin';

export interface UserSession {
  role: UserRole;
  userId: string;
  userName: string;
  orgName?: string;
  email?: string;
  mobile?: string;
  isOtpVerified: boolean;
}

export interface HeroSlideData {
  id: number;
  category: string;
  title: string;
  text: string;
  ctaText: string;
  ctaAction: string;
  secondaryCtaText?: string;
  secondaryCtaAction?: string;
  badge: string;
  highlights: string[];
  visualType: 'stakeholders' | 'signals' | 'sectors' | 'curriculum' | 'training' | 'candidate' | 'employer' | 'governance' | 'rural' | 'ecosystem';
}

export interface DistrictData {
  id: string;
  name: string;
  marathiName: string;
  region: 'Western Maharashtra' | 'Vidarbha' | 'Marathwada' | 'Konkan' | 'North Maharashtra';
  trainingEcosystem: string[];
  skillAssessmentStatus: 'Monitored & Active' | 'Expanding' | 'Scheduled';
  highGrowthSectors: string[];
  topSkills: string[];
  demandLevel: 'VERY HIGH' | 'HIGH' | 'MODERATE';
  trainingCapacity: 'HIGH' | 'MEDIUM' | 'EMERGING';
  potentialSkillGap: string;
  recommendedFocus: string;
  activeInstitutesCount: number;
  openSkillVacancies: number;
  coordinates: { x: number; y: number }; // Relative SVG positioning
  lat?: number;
  lng?: number;
}

export interface QuickServiceItem {
  id: string;
  title: string;
  marathiTitle?: string;
  hindiTitle?: string;
  description: string;
  marathiDescription?: string;
  hindiDescription?: string;
  iconName: string;
  targetRole: UserRole;
  path: string;
  badge?: string;
}

export interface UpdateItem {
  id: string;
  title: string;
  category: 'Skill Demand' | 'Curriculum' | 'District Planning' | 'Employer Survey' | 'Pilot Initiative';
  date: string;
  summary: string;
  tag: string;
}

export interface SchemeItem {
  id: string;
  name: string;
  abbr: string;
  type: 'Central Initiative' | 'State Initiative' | 'Certification' | 'Apprenticeship';
  description: string;
  targetAudience: string;
}
