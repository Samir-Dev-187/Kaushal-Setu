export type AnswerType =
  | 'mcq'
  | 'rating_scale'
  | 'multi_select'
  | 'open_text'
  | 'ranking'
  | 'dropdown'
  | 'yes_no'
  | 'upvote_suggestion'
  | 'location_relocation'
  | 'yes_no_text';

export interface QuestionnaireItem {
  id: string; // e.g. 'A1', 'A2', ... 'A25' or 'B1' ... 'B25'
  number: number;
  sectionId: string; // e.g. 'A1', 'A2', 'B1'
  sectionTitle: string;
  tag: string; // Suggested Answer Type label from PDF, e.g. "MCQ: Student / Recent Graduate..."
  conversationalIntro?: string;
  question: string;
  answerType: AnswerType;
  options?: string[];
  placeholder?: string;
  minRating?: number;
  maxRating?: number;
  ratingLabels?: { min: string; max: string };
  maxSelections?: number;
  helperText?: string;
  // Adaptive condition: returns true if this question should be asked given current answers
  condition?: (answers: Record<string, any>) => boolean;
}

export interface EmployerSuggestionItem {
  id: string;
  sector: string;
  text: string;
  upvotes: number;
  submittedBy: string;
  timestamp: string;
  userVoted?: 'up' | 'down';
}

export interface CandidateSurveyResult {
  completedAt: string;
  answers: Record<string, any>;
  skillVector: {
    primaryField: string;
    targetRole: string;
    strongestSkillRating: number;
    urgencyLevel: number;
    skills: string[];
    weakestSpots: string[];
    preferredIndustries: string[];
    preferredMode: string;
  };
  totalAnswered: number;
}

export interface EmployerSurveyResult {
  completedAt: string;
  answers: Record<string, any>;
  sector: string;
  companySize: string;
  submittedSuggestion?: string;
  upvotedIds: string[];
  hiringExpectation: 'Rise' | 'Fall' | 'No change' | 'Not sure';
  readinessRating: number;
  totalAnswered: number;
}
