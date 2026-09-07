import React, { useState } from 'react';
import { CourseItem } from '../../types/candidate';
import { MOCK_COURSES } from '../../data/candidateMockData';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import {
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

interface EnrollmentInterruptSectionProps {
  language: SupportedLang;
  onSelectAlternative: (alternativeCourseId: string) => void;
}

export const EnrollmentInterruptSection: React.FC<EnrollmentInterruptSectionProps> = ({
  language,
  onSelectAlternative
}) => {
  const t = TRANSLATIONS[language];

  // Flagged courses for demonstration
  const flaggedCourses = MOCK_COURSES.filter(
    c => c.status === 'Obsolete' || c.status === 'Oversupplied'
  );

  const [selectedFlaggedId, setSelectedFlaggedId] = useState<string>(
    flaggedCourses[0]?.id || 'c-ice-mechanic'
  );

  const activeCourse =
    flaggedCourses.find(c => c.id === selectedFlaggedId) || flaggedCourses[0];

  const warning = activeCourse?.obsolescenceWarning;

  return (
    <section className="bg-gradient-to-b from-amber-500/10 to-rose-500/10 py-10 px-4 sm:px-6 border-b border-slate-200">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header with Live Demonstration Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-900 uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{t.beforeYouEnrollTitle}</span>
              <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.2 rounded-full uppercase ml-1 animate-pulse">
                Live Interrupt Simulator
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {language === 'mr'
                ? 'प्रवेश घेण्यापूर्वी: जुनाट अभ्यासक्रमाचा थेट इशारा'
                : 'Enrollment Intercept: Truth before 2 years of your life'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {t.beforeYouEnrollSubtitle}
            </p>
          </div>

          {/* Selector to test different flagged trades */}
          <div className="bg-white p-1 rounded-xl border border-slate-300 shadow-xs flex items-center space-x-1 text-xs">
            <span className="text-[11px] font-bold text-slate-500 px-2">Test Course:</span>
            {flaggedCourses.map(fc => (
              <button
                key={fc.id}
                type="button"
                onClick={() => setSelectedFlaggedId(fc.id)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                  selectedFlaggedId === fc.id
                    ? 'bg-rose-900 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {fc.name.includes('ICE') ? 'ICE Mechanic' : 'General Fitter'}
              </button>
            ))}
          </div>
        </div>

        {/* The Working Intercept Card */}
        <div className="bg-white rounded-2xl border-2 border-rose-400 shadow-xl overflow-hidden">
          {/* Top Banner Alert */}
          <div className="bg-rose-600 text-white px-5 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-200 fill-rose-100/30" />
              <span className="font-extrabold text-sm sm:text-base tracking-tight">
                {t.warningAlertHeading}
              </span>
            </div>
            <span className="text-xs bg-rose-950/80 text-rose-200 font-mono font-bold px-2.5 py-1 rounded-full">
              Status: {activeCourse.status} (High Risk)
            </span>
          </div>

          {/* Comparison Body: The Old Trap vs. The Modern Alternative */}
          <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* The Flagged Legacy Trade */}
            <div className="bg-rose-50/60 rounded-xl p-5 border border-rose-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-900 uppercase tracking-wider flex items-center space-x-1">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Selected Trade (Under-performing)</span>
                  </span>
                </div>

                <h3 className="font-black text-lg text-slate-900 leading-snug">
                  {language === 'mr' ? activeCourse.marathiName : activeCourse.name}
                </h3>

                <div className="bg-white p-3.5 rounded-lg border border-rose-200 text-xs text-rose-950 space-y-2">
                  <p className="font-bold text-rose-900">
                    {language === 'mr'
                      ? 'स्थानिक रोजगाराचा कठोर पुरावा:'
                      : 'Why this course is flagged:'}
                  </p>
                  <p className="leading-relaxed">
                    {language === 'mr' ? warning?.marathiReason : warning?.reason}
                  </p>
                </div>

                {/* Quantitative Pain Points */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-rose-200">
                    <span className="text-[10px] text-slate-500 font-medium block">
                      Placement Drop
                    </span>
                    <span className="font-mono font-bold text-rose-700 text-xs sm:text-sm">
                      {warning?.placementDrop}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-rose-200">
                    <span className="text-[10px] text-slate-500 font-medium block">
                      Avg Starting Pay
                    </span>
                    <span className="font-mono font-bold text-rose-700 text-xs sm:text-sm">
                      {warning?.startingPayOld}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-rose-700 font-semibold italic border-t border-rose-200/80 pt-3">
                ⚠️ Over 70% of graduates struggle to find jobs matching this syllabus.
              </div>
            </div>

            {/* The Better Government-Approved Alternative */}
            <div className="bg-emerald-50/60 rounded-xl p-5 border border-emerald-300 flex flex-col justify-between space-y-4 relative shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-900 uppercase tracking-wider flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Modernized Direct Upgrade</span>
                  </span>
                  <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase">
                    Industry Backed
                  </span>
                </div>

                <h3 className="font-black text-lg text-emerald-950 leading-snug">
                  {language === 'mr'
                    ? warning?.marathiAlternativeName
                    : warning?.alternativeCourseName}
                </h3>

                <div className="bg-white p-3.5 rounded-lg border border-emerald-200 text-xs text-slate-700 space-y-2">
                  <p className="font-bold text-emerald-900 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>What you gain by switching:</span>
                  </p>
                  <ul className="space-y-1.5 text-slate-700">
                    {warning?.modernSkillsAdded.map((skill, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium text-[11px]">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Positive Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-slate-500 font-medium block">
                      Placement Rate
                    </span>
                    <span className="font-mono font-black text-emerald-700 text-sm sm:text-base">
                      {warning?.betterPlacementRate}% Verified
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-slate-500 font-medium block">
                      Starting Salary
                    </span>
                    <span className="font-mono font-black text-emerald-700 text-sm sm:text-base">
                      {warning?.betterAvgStartingSalary}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (warning?.alternativeCourseId) {
                      onSelectAlternative(warning.alternativeCourseId);
                    }
                  }}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98"
                >
                  <span>
                    {language === 'mr'
                      ? 'आधुनिक अभ्यासक्रमात स्विच करा'
                      : t.switchCurriculumBtn}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
