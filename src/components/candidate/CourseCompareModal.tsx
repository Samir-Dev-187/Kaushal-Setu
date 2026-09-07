import React, { useState } from 'react';
import { CourseItem } from '../../types/candidate';
import { MOCK_COURSES } from '../../data/candidateMockData';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import { X, Scale, CheckCircle2, XCircle, ArrowRight, Building, Clock, IndianRupee } from 'lucide-react';

interface CourseCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseCourse: CourseItem | null;
  language: SupportedLang;
  onEnroll: (courseId: string) => void;
}

export const CourseCompareModal: React.FC<CourseCompareModalProps> = ({
  isOpen,
  onClose,
  baseCourse,
  language,
  onEnroll
}) => {
  // All hooks MUST be called before any early return (React Rules of Hooks)
  // Default course 1 is the selected base course or the first flagged course
  const courseA = baseCourse || MOCK_COURSES.find(c => c.isFlagged) || MOCK_COURSES[4] || MOCK_COURSES[0];

  const initialB =
    courseA?.obsolescenceWarning?.recommendedAlternativeId ||
    (courseA?.sector?.toLowerCase()?.includes('it') || courseA?.name?.toLowerCase()?.includes('cyber')
      ? 'c-cloud-cyber'
      : courseA?.id === 'c-ev-powertrain'
      ? 'c-iiot-electrician'
      : 'c-ev-powertrain');

  // Default comparison course
  const [courseBId, setCourseBId] = useState<string>(initialB);

  // Update comparison course if base course changes
  React.useEffect(() => {
    if (courseA?.obsolescenceWarning?.recommendedAlternativeId) {
      setCourseBId(courseA.obsolescenceWarning.recommendedAlternativeId);
    }
  }, [courseA?.id]);

  const courseB = MOCK_COURSES.find(c => c.id === courseBId) || MOCK_COURSES[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col my-auto max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#0C2340] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Course Outcome Comparison
              </h2>
              <p className="text-xs text-slate-300">
                Compare real salary and job placement outcomes before committing 2 years
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-800">
          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Course A Column */}
            <div
              className={`rounded-xl border p-4 sm:p-5 space-y-4 ${
                courseA.isFlagged
                  ? 'bg-rose-50/50 border-rose-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-500">
                  Option 1
                </span>
                {courseA.isFlagged ? (
                  <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full uppercase">
                    ⚠️ {courseA.status}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                    {courseA.status}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-black text-base sm:text-lg text-slate-900 leading-snug">
                  {language === 'mr' ? courseA.marathiName : courseA.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  {courseA.institute} • {courseA.duration}
                </p>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-slate-200 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    Placement
                  </span>
                  <span
                    className={`text-xl font-black font-mono ${
                      courseA.placementRate >= 75 ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {courseA.placementRate}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    Starting Salary
                  </span>
                  <span className="text-sm font-black text-slate-900 font-mono mt-1 block">
                    {courseA.avgStartingSalary}
                  </span>
                </div>
              </div>

              {/* Key topics */}
              <div className="space-y-1.5">
                <span className="font-bold text-slate-700 block text-[11px]">
                  What you will learn:
                </span>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {courseA.curriculumHighlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[11px] text-slate-500 block">Eligibility:</span>
                <span className="font-medium text-[11px] text-slate-700">{courseA.eligibility}</span>
              </div>
            </div>

            {/* Course B Column */}
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/40 p-4 sm:p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-800">
                    Compare With:
                  </span>
                  <select
                    value={courseBId}
                    onChange={e => setCourseBId(e.target.value)}
                    className="bg-white border border-emerald-300 rounded text-xs px-2 py-0.5 text-slate-800 font-bold"
                  >
                    {(MOCK_COURSES || []).filter(c => c.id !== courseA?.id).map(c => (
                      <option key={c.id} value={c.id}>
                        {(c.name || '').slice(0, 30)}...
                      </option>
                    ))}
                  </select>
                </div>
                <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase">
                  {courseB.status}
                </span>
              </div>

              <div>
                <h3 className="font-black text-base sm:text-lg text-emerald-950 leading-snug">
                  {language === 'mr' ? courseB.marathiName : courseB.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  {courseB.institute} • {courseB.duration}
                </p>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-emerald-200 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    Placement
                  </span>
                  <span className="text-xl font-black font-mono text-emerald-700">
                    {courseB.placementRate}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    Starting Salary
                  </span>
                  <span className="text-sm font-black text-emerald-900 font-mono mt-1 block">
                    {courseB.avgStartingSalary}
                  </span>
                </div>
              </div>

              {/* Key topics */}
              <div className="space-y-1.5">
                <span className="font-bold text-emerald-950 block text-[11px]">
                  What you will learn:
                </span>
                <ul className="space-y-1 text-slate-700 text-[11px]">
                  {courseB.curriculumHighlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-emerald-200">
                <button
                  type="button"
                  onClick={() => {
                    if (courseB?.id) {
                      onEnroll(courseB.id);
                    }
                    onClose();
                  }}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Apply / Enroll in {(courseB?.name || 'Course').slice(0, 18)}...</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
