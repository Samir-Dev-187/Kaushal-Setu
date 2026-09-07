import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HERO_SLIDES } from '../../data/mockData';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
  BookOpen,
  Users,
  Briefcase,
  Building,
  TrendingUp,
  MapPin,
  RefreshCw,
  Sparkles
} from 'lucide-react';

const SLIDE_TRANSLATIONS: Record<number, { mr: { title: string; text: string }; hi: { title: string; text: string } }> = {
  1: {
    mr: { title: 'कौशल्य व उद्योग मागणीची सांगड', text: 'कौशल सेतू महाराष्ट्रभरातील कामगार बाजार टेलिमेट्रीद्वारे उद्योग, प्रशिक्षण केंद्रे, उमेदवार आणि शासनाला जोडते.' },
    hi: { title: 'उद्योग की मांग के साथ कौशलों को जोड़ना', text: 'कौशल सेतु सतत श्रम-बाजार टेलीमेट्री के माध्यम से नियोक्ताओं, प्रशिक्षण केंद्रों और उम्मीदवारों को जोड़ता है।' }
  },
  2: {
    mr: { title: 'आज उद्योगांना काय हवे आहे', text: 'कौशल सेतू थेट नोकरीच्या जाहिराती, उद्योग सर्वेक्षणे आणि औद्योगिक क्षेत्रांकडून रिअल-टाइम डेटा गोळा करते.' },
    hi: { title: 'उद्योगों को आज क्या चाहिए', text: 'कौशल सेतु लाइव जॉब पोस्टिंग, नियोक्ता सर्वेक्षण और औद्योगिक क्लस्टर से वास्तविक समय बाजार डेटा एकत्र करता है।' }
  },
  3: {
    mr: { title: 'उद्याच्या नोकऱ्यांसाठी आजच तयार व्हा', text: 'इलेक्ट्रिक व्हेईकल, सौर ऊर्जा आणि ऑटोमेशन क्षेत्रातील वाढत्या संधी ओळखा.' },
    hi: { title: 'भविष्य की नौकरियों के लिए आज ही तैयार हों', text: 'इलेक्ट्रिक वाहन, सौर ऊर्जा और ऑटोमेशन क्षेत्रों में उभरते कौशलों की पहचान करें।' }
  },
  4: {
    mr: { title: 'उद्योग मागणीनुसार अद्ययावत अभ्यासक्रम', text: 'कालबाह्य झालेले मॉड्युल्स ओळखून ITI व प्रशिक्षण संस्थांसाठी आधुनिक अभ्यासक्रम सुचवणे.' },
    hi: { title: 'उद्योग की मांग के अनुरूप आधुनिक पाठ्यक्रम', text: 'पुराने पाठ्यक्रमों की पहचान कर ITI और प्रशिक्षण केंद्रों के लिए साक्ष्य-आधारित अपडेट प्रदान करना।' }
  },
  5: {
    mr: { title: 'अधिक सक्षम प्रशिक्षण केंद्रे', text: 'प्रशिक्षण केंद्रे त्यांच्या प्रयोगशाळा, उपकरणे व शिक्षकांच्या क्षमतेचे मूल्यांकन करू शकतात.' },
    hi: { title: 'अधिक सक्षम प्रशिक्षण केंद्र', text: 'प्रशिक्षण संस्थान अपनी प्रयोगशालाओं और शिक्षकों की क्षमता का उद्योग मांग के अनुसार मूल्यांकन कर सकते हैं।' }
  },
  6: {
    mr: { title: 'स्पष्ट आणि पारदर्शक करिअर निवड', text: 'उमेदवारांना प्रवेश घेण्यापूर्वीच कोणत्या ट्रेडमध्ये जास्त रोजगार संधी आहेत हे समजते.' },
    hi: { title: 'स्पष्ट और पारदर्शी करियर विकल्प', text: 'उम्मीदवार प्रवेश लेने से पहले ही जान सकते हैं कि किन ट्रेडों में भर्ती और वेतन बेहतर है।' }
  },
  7: {
    mr: { title: 'उद्योगांचा थेट सहभाग', text: 'उद्योग त्यांच्या आवश्यकतेनुसार थेट अभ्यासक्रम बदलाचे आणि शिकसऊ उमेदवारांचे नियोजन करू शकतात.' },
    hi: { title: 'उद्योगों की सीधी भागीदारी', text: 'उद्योग अपनी कौशल आवश्यकताओं और भर्ती की जानकारी सीधे राज्य प्रशिक्षण बोर्डों को दे सकते हैं।' }
  },
  8: {
    mr: { title: 'डेटा-आधारित शासकीय निर्णय', text: 'शासकीय विभाग जिल्हा कौशल्य तुटवड्याच्या आधारे बजेट आणि नवीन तुकड्यांची मंजुरी देऊ शकतात.' },
    hi: { title: 'डेटा-आधारित नीतिगत निर्णय', text: 'सरकारी विभाग जिला कौशल विश्लेषिकी का उपयोग करके बजट और नई इकाइयों की स्वीकृति दे सकते हैं।' }
  },
  9: {
    mr: { title: 'ग्रामीण आणि शहरी भागांचा समान विकास', text: 'ग्रामीण आणि निमशहरी भागातील उमेदवारांना मेट्रो शहरांइतकीच उत्तम बाजार माहिती मिळणे.' },
    hi: { title: 'ग्रामीण और शहरी क्षेत्रों का समान विकास', text: 'छोटे जिलों के उम्मीदवारों को बड़े शहरों के समान उच्च स्तरीय बाजार जानकारी उपलब्ध कराना।' }
  }
};

export const HeroCarousel: React.FC = () => {
  const { language } = useAuth();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const SLIDE_DURATION = 5000; // 5000 ms per slide
  const UPDATE_INTERVAL = 50; // Progress bar smoothness
  const totalSlides = HERO_SLIDES.length;

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // Autoplay and Progress timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + (UPDATE_INTERVAL / SLIDE_DURATION) * 100;
        if (nextProgress >= 100) {
          goToNextSlide();
          return 0;
        }
        return nextProgress;
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, goToNextSlide]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === ' ' && e.target === document.body) {
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      goToNextSlide();
    } else if (distance < -minSwipeDistance) {
      goToPrevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Render dynamic visual illustration for each slide
  const renderSlideVisual = (type: string) => {
    switch (type) {
      case 'stakeholders':
        return (
          <div className="relative w-full max-w-md h-64 sm:h-72 bg-gradient-to-br from-blue-900/90 to-[#0A192F] rounded-2xl p-4 border border-blue-700/50 shadow-xl flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between text-[11px] text-blue-200 border-b border-blue-800/80 pb-2">
              <span className="font-bold flex items-center gap-1.5 text-white">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                Kaushal Setu AI Core Loop
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-mono">
                Continuous Sync
              </span>
            </div>

            {/* Central Node Visual */}
            <div className="relative flex items-center justify-center my-auto">
              <div className="w-20 h-20 rounded-full bg-blue-600/30 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.3)] animate-pulse">
                <div className="text-center">
                  <div className="text-[10px] font-extrabold text-amber-300 leading-tight">AI &amp; NLP</div>
                  <div className="text-[9px] text-white">ENGINE</div>
                </div>
              </div>

              {/* 4 Connected Nodes */}
              <div className="absolute -top-3 left-6 bg-slate-800 border border-blue-400/40 px-2 py-1 rounded text-[10px] text-white font-semibold flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-amber-400" /> Industry
              </div>
              <div className="absolute -top-3 right-6 bg-slate-800 border border-blue-400/40 px-2 py-1 rounded text-[10px] text-white font-semibold flex items-center gap-1">
                <Building className="w-3 h-3 text-blue-400" /> Training
              </div>
              <div className="absolute -bottom-3 left-6 bg-slate-800 border border-blue-400/40 px-2 py-1 rounded text-[10px] text-white font-semibold flex items-center gap-1">
                <Users className="w-3 h-3 text-emerald-400" /> Candidates
              </div>
              <div className="absolute -bottom-3 right-6 bg-slate-800 border border-blue-400/40 px-2 py-1 rounded text-[10px] text-white font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-purple-400" /> Government
              </div>
            </div>

            <div className="text-center text-[11px] text-slate-300 font-mono bg-black/40 py-1.5 rounded border border-white/10">
              Industry Signals &rarr; AI Telemetry &rarr; Verified Curricula &rarr; Jobs
            </div>
          </div>
        );

      case 'signals':
        return (
          <div className="w-full max-w-md bg-white rounded-xl p-5 border border-slate-200 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-700" /> Live Industry Telemetry Feed
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
                Active NLP Pipeline
              </span>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">EV Diagnostics &amp; Battery Tech</div>
                  <div className="text-[10px] text-slate-500">Auto Cluster (Pune &amp; Chh. Sambhajinagar)</div>
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-[11px]">+38% Demand</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Automated Logistics &amp; Robotics</div>
                  <div className="text-[10px] text-slate-500">Warehousing Hubs (Bhiwandi &amp; Nagpur)</div>
                </div>
                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-[11px]">+29% Demand</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Solar Grid &amp; Inverter Operations</div>
                  <div className="text-[10px] text-slate-500">Renewable Corridors (Nashik &amp; Solapur)</div>
                </div>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-[11px]">+42% Demand</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 text-right italic">
              Illustrative prototype data based on regional employer survey patterns
            </div>
          </div>
        );

      case 'sectors':
        return (
          <div className="w-full max-w-md bg-[#0A1A2F] text-white rounded-xl p-5 border border-blue-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-blue-800">
              <span className="text-xs font-bold flex items-center gap-1.5 text-amber-400">
                <Zap className="w-4 h-4" /> Sunrise Industry Sectors (2026-2030)
              </span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">High Growth</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-blue-950/80 rounded border border-blue-800/80">
                <div className="text-[10px] text-slate-400 uppercase">Mobility</div>
                <div className="font-bold text-slate-100">Electric Vehicles</div>
                <div className="text-[10px] text-emerald-400 mt-1">Powertrain &amp; BMS</div>
              </div>
              <div className="p-2.5 bg-blue-950/80 rounded border border-blue-800/80">
                <div className="text-[10px] text-slate-400 uppercase">Clean Power</div>
                <div className="font-bold text-slate-100">Solar &amp; Green H2</div>
                <div className="text-[10px] text-emerald-400 mt-1">Grid &amp; Storage Tech</div>
              </div>
              <div className="p-2.5 bg-blue-950/80 rounded border border-blue-800/80">
                <div className="text-[10px] text-slate-400 uppercase">Infrastructure</div>
                <div className="font-bold text-slate-100">Data Centres</div>
                <div className="text-[10px] text-emerald-400 mt-1">HVAC &amp; Hardware Ops</div>
              </div>
              <div className="p-2.5 bg-blue-950/80 rounded border border-blue-800/80">
                <div className="text-[10px] text-slate-400 uppercase">Industry 4.0</div>
                <div className="font-bold text-slate-100">Smart Manufacturing</div>
                <div className="text-[10px] text-emerald-400 mt-1">Robotics &amp; CNC</div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 text-center font-mono pt-1">
              Anticipating deficits before industrial execution delays occur
            </div>
          </div>
        );

      case 'curriculum':
        return (
          <div className="w-full max-w-md bg-white rounded-xl p-5 border border-slate-200 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-700" /> Evidence-Based Course Modernization
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                Kalyani Training Centre Case
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-red-50 rounded border border-red-100 text-xs text-red-900">
                <span className="font-bold">Legacy Syllabus:</span>
                <span>Carburettor tuning &amp; mechanical distributor servicing (Obsolescence Flagged)</span>
              </div>
              <div className="flex justify-center text-blue-600 font-bold text-xs py-0.5">
                &darr; AI Analysis + Academic Council Review &darr;
              </div>
              <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded border border-emerald-100 text-xs text-emerald-900">
                <span className="font-bold">Modernized Upgrade:</span>
                <span>EV Motor Systems, Battery Diagnostics &amp; High-Voltage Safety Standards</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded text-center">
              Modular 120-hour practical add-on without discarding full institutional trade structure.
            </div>
          </div>
        );

      case 'training':
        return (
          <div className="w-full max-w-md bg-gradient-to-br from-blue-950 to-slate-900 text-white rounded-xl p-5 border border-blue-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-blue-800">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Building className="w-4 h-4" /> Training Centre Health Scorecard
              </span>
              <span className="text-[10px] bg-blue-800 text-blue-200 px-2 py-0.5 rounded font-mono">
                Pune Training Centre / MMV Trade
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">Curriculum Market Alignment</span>
                  <span className="font-bold text-emerald-400">88% (Optimized)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full w-[88%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">Practical Lab Equipment Readiness</span>
                  <span className="font-bold text-amber-400">62% (Upgrade Recommended)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full w-[62%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">Trainer EV Certification Level</span>
                  <span className="font-bold text-blue-400">74% (In Progress)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full w-[74%]"></div>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 text-right italic pt-1">
              Illustrative institutional diagnostic dashboard
            </div>
          </div>
        );

      case 'candidate':
        return (
          <div className="w-full max-w-md bg-white rounded-xl p-5 border border-slate-200 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-700" /> Candidate Decision Visibility
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Transparent Career Insights
              </span>
            </div>
            <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-100 text-xs space-y-1.5">
              <div className="font-bold text-blue-900">Trade: Electrician &rarr; Solar / EV Specialist</div>
              <div className="text-slate-600 text-[11px]">
                Regional 3-Year Demand Velocity: <strong className="text-emerald-700">VERY HIGH</strong>
              </div>
              <div className="text-slate-600 text-[11px]">
                Average Local Placement Wage: <strong className="text-slate-900">&#8377;22,000 - &#8377;34,000 / mo</strong>
              </div>
              <div className="text-slate-600 text-[11px]">
                Recommended Bridge Unit: <strong>High Voltage Safety &amp; Battery Inverters (40 hrs)</strong>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 text-center">
              Empowering youth to avoid investing years into declining legacy vocations.
            </div>
          </div>
        );

      case 'employer':
        return (
          <div className="w-full max-w-md bg-white rounded-xl p-5 border border-slate-200 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-amber-600" /> Direct Industry Co-Governance
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-700 font-mono">
                Quarterly Input
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Submit Micro-Competency Gaps</div>
                  <div className="text-[11px] text-slate-500">
                    Tell state training boards exactly which toolsets fresh graduates are missing on day 1.
                  </div>
                </div>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Participate in Dual Training / NAPS</div>
                  <div className="text-[11px] text-slate-500">
                    Sponsor on-the-job apprenticeships with pre-screened talent from regional training providers.
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 text-right">
              Closing the industry-institute gap through continuous consultation
            </div>
          </div>
        );

      case 'governance':
        return (
          <div className="w-full max-w-md bg-[#0A1A2F] text-white rounded-xl p-5 border border-blue-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-blue-800">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Predictive District Planning Tool
              </span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                State Directorate Mode
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-blue-950 rounded border border-blue-800 flex justify-between items-center">
                <span>District Capital Allocation Prioritization</span>
                <span className="text-emerald-400 font-bold font-mono">DATA-BACKED</span>
              </div>
              <div className="p-2 bg-blue-950 rounded border border-blue-800 flex justify-between items-center">
                <span>New Trade Sanction Approval Workflow</span>
                <span className="text-blue-300 font-bold font-mono">SURPLUS AWARE</span>
              </div>
              <div className="p-2 bg-blue-950 rounded border border-blue-800 flex justify-between items-center">
                <span>Vocational Training Public ROI Index</span>
                <span className="text-amber-400 font-bold font-mono">3.8x (Estimated)</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 text-center italic pt-1">
              Illustrative prototype governance model for District Skill Committees (DSCs)
            </div>
          </div>
        );

      case 'rural':
        return (
          <div className="w-full max-w-md bg-white rounded-xl p-5 border border-slate-200 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" /> Tier-2 &amp; Tier-3 Grassroots Reach
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                All 36 Districts
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <div className="font-bold text-slate-800">Marathi &amp; Hindi UI</div>
                <div className="text-[11px] text-slate-500">Accessible for vernacular learners and instructors.</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <div className="font-bold text-slate-800">Low-Bandwidth Mode</div>
                <div className="text-[11px] text-slate-500">Optimized for rural mobile networks and basic tablets.</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <div className="font-bold text-slate-800">SMS / IVR Alerts</div>
                <div className="text-[11px] text-slate-500">Skill demand notifications for non-smartphone users.</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <div className="font-bold text-slate-800">Localised Trades</div>
                <div className="text-[11px] text-slate-500">Agri-mechanization, solar pumps &amp; food processing.</div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 text-center italic">
              Ensuring market intelligence is not confined to Tier-1 metropolitan cities.
            </div>
          </div>
        );

      case 'ecosystem':
      default:
        return (
          <div className="w-full max-w-md bg-gradient-to-br from-[#0C2340] to-blue-900 text-white rounded-xl p-5 border border-blue-700 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-blue-800">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 animate-spin" /> Continuous Closed-Loop Feedback
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                Live Iteration
              </span>
            </div>
            <div className="p-3 bg-black/30 rounded border border-white/10 text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">1. Real-time Market Telemetry</span>
                <span className="text-emerald-400 font-mono">&rarr; Ingestion</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">2. AI Semantic Skill Normalization</span>
                <span className="text-blue-300 font-mono">&rarr; Processing</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">3. Human Expert &amp; Council Validation</span>
                <span className="text-amber-300 font-mono">&rarr; Safeguard</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">4. Lab &amp; Curriculum Execution</span>
                <span className="text-emerald-300 font-mono">&rarr; Placement</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-300 text-center font-mono">
              Every graduate outcome recalibrates the state skill models.
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="hero-carousel-section"
      aria-label="Kaushal Setu Hero Carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-white border-b border-slate-200 py-10 sm:py-16 overflow-hidden"
    >
      {/* Background architectural grid pattern */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#0C2340_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Carousel Slide Container */}
        <div className="relative min-h-[460px] sm:min-h-[420px] flex items-center">
          <div
            key={currentSlide.id}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-500 ease-out transform"
            style={{
              animation: 'slideFromRight 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Left 7 Columns: Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {/* Category label badge */}
              <div className="inline-flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-900 text-[11px] font-extrabold uppercase tracking-wider border border-blue-200">
                  {currentSlide.category}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold hidden sm:inline">
                  Slide {currentSlideIndex + 1} of {totalSlides}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                  {currentSlide.badge}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0C2340] tracking-tight leading-[1.15]">
                {currentSlide.title}
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                {currentSlide.text}
              </p>

              {/* Bullet highlights */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentSlide.highlights.map((h, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>{h}</span>
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {currentSlide.ctaAction.startsWith('/') ? (
                  <Link
                    to={currentSlide.ctaAction}
                    className="inline-flex items-center space-x-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white px-5 py-2.5 rounded-md text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <a
                    href={currentSlide.ctaAction}
                    className="inline-flex items-center space-x-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white px-5 py-2.5 rounded-md text-sm font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}

                {currentSlide.secondaryCtaText && (
                  currentSlide.secondaryCtaAction?.startsWith('/') ? (
                    <Link
                      to={currentSlide.secondaryCtaAction}
                      className="inline-flex items-center space-x-1.5 bg-white hover:bg-slate-50 text-[#0C2340] px-4 py-2.5 rounded-md text-sm font-bold border border-slate-300 shadow-2xs transition-colors"
                    >
                      <span>{currentSlide.secondaryCtaText}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </Link>
                  ) : (
                    <a
                      href={currentSlide.secondaryCtaAction}
                      className="inline-flex items-center space-x-1.5 bg-white hover:bg-slate-50 text-[#0C2340] px-4 py-2.5 rounded-md text-sm font-bold border border-slate-300 shadow-2xs transition-colors"
                    >
                      <span>{currentSlide.secondaryCtaText}</span>
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Right 5 Columns: Dynamic Vector/Illustration */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              {renderSlideVisual(currentSlide.visualType)}
            </div>
          </div>
        </div>

        {/* Carousel Controls Bar */}
        <div className="mt-8 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Progress Indicator Bar */}
          <div className="w-full sm:w-1/3 flex items-center space-x-2">
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-700 h-1.5 rounded-full transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
              0{currentSlideIndex + 1} / {totalSlides < 10 ? `0${totalSlides}` : totalSlides}
            </span>
          </div>

          {/* Slide Indicator Dots/Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setProgress(0);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentSlideIndex
                    ? 'w-6 bg-[#0C2340]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Go to slide ${idx + 1}: ${slide.title}`}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              />
            ))}
          </div>

          {/* Prev / Play-Pause / Next Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPrevSlide}
              className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 shadow-2xs transition"
              title="Previous Slide (or left arrow key)"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 shadow-2xs transition"
              title={isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}
              aria-label={isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-blue-800" /> : <Play className="w-4 h-4 text-emerald-700" />}
            </button>

            <button
              onClick={goToNextSlide}
              className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 shadow-2xs transition"
              title="Next Slide (or right arrow key)"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(36px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};
