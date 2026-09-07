import React from 'react';
import { Link } from 'react-router-dom';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  X,
  BookOpen,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Users,
  Wrench,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3
} from 'lucide-react';

export const CourseDetailDrawer: React.FC = () => {
  const { selectedCourse, setSelectedCourse } = useTrainingCentre();

  if (!selectedCourse) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-2xs transition-opacity"
        onClick={() => setSelectedCourse(null)}
      ></div>

      <div className="relative w-full max-w-2xl bg-white shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-[#0C2340] text-white flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[11px] mb-1">
              <span className="font-mono bg-blue-900/90 text-amber-300 px-2 py-0.5 rounded font-bold border border-blue-700">
                {selectedCourse.code}
              </span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-blue-100 font-medium">
                NSQF Level {selectedCourse.nsqfLevel}
              </span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-blue-100 font-mono">
                {selectedCourse.qualificationCode}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              {selectedCourse.name}
            </h2>
            <div className="text-xs text-blue-200 mt-0.5 font-medium">
              Sector: {selectedCourse.sector} &bull; Duration: {selectedCourse.durationMonths} Months
            </div>
          </div>

          <button
            onClick={() => setSelectedCourse(null)}
            className="p-1 text-slate-300 hover:text-white rounded-md font-bold text-xl"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>

        {/* Drawer Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs text-slate-700">
          {/* Top Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Market Demand</div>
              <div className="text-sm font-extrabold text-[#0C2340] mt-0.5 flex items-center gap-1">
                <span>{selectedCourse.marketDemand}</span>
                {selectedCourse.demandTrend3Yr === 'Growing' ? (
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                )}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">3-Yr: {selectedCourse.demandTrend3Yr}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Placement Rate</div>
              <div className="text-sm font-extrabold text-[#0C2340] mt-0.5">
                {selectedCourse.placementRate}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {selectedCourse.placementRate >= selectedCourse.prevPlacementRate ? '↑' : '↓'}{' '}
                Prev: {selectedCourse.prevPlacementRate}%
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Annual Capacity</div>
              <div className="text-sm font-extrabold text-[#0C2340] mt-0.5">
                {selectedCourse.annualCapacity} Seats
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Enrolled: {selectedCourse.currentEnrolment} ({Math.round((selectedCourse.currentEnrolment / selectedCourse.annualCapacity) * 100)}%)
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Market Alignment</div>
              <div className="text-sm font-extrabold text-blue-800 mt-0.5">
                {selectedCourse.alignmentScore}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Overall Health</div>
            </div>
          </div>

          {/* TWO SEPARATE RISK CARDS */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Diagnostic Risk Classification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Card 1: Technology Obsolescence Risk */}
              <div
                className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                  selectedCourse.techObsolescenceRisk === 'HIGH'
                    ? 'bg-red-50/70 border-red-200'
                    : selectedCourse.techObsolescenceRisk === 'MEDIUM'
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      Technology Obsolescence
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        selectedCourse.techObsolescenceRisk === 'HIGH'
                          ? 'bg-red-200 text-red-900'
                          : selectedCourse.techObsolescenceRisk === 'MEDIUM'
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-emerald-200 text-emerald-900'
                      }`}
                    >
                      {selectedCourse.techObsolescenceRisk} RISK
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-700">
                    {selectedCourse.techRiskExplanation}
                  </p>
                </div>
              </div>

              {/* Card 2: Course Oversupply Risk */}
              <div
                className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                  selectedCourse.oversupplyRisk === 'HIGH'
                    ? 'bg-amber-50/70 border-amber-200'
                    : selectedCourse.oversupplyRisk === 'MEDIUM'
                    ? 'bg-blue-50/70 border-blue-200'
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      Regional Course Oversupply
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        selectedCourse.oversupplyRisk === 'HIGH'
                          ? 'bg-amber-200 text-amber-900'
                          : selectedCourse.oversupplyRisk === 'MEDIUM'
                          ? 'bg-blue-200 text-blue-900'
                          : 'bg-emerald-200 text-emerald-900'
                      }`}
                    >
                      {selectedCourse.oversupplyRisk} RISK
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-700">
                    {selectedCourse.oversupplyExplanation}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COURSE HEALTH (6 DIMENSIONS) */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0C2340] uppercase tracking-wide flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-blue-700" />
                <span>Dimensional Course Health Breakdown</span>
              </span>
              <span className="font-bold text-blue-800 text-xs font-mono">
                Composite: {selectedCourse.alignmentScore}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                  <span>Curriculum Relevance</span>
                  <span className="font-bold text-slate-800">{selectedCourse.dimensionalHealth.curriculum}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${selectedCourse.dimensionalHealth.curriculum < 60 ? 'bg-red-500' : 'bg-blue-600'}`}
                    style={{ width: `${selectedCourse.dimensionalHealth.curriculum}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                  <span>Industry Demand</span>
                  <span className="font-bold text-slate-800">{selectedCourse.dimensionalHealth.industryDemand}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600" style={{ width: `${selectedCourse.dimensionalHealth.industryDemand}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                  <span>Trainer Readiness</span>
                  <span className="font-bold text-slate-800">{selectedCourse.dimensionalHealth.trainerReadiness}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${selectedCourse.dimensionalHealth.trainerReadiness < 60 ? 'bg-amber-500' : 'bg-blue-600'}`}
                    style={{ width: `${selectedCourse.dimensionalHealth.trainerReadiness}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                  <span>Equipment Readiness</span>
                  <span className="font-bold text-slate-800">{selectedCourse.dimensionalHealth.equipmentReadiness}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${selectedCourse.dimensionalHealth.equipmentReadiness < 60 ? 'bg-amber-500' : 'bg-blue-600'}`}
                    style={{ width: `${selectedCourse.dimensionalHealth.equipmentReadiness}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                  <span>Assessment Readiness</span>
                  <span className="font-bold text-slate-800">{selectedCourse.dimensionalHealth.assessmentReadiness}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${selectedCourse.dimensionalHealth.assessmentReadiness}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                  <span>Placement Outcomes</span>
                  <span className="font-bold text-slate-800">{selectedCourse.dimensionalHealth.placementOutcomes}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600" style={{ width: `${selectedCourse.dimensionalHealth.placementOutcomes}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* CURRICULUM RECOMMENDATION: CURRENT VS RECOMMENDED */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-700" />
                <span>AI Curriculum Modernization Plan</span>
              </span>
              <span className="text-[10px] text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded font-bold border border-indigo-200">
                Confidence: {selectedCourse.aiConfidenceScore}%
              </span>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-950 leading-relaxed">
              <strong>AI Recommendation Summary:</strong> {selectedCourse.aiRecommendationSummary}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {/* Left: Current Curriculum Modules */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-700 mb-2 text-xs flex items-center justify-between">
                  <span>Current Baseline Syllabus:</span>
                  <span className="text-[10px] text-slate-400 font-mono">Traditional</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  {selectedCourse.currentCurriculumModules.map((mod, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-slate-400 shrink-0">&bull;</span>
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Recommended Additions / Modernization */}
              <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <div className="font-bold text-emerald-950 mb-2 text-xs flex items-center justify-between">
                  <span>Recommended Modular Additions:</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-bold">
                    + High Growth
                  </span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-emerald-950">
                  {selectedCourse.recommendedAddModules.map((mod, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>

                {selectedCourse.recommendedReduceModules.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-emerald-200 text-[11px] text-amber-900">
                    <strong>Topics to phase down:</strong> {selectedCourse.recommendedReduceModules.join('; ')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Missing Skills Tags */}
          <div>
            <div className="text-[11px] font-bold text-slate-600 mb-1.5">
              Top Employer-Demanded Skills Missing from Current Syllabi:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedCourse.topMissingSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-red-50 text-red-900 rounded-md border border-red-200 text-xs font-semibold"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => setSelectedCourse(null)}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
          >
            Close Window
          </button>

          <Link
            to="/training-centres/curriculum"
            onClick={() => setSelectedCourse(null)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-md text-xs font-bold shadow-2xs transition"
          >
            <span>Proceed to Curriculum Review Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
