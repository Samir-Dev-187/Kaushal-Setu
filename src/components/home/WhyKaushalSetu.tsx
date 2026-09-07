import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SITE_TRANSLATIONS } from '../../data/siteTranslations';
import { PROBLEM_CARDS } from '../../data/mockData';
import { ArrowRight, AlertCircle, CheckCircle2, Shield } from 'lucide-react';

export const WhyKaushalSetu: React.FC = () => {
  const { language } = useAuth();
  const t = SITE_TRANSLATIONS[language] || SITE_TRANSLATIONS.en;

  return (
    <section id="why-kaushal-setu" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 bg-blue-100/70 px-3 py-1 rounded-full">
            <Shield className="w-3.5 h-3.5 text-blue-700" />
            <span>
              {language === 'mr'
                ? 'समस्या आणि पद्धतशीर उपाय'
                : language === 'hi'
                ? 'समस्या कथन और व्यवस्थित उत्तर'
                : 'Problem Statement & Systematic Response'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340] tracking-tight mt-2">
            {t.whyTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            {t.whySubtitle}
          </p>
        </div>

        {/* 4 Cards: Transition from Problem to Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.number}
              className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Card Header with Number */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-slate-300 group-hover:text-blue-600 transition-colors font-mono">
                    {card.number}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">
                    Core Challenge
                  </span>
                </div>

                {/* The Problem */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {card.problemTitle}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
                    &ldquo;{card.problemText}&rdquo;
                  </p>
                </div>
              </div>

              {/* The Kaushal Setu Solution Transition */}
              <div className="bg-gradient-to-r from-blue-50/80 via-slate-50 to-emerald-50/40 p-5 border-t border-slate-100">
                <div className="flex items-center space-x-1.5 text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Kaushal Setu Solution: {card.solutionTitle}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {card.solutionText}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom takeaway banner */}
        <div className="mt-10 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-slate-700">
            <span className="font-extrabold text-[#0C2340]">The Continuous Value Proposition:</span>{' '}
            Instead of 5-year periodic reviews, Kaushal Setu delivers quarterly telemetry-driven recommendations with academic human validation.
          </div>
          <a
            href="#how-it-works"
            className="whitespace-nowrap px-4 py-2 bg-[#0C2340] text-white text-xs font-bold rounded-md hover:bg-[#1E3A8A] transition flex items-center gap-1.5 shadow-2xs"
          >
            <span>See 6-Step Workflow</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
