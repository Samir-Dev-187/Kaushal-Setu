import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SupportedLang } from '../../data/siteTranslations';
import { Building, Briefcase, Users, ShieldCheck, ArrowRight } from 'lucide-react';

const CTA_TRANSLATIONS: Record<SupportedLang, { badge: string; title: string; subtitle: string; tc: string; emp: string; cand: string; gov: string; note: string }> = {
  en: {
    badge: 'Stakeholder Gateways',
    title: 'Be Part of the Skill Future',
    subtitle: 'Whether you train, hire, learn or govern — Kaushal Setu connects your decisions to the same evolving picture of labour-market demand.',
    tc: "I'm a Training Centre",
    emp: "I'm an Employer",
    cand: "I'm a Candidate",
    gov: "I'm from Government",
    note: 'Instant demo access available with pre-configured prototype credentials.'
  },
  mr: {
    badge: 'भागधारक प्रवेशद्वार',
    title: 'भविष्यातील कौशल्य क्रांतीत सहभागी व्हा',
    subtitle: 'तुम्ही प्रशिक्षण देता, भरती करता, शिकता किंवा धोरण ठरवता — कौशल सेतू तुम्हाला रिअल-टाइम उद्योग माहितीशी जोडते.',
    tc: 'मी प्रशिक्षण केंद्र आहे',
    emp: 'मी उद्योग / रोजगारदाता आहे',
    cand: 'मी उमेदवार आहे',
    gov: 'मी शासकीय प्रतिनिधी आहे',
    note: 'प्रोटोटाइप तपासण्यासाठी पूर्व-सेट केलेल्या खात्यांद्वारे त्वरित प्रवेश उपलब्ध.'
  },
  hi: {
    badge: 'हितधारक प्रवेश द्वार',
    title: 'कौशल भविष्य का हिस्सा बनें',
    subtitle: 'चाहे आप प्रशिक्षण देते हों, भर्ती करते हों, सीखते हों या नीति बनाते हों — कौशल सेतु आपके निर्णयों को लाइव उद्योग मांग से जोड़ता है।',
    tc: 'मैं प्रशिक्षण केंद्र हूं',
    emp: 'मैं नियोक्ता हूं',
    cand: 'मैं उम्मीदवार हूं',
    gov: 'मैं सरकारी विभाग से हूं',
    note: 'परीक्षण के लिए पूर्व-संपादित क्रेडेंशियल के साथ त्वरित डेमो उपलब्ध।'
  }
};

export const CallToAction: React.FC = () => {
  const { language } = useAuth();
  const currentLang = (language as SupportedLang) || 'en';
  const t = CTA_TRANSLATIONS[currentLang] || CTA_TRANSLATIONS.en;

  return (
    <section id="cta-section" className="py-16 bg-[#0C2340] text-white relative overflow-hidden">
      {/* Subtle background decorative shapes */}
      <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-blue-600/10 pointer-events-none blur-3xl"></div>
      <div className="absolute -left-16 -top-16 w-96 h-96 rounded-full bg-amber-500/10 pointer-events-none blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
          {t.badge}
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto">
          {t.title}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {t.subtitle}
        </p>

        {/* 4 Stakeholder Action Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-4xl mx-auto">
          <Link
            to="/login?role=training-centre"
            className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-[#0C2340] py-3 px-4 rounded-lg font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
          >
            <Building className="w-4 h-4 text-blue-700" />
            <span>{t.tc}</span>
          </Link>

          <Link
            to="/login?role=employer"
            className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-[#0C2340] py-3 px-4 rounded-lg font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
          >
            <Briefcase className="w-4 h-4 text-amber-600" />
            <span>{t.emp}</span>
          </Link>

          <Link
            to="/login?role=candidate"
            className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-[#0C2340] py-3 px-4 rounded-lg font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
          >
            <Users className="w-4 h-4 text-emerald-600" />
            <span>{t.cand}</span>
          </Link>

          <Link
            to="/login?role=admin"
            className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-100 text-[#0C2340] py-3 px-4 rounded-lg font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-purple-700" />
            <span>{t.gov}</span>
          </Link>
        </div>

        <div className="mt-6 text-xs text-slate-400">
          {t.note}
        </div>
      </div>
    </section>
  );
};

