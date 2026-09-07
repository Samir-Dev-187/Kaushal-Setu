import React, { useState, useEffect } from 'react';
import { CandidateProfile, CourseItem } from '../../types/candidate';
import { MOCK_COURSES, MOCK_LOCAL_STATS } from '../../data/candidateMockData';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import {
  Search,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';

interface PersonalizedHeroProps {
  profile: CandidateProfile;
  language: SupportedLang;
  onSelectCourse: (course: CourseItem) => void;
  onSearchSubmit?: (query: string) => void;
}

export const PersonalizedHero: React.FC<PersonalizedHeroProps> = ({
  profile,
  language,
  onSelectCourse
}) => {
  const t = TRANSLATIONS[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CourseItem[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Animated Count-ups respecting prefers-reduced-motion
  const [evPlacementCount, setEvPlacementCount] = useState(0);
  const [icePlacementCount, setIcePlacementCount] = useState(0);
  const [demandGapCount, setDemandGapCount] = useState(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setEvPlacementCount(MOCK_LOCAL_STATS.evPlacementRate);
      setIcePlacementCount(MOCK_LOCAL_STATS.decliningFitterRate);
      setDemandGapCount(MOCK_LOCAL_STATS.districtDemandGap);
      return;
    }

    const duration = 1200; // ms
    const steps = 30;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setEvPlacementCount(Math.round(MOCK_LOCAL_STATS.evPlacementRate * progress));
      setIcePlacementCount(Math.round(MOCK_LOCAL_STATS.decliningFitterRate * progress));
      setDemandGapCount(Math.round(MOCK_LOCAL_STATS.districtDemandGap * progress));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Handle Search Filtering
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matches = MOCK_COURSES.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.marathiName.includes(q) ||
          c.sector.toLowerCase().includes(q) ||
          c.institute.toLowerCase().includes(q)
      );
      setSearchResults(matches);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const primarySectors =
    profile.sectorsOfInterest && profile.sectorsOfInterest.length > 0
      ? profile.sectorsOfInterest.slice(0, 2).join(' & ')
      : 'EV & Technical Trades';

  return (
    <section className="bg-gradient-to-b from-[#0C2340] to-slate-900 text-white pt-8 pb-12 px-4 sm:px-6 relative overflow-hidden border-b border-slate-800">
      {/* Background subtle mesh decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        {/* District & Personalization Tag */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center space-x-1.5 bg-blue-900/80 border border-blue-700/80 px-2.5 py-1 rounded-full text-blue-200 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{profile.district} Industrial Zone Telemetry</span>
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-amber-400 font-medium">
            {language === 'mr' ? 'उमेदवारासाठी थेट मार्गदर्शन' : 'Direct, unvarnished employment data'}
          </span>
        </div>

        {/* Personalized Headline */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'mr' ? (
              <>
                येथे पहा <span className="text-amber-400">{profile.district}</span> परिसरातील{' '}
                <span className="text-blue-300">{primarySectors}</span> चे खरे वास्तव.
              </>
            ) : (
              <>
                Here&apos;s what&apos;s happening in <span className="text-amber-400">{primarySectors}</span> near{' '}
                <span className="text-blue-300">{profile.district}</span>.
              </>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {t.honestNotice}
          </p>
        </div>

        {/* Core Interaction: Course-Check Search Bar */}
        <div className="pt-2">
          <div className="relative max-w-3xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.courseCheckPlaceholder}
                className="w-full pl-12 pr-28 py-3.5 sm:py-4 bg-white/95 text-slate-900 placeholder:text-slate-500 rounded-xl text-xs sm:text-sm font-medium shadow-xl border border-slate-200 focus:outline-hidden focus:ring-4 focus:ring-amber-400/50"
                aria-label="Course verification search"
              />
              <button
                type="button"
                onClick={() => {
                  if (searchResults.length > 0) {
                    onSelectCourse(searchResults[0]);
                  }
                }}
                className="absolute right-2 px-3 sm:px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
              >
                {t.checkCourseBtn}
              </button>
            </div>

            {/* Live Autocomplete Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white text-slate-900 border border-slate-200 rounded-xl shadow-2xl z-30 overflow-hidden divide-y divide-slate-100 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="p-2 bg-slate-50 text-[11px] font-bold text-slate-500 flex items-center justify-between">
                  <span>Found {searchResults.length} verified trade diagnostics:</span>
                  <button
                    onClick={() => setIsSearchFocused(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    Close
                  </button>
                </div>
                {searchResults.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onSelectCourse(c);
                      setIsSearchFocused(false);
                      setSearchQuery(c.name);
                    }}
                    className="p-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{c.name}</span>
                        {c.isFlagged ? (
                          <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-black">
                            ⚠️ Flagged Trade
                          </span>
                        ) : (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                            High Demand
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {c.institute} • {c.duration}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-slate-900 block">
                        {c.placementRate}% Placement
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold">
                        {c.avgStartingSalary}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-slate-400">
            <span>Try searching:</span>
            <button
              onClick={() => setSearchQuery('Fitter')}
              className="underline text-amber-300 hover:text-amber-200"
            >
              Fitter (Oversupplied)
            </button>
            <span>•</span>
            <button
              onClick={() => setSearchQuery('ICE Engine')}
              className="underline text-rose-300 hover:text-rose-200"
            >
              ICE Engine Mechanic (Obsolete)
            </button>
            <span>•</span>
            <button
              onClick={() => setSearchQuery('EV')}
              className="underline text-emerald-300 hover:text-emerald-200"
            >
              EV Powertrain (High Demand)
            </button>
          </div>
        </div>

        {/* 3 Stat Callouts (EV vs Declining Fitter vs Demand Gap) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
          {/* Stat 1: High Demand Placement */}
          <div className="bg-slate-800/80 backdrop-blur-xs border border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-1">
              <span className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>{language === 'mr' ? 'वाढती संधी' : 'Expanding Demand'}</span>
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-600/50 px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>
            <div className="my-2">
              <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {evPlacementCount}%
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              {t.statPlacementEV}
            </p>
          </div>

          {/* Stat 2: Saturated / Declining Placement for Contrast */}
          <div className="bg-slate-800/80 backdrop-blur-xs border border-rose-500/40 rounded-xl p-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-xs text-rose-400 font-bold mb-1">
              <span className="flex items-center space-x-1">
                <TrendingDown className="w-4 h-4" />
                <span>{language === 'mr' ? 'धोकादायक क्षेत्र' : 'Shrinking Legacy Trade'}</span>
              </span>
              <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-600/50 px-1.5 py-0.5 rounded">
                High Risk
              </span>
            </div>
            <div className="my-2">
              <span className="text-3xl sm:text-4xl font-black text-rose-300 font-mono tracking-tight">
                {icePlacementCount}%
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              {t.statPlacementDeclining}
            </p>
          </div>

          {/* Stat 3: Demand Gap Number */}
          <div className="bg-slate-800/80 backdrop-blur-xs border border-blue-500/40 rounded-xl p-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-xs text-blue-400 font-bold mb-1">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'mr' ? 'स्थानिक तुटवडा' : 'MIDC Factory Shortfall'}</span>
              </span>
              <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-600/50 px-1.5 py-0.5 rounded">
                Unfilled
              </span>
            </div>
            <div className="my-2">
              <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono tracking-tight">
                +{demandGapCount.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              {t.statDemandGap}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
