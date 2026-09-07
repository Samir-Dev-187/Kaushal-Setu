import React, { useState } from 'react';
import { CandidateProfile, LeaderboardEntry } from '../../types/candidate';
import { MOCK_LEADERBOARD_ENTRIES } from '../../data/candidateMockData';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  Flame,
  CheckCircle2,
  X,
  BookOpen,
  Share2,
  Users
} from 'lucide-react';

interface CommunityLeaderboardProps {
  profile: CandidateProfile;
  language: SupportedLang;
  onToggleAnonymous: () => void;
}

export const CommunityLeaderboard: React.FC<CommunityLeaderboardProps> = ({
  profile,
  language,
  onToggleAnonymous
}) => {
  const t = TRANSLATIONS[language];

  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('week');
  const [scope, setScope] = useState<'district' | 'state'>('district');
  const [showPointsModal, setShowPointsModal] = useState(false);

  // Filter entries
  const candidateDistrict = (profile?.district || 'Pune').toLowerCase();
  const filteredEntries = (MOCK_LEADERBOARD_ENTRIES || []).filter(entry => {
    if (scope === 'district' && !entry.isCurrentUser) {
      return (entry.district || '').toLowerCase() === candidateDistrict;
    }
    return true;
  });

  // Ensure top 3 + current user
  const topList = (filteredEntries || []).slice(0, 5);

  return (
    <section className="bg-white py-8 px-4 sm:px-6 border-b border-slate-200">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{t.leaderboardTitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {language === 'mr'
                ? 'कौशल्य साधक: शिकण्यावर आधारित गुणतक्ता'
                : 'Learning Engagement Leaderboard'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {t.leaderboardSubtitle}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPointsModal(true)}
              className="text-xs font-bold text-blue-800 hover:text-blue-900 flex items-center space-x-1 underline underline-offset-2"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.howPointsEarned}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
          {/* Timeframe Tabs */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
            {(['week', 'month', 'all'] as const).map(tf => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                  timeframe === tf
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tf === 'week' ? t.tabThisWeek : tf === 'month' ? t.tabThisMonth : t.tabAllTime}
              </button>
            ))}
          </div>

          {/* Scope Tabs & Privacy Toggle */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setScope('district')}
                className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                  scope === 'district'
                    ? 'bg-[#0C2340] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {profile.district} District
              </button>
              <button
                type="button"
                onClick={() => setScope('state')}
                className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                  scope === 'state'
                    ? 'bg-[#0C2340] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.scopeState}
              </button>
            </div>

            {/* Anonymity Toggle */}
            <button
              onClick={onToggleAnonymous}
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-[11px] font-semibold text-slate-700"
              title="Toggle public visibility"
            >
              {profile.isAnonymous ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>Anonymous Mode</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-blue-700" />
                  <span>Showing: {profile.displayName}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Permanent Pinned Banner for Candidate's Own Rank */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-base shadow-xs">
              #{profile.rank}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm sm:text-base">
                  {profile.isAnonymous ? 'Anonymous Learner' : profile.displayName} (You)
                </span>
                <span className="text-[10px] bg-amber-400/30 text-amber-200 font-bold px-1.5 py-0.2 rounded font-mono">
                  {profile.points} pts
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                {language === 'mr'
                  ? `पुढील क्रमांकावर (#${profile.rank - 1}) पोहोचण्यासाठी आणखी ${profile.pointsToNextRank} गुणांची गरज आहे.`
                  : `You're #${profile.rank} in ${profile.district} — only ${profile.pointsToNextRank} points to reach #${profile.rank - 1}!`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="text-xs text-blue-200 font-medium">
              ⚡ 1 quiz = +20 pts
            </span>
          </div>
        </div>

        {/* Top Community Leaderboard List */}
        <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white">
          {topList.map((entry, idx) => {
            const isTop1 = entry.rank === 1;
            const isTop2 = entry.rank === 2;
            const isTop3 = entry.rank === 3;

            return (
              <div
                key={entry.id}
                className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors ${
                  entry.isCurrentUser
                    ? 'bg-blue-50/70 font-semibold'
                    : 'hover:bg-slate-50'
                }`}
              >
                {/* Left: Rank & Medals */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-8 flex items-center justify-center font-black text-sm text-slate-700">
                    {isTop1 ? (
                      <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xs shadow-xs" title="1st Place (Gold)">
                        🥇
                      </span>
                    ) : isTop2 ? (
                      <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-900 flex items-center justify-center font-bold text-xs shadow-xs" title="2nd Place (Silver)">
                        🥈
                      </span>
                    ) : isTop3 ? (
                      <span className="w-7 h-7 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center font-bold text-xs shadow-xs" title="3rd Place (Bronze)">
                        🥉
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono">#{entry.rank}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">{entry.avatar}</span>
                    <div>
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900 block">
                        {entry.name}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {entry.district} • {entry.assessmentsCompleted} Quizzes Cleared
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Points & Streak */}
                <div className="flex items-center space-x-4 shrink-0 text-right">
                  <div className="hidden sm:flex items-center space-x-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                    <span>{entry.streakDays}d streak</span>
                  </div>

                  <div className="font-mono">
                    <span className="text-sm sm:text-base font-black text-slate-900">
                      {entry.points}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-1 font-bold">pts</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: How Points Are Earned */}
        {showPointsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-base text-slate-900">
                    {language === 'mr' ? 'गुण कसे मोजले जातात?' : 'How points are earned'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowPointsModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p className="text-slate-600">
                  {language === 'mr'
                    ? 'हा तक्ता केवळ कौशल्य आत्मसात करण्यावर आधारित आहे. कोणाची नोकरी लागली किंवा कोणाकडे किती पैसा आहे यावर येथे क्रमवारी लावली जात नाही.'
                    : 'The Kaushal Setu community ranks learning progress only — never income or employment status. Every candidate has an equal chance to shine.'}
                </p>

                <div className="bg-slate-50 rounded-lg p-3 space-y-2 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center space-x-1.5">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>Skill assessment completed</span>
                    </span>
                    <span className="font-mono font-black text-emerald-700">+20 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center space-x-1.5">
                      <Award className="w-4 h-4 text-purple-600" />
                      <span>Verified Certificate (NCVET/DVET)</span>
                    </span>
                    <span className="font-mono font-black text-emerald-700">+100 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center space-x-1.5">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <span>Daily learning streak maintenance</span>
                    </span>
                    <span className="font-mono font-black text-emerald-700">+10 pts/day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center space-x-1.5">
                      <Share2 className="w-4 h-4 text-indigo-600" />
                      <span>Peer referral from same training centre</span>
                    </span>
                    <span className="font-mono font-black text-emerald-700">+30 pts</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowPointsModal(false)}
                className="w-full py-2.5 bg-blue-900 text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
