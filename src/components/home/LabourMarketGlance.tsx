import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { MARKET_GLANCE_STATS } from '../../data/mockData';
import { Activity, AlertCircle, TrendingUp } from 'lucide-react';

export const LabourMarketGlance: React.FC = () => {
  const { language } = useAuth();

  return (
    <section id="market-glance" className="py-12 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-1">
              <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>
                {language === 'mr'
                  ? 'रिअल-टाइम कामगार बाजार टेलिमेट्री'
                  : language === 'hi'
                  ? 'वास्तविक समय श्रम बाजार टेलीमेट्री'
                  : 'Real-Time Ingestion Telemetry'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C2340] tracking-tight">
              {language === 'mr'
                ? 'कामगार बाजाराची सद्यस्थिती'
                : language === 'hi'
                ? 'श्रम बाजार की एक झलक'
                : 'Labour Market at a Glance'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              {language === 'mr'
                ? 'नोकरीच्या जाहिराती, उद्योग अभिप्राय आणि अभ्यासक्रम प्रासंगिकता निर्देशांकांचे सतत विश्लेषण.'
                : language === 'hi'
                ? 'क्षेत्रीय नौकरी पोस्टिंग, नियोक्ता परामर्श और पाठ्यक्रम प्रासंगिकता सूचकांकों का निरंतर विश्लेषण।'
                : 'Continuous analysis of regional job postings, employer consultations, and course relevance indices.'}
            </p>
          </div>

          {/* Explicit Illustrative Prototype Disclaimer Banner */}
          <div className="inline-flex items-center space-x-2 bg-amber-50/90 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-lg text-xs self-start md:self-auto">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold">
                {language === 'mr'
                  ? 'प्रात्यक्षिक प्रोटोटाइप डॅशबोर्ड:'
                  : language === 'hi'
                  ? 'प्रदर्शनात्मक प्रोटोटाइप डैशबोर्ड:'
                  : 'Illustrative prototype dashboard:'}
              </span>
              <span className="text-[11px] text-amber-800 ml-1">
                {language === 'mr'
                  ? 'SIH मूल्यमापनासाठी नमुना डेटा.'
                  : language === 'hi'
                  ? 'SIH मूल्यांकन के लिए नमूना डेटा।'
                  : 'Sample data for SIH evaluation, not official census statistics.'}
              </span>
            </div>
          </div>
        </div>

        {/* 6 High-Impact Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {MARKET_GLANCE_STATS.map((item) => {
            const label =
              language === 'mr'
                ? item.marathiLabel || item.label
                : language === 'hi'
                ? item.hindiLabel || item.label
                : item.label;
            const detail =
              language === 'mr'
                ? item.marathiDetail || item.detail
                : language === 'hi'
                ? item.hindiDetail || item.detail
                : item.detail;

            return (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide leading-tight min-h-[28px]">
                    {label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0C2340] tracking-tight mt-2">
                    {item.value}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                  <div className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3" />
                    <span>{item.change}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">
                    {detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Insight Banner */}
        <div className="mt-6 bg-blue-900 text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-lg bg-blue-800 border border-blue-600 flex items-center justify-center text-amber-400 font-extrabold text-sm shrink-0">
              AI
            </div>
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-slate-100">National Skills Alignment:</span>{' '}
              <span className="text-blue-200">
                Signals automatically map against National Skills Qualifications Framework (NSQF) &amp; NCVET competency registries.
              </span>
            </div>
          </div>
          <a
            href="#ice-ev-case"
            className="whitespace-nowrap px-4 py-2 bg-white text-[#0C2340] hover:bg-slate-100 font-bold text-xs rounded-md shadow-xs transition"
          >
            Explore Case Study &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
