import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SupportedLang } from '../../data/siteTranslations';
import { EXPECTED_IMPACTS } from '../../data/mockData';
import { Target, CheckCircle2, TrendingUp, Users, Leaf, ShieldCheck } from 'lucide-react';

const IMPACT_TRANSLATIONS: Record<SupportedLang, { badge: string; title: string; subtitle: string; categories: Record<string, string> }> = {
  en: {
    badge: 'National Outcomes & Metrics',
    title: 'Expected Impact',
    subtitle: 'Measuring value across societal inclusion, enterprise competitiveness, green jobs expansion, and public governance integrity.',
    categories: {
      'SOCIAL IMPACT': 'SOCIAL IMPACT',
      'ECONOMIC & INDUSTRIAL': 'ECONOMIC & INDUSTRIAL',
      'ENVIRONMENTAL & CLEAN TECH': 'ENVIRONMENTAL & CLEAN TECH',
      'GOVERNANCE & POLICY INTEGRITY': 'GOVERNANCE & POLICY INTEGRITY'
    }
  },
  mr: {
    badge: 'राष्ट्रीय फलित आणि निर्देशांक',
    title: 'अपेक्षित प्रभाव आणि परिणाम',
    subtitle: 'सामाजिक समावेशकता, उद्योग स्पर्धात्मकता, हरित नोकऱ्यांचा विस्तार आणि पारदर्शक प्रशासनाचे मूल्यमापन.',
    categories: {
      'SOCIAL IMPACT': 'सामाजिक प्रभाव',
      'ECONOMIC & INDUSTRIAL': 'आर्थिक आणि औद्योगिक',
      'ENVIRONMENTAL & CLEAN TECH': 'पर्यावरण आणि हरित तंत्रज्ञान',
      'GOVERNANCE & POLICY INTEGRITY': 'प्रशासन आणि धोरण पारदर्शकता'
    }
  },
  hi: {
    badge: 'राष्ट्रीय परिणाम एवं संकेतक',
    title: 'अपेक्षित प्रभाव और परिणाम',
    subtitle: 'सामाजिक समावेशिता, उद्योग प्रतिस्पर्धात्मकता, हरित नौकरियों का विस्तार और पारदर्शी शासन का मूल्यांकन।',
    categories: {
      'SOCIAL IMPACT': 'सामाजिक प्रभाव',
      'ECONOMIC & INDUSTRIAL': 'आर्थिक एवं औद्योगिक',
      'ENVIRONMENTAL & CLEAN TECH': 'पर्यावरण एवं हरित तकनीक',
      'GOVERNANCE & POLICY INTEGRITY': 'शासन एवं नीति पारदर्शिता'
    }
  }
};

export const ExpectedImpact: React.FC = () => {
  const { language } = useAuth();
  const currentLang = (language as SupportedLang) || 'en';
  const t = IMPACT_TRANSLATIONS[currentLang] || IMPACT_TRANSLATIONS.en;

  const getCategoryIcon = (category: string) => {
    if (category.includes('SOCIAL')) return <Users className="w-5 h-5 text-blue-600" />;
    if (category.includes('ECONOMIC')) return <TrendingUp className="w-5 h-5 text-amber-600" />;
    if (category.includes('ENVIRONMENTAL')) return <Leaf className="w-5 h-5 text-emerald-600" />;
    return <ShieldCheck className="w-5 h-5 text-purple-600" />;
  };

  return (
    <section id="impact-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <Target className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340] tracking-tight mt-2">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Impact Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPECTED_IMPACTS.map((item, idx) => (
            <div
              key={idx}
              className={`bg-slate-50/70 rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center space-x-2.5 mb-3.5">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    {getCategoryIcon(item.category)}
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0C2340] uppercase tracking-wide">
                    {t.categories[item.category] || item.category}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/80 text-[10px] font-mono text-slate-400">
                {currentLang === 'mr' ? 'SIH प्रभाव आराखडा २०२६' : currentLang === 'hi' ? 'SIH प्रभाव ढांचा 2026' : 'SIH Impact Framework 2026'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

