import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SITE_TRANSLATIONS } from '../../data/siteTranslations';
import { ChevronDown, Menu, X, Sparkles } from 'lucide-react';

interface DropdownState {
  training: boolean;
  candidates: boolean;
  employers: boolean;
  government: boolean;
}

export const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useAuth();
  const t = SITE_TRANSLATIONS[language] || SITE_TRANSLATIONS.en;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState<DropdownState>({
    training: false,
    candidates: false,
    employers: false,
    government: false
  });
  const [noticeModal, setNoticeModal] = useState<{ title: string; desc: string; roleRoute: string } | null>(null);

  // Timeouts to prevent mouseleave flickering
  const timers: { [key in keyof DropdownState]?: NodeJS.Timeout } = {};

  const handleMouseEnter = (key: keyof DropdownState) => {
    if (timers[key]) clearTimeout(timers[key]);
    setDropdowns((prev) => ({ ...prev, [key]: true }));
  };

  const handleMouseLeave = (key: keyof DropdownState) => {
    timers[key] = setTimeout(() => {
      setDropdowns((prev) => ({ ...prev, [key]: false }));
    }, 150); // 150ms buffer prevents glitching when moving mouse quickly
  };

  return (
    <nav className="w-full bg-[#0C2340] text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 text-[13px] font-semibold">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-amber-400 hover:bg-white/10 transition-colors"
            >
              {t.home}
            </Link>

            <a
              href="#why-kaushal-setu"
              className="px-3 py-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {t.about}
            </a>

            <a
              href="#how-it-works"
              className="px-3 py-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {t.howItWorks}
            </a>

            <a
              href="#maharashtra-map"
              className="px-3 py-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <span>{t.skillIntelligence}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </a>

            {/* Training Centres Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter('training')}
              onMouseLeave={() => handleMouseLeave('training')}
            >
              <Link
                to="/training-centres"
                className="px-3 py-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
              >
                <span>{t.trainingCentres}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdowns.training ? 'rotate-180 text-amber-400' : 'opacity-70'}`} />
              </Link>
              {dropdowns.training && (
                <div className="absolute left-0 top-full pt-1.5 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200/90 py-2 text-xs font-medium divide-y divide-slate-100 overflow-hidden">
                    <div className="py-1">
                      <Link
                        to="/training-centres"
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50/80 hover:text-blue-950 flex items-center justify-between transition-colors group/item"
                      >
                        <span className="font-semibold text-slate-800 group-hover/item:text-blue-950">{t.tcPortal}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full shrink-0">Live</span>
                      </Link>
                      <Link
                        to="/training-centres/curriculum"
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50/80 hover:text-blue-950 flex items-center justify-between transition-colors group/item"
                      >
                        <span className="font-semibold text-slate-800 group-hover/item:text-blue-950">{t.curriculumIntel}</span>
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-full shrink-0">AI Core</span>
                      </Link>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/training-centres/courses"
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors block"
                      >
                        {t.courseCat}
                      </Link>
                      <Link
                        to="/training-centres/market-intelligence"
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors block"
                      >
                        {t.marketDemand}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Candidates Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter('candidates')}
              onMouseLeave={() => handleMouseLeave('candidates')}
            >
              <Link
                to="/candidates"
                className="px-3 py-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
              >
                <span>{t.candidates}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdowns.candidates ? 'rotate-180 text-amber-400' : 'opacity-70'}`} />
              </Link>
              {dropdowns.candidates && (
                <div className="absolute left-0 top-full pt-1.5 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200/90 py-2 text-xs font-medium divide-y divide-slate-100 overflow-hidden">
                    <div className="py-1">
                      <Link
                        to="/candidates"
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50/80 hover:text-blue-950 flex items-center justify-between transition-colors group/item"
                      >
                        <span className="font-semibold text-slate-800 group-hover/item:text-blue-950">{t.candPortal}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full shrink-0">Live</span>
                      </Link>
                      <Link
                        to="/candidates"
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50/80 hover:text-blue-950 flex items-center justify-between transition-colors group/item"
                      >
                        <span className="font-semibold text-slate-800 group-hover/item:text-blue-950">{t.outcomeCheck}</span>
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-full shrink-0">Truth Data</span>
                      </Link>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/candidates"
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors block"
                      >
                        {t.skillPassport}
                      </Link>
                      <Link
                        to="/candidates"
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors block"
                      >
                        {t.napsApprentice}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Employers Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter('employers')}
              onMouseLeave={() => handleMouseLeave('employers')}
            >
              <Link
                to="/employers"
                className="px-3 py-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
              >
                <span>{t.employers}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdowns.employers ? 'rotate-180 text-amber-400' : 'opacity-70'}`} />
              </Link>
              {dropdowns.employers && (
                <div className="absolute left-0 top-full pt-1.5 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200/90 py-2 text-xs font-medium divide-y divide-slate-100 overflow-hidden">
                    <div className="py-1">
                      <Link
                        to="/employers"
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50/80 hover:text-blue-950 flex items-center justify-between transition-colors group/item"
                      >
                        <span className="font-semibold text-slate-800 group-hover/item:text-blue-950">{t.empSurvey}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full shrink-0">Live</span>
                      </Link>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/employers/signals"
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors block"
                      >
                        {t.demandSignals}
                      </Link>
                      <Link
                        to="/employers/feedback"
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors block"
                      >
                        {t.curriculumFeedback}
                      </Link>
                      <Link
                        to="/employers/apprenticeships"
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors block"
                      >
                        {t.mapsPipeline}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Government Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleMouseEnter('government')}
              onMouseLeave={() => handleMouseLeave('government')}
            >
              <Link
                to="/admin"
                className="px-3 py-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
              >
                <span>{t.government}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdowns.government ? 'rotate-180 text-amber-400' : 'opacity-70'}`} />
              </Link>
              {dropdowns.government && (
                <div className="absolute left-0 top-full pt-1.5 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200/90 py-2 text-xs font-medium divide-y divide-slate-100 overflow-hidden">
                    <div className="py-1">
                      <Link
                        to="/admin"
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50/80 hover:text-blue-950 flex items-center justify-between transition-colors group/item"
                      >
                        <span className="font-semibold text-slate-800 group-hover/item:text-blue-950">{t.heatmap36}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full shrink-0">Live</span>
                      </Link>
                      <Link
                        to="/admin/inference-matrix"
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50/80 hover:text-blue-950 flex items-center justify-between transition-colors group/item"
                      >
                        <span className="font-semibold text-slate-800 group-hover/item:text-blue-950">{t.pdfInference}</span>
                        <span className="text-[10px] bg-purple-100 text-purple-900 font-extrabold px-2 py-0.5 rounded-full shrink-0">MSNAS</span>
                      </Link>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/admin/course-sanctions"
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors block"
                      >
                        {t.itiSanctions}
                      </Link>
                      <Link
                        to="/admin/dsdp-planning"
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors block"
                      >
                        {t.dsdpPlanning}
                      </Link>
                      <Link
                        to="/admin/budget-roi"
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors block"
                      >
                        {t.budgetRoi}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#case-study"
              className="px-3 py-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {t.insights}
            </a>

            <a
              href="#related-schemes"
              className="px-3 py-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {t.schemes}
            </a>

            <a
              href="#footer-section"
              className="px-3 py-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {t.contact}
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Navigation Portal
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md hover:bg-white/10 text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1A2F] border-t border-slate-700 px-4 pt-2 pb-6 space-y-1 text-sm font-medium">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-amber-400 font-bold"
          >
            {t.home}
          </Link>
          <a
            href="#why-kaushal-setu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-slate-200 hover:bg-white/5"
          >
            {t.about}
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-slate-200 hover:bg-white/5"
          >
            {t.howItWorks}
          </a>
          <a
            href="#maharashtra-map"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-slate-200 hover:bg-white/5"
          >
            {t.skillIntelligence}
          </a>
          <Link
            to="/training-centres"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-amber-400 font-bold hover:bg-white/5 flex items-center justify-between"
          >
            <span>{t.tcPortal}</span>
            <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded">Live</span>
          </Link>
          <Link
            to="/candidates"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-blue-300 font-bold hover:bg-white/5 flex items-center justify-between"
          >
            <span>{t.candPortal}</span>
            <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded">Live</span>
          </Link>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded font-bold"
            >
              {t.signIn}
            </Link>
            <Link
              to="/signup/candidate"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded font-bold"
            >
              {t.register}
            </Link>
          </div>
        </div>
      )}

      {/* Module Under Development Modal */}
      {noticeModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-lg max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center space-x-2 text-blue-900 pb-3 border-b border-slate-100">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-base">{noticeModal.title}</h3>
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              {noticeModal.desc}
            </p>
            <div className="mt-4 p-3 bg-blue-50 rounded text-xs text-blue-950 border border-blue-100 space-y-1">
              <div className="font-semibold">Notice for SIH 2026 Evaluation:</div>
              <div>Per Hackathon prototype requirements, you can preview the authenticated role interface through the <strong>Sign In &rarr; Demo Login</strong> workflow.</div>
            </div>
            <div className="mt-5 flex items-center justify-end space-x-2">
              <button
                onClick={() => setNoticeModal(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setNoticeModal(null);
                  navigate('/login');
                }}
                className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-1.5 rounded text-xs font-semibold"
              >
                Proceed to Demo Login
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
