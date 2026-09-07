import React, { useState, useMemo } from 'react';
import { JobMatchItem, CandidateProfile } from '../../types/candidate';
import { MOCK_MATCHED_JOBS } from '../../data/candidateMockData';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import { rankJobsForCandidate, detectDomain } from '../../utils/candidateDomain';
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Building,
  Users,
  X,
  ShieldCheck
} from 'lucide-react';

interface MatchedJobsSectionProps {
  language: SupportedLang;
  district: string;
  profile?: CandidateProfile;
}

export const MatchedJobsSection: React.FC<MatchedJobsSectionProps> = ({
  language,
  district,
  profile
}) => {
  const t = TRANSLATIONS[language];
  const [selectedJob, setSelectedJob] = useState<JobMatchItem | null>(null);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);

  // Rank jobs based on candidate's profile and trade domain
  const matchedJobs = useMemo(() => {
    if (!profile) return MOCK_MATCHED_JOBS;
    return rankJobsForCandidate(MOCK_MATCHED_JOBS, profile);
  }, [profile]);

  const domain = profile ? detectDomain(profile) : 'auto_ev';

  const handleApply = (jobId: string) => {
    setAppliedJobIds(prev => [...prev, jobId]);
  };

  return (
    <section className="bg-white py-8 px-4 sm:px-6 border-b border-slate-200">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>{t.matchedJobsTitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {language === 'mr'
                ? 'तुमच्या कौशल्यांशी थेट जुळणाऱ्या शिकाऊ व नोकरीच्या संधी'
                : 'Direct Apprenticeship & Job Openings'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {t.matchedJobsSubtitle}
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <span className="text-xs text-slate-500 font-medium">
              National Apprenticeship Promotion Scheme (NAPS) & NCS Verified
            </span>
            <span className="inline-flex items-center space-x-1 text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {domain === 'it_cyber'
                  ? 'Matched to Cyber & Software Profile'
                  : domain === 'solar_renewable'
                  ? 'Matched to Solar & Green Energy Profile'
                  : 'Matched to Automobile & EV Profile'}
              </span>
            </span>
          </div>
        </div>

        {/* Job Listings Rows */}
        <div className="space-y-3">
          {matchedJobs.map(job => {
            const hasApplied = appliedJobIds.includes(job.id);

            return (
              <div
                key={job.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Job Title & Details */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-emerald-700" />
                      <span>{job.matchScore}% Skill Match</span>
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded-full">
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {job.openings} Openings
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                    {language === 'mr' ? job.marathiTitle : job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600">
                    <span className="flex items-center space-x-1 font-semibold text-slate-800">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.company}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Apply by {job.deadline}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.requiredSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-white text-slate-700 font-medium px-2 py-0.5 rounded border border-slate-200"
                      >
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stipend & Action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 shrink-0 gap-3">
                  <div className="sm:text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      Stipend / CTC
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-900 font-mono">
                      {job.stipend}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
                  >
                    <span>{t.viewJobBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Job Details & Direct NAPS Apply */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                    {selectedJob.matchScore}% Verified Skill Match
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mt-2">
                    {selectedJob.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">
                    {selectedJob.company} • {selectedJob.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Stipend & Allowances:</span>
                  <p className="font-mono text-xs text-slate-800 font-semibold">{selectedJob.stipend}</p>
                  <p className="text-[11px] text-slate-500">
                    Includes ₹1,500/month direct benefit transfer (DBT) subsidy from Government of India under NAPS.
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-900 block mb-1">Required Competencies:</span>
                  <ul className="space-y-1 list-disc list-inside text-slate-600">
                    {selectedJob.requiredSkills.map((sk, idx) => (
                      <li key={idx}>{sk}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-950 text-[11px]">
                  <strong>Direct Skill Passport Share:</strong> By applying, your verified NCVET Level 2
                  certification is forwarded directly to {selectedJob.company} talent cell.
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={() => {
                    handleApply(selectedJob.id);
                    setSelectedJob(null);
                  }}
                  className={`w-full py-2.5 rounded-lg text-xs font-bold transition-colors ${
                    appliedJobIds.includes(selectedJob.id)
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-[#0C2340] hover:bg-blue-900 text-white shadow-sm'
                  }`}
                >
                  {appliedJobIds.includes(selectedJob.id)
                    ? '✓ Application Submitted via Passport'
                    : 'Submit Application with Skill Passport'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
