import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SupportedLang } from '../../data/siteTranslations';
import { STAKEHOLDERS_DATA } from '../../data/mockData';
import { Building, Briefcase, Users, ShieldCheck, Check, ArrowRight } from 'lucide-react';

const STAKEHOLDER_TRANSLATIONS: Record<SupportedLang, Record<string, { title: string; tagline: string; description: string; features: string[]; ctaText: string }>> = {
  en: {
    'training-centre': {
      title: 'Training Centres',
      tagline: 'Diagnose syllabi, align labs with MIDC demand, and earn state accreditation.',
      description: 'Access 5-parameter AI syllabus diagnostics, register equipment capacity, and request sanctioned trade seats backed by real local hiring telemetry.',
      features: ['Automated 5-Parameter Syllabus Scoring', 'Lab & Instructor Capability Audit', 'Sanctioned ITI Unit Expansion Requests'],
      ctaText: 'Access Training Portal'
    },
    'employer': {
      title: 'Industrial Employers',
      tagline: 'Signal hiring demand, submit NAPS seats, and co-design curricula.',
      description: 'Directly transmit real-time hiring needs, post NAPS/MAPS apprenticeships, and participate in quarterly trade review committees.',
      features: ['Quarterly Hiring & Demand Telemetry', 'NAPS & MAPS Apprenticeship Posting', 'Direct Trade Curriculum Feedback'],
      ctaText: 'Employer Access'
    },
    'candidate': {
      title: 'Vocational Candidates',
      tagline: 'Check trade placement truth, build DigiLocker skill passports, and level up.',
      description: 'Make informed career choices using transparent 36-district placement data, access NCVET-aligned learning pathways, and claim verified credentials.',
      features: ['Real-Time Trade Truth & Placement Data', 'Verified DigiLocker Skill Passport', 'Interactive Diagnostic & Virtual Labs'],
      ctaText: 'Candidate Gateway'
    },
    'admin': {
      title: 'Government & Policy',
      tagline: 'Dynamic district planning, budget ROI telemetry, and ITI unit sanctions.',
      description: 'Allocate skilling budgets based on live district heatmaps, monitor training centre compliance, and approve trade modernizations.',
      features: ['36-District Predictive Skill Heatmap', '652 ITI Unit Sanctioning System', 'Scheme ROI & Placement Tracking'],
      ctaText: 'Department Portal'
    }
  },
  mr: {
    'training-centre': {
      title: 'प्रशिक्षण केंद्रे',
      tagline: 'अभ्यासक्रम निदान, MIDC मागणीनुसार लॅब सज्जता आणि मान्यता.',
      description: '५-घटक AI अभ्यासक्रम मूल्यमापन, प्रयोगशाळा क्षमता नोंदणी आणि उद्योग मागणीनुसार तुकडी मंजुरी अर्ज करा.',
      features: ['स्वयंचलित ५-घटक अभ्यासक्रम मूल्यमापन', 'प्रयोगशाळा व शिक्षक क्षमता ऑडिट', 'शासकीय ITI तुकडी विस्तार अर्ज'],
      ctaText: 'प्रशिक्षण केंद्र पोर्टल'
    },
    'employer': {
      title: 'औद्योगिक रोजगारदाते',
      tagline: 'भरती मागणी संकेत पाठवा, NAPS जागा नोंदवा आणि अभ्यासक्रम सह-रचना करा.',
      description: 'रिअल-टाइम भरती गरजा, NAPS/MAPS प्रशिक्षणार्थी पदे नोंदवा आणि त्रैमासिक अभ्यासक्रम समितीमध्ये सहभाग घ्या.',
      features: ['त्रैमासिक भरती व मागणी टेलिमेट्री', 'NAPS आणि MAPS प्रशिक्षणार्थी नोंदणी', 'अभ्यासक्रम सुधारणा अभिप्राय'],
      ctaText: 'रोजगारदाते पोर्टल'
    },
    'candidate': {
      title: 'व्यावसायिक उमेदवार',
      tagline: 'ट्रेड सत्यता तपासा, डिजिलॉकर पासपोर्ट तयार करा आणि कौशल्ये वाढवा.',
      description: '३६ जिल्ह्यांतील पारदर्शक रोजगार माहिती पाहून योग्य निर्णय घ्या, प्रमाणित कौशल्य पासपोर्ट मिळवा आणि नवीन संधी शोधा.',
      features: ['रिअल-टाइम ट्रेड सत्यता व रोजगार डेटा', 'प्रमाणित डिजिलॉकर कौशल्य पासपोर्ट', 'अद्ययावत व्हर्च्युअल लॅब मार्गदर्शिका'],
      ctaText: 'उमेदवार पोर्टल'
    },
    'admin': {
      title: 'शासकीय व धोरण विभाग',
      tagline: 'जिल्हा नियोजन, योजना परतावा विश्लेषण आणि ITI तुकडी मंजुरी.',
      description: 'थेट जिल्हा मागणी नकाशाच्या आधारे बजेट वाटप करा, प्रशिक्षण केंद्रांचे मूल्यमापन करा आणि ITI मंजुरी द्या.',
      features: ['३६-जिल्हे अंदाज कौशल्य नकाशा', '६५२ ITI तुकडी मंजुरी कार्यप्रवाह', 'योजना परतावा व रोजगार मागोवा'],
      ctaText: 'शासकीय विभाग पोर्टल'
    }
  },
  hi: {
    'training-centre': {
      title: 'प्रशिक्षण केंद्र',
      tagline: 'पाठ्यक्रम निदान, MIDC मांग के अनुसार लैब तैयारी और मान्यता।',
      description: '5-पैरामीटर AI पाठ्यक्रम मूल्यांकन, प्रयोगशाला क्षमता पंजीकरण और उद्योग मांग के अनुसार इकाई स्वीकृति आवेदन करें।',
      features: ['स्वचालित 5-पैरामीटर पाठ्यक्रम मूल्यांकन', 'प्रयोगशाला एवं शिक्षक क्षमता ऑडिट', 'ITI इकाई विस्तार आवेदन'],
      ctaText: 'प्रशिक्षण केंद्र पोर्टल'
    },
    'employer': {
      title: 'औद्योगिक नियोक्ता',
      tagline: 'भर्ती मांग संकेत भेजें, NAPS सीटें पोस्ट करें और पाठ्यक्रम सह-डिजाइन करें।',
      description: 'वास्तविक समय भर्ती आवश्यकताएं, NAPS/MAPS शिक्षुता पद दर्ज करें और त्रैमासिक पाठ्यक्रम समीक्षा समिति में भाग लें।',
      features: ['त्रैमासिक भर्ती एवं मांग टेलीमेट्री', 'NAPS और MAPS शिक्षुता पंजीकरण', 'प्रत्यक्ष पाठ्यक्रम प्रतिक्रिया'],
      ctaText: 'नियोक्ता पोर्टल'
    },
    'candidate': {
      title: 'व्यावसायिक उम्मीदवार',
      tagline: 'ट्रेड सत्यता जांचें, डिजीजिलॉकर पासपोर्ट बनाएं और कौशल बढ़ाएं।',
      description: '36 जिलों के पारदर्शी प्लेसमेंट डेटा से निर्णय लें, सत्यापित कौशल पासपोर्ट प्राप्त करें और नए अवसर खोजें।',
      features: ['वास्तविक समय ट्रेड सत्यता एवं प्लेसमेंट डेटा', 'सत्यापित डिजीजिलॉकर कौशल पासपोर्ट', 'इंटरएक्टिव वर्चुअल लैब मार्गदर्शिका'],
      ctaText: 'उम्मीदवार पोर्टल'
    },
    'admin': {
      title: 'सरकारी एवं नीति विभाग',
      tagline: 'जिला योजना, योजना प्रतिफल विश्लेषण और ITI इकाई मंजूरी।',
      description: 'लाइव जिला मांग हीटमैप के आधार पर बजट आवंटित करें, प्रशिक्षण केंद्रों का मूल्यांकन करें और ITI मंजूरी दें।',
      features: ['36-जिला पूर्वानुमान कौशल हीटमैप', '652 ITI इकाई मंजूरी कार्यप्रवाह', 'योजना प्रतिफल एवं प्लेसमेंट ट्रैकिंग'],
      ctaText: 'सरकारी विभाग पोर्टल'
    }
  }
};

export const FourStakeholders: React.FC = () => {
  const { language } = useAuth();
  const currentLang = (language as SupportedLang) || 'en';
  const tMap = STAKEHOLDER_TRANSLATIONS[currentLang] || STAKEHOLDER_TRANSLATIONS.en;

  const getStakeholderIcon = (role: string) => {
    switch (role) {
      case 'training-centre':
        return <Building className="w-6 h-6 text-blue-700" />;
      case 'employer':
        return <Briefcase className="w-6 h-6 text-amber-600" />;
      case 'candidate':
        return <Users className="w-6 h-6 text-emerald-600" />;
      case 'admin':
      default:
        return <ShieldCheck className="w-6 h-6 text-purple-700" />;
    }
  };

  return (
    <section id="four-stakeholders" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 bg-blue-100/70 px-3 py-1 rounded-full">
            <span>
              {currentLang === 'mr'
                ? 'एकात्मिक भागधारक फ्रेमवर्क'
                : currentLang === 'hi'
                ? 'एकीकृत हितधारक ढांचा'
                : 'Unified Ecosystem Framework'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C2340] tracking-tight mt-2">
            {currentLang === 'mr'
              ? 'एक प्लॅटफॉर्म. चार प्रमुख भागधारक.'
              : currentLang === 'hi'
              ? 'एक प्लेटफॉर्म। चार प्रमुख हितधारक।'
              : 'One Platform. Four Stakeholders.'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
            {currentLang === 'mr'
              ? 'प्रशिक्षण संस्था, उद्योग, उमेदवार आणि शासकीय विभागांची एकाच व्यासपीठावर जोडणी.'
              : currentLang === 'hi'
              ? 'प्रशिक्षण संस्थानों, उद्योगों, उम्मीदवारों और सरकारी विभागों को एक साथ जोड़ना।'
              : 'Synchronising training institutes, industrial employers, candidates, and government under a single continuously updated source of truth.'}
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAKEHOLDERS_DATA.map((item) => {
            const translated = tMap[item.role] || {
              title: item.title,
              tagline: item.tagline,
              description: item.description,
              features: item.features,
              ctaText: item.ctaText
            };

            return (
              <div
                key={item.role}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 w-fit mb-4 group-hover:scale-105 transition-transform">
                    {getStakeholderIcon(item.role)}
                  </div>

                  <h3 className="text-lg font-bold text-[#0C2340] flex items-center justify-between">
                    <span>{translated.title}</span>
                  </h3>
                  {item.marathiTitle && (
                    <div className="text-xs font-semibold text-slate-400 mt-0.5">
                      {item.marathiTitle}
                    </div>
                  )}

                  <p className="text-xs font-semibold text-blue-900 mt-2 leading-relaxed">
                    &ldquo;{translated.tagline}&rdquo;
                  </p>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                    {translated.description}
                  </p>

                  {/* Bullet Capabilities */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-slate-100">
                    <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      {currentLang === 'mr' ? 'प्रमुख क्षमता:' : currentLang === 'hi' ? 'प्रमुख क्षमताएं:' : 'Role Capabilities:'}
                    </div>
                    {translated.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    to={item.route}
                    className="w-full inline-flex items-center justify-center space-x-2 py-2 px-3 bg-[#0C2340] hover:bg-[#1E3A8A] text-white text-xs font-bold rounded-md shadow-2xs transition"
                  >
                    <span>{translated.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
