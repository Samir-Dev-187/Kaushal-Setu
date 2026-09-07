import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SITE_TRANSLATIONS } from '../../data/siteTranslations';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';
import { RefreshCw, ArrowRight, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { language } = useAuth();
  const t = SITE_TRANSLATIONS[language] || SITE_TRANSLATIONS.en;

  return (
    <section id="how-it-works" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <RefreshCw className="w-3.5 h-3.5 text-blue-700" />
            <span>
              {language === 'mr'
                ? 'रचना आणि डेटा प्रवाह'
                : language === 'hi'
                ? 'वास्तुकला एवं डेटा पाइपलाइन'
                : 'Architecture & Data Pipeline'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340] tracking-tight mt-2">
            {t.howTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            {language === 'mr'
              ? '६ टप्प्यांची बंद-लूप माहिती प्रणाली जी कामगार बाजाराचे थेट संकेत अभ्यासक्रमात रूपांतरित करते.'
              : language === 'hi'
              ? '6-चरणीय बंद-लूप प्रणाली जो लाइव श्रम बाजार संकेतों को अद्यतन पाठ्यक्रम में बदलती है।'
              : 'A 6-step closed-loop intelligence architecture translating live labour-market signals into validated curriculum upgrades.'}
          </p>
        </div>

        {/* 6-Step Interactive Timeline */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-200 via-amber-200 to-emerald-300 -translate-y-8 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
            {HOW_IT_WORKS_STEPS.map((item) => {
              const title =
                language === 'mr'
                  ? item.marathiTitle || item.title
                  : language === 'hi'
                  ? item.hindiTitle || item.title
                  : item.title;
              const subtitle =
                language === 'mr'
                  ? item.marathiSubtitle || item.subtitle
                  : language === 'hi'
                  ? item.hindiSubtitle || item.subtitle
                  : item.subtitle;
              const desc =
                language === 'mr'
                  ? item.marathiDescription || item.description
                  : language === 'hi'
                  ? item.hindiDescription || item.description
                  : item.description;

              return (
                <div
                  key={item.step}
                  className="bg-slate-50 hover:bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Step Number Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#0C2340] text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:bg-blue-700 transition-colors">
                        0{item.step}
                      </div>
                      {item.step === 4 && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                          {language === 'mr' ? 'तज्ज्ञ समिती' : language === 'hi' ? 'विशेषज्ञ समिति' : 'Human Gate'}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {title}
                    </h3>
                    <div className="text-[11px] font-semibold text-blue-800 mt-0.5 mb-2">
                      {subtitle}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {desc}
                    </p>
                  </div>

                  {/* Sub-inputs / tags */}
                  <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Key Components:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.inputs.map((inp, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-1.5 py-0.5 bg-white rounded border border-slate-200 text-slate-700 font-medium"
                        >
                          {inp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanatory callout for Human-in-the-Loop Validation */}
        <div className="mt-10 bg-gradient-to-r from-amber-50 to-blue-50 border border-amber-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2 bg-white rounded-lg border border-amber-300 shadow-2xs text-amber-600 mt-0.5 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-[#0C2340] text-sm">
                Step 4 Mandatory Human-in-the-Loop Safeguard:
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-normal">
                AI algorithms never automatically alter approved government or institutional course curricula. All AI generated signals serve as structured recommendations reviewed and ratified by official academic councils and industry advisory boards.
              </p>
            </div>
          </div>
          <a
            href="#four-stakeholders"
            className="whitespace-nowrap px-4 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white text-xs font-bold rounded-md shadow-xs transition"
          >
            Explore Stakeholders &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
