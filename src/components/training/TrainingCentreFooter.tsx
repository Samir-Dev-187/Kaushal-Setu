import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, HelpCircle } from 'lucide-react';

export const TrainingCentreFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-xs text-slate-500 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left info */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 font-bold text-[#0C2340]">
              <span>Kaushal Setu</span>
              <span>&bull;</span>
              <span className="text-blue-800">Training Centre Portal</span>
              <span>&bull;</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-mono">
                System Status: All Telemetry Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              National Vocational Supply-Side Intelligence &amp; Curriculum-Alignment System
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 font-medium text-[11px]">
            <Link to="/training-centres/help" className="hover:text-blue-900">Support Desk</Link>
            <span>&bull;</span>
            <Link to="/training-centres/settings" className="hover:text-blue-900">Privacy &amp; Data Security</Link>
            <span>&bull;</span>
            <Link to="/training-centres/reports" className="hover:text-blue-900">Reports Audit</Link>
            <span>&bull;</span>
            <Link to="/training-centres/help" className="hover:text-blue-900">Accessibility Statement</Link>
          </div>
        </div>

        {/* Prototype Hackathon Notice */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              Smart India Hackathon 2026 Prototype &bull; Team CodeAmigos &bull; Problem Statement ID: SIH26134
            </span>
          </div>
          <div className="text-[10px] text-slate-400">
            Prototype demonstration environment. Live academic and curriculum revisions require formal DVET/NCVET gazette ratification.
          </div>
        </div>
      </div>
    </footer>
  );
};
