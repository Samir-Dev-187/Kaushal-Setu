import React from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  FileText,
  Plus,
  Clock,
  CheckCircle2,
  ChevronRight,
  Send,
  AlertCircle
} from 'lucide-react';

export const RequestsApplicationsView: React.FC = () => {
  const { requests, setIsNewRequestModalOpen } = useTrainingCentre();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-bold text-xs">
                Institutional Regulatory Desk
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">DVET &amp; NCVET Dossier Dispatch</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0C2340] tracking-tight">
              Requests &amp; Official Applications
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Track multi-stage government approvals for equipment subsidies, faculty upskilling, and syllabus annexures.
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-2">
            <button
              onClick={() => setIsNewRequestModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-lg text-xs font-bold shadow-md transition"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Submit New Request</span>
            </button>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 uppercase">
                    {req.type}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Ref: {req.referenceNumber}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-[#0C2340] mt-1.5">
                  {req.title}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    req.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : req.status === 'Draft'
                      ? 'bg-slate-100 text-slate-700'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  Status: {req.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              {req.notes}
            </p>

            {/* 5-Stage Timeline */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Dossier Scrutiny &amp; Sanction Progression:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {req.stageTimeline.map((st, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg border text-center ${
                      st.completed
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-bold'
                        : st.current
                        ? 'bg-blue-50 border-blue-400 ring-1 ring-blue-500 text-blue-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-slate-400">Stage 0{i + 1}</div>
                    <div className="text-[11px] mt-0.5 leading-tight">{st.stage}</div>
                    {st.date && (
                      <div className="text-[9px] text-slate-400 mt-1">{st.date}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
