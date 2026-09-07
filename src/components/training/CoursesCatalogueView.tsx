import React, { useState } from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import { CourseCatalogueItem } from '../../types/trainingCentre';
import {
  Search,
  Filter,
  BookOpen,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Layers,
  BarChart3
} from 'lucide-react';

export const CoursesCatalogueView: React.FC = () => {
  const {
    courses,
    selectedCourse,
    setSelectedCourse,
    searchQuery,
    setSearchQuery,
    activeCourseFilter,
    setActiveCourseFilter
  } = useTrainingCentre();

  const filterTabs = [
    'All',
    'Current',
    'Review Required',
    'Oversupplied',
    'Obsolete Risk',
    'High Demand'
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sector.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCourseFilter === 'All') return true;
    if (activeCourseFilter === 'Current') return c.status === 'Current';
    if (activeCourseFilter === 'Review Required') return c.status === 'Review' || c.status === 'Expand';
    if (activeCourseFilter === 'Oversupplied') return c.oversupplyRisk === 'HIGH';
    if (activeCourseFilter === 'Obsolete Risk') return c.techObsolescenceRisk === 'HIGH';
    if (activeCourseFilter === 'High Demand') return c.marketDemand === 'HIGH' || c.marketDemand === 'VERY HIGH';

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-xs font-mono">
                NCVT / DVET Catalogue
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">12 Active Trades Offered</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0C2340] tracking-tight">
              Course Catalogue &amp; Quality Alignment
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Continuous monitoring of trade relevance, industry absorption, and syllabus health across your campus.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-slate-400 block font-medium">Average Market Alignment:</span>
            <span className="text-2xl font-black text-blue-900 font-mono">76%</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search course title, code (MMV, ELE...)"
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCourseFilter(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  activeCourseFilter === tab
                    ? 'bg-[#0C2340] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-700 hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                  {course.code}
                </span>

                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                    course.status === 'Review'
                      ? 'bg-red-100 text-red-800'
                      : course.status === 'Expand'
                      ? 'bg-purple-100 text-purple-800'
                      : course.status === 'Oversupplied'
                      ? 'bg-amber-100 text-amber-900'
                      : course.status === 'Obsolete'
                      ? 'bg-red-100 text-red-900'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <h2 className="text-base font-extrabold text-[#0C2340] leading-snug group-hover:text-blue-900 transition-colors">
                {course.name}
              </h2>
              <div className="text-[11px] text-slate-500 mt-1">
                Sector: {course.sector} &bull; NSQF Level {course.nsqfLevel}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 bg-slate-50 rounded-xl text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Demand</span>
                  <span className="font-bold text-slate-800 text-[11px]">{course.marketDemand}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Placement</span>
                  <span className="font-bold text-emerald-700 font-mono text-[11px]">{course.placementRate}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Alignment</span>
                  <span className="font-bold text-blue-900 font-mono text-[11px]">{course.alignmentScore}%</span>
                </div>
              </div>

              {/* Dimensional Micro-Bars */}
              <div className="mt-3 space-y-1.5 text-[10px]">
                <div className="flex justify-between text-slate-500">
                  <span>Curriculum Match:</span>
                  <span className="font-bold text-slate-800">{course.dimensionalHealth.curriculum}%</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${course.dimensionalHealth.curriculum < 60 ? 'bg-red-500' : 'bg-blue-600'}`}
                    style={{ width: `${course.dimensionalHealth.curriculum}%` }}
                  ></div>
                </div>
              </div>

              {/* Risk Badges */}
              <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
                {course.techObsolescenceRisk === 'HIGH' && (
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 text-[10px] font-bold border border-red-200">
                    High Tech Obsolescence Risk
                  </span>
                )}
                {course.oversupplyRisk === 'HIGH' && (
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                    High Regional Oversupply Risk
                  </span>
                )}
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">
                Capacity: {course.annualCapacity} seats
              </span>
              <button className="text-blue-800 font-bold hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Inspect Diagnostic</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
