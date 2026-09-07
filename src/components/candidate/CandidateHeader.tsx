import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CandidateProfile } from '../../types/candidate';
import { MOCK_NOTIFICATIONS } from '../../data/candidateMockData';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import {
  Flame,
  Bell,
  User,
  Sliders,
  Bookmark,
  LogOut,
  ChevronDown,
  Globe,
  Wifi,
  WifiOff,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  BookOpen
} from 'lucide-react';

interface CandidateHeaderProps {
  profile: CandidateProfile;
  language: SupportedLang;
  onLanguageChange: (lang: SupportedLang) => void;
  onToggleLiteMode: () => void;
  onOpenPreferences: () => void;
  onOpenStreakModal: () => void;
  onOpenSavedCourses: () => void;
  onOpenCounselorModal: () => void;
  onOpenDiagnosticModal?: () => void;
  onOpenSurveyModal?: () => void;
}

export const CandidateHeader: React.FC<CandidateHeaderProps> = ({
  profile,
  language,
  onLanguageChange,
  onToggleLiteMode,
  onOpenPreferences,
  onOpenStreakModal,
  onOpenSavedCourses,
  onOpenCounselorModal,
  onOpenDiagnosticModal,
  onOpenSurveyModal
}) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language];

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      {/* Top micro-strip for government identity */}
      <div className="bg-[#0C2340] text-slate-200 text-[11px] px-3 sm:px-6 py-1 flex items-center justify-between border-b border-blue-900/60">
        <div className="flex items-center space-x-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-medium truncate">{t.portalTagline}</span>
        </div>
        <div className="flex items-center space-x-3 shrink-0 text-[10px] sm:text-xs">
          <button
            onClick={onOpenCounselorModal}
            className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 hidden sm:inline"
          >
            {t.counselorConnectBtn}
          </button>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-300 font-mono">DPDP-Compliant</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-[#0C2340] flex items-center justify-center text-white font-serif font-black text-lg border border-amber-500/40 shadow-xs group-hover:bg-blue-950 transition-colors">
              KS
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                  Kaushal Setu
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                  Candidate
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {t.portalTitle}
              </p>
            </div>
          </Link>
        </div>

        {/* Right: Controls, Streak, Notification, Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Lite Mode Toggle Pill */}
          <button
            onClick={onToggleLiteMode}
            title={profile.liteMode ? t.liteModeOn : t.liteModeOff}
            className={`hidden md:flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full border transition-all ${
              profile.liteMode
                ? 'bg-amber-100 border-amber-300 text-amber-900 ring-1 ring-amber-400'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            aria-label="Toggle lite mode"
          >
            {profile.liteMode ? (
              <WifiOff className="w-3.5 h-3.5 text-amber-700" />
            ) : (
              <Wifi className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="text-[11px]">{profile.liteMode ? 'Lite On' : 'Lite Mode'}</span>
          </button>

          {/* Language Switcher Button */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-xs font-bold">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'en'
                  ? 'bg-white text-blue-950 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'mr'
                  ? 'bg-white text-blue-950 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="मराठीत बदला"
            >
              मराठी
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 rounded transition-colors ${
                language === 'hi'
                  ? 'bg-white text-blue-950 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label="हिन्दी में बदलें"
            >
              हिन्दी
            </button>
          </div>

          {/* Streak Indicator (Right-aligned flame icon with count) */}
          <button
            onClick={onOpenStreakModal}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-300/80 px-2.5 py-1.5 rounded-full shadow-2xs transition-all active:scale-95 group focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            aria-label={`Current streak is 5 days. Click to view activity calendar.`}
            title="Click to view streak calendar"
          >
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500 group-hover:scale-110 transition-transform animate-pulse" />
            <span className="text-xs font-black text-amber-900 font-mono">5</span>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider hidden sm:inline">
              days
            </span>
          </button>

          {/* Notification Bell with Badge & Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              aria-label={`Notifications, ${unreadCount} unread`}
              aria-expanded={isNotifOpen}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm">{t.notifications}</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[11px] text-blue-700 hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-slate-500">No notifications.</p>
                  ) : (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        className={`p-3 hover:bg-slate-50 transition-colors flex items-start space-x-2.5 ${
                          !notif.read ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {notif.type === 'job' && <Briefcase className="w-4 h-4 text-emerald-600" />}
                          {notif.type === 'course' && <BookOpen className="w-4 h-4 text-blue-600" />}
                          {notif.type === 'streak' && <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />}
                          {notif.type === 'counselor' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-800 leading-snug">{notif.title}</p>
                          <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{notif.date}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 p-1 pl-2 pr-1.5 rounded-full hover:bg-slate-100 border border-slate-200 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              aria-label="Open profile menu"
              aria-expanded={isProfileMenuOpen}
            >
              <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                {profile.isAnonymous ? 'Candidate (Anon)' : profile.displayName}
              </span>
              <div className="w-7 h-7 rounded-full bg-[#0C2340] text-amber-300 font-bold text-xs flex items-center justify-center ring-2 ring-amber-400/40">
                {profile.displayName.charAt(0)}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden text-xs py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 bg-slate-50 border-b border-slate-200">
                  <p className="font-bold text-slate-900">{profile.name}</p>
                  <p className="text-[11px] text-slate-500 font-mono truncate">{profile.instituteName}</p>
                  <div className="mt-1 flex items-center space-x-1.5 text-[10px] text-emerald-700 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>District: {profile.district}</span>
                  </div>
                </div>

                {onOpenSurveyModal && (
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenSurveyModal();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center space-x-2 text-blue-900 font-semibold"
                  >
                    <Sliders className="w-3.5 h-3.5 text-blue-600" />
                    <span>Skill &amp; Aim Check-In (Part A)</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onOpenPreferences();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center space-x-2 text-slate-700"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.editPreferences}</span>
                </button>

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onOpenSavedCourses();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center space-x-2 text-slate-700"
                >
                  <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {t.savedCoursesTab} ({profile.savedCourseIds?.length || 0})
                  </span>
                </button>

                <div className="border-t border-slate-100 my-1"></div>

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-700 flex items-center space-x-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.logout}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
