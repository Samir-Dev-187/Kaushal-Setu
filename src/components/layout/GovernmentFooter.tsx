import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SITE_TRANSLATIONS } from '../../data/siteTranslations';
import { ShieldCheck, ExternalLink, Award, FileText, CheckCircle } from 'lucide-react';

export const GovernmentFooter: React.FC = () => {
  const { language } = useAuth();
  const t = SITE_TRANSLATIONS[language] || SITE_TRANSLATIONS.en;

  return (
    <footer id="footer-section" className="bg-[#0A192F] text-slate-300 border-t border-slate-800 text-xs">
      {/* Tricolor hairline */}
      <div className="h-1 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]"></div>
        <div className="bg-white"></div>
        <div className="bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-900 border border-amber-500/60 flex items-center justify-center p-1.5 shadow-sm">
                <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
                  <path
                    d="M6 38C12 28 20 25 24 25C28 25 36 28 42 38"
                    stroke="#FF9933"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 12C20 12 24 18 24 24C24 30 28 36 34 36"
                    stroke="#60A5FA"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="14" cy="12" r="3" fill="#FF9933" />
                  <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
                  <circle cx="34" cy="36" r="3" fill="#10B981" />
                </svg>
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">KAUSHAL SETU</span>
            </div>
            <div className="text-amber-400 font-bold text-xs">
              {language === 'mr'
                ? 'महाराष्ट्रातील व्यावसायिक कौशल्यांची उद्योग मागणीशी थेट सांगड'
                : language === 'hi'
                ? 'महाराष्ट्र के व्यावसायिक कौशलों को उद्योग की वास्तविक मांग से जोड़ना'
                : 'Bridging Skills with Industry Demand'}
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {language === 'mr'
                ? 'कामगार बाजार बुद्धिमत्ता आणि अभ्यासक्रम जुळवणी प्लॅटफॉर्म — प्रशिक्षण संस्था, उद्योग, उमेदवार आणि शासकीय विभागांचे एकाच व्यासपीठावर संकलन.'
                : language === 'hi'
                ? 'श्रम बाजार बुद्धिमत्ता एवं पाठ्यक्रम संरेखण प्लेटफॉर्म — प्रशिक्षण संस्थानों, उद्योगों और सरकारी विभागों का एकीकरण।'
                : 'A continuous Labour-Market Intelligence & Curriculum-Alignment Platform built to synchronize training institutes, industrial employers, candidates, and public skilling policy.'}
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1 rounded text-[10px] text-slate-300 border border-slate-700">
                <Award className="w-3 h-3 text-amber-400" />
                <span>Smart India Hackathon 2026 Prototype</span>
              </div>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3.5 border-l-2 border-amber-500 pl-2">
              Platform
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <a href="#why-kaushal-setu" className="hover:text-white transition">About Kaushal Setu</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition">How It Works (6-Step Loop)</a>
              </li>
              <li>
                <a href="#maharashtra-map" className="hover:text-white transition">Skill Intelligence Map</a>
              </li>
              <li>
                <a href="#four-stakeholders" className="hover:text-white transition">Training Centres Portal</a>
              </li>
              <li>
                <a href="#four-stakeholders" className="hover:text-white transition">Candidates &amp; Learners</a>
              </li>
              <li>
                <a href="#four-stakeholders" className="hover:text-white transition">Employers &amp; Industry</a>
              </li>
              <li>
                <a href="#four-stakeholders" className="hover:text-white transition">Government &amp; District Planning</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3.5 border-l-2 border-blue-500 pl-2">
              Resources &amp; Standards
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <a href="#case-study" className="hover:text-white transition">ICE to EV Case Study</a>
              </li>
              <li>
                <a href="#latest-updates" className="hover:text-white transition">Labour Market Reports</a>
              </li>
              <li>
                <a href="#related-schemes" className="hover:text-white transition">National &amp; State Schemes</a>
              </li>
              <li>
                <a href="#trust-intelligence" className="hover:text-white transition">AI Ethics &amp; Human Validation</a>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Accessibility Statement</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Privacy &amp; Data Governance</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Terms of Service</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Stakeholder Access */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3.5 border-l-2 border-emerald-500 pl-2">
              Stakeholder Access
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <Link to="/login?role=training-centre" className="hover:text-amber-400 transition flex items-center gap-1">
                  <span>Training Centre Login</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>
              </li>
              <li>
                <Link to="/login?role=employer" className="hover:text-amber-400 transition flex items-center gap-1">
                  <span>Employer Login</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>
              </li>
              <li>
                <Link to="/login?role=candidate" className="hover:text-amber-400 transition flex items-center gap-1">
                  <span>Candidate Login</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>
              </li>
              <li>
                <Link to="/login?role=admin" className="hover:text-amber-400 transition flex items-center gap-1">
                  <span>Government / Admin Login</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link to="/signup/candidate" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Register as Candidate &rarr;
                </Link>
              </li>
              <li>
                <Link to="/signup/employer" className="text-amber-400 hover:text-amber-300 font-semibold">
                  Register as Employer &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Institutional SIH Disclaimer Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Smart India Hackathon (SIH) 2026 Innovation Prototype</strong>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-slate-400 font-mono text-[11px]">
              <div>Team: <span className="text-white font-semibold">CodeAmigos</span></div>
              <div>Problem Statement ID: <span className="text-amber-400 font-semibold">SIH26134</span></div>
              <div>Category: <span className="text-white">Software / Smart Education &amp; Skilling</span></div>
            </div>
          </div>
          <div className="mt-2.5 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800 pt-2">
            <span className="font-semibold text-slate-300">Institutional Disclaimer:</span> This website is an educational prototype developed for the Smart India Hackathon 2026. It is designed in the aesthetic style of official Government of India and Government of Maharashtra digital portals to illustrate product design and user workflows. It does not represent an official government website, nor does it present official real-time ministerial statistics. All numeric values and operational metrics are illustrative prototype data.
          </div>
        </div>

        {/* Copyright and Meta Info */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>
            &copy; 2026 Kaushal Setu — Team CodeAmigos (SIH26134). All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>Last Updated: September 2026</span>
            <span>|</span>
            <span>Version: 1.0.4-prototype</span>
            <span>|</span>
            <span>Screen Reader Accessible</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
