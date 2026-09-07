import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { DEMO_CREDENTIALS } from '../data/mockData';
import { GovernmentHeader } from '../components/layout/GovernmentHeader';
import { BrandHeader } from '../components/layout/BrandHeader';
import { GovernmentFooter } from '../components/layout/GovernmentFooter';
import {
  Lock,
  User,
  Building,
  Briefcase,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Info,
  Check,
  AlertCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithCredentials, setSelectedRole: setContextRole } = useAuth();

  const queryRole = searchParams.get('role') as UserRole | null;
  const [activeRole, setActiveRole] = useState<UserRole>(queryRole || 'candidate');

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  useEffect(() => {
    if (queryRole && ['training-centre', 'employer', 'candidate', 'admin'].includes(queryRole)) {
      setActiveRole(queryRole);
    }
  }, [queryRole]);

  const handleRoleSelect = (role: UserRole) => {
    setActiveRole(role);
    setContextRole(role);
    setErrorMsg('');
  };

  const handleApplyDemoCredentials = (credRole: UserRole) => {
    const cred = DEMO_CREDENTIALS.find((c) => c.role === credRole);
    if (cred) {
      setActiveRole(cred.role);
      setUserId(cred.id);
      setPassword(cred.password);
      setErrorMsg('');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      setErrorMsg('Please enter both User ID and Password.');
      return;
    }

    // Match against demo credentials or accept credentials matching role
    const matchedCred = DEMO_CREDENTIALS.find((c) => c.role === activeRole);
    const userName = matchedCred ? matchedCred.name : 'Authorized Stakeholder';
    const orgName = matchedCred ? matchedCred.orgName : '';

    loginWithCredentials(activeRole, userId, userName, orgName);
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9]">
      <GovernmentHeader />
      <BrandHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex items-center justify-center">
        <div className="w-full max-w-xl">
          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* Form Header */}
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200 mb-2">
                <Lock className="w-3 h-3 text-blue-700" />
                <span>Unified Stakeholder Authentication</span>
              </div>
              <h1 className="text-2xl font-extrabold text-[#0C2340] tracking-tight">
                Sign in to Kaushal Setu
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Select your designated role to enter the secure labour-market intelligence portal.
              </p>
            </div>

            {/* Role Selector Grid */}
            <div className="mt-6">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                1. Select Stakeholder Role:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleRoleSelect('candidate')}
                  className={`p-2.5 rounded-lg border text-center transition flex flex-col items-center justify-center space-y-1 ${
                    activeRole === 'candidate'
                      ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Users className={`w-4 h-4 ${activeRole === 'candidate' ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span className="text-xs">Candidate</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect('employer')}
                  className={`p-2.5 rounded-lg border text-center transition flex flex-col items-center justify-center space-y-1 ${
                    activeRole === 'employer'
                      ? 'bg-amber-50 border-amber-600 text-amber-950 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Briefcase className={`w-4 h-4 ${activeRole === 'employer' ? 'text-amber-700' : 'text-slate-400'}`} />
                  <span className="text-xs">Employer</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect('training-centre')}
                  className={`p-2.5 rounded-lg border text-center transition flex flex-col items-center justify-center space-y-1 ${
                    activeRole === 'training-centre'
                      ? 'bg-blue-50 border-blue-700 text-blue-950 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building className={`w-4 h-4 ${activeRole === 'training-centre' ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span className="text-xs">Training Centre</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect('admin')}
                  className={`p-2.5 rounded-lg border text-center transition flex flex-col items-center justify-center space-y-1 ${
                    activeRole === 'admin'
                      ? 'bg-purple-50 border-purple-600 text-purple-950 font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className={`w-4 h-4 ${activeRole === 'admin' ? 'text-purple-700' : 'text-slate-400'}`} />
                  <span className="text-xs">Government</span>
                </button>
              </div>
            </div>

            {/* Demo Quick-Fill Bar */}
            <div className="mt-5 p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>SIH 2026 Demo Login Autofill:</span>
                </span>
                <span className="text-[10px] text-amber-700 font-mono">Prototype Mode</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {DEMO_CREDENTIALS.map((cred) => (
                  <button
                    key={cred.role}
                    type="button"
                    onClick={() => handleApplyDemoCredentials(cred.role)}
                    className="px-2.5 py-1 rounded text-[11px] font-semibold bg-white hover:bg-amber-100/80 text-amber-900 border border-amber-300 shadow-2xs transition-all active:scale-95 flex items-center gap-1"
                  >
                    <span>Autofill {cred.label}</span>
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-amber-800/80 mt-2 font-mono">
                Active Demo ID: <strong>{userId || '(Click a chip above or type credentials)'}</strong>
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mt-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  User ID / Email Address
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter registered ID or demo ID"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotNotice(true)}
                    className="text-[11px] text-blue-700 hover:underline font-semibold"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-md font-bold text-xs shadow-sm transition flex items-center justify-center space-x-1.5"
              >
                <span>Continue to OTP Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Role-Specific Registration Guidance */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-center">
              {activeRole === 'candidate' ? (
                <div>
                  <span className="text-slate-600">New candidate or student? </span>
                  <Link to="/signup/candidate" className="font-bold text-blue-700 hover:underline">
                    Create Candidate Account &rarr;
                  </Link>
                </div>
              ) : activeRole === 'employer' ? (
                <div>
                  <span className="text-slate-600">New hiring partner or enterprise? </span>
                  <Link to="/signup/employer" className="font-bold text-amber-700 hover:underline">
                    Create Employer Account &rarr;
                  </Link>
                </div>
              ) : activeRole === 'training-centre' ? (
                <div>
                  <span className="text-slate-600">New training provider, Polytechnic, or Vocational Centre? </span>
                  <Link to="/signup/training-centre" className="font-bold text-blue-900 hover:underline">
                    Register Training Centre &rarr;
                  </Link>
                </div>
              ) : (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-600 text-[11px] text-left flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Government Directorate Access:</strong> Access for state departments is provided exclusively through verified state intranet credentials.
                  </div>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="mt-4 text-center text-[10px] text-slate-400">
              Your information is protected through role-based access and secure two-factor OTP verification.
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotNotice && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-[#0C2340]">Password Reset Assistance</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              In this prototype demonstration, use the <strong>SIH Demo Autofill</strong> buttons above to instantly sign in with pre-configured role test accounts.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowForgotNotice(false)}
                className="bg-[#0C2340] text-white px-3 py-1.5 rounded text-xs font-semibold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      <GovernmentFooter />
    </div>
  );
};
