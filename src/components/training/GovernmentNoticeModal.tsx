import React from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  FileText,
  Calendar,
  Building,
  Download,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

export const GovernmentNoticeModal: React.FC = () => {
  const { selectedNotice, setSelectedNotice, markNoticeAsRead } = useTrainingCentre();

  if (!selectedNotice) return null;

  const handleDownload = () => {
    alert(`Downloading official circular file: ${selectedNotice.pdfFileName} (Prototype Mock Download)`);
  };

  const handleMarkComplete = () => {
    markNoticeAsRead(selectedNotice.id);
    setSelectedNotice(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 bg-red-50 text-red-700 rounded-xl border border-red-200 shrink-0 mt-0.5">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 uppercase">
                  {selectedNotice.priority}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Circular ID: {selectedNotice.id.toUpperCase()}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#0C2340] mt-1 leading-snug">
                {selectedNotice.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setSelectedNotice(null)}
            className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Metadata */}
        <div className="mt-4 grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Issuing Authority:</span>
            <span className="font-semibold text-slate-800">{selectedNotice.authority}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Circular Date:</span>
            <span className="font-semibold text-slate-800">{selectedNotice.date}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Action Deadline:</span>
            <span className="font-bold text-red-600">{selectedNotice.deadline}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Compliance Status:</span>
            <span className="font-semibold text-amber-700">{selectedNotice.status}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 space-y-2 text-xs text-slate-600">
          <div className="font-bold text-slate-800">Official Directive Text:</div>
          <p className="leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
            {selectedNotice.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md text-xs font-bold border border-slate-300 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Signed Circular (PDF)</span>
          </button>

          <div className="w-full sm:w-auto flex items-center justify-end space-x-2">
            <button
              onClick={() => setSelectedNotice(null)}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Close
            </button>
            <button
              onClick={handleMarkComplete}
              className="px-4 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-md text-xs font-bold shadow-2xs transition flex items-center space-x-1"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acknowledge &amp; Mark as Read</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
