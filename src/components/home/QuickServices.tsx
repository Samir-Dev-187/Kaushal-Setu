import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { QUICK_SERVICES } from '../../data/mockData';
import {
  Building2,
  Compass,
  TrendingUp,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

export const QuickServices: React.FC = () => {
  const { language } = useAuth();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2':
        return <Building2 className="w-5 h-5 text-blue-700" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-emerald-700" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-amber-700" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-purple-700" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-indigo-700" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-5 h-5 text-blue-900" />;
    }
  };

  return (
    <section id="quick-services-section" className="py-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
              {language === 'mr'
                ? 'नागरिक आणि भागधारक सेवा केंद्र'
                : language === 'hi'
                ? 'नागरिक और हितधारक सेवा केंद्र'
                : 'Citizen & Stakeholder Gateways'}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C2340] tracking-tight">
              {language === 'mr'
                ? 'जलद सेवा आणि प्रवेश'
                : language === 'hi'
                ? 'त्वरित सेवाएं और पहुंच'
                : 'Quick Services & Access'}
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {language === 'mr'
              ? 'शिक्षण, उद्योग आणि प्रशासनासाठी केंद्रित सार्वजनिक दालन'
              : language === 'hi'
              ? 'शिक्षा, उद्योग और प्रशासन के लिए केंद्रित सार्वजनिक पोर्टल'
              : 'Role-oriented public portals for education, industry and governance'}
          </div>
        </div>

        {/* 6 Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_SERVICES.map((service) => {
            const isInternalRoute = service.path.startsWith('/');
            const title =
              language === 'mr'
                ? service.marathiTitle || service.title
                : language === 'hi'
                ? service.hindiTitle || service.title
                : service.title;
            const desc =
              language === 'mr'
                ? service.marathiDescription || service.description
                : language === 'hi'
                ? service.hindiDescription || service.description
                : service.description;

            const CardContent = (
              <div className="h-full bg-slate-50/70 hover:bg-blue-50/40 p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform">
                      {getIcon(service.iconName)}
                    </div>
                    {service.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors flex items-center justify-between">
                    <span>{title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 transition-colors opacity-0 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                    {desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/60 flex items-center text-[11px] font-bold text-blue-800 group-hover:text-blue-950">
                  <span>Access Service Portal</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </div>
              </div>
            );

            return isInternalRoute ? (
              <Link key={service.id} to={service.path} className="block">
                {CardContent}
              </Link>
            ) : (
              <a key={service.id} href={service.path} className="block">
                {CardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
