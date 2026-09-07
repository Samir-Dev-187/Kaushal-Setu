export type ProviderType = 'offline' | 'online';

export interface ProviderProfile {
  id: string;
  name: string;
  campusName: string;
  district: string;
  state: string;
  providerType: ProviderType;
  affiliation: string;
  registrationNumber: string;
  verified: boolean;
  profileCompletion: number;
  lastIntelligenceUpdate: string;
  statusText: string;
  totalStudents: number;
  totalTrainers: number;
  establishedYear: number;
  contactEmail: string;
  contactPhone: string;
  address: string;
  website: string;
}

export interface CourseCatalogueItem {
  id: string;
  code: string;
  name: string;
  sector: string;
  nsqfLevel: number;
  qualificationCode: string;
  status: 'Current' | 'Review' | 'Oversupplied' | 'Expand' | 'Obsolete';
  marketDemand: 'VERY HIGH' | 'HIGH' | 'MEDIUM' | 'LOW';
  placementRate: number;
  prevPlacementRate: number;
  techObsolescenceRisk: 'HIGH' | 'MEDIUM' | 'LOW';
  techRiskExplanation: string;
  oversupplyRisk: 'HIGH' | 'MEDIUM' | 'LOW';
  oversupplyExplanation: string;
  alignmentScore: number;
  annualCapacity: number;
  currentEnrolment: number;
  annualGraduates: number;
  durationMonths: number;
  dimensionalHealth: {
    curriculum: number;
    industryDemand: number;
    trainerReadiness: number;
    equipmentReadiness: number;
    assessmentReadiness: number;
    placementOutcomes: number;
  };
  demandTrend3Yr: 'Growing' | 'Stable' | 'Declining';
  historicalDemand: { year: string; demand: number; seats: number; placed: number }[];
  topMissingSkills: string[];
  currentCurriculumModules: string[];
  recommendedAddModules: string[];
  recommendedUpdateModules: string[];
  recommendedReduceModules: string[];
  aiRecommendationSummary: string;
  aiConfidenceScore: number;
}

export interface PriorityActionItem {
  id: string;
  number: number;
  title: string;
  targetCourseOrArea: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  reason: string;
  ctaText: string;
  actionRouteOrType: string;
}

export interface GovernmentNoticeItem {
  id: string;
  title: string;
  authority: string;
  date: string;
  deadline: string;
  priority: 'Important' | 'Action Required' | 'Information' | 'Deadline';
  description: string;
  pdfFileName: string;
  isRead: boolean;
  actionRequired: boolean;
  status: 'Active' | 'Under Review' | 'Completed';
}

export interface TrainerItem {
  id: string;
  name: string;
  roleTitle: string;
  qualification: string;
  experienceYears: number;
  specialization: string;
  currentSkills: string[];
  requiredSkills: string[];
  certificationStatus: 'Certified' | 'In Progress' | 'Not Started' | 'Action Required';
  progressPercent: number;
  skillGap: string;
  recommendedCourses: string[];
  oemPartners: string[];
  lastCertifiedDate?: string;
  email: string;
  phone: string;
}

export interface EquipmentUpgradeItem {
  id: string;
  name: string;
  category: 'EV Systems' | 'Solar Tech' | 'Automation' | 'Safety' | 'Diagnostic Tool';
  estimatedCostLakhs: number;
  priority: 'Critical' | 'High' | 'Medium';
  studentsImpactedPerYear: number;
  targetCourse: string;
  requiredFor: string;
  budgetTier: 'Low' | 'Medium' | 'Full Modernization';
  status: 'Recommended' | 'Requested' | 'Approved' | 'Procured';
  recommendedVendorSpecs: string;
}

export interface OnlineContentItem {
  id: string;
  courseName: string;
  moduleName: string;
  freshnessScore: number;
  videoCoveragePercent: number;
  practicalSimulationAvailable: boolean;
  assessmentCoveragePercent: number;
  status: 'Fresh' | 'Update Recommended' | 'Missing Content';
  recommendationText: string;
  interactiveAdditions: string[];
}

export type RequestType =
  | 'Equipment Request'
  | 'Trainer Certification'
  | 'Curriculum Revision'
  | 'Assessment Modernization'
  | 'Government Submission';

export interface RequestApplicationItem {
  id: string;
  title: string;
  type: RequestType;
  submittedDate: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Completed' | 'Rejected';
  stageTimeline: { stage: string; date?: string; completed: boolean; current?: boolean }[];
  referenceNumber: string;
  notes: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'Government' | 'AI Intelligence' | 'Curriculum' | 'Industry' | 'Trainer' | 'Equipment' | 'Placement';
  isRead: boolean;
  priority: 'critical' | 'warning' | 'info';
  linkTarget?: string;
}

export interface IndustryUpdateItem {
  id: string;
  sector: string;
  trendTitle: string;
  headline: string;
  skillImpact: string;
  recommendedAction: string;
  date: string;
  clusterLocation: string;
}

export interface HumanValidationReview {
  courseId: string;
  courseName: string;
  currentStage: 'AI Draft' | 'Training Centre Review' | 'Employer Review' | 'Sector Skill Council' | 'Academic Review' | 'Approved' | 'Implementation';
  progressIndex: number;
  aiDraftedDate: string;
  reviewedByCentre: boolean;
  reviewedByEmployer: boolean;
  statusText: 'Draft' | 'Under Review' | 'Revision Required' | 'Approved';
  reviewNotes: string[];
}
