import React from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  Wrench,
  Video,
  IndianRupee,
  Users,
  Target,
  Send,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Layers,
  FileCheck,
  Plus
} from 'lucide-react';
import { ONLINE_CONTENT_ITEMS } from '../../data/trainingCentreData';

export const EquipmentOperationsView: React.FC = () => {
  const {
    provider,
    equipmentList,
    setSelectedEquipment,
    setIsNewRequestModalOpen
  } = useTrainingCentre();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-xs">
                {provider.providerType === 'offline'
                  ? 'Workshop & Lab Modernization'
                  : 'Digital Course Content Intelligence'}
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">
                {provider.providerType === 'offline'
                  ? 'Hardware Tooling Infrastructure'
                  : 'E-Learning Pedagogical Freshness'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0C2340] tracking-tight">
              {provider.providerType === 'offline'
                ? 'Equipment & Lab Modernization Plan'
                : 'Learning Content & Simulation Health'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {provider.providerType === 'offline'
                ? 'Capital tooling requisitions aligned with MSDE Green Skilling Subsidies and Dual-System standards.'
                : 'Real-time assessment of syllabus freshness, virtual simulation coverage, and video engagement.'}
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-2">
            <button
              onClick={() => setIsNewRequestModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-lg text-xs font-bold shadow-2xs transition"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>{provider.providerType === 'offline' ? 'Submit Tooling Subsidy' : 'Request Content Upgrade'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* CONDITIONAL RENDERING BASED ON PROVIDER TYPE */}
      {provider.providerType === 'offline' ? (
        /* OFFLINE ITI PERSPECTIVE: EQUIPMENT UPGRADE PLAN */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Recommended Workshop Tooling Upgrades (Nashik Campus)
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Total Recommended Outlay: ₹9.6 Lakhs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equipmentList.map((eq) => (
              <div
                key={eq.id}
                onClick={() => setSelectedEquipment(eq)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-700 hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                        eq.priority === 'Critical'
                          ? 'bg-red-100 text-red-800'
                          : eq.priority === 'High'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {eq.priority} Priority
                    </span>

                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {eq.budgetTier} Tier
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#0C2340] group-hover:text-blue-900 transition-colors">
                    {eq.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Target Course: {eq.targetCourse}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 p-2.5 bg-slate-50 rounded-xl text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        Estimated Cost
                      </span>
                      <span className="font-extrabold text-slate-900 text-sm">
                        ₹{eq.estimatedCostLakhs} Lakhs
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        Trainees Impacted
                      </span>
                      <span className="font-bold text-blue-900 text-sm">
                        {eq.studentsImpactedPerYear} / Year
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
                    {eq.requiredFor}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Status: {eq.status}
                  </span>
                  <button className="text-blue-800 font-bold hover:underline flex items-center gap-1">
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ONLINE ACADEMY PERSPECTIVE: LEARNING CONTENT HEALTH */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
              Digital Course Content &amp; Virtual Simulator Matrix
            </h2>
            <span className="text-xs text-slate-400">14,200 Active Online Learners</span>
          </div>

          <div className="space-y-4">
            {ONLINE_CONTENT_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                        item.status === 'Missing Content'
                          ? 'bg-red-100 text-red-800'
                          : item.status === 'Update Recommended'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.status}
                    </span>
                    <h3 className="text-base font-extrabold text-[#0C2340] mt-1">
                      {item.courseName}
                    </h3>
                    <div className="text-xs text-slate-500">{item.moduleName}</div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-bold">Content Freshness</span>
                      <span className="font-mono font-bold text-blue-900 text-base">{item.freshnessScore}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Video Lecture Coverage:</span>
                    <strong className="text-slate-800">{item.videoCoveragePercent}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Virtual Simulator Active:</span>
                    <strong className={item.practicalSimulationAvailable ? 'text-emerald-700' : 'text-red-600'}>
                      {item.practicalSimulationAvailable ? '✓ Enabled' : '✗ Missing Simulator'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Assessment Coverage:</span>
                    <strong className="text-slate-800">{item.assessmentCoveragePercent}%</strong>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950">
                  <strong>AI Content Diagnostic: </strong>
                  {item.recommendationText}
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-600 mb-1">
                    Recommended Interactive Additions:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.interactiveAdditions.map((sim, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-blue-50 text-blue-900 rounded-md border border-blue-200 text-xs font-semibold"
                      >
                        + {sim}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
