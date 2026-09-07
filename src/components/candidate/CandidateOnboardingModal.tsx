import React, { useState, useEffect } from 'react';
import {
  CandidateAim,
  CandidateQualification,
  CandidateStatus,
  CandidateProfile
} from '../../types/candidate';
import { MOCK_INSTITUTES } from '../../data/candidateMockData';
import { MAHARASHTRA_DISTRICTS } from '../../data/mockData';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  Sparkles,
  RefreshCw,
  Compass,
  GraduationCap,
  Building,
  Wrench,
  WifiOff,
  Flame,
  X,
  Loader2
} from 'lucide-react';

interface CandidateOnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: Partial<CandidateProfile>) => void;
  onCancel?: () => void;
  initialProfile?: CandidateProfile;
  canSkip?: boolean;
}

const AIM_OPTIONS: { id: CandidateAim; title: string; subtitle: string; icon: any }[] = [
  {
    id: 'job-urgent',
    title: 'Get a job as soon as possible',
    subtitle: 'Need immediate livelihood & industry placement within 6–12 months.',
    icon: Briefcase
  },
  {
    id: 'new-skill',
    title: 'Learn a new high-growth skill',
    subtitle: 'Want to upgrade my technical capability for modern workshop equipment.',
    icon: Sparkles
  },
  {
    id: 'switch-career',
    title: 'Switch to a different career/trade',
    subtitle: 'Currently in a shrinking or low-wage trade; want a clean pivot.',
    icon: RefreshCw
  },
  {
    id: 'exploring',
    title: 'Still exploring options',
    subtitle: 'Not sure yet; want to see honest placement data before deciding.',
    icon: Compass
  }
];

const SECTOR_TAGS = [
  { name: 'Automobile & EV', trending: true },
  { name: 'Solar & Renewable Energy', trending: true },
  { name: 'Electrical', trending: false },
  { name: 'Electronics', trending: false },
  { name: 'IT/ITeS', trending: false },
  { name: 'Construction', trending: false },
  { name: 'Healthcare', trending: false },
  { name: 'Retail', trending: false },
  { name: 'Other', trending: false }
];

export const CandidateOnboardingModal: React.FC<CandidateOnboardingModalProps> = ({
  isOpen,
  onComplete,
  onCancel,
  initialProfile,
  canSkip = false
}) => {
  // All hooks MUST be called before any early return (React Rules of Hooks)
  const [step, setStep] = useState<number>(1);
  const [consentAgreed, setConsentAgreed] = useState<boolean>(true);

  // Form State
  const [aim, setAim] = useState<CandidateAim>(initialProfile?.aim || 'job-urgent');
  const [highestQualification, setHighestQualification] = useState<CandidateQualification>(
    initialProfile?.highestQualification || '12th'
  );
  const [instituteInput, setInstituteInput] = useState<string>(
    initialProfile?.instituteName || 'Government ITI, Nashik (Satpur)'
  );
  const [instituteSuggestions, setInstituteSuggestions] = useState<string[]>([]);
  const [tradeOrField, setTradeOrField] = useState<string>(
    initialProfile?.tradeOrField || 'Automobile / Mechanical'
  );

  const [currentStatus, setCurrentStatus] = useState<CandidateStatus>(
    initialProfile?.currentStatus || 'studying'
  );
  const [workExperienceYears, setWorkExperienceYears] = useState<number>(
    initialProfile?.workExperienceYears || 0
  );
  const [sectorsOfInterest, setSectorsOfInterest] = useState<string[]>(
    initialProfile?.sectorsOfInterest || ['Automobile & EV', 'Electrical']
  );

  const [district, setDistrict] = useState<string>(initialProfile?.district || 'Nashik');
  const [liteMode, setLiteMode] = useState<boolean>(initialProfile?.liteMode || false);
  const [language, setLanguage] = useState<SupportedLang>(initialProfile?.language || 'en');

  // Step 6 loading transition state
  const [isBuildingOutlook, setIsBuildingOutlook] = useState<boolean>(false);
  const [buildingProgress, setBuildingProgress] = useState<number>(0);

  if (!isOpen) return null;


  const t = TRANSLATIONS[language];

  // Institute autocomplete filtering
  const handleInstituteChange = (val: string) => {
    setInstituteInput(val);
    if (val.trim().length > 1) {
      const filtered = MOCK_INSTITUTES.filter(i =>
        i.toLowerCase().includes(val.toLowerCase())
      );
      setInstituteSuggestions((filtered || []).slice(0, 4));
    } else {
      setInstituteSuggestions([]);
    }
  };

  const handleSelectInstitute = (inst: string) => {
    setInstituteInput(inst);
    setInstituteSuggestions([]);
  };

  const toggleSector = (sector: string) => {
    if (sectorsOfInterest.includes(sector)) {
      if (sectorsOfInterest.length > 1) {
        setSectorsOfInterest(sectorsOfInterest.filter(s => s !== sector));
      }
    } else {
      setSectorsOfInterest([...sectorsOfInterest, sector]);
    }
  };

  const handleGoToConfirmation = () => {
    setStep(6);
    setIsBuildingOutlook(true);
    setBuildingProgress(20);

    const timer1 = setTimeout(() => setBuildingProgress(60), 400);
    const timer2 = setTimeout(() => {
      setBuildingProgress(100);
      setIsBuildingOutlook(false);
    }, 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  const handleFinish = () => {
    // Persist to local state & storage
    onComplete({
      aim,
      highestQualification,
      instituteName: instituteInput || 'Government ITI, Nashik (Satpur)',
      tradeOrField: tradeOrField || 'Vocational Student',
      currentStatus,
      workExperienceYears,
      sectorsOfInterest,
      district,
      liteMode,
      language,
      onboardingCompleted: true
    });
  };

  // Helper text for summary
  const getAimSummaryLabel = () => {
    switch (aim) {
      case 'job-urgent':
        return "you're looking to get a job as soon as possible";
      case 'new-skill':
        return "you want to master new industry skills";
      case 'switch-career':
        return "you're planning a trade pivot";
      default:
        return "you're exploring options";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col my-auto transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Progress Bar Header */}
        <div className="bg-[#0C2340] text-white p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-amber-400 uppercase tracking-wider">
              Step {step} of 6 • Personalized Setup
            </span>
            {canSkip && step > 1 && (
              <button
                onClick={handleFinish}
                className="text-slate-300 hover:text-white underline text-xs"
              >
                Skip for now
              </button>
            )}
          </div>
          {/* Visual Track */}
          <div className="w-full bg-blue-950 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* STEP 1: Welcome & Consent */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-blue-800" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Welcome to Kaushal Setu
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    A few quick questions so we can show you courses and jobs that actually fit you — not a generic list.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-950 leading-relaxed space-y-2">
                <p className="font-bold text-amber-900 flex items-center space-x-1.5">
                  <span>Why we ask these details:</span>
                </p>
                <p>
                  In Maharashtra, over 30% of vocational trainees end up in trades where jobs have already dried up.
                  By knowing your district and target skills, we cross-check real factory hiring in your MIDC zone before you commit.
                </p>
              </div>

              <div className="pt-2">
                <label className="flex items-start space-x-3 cursor-pointer select-none bg-slate-50 hover:bg-slate-100 p-3 rounded-lg border border-slate-200 transition-colors">
                  <input
                    type="checkbox"
                    checked={consentAgreed}
                    onChange={e => setConsentAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-blue-900 border-slate-300 focus:ring-blue-600"
                  />
                  <div className="text-xs text-slate-700 leading-normal">
                    <span className="font-bold text-slate-900 block">
                      Data Privacy Consent (DPDP Act, 2023 Compliant)
                    </span>
                    Your inputs are stored strictly to personalize course alerts and verified job matches.
                    Your personal information is never sold or shared with commercial marketing agencies.
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 2: Your Aim Right Now */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  What is your primary aim right now?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  We use this to prioritize either fast-track jobs, technical depth, or reskilling bridges.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {AIM_OPTIONS.map(opt => {
                  const Icon = opt.icon;
                  const isSelected = aim === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAim(opt.id)}
                      className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-800 bg-blue-50/70 shadow-sm ring-2 ring-blue-700'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-blue-800 fill-blue-100" />
                        )}
                      </div>
                      <div className="mt-3">
                        <p className="font-bold text-sm text-slate-900">{opt.title}</p>
                        <p className="text-xs text-slate-500 mt-1 leading-snug">{opt.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Education Details */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Your Education & Institute
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Helps calculate which qualification level employers require for open stipends.
                </p>
              </div>

              <div className="space-y-3.5 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Highest qualification completed:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      '10th',
                      '12th',
                      'ITI certificate',
                      'Polytechnic Diploma',
                      'B.E / B.Tech Engineering',
                      'Medical / Allied Healthcare Degree',
                      'B.Sc / M.Sc Domain Specialist',
                      'Post-Graduate / MBA',
                      'Other Specialization'
                    ].map(q => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setHighestQualification(q as CandidateQualification)}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                          highestQualification === q
                            ? 'border-blue-800 bg-blue-800 text-white shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Institute Autocomplete */}
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current or most recent institute name:
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={instituteInput}
                      onChange={e => handleInstituteChange(e.target.value)}
                      placeholder="e.g. Govt ITI Nashik, Govt Polytechnic..."
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-800"
                    />
                  </div>
                  {instituteSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 text-xs divide-y divide-slate-100">
                      {instituteSuggestions.map((inst, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSelectInstitute(inst)}
                          className="w-full text-left px-3 py-2 hover:bg-blue-50 text-slate-700 transition-colors"
                        >
                          {inst}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Trade or Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Field of study or trade (if applicable):
                  </label>
                  <div className="relative">
                    <Wrench className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={tradeOrField}
                      onChange={e => setTradeOrField(e.target.value)}
                      placeholder="e.g. Electrician, Fitter, Wireman, Motor Mechanic, None..."
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Background & Interests */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Your Background & Target Sectors
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Tagging sectors flags high-growth vs saturated career branches.
                </p>
              </div>

              <div className="space-y-3.5 pt-1">
                {/* Current Status */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current work status:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'studying', label: 'Studying' },
                      { id: 'completed-seeking', label: 'Seeking Work' },
                      { id: 'currently-working', label: 'Currently Working' }
                    ].map(st => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setCurrentStatus(st.id as CandidateStatus)}
                        className={`py-2 px-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                          currentStatus === st.id
                            ? 'border-blue-800 bg-blue-800 text-white shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Years of work experience:
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={15}
                    value={workExperienceYears}
                    onChange={e => setWorkExperienceYears(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-28 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                {/* Sectors of Interest */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sectors you are interested in (select all that apply):
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SECTOR_TAGS.map(sec => {
                      const isSelected = sectorsOfInterest.includes(sec.name);
                      return (
                        <button
                          key={sec.name}
                          type="button"
                          onClick={() => toggleSector(sec.name)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            isSelected
                              ? 'bg-blue-900 border-blue-900 text-white shadow-xs'
                              : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
                          }`}
                        >
                          <span>{sec.name}</span>
                          {sec.trending && (
                            <span className="flex items-center text-[10px] bg-emerald-500 text-white font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider ml-1">
                              <Flame className="w-2.5 h-2.5 mr-0.5 fill-white" />
                              Trending
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Location & Access */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Location & Connectivity Preferences
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Optimized for fast mobile loading across Maharashtra's 36 districts.
                </p>
              </div>

              <div className="space-y-4 pt-1">
                {/* District Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Home District (Maharashtra):
                  </label>
                  <select
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-800"
                  >
                    {MAHARASHTRA_DISTRICTS.map(dist => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lite Mode Toggle */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="space-y-0.5 pr-3">
                    <div className="flex items-center space-x-2">
                      <WifiOff className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-800">
                        Use lite mode for slow connections
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Compresses images, saves 60% mobile data on 2G/3G networks.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={liteMode}
                      onChange={e => setLiteMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>

                {/* Language Preference */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Language (swaps key UI texts):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setLanguage('en')}
                      className={`p-2.5 rounded-lg border text-xs font-bold transition-all ${
                        language === 'en'
                          ? 'border-blue-800 bg-blue-50 text-blue-900 ring-1 ring-blue-800'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage('mr')}
                      className={`p-2.5 rounded-lg border text-xs font-bold transition-all ${
                        language === 'mr'
                          ? 'border-blue-800 bg-blue-50 text-blue-900 ring-1 ring-blue-800'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      मराठी
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage('hi')}
                      className={`p-2.5 rounded-lg border text-xs font-bold transition-all ${
                        language === 'hi'
                          ? 'border-blue-800 bg-blue-50 text-blue-900 ring-1 ring-blue-800'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Confirmation & Outlook Building */}
          {step === 6 && (
            <div className="space-y-5 text-center py-4 animate-in fade-in duration-200">
              {isBuildingOutlook ? (
                <div className="space-y-4 py-8">
                  <Loader2 className="w-10 h-10 text-blue-800 animate-spin mx-auto" />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Building your personalized outlook...
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Cross-referencing {district} MIDC employer telemetry with your interest in {(sectorsOfInterest || []).slice(0, 2).join(' & ')}
                    </p>
                  </div>
                  <div className="w-48 bg-slate-200 h-2 rounded-full mx-auto overflow-hidden">
                    <div
                      className="bg-blue-800 h-full transition-all duration-300"
                      style={{ width: `${buildingProgress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Your Outlook is Ready!
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-700 mt-2 max-w-md mx-auto leading-relaxed bg-blue-50/70 p-3.5 rounded-xl border border-blue-200 font-medium">
                      Got it — showing you <strong className="text-blue-950 font-bold">{(sectorsOfInterest || []).slice(0, 2).join(' & ')}</strong> courses near{' '}
                      <strong className="text-blue-950 font-bold">{district}</strong>, since {getAimSummaryLabel()}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer / Navigation Buttons */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 && step < 6 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          {step === 1 && (
            <div className="text-xs text-slate-400">
              Step 1 of 6
            </div>
          )}

          <div className="ml-auto flex items-center space-x-2">
            {step < 5 ? (
              <button
                type="button"
                disabled={step === 1 && !consentAgreed}
                onClick={() => setStep(step + 1)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  step === 1 && !consentAgreed
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-[#0C2340] hover:bg-blue-900 text-white shadow-sm'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : step === 5 ? (
              <button
                type="button"
                onClick={handleGoToConfirmation}
                className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-sm"
              >
                <span>Build My Outlook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              !isBuildingOutlook && (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-black flex items-center space-x-1.5 shadow-md"
                >
                  <span>Enter My Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
