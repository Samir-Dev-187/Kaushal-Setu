import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SupportedLang } from '../../data/siteTranslations';
import { WHY_DIFFERENT_PILLARS } from '../../data/mockData';
import { Activity, AlertTriangle, CheckCircle2, Network, Sparkles } from 'lucide-react';

const WHY_TRANSLATIONS: Record<SupportedLang, { badge: string; title: string; subtitle: string; pillars: Array<{ title: string; subtitle: string; description: string }>; verifiedText: string }> = {
  en: {
    badge: 'Innovation & Unique Value',
    title: 'Why Kaushal Setu is Different',
    subtitle: 'Four foundational pillars that elevate Kaushal Setu above static, one-time policy revisions and fragmented surveys.',
    verifiedText: 'Verified SIH Innovation',
    pillars: [
      {
        title: 'Continuous Telemetry Engine',
        subtitle: 'Dynamic hiring & job board telemetry',
        description: 'Replaces 3-year static surveys with real-time MIDC cluster hiring signals, NAPS postings, and employer telemetry.'
      },
      {
        title: 'Intervention Interrupt',
        subtitle: 'Honest outcome guidance',
        description: 'Prevents candidates from committing 2 years to oversupplied or obsolete trades by presenting transparent placement truth.'
      },
      {
        title: 'AI Diagnostic Scoring',
        subtitle: 'NCVET & 5-parameter analysis',
        description: 'Evaluates PDF course syllabi automatically against NCVET frameworks, industry equipment needs, and emerging technologies.'
      },
      {
        title: 'Integrated Governance',
        subtitle: 'Single source of truth',
        description: 'Binds candidate passports, employer signals, training centre lab readiness, and government sanctions into one workflow.'
      }
    ]
  },
  mr: {
    badge: 'नाविन्यता आणि अद्वितीय मूल्य',
    title: 'कौशल सेतू का वेगळे आहे?',
    subtitle: 'चार मुख्य आधारस्तंभ जे कौशल सेतूला जुन्या आणि संथ धोरण पद्धतींपेक्षा अधिक प्रभावी बनवतात.',
    verifiedText: 'प्रमाणित SIH नाविन्यपूर्ण उपक्रम',
    pillars: [
      {
        title: 'सतत टेलिमेट्री इंजिन',
        subtitle: 'थेट उद्योग व भरती संकेत संकलन',
        description: 'दर ३ वर्षांनी होणाऱ्या संथ सर्वेक्षणांऐवजी MIDC उद्योग व नोकरी संकेत रिअल-टाइममध्ये गोळा करते.'
      },
      {
        title: 'सत्यता दर्शक मार्गदर्शक',
        subtitle: 'पारदर्शक रोजगार माहिती',
        description: 'कमी मागणी असलेल्या ट्रेडवर उमेदवारांचे २ वर्षे वाया जाण्यापासून वाचवून त्यांना योग्य दिशा दाखवते.'
      },
      {
        title: 'AI अभ्यासक्रम मूल्यमापन',
        subtitle: 'NCVET व ५-घटक ऑटोमेटेड तपासणी',
        description: 'अभ्यासक्रम PDF चे NCVET मानकांनुसार स्वयंचलित मूल्यमापन करून अद्ययावत बदल सुचवते.'
      },
      {
        title: 'एकात्मिक प्रशासन',
        subtitle: 'माहितीचा एकमेव विश्वसनीय स्त्रोत',
        description: 'उमेदवार पासपोर्ट, उद्योग संकेत, प्रयोगशाळा क्षमता व शासकीय मंजुरी एकाच प्लॅटफॉर्मवर जोडते.'
      }
    ]
  },
  hi: {
    badge: 'नवाचार एवं विशिष्ट मूल्य',
    title: 'कौशल सेतु क्यों अलग है?',
    subtitle: 'चार मुख्य आधार स्तंभ जो कौशल सेतु को पारंपरिक और धीमी नीतियों से अलग और प्रभावी बनाते हैं।',
    verifiedText: 'सत्यापित SIH नवोन्मेष',
    pillars: [
      {
        title: 'सतत टेलीमेट्री इंजन',
        subtitle: 'लाइव उद्योग एवं भर्ती डेटा',
        description: 'पुराने सर्वेक्षणों के बजाय MIDC क्लस्टर भर्ती संकेतों और नियोक्ता डेटा को वास्तविक समय में एकत्र करता है।'
      },
      {
        title: 'सत्यता दर्शक मार्गदर्शन',
        subtitle: 'पारदर्शी प्लेसमेंट जानकारी',
        description: 'कम मांग वाले ट्रेडों में उम्मीदवारों का 2 वर्ष बर्बाद होने से बचाकर पारदर्शी मार्गदर्शन प्रदान करता है।'
      },
      {
        title: 'AI पाठ्यक्रम मूल्यांकन',
        subtitle: 'NCVET एवं 5-पैरामीटर स्वचालित जांच',
        description: 'पाठ्यक्रम PDF का NCVET मानकों और उद्योग आवश्यकताओं के अनुसार स्वचालित मूल्यांकन करता है।'
      },
      {
        title: 'एकीकृत शासन प्रणाली',
        subtitle: 'विश्वसनीय एकल स्रोत',
        description: 'उम्मीदवार पासपोर्ट, उद्योग संकेत, प्रयोगशाला तैयारी और सरकारी स्वीकृतियों को एक मंच पर जोड़ता है।'
      }
    ]
  }
};

export const WhyDifferent: React.FC = () => {
  const { language } = useAuth();
  const currentLang = (language as SupportedLang) || 'en';
  const t = WHY_TRANSLATIONS[currentLang] || WHY_TRANSLATIONS.en;

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-blue-700" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'Network':
      default:
        return <Network className="w-5 h-5 text-purple-700" />;
    }
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340] tracking-tight mt-2">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_DIFFERENT_PILLARS.map((pillar, idx) => {
            const pData = t.pillars[idx] || pillar;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 p-6 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:bg-blue-50/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center mb-4">
                    {getPillarIcon(pillar.iconName)}
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 font-bold mb-1">
                    {currentLang === 'mr' ? `आधारस्तंभ ०${idx + 1}` : currentLang === 'hi' ? `स्तंभ 0${idx + 1}` : `PILLAR 0${idx + 1}`}
                  </div>

                  <h3 className="text-base font-bold text-[#0C2340] tracking-tight">
                    {pData.title}
                  </h3>

                  <div className="text-xs font-semibold text-blue-800 mt-1 mb-3">
                    {pData.subtitle}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {pData.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                  {t.verifiedText}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
