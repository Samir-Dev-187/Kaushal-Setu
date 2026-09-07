import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GovernmentHeader } from '../components/layout/GovernmentHeader';
import { BrandHeader } from '../components/layout/BrandHeader';
import { GovernmentFooter } from '../components/layout/GovernmentFooter';
import {
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const OtpVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { pendingOtpAuth, verifyOtpCode, user } = useAuth();

  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 30s countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only numbers allowed

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    setErrorMsg('');

    // Auto-advance to next input if filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFillDemoOtp = () => {
    const demoArray = ['1', '2', '3', '4', '5', '6'];
    setOtpDigits(demoArray);
    setErrorMsg('');
  };

  const getTargetRoute = (role?: string) => {
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
        return '/';
    }
  };

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const fullCode = otpDigits.join('');
    if (fullCode.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the OTP.');
      return;
    }

    if (fullCode === '123456') {
      setIsSuccess(true);
      setErrorMsg('');

      const targetRole = pendingOtpAuth?.role || 'candidate';
      const destination = getTargetRoute(targetRole);

      // Successfully authenticate in context
      verifyOtpCode(fullCode);

      setTimeout(() => {
        navigate(destination);
      }, 1500);
    } else {
      setErrorMsg('Invalid OTP. Please use the prototype demo OTP: 123456');
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setCountdown(30);
    setCanResend(false);
    setOtpDigits(['', '', '', '', '', '']);
    setErrorMsg('A fresh OTP has been dispatched to your mobile number.');
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9]">
      <GovernmentHeader />
      <BrandHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* Header Icon */}
            <div className="text-center pb-5 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-800 mx-auto flex items-center justify-center border border-blue-200 mb-3">
                <Smartphone className="w-6 h-6 text-blue-700" />
              </div>
              <h1 className="text-2xl font-extrabold text-[#0C2340] tracking-tight">
                Verify your identity
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Enter the 6-digit OTP sent to your registered mobile number{' '}
                <span className="font-mono font-bold text-slate-800">
                  +91 98•••• 2026
                </span>
              </p>
              {pendingOtpAuth && (
                <div className="mt-2 inline-block text-[11px] font-semibold bg-slate-100 px-2.5 py-0.5 rounded text-slate-700">
                  Authenticating as:{' '}
                  <span className="text-blue-800 capitalize font-bold">
                    {pendingOtpAuth.role.replace('-', ' ')}
                  </span>
                </div>
              )}
            </div>

            {/* Success State Animation */}
            {isSuccess ? (
              <div className="py-8 text-center space-y-3 animate-in fade-in zoom-in duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-500 shadow-lg">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="text-lg font-extrabold text-emerald-800">
                  OTP Verified Successfully!
                </h3>
                <p className="text-xs text-slate-600">
                  Preparing your authenticated role workspace...
                </p>
                <div className="w-24 h-1.5 bg-emerald-200 rounded-full mx-auto overflow-hidden">
                  <div className="w-full h-full bg-emerald-600 animate-pulse"></div>
                </div>
              </div>
            ) : (
              /* OTP Form */
              <form onSubmit={handleVerify} className="mt-6 space-y-5">
                {/* 6 Digit Input Boxes */}
                <div>
                  <label className="block text-center text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
                    Enter 6-Digit Code:
                  </label>
                  <div className="flex justify-between gap-2 max-w-xs mx-auto">
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-11 h-12 text-center text-lg font-mono font-bold bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 shadow-2xs"
                      />
                    ))}
                  </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Demo Helper Button */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-700" />
                      <span>Demo OTP: 123456</span>
                    </div>
                    <div className="text-[10px] text-amber-700">SIH 2026 Test Bypass</div>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillDemoOtp}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] px-2.5 py-1 rounded shadow-2xs transition"
                  >
                    Autofill
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-md font-bold text-xs shadow-sm transition flex items-center justify-center space-x-1.5"
                >
                  <span>Verify OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Resend Countdown */}
                <div className="text-center pt-2 text-xs">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="font-bold text-blue-700 hover:underline flex items-center justify-center space-x-1 mx-auto"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Resend OTP Code</span>
                    </button>
                  ) : (
                    <span className="text-slate-400">
                      Resend available in <strong className="text-slate-600">{countdown}s</strong>
                    </span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
};
