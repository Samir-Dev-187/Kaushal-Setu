import React, { useState } from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  Bell,
  FileText,
  Download,
  Calendar,
  Building,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Clock
} from 'lucide-react';

export const GovernmentNoticesView: React.FC = () => {
  const { notices, setSelectedNotice, markNoticeAsRead } = useTrainingCentre();
  const [filter, setFilter] = useState('All');

  const filteredNotices = notices.filter((n) => {
    if (filter === 'All') return true;
    if (filter === 'Action Required') return n.actionRequired;
    if (filter === 'Completed') return n.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-xs">
                Official Regulatory Gazette &amp; Circulars
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">
                MSDE / NCVET / DVET Maharashtra
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0C2340] tracking-tight">
              Government Notices &amp; Compliance Circulars
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Statutory circulars, inspection schedules, annual verification portals, and capital equipment subsidies.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilter('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filter === 'All' ? 'bg-[#0C2340] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Circulars
            </button>
            <button
              onClick={() => setFilter('Action Required')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filter === 'Action Required' ? 'bg-[#0C2340] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Action Required
            </button>
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            onClick={() => setSelectedNotice(notice)}
            className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-700 hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase ${
                      notice.priority === 'Action Required' || notice.priority === 'Important'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    {notice.priority}
                  </span>
                  <span className="text-xs font-bold text-slate-500 font-mono">
                    Ref: {notice.id.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Published: {notice.date}</span>
                  </span>
                  <span>&bull;</span>
                  <span className="font-bold text-red-600">
                    Deadline: {notice.deadline}
                  </span>
                </div>
              </div>

              <h2 className="text-base font-extrabold text-[#0C2340] group-hover:text-blue-900 transition-colors">
                {notice.title}
              </h2>

              <div className="text-xs text-slate-500 font-semibold mt-1 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>Issuing Body: {notice.authority}</span>
              </div>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                {notice.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>{notice.pdfFileName}</span>
              </span>

              <button className="text-blue-800 font-bold hover:underline flex items-center gap-1">
                <span>View Directive &amp; Download</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
