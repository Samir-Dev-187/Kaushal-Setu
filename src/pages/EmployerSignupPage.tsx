import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GovernmentHeader } from '../components/layout/GovernmentHeader';
import { BrandHeader } from '../components/layout/BrandHeader';
import { GovernmentFooter } from '../components/layout/GovernmentFooter';
import { MAHARASHTRA_DISTRICTS } from '../data/mockData';
import {
  Briefcase,
  Building,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Users,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const EmployerSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { setPendingUser } = useAuth();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [industrySector, setIndustrySector] = useState('Automotive & Electric Vehicles');
  const [companySize, setCompanySize] = useState('51-200 Employees');
  const [district, setDistrict] = useState('Pune');
  const [stateName, setStateName] = useState('Maharashtra');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName || !contactPerson || !businessEmail || !mobileNumber || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!agreedTerms) {
      setErrorMsg('You must agree to the Terms and Privacy Policy.');
      return;
    }

    setPendingUser({
      role: 'employer',
      userId: businessEmail,
      userName: contactPerson,
      orgName: companyName
    });

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
            <div className="text-center pb-5 border-b border-slate-100">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200 mb-2">
                <Briefcase className="w-3.5 h-3.5 text-amber-700" />
                <span>Industry &amp; Hiring Partner Registration</span>
              </div>
              <h1 className="text-2xl font-extrabold text-[#0C2340] tracking-tight">
                Create Employer Account
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Participate in quarterly skill demand surveys, co-design vocational syllabi, and access verified regional apprentice pipelines.
              </p>
            </div>

            {errorMsg && (
              <div className="mt-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Company & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Enterprise Name *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. AutoTech Systems Pvt Ltd"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Person (Talent / HR Lead) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Vikram Mehta"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Business Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      placeholder="hr@company.com"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (For Two-Factor OTP) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Industry Sector & Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Industry / Sector *
                  </label>
                  <select
                    value={industrySector}
                    onChange={(e) => setIndustrySector(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="Automotive & Electric Vehicles">Automotive &amp; Electric Vehicles</option>
                    <option value="Solar, Wind & Renewable Energy">Solar, Wind &amp; Renewable Energy</option>
                    <option value="Advanced Manufacturing & Engineering">Advanced Manufacturing &amp; Engineering</option>
                    <option value="Supply Chain, Cold Storage & Logistics">Supply Chain, Cold Storage &amp; Logistics</option>
                    <option value="Data Centres & Information Technology">Data Centres &amp; Information Technology</option>
                    <option value="Textiles & Garment Manufacturing">Textiles &amp; Garment Manufacturing</option>
                    <option value="Chemicals & Pharmaceuticals">Chemicals &amp; Pharmaceuticals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company Size *
                  </label>
                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="1-50 Employees (MSME)">1-50 Employees (Micro / Small)</option>
                    <option value="51-200 Employees (Medium)">51-200 Employees (Medium)</option>
                    <option value="201-1000 Employees (Large)">201-1000 Employees (Large)</option>
                    <option value="1000+ Employees (Enterprise)">1000+ Employees (Enterprise)</option>
                  </select>
                </div>
              </div>

              {/* Geographic Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State *
                  </label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Operational District *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                  >
                    {MAHARASHTRA_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.marathiName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create password"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start space-x-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>
                    I confirm that I am an authorized representative of this enterprise and agree to participate in the Kaushal Setu industry skill intelligence advisory mechanism.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-md font-bold text-xs shadow-sm transition flex items-center justify-center space-x-1.5 mt-4"
              >
                <span>Create Employer Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Already registered as an employer?{' '}
              <Link to="/login?role=employer" className="text-amber-700 font-bold hover:underline">
                Sign In &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
};
