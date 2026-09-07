import React, { useState } from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import { RequestType } from '../../types/trainingCentre';
import {
  FileText,
  Send,
  Upload,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const NewRequestModal: React.FC = () => {
  const { isNewRequestModalOpen, setIsNewRequestModalOpen, addNewRequest } = useTrainingCentre();

  const [type, setType] = useState<RequestType>('Equipment Request');
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('Automobile Engineering (MMV-201)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isNewRequestModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addNewRequest({
        title,
        type,
        submittedDate: 'Today',
        status: 'Under Review',
        notes: `Course: ${course}. ${notes}`
      });
      setIsSubmitting(false);
      setTitle('');
      setNotes('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0C2340]">
                Submit Official Institution Request
              </h3>
              <p className="text-xs text-slate-500">
                Dispatches to State Directorate (DVET) &amp; NCVET Technical Cell
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNewRequestModalOpen(false)}
            className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Request Classification Type:
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as RequestType)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              <option value="Equipment Request">Equipment &amp; Workshop Tooling Subsidy</option>
              <option value="Curriculum Review">Curriculum Modernization &amp; NSQF Alignment</option>
              <option value="Trainer Certification">Faculty Train-the-Trainer (TTT) Deputation</option>
              <option value="Government Submission">Annual Compliance / Data Verification</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Target Course / Vocational Department:
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              <option value="Automobile Engineering (MMV-201)">Automobile Engineering (MMV-201)</option>
              <option value="Electrician (ELE-101)">Electrician (ELE-101)</option>
              <option value="Fitter (FIT-102)">Fitter (FIT-102)</option>
              <option value="Electric Vehicle Technician (EV-301)">Electric Vehicle Technician (EV-301)</option>
              <option value="Solar PV Technician (SOL-202)">Solar PV Technician (SOL-202)</option>
              <option value="Draughtsman Mechanical (DRM-105)">Draughtsman Mechanical (DRM-105)</option>
              <option value="General Institute Operations">General Institute Operations</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Subject / Request Title:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Procurement Sanction for EV High-Voltage Test Bench"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Justification &amp; Proposed Student Outcomes:
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe why this upgrade is needed based on regional industry placement telemetry..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-blue-600 focus:bg-white"
            ></textarea>
          </div>

          {/* Attachment upload mock */}
          <div className="p-3 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center text-slate-500">
            <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
            <span className="text-[11px] block font-medium">
              Attach Supporting Quotations or Council Resolution (PDF / JPG up to 10MB)
            </span>
            <span className="text-[10px] text-slate-400">Optional for initial draft</span>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsNewRequestModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-md text-xs font-bold shadow-2xs transition disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>{isSubmitting ? 'Transmitting Dossier...' : 'Submit to DVET Portal'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
