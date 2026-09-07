import React, { useState } from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText,
  Download,
  Send,
  MessageSquare,
  Sparkles,
  Users,
  Building
} from 'lucide-react';

export const CurriculumIntelligenceView: React.FC = () => {
  const { humanValidation, submitCurriculumForReview, requestCurriculumChanges } =
    useTrainingCentre();
  const [revisionNote, setRevisionNote] = useState('');
  const [isRequestingChanges, setIsRequestingChanges] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState('');

  const handleApproveAndSubmit = () => {
    submitCurriculumForReview();
    setSubmitFeedback('Successfully submitted syllabus dossier to Employer Advisory Review Council (Tata Motors & Mahindra panel).');
    setTimeout(() => setSubmitFeedback(''), 4000);
  };

  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNote.trim()) return;
    requestCurriculumChanges(revisionNote);
    setRevisionNote('');
    setIsRequestingChanges(false);
    setSubmitFeedback('Revision request logged. AI Engine will generate adjusted module credit hours.');
    setTimeout(() => setSubmitFeedback(''), 4000);
  };

  const handleDownloadDossier = () => {
    alert('Downloading "MMV_201_Modular_EV_Curriculum_Annexure_2026.pdf" (Mock PDF Download)');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-bold text-xs">
                AI Curriculum Intelligence
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">
                Labour-Market Telemetry Match Engine
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0C2340] tracking-tight">
              Curriculum Modernization &amp; NSQF Alignment
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Automated mapping of local hiring requirements to syllabus competencies with strict human validation gates.
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-2">
            <button
              onClick={handleDownloadDossier}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold border border-slate-300 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Syllabus Annexure (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flagged Course Focus: Automobile Engineering */}
      <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border-2 border-red-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded bg-red-600 text-white font-extrabold text-[10px] uppercase">
              Urgent Modernization Required
            </span>
            <span className="text-xs font-bold text-slate-600 font-mono">
              Course Code: MMV-201
            </span>
          </div>

          <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Confidence: 89%</span>
          </span>
        </div>

        <h2 className="text-lg sm:text-xl font-black text-[#0C2340]">
          Automobile Engineering (Mechanic Motor Vehicle) &bull; 120-Hour Modular EV Annexure
        </h2>

        <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
          <strong>Labour-Market Evidence:</strong> Over the past 9 months, <strong>72% of automotive technical vacancies in Nashik District</strong> specified electric powertrain diagnostics, Lithium-Ion BMS safety protocols, and DC fast-charging systems. The traditional NCVT MMV curriculum allocates under 8 hours to electric mobility.
        </p>

        {/* Visual Syllabus Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {/* Left: Current Baseline Syllabus */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Current Syllabus Focus (Legacy)
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-200 px-2 py-0.5 rounded font-mono">
                90% ICE Systems
              </span>
            </div>

            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start space-x-2 p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-400 font-bold">&bull;</span>
                <div>
                  <div className="font-semibold text-slate-800">Four-Stroke &amp; Two-Stroke Petrol Engines</div>
                  <div className="text-[11px] text-slate-500">Overhauling carburettors, tappet adjustment (40 hrs)</div>
                </div>
              </li>

              <li className="flex items-start space-x-2 p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-400 font-bold">&bull;</span>
                <div>
                  <div className="font-semibold text-slate-800">Diesel Rotary Fuel Injection Pumps</div>
                  <div className="text-[11px] text-slate-500">Calibration and injector nozzle pressure testing (35 hrs)</div>
                </div>
              </li>

              <li className="flex items-start space-x-2 p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-400 font-bold">&bull;</span>
                <div>
                  <div className="font-semibold text-slate-800">Manual Clutch &amp; Synchromesh Gearbox</div>
                  <div className="text-[11px] text-slate-500">Mechanical friction plates and differential overhaul (45 hrs)</div>
                </div>
              </li>

              <li className="flex items-start space-x-2 p-2 bg-white rounded border border-slate-200">
                <span className="text-slate-400 font-bold">&bull;</span>
                <div>
                  <div className="font-semibold text-slate-800">Conventional 12V Lead-Acid Charging Systems</div>
                  <div className="text-[11px] text-slate-500">Hydrometer testing &amp; alternator diode rectification (25 hrs)</div>
                </div>
              </li>
            </ul>

            <div className="mt-3 p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 font-medium">
              ⚠️ Recommendation: Reduce mechanical carburettor and lead-acid maintenance hours by 50% to free up instructional capacity.
            </div>
          </div>

          {/* Right: AI Proposed Modular EV Syllabus */}
          <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                Proposed Modular EV Annexure (120 Hours)
              </span>
              <span className="text-[10px] text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded font-bold font-mono">
                + High Placement Growth
              </span>
            </div>

            <ul className="space-y-2 text-xs text-emerald-950">
              <li className="flex items-start space-x-2 p-2 bg-white rounded border border-emerald-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Module EV-1: High-Voltage Safety &amp; PPE Disconnect</div>
                  <div className="text-[11px] text-slate-600">Arc flash protection, insulated tools, safety interlock service plug (30 hrs)</div>
                </div>
              </li>

              <li className="flex items-start space-x-2 p-2 bg-white rounded border border-emerald-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Module EV-2: PMSM &amp; BLDC Traction Motor Controls</div>
                  <div className="text-[11px] text-slate-600">Inverter circuits, regenerative braking curve testing &amp; dyno tests (40 hrs)</div>
                </div>
              </li>

              <li className="flex items-start space-x-2 p-2 bg-white rounded border border-emerald-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Module EV-3: Lithium-Ion BMS &amp; Cell Thermal Safety</div>
                  <div className="text-[11px] text-slate-600">Cell balancing, thermal runaway mitigation, state-of-charge calculation (30 hrs)</div>
                </div>
              </li>

              <li className="flex items-start space-x-2 p-2 bg-white rounded border border-emerald-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Module EV-4: DC Fast Charging &amp; CAN-Bus OBD Diagnostics</div>
                  <div className="text-[11px] text-slate-600">CCS-2 plug protocol handshake, digital scan tools, live error coding (20 hrs)</div>
                </div>
              </li>
            </ul>

            <div className="mt-3 p-2.5 bg-emerald-100 rounded-lg border border-emerald-300 text-[11px] text-emerald-950 font-bold">
              ✓ Impact: Projected graduate placement uplift from 58% to 84% across Nashik and Chakan automotive clusters.
            </div>
          </div>
        </div>
      </div>

      {/* HUMAN VALIDATION GOVERNANCE WORKFLOW */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center space-x-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-blue-900" />
          <h2 className="text-base font-extrabold text-[#0C2340]">
            Multi-Stakeholder Human Validation Governance
          </h2>
        </div>
        <p className="text-xs text-slate-600 mb-6">
          AI proposals are strictly advisory drafts. Curriculum changes become accredited only after 3 levels of human review and formal DVET/NCVET gazette ratification.
        </p>

        {/* 4-Stage Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
          <div className="p-3.5 rounded-xl border bg-emerald-50 border-emerald-200">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
              <span>Stage 1: AI Drafting</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-[11px] text-emerald-800">Telemetry Analysis</div>
            <div className="text-[10px] text-slate-400 mt-1">Completed 02 Sep 2026</div>
          </div>

          <div
            className={`p-3.5 rounded-xl border ${
              humanValidation.progressIndex === 1
                ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-600'
                : 'bg-emerald-50 border-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-blue-950 mb-1">
              <span>Stage 2: Provider Review</span>
              {humanValidation.reviewedByCentre ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              )}
            </div>
            <div className="text-[11px] text-blue-900 font-semibold">Training Centre Cell</div>
            <div className="text-[10px] text-slate-500 mt-1">
              {humanValidation.reviewedByCentre ? 'Approved by Principal' : 'Action Pending'}
            </div>
          </div>

          <div
            className={`p-3.5 rounded-xl border ${
              humanValidation.progressIndex === 2
                ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-600'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>Stage 3: Industry Review</span>
              {humanValidation.progressIndex > 2 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : null}
            </div>
            <div className="text-[11px]">Employer Advisory Board</div>
            <div className="text-[10px] mt-1">Tata Motors / Mahindra</div>
          </div>

          <div className="p-3.5 rounded-xl border bg-slate-50 border-slate-200 text-slate-400">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>Stage 4: State Sanction</span>
            </div>
            <div className="text-[11px]">DVET / NCVET Gazette</div>
            <div className="text-[10px] mt-1">Accreditation Ratification</div>
          </div>
        </div>

        {/* Feedback alert */}
        {submitFeedback && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold animate-in fade-in">
            ✓ {submitFeedback}
          </div>
        )}

        {/* Action Controls for Stage 2 */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-bold text-slate-700">Current Status:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold">
              {humanValidation.currentStage}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {!isRequestingChanges ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsRequestingChanges(true)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold border border-slate-300 transition"
                >
                  Request Changes / Revisions
                </button>

                <button
                  type="button"
                  onClick={handleApproveAndSubmit}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-lg text-xs font-bold shadow-2xs transition"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Approve &amp; Submit to Employer Council</span>
                </button>
              </>
            ) : (
              <form onSubmit={handleSendRevision} className="flex items-center space-x-2">
                <input
                  type="text"
                  required
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  placeholder="Enter revision guidance for AI engine..."
                  className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs w-64 text-slate-900"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold"
                >
                  Submit Note
                </button>
                <button
                  type="button"
                  onClick={() => setIsRequestingChanges(false)}
                  className="px-2 py-1.5 text-slate-500 text-xs font-bold hover:text-slate-800"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Audit Log Timeline */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-xs">
          <div className="font-bold text-slate-500 uppercase tracking-wide text-[10px] mb-2">
            Audit Trail &amp; Stakeholder Commentary:
          </div>
          <div className="space-y-1.5">
            {humanValidation.reviewNotes.map((note, idx) => (
              <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 text-[11px]">
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
