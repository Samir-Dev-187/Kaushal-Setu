import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  BookOpen,
  Target,
  AlertTriangle,
  CheckSquare,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Cpu,
  Clock,
  Building,
  CheckCircle2,
  Download,
  Plus,
  Compass,
  FileText,
  ExternalLink,
  Users,
  Wrench,
  BarChart3
} from 'lucide-react';
import {
  TOP_KPI_CARDS_DATA,
  PRIORITY_ACTIONS,
  DEMAND_VS_SUPPLY_DATA,
  TOP_GROWING_SKILLS,
  DECLINING_SKILLS
} from '../../data/trainingCentreData';

export const DashboardOverviewView: React.FC = () => {
  const navigate = useNavigate();
  const {
    provider,
    courses,
    setSelectedCourse,
    notices,
    setSelectedNotice,
    setSelectedTrainer,
    trainers,
    equipmentList,
    setSelectedEquipment,
    setIsNewRequestModalOpen
  } = useTrainingCentre();

  const flaggedCourse = courses.find((c) => c.code === 'MMV-201') || courses[0];
  const oversuppliedCourse = courses.find((c) => c.code === 'FIT-102') || courses[2];

  const handleActionClick = (actionType: string) => {
    switch (actionType) {
      case 'curriculum-review':
        navigate('/training-centres/curriculum');
        break;
      case 'trainers-review':
        navigate('/training-centres/trainers');
        break;
      case 'equipment-plan':
        navigate('/training-centres/equipment');
        break;
      case 'capacity-review':
        navigate('/training-centres/market-intelligence');
        break;
      case 'government-submission':
        navigate('/training-centres/notices');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. INSTITUTION SUMMARY & INTELLIGENCE BANNER */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Training Provider</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Reg: {provider.registrationNumber}
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">
                Affiliation: {provider.affiliation}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-[#0C2340] tracking-tight">
              {provider.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {provider.campusName} &bull; {provider.district} District, {provider.state}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-emerald-800">{provider.statusText}</span>
              </div>
              <span>&bull;</span>
              <div>Last Telemetry Sync: <strong className="text-slate-800">{provider.lastIntelligenceUpdate}</strong></div>
              <span>&bull;</span>
              <div>Enrolled Trainees: <strong className="text-slate-800">{provider.totalStudents}</strong></div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
            <button
              onClick={() => setIsNewRequestModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-lg text-xs font-bold shadow-2xs transition"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Submit Request</span>
            </button>

            <Link
              to="/training-centres/reports"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold border border-slate-300 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Audit Report</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. TOP 6 METRIC / KPI CARDS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            Key Institutional Performance Indicators
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">
            District: {provider.district}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {TOP_KPI_CARDS_DATA.map((kpi) => (
            <Link
              key={kpi.id}
              to={kpi.targetRoute}
              className="group bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-700 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-[11px] font-bold text-slate-500 truncate group-hover:text-blue-900 transition-colors">
                  {kpi.title}
                </div>
                <div className="text-2xl font-black text-[#0C2340] mt-1 tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-[10px] font-semibold text-slate-500 mt-1 leading-tight">
                  {kpi.badge}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-medium flex items-center justify-between">
                <span
                  className={
                    kpi.trendType === 'positive'
                      ? 'text-emerald-700 font-bold'
                      : kpi.trendType === 'warning'
                      ? 'text-amber-700 font-bold'
                      : kpi.trendType === 'danger'
                      ? 'text-red-600 font-bold'
                      : 'text-blue-700 font-bold'
                  }
                >
                  {kpi.trend}
                </span>
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-blue-800 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. PRIORITY ACTION REQUIRED (5 ITEMS) */}
      <div id="priority-actions" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-red-50 text-red-700 rounded-lg">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#0C2340]">Priority Action Items</h2>
              <p className="text-xs text-slate-500">
                Action required by Principal &amp; Academic Committee to maintain alignment
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-bold">
            2 Urgent
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {PRIORITY_ACTIONS.map((action) => (
            <div
              key={action.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 p-2 rounded-xl transition"
            >
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#0C2340] text-amber-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {action.number}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xs font-bold text-slate-900">
                      {action.title}
                    </h3>
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                        action.priority === 'CRITICAL'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : action.priority === 'HIGH'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {action.priority}
                    </span>
                  </div>
                  <div className="text-xs text-blue-900 font-semibold mt-0.5">
                    Target: {action.targetCourseOrArea}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">
                    {action.reason}
                  </p>
                </div>
              </div>

              <div className="shrink-0 pl-9 sm:pl-0">
                <button
                  onClick={() => handleActionClick(action.actionRouteOrType)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-900 hover:text-white text-[#0C2340] rounded-md text-xs font-bold transition border border-slate-300 hover:border-blue-900"
                >
                  <span>{action.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. KAUSHAL SETU AI MARKET ALERT (HERO BANNER) */}
      <div className="bg-gradient-to-r from-red-50 via-amber-50 to-blue-50 rounded-2xl border-2 border-red-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Critical AI Telemetry Alert</span>
              </span>
              <span className="text-xs font-bold text-slate-600">
                Course Flagged for Curriculum Review
              </span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0C2340]">
                Automobile Engineering (MMV-201) &bull; Urgent EV Alignment Needed
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed max-w-3xl">
                <strong>72% of relevant automotive job postings in Nashik District</strong> now mention EV-related skills (PMSM motors, high-voltage battery safety, and CAN-bus scanning), while the current syllabus remains 90% ICE-focused.
              </p>
            </div>

            {/* Shift comparison */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 bg-white text-slate-700 rounded-md border border-slate-300 font-medium line-through">
                Current: ICE Carburettors &amp; Diesel Pumps
              </span>
              <ArrowRight className="w-4 h-4 text-blue-800" />
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-md border border-emerald-300 font-bold">
                Market Direction: EV Powertrain, BMS Diagnostics, Fast Charging
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
            <Link
              to="/training-centres/curriculum"
              className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-lg text-xs font-bold shadow-md transition"
            >
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Review AI Curriculum Annexure</span>
            </Link>

            <button
              onClick={() => setSelectedCourse(flaggedCourse)}
              className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-300 transition"
            >
              <span>View Course Deep-Dive</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. TWO SEPARATE DIAGNOSTIC RISK CARDS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            Structural Risk Diagnostics
          </h2>
          <span className="text-[11px] text-slate-400">
            Automated supply-side telemetry against Nashik cluster
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Technology Obsolescence Risk */}
          <div className="bg-white rounded-2xl border border-red-200 p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-red-100 text-red-800 uppercase tracking-wide">
                  Technology Obsolescence Risk: HIGH
                </span>
                <span className="text-xs text-slate-400 font-mono">MMV-201</span>
              </div>

              <h3 className="text-base font-extrabold text-[#0C2340]">
                Automobile Engineering (Mechanic Motor Vehicle)
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                <strong>Underlying technology relevance is declining rapidly.</strong> Traditional internal combustion engine (ICE) mechanical systems are being superseded by electric powertrains and software-defined electronic controls in commercial and passenger vehicles.
              </p>

              <div className="mt-3 p-3 bg-red-50/60 rounded-xl border border-red-100 text-xs text-red-950 space-y-1">
                <div className="font-bold">Recommended Intervention:</div>
                <div className="text-[11px]">
                  Adopt 120-hour Modular EV Curriculum Annexure, re-skill 2 faculty members, and acquire battery diagnostic test bench.
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-red-700">Placement: 58% (Declining)</span>
              <button
                onClick={() => setSelectedCourse(flaggedCourse)}
                className="text-xs font-bold text-blue-800 hover:underline flex items-center gap-1"
              >
                <span>View Full Diagnostic</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Course Oversupply Risk */}
          <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 uppercase tracking-wide">
                  Regional Oversupply Risk: HIGH
                </span>
                <span className="text-xs text-slate-400 font-mono">FIT-102</span>
              </div>

              <h3 className="text-base font-extrabold text-[#0C2340]">
                Fitter (Mechanical Assembly &amp; Fabrication)
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                <strong>Training capacity significantly exceeds expected regional demand.</strong> Across Nashik District, 14 institutions graduate 1,840 fitters annually, whereas projected annual local manufacturing absorption is capped at ~1,100 jobs.
              </p>

              <div className="mt-3 p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-xs text-amber-950 space-y-1">
                <div className="font-bold">Recommended Intervention:</div>
                <div className="text-[11px]">
                  Cap intake quota by 25% (reallocate 40 seats into CNC Machining or Robotics Automation) to preserve high wage and placement outcomes.
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800">Placement: 72% (Stagnant)</span>
              <button
                onClick={() => setSelectedCourse(oversuppliedCourse)}
                className="text-xs font-bold text-blue-800 hover:underline flex items-center gap-1"
              >
                <span>View Capacity Analysis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. COURSE CATALOGUE SNAPSHOT TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-extrabold text-[#0C2340]">Course Catalogue Health Matrix</h2>
            <p className="text-xs text-slate-500">
              Select any trade course to view dimensional radar scores, syllabus comparisons, and diagnostic telemetry.
            </p>
          </div>

          <Link
            to="/training-centres/courses"
            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-800 hover:underline shrink-0"
          >
            <span>View All 12 Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Trade Code &amp; Name</th>
                <th className="py-2.5 px-3">Market Demand</th>
                <th className="py-2.5 px-3">Placement</th>
                <th className="py-2.5 px-3">Tech Risk</th>
                <th className="py-2.5 px-3">Oversupply</th>
                <th className="py-2.5 px-3">Alignment</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(courses || []).slice(0, 6).map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCourse(c)}
                  className="hover:bg-blue-50/40 cursor-pointer transition"
                >
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {c.code} &bull; NSQF L{c.nsqfLevel} &bull; {c.annualCapacity} Seats
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        c.marketDemand === 'VERY HIGH'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.marketDemand === 'HIGH'
                          ? 'bg-blue-100 text-blue-800'
                          : c.marketDemand === 'MEDIUM'
                          ? 'bg-slate-100 text-slate-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {c.marketDemand}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-semibold font-mono">
                    {c.placementRate}%
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold ${
                        c.techObsolescenceRisk === 'HIGH'
                          ? 'text-red-600'
                          : c.techObsolescenceRisk === 'MEDIUM'
                          ? 'text-amber-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {c.techObsolescenceRisk}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold ${
                        c.oversupplyRisk === 'HIGH'
                          ? 'text-amber-700'
                          : c.oversupplyRisk === 'MEDIUM'
                          ? 'text-blue-700'
                          : 'text-slate-400'
                      }`}
                    >
                      {c.oversupplyRisk}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-bold font-mono text-blue-900">
                    {c.alignmentScore}%
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourse(c);
                      }}
                      className="px-2.5 py-1 text-[11px] font-bold text-blue-800 hover:bg-blue-100 rounded transition"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. DEMAND VS CAPACITY & GOVERNMENT NOTICES SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Regional Demand vs Supply */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-extrabold text-[#0C2340]">
                Nashik Regional Labour Demand vs. Training Capacity
              </h2>
              <p className="text-xs text-slate-500">
                Annual projected hiring vacancies versus aggregate vocational institute seat output
              </p>
            </div>
            <Link
              to="/training-centres/market-intelligence"
              className="text-xs font-bold text-blue-800 hover:underline shrink-0"
            >
              Cluster Map &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {DEMAND_VS_SUPPLY_DATA.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-800">{item.trade}</span>
                  <span
                    className={`font-mono font-bold text-[10px] px-2 py-0.5 rounded ${
                      item.type === 'DEFICIT'
                        ? 'bg-red-100 text-red-800'
                        : item.type === 'OVERSUPPLIED'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.type === 'DEFICIT'
                      ? `Deficit: ${Math.abs(item.gapOrSurplus).toLocaleString()} Technicians Needed`
                      : item.type === 'OVERSUPPLIED'
                      ? `Surplus: +${item.gapOrSurplus.toLocaleString()} Trainees Oversupplied`
                      : 'Balanced Capacity'}
                  </span>
                </div>

                {/* Comparative bar */}
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                  <div>
                    Projected Jobs: <strong>{item.projectedJobs.toLocaleString()}</strong>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mt-0.5 overflow-hidden">
                      <div
                        className="h-full bg-blue-700 rounded-full"
                        style={{ width: `${Math.min((item.projectedJobs / 60000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    Training Capacity: <strong>{item.currentCapacity.toLocaleString()}</strong>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mt-0.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.currentCapacity > item.projectedJobs ? 'bg-amber-600' : 'bg-emerald-600'
                        }`}
                        style={{ width: `${Math.min((item.currentCapacity / 60000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Government Notices Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-red-600" />
                <h2 className="text-sm font-extrabold text-[#0C2340]">Government Notices</h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                2 Active
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {(notices || []).slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className="py-3 hover:bg-slate-50 p-2 rounded-lg cursor-pointer transition"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-red-700">{notice.priority}</span>
                    <span className="text-slate-400 font-mono">Deadline: {notice.deadline}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 mt-1 leading-snug">
                    {notice.title}
                  </h3>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                    {notice.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              to="/training-centres/notices"
              className="w-full inline-flex items-center justify-center space-x-1.5 py-2 bg-slate-50 hover:bg-slate-100 text-blue-900 rounded-lg text-xs font-bold border border-slate-200 transition"
            >
              <span>View All Government Notices</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
