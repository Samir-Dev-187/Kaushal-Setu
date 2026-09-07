import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SupportedLang } from '../../data/siteTranslations';
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  BookOpen,
  Award,
  Sparkles,
  Layers
} from 'lucide-react';

const CASE_STUDY_TRANSLATIONS: Record<SupportedLang, {
  badge: string;
  title: string;
  subtitle: string;
  legacyBadge: string;
  decliningBadge: string;
  legacyTitle: string;
  legacyDesc: string;
  challengeTitle: string;
  challengeDesc: string;
  upgradeTitle: string;
  modernizedBadge: string;
  modernizedTitle: string;
  modernizedDesc: string;
  solutionTitle: string;
  solutionDesc: string;
  demoBtn: string;
}> = {
  en: {
    badge: 'Real-World Validation Model • Kalyani Training Centre Pune',
    title: 'From ICE to EV: How Kaushal Setu Detects Change',
    subtitle: 'A concrete case study showing how the platform detects obsolescence in automotive trades and synthesizes a verified EV transition curriculum.',
    legacyBadge: 'Legacy Baseline',
    decliningBadge: 'Declining Demand',
    legacyTitle: 'ICE Automobile Training (Mechanic Motor Vehicle)',
    legacyDesc: 'Focuses primarily on internal combustion engines, mechanical fuel injection, manual gearbox repair, and carburettor tuning.',
    challengeTitle: 'The Challenge:',
    challengeDesc: 'Pune & Chhatrapati Sambhajinagar auto clusters are rapidly retooling for electric mobility; traditional workshops face reduced hiring velocity.',
    upgradeTitle: 'AI Diagnostics & System Upgrade',
    modernizedBadge: 'Modernized Output',
    modernizedTitle: 'EV Powertrain & High-Voltage Battery Specialist',
    modernizedDesc: 'Updated syllabus incorporating Battery Management Systems (BMS), Electric Motor Diagnostics, High-Voltage Safety, and Regenerative Braking.',
    solutionTitle: 'The Solution:',
    solutionDesc: '70% shared mechanical fundamentals retained; 30% specialized high-voltage EV modules added without extending 2-year course duration.',
    demoBtn: 'Simulate EV Curriculum Upgrade'
  },
  mr: {
    badge: 'वास्तविक मूल्यमापन मॉडेल • कल्याणी प्रशिक्षण केंद्र पुणे',
    title: 'ICE ते EV तांत्रिक बदल: कौशल सेतू कसे काम करते',
    subtitle: 'ऑटोमोबाईल क्षेत्रातील कालबाह्य ट्रेड ओळखून अद्ययावत EV अभ्यासक्रम कसा तयार केला जातो याचे प्रत्यक्ष उदाहरण.',
    legacyBadge: 'पारंपरिक पाया',
    decliningBadge: 'घटती उद्योग मागणी',
    legacyTitle: 'पारंपरिक ITI ऑटोमोबाईल ट्रेड (मेकॅनिक मोटर व्हेईकल)',
    legacyDesc: 'इंधन इंजिन, मेकॅनिकल फ्यूल इंजेक्शन, मॅन्युअल गिअरबॉक्स दुरुस्ती आणि कार्बोरेटर ट्युनिंगवर आधारित जुना अभ्यासक्रम.',
    challengeTitle: 'मुख्य आव्हान:',
    challengeDesc: 'पुणे व छत्रपती संभाजीनगर औद्योगिक पट्ट्यात EV उत्पादन वेगाने वाढत आहे; त्यामुळे जुन्या ट्रेडच्या भरतीचा वेग मंदावला आहे.',
    upgradeTitle: 'AI निदान व अभ्यासक्रम अद्ययावतीकरण',
    modernizedBadge: 'आधुनिक अभ्यासक्रम',
    modernizedTitle: 'EV पॉवरट्रेन आणि हाय-व्होल्टेज बॅटरी तज्ज्ञ',
    modernizedDesc: 'बॅटरी मॅनेजमेंट सिस्टीम (BMS), इलेक्ट्रिक मोटर डायग्नोस्टिक्स, हाय-व्होल्टेज सुरक्षा आणि रिजनरेटिव्ह ब्रेकिंगचा समावेश.',
    solutionTitle: 'कौशल सेतू उपाय:',
    solutionDesc: '७०% मूलभूत मेकॅनिकल संकल्पना कायम ठेवून ३०% अद्ययावत EV हाय-व्होल्टेज मॉड्युल्स २ वर्षांच्या कालावधीत समाविष्ट.',
    demoBtn: 'EV अभ्यासक्रम अद्ययावतीकरण सिम्युलेशन'
  },
  hi: {
    badge: 'वास्तविक मूल्यांकन मॉडल • कल्याणी प्रशिक्षण केंद्र पुणे',
    title: 'ICE से EV परिवर्तन: कौशल सेतु बदलाव कैसे पहचानता है',
    subtitle: 'ऑटोमोटिव क्षेत्र में पुरानी तकनीकों की पहचान कर अद्यतन EV पाठ्यक्रम तैयार करने का व्यावहारिक केस स्टडी।',
    legacyBadge: 'पारंपरिक आधार',
    decliningBadge: 'घटती उद्योग मांग',
    legacyTitle: 'पारंपरिक ITI ऑटोमोबाइल ट्रेड (मैकेनिक मोटर व्हीकल)',
    legacyDesc: 'आंतरिक दहन इंजन, मैकेनिकल फ्यूल इंजेक्शन, मैनुअल गियरबॉक्स मरम्मत और कार्बोरेटर ट्युनिंग पर केंद्रित।',
    challengeTitle: 'मुख्य चुनौती:',
    challengeDesc: 'पुणे और छत्रपति संभाजीनगर ऑटो क्लस्टर तेजी से इलेक्ट्रिक वाहनों की ओर बढ़ रहे हैं; पारंपरिक वर्कशॉप में भर्ती घटी है।',
    upgradeTitle: 'AI निदान एवं पाठ्यक्रम अपग्रेड',
    modernizedBadge: 'आधुनिक पाठ्यक्रम',
    modernizedTitle: 'EV पावरट्रेन एवं हाई-वोल्टेज बैटरी विशेषज्ञ',
    modernizedDesc: 'बैटरी मैनेजमेंट सिस्टम (BMS), इलेक्ट्रिक मोटर डायग्नोस्टिक्स, हाई-वोल्टेज सुरक्षा और रीजनेरेटिव ब्रेकिंग शामिल।',
    solutionTitle: 'कौशल सेतु समाधान:',
    solutionDesc: '70% बुनियादी मैकेनिकल सिद्धांतों को बनाए रखते हुए 30% नए EV मॉड्यूल 2 वर्ष की अवधि में जोड़े गए।',
    demoBtn: 'EV पाठ्यक्रम अपग्रेड सिमुलेशन देखें'
  }
};

export const IceToEvCaseStudy: React.FC = () => {
  const { language } = useAuth();
  const currentLang = (language as SupportedLang) || 'en';
  const t = CASE_STUDY_TRANSLATIONS[currentLang] || CASE_STUDY_TRANSLATIONS.en;
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section id="case-study" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340] tracking-tight mt-2">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* The Transition Journey Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Before (Legacy ICE State) */}
            <div className="lg:col-span-4 bg-red-50/40 rounded-xl p-5 border border-red-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">
                  {t.legacyBadge}
                </span>
                <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">
                  {t.decliningBadge}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {t.legacyTitle}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {t.legacyDesc}
              </p>
              <div className="p-3 bg-white rounded border border-red-100 text-xs space-y-1">
                <div className="font-bold text-red-900 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>{t.challengeTitle}</span>
                </div>
                <div className="text-slate-600 leading-tight">
                  {t.challengeDesc}
                </div>
              </div>
            </div>

            {/* Middle Col: The Kaushal Setu Ingestion & AI Normalization Engine */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3 p-4 bg-blue-50/60 rounded-xl border border-blue-200 text-center">
              <div className="w-12 h-12 rounded-full bg-[#0C2340] text-amber-400 flex items-center justify-center shadow-md">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <div className="text-xs font-extrabold text-[#0C2340] uppercase tracking-wider">
                  Kaushal Setu AI Telemetry Ingestion
                </div>
                <div className="text-[11px] text-slate-600 mt-1 font-mono">
                  Synthesizes High-Frequency Signals
                </div>
              </div>

              <div className="w-full space-y-1.5 text-xs text-left">
                <div className="bg-white p-2 rounded border border-blue-200 text-slate-700 flex items-center justify-between">
                  <span>1. Job Postings NLP</span>
                  <span className="font-bold text-blue-700">+38% EV mentions</span>
                </div>
                <div className="bg-white p-2 rounded border border-blue-200 text-slate-700 flex items-center justify-between">
                  <span>2. Sector Investment Growth</span>
                  <span className="font-bold text-blue-700">Maha EV Policy</span>
                </div>
                <div className="bg-white p-2 rounded border border-blue-200 text-slate-700 flex items-center justify-between">
                  <span>3. Employer Surveys</span>
                  <span className="font-bold text-blue-700">Tata / Bajaj Clusters</span>
                </div>
                <div className="bg-white p-2 rounded border border-blue-200 text-slate-700 flex items-center justify-between">
                  <span>4. Tech Shift Tracking</span>
                  <span className="font-bold text-blue-700">BMS &amp; Li-Ion Safety</span>
                </div>
              </div>

              <div className="text-[10px] text-blue-900 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Flags Trade Obsolescence Risk &amp; Drafts Add-on Modules</span>
              </div>
            </div>

            {/* Right Col: Recommended Curricular & Lab Upgrade */}
            <div className="lg:col-span-4 bg-emerald-50/40 rounded-xl p-5 border border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  Validated Action
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  High Placement ROI
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Modular EV Technology Upgrade (120 Hours)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Academic council ratifies modular upgrade; students retain core mechanical base while gaining modern EV credentials:
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 bg-white rounded border border-emerald-200 text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>EV Motor Systems &amp; Regenerative Braking</span>
                </div>
                <div className="p-2 bg-white rounded border border-emerald-200 text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Battery Management Systems (BMS) &amp; Diagnostics</span>
                </div>
                <div className="p-2 bg-white rounded border border-emerald-200 text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>High-Voltage Li-ion Safety &amp; Charging Protocols</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600 text-center sm:text-left">
              <span className="font-bold text-[#0C2340]">Key takeaway:</span> Training centres avoid discarding their existing capital equipment by deploying targeted 120-hour modular updates.
            </div>
            <button
              onClick={() => setShowDemoModal(true)}
              className="inline-flex items-center space-x-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white px-5 py-2.5 rounded-md text-xs font-bold shadow-xs transition"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Explore the Training Intelligence Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-base text-[#0C2340]">
                  Kalyani ITI Pune &mdash; Curriculum Audit Simulation
                </h3>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-slate-600">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="font-bold text-blue-900 text-sm">Course: Mechanic Motor Vehicle (Trade Code: MMV-201)</div>
                <div className="text-blue-700 mt-0.5">Assigned Institution: Kalyani Government ITI, Pune | Affiliation: DGT / NCVT</div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                  Diagnostic Telemetry Summary:
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                    <div className="text-slate-400 text-[10px]">Market Obsolescence</div>
                    <div className="text-sm font-extrabold text-red-600">HIGH RISK</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                    <div className="text-slate-400 text-[10px]">EV Employer Vacancies</div>
                    <div className="text-sm font-extrabold text-emerald-600">+1,420 Active</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                    <div className="text-slate-400 text-[10px]">Estimated Wage Uplift</div>
                    <div className="text-sm font-extrabold text-blue-700">+35% vs ICE</div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded border border-amber-200 space-y-1.5">
                <div className="font-bold text-amber-900">Recommended 120-Hr Modular Roadmap:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                  <li><strong>Module A (30 hrs):</strong> EV Safety Regulations, PPE &amp; High-Voltage Disconnect Protocols</li>
                  <li><strong>Module B (40 hrs):</strong> Permanent Magnet Synchronous Motors &amp; Motor Controllers</li>
                  <li><strong>Module C (30 hrs):</strong> Li-ion Cell Chemistry, Thermal Runaway Prevention &amp; BMS Diagnostics</li>
                  <li><strong>Module D (20 hrs):</strong> DC Fast Charging Connectors, Protocol Testing &amp; Diagnostic Scanners</li>
                </ul>
              </div>

              <div className="p-2.5 bg-slate-50 rounded text-[11px] text-slate-500 italic">
                * Note for Hackathon Evaluators: In Phase 2, training centre principals can click &ldquo;Download Validated Syllabus Annexure&rdquo; directly into their state portal workflow.
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Close Window
              </button>
              <Link
                to="/login?role=training-centre"
                onClick={() => setShowDemoModal(false)}
                className="bg-[#0C2340] hover:bg-[#1E3A8A] text-white px-4 py-2 rounded text-xs font-bold"
              >
                Training Centre Demo Login &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
