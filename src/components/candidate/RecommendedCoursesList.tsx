import React from 'react';
import { CandidateProfile, CourseItem, CourseStatus } from '../../types/candidate';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import {
  Bookmark,
  BookmarkCheck,
  Building,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  Scale,
  Sparkles
} from 'lucide-react';

interface RecommendedCoursesListProps {
  courses: CourseItem[];
  profile: CandidateProfile;
  language: SupportedLang;
  onSelectCourse: (course: CourseItem) => void;
  onCompareCourse: (course: CourseItem) => void;
  onToggleBookmark: (courseId: string) => void;
}

export const RecommendedCoursesList: React.FC<RecommendedCoursesListProps> = ({
  courses,
  profile,
  language,
  onSelectCourse,
  onCompareCourse,
  onToggleBookmark
}) => {
  const t = TRANSLATIONS[language];

  // Helper for Status Badges with color + text label for colorblind accessibility
  const renderStatusBadge = (status: CourseStatus) => {
    switch (status) {
      case 'High demand':
        return (
          <span className="inline-flex items-center space-x-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>{t.statusHighDemand}</span>
          </span>
        );
      case 'Current':
        return (
          <span className="inline-flex items-center space-x-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>{t.statusCurrent}</span>
          </span>
        );
      case 'Oversupplied':
        return (
          <span className="inline-flex items-center space-x-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            <AlertTriangle className="w-3 h-3 text-amber-700" />
            <span>{t.statusOversupplied}</span>
          </span>
        );
      case 'Obsolete':
        return (
          <span className="inline-flex items-center space-x-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
            <AlertTriangle className="w-3 h-3 text-rose-700" />
            <span>{t.statusObsolete}</span>
          </span>
        );
    }
  };

  return (
    <section className="bg-slate-50 py-8 px-4 sm:px-6 border-b border-slate-200">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.recommendedSectionTitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {language === 'mr'
                ? 'तुमच्या ध्येयानुसार थेट अभ्यासक्रम'
                : 'Curated Course Recommendations'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {t.recommendedSubheading}
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing 6 verified government & polytechnic offerings
          </span>
        </div>

        {/* Course Rows */}
        <div className="space-y-3">
          {courses.map(course => {
            const isSaved = profile.savedCourseIds?.includes(course.id);
            const isFlagged = course.status === 'Obsolete' || course.status === 'Oversupplied';

            return (
              <div
                key={course.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative group ${
                  isFlagged
                    ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Left details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {renderStatusBadge(course.status)}
                    {course.personalizationBadge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                        {course.personalizationBadge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3
                      onClick={() => onSelectCourse(course)}
                      className="font-extrabold text-base sm:text-lg text-slate-900 hover:text-blue-900 cursor-pointer transition-colors leading-snug"
                    >
                      {language === 'mr' ? course.marathiName : course.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center space-x-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.institute}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.duration}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl leading-relaxed">
                    {language === 'mr' ? course.marathiDescription : course.description}
                  </p>
                </div>

                {/* Right side stats & actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 shrink-0 gap-3">
                  <div className="sm:text-right">
                    <div className="flex items-baseline space-x-1 sm:justify-end">
                      <span
                        className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${
                          course.placementRate >= 75 ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {course.placementRate}%
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">
                        Placement
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 block">
                      Avg: {course.avgStartingSalary}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Compare Button */}
                    <button
                      type="button"
                      onClick={() => onCompareCourse(course)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center space-x-1 transition-colors"
                      title="Compare against modern alternative"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>{t.compareBtn}</span>
                    </button>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(course.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-amber-50 border-amber-300 text-amber-700'
                          : 'bg-white border-slate-300 text-slate-500 hover:text-slate-800'
                      }`}
                      aria-label={isSaved ? 'Remove from saved courses' : 'Save course'}
                      title={isSaved ? 'Saved to your profile' : 'Bookmark course'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>

                    {/* View Details Button */}
                    <button
                      type="button"
                      onClick={() => onSelectCourse(course)}
                      className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
