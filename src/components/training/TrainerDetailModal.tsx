import React, { useState } from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  User,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

export const TrainerDetailModal: React.FC = () => {
  const { selectedTrainer, setSelectedTrainer } = useTrainingCentre();
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  if (!selectedTrainer) return null;

  const handleStartCertification = () => {
    setEnrollSuccess(true);
    setTimeout(() => {
      alert(`Enrolment request submitted for ${selectedTrainer.name} to State Faculty Upskilling Cell.`);
      setEnrollSuccess(false);
      setSelectedTrainer(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-lg border border-blue-200">
              {selectedTrainer.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-extrabold text-[#0C2340]">
                  {selectedTrainer.name}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    selectedTrainer.certificationStatus === 'Certified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedTrainer.certificationStatus === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedTrainer.certificationStatus}
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {selectedTrainer.roleTitle} &bull; {selectedTrainer.specialization}
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedTrainer(null)}
            className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-4 space-y-4 text-xs">
          {/* Quick Details */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Academic Qualification:</span>
              <span className="font-semibold text-slate-800">{selectedTrainer.qualification}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Instructional Experience:</span>
              <span className="font-semibold text-slate-800">{selectedTrainer.experienceYears} Years</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Email Contact:</span>
              <span className="font-mono text-slate-700">{selectedTrainer.email}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Phone / Mobile:</span>
              <span className="font-mono text-slate-700">{selectedTrainer.phone}</span>
            </div>
          </div>

          {/* Skill Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <div className="font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Current Mastered Competencies:</span>
                <span className="text-[10px] text-emerald-700">Verified</span>
              </div>
              <ul className="space-y-1 text-slate-600 text-[11px]">
                {selectedTrainer.currentSkills.map((sk, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{sk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200">
              <div className="font-bold text-amber-900 mb-1.5 flex items-center justify-between">
                <span>High-Demand Gaps Identified:</span>
                <span className="text-[10px] text-amber-800 font-bold">Action Needed</span>
              </div>
              <ul className="space-y-1 text-amber-950 text-[11px]">
                {selectedTrainer.requiredSkills.map((sk, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5">
                    <AlertCircle className="w-3 h-3 text-amber-600" />
                    <span>{sk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Overall Modernization Certification Progress:</span>
              <span className="text-blue-700 font-mono">{selectedTrainer.progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-700 rounded-full transition-all"
                style={{ width: `${selectedTrainer.progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Recommended Industry Pipeline Courses */}
          <div>
            <div className="font-bold text-slate-800 text-xs mb-1.5">
              Recommended OEM / Industry Training Pathways:
            </div>
            <div className="space-y-1.5">
              {selectedTrainer.recommendedCourses.map((c, i) => (
                <div key={i} className="p-2.5 bg-blue-50/50 rounded-lg border border-blue-200 flex items-center justify-between">
                  <span className="font-semibold text-blue-950">{c}</span>
                  <span className="text-[10px] font-bold text-blue-700 px-2 py-0.5 rounded bg-white border border-blue-200">
                    Sponsored
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* OEM Partners */}
          <div className="flex items-center space-x-2 text-[11px] text-slate-500 pt-1">
            <span className="font-bold text-slate-700">Affiliated Corporate Mentors:</span>
            <span>{selectedTrainer.oemPartners.join(', ')}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setSelectedTrainer(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Close
          </button>

          <button
            onClick={handleStartCertification}
            disabled={enrollSuccess}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-md text-xs font-bold shadow-2xs transition"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{enrollSuccess ? 'Processing Enrolment...' : 'Start Certification Path'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
