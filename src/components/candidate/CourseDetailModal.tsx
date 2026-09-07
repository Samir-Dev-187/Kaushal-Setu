import React, { useState } from 'react';
import { CourseItem } from '../../types/candidate';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import {
  X,
  Building,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  Scale,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Sparkles
} from 'lucide-react';

interface CourseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CourseItem | null;
  language: SupportedLang;
  isSaved: boolean;
  onToggleBookmark: (courseId: string) => void;
  onCompare: (course: CourseItem) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  isOpen,
  onClose,
  course,
  language,
  isSaved,
  onToggleBookmark,
  onCompare
}) => {
  const t = TRANSLATIONS[language];
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  if (!isOpen || !course) return null;

  const isFlagged = course.status === 'Obsolete' || course.status === 'Oversupplied';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div
          className={`p-4 sm:p-5 text-white flex items-start justify-between ${
            isFlagged
              ? 'bg-gradient-to-r from-rose-900 to-amber-950'
              : 'bg-[#0C2340]'
          }`}
        >
          <div className="space-y-1.5 flex-1 pr-3">
            <div className="flex items-center space-x-2">
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                  isFlagged
                    ? 'bg-rose-500 text-white'
                    : 'bg-emerald-500 text-slate-950'
                }`}
              >
                {course.status}
              </span>
              <span className="text-xs text-slate-300 font-mono">{course.sector}</span>
            </div>
            <h2 className="text-base sm:text-xl font-extrabold text-white leading-snug">
              {language === 'mr' ? course.marathiName : course.name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-300">
              <span className="flex items-center space-x-1">
                <Building className="w-3.5 h-3.5" />
                <span>{course.institute}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{course.duration}</span>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-800">
          {/* Flagged Alert Banner if obsolete/oversupplied */}
          {isFlagged && (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-4 text-rose-950 space-y-2">
              <div className="flex items-center space-x-2 text-rose-800 font-black">
                <AlertTriangle className="w-4 h-4" />
                <span>Curriculum Warning: Before You Spend 2 Years</span>
              </div>
              <p className="text-xs leading-relaxed">
                {course.obsolescenceWarning?.reason}
              </p>
              <div className="pt-1 flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-800">
                  Recommended upgrade: {course.obsolescenceWarning?.alternativeCourseName}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onCompare(course);
                    onClose();
                  }}
                  className="px-2.5 py-1 bg-rose-800 hover:bg-rose-900 text-white rounded font-bold text-[11px]"
                >
                  Compare Truth Data
                </button>
              </div>
            </div>
          )}

          {/* Core Outcomes Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Placement Rate
              </span>
              <span
                className={`text-xl font-black font-mono mt-0.5 block ${
                  course.placementRate >= 75 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {course.placementRate}%
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Avg Starting Wage
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-900 font-mono mt-1 block">
                {course.avgStartingSalary}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Seats in Session
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 mt-1 block">
                {course.seatsAvailable} of {course.seatsTotal} Open
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5">
              Course Summary &amp; Industrial Scope:
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'mr' ? course.marathiDescription : course.description}
            </p>
          </div>

          {/* Syllabus Modules */}
          {course.syllabusModules && course.syllabusModules.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-2">Key Modules &amp; Equipment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {course.syllabusModules.map((mod, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start space-x-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 text-xs">{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Industry Certification */}
          <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
              <div>
                <p className="font-bold text-slate-900">NCVET &amp; NCVT Recognized Certificate</p>
                <p className="text-[11px] text-slate-500">Includes DigiLocker Skill Passport Auto-Sync</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">Govt Approved</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onToggleBookmark(course.id)}
              className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                isSaved
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? 'Saved' : 'Save Trade'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onCompare(course);
                onClose();
              }}
              className="p-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Scale className="w-4 h-4" />
              <span>{t.compareBtn}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setEnrolledSuccess(true)}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg text-xs shadow-sm transition-colors flex items-center justify-center space-x-2"
          >
            {enrolledSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Enquiry Registered with Training Centre</span>
              </>
            ) : (
              <>
                <span>Apply for DVET Counselling Slot</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
