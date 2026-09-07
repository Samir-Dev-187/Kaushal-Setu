import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  Settings,
  Shield,
  LogOut,
  Sparkles,
  ExternalLink,
  Building2,
  Globe2,
  CheckCircle2
} from 'lucide-react';

interface TrainingCentreHeaderProps {
  onToggleMobileMenu?: () => void;
  activeBreadcrumbLabel?: string;
}

export const TrainingCentreHeader: React.FC<TrainingCentreHeaderProps> = ({
  onToggleMobileMenu,
  activeBreadcrumbLabel = 'Dashboard'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, language, setLanguage } = useAuth();
  const {
    provider,
    setProviderType,
    unreadNotificationCount,
    isNotificationsOpen,
    setIsNotificationsOpen
  } = useTrainingCentre();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login?role=training-centre');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Branding & Title */}
          <div className="flex items-center space-x-3">
            {/* Mobile hamburger button */}
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Open sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo Emblem */}
            <Link to="/training-centres" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0C2340] to-[#1E3A8A] flex items-center justify-center text-white font-bold text-sm shadow-xs border border-blue-900">
                <span className="text-amber-400 font-extrabold text-base">क</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-[#0C2340] text-base sm:text-lg tracking-tight leading-none group-hover:text-blue-900 transition-colors">
                    KAUSHAL SETU
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 border border-blue-200 uppercase tracking-wide">
                    Training Portal
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium tracking-wide">
                  Labour-Market Intelligence &bull; Supply-Side Workspace
                </div>
              </div>
            </Link>
          </div>

          {/* RIGHT: Controls & Profile */}
          <div className="flex items-center space-x-3">
            {/* Provider Type Switcher (Offline vs Online Demo Toggle) */}
            <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setProviderType('offline')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                  provider.providerType === 'offline'
                    ? 'bg-white text-blue-950 shadow-2xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Offline Training Centre / Physical Campus Demo"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-700" />
                <span>Offline Campus</span>
              </button>
              <button
                type="button"
                onClick={() => setProviderType('online')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                  provider.providerType === 'online'
                    ? 'bg-white text-blue-950 shadow-2xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Online Academy / MOOC Provider Demo"
              >
                <Globe2 className="w-3.5 h-3.5 text-purple-700" />
                <span>Online Academy</span>
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-slate-700" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>
            </div>

            {/* Language Selector */}
            <div className="hidden lg:flex items-center space-x-1 text-xs text-slate-600 border border-slate-200 rounded-md px-2 py-1 bg-slate-50">
              <button
                onClick={() => setLanguage('en')}
                className={`px-1 py-0.5 rounded font-bold ${language === 'en' ? 'text-blue-900 underline' : 'hover:text-slate-900'}`}
              >
                EN
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-1 py-0.5 rounded font-bold ${language === 'mr' ? 'text-blue-900 underline' : 'hover:text-slate-900'}`}
              >
                मराठी
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-1 py-0.5 rounded font-bold ${language === 'hi' ? 'text-blue-900 underline' : 'hover:text-slate-900'}`}
              >
                हिन्दी
              </button>
            </div>

            {/* Help Button */}
            <Link
              to="/training-centres/help"
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              title="Help &amp; User Manual"
            >
              <HelpCircle className="w-5 h-5 text-slate-700" />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 pl-2 pr-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
              >
                <div className="w-8 h-8 rounded-full bg-blue-900 text-amber-300 font-bold flex items-center justify-center text-xs shadow-2xs border border-blue-800">
                  {provider.name.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[130px]">
                    {provider.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                    <span>{provider.district}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs">
                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="font-extrabold text-[#0C2340] text-sm">{provider.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{provider.campusName}</div>
                    <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Training Provider</span>
                    </div>
                  </div>

                  {/* Menu links */}
                  <div className="py-1">
                    <Link
                      to="/training-centres/profile"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-900 font-medium"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>View Institute Profile</span>
                    </Link>

                    <Link
                      to="/training-centres/settings"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-900 font-medium"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span>Institute Settings</span>
                    </Link>

                    <Link
                      to="/training-centres/settings"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-900 font-medium"
                    >
                      <Shield className="w-4 h-4 text-slate-500" />
                      <span>Account Security &amp; 2FA</span>
                    </Link>

                    <Link
                      to="/training-centres/help"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-900 font-medium"
                    >
                      <HelpCircle className="w-4 h-4 text-slate-500" />
                      <span>Help &amp; Support Desk</span>
                    </Link>
                  </div>

                  {/* Sign Out */}
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2.5 px-4 py-2 text-red-600 hover:bg-red-50 font-bold transition text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Sign Out Portal</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
