import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SITE_TRANSLATIONS } from '../../data/siteTranslations';
import { HelpCircle, Phone, Info, Globe, Shield } from 'lucide-react';

export const GovernmentHeader: React.FC = () => {
  const { fontScale, setFontScale, language, setLanguage } = useAuth();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const t = SITE_TRANSLATIONS[language] || SITE_TRANSLATIONS.en;

  return (
    <div className="w-full bg-[#0A192F] text-slate-200 text-xs border-b border-slate-700">
      {/* Tricolor accent bar */}
      <div className="h-1 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]"></div>
        <div className="bg-white"></div>
        <div className="bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Skip to content for screen-readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:bg-blue-700 focus:text-white focus:px-3 focus:py-1 focus:rounded z-50 text-xs font-semibold"
        >
          Skip to Main Content
        </a>

        {/* Left: Emblem placeholder and Institutional identity */}
        <div className="flex items-center space-x-3">
          {/* Emblem placeholder */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-amber-500/50 flex items-center justify-center p-1 shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-amber-400">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" />
                <path d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-slate-100 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                {t.govIndia}
                <span className="inline-block w-1 h-1 rounded-full bg-slate-400"></span>
                <span className="text-slate-300 font-normal">{t.stateMaharashtra}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                {t.portalTitle}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Accessibility, Language, Help, Contact */}
        <div className="flex items-center flex-wrap gap-4 text-slate-300">
          {/* Font resizing */}
          <div className="flex items-center space-x-1 border-r border-slate-700 pr-3">
            <span className="text-[10px] text-slate-400 mr-1 hidden sm:inline">Accessibility:</span>
            <button
              onClick={() => setFontScale('sm')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                fontScale === 'sm' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
              title="Decrease Font Size"
              aria-label="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontScale('md')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                fontScale === 'md' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
              title="Standard Font Size"
              aria-label="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontScale('lg')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                fontScale === 'lg' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
              title="Increase Font Size"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Language toggle */}
          <div className="flex items-center space-x-1.5 border-r border-slate-700 pr-3">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                language === 'en' ? 'bg-slate-700 text-white font-bold' : 'hover:text-white'
              }`}
            >
              English
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                language === 'mr' ? 'bg-slate-700 text-white font-bold' : 'hover:text-white'
              }`}
              title="मराठी मध्ये वाचा"
            >
              मराठी
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                language === 'hi' ? 'bg-slate-700 text-white font-bold' : 'hover:text-white'
              }`}
              title="हिन्दी में पढ़ें"
            >
              हिन्दी
            </button>
          </div>

          {/* Help & Contact */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowHelpModal(true)}
              className="flex items-center space-x-1 hover:text-white text-slate-300"
              aria-label="Help Desk"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Helpdesk</span>
            </button>

            <a
              href="#footer-section"
              className="flex items-center space-x-1 hover:text-white text-slate-300"
              aria-label="Contact Information"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">Contact</span>
            </a>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-lg max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">Kaushal Setu Citizen Helpdesk</h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                <strong>Smart India Hackathon 2026 Prototype Help</strong>
              </p>
              <p className="text-xs bg-blue-50 text-blue-900 p-2.5 rounded border border-blue-100">
                This portal demonstrates continuous labour-market telemetry and curriculum-alignment for Maharashtra's vocational ecosystem.
              </p>
              <div className="space-y-1.5 text-xs">
                <div><strong>Toll-Free Helpline (Demo):</strong> 1800-111-2026</div>
                <div><strong>Support Email:</strong> support.kaushalsetu@gov-prototype.in</div>
                <div><strong>Working Hours:</strong> Mon - Fri, 09:30 AM to 06:00 PM IST</div>
                <div><strong>Demo OTP for Testing:</strong> <span className="font-mono bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-bold">123456</span></div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
