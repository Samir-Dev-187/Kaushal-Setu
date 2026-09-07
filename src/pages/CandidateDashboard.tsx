import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CandidateProfile, CourseItem } from '../types/candidate';
import {
  DEFAULT_CANDIDATE_PROFILE,
  MOCK_COURSES
} from '../data/candidateMockData';
import { SupportedLang, TRANSLATIONS } from '../data/candidateTranslations';

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
import { CandidateOnboardingModal } from '../components/candidate/CandidateOnboardingModal';
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
        return JSON.parse(saved);
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

  // Trigger Onboarding if candidate hasn't completed it
  useEffect(() => {
    if (!profile.onboardingCompleted) {
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

  // Onboarding Complete Handler
  const handleOnboardingComplete = (completedData: Partial<CandidateProfile>) => {
    updateProfile(completedData);
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
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Personalized Hero with Course-Check Search & Live Count-ups */}
        <PersonalizedHero
          profile={profile}
          language={language}
          onSelectCourse={course => setSelectedDetailCourse(course)}
        />

        {/* 2. Before You Enroll: Working Live Enrollment-Time Interrupt Demonstration */}
        <EnrollmentInterruptSection
          language={language}
          onSelectAlternative={handleSelectAlternativeFromInterrupt}
        />

        {/* 3. Your Outlook: 2-Column Hairline Divider Ledger of Rising vs Declining Trades */}
        <OutlookLedger
          profile={profile}
          language={language}
          onSelectSector={sectorName => {
            const matchedCourse = MOCK_COURSES.find(c =>
              c.sector.toLowerCase().includes(sectorName.toLowerCase().slice(0, 4))
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
            const evCourse = MOCK_COURSES.find(c => c.id === 'c-ev-powertrain');
            if (evCourse) setSelectedDetailCourse(evCourse);
          }}
        />

        {/* 6. Matched NAPS Apprenticeships & Job Openings */}
        <MatchedJobsSection
          profile={profile}
          language={language}
          onViewJob={() => setIsCounselorOpen(true)}
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
      {/* 1. Onboarding Questionnaire */}
      <CandidateOnboardingModal
        isOpen={isOnboardingOpen}
        onCancel={() => setIsOnboardingOpen(false)}
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
