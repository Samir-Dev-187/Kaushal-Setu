import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GovernmentHeader } from '../components/layout/GovernmentHeader';
import { BrandHeader } from '../components/layout/BrandHeader';
import { GovernmentFooter } from '../components/layout/GovernmentFooter';
import {
  Building2,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  FileText
} from 'lucide-react';

export const TrainingCentreSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithCredentials } = useAuth();

  const [institutionName, setInstitutionName] = useState('Government ITI Nashik (Industrial Training Institute)');
  const [providerType, setProviderType] = useState<'offline' | 'online'>('offline');
  const [affiliationCode, setAffiliationCode] = useState('DGT-MH-0284-NSK');
  const [district, setDistrict] = useState('Nashik');
  const [principalName, setPrincipalName] = useState('Dr. S. K. Deshmukh');
  const [officialEmail, setOfficialEmail] = useState('principal.itinashik@dvet.gov.in');
  const [mobilePhone, setMobilePhone] = useState('9822450123');
  const [tradesOffered, setTradesOffered] = useState('12');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Authenticate and prep for OTP
    loginWithCredentials('training-centre', affiliationCode, principalName, institutionName);
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9]">
      <GovernmentHeader />
      <BrandHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* Header */}
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200 mb-2">
                <Building2 className="w-3 h-3 text-blue-700" />
                <span>NCVET / DVET Institutional Onboarding</span>
              </div>
              <h1 className="text-2xl font-extrabold text-[#0C2340] tracking-tight">
                Register Training Centre
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Connect your training centre, Polytechnic, or Vocational Academy to Kaushal Setu labour-market telemetry.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
              {/* Institution Type Selector */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wide text-[11px] mb-1.5">
                  1. Institutional Operational Model:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setProviderType('offline')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                      providerType === 'offline'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold ring-2 ring-blue-600'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-extrabold text-sm">Offline Campus</span>
                    <span className="text-[11px] font-normal text-slate-500 mt-1">
                      Training Centre, Polytechnic, JSS, Physical Workshops &amp; Tooling
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProviderType('online')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                      providerType === 'online'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold ring-2 ring-blue-600'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-extrabold text-sm">Online / Hybrid Academy</span>
                    <span className="text-[11px] font-normal text-slate-500 mt-1">
                      E-Learning, Virtual Simulators, Distributed LMS Cohorts
                    </span>
                  </button>
                </div>
              </div>

              {/* Institute Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Official Institute Name:
                </label>
                <input
                  type="text"
                  required
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Affiliation Code & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    NCVT / DVET Affiliation Code:
                  </label>
                  <input
                    type="text"
                    required
                    value={affiliationCode}
                    onChange={(e) => setAffiliationCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    District / Industrial Cluster:
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold"
                  >
                    <option value="Nashik">Nashik (MIDC Ambad &amp; Satpur)</option>
                    <option value="Pune">Pune (Chakan &amp; Bhosari)</option>
                    <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar (Waluj)</option>
                    <option value="Thane">Thane &amp; Belapur</option>
                    <option value="Nagpur">Nagpur (MIHAN)</option>
                  </select>
                </div>
              </div>

              {/* Principal Name & Trades Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Principal / Authorized Officer Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={principalName}
                    onChange={(e) => setPrincipalName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Active Trades / Batches Offered:
                  </label>
                  <input
                    type="number"
                    required
                    value={tradesOffered}
                    onChange={(e) => setTradesOffered(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono focus:bg-white"
                  />
                </div>
              </div>

              {/* Email & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Official Institutional Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Authorized Mobile Number (for 2FA OTP):
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobilePhone}
                    onChange={(e) => setMobilePhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono focus:bg-white"
                  />
                </div>
              </div>

              {/* Agreement */}
              <div className="pt-2">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded text-blue-900 focus:ring-blue-600"
                  />
                  <span className="text-[11px] text-slate-600">
                    I solemnly affirm that this institution is affiliated with NCVET/DVET and agree to synchronize curriculum outcomes with Kaushal Setu labour-market intelligence telemetry.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!agreeTerms}
                className="w-full py-3 bg-[#0C2340] hover:bg-[#1E3A8A] disabled:opacity-50 text-white rounded-lg font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5 mt-4"
              >
                <span>Complete Registration &amp; Proceed to OTP Verification</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </form>

            <div className="mt-4 text-center text-[11px] text-slate-500">
              Already have verified credentials?{' '}
              <Link to="/login?role=training-centre" className="text-blue-800 font-bold hover:underline">
                Sign in directly &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
};
