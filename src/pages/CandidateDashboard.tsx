import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CandidateProfile, CourseItem } from '../types/candidate';
import {
  DEFAULT_CANDIDATE_PROFILE,
  DEMO_CYBER_CANDIDATE_PROFILE,
  MOCK_COURSES
} from '../data/candidateMockData';
import { SupportedLang, TRANSLATIONS } from '../data/candidateTranslations';
import { detectDomain } from '../utils/candidateDomain';
import { Laptop, Car, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

// Sub-components
import { CandidateHeader } from '../components/candidate/CandidateHeader';
import { PersonalizedHero } from '../components/candidate/PersonalizedHero';
import { EnrollmentInterruptSection } from '../components/candidate/EnrollmentInterruptSection';
import { OutlookLedger } from '../components/candidate/OutlookLedger';
import { RecommendedCoursesList } from '../components/candidate/RecommendedCoursesList';
import { ReskillingPathwayCard } from '../components/candidate/ReskillingPathwayCard';
import { MatchedJobsSection } from '../components/candidate/MatchedJobsSection';
import { SkillPassportSection } from '../components/candidate/SkillPassportSection';
import { CommunityLeaderboard } from '../components/candidate/CommunityLeaderboard';
import { AskSetuFloatingChat } from '../components/candidate/AskSetuFloatingChat';

// Modals
import { CandidateConversationalSurveyModal } from '../components/candidate/CandidateConversationalSurveyModal';
import { StreakModal } from '../components/candidate/StreakModal';
import { CourseCompareModal } from '../components/candidate/CourseCompareModal';
import { CandidateProfileModal } from '../components/candidate/CandidateProfileModal';
import { CounselorBookingModal } from '../components/candidate/CounselorBookingModal';
import { CourseDetailModal } from '../components/candidate/CourseDetailModal';

const STORAGE_KEY = 'kaushal_candidate_profile';

export const CandidateDashboard: React.FC = () => {
  const { language, setLanguage } = useAuth();

  // Load candidate profile from localStorage or default
  const [profile, setProfile] = useState<CandidateProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CANDIDATE_PROFILE,
          ...parsed,
          id: parsed.id || DEFAULT_CANDIDATE_PROFILE.id,
          name: parsed.name || DEFAULT_CANDIDATE_PROFILE.name,
          displayName: parsed.displayName || parsed.name || DEFAULT_CANDIDATE_PROFILE.displayName,
          district: parsed.district || DEFAULT_CANDIDATE_PROFILE.district,
          sectorsOfInterest: Array.isArray(parsed.sectorsOfInterest) && parsed.sectorsOfInterest.length > 0
            ? parsed.sectorsOfInterest
            : DEFAULT_CANDIDATE_PROFILE.sectorsOfInterest,
          savedCourseIds: Array.isArray(parsed.savedCourseIds)
            ? parsed.savedCourseIds
            : DEFAULT_CANDIDATE_PROFILE.savedCourseIds
        };
      } catch (e) {
        console.error('Failed to parse candidate profile from storage', e);
      }
    }
    return DEFAULT_CANDIDATE_PROFILE;
  });

  const t = TRANSLATIONS[language];

  // Save profile changes to localStorage
  const updateProfile = (updated: Partial<CandidateProfile>) => {
    if (updated.language && updated.language !== language) {
      setLanguage(updated.language);
    }
    setProfile(prev => {
      const next = { ...prev, ...updated, language };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  // Keep profile language synced with global language
  useEffect(() => {
    if (profile.language !== language) {
      setProfile(prev => ({ ...prev, language }));
    }
  }, [language]);

  // Modal States
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isStreakOpen, setIsStreakOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileModalTab, setProfileModalTab] = useState<
    'preferences' | 'badges' | 'saved' | 'notifications'
  >('preferences');
  const [isCounselorOpen, setIsCounselorOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareBaseCourse, setCompareBaseCourse] = useState<CourseItem | null>(null);
  const [selectedDetailCourse, setSelectedDetailCourse] = useState<CourseItem | null>(null);

  // Trigger Onboarding / Conversational Survey if candidate hasn't completed it or right after first login / account creation
  useEffect(() => {
    const isNew = localStorage.getItem('kaushal_candidate_new_account') === 'true';
    const surveyDone = localStorage.getItem('kaushal_candidate_survey_completed') === 'true';
    if (isNew || !profile.onboardingCompleted || !surveyDone) {
      setIsOnboardingOpen(true);
    }
  }, [profile.onboardingCompleted]);

  // Language Change Handler
  const handleLanguageChange = (newLang: SupportedLang) => {
    setLanguage(newLang);
    updateProfile({ language: newLang });
  };

  // Lite Mode Toggle Handler
  const handleToggleLiteMode = () => {
    updateProfile({ liteMode: !profile.liteMode });
  };

  // Course Bookmark Toggle
  const handleToggleBookmark = (courseId: string) => {
    const saved = profile.savedCourseIds || [];
    const exists = saved.includes(courseId);
    const updated = exists ? saved.filter(id => id !== courseId) : [...saved, courseId];
    updateProfile({ savedCourseIds: updated });
  };

  // Compare Handler
  const handleOpenCompare = (course: CourseItem) => {
    setCompareBaseCourse(course);
    setIsCompareOpen(true);
  };

  // Onboarding & Check-In Complete Handler
  const handleOnboardingComplete = (completedData: Partial<CandidateProfile>) => {
    updateProfile(completedData);
    localStorage.setItem('kaushal_candidate_survey_completed', 'true');
    localStorage.removeItem('kaushal_candidate_new_account');
    setIsOnboardingOpen(false);
  };

  // Anonymity Toggle Handler
  const handleToggleAnonymous = () => {
    updateProfile({ isAnonymous: !profile.isAnonymous });
  };

  // Alternative Selection from Interrupt Section
  const handleSelectAlternativeFromInterrupt = (courseId: string) => {
    const target = MOCK_COURSES.find(c => c.id === courseId);
    if (target) {
      setSelectedDetailCourse(target);
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-100 text-slate-900 flex flex-col ${
        profile.liteMode ? 'lite-mode-active' : ''
      }`}
    >
      {/* Top Candidate Header */}
      <CandidateHeader
        profile={profile}
        language={language}
        onLanguageChange={handleLanguageChange}
        onToggleLiteMode={handleToggleLiteMode}
        onOpenPreferences={() => {
          setProfileModalTab('preferences');
          setIsProfileModalOpen(true);
        }}
        onOpenStreakModal={() => setIsStreakOpen(true)}
        onOpenSavedCourses={() => {
          setProfileModalTab('saved');
          setIsProfileModalOpen(true);
        }}
        onOpenCounselorModal={() => setIsCounselorOpen(true)}
        onOpenSurveyModal={() => setIsOnboardingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Demo Persona Switcher Banner for rapid user testing */}
        <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2.5">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-800 text-blue-100 font-extrabold uppercase text-[10px] tracking-wider">
                Testing Mode
              </span>
              <span className="text-slate-300">
                Active Profile:{' '}
                <strong className="text-white">
                  {profile.fullName} ({detectDomain(profile) === 'it_cyber' ? 'Cybersecurity & Software' : 'Automobile & EV'})
                </strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  updateProfile(DEMO_CYBER_CANDIDATE_PROFILE);
                }}
                className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md transition-colors font-medium border ${
                  detectDomain(profile) === 'it_cyber'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title="Switch to Cyber Security & Software candidate"
              >
                <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                <span>Demo: Cyber &amp; Software</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  updateProfile(DEFAULT_CANDIDATE_PROFILE);
                }}
                className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md transition-colors font-medium border ${
                  detectDomain(profile) === 'auto_ev'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title="Switch to Automobile & EV candidate"
              >
                <Car className="w-3.5 h-3.5 text-emerald-400" />
                <span>Demo: Automobile &amp; EV</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOnboardingOpen(true)}
                className="inline-flex items-center space-x-1 px-2 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-medium transition-colors"
                title="Open 15-Question Onboarding Survey"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Survey</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. Personalized Hero with Course-Check Search & Live Count-ups */}
        <PersonalizedHero
          profile={profile}
          language={language}
          onSelectCourse={course => setSelectedDetailCourse(course)}
        />

        {/* 2. Before You Enroll: Working Live Enrollment-Time Interrupt Demonstration */}
        <EnrollmentInterruptSection
          language={language}
          profile={profile}
          onSelectAlternative={handleSelectAlternativeFromInterrupt}
        />

        {/* 3. Your Outlook: 2-Column Hairline Divider Ledger of Rising vs Declining Trades */}
        <OutlookLedger
          profile={profile}
          language={language}
          onSelectSector={sectorName => {
            const cleanQuery = (sectorName || '').toLowerCase().slice(0, 4);
            const matchedCourse = MOCK_COURSES.find(c =>
              (c.sector || '').toLowerCase().includes(cleanQuery)
            );
            if (matchedCourse) {
              setSelectedDetailCourse(matchedCourse);
            }
          }}
        />

        {/* 4. Recommended Courses List (Personalized by Aim & District) */}
        <RecommendedCoursesList
          courses={MOCK_COURSES}
          profile={profile}
          language={language}
          onSelectCourse={course => setSelectedDetailCourse(course)}
          onCompareCourse={handleOpenCompare}
          onToggleBookmark={handleToggleBookmark}
        />

        {/* 5. Reskilling Bridge Card for Working Candidates */}
        <ReskillingPathwayCard
          profile={profile}
          language={language}
          onExplore={() => {
            const domain = detectDomain(profile);
            const targetCourseId = domain === 'it_cyber' ? 'c-cloud-cyber' : 'c-ev-powertrain';
            const matchedCourse = MOCK_COURSES.find(c => c.id === targetCourseId);
            if (matchedCourse) setSelectedDetailCourse(matchedCourse);
          }}
        />

        {/* 6. Matched NAPS Apprenticeships & Job Openings */}
        <MatchedJobsSection
          profile={profile}
          language={language}
          district={profile.district}
        />

        {/* 7. Verified Skill Passport & DigiLocker Sync */}
        <SkillPassportSection
          profile={profile}
          language={language}
        />

        {/* 8. Vocational Learning Leaderboard */}
        <CommunityLeaderboard
          profile={profile}
          language={language}
          onToggleAnonymous={handleToggleAnonymous}
        />
      </main>

      {/* Government Footer */}
      <footer className="bg-[#0C2340] text-slate-300 py-8 px-4 sm:px-6 border-t border-blue-950 text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-bold text-white text-sm">Kaushal Setu — Candidate Portal</p>
            <p className="text-slate-400 text-[11px]">
              Maharashtra State Innovation Society (MSInS) • Dept. of Skills, Employment, Entrepreneurship & Innovation
            </p>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-300">
            <button
              onClick={() => {
                setProfileModalTab('preferences');
                setIsProfileModalOpen(true);
              }}
              className="hover:underline"
            >
              Preferences
            </button>
            <span>•</span>
            <button onClick={() => setIsCounselorOpen(true)} className="hover:underline">
              Career Counselor Callback
            </button>
            <span>•</span>
            <span className="font-mono text-slate-400">v2.4 (2026 Telemetry)</span>
          </div>
        </div>
      </footer>

      {/* Ask Setu Floating Candid Assistant */}
      <AskSetuFloatingChat
        profile={profile}
        language={language}
        onSelectCourse={course => setSelectedDetailCourse(course)}
      />

      {/* --- MODALS --- */}
      {/* 1. Conversational Skill & Aim Check-In (Part A - Max 15 adaptive questions) */}
      <CandidateConversationalSurveyModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onCancel={() => setIsOnboardingOpen(false)}
        existingProfile={profile}
        initialProfile={profile}
        onComplete={handleOnboardingComplete}
      />

      {/* 2. Streak Modal */}
      <StreakModal
        isOpen={isStreakOpen}
        onClose={() => setIsStreakOpen(false)}
        currentStreak={5}
        language={language}
      />

      {/* 3. Course Comparison Modal */}
      <CourseCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        baseCourse={compareBaseCourse}
        language={language}
        onEnroll={courseId => {
          const target = MOCK_COURSES.find(c => c.id === courseId);
          if (target) setSelectedDetailCourse(target);
        }}
      />

      {/* 4. Candidate Profile, Badges & Saved Modal */}
      <CandidateProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        language={language}
        onUpdateProfile={updateProfile}
        onSelectCourse={course => setSelectedDetailCourse(course)}
        initialTab={profileModalTab}
      />

      {/* 5. Counselor Booking Modal */}
      <CounselorBookingModal
        isOpen={isCounselorOpen}
        onClose={() => setIsCounselorOpen(false)}
        language={language}
        candidateDistrict={profile.district}
      />

      {/* 6. Course Detail Modal */}
      <CourseDetailModal
        isOpen={!!selectedDetailCourse}
        onClose={() => setSelectedDetailCourse(null)}
        course={selectedDetailCourse}
        language={language}
        isSaved={!!selectedDetailCourse && (profile.savedCourseIds || []).includes(selectedDetailCourse.id)}
        onToggleBookmark={handleToggleBookmark}
        onCompare={handleOpenCompare}
      />
    </div>
  );
};
