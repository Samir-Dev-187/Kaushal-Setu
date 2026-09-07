import React, { useState } from 'react';
import {
  HelpCircle,
  BookOpen,
  Phone,
  Mail,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const HelpDeskView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is Market Alignment calculated?',
      a: 'Market Alignment (0–100%) is an algorithmic composite score calculated across 6 key operational dimensions: Curriculum Relevance (live keyword frequency in job postings), Industry Demand, Trainer Certification Readiness, Workshop Tooling Readiness, Assessment Framework Alignment, and Graduate Placement Outcomes.'
    },
    {
      q: 'What is the critical difference between Technology Obsolescence Risk and Regional Oversupply Risk?',
      a: 'Technology Obsolescence Risk indicates that the underlying trade subject matter is becoming outdated due to technological shifts (e.g., Automobile Mechanics who only know ICE carburettors instead of EV diagnostics). Regional Oversupply Risk indicates that the trade skills are still relevant, but too many institutes are graduating trainees relative to the district’s hiring capacity (e.g., Fitter trade producing 1,840 graduates for 1,100 projected jobs).'
    },
    {
      q: 'Are Kaushal Setu AI curriculum recommendations immediately mandatory?',
      a: 'No. Kaushal Setu is strictly a decision-support copilot. AI recommendations are preliminary advisory drafts. Any academic changes require the formal 3-Stage Human Validation Governance: Institute Faculty review, Employer Advisory Council endorsement, and State Directorate (DVET/NCVET) gazette ratification.'
    },
    {
      q: 'How do I submit an equipment subsidy request under MSDE Green Skilling?',
      a: 'Navigate to "Equipment & Infrastructure" in the left sidebar, locate the recommended tooling (such as the EV Battery Diagnostic Trainer Rig), and click "Submit Equipment Subsidy Request". The system generates a pre-formatted government dossier with GeM specifications for state committee approval.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center space-x-2 mb-1">
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-xs">
            Institutional Support &amp; Knowledge Base
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#0C2340] tracking-tight">
          Help Desk &amp; Technical Assistance
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          User guides, regulatory FAQs, and direct institutional helplines for vocational administrators.
        </p>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-900" />
          <h2 className="text-base font-extrabold text-[#0C2340]">
            Frequently Answered Questions
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-3">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left flex items-center justify-between text-xs font-extrabold text-slate-900 hover:text-blue-900"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-blue-800 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {openFaq === idx && (
                <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 text-xs">
          <div className="font-extrabold text-[#0C2340] text-sm flex items-center space-x-2">
            <Phone className="w-4 h-4 text-blue-800" />
            <span>DVET State Helpdesk (Maharashtra)</span>
          </div>
          <p className="text-slate-600">
            For affiliation queries, inspection schedules, and annual data verification assistance:
          </p>
          <div className="font-mono font-bold text-slate-800 pt-1">
            Toll-Free: 1800-220-4560 (Mon–Fri, 9:30 AM – 6:00 PM)
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 text-xs">
          <div className="font-extrabold text-[#0C2340] text-sm flex items-center space-x-2">
            <Mail className="w-4 h-4 text-blue-800" />
            <span>Kaushal Setu Technical Support</span>
          </div>
          <p className="text-slate-600">
            For API synchronization, telemetry mismatch reports, and institutional account login help:
          </p>
          <div className="font-mono font-bold text-blue-900 pt-1">
            Email: support@kaushalsetu.gov.in
          </div>
        </div>
      </div>

      {/* SIH Hackathon Prototype Notice */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-300 text-xs text-slate-600 flex items-start space-x-3">
        <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800">Smart India Hackathon 2026 Innovation Architecture:</strong>
          <p className="mt-0.5">
            Designed for Problem Statement ID SIH26134 by Team CodeAmigos. Grounded in actual Maharashtra industrial clusters (Nashik, Chakan, Waluj). All intelligence feeds demonstrate real-world supply-side curriculum alignment.
          </p>
        </div>
      </div>
    </div>
  );
};
