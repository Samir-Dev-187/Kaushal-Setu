import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SupportedLang } from '../../data/siteTranslations';
import { RELATED_SCHEMES } from '../../data/mockData';
import { SchemeItem } from '../../types';
import { Landmark, ExternalLink, Shield, Check } from 'lucide-react';

const SCHEME_TRANSLATIONS: Record<SupportedLang, { badge: string; title: string; subtitle: string; overviewBtn: string; disclaimer: string }> = {
  en: {
    badge: 'Institutional Integration',
    title: 'Skill Development Ecosystem',
    subtitle: "Kaushal Setu is designed to enrich and inform India's established vocational networks, state societies, and national skilling frameworks.",
    overviewBtn: 'Overview',
    disclaimer: '* Kaushal Setu serves as an intelligence and curriculum-alignment bridge. It does not replace or administer these public schemes directly.'
  },
  mr: {
    badge: 'संस्थात्मक एकात्मता',
    title: 'कौशल्य विकास परिसंस्था',
    subtitle: 'कौशल सेतू महाराष्ट्रातील शासकीय संस्था, कौशल्य विकास अभियाने आणि राष्ट्रीय आराखड्यांना अधिक सक्षम बनवते.',
    overviewBtn: 'माहिती पहा',
    disclaimer: '* कौशल सेतू ही केवळ कौशल्य बुद्धिमत्ता आणि अभ्यासक्रम जोडणी प्रणाली आहे. ती शासकीय योजनांचे थेट वाटप करत नाही.'
  },
  hi: {
    badge: 'संस्थागत एकीकरण',
    title: 'कौशल विकास पारिस्थितिकी तंत्र',
    subtitle: 'कौशल सेतु भारत के स्थापित व्यावसायिक नेटवर्क, राज्य अभियानों और राष्ट्रीय कौशल ढांचे को सुदृढ़ बनाने के लिए बनाया गया है।',
    overviewBtn: 'विवरण देखें',
    disclaimer: '* कौशल सेतु एक इंटेलिजेंस और पाठ्यक्रम-समन्वयन प्लेटफॉर्म है। यह सीधे सरकारी योजनाओं का प्रशासन नहीं करता।'
  }
};

export const RelatedInitiatives: React.FC = () => {
  const { language } = useAuth();
  const currentLang = (language as SupportedLang) || 'en';
  const t = SCHEME_TRANSLATIONS[currentLang] || SCHEME_TRANSLATIONS.en;
  const [activeModalScheme, setActiveModalScheme] = useState<SchemeItem | null>(null);

  return (
    <section id="related-schemes" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <Landmark className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340] tracking-tight mt-2">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 8 Scheme Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RELATED_SCHEMES.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-slate-50/70 hover:bg-blue-50/30 rounded-xl p-5 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between shadow-2xs group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-blue-800 border border-slate-200 uppercase">
                    {scheme.abbr}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {scheme.type}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                  {scheme.name}
                </h3>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                  {scheme.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  {currentLang === 'mr' ? 'लाभार्थी:' : currentLang === 'hi' ? 'लाभार्थी:' : 'Beneficiaries:'} {scheme.targetAudience.split(',')[0]}
                </span>
                <button
                  onClick={() => setActiveModalScheme(scheme)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                >
                  <span>{t.overviewBtn}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer on external schemes */}
        <div className="mt-8 text-center text-xs text-slate-400">
          {t.disclaimer}
        </div>
      </div>

      {/* Scheme Detail Modal */}
      {activeModalScheme && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded">
                  {activeModalScheme.type}
                </span>
                <h3 className="font-bold text-base text-[#0C2340] mt-1">
                  {activeModalScheme.name} ({activeModalScheme.abbr})
                </h3>
              </div>
              <button
                onClick={() => setActiveModalScheme(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-slate-600">
              <p className="leading-relaxed">
                {activeModalScheme.description}
              </p>
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                <div><strong>{currentLang === 'mr' ? 'लक्ष्य गट:' : currentLang === 'hi' ? 'लक्ष्य समूह:' : 'Target Stakeholders:'}</strong> {activeModalScheme.targetAudience}</div>
                <div><strong>Kaushal Setu Integration:</strong> Feeds regional micro-skill gaps and course health ratings to optimize trade selection and apprentice onboarding.</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalScheme(null)}
                className="bg-[#0C2340] hover:bg-[#1E3A8A] text-white px-4 py-2 rounded text-xs font-bold"
              >
                {currentLang === 'mr' ? 'बंद करा' : currentLang === 'hi' ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

