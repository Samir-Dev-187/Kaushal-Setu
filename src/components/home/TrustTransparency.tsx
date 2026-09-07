import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SupportedLang } from '../../data/siteTranslations';
import { ShieldCheck, Lock, Eye, CheckCircle } from 'lucide-react';

const TRUST_TRANSLATIONS: Record<SupportedLang, { badge: string; title: string; subtitle: string; point1: string; point2: string; point3: string; commitmentHeader: string; quote: string }> = {
  en: {
    badge: 'Ethical AI & Human-in-the-Loop Governance',
    title: 'How We Use Intelligence',
    subtitle: 'Kaushal Setu combines multiple labour-market signals to generate evidence-backed recommendations. AI-generated curriculum recommendations are intended for expert review and validation rather than automatic deployment.',
    point1: 'Explainable ML Models',
    point2: 'Academic Council Gatekeeping',
    point3: 'Zero Automated Policy Imposition',
    commitmentHeader: 'Core System Commitment:',
    quote: '“Kaushal Setu connects what industry needs, what training providers teach, what candidates learn, and where government invests — through continuously updated labour-market intelligence.”'
  },
  mr: {
    badge: 'नैतिक AI आणि मानवी नियंत्रण प्रशासन',
    title: 'आम्ही बुद्धिमत्ता कशी वापरतो',
    subtitle: 'कौशल सेतू अनेक कामगार-बाजार संकेतांना एकत्र करून पुरावा-आधारित शिफारशी तयार करते. AI द्वारे सुचवलेले अभ्यासक्रम बदल तज्ज्ञांच्या पुनरावलोकनानंतरच लागू केले जातात.',
    point1: 'स्पष्ट आणि पारदर्शक AI मॉडेल',
    point2: 'शिक्षण परिषद मान्यता पद्धत',
    point3: 'कोणताही नियम स्वयंचलितपणे लादला जात नाही',
    commitmentHeader: 'प्लॅटफॉर्मचे मुख्य वचनबद्धता:',
    quote: '“कौशल सेतू उद्योगाची गरज, प्रशिक्षण संस्थांचे अध्यापन, उमेदवारांचे शिक्षण आणि शासनाची गुंतवणूक यांना एकाच रिअल-टाइम माहितीने जोडते.”'
  },
  hi: {
    badge: 'नैतिक AI एवं मानव-नियंत्रित शासन',
    title: 'हम इंटेलिजेंस का उपयोग कैसे करते हैं',
    subtitle: 'कौशल सेतु साक्ष्य-आधारित सिफारिशें उत्पन्न करने के लिए कई श्रम-बाजार संकेतों को जोड़ता है। AI-जनित पाठ्यक्रम सिफारिशें विशेषज्ञों की समीक्षा के बाद ही स्वीकृत होती हैं।',
    point1: 'व्याख्या योग्य AI मॉडल',
    point2: 'अकादमिक परिषद समीक्षा',
    point3: 'कोई स्वचालित नीति थोपना नहीं',
    commitmentHeader: 'मुख्य प्रणाली प्रतिबद्धता:',
    quote: '“कौशल सेतु उद्योग की आवश्यकता, प्रशिक्षण केंद्रों की शिक्षा, उम्मीदवारों के कौशल और सरकारी निवेश को निरंतर अद्यतन टेलीमेट्री से जोड़ता है।”'
  }
};

export const TrustTransparency: React.FC = () => {
  const { language } = useAuth();
  const currentLang = (language as SupportedLang) || 'en';
  const t = TRUST_TRANSLATIONS[currentLang] || TRUST_TRANSLATIONS.en;

  return (
    <section id="trust-intelligence" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-[#0A192F] text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-blue-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left 8 Cols */}
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {t.title}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-3xl">
                {t.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t.point1}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t.point2}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t.point3}</span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Highlight statement */}
            <div className="lg:col-span-4 bg-white/5 p-4 rounded-xl border border-white/10 text-xs text-blue-100 space-y-2">
              <div className="font-bold text-white text-xs uppercase tracking-wider">
                {t.commitmentHeader}
              </div>
              <p className="italic text-[11px] leading-relaxed text-blue-200">
                {t.quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

