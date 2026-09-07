import React, { useState, useEffect } from 'react';
import { SkillPassportItem, CandidateProfile } from '../../types/candidate';
import { MOCK_SKILL_PASSPORT } from '../../data/candidateMockData';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import { detectDomain, getDomainPassportItems } from '../../utils/candidateDomain';
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Award,
  Sparkles,
  QrCode,
  Download,
  FileCheck
} from 'lucide-react';

interface SkillPassportSectionProps {
  language: SupportedLang;
  profile?: CandidateProfile;
}

export const SkillPassportSection: React.FC<SkillPassportSectionProps> = ({
  language,
  profile
}) => {
  const t = TRANSLATIONS[language];
  const domain = profile ? detectDomain(profile) : 'auto_ev';

  const [passportItems, setPassportItems] = useState<SkillPassportItem[]>(() =>
    getDomainPassportItems(domain, language)
  );

  useEffect(() => {
    setPassportItems(getDomainPassportItems(domain, language));
  }, [domain, language]);

  const [isDigiLockerConnecting, setIsDigiLockerConnecting] = useState(false);
  const [digiLockerSuccess, setDigiLockerSuccess] = useState(false);

  const handleConnectDigiLocker = () => {
    setIsDigiLockerConnecting(true);
    // Simulate DigiLocker API response
    setTimeout(() => {
      setIsDigiLockerConnecting(false);
      setDigiLockerSuccess(true);
      // Add a newly pulled verified marksheet tailored to domain
      const newDLItem: SkillPassportItem = domain === 'it_cyber'
        ? {
            id: 'pass-dl-cyber',
            title: 'AWS Certified Cloud Practitioner & Linux Foundation Essentials',
            marathiTitle: 'एडब्ल्यूएस क्लाऊड प्रॅक्टिशनर व लिनक्स फाउंडेशन',
            issuer: 'Ministry of Electronics & IT (MeitY) via DigiLocker',
            issueDate: 'July 2025',
            verificationId: 'DL-MEITY-CYB-2025-8812',
            verified: true,
            skillsAcquired: ['Cloud Security Principles', 'IAM Roles & Zero Trust', 'Virtual Private Clouds (VPC)']
          }
        : {
            id: 'pass-dl-4',
            title: 'Higher Secondary Certificate (HSC Vocational Science - 81.2%)',
            marathiTitle: 'उच्च माध्यमिक प्रमाणपत्र (एचएससी व्होकेशनल सायन्स - ८१.२%)',
            issuer: 'Maharashtra State Board of Secondary and Higher Secondary Education',
            issueDate: 'July 2025',
            verificationId: 'DL-VERIFIED-HSC-2025-0041',
            verified: true,
            skillsAcquired: ['Applied Physics', 'Circuit Diagrams', 'Basic Electronics Workshop']
          };
      setPassportItems(prev => [newDLItem, ...prev]);
    }, 1200);
  };

  return (
    <section className="bg-slate-50 py-8 px-4 sm:px-6 border-b border-slate-200">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.skillPassportTitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {language === 'mr'
                ? 'प्रमाणित कौशल्य पासपोर्ट (NCVET / DVET मान्यताप्राप्त)'
                : 'Your Verified Skill Credentials'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {t.skillPassportSubtitle}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>{passportItems.length} Credentials Verified</span>
            </span>
          </div>
        </div>

        {/* DigiLocker Strip */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-blue-800">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded font-mono uppercase">
                DigiLocker Integration
              </span>
              <span className="text-xs text-blue-200 font-semibold">
                Government of India
              </span>
            </div>
            <p className="font-bold text-sm sm:text-base text-white">
              {t.digiLockerBanner}
            </p>
            <p className="text-xs text-slate-300">
              {language === 'mr'
                ? 'आधार पडताळणीद्वारे तुमचे १०वी, १२वी किंवा आयटीआय प्रमाणपत्र थेट आणा.'
                : 'Pull verified educational certificates without manual scanning or paper verification.'}
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              disabled={isDigiLockerConnecting || digiLockerSuccess}
              onClick={handleConnectDigiLocker}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
                digiLockerSuccess
                  ? 'bg-emerald-600 text-white cursor-default'
                  : isDigiLockerConnecting
                  ? 'bg-slate-700 text-slate-300 cursor-wait'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm font-black'
              }`}
            >
              {digiLockerSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Linked via DigiLocker</span>
                </>
              ) : isDigiLockerConnecting ? (
                <span>Verifying Aadhaar OTP...</span>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>{t.digiLockerBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {passportItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 shadow-2xs transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">{item.issueDate}</span>
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                  {language === 'mr' ? item.marathiTitle : item.title}
                </h3>

                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Issuer: {item.issuer}
                </p>

                {/* Acquired Skills Pills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.skillsAcquired.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="truncate max-w-[150px]">{item.verificationId}</span>
                <span className="text-blue-700 hover:underline cursor-pointer flex items-center space-x-0.5 font-sans font-semibold">
                  <span>QR Verifiable</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
