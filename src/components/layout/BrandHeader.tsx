import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, UserPlus, Shield, UserCheck, ChevronDown, Award, LogOut, ArrowRight } from 'lucide-react';

export const BrandHeader: React.FC = () => {
  const { user, logout, language } = useAuth();
  const navigate = useNavigate();
  const [showSignUpDropdown, setShowSignUpDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSignUpDropdown(false);
      }
    };
    if (showSignUpDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSignUpDropdown]);

  const getDashboardRoute = (role: string) => {
    switch (role) {
      case 'training-centre':
        return '/training-centres';
      case 'employer':
        return '/employers';
      case 'candidate':
        return '/candidates';
      case 'admin':
        return '/admin';
      default:
        return '/login';
    }
  };

  return (
    <div className={`w-full bg-white border-b border-slate-200 shadow-[0_2px_4px_rgba(0,0,0,0.03)] relative ${showSignUpDropdown ? 'z-[60]' : 'z-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Brand Identity & Bridge Motif Logo */}
        <Link to="/" className="flex items-center space-x-3.5 group">
          {/* Custom Kaushal Setu Logo (Bridge connecting Industry, AI, Skills, Jobs in K/S shape) */}
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#0C2340] to-[#1E3A8A] flex items-center justify-center p-2 shadow-md border border-blue-900/40 shrink-0 group-hover:shadow-lg transition-all">
            <svg viewBox="0 0 48 48" fill="none" className="w-9 h-9">
              {/* Bridge Arch base */}
              <path
                d="M6 38C12 28 20 25 24 25C28 25 36 28 42 38"
                stroke="#FF9933"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Dynamic S-K crossing pathway */}
              <path
                d="M14 12C20 12 24 18 24 24C24 30 28 36 34 36"
                stroke="#60A5FA"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Connecting Nodes (Industry, AI, Skills, Jobs) */}
              <circle cx="14" cy="12" r="3" fill="#FF9933" />
              <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
              <circle cx="34" cy="36" r="3" fill="#10B981" />
              <circle cx="36" cy="14" r="2.5" fill="#93C5FD" />
              <path d="M24 24L36 14" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            </div>
          </div>

          <div className="leading-none">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-[#0C2340]">
                KAUSHAL SETU
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                SIH 2026
              </span>
            </div>
            <div className="text-[13px] sm:text-[14px] font-bold text-blue-900 mt-0.5 tracking-tight">
              {language === 'mr'
                ? 'महाराष्ट्रातील व्यावसायिक कौशल्यांची उद्योग मागणीशी थेट सांगड'
                : language === 'hi'
                ? 'महाराष्ट्र के व्यावसायिक कौशलों को उद्योग की वास्तविक मांग से जोड़ना'
                : 'Bridging Skills with Industry Demand'}
            </div>
            <div className="text-[11px] sm:text-[12px] text-slate-500 font-medium mt-0.5">
              {language === 'mr'
                ? 'कामगार बाजार बुद्धिमत्ता आणि अभ्यासक्रम जुळवणी प्लॅटफॉर्म'
                : language === 'hi'
                ? 'श्रम बाजार बुद्धिमत्ता एवं पाठ्यक्रम संरेखण प्लेटफॉर्म'
                : 'Labour-Market Intelligence & Curriculum-Alignment Platform'}
            </div>
          </div>
        </Link>

        {/* Right: Authentication Action Center */}
        <div className="flex items-center space-x-3 self-end md:self-auto">
          {user ? (
            <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-lg p-1.5 pl-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 justify-end">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {user.userName}
                </div>
                <div className="text-[10px] text-slate-500 capitalize">
                  Role: <span className="font-semibold text-blue-700">{user.role.replace('-', ' ')}</span>
                </div>
              </div>
              <button
                onClick={() => navigate(getDashboardRoute(user.role))}
                className="inline-flex items-center space-x-1.5 bg-[#0C2340] hover:bg-[#1E3A8A] text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm transition"
              >
                <span>Workspace</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={logout}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100 transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2.5">
              {/* Sign In Button */}
              <Link
                to="/login"
                id="btn-nav-signin"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs sm:text-sm font-bold text-[#0C2340] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors shadow-xs"
              >
                <LogIn className="w-4 h-4 text-blue-800" />
                <span>Sign In</span>
              </Link>

              {/* Sign Up Dropdown / Button */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  id="btn-nav-signup"
                  onClick={() => setShowSignUpDropdown(!showSignUpDropdown)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs sm:text-sm font-bold text-white bg-[#0C2340] hover:bg-[#1E3A8A] border border-blue-900 shadow-sm transition-colors"
                  aria-expanded={showSignUpDropdown}
                >
                  <UserPlus className="w-4 h-4 text-amber-400" />
                  <span>Sign Up</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {/* Dropdown Menu for Role Signups */}
                {showSignUpDropdown && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-2xl border border-slate-200 p-2 z-[70] text-left">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Public Registration (Role-Based)
                    </div>

                    <Link
                      to="/signup/candidate"
                      onClick={() => setShowSignUpDropdown(false)}
                      className="flex items-start space-x-2.5 p-2.5 rounded-md hover:bg-blue-50 transition group"
                    >
                      <div className="p-1.5 bg-blue-100 text-blue-700 rounded mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                          Candidate Registration
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight">
                          For vocational learners, diploma students, and job seekers.
                        </div>
                      </div>
                    </Link>

                    <Link
                      to="/signup/employer"
                      onClick={() => setShowSignUpDropdown(false)}
                      className="flex items-start space-x-2.5 p-2.5 rounded-md hover:bg-blue-50 transition group mt-1"
                    >
                      <div className="p-1.5 bg-amber-100 text-amber-700 rounded mt-0.5">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-amber-700">
                          Employer Registration
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight">
                          For hiring enterprises, MSMEs, and industry partners.
                        </div>
                      </div>
                    </Link>

                    {/* Notice for Training Centre & Government */}
                    <div className="mt-2 p-2 bg-slate-50 rounded border border-slate-100 text-[10px] text-slate-500 leading-tight">
                      <span className="font-semibold text-slate-700">Institutional Notice:</span> Training Centre and Government accounts are provisioned exclusively through verified credentials. Use{' '}
                      <Link
                        to="/login"
                        onClick={() => setShowSignUpDropdown(false)}
                        className="text-blue-700 underline font-medium"
                      >
                        Sign In
                      </Link>{' '}
                      with your institutional ID.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
