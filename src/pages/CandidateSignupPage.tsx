import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GovernmentHeader } from '../components/layout/GovernmentHeader';
import { BrandHeader } from '../components/layout/BrandHeader';
import { GovernmentFooter } from '../components/layout/GovernmentFooter';
import { MAHARASHTRA_DISTRICTS } from '../data/mockData';
import {
  UserPlus,
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  GraduationCap,
  Briefcase,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const CandidateSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { setPendingUser } = useAuth();

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');
  const [district, setDistrict] = useState('Pune');
  const [educationLevel, setEducationLevel] = useState('ITI / Craft Vocational Student');
  const [currentCourse, setCurrentCourse] = useState('Electrician / Motor Vehicle');
  const [preferredSector, setPreferredSector] = useState('Electric Vehicles & Clean Mobility');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !mobileNumber || !email || !password) {
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

    // Set pending user for OTP step
    setPendingUser({
      role: 'candidate',
      userId: email,
      userName: fullName,
      orgName: `${district}, ${stateName} Candidate`
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
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200 mb-2">
                <UserPlus className="w-3.5 h-3.5 text-blue-700" />
                <span>Candidate / Student Portal Registration</span>
              </div>
              <h1 className="text-2xl font-extrabold text-[#0C2340] tracking-tight">
                Create Candidate Account
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Access market-demand intelligence, verify trade longevity, and uncover high-growth career pathways.
              </p>
            </div>

            {errorMsg && (
              <div className="mt-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Samir Shaw"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (For OTP Verification) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
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
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
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
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
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
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    District (Home / Training Location) *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  >
                    {MAHARASHTRA_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.marathiName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Education & Current Course */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Education Level *
                  </label>
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="10th Pass / Secondary">10th Pass / Secondary</option>
                    <option value="12th Pass / Higher Secondary">12th Pass / Higher Secondary</option>
                    <option value="ITI / Craft Vocational Student">ITI / Craft Vocational Student</option>
                    <option value="Polytechnic Diploma">Polytechnic Diploma</option>
                    <option value="Undergraduate Degree">Undergraduate Degree</option>
                    <option value="Other Vocational Trainee">Other Vocational Trainee</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Course / Skill Trade
                  </label>
                  <input
                    type="text"
                    value={currentCourse}
                    onChange={(e) => setCurrentCourse(e.target.value)}
                    placeholder="e.g. Mechanic Motor Vehicle"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Preferred Sector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target High-Growth Sector
                </label>
                <select
                  value={preferredSector}
                  onChange={(e) => setPreferredSector(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Electric Vehicles & Clean Mobility">Electric Vehicles &amp; Clean Mobility</option>
                  <option value="Solar & Renewable Energy">Solar &amp; Renewable Energy</option>
                  <option value="Industrial Automation & Robotics">Industrial Automation &amp; Robotics</option>
                  <option value="Precision Manufacturing & CNC">Precision Manufacturing &amp; CNC</option>
                  <option value="Data Centres & IT Hardware">Data Centres &amp; IT Hardware</option>
                  <option value="Cold-Chain & Warehouse Logistics">Cold-Chain &amp; Warehouse Logistics</option>
                </select>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start space-x-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    I agree to the Terms of Use and acknowledge that Kaushal Setu provides informational labour-market intelligence and advisory pathways.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-md font-bold text-xs shadow-sm transition flex items-center justify-center space-x-1.5 mt-4"
              >
                <span>Create Candidate Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <Link to="/login?role=candidate" className="text-blue-700 font-bold hover:underline">
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
