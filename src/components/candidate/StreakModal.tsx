import React from 'react';
import { MOCK_STREAK_HISTORY } from '../../data/candidateMockData';
import { Flame, X, CheckCircle2, Calendar, Sparkles, HelpCircle } from 'lucide-react';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStreak: number;
  language: SupportedLang;
}

export const StreakModal: React.FC<StreakModalProps> = ({
  isOpen,
  onClose,
  currentStreak,
  language
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  const activeDaysCount = MOCK_STREAK_HISTORY.filter(d => d.active).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="streak-modal-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-inner">
              <Flame className="w-7 h-7 text-amber-100 fill-amber-200 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black">{currentStreak}</span>
                <span className="text-sm font-bold uppercase tracking-wider text-amber-100">
                  {t.streakDays}
                </span>
              </div>
              <p className="text-xs text-amber-100 mt-0.5">{t.streakActiveToday}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close streak modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-slate-800">
          {/* Encouragement banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <p className="font-semibold text-amber-950 mb-1">
                {language === 'mr' ? 'सातत्य हीच यशाची किल्ली!' : 'Momentum builds careers!'}
              </p>
              <p>{t.streakBrokenEncouragement}</p>
            </div>
          </div>

          {/* What counts as an active day */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>{language === 'mr' ? 'सक्रिय दिवस कसा मोजला जातो?' : 'What counts as an active day?'}</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>{language === 'mr' ? 'कोणताही १ कौशल्य सराव किंवा क्विझ पूर्ण करणे' : 'Completing any 1 skill lesson or diagnostic quiz'}</li>
              <li>{language === 'mr' ? 'एखाद्या कोर्सचा सत्य अहवाल तपासणे' : 'Checking verified placement data on a trade'}</li>
              <li>{language === 'mr' ? 'पोर्टलवर लॉगिन करून नवीन नोकरी शोधणे' : 'Logging in to view matching NAPS apprenticeships'}</li>
            </ul>
          </div>

          {/* 30 Days Calendar Matrix */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>{language === 'mr' ? 'गेल्या ३० दिवसांचा इतिहास' : 'Last 30 Days Activity'}</span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {activeDaysCount} / 30 {language === 'mr' ? 'दिवस सक्रिय' : 'days active'}
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 p-2 bg-slate-100 rounded-lg border border-slate-200">
              {MOCK_STREAK_HISTORY.map((day, idx) => (
                <div
                  key={idx}
                  title={`${day.dayLabel}: ${day.active ? day.activityName || 'Active' : 'No activity'}`}
                  className={`flex flex-col items-center justify-center p-1.5 rounded text-[10px] font-medium transition-transform hover:scale-105 cursor-pointer ${
                    day.active
                      ? 'bg-amber-500 text-white font-bold shadow-xs ring-1 ring-amber-600'
                      : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                >
                  <span>{day.dayLabel.split(' ')[0]}</span>
                  {day.active ? (
                    <Flame className="w-3 h-3 fill-white text-white mt-0.5" />
                  ) : (
                    <span className="w-3 h-3 block mt-0.5 opacity-30">•</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              {language === 'mr'
                ? 'केवळ लॉगिन केल्यानेही तुमची मालिका टिकून राहते.'
                : 'Even a 2-minute daily check keeps your momentum alive.'}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm"
          >
            {language === 'mr' ? 'समजले, शिकत रहा' : 'Got it — Keep Learning'}
          </button>
        </div>
      </div>
    </div>
  );
};
