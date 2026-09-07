import React, { useState } from 'react';
import { CandidateProfile } from '../../types/candidate';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import { detectDomain } from '../../utils/candidateDomain';
import { RefreshCw, ArrowRight, Clock, Building, CheckCircle2 } from 'lucide-react';

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

  // Real eligibility check: Only show if candidate is currently working, has work experience,
  // or explicitly selected career switching or upskilling
  const isEligible =
    profile?.currentStatus === 'currently-working' ||
    (profile?.workExperienceYears && profile.workExperienceYears > 0) ||
    profile?.aim === 'switch-career' ||
    profile?.aim === 'new-skill';

  if (!isEligible) return null;

  const domain = detectDomain(profile);

  // Content adapted directly to candidate's domain
  let bridgeContent = {
    title: language === 'mr'
      ? 'पारंपरिक फिटर/मेकॅनिक ते ईव्ही बॅटरी तंत्रज्ञ: ६ आठवड्यांचा ईव्हनिंग ब्रिज'
      : 'From ICE Fitter/Mechanic to EV Battery Assembler: 6-Week Evening Upskill',
    description: language === 'mr'
      ? 'तुमचा सध्याचा २-४ वर्षांचा अनुभव वाया जाणार नाही. हाय-व्होल्टेज सुरक्षा आणि बीएमएस चाचणीचे थेट मॉड्युल पूर्ण करा — शनिवार-रविवार बॅच उपलब्ध.'
      : 'Your existing mechanical tool-handling experience is recognized. Add High-Voltage Safety, BMS diagnosis, and CAN-Bus probing in convenient 6-week evening sessions at Govt. ITI Nashik.',
    courseId: 'c-ev-powertrain',
    timing: '6 PM – 8 PM (Mon-Fri) / Weekends',
    location: 'Govt. ITI Nashik (Ambad EV Hub)',
    wageLeap: '+85% Wage Leap upon Completion'
  };

  if (domain === 'it_cyber') {
    bridgeContent = {
      title: language === 'mr'
        ? 'आयटी सपोर्ट / डेस्कटॉप तंत्रज्ञ ते सायबर सुरक्षा सॉक ऑपरेटर: ६ आठवड्यांचा ईव्हनिंग ब्रिज'
        : 'From IT Support / SysAdmin to Cyber Security SOC Operator: 6-Week Evening Upskill',
      description: language === 'mr'
        ? 'तुमचा सध्याचा संगणक व नेटवर्किंगचा अनुभव वाया जाणार नाही. सायबर थ्रेट डिटेक्शन, सॉक मॉनिटरिंग आणि झीरो-ट्रस्ट डिफेन्सचे थेट मॉड्युल्स सायंकाळच्या बॅचमध्ये पूर्ण करा.'
        : 'Your existing PC troubleshooting & networking experience is recognized. Add SIEM Log Monitoring (Splunk), Zero-Trust Defense, and Linux hardening in convenient 6-week evening sessions at Govt. Polytechnic Pune / Online.',
      courseId: 'c-cyber-defense-analyst',
      timing: '6:30 PM – 8:30 PM (Mon-Fri) Live Virtual Lab',
      location: 'Maha-Cyber Command Center & Govt Poly Pune',
      wageLeap: '+78% Tech Salary Leap upon Certification'
    };
  } else if (domain === 'solar_renewable') {
    bridgeContent = {
      title: language === 'mr'
        ? 'पारंपरिक वायरमन ते सोलर रूफटॉप व ग्रिड तंत्रज्ञ: ४ आठवड्यांचा ईव्हनिंग ब्रिज'
        : 'From Domestic Wireman to Solar Rooftop & Grid Integration: 4-Week Evening Bridge',
      description: language === 'mr'
        ? 'घरगुती वायरिंगच्या ज्ञानावर आधारित नेट-मीटरिंग, इनव्हर्टर सिंक्रोनायझेशन आणि पीएम-सूर्यघर सोलर इन्स्टॉलेशन प्रमाणपत्र मिळवा.'
        : 'Leverage your existing single-phase wiring experience. Add Net-Metering, Solar Inverter Synchronization, and PM-Surya Ghar Rooftop certification.',
      courseId: 'c-solar-pv',
      timing: 'Saturday & Sunday Practical Batches',
      location: 'Govt. ITI Kolhapur / Pune Solar Lab',
      wageLeap: '+65% Income Leap with EPC Sub-contracts'
    };
  }

  const handleAction = () => {
    setEnrolledBridge(true);
    if (onExploreCourse) {
      onExploreCourse(bridgeContent.courseId);
    } else if (onExplore) {
      onExplore();
    }
  };

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
              {bridgeContent.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              {bridgeContent.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-amber-200 font-medium">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{bridgeContent.timing}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>{bridgeContent.location}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{bridgeContent.wageLeap}</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={handleAction}
              className="w-full md:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
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

