import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SupportedLang } from '../../data/siteTranslations';
import { LATEST_UPDATES } from '../../data/mockData';
import { Bell, Calendar, Tag, ArrowRight, CheckCircle } from 'lucide-react';

const UPDATES_TRANSLATIONS: Record<SupportedLang, { badge: string; title: string; subtitle: string; viewAll: string; filterAll: string }> = {
  en: {
    badge: 'Institutional Circulars & Telemetry',
    title: 'Latest Updates & Intelligence Bulletins',
    subtitle: 'Official circulars, telemetry releases, and pilot milestones from the Kaushal Setu project.',
    viewAll: 'View All Circulars',
    filterAll: 'All'
  },
  mr: {
    badge: 'शासकीय परिपत्रके व टेलिमेट्री',
    title: 'नवीनतम अपडेट्स आणि इंटेलिजन्स बुलेटिन',
    subtitle: 'कौशल सेतू प्रकल्पातील अधिकृत परिपत्रके, टेलिमेट्री अहवाल आणि टप्पे.',
    viewAll: 'सर्व परिपत्रके पहा',
    filterAll: 'सर्व'
  },
  hi: {
    badge: 'शासकीय परिपत्रक एवं टेलीमेट्री',
    title: 'नवीनतम अपडेट्स और इंटेलिजेंस बुलेटिन',
    subtitle: 'कौशल सेतु परियोजना से आधिकारिक परिपत्र, टेलीमेट्री रिपोर्ट और उपलब्धियां।',
    viewAll: 'सभी परिपत्र देखें',
    filterAll: 'सभी'
  }
};

export const LatestUpdates: React.FC = () => {
  const { language } = useAuth();
  const currentLang = (language as SupportedLang) || 'en';
  const t = UPDATES_TRANSLATIONS[currentLang] || UPDATES_TRANSLATIONS.en;

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showAllModal, setShowAllModal] = useState(false);

  const categories = ['All', 'Skill Demand', 'Curriculum', 'District Planning', 'Employer Survey', 'Pilot Initiative'];

  const filteredUpdates = selectedFilter === 'All'
    ? LATEST_UPDATES
    : LATEST_UPDATES.filter((u) => u.category === selectedFilter);

  return (
    <section id="latest-updates" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C2340] tracking-tight">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={() => setShowAllModal(true)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-800 hover:text-blue-950 bg-white border border-slate-300 px-3.5 py-2 rounded-md shadow-2xs self-start md:self-auto hover:bg-slate-50 transition"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-6 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-full font-semibold transition whitespace-nowrap ${
                selectedFilter === cat
                  ? 'bg-[#0C2340] text-white shadow-2xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat === 'All' ? t.filterAll : cat}
            </button>
          ))}
        </div>

        {/* News & Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUpdates.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-3">
                  <span className="inline-flex items-center space-x-1 text-slate-500 font-mono">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{item.date}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200 text-[10px]">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-800">
                <span>{currentLang === 'mr' ? 'वर्ग:' : currentLang === 'hi' ? 'वर्ग:' : 'Category:'} {item.category}</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Modal */}
      {showAllModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-blue-700" />
                <h3 className="font-bold text-base text-[#0C2340]">{t.title}</h3>
              </div>
              <button
                onClick={() => setShowAllModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3 divide-y divide-slate-100 text-xs">
              {LATEST_UPDATES.map((u) => (
                <div key={u.id} className="pt-3 first:pt-0">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                    <span>{u.date} &bull; {u.category}</span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">{u.tag}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs">{u.title}</div>
                  <div className="text-slate-600 mt-1">{u.summary}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowAllModal(false)}
                className="bg-[#0C2340] text-white px-4 py-2 rounded text-xs font-bold"
              >
                {currentLang === 'mr' ? 'बंद करा' : currentLang === 'hi' ? 'बंद करें' : 'Close Circulars'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

