import React, { useState } from 'react';
import { CandidateProfile, CourseItem } from '../../types/candidate';
import { MOCK_ACHIEVEMENT_BADGES, MOCK_COURSES } from '../../data/candidateMockData';
import { MAHARASHTRA_DISTRICTS } from '../../data/mockData';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import {
  User,
  X,
  Award,
  Bookmark,
  Bell,
  Sliders,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Flame,
  Phone,
  Trash2,
  ArrowRight
} from 'lucide-react';

interface CandidateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CandidateProfile;
  language: SupportedLang;
  onUpdateProfile: (updated: Partial<CandidateProfile>) => void;
  onSelectCourse: (course: CourseItem) => void;
  initialTab?: 'preferences' | 'badges' | 'saved' | 'notifications';
}

export const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  language,
  onUpdateProfile,
  onSelectCourse,
  initialTab = 'preferences'
}) => {
  // All hooks MUST be called before any early return (React Rules of Hooks)
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'preferences' | 'badges' | 'saved' | 'notifications'>(
    initialTab
  );

  // Editable fields
  const [displayName, setDisplayName] = useState(profile?.displayName || profile?.name || 'Candidate');
  const [isAnonymous, setIsAnonymous] = useState(!!profile?.isAnonymous);
  const [district, setDistrict] = useState(profile?.district || 'Pune');
  const [tradeOrField, setTradeOrField] = useState(profile?.tradeOrField || 'Computer Science & IT / Software');
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [ivrCallAlerts, setIvrCallAlerts] = useState(false);
  const [streakReminders, setStreakReminders] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  // Saved courses list
  const savedCourses = MOCK_COURSES.filter(c => profile.savedCourseIds?.includes(c.id));

  const handleSavePreferences = () => {
    onUpdateProfile({
      displayName,
      isAnonymous,
      district,
      tradeOrField
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleRemoveSaved = (courseId: string) => {
    const updated = (profile.savedCourseIds || []).filter(id => id !== courseId);
    onUpdateProfile({ savedCourseIds: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0C2340] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-xs">
              {(profile?.displayName || profile?.name || 'C').charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  {profile.isAnonymous ? 'Candidate (Anonymized)' : profile.name}
                </h2>
                <span className="text-[10px] bg-blue-900 border border-blue-700 text-blue-200 px-2 py-0.5 rounded-full font-mono">
                  #{profile.rank} in {profile.district}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono mt-0.5">{profile.instituteName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold px-4 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 shrink-0 transition-colors ${
              activeTab === 'preferences'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Preferences</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('badges')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 shrink-0 transition-colors ${
              activeTab === 'badges'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Achievements</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 shrink-0 transition-colors ${
              activeTab === 'saved'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Courses ({savedCourses.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`py-3 px-3 border-b-2 flex items-center space-x-1.5 shrink-0 transition-colors ${
              activeTab === 'notifications'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>SMS / IVR Alerts</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-800 flex-1">
          {/* TAB 1: Preferences */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display Name / Handle:
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-medium focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    District:
                  </label>
                  <select
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-medium focus:ring-2 focus:ring-blue-900"
                  >
                    {MAHARASHTRA_DISTRICTS.map(d => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Trade / Field of Study:
                </label>
                <input
                  type="text"
                  value={tradeOrField}
                  onChange={e => setTradeOrField(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-medium focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* Anonymity Toggle */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
                <div className="space-y-0.5 pr-2">
                  <span className="font-bold text-slate-900 flex items-center space-x-1.5">
                    {isAnonymous ? <EyeOff className="w-3.5 h-3.5 text-slate-600" /> : <Eye className="w-3.5 h-3.5 text-blue-700" />}
                    <span>Leaderboard Identity Anonymity</span>
                  </span>
                  <p className="text-[11px] text-slate-500">
                    When enabled, other trainees see &apos;Anonymous Learner #{(profile?.id || '9042').slice(-3)}&apos; on the community board.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={e => setIsAnonymous(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-between">
                {savedSuccess && (
                  <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Preferences updated successfully!</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="ml-auto px-4 py-2 bg-[#0C2340] hover:bg-blue-900 text-white rounded-lg font-bold text-xs shadow-sm transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Badges */}
          {activeTab === 'badges' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Badges are awarded automatically as you complete diagnostic quizzes and verify skills.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_ACHIEVEMENT_BADGES.map(badge => (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
                      badge.unlocked
                        ? 'bg-amber-50/60 border-amber-300 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        badge.unlocked ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {badge.unlocked ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {language === 'mr' ? badge.marathiTitle : badge.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 mt-0.5">{badge.description}</p>
                      {badge.unlocked && (
                        <span className="text-[10px] text-amber-800 font-semibold mt-1 block">
                          Unlocked: {badge.unlockedAt}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Saved Courses */}
          {activeTab === 'saved' && (
            <div className="space-y-3">
              {savedCourses.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Bookmark className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p>No saved courses yet.</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Click the bookmark icon next to any course on your dashboard to save it here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {savedCourses.map(c => (
                    <div
                      key={c.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:bg-white transition-colors"
                    >
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">{c.name}</h4>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {c.institute} • {c.placementRate}% Placement • {c.avgStartingSalary}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectCourse(c);
                            onClose();
                          }}
                          className="px-2.5 py-1 bg-blue-900 hover:bg-blue-800 text-white rounded text-xs font-bold"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveSaved(c.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Notifications (SMS/IVR for low bandwidth) */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950 flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-amber-900">Low-Connectivity Alerts (Tier 2/3 Focus)</p>
                  <p className="mt-0.5 text-[11px]">
                    Receive instant text messages when verified NAPS apprenticeships open in your district,
                    even without an active internet connection.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <div>
                    <span className="font-bold text-xs text-slate-800 block">
                      SMS Alerts for Verified NAPS Openings
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Sent to registered mobile ({profile.phone})
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={e => setSmsAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-900 rounded border-slate-300"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <div>
                    <span className="font-bold text-xs text-slate-800 block">
                      Automated IVR Voice Calls for Critical Course Alerts
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Marathi voice call before taking an obsolete trade
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={ivrCallAlerts}
                    onChange={e => setIvrCallAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-900 rounded border-slate-300"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <div>
                    <span className="font-bold text-xs text-slate-800 block">
                      Daily Learning Streak Reminders
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Push notification at 7 PM to keep momentum
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={streakReminders}
                    onChange={e => setStreakReminders(e.target.checked)}
                    className="w-4 h-4 text-blue-900 rounded border-slate-300"
                  />
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-bold"
                >
                  Save Notification Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
