import React from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  Users,
  Award,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Send,
  Building,
  Briefcase
} from 'lucide-react';

export const TrainersFacultyView: React.FC = () => {
  const { trainers, setSelectedTrainer, provider } = useTrainingCentre();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-xs">
                Faculty Cell &amp; Pedagogical Quality
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">{provider.name}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0C2340] tracking-tight">
              Trainers &amp; Faculty Competency Matrix
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              NCVET instructor certifications, industry immersion tracking, and upskilling pathways.
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-2">
            <button
              onClick={() => setSelectedTrainer(trainers[0])}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-lg text-xs font-bold shadow-2xs transition"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Enrol Faculty in TTT Cohort</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Faculty</span>
            <span className="text-xl font-extrabold text-[#0C2340] mt-0.5 block">18 Instructors</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <span className="text-emerald-700 text-[10px] uppercase font-bold block">Certified Current</span>
            <span className="text-xl font-extrabold text-emerald-800 mt-0.5 block">14 Trainers</span>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
            <span className="text-amber-800 text-[10px] uppercase font-bold block">Upskilling Needed</span>
            <span className="text-xl font-extrabold text-amber-900 mt-0.5 block">4 Instructors</span>
          </div>

          <div className="p-3 bg-red-50/60 rounded-xl border border-red-100">
            <span className="text-red-700 text-[10px] uppercase font-bold block">Critical Skill Gaps</span>
            <span className="text-xl font-extrabold text-red-800 mt-0.5 block">2 Flagged (EV)</span>
          </div>
        </div>
      </div>

      {/* Trainers List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trainers.map((tr) => (
          <div
            key={tr.id}
            onClick={() => setSelectedTrainer(tr)}
            className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-700 hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-900 font-extrabold flex items-center justify-center text-base border border-blue-200">
                    {tr.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors">
                      {tr.name}
                    </h2>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {tr.roleTitle} &bull; {tr.experienceYears} Yrs Exp
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    tr.certificationStatus === 'Certified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : tr.certificationStatus === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {tr.certificationStatus}
                </span>
              </div>

              {/* Specialization */}
              <div className="mt-3 text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Trade: </span>
                <span>{tr.specialization}</span>
              </div>

              {/* Skill Gap Warning */}
              {tr.skillGap !== 'None' && (
                <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-950 flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>
                    <strong>Gap: </strong> {tr.skillGap}
                  </span>
                </div>
              )}

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                  <span>Certification Modernization:</span>
                  <span className="font-mono text-slate-800">{tr.progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      tr.progressPercent === 100
                        ? 'bg-emerald-600'
                        : tr.progressPercent >= 60
                        ? 'bg-blue-600'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${tr.progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* OEM Partners */}
              <div className="mt-3 text-[10px] text-slate-400">
                <span>Industry Partners: {tr.oemPartners.join(', ')}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[10px]">NCVT Accredited</span>
              <button className="text-blue-800 font-bold hover:underline flex items-center gap-1">
                <span>View Full Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
