import React, { useState } from 'react';
import { CandidateProfile } from '../../types/candidate';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import { RefreshCw, ArrowRight, Clock, Building, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReskillingPathwayCardProps {
  profile?: CandidateProfile;
  language: SupportedLang;
  onExploreCourse?: (courseId: string) => void;
  onExplore?: () => void;
}

export const ReskillingPathwayCard: React.FC<ReskillingPathwayCardProps> = ({
  profile,
  language,
  onExploreCourse,
  onExplore
}) => {
  const t = TRANSLATIONS[language];
  const [enrolledBridge, setEnrolledBridge] = useState(false);

  // Shows primarily if candidate is working or studying in mechanical/fitter/auto
  const isEligible =
    profile?.currentStatus === 'currently-working' ||
    (profile?.tradeOrField && profile.tradeOrField.toLowerCase().includes('fitter')) ||
    (profile?.tradeOrField && profile.tradeOrField.toLowerCase().includes('mechanic')) ||
    profile?.aim === 'switch-career' ||
    true; // keep visible as high value for vocational candidates

  if (!isEligible) return null;

  return (
    <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-8 px-4 sm:px-6 border-b border-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-white/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1">
                <RefreshCw className="w-3 h-3" />
                <span>Working Professional Bridge</span>
              </span>
              <span className="text-xs text-blue-200">
                Don&apos;t quit your job to upgrade
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {language === 'mr'
                ? 'पारंपरिक फिटर/मेकॅनिक ते ईव्ही बॅटरी तंत्रज्ञ: ६ आठवड्यांचा ईव्हनिंग ब्रिज'
                : 'From ICE Fitter/Mechanic to EV Battery Assembler: 6-Week Evening Upskill'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              {language === 'mr'
                ? 'तुमचा सध्याचा २-४ वर्षांचा अनुभव वाया जाणार नाही. हाय-व्होल्टेज सुरक्षा आणि बीएमएस चाचणीचे थेट मॉड्युल पूर्ण करा — शनिवार-रविवार बॅच उपलब्ध.'
                : 'Your existing mechanical tool-handling experience is recognized. Add High-Voltage Safety, BMS diagnosis, and CAN-Bus probing in convenient 6-week evening sessions at Govt. ITI Nashik.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-amber-200 font-medium">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>6 PM – 8 PM (Mon-Fri)</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Subsidized under Maha-Kaushal</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>+85% Wage Leap upon Completion</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                setEnrolledBridge(true);
                onExploreCourse('c-ev-powertrain');
              }}
              className="w-full md:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>{enrolledBridge ? 'Enrolled in Evening Batch' : t.reskillingAction}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
