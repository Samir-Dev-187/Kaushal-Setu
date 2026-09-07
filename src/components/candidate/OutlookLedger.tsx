import React from 'react';
import { CandidateProfile, OutlookSector } from '../../types/candidate';
import { MOCK_OUTLOOK_SECTORS } from '../../data/candidateMockData';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';

interface OutlookLedgerProps {
  profile: CandidateProfile;
  language: SupportedLang;
  onSelectSector?: (sectorName: string) => void;
}

export const OutlookLedger: React.FC<OutlookLedgerProps> = ({
  profile,
  language,
  onSelectSector
}) => {
  const t = TRANSLATIONS[language];

  // Reorder sectors to prioritize candidate's interests
  const userInterests = profile.sectorsOfInterest || [];

  const sortWithUserPreference = (sectors: OutlookSector[]) => {
    return [...sectors].sort((a, b) => {
      const aMatches = a.relevantTags.some(tag => userInterests.includes(tag));
      const bMatches = b.relevantTags.some(tag => userInterests.includes(tag));
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  };

  const risingSectors = sortWithUserPreference(
    MOCK_OUTLOOK_SECTORS.filter(s => s.type === 'rising')
  );
  const decliningSectors = sortWithUserPreference(
    MOCK_OUTLOOK_SECTORS.filter(s => s.type === 'declining')
  );

  return (
    <section className="bg-white py-8 px-4 sm:px-6 border-b border-slate-200">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.outlookSectionTitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {language === 'mr'
                ? 'उद्योगांचा थेट कल: काय शिकायचे आणि काय टाळायचे'
                : 'Market Telemetry: What factories are hiring vs cutting'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {t.outlookSubheading}
            </p>
          </div>
          <div className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shrink-0">
            <span>Prioritized by: </span>
            <span className="font-bold text-slate-800">
              {userInterests.slice(0, 2).join(', ') || 'Your Trade'}
            </span>
          </div>
        </div>

        {/* Two-Column Ledger with Hairline Dividers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Column 1: Rising Competencies */}
          <div className="border border-emerald-200 rounded-xl overflow-hidden bg-slate-50/50">
            <div className="bg-emerald-800 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-200" />
                <h3 className="font-bold text-xs uppercase tracking-wider">
                  {t.risingSectors}
                </h3>
              </div>
              <span className="text-[10px] bg-emerald-900 font-bold px-2 py-0.5 rounded text-emerald-100">
                High Absorption
              </span>
            </div>

            <div className="divide-y divide-slate-200 bg-white">
              {risingSectors.map(sector => {
                const isInterestMatch = sector.relevantTags.some(tag =>
                  userInterests.includes(tag)
                );
                return (
                  <div
                    key={sector.id}
                    onClick={() => onSelectSector && onSelectSector(sector.name)}
                    className="p-3.5 sm:p-4 hover:bg-emerald-50/40 transition-colors flex items-start justify-between space-x-3 cursor-pointer group"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-900 transition-colors">
                          {language === 'mr' ? sector.marathiName : sector.name}
                        </span>
                        {isInterestMatch && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.2 rounded uppercase">
                            Matches Aim
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {language === 'mr' ? sector.marathiReason : sector.reason}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center space-x-1 text-emerald-700 font-mono font-extrabold text-xs sm:text-sm bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>{sector.hiringDelta}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Declining Trades */}
          <div className="border border-rose-200 rounded-xl overflow-hidden bg-slate-50/50">
            <div className="bg-rose-900 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-rose-200" />
                <h3 className="font-bold text-xs uppercase tracking-wider">
                  {t.decliningSectors}
                </h3>
              </div>
              <span className="text-[10px] bg-rose-950 font-bold px-2 py-0.5 rounded text-rose-200">
                Oversupply / Obsolete
              </span>
            </div>

            <div className="divide-y divide-slate-200 bg-white">
              {decliningSectors.map(sector => {
                const isInterestMatch = sector.relevantTags.some(tag =>
                  userInterests.includes(tag)
                );
                return (
                  <div
                    key={sector.id}
                    onClick={() => onSelectSector && onSelectSector(sector.name)}
                    className="p-3.5 sm:p-4 hover:bg-rose-50/40 transition-colors flex items-start justify-between space-x-3 cursor-pointer group"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-rose-950 transition-colors">
                          {language === 'mr' ? sector.marathiName : sector.name}
                        </span>
                        {isInterestMatch && (
                          <span className="text-[9px] bg-rose-100 text-rose-800 font-black px-1.5 py-0.2 rounded uppercase">
                            Warning: In your field
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {language === 'mr' ? sector.marathiReason : sector.reason}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center space-x-1 text-rose-700 font-mono font-extrabold text-xs sm:text-sm bg-rose-50 px-2 py-1 rounded border border-rose-200">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      <span>{sector.hiringDelta}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
