import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GovernmentHeader } from '../components/layout/GovernmentHeader';
import { BrandHeader } from '../components/layout/BrandHeader';
import { GovernmentFooter } from '../components/layout/GovernmentFooter';
import { MAHARASHTRA_DISTRICTS } from '../data/mockData';
import {
  ShieldCheck,
  Building,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  FileText,
  DollarSign,
  PieChart,
  BarChart2,
  Award,
  Layers,
  Sparkles,
  Download,
  Check,
  Send,
  LogOut,
  Info,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  RefreshCw
} from 'lucide-react';

interface SanctionRequest {
  id: string;
  providerName: string;
  district: string;
  tradeProposed: string;
  unitsRequested: number;
  scheme: string;
  rationale: string;
  status: 'PENDING DIRECTORATE APPROVAL' | 'SANCTIONED' | 'REJECTED';
  date: string;
}

export const AdminGovernmentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Tab State: 'heatmap' | 'matrix' | 'sanctions' | 'dsdp' | 'budget'
  const [activeTab, setActiveTab] = useState<'heatmap' | 'matrix' | 'sanctions' | 'dsdp' | 'budget'>(() => {
    if (location.pathname.includes('/inference-matrix')) return 'matrix';
    if (location.pathname.includes('/course-sanctions')) return 'sanctions';
    if (location.pathname.includes('/dsdp-planning')) return 'dsdp';
    if (location.pathname.includes('/budget-roi')) return 'budget';
    return 'heatmap';
  });

  // Synchronize state with URL changes
  React.useEffect(() => {
    if (location.pathname.includes('/inference-matrix')) setActiveTab('matrix');
    else if (location.pathname.includes('/course-sanctions')) setActiveTab('sanctions');
    else if (location.pathname.includes('/dsdp-planning')) setActiveTab('dsdp');
    else if (location.pathname.includes('/budget-roi')) setActiveTab('budget');
    else setActiveTab('heatmap');
  }, [location.pathname]);

  const handleTabClick = (tab: 'heatmap' | 'matrix' | 'sanctions' | 'dsdp' | 'budget') => {
    setActiveTab(tab);
    switch (tab) {
      case 'matrix': navigate('/admin/inference-matrix'); break;
      case 'sanctions': navigate('/admin/course-sanctions'); break;
      case 'dsdp': navigate('/admin/dsdp-planning'); break;
      case 'budget': navigate('/admin/budget-roi'); break;
      case 'heatmap': default: navigate('/admin'); break;
    }
  };

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Matrix Filter State
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('pune');
  const [selectedSector, setSelectedSector] = useState<string>('All');

  // Sanction Requests Queue (PDF 652 ITI units & 511 PMGKVK Kendras)
  const [sanctionRequests, setSanctionRequests] = useState<SanctionRequest[]>([
    {
      id: 'SNC-2026-101',
      providerName: 'Govt. Industrial Training Institute, Pune (Aundh)',
      district: 'Pune',
      tradeProposed: 'Electric Vehicle (EV) Charging & Powertrain Technician',
      unitsRequested: 4,
      scheme: 'Pramod Mahajan Gramin Kaushalya Vikas Kendra (PMGKVK)',
      rationale: 'High local industry demand (6,420 open vacancies in Chakan cluster). ICE trade facing 40% decline.',
      status: 'PENDING DIRECTORATE APPROVAL',
      date: '2026-08-25'
    },
    {
      id: 'SNC-2026-088',
      providerName: 'AURIC Technical Training Center',
      district: 'Chhatrapati Sambhajinagar',
      tradeProposed: 'Industrial Robotics & Mechatronics Operator',
      unitsRequested: 2,
      scheme: 'Skills Strengthening for Industrial Value Enhancement (STRIVE)',
      rationale: 'AURIC DMIC industrial corridor expansion requires automated press line specialists.',
      status: 'PENDING DIRECTORATE APPROVAL',
      date: '2026-08-20'
    },
    {
      id: 'SNC-2026-042',
      providerName: 'Govt. ITI Satpur, Nashik',
      tradeProposed: 'Solar PV Installer & Suryamitra Micro-Grid Technician',
      unitsRequested: 2,
      scheme: 'Pradhan Mantri Kaushalya Vikas Yojana (PMKVY)',
      rationale: 'DSDP 2022-23 targets 360 candidates. High regional agricultural solar pump adoption.',
      status: 'SANCTIONED',
      date: '2026-08-10'
    }
  ]);

  // Selected district object
  const currentDistrict = MAHARASHTRA_DISTRICTS.find(d => d.id === selectedDistrictId) || MAHARASHTRA_DISTRICTS[0];

  const handleApproveSanction = (id: string) => {
    setSanctionRequests(prev =>
      prev.map(req => {
        if (req.id === id) {
          return { ...req, status: 'SANCTIONED' };
        }
        return req;
      })
    );
    showToast(`Sanction Request ${id} approved! 2 new trade units sanctioned and allocated in State Registry.`);
  };

  const handleRejectSanction = (id: string) => {
    setSanctionRequests(prev =>
      prev.map(req => {
        if (req.id === id) {
          return { ...req, status: 'REJECTED' };
        }
        return req;
      })
    );
    showToast(`Sanction Request ${id} rejected due to capacity oversupply in regional cluster.`);
  };

  // Inference Matrix Data calculation matching PDF Section 2.1 & 3 logic
  const getInferenceLogic = (aspiration: number, indSize: number, orgs: number, dsdp: number, mssds: number, isGreenJob: boolean) => {
    if (dsdp > 30) return { inference: 'Training can be provided', reason: 'DSDP details > 30 (batch size criteria met)' };
    if (dsdp < 30 && indSize > 120) return { inference: 'Training can be provided', reason: 'DSDP < 30 but Industry employee size > 120 (high potential growth)' };
    if (dsdp > 30 && mssds < 30) return { inference: 'Training can be provided', reason: 'DSDP > 30 future projection planned despite low historical MSSDS numbers' };
    if (isGreenJob) return { inference: 'Training can be provided', reason: 'Priority Green Jobs sector per state SDG policy' };
    if (aspiration === 0 && indSize === 0 && dsdp === 0) return { inference: 'Training can be provided at a later stage', reason: 'Insufficient survey data available' };
    return { inference: 'Training can be provided', reason: 'Candidate aspiration & local cluster presence' };
  };

  // District Inference Matrix List
  const districtMatrixData = [
    { sector: 'Electronics', aspiration: 669, indSize: 6782, orgs: 28, dsdp: 720, mssds: 1105, isGreen: false },
    { sector: 'Automotive', aspiration: 281, indSize: 9300, orgs: 30, dsdp: 870, mssds: 55, isGreen: false },
    { sector: 'Agriculture', aspiration: 843, indSize: 1095, orgs: 11, dsdp: 1080, mssds: 240, isGreen: false },
    { sector: 'BFSI', aspiration: 1298, indSize: 3025, orgs: 9, dsdp: 90, mssds: 450, isGreen: false },
    { sector: 'IT/ITeS', aspiration: 2455, indSize: 80, orgs: 7, dsdp: 210, mssds: 120, isGreen: false },
    { sector: 'Green Jobs (Solar/EV)', aspiration: 259, indSize: 180, orgs: 4, dsdp: 390, mssds: 150, isGreen: true },
    { sector: 'Food Processing', aspiration: 222, indSize: 197, orgs: 6, dsdp: 360, mssds: 445, isGreen: false },
    { sector: 'Capital Goods', aspiration: 72, indSize: 206, orgs: 5, dsdp: 180, mssds: 120, isGreen: false },
    { sector: 'Apparel', aspiration: 237, indSize: 140, orgs: 4, dsdp: 180, mssds: 145, isGreen: false },
    { sector: 'Gem & Jewellery', aspiration: 49, indSize: 500, orgs: 1, dsdp: 0, mssds: 0, isGreen: false }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9] font-sans">
      <GovernmentHeader />
      <BrandHeader />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Toast */}
        {toastMsg && (
          <div className="mb-6 p-4 bg-purple-900 text-white rounded-xl shadow-lg border border-purple-700 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{toastMsg}</span>
            </div>
            <button onClick={() => setToastMsg(null)} className="text-white text-xs hover:underline ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* Dashboard Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-purple-700 shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-100 text-purple-900">
                    State Skill Directorate &amp; Governance Portal
                  </span>
                  <span className="text-xs text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded font-semibold border border-blue-200 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-blue-700" />
                    Dept. of Skills, Employment, Entrepreneurship &amp; Innovation (SEEID)
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C2340] tracking-tight mt-1">
                  Maharashtra Skill Intelligence &amp; Governance Center
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Logged in as: <strong className="text-slate-800">{user?.userName || 'Dr. Sunita Deshmukh'}</strong> ({user?.orgName || 'Maharashtra State Skill Development Society / MSSDS'})
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => showToast('Generating comprehensive statewide District Skill Gap Report PDF...')}
                className="px-3.5 py-2 rounded-lg bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export MSNAS 2023 Report</span>
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Core State Skilling Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Monitored ITIs</span>
              <div className="text-base font-extrabold text-[#0C2340]">1,035 ITIs</div>
              <div className="text-[10px] text-slate-500 font-medium">419 Govt + 616 Private</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">PMGKVK Kendras</span>
              <div className="text-base font-extrabold text-blue-900">511 Kendras</div>
              <div className="text-[10px] text-blue-700 font-medium">652 Sanctioned Units</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">MSNAS Survey Data</span>
              <div className="text-base font-extrabold text-slate-900">200,000+ Trainees</div>
              <div className="text-[10px] text-emerald-700 font-medium">1,500+ Industries</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Short-Term Certifications</span>
              <div className="text-base font-extrabold text-emerald-800">8.13 Lakh Certified</div>
              <div className="text-[10px] text-slate-500 font-medium font-mono">10.31 Lakh Trained</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Target Economy 2028</span>
              <div className="text-base font-extrabold text-amber-700">$1 Trillion Goal</div>
              <div className="text-[10px] text-amber-800 font-medium">19% Annual Growth Target</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-300 bg-white rounded-t-xl px-4 pt-2 gap-2 overflow-x-auto shadow-2xs">
          <button
            onClick={() => handleTabClick('heatmap')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'heatmap'
                ? 'border-purple-600 text-purple-950 bg-purple-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-purple-600" />
            <span>1. 36-District Predictive Skill Intelligence</span>
          </button>

          <button
            onClick={() => handleTabClick('matrix')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'border-purple-600 text-purple-950 bg-purple-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>2. 5-Parameter PDF Inference Matrix</span>
          </button>

          <button
            onClick={() => handleTabClick('sanctions')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'sanctions'
                ? 'border-purple-600 text-purple-950 bg-purple-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-600" />
            <span>3. Course Sanctioning &amp; Sunsetting Engine ({sanctionRequests.filter(r => r.status === 'PENDING DIRECTORATE APPROVAL').length})</span>
          </button>

          <button
            onClick={() => handleTabClick('dsdp')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'dsdp'
                ? 'border-purple-600 text-purple-950 bg-purple-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>4. District Skill Development Plans (DSDP)</span>
          </button>

          <button
            onClick={() => handleTabClick('budget')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'budget'
                ? 'border-purple-600 text-purple-950 bg-purple-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-indigo-600" />
            <span>5. Skilling Scheme Budget &amp; ROI</span>
          </button>
        </div>

        {/* Tab 1: 36-District Predictive Skill Intelligence */}
        {activeTab === 'heatmap' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#0C2340]">
                  Statewide Skill Intelligence &amp; Sector Priority Ranking
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Correlating 1,564 industry responses with 200,000+ candidate aspirations across all 36 districts of Maharashtra (MSNAS 2023 Report).
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <label className="text-xs font-bold text-slate-700">Select District:</label>
                <select
                  value={selectedDistrictId}
                  onChange={e => setSelectedDistrictId(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-md px-3 py-1.5 text-xs font-bold text-slate-900"
                >
                  {MAHARASHTRA_DISTRICTS.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.marathiName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Top 10 vs Bottom 10 Sectors Comparison from PDF Executive Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top 10 Sectors */}
              <div className="p-5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-700" />
                    <span>Top 10 Sectors for Short-Term Skilling</span>
                  </span>
                  <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded font-mono font-bold">
                    High Demand
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-800">
                  <div className="p-2 bg-white rounded border border-emerald-100 font-bold text-emerald-950">1. Electronics (5.97%)</div>
                  <div className="p-2 bg-white rounded border border-emerald-100 font-bold text-emerald-950">2. Automotive (10.12%)</div>
                  <div className="p-2 bg-white rounded border border-emerald-100 font-bold text-emerald-950">3. Agriculture (8.71%)</div>
                  <div className="p-2 bg-white rounded border border-emerald-100 font-bold text-emerald-950">4. BFSI (4.29%)</div>
                  <div className="p-2 bg-white rounded border border-emerald-100 font-bold text-emerald-950">5. IT / ITeS (4.20%)</div>
                  <div className="p-2 bg-white rounded border border-emerald-100 font-bold text-emerald-950">6. Tourism &amp; Hospitality (2.87%)</div>
                  <div className="p-2 bg-white rounded border border-emerald-100 font-bold text-emerald-950">7. Capital Goods (10.56%)</div>
                  <div className="p-2 bg-white rounded border border-emerald-100 font-bold text-emerald-950">8. Logistics (2.21%)</div>
                  <div className="p-2 bg-white rounded border border-emerald-100 font-bold text-emerald-950">9. Apparel (2.34%)</div>
                  <div className="p-2 bg-white rounded border border-emerald-100 font-bold text-emerald-950">10. Food Processing (9.50%)</div>
                </div>
              </div>

              {/* Bottom 10 Sectors */}
              <div className="p-5 bg-slate-100/80 rounded-xl border border-slate-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Bottom 10 Sectors (Lower Short-Term Intake)</span>
                  </span>
                  <span className="text-[10px] bg-slate-600 text-white px-2 py-0.5 rounded font-mono font-bold">
                    Specialized / Re-align
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                  <div className="p-2 bg-white rounded border border-slate-200">1. Gem &amp; Jewellery (0.93%)</div>
                  <div className="p-2 bg-white rounded border border-slate-200">2. Rubber (1.24%)</div>
                  <div className="p-2 bg-white rounded border border-slate-200">3. Aerospace &amp; Aviation (0.22%)</div>
                  <div className="p-2 bg-white rounded border border-slate-200">4. Persons with Disability (PwD)</div>
                  <div className="p-2 bg-white rounded border border-slate-200">5. Leather (0.35%)</div>
                  <div className="p-2 bg-white rounded border border-slate-200">6. Sports (0.31%)</div>
                  <div className="p-2 bg-white rounded border border-slate-200">7. Infrastructure (0.84%)</div>
                  <div className="p-2 bg-white rounded border border-slate-200">8. Mining (0.27%)</div>
                  <div className="p-2 bg-white rounded border border-slate-200">9. Metal Products</div>
                  <div className="p-2 bg-white rounded border border-slate-200">10. Instrumentation</div>
                </div>
              </div>
            </div>

            {/* Selected District In-Depth Overview */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-extrabold text-[#0C2340]">
                    {currentDistrict.name} ({currentDistrict.marathiName}) &mdash; District Skilling Audit
                  </h3>
                </div>
                <span className="text-xs bg-blue-100 text-blue-900 font-bold px-3 py-1 rounded">
                  Region: {currentDistrict.region}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-500 uppercase">Training Ecosystem</span>
                  <p className="text-slate-800 mt-1 font-medium">{currentDistrict.trainingEcosystem.join(', ')}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase">High Growth Sectors</span>
                  <p className="text-blue-900 font-bold mt-1">{currentDistrict.highGrowthSectors.join(', ')}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase">Top In-Demand Skills</span>
                  <p className="text-emerald-800 font-bold mt-1">{currentDistrict.topSkills.join(', ')}</p>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-slate-800 space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Potential Skill Deficit &amp; Action Plan:</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{currentDistrict.potentialSkillGap}</p>
                <div className="text-blue-900 font-semibold pt-1">&rarr; {currentDistrict.recommendedFocus}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 5-Parameter PDF Inference Matrix Engine */}
        {activeTab === 'matrix' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-slate-100">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                PDF Methodological Reference: Section 1.6 &amp; 2.1
              </span>
              <h2 className="text-xl font-extrabold text-[#0C2340] mt-2">
                5-Parameter District Skill Gap Inference Matrix
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Evaluates skilling feasibility using the state threshold rules (Green Scale vs Grey Scale).
              </p>
            </div>

            {/* Threshold Criterion Explanation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-900 uppercase">1. Candidate Aspiration</div>
                <div className="text-sm font-extrabold text-emerald-950 mt-1">&ge; 100 Candidates</div>
                <div className="text-[10px] text-slate-600 mt-0.5">Green: &ge;100 &bull; Grey: &lt;100</div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-900 uppercase">2. Industry Size</div>
                <div className="text-sm font-extrabold text-emerald-950 mt-1">&ge; 120 Employees</div>
                <div className="text-[10px] text-slate-600 mt-0.5">Green: &ge;120 &bull; Grey: &lt;120</div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-900 uppercase">3. Num. Organizations</div>
                <div className="text-sm font-extrabold text-emerald-950 mt-1">&ge; 10 Industry Units</div>
                <div className="text-[10px] text-slate-600 mt-0.5">Green: &ge;10 &bull; Grey: &lt;10</div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-900 uppercase">4. DSDP Details</div>
                <div className="text-sm font-extrabold text-emerald-950 mt-1">&gt; 30 Batch Target</div>
                <div className="text-[10px] text-slate-600 mt-0.5">Green: &gt;30 &bull; Grey: &lt;30</div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-900 uppercase">5. MSSDS Skilling</div>
                <div className="text-sm font-extrabold text-emerald-950 mt-1">&gt; 30 Trained 2022-23</div>
                <div className="text-[10px] text-slate-600 mt-0.5">Green: &gt;30 &bull; Grey: &lt;30</div>
              </div>
            </div>

            {/* Inference Matrix Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0C2340] text-white uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Sector</th>
                    <th className="py-3 px-3 text-center">Candidate Aspiration</th>
                    <th className="py-3 px-3 text-center">Industry Size</th>
                    <th className="py-3 px-3 text-center">Num Orgs</th>
                    <th className="py-3 px-3 text-center">DSDP Plan</th>
                    <th className="py-3 px-3 text-center">MSSDS Trained</th>
                    <th className="py-3 px-4">State Inference Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white font-medium">
                  {districtMatrixData.map((item, idx) => {
                    const logic = getInferenceLogic(
                      item.aspiration,
                      item.indSize,
                      item.orgs,
                      item.dsdp,
                      item.mssds,
                      item.isGreen
                    );

                    return (
                      <tr key={idx} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                          {item.isGreen && <Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
                          <span>{item.sector}</span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              item.aspiration >= 100 ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {item.aspiration}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              item.indSize >= 120 ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {item.indSize}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              item.orgs >= 10 ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {item.orgs}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              item.dsdp > 30 ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {item.dsdp}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              item.mssds > 30 ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {item.mssds || 'N/A'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-extrabold text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{logic.inference}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-normal leading-tight">
                            {logic.reason}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Course Sanctioning & Sunsetting Engine */}
        {activeTab === 'sanctions' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#0C2340]">
                  Evidence-Based Course Sanctioning &amp; Sunsetting Workflow
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Evaluation workflow for approving 652 new ITI units &amp; 511 PMGKVK Kendras in emerging priority trades (Additive manufacturing, Industrial robotics, IoT technician, EVs, Drone technology).
                </p>
              </div>

              <div className="text-xs bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 text-emerald-900 font-bold">
                652 ITI Units Sanctioned Statewide
              </div>
            </div>

            <div className="space-y-4">
              {sanctionRequests.map((req) => (
                <div key={req.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-blue-900 text-white font-mono text-[10px] font-bold">
                        {req.id}
                      </span>
                      <span className="font-extrabold text-sm text-slate-900">{req.providerName}</span>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded ${
                        req.status === 'SANCTIONED'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : req.status === 'REJECTED'
                          ? 'bg-red-100 text-red-900 border border-red-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Proposed Trade</span>
                      <div className="font-extrabold text-blue-950 mt-0.5">{req.tradeProposed}</div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Units &amp; Scheme</span>
                      <div className="font-bold text-slate-800 mt-0.5">
                        {req.unitsRequested} Units &bull; {req.scheme}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">District Cluster</span>
                      <div className="font-bold text-slate-800 mt-0.5">{req.district}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                    <strong>Evidence Rationale:</strong> {req.rationale}
                  </div>

                  {req.status === 'PENDING DIRECTORATE APPROVAL' && (
                    <div className="flex items-center justify-end space-x-2 pt-2">
                      <button
                        onClick={() => handleRejectSanction(req.id)}
                        className="px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded border border-red-200 transition"
                      >
                        Reject Request
                      </button>
                      <button
                        onClick={() => handleApproveSanction(req.id)}
                        className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold rounded shadow-2xs transition flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Sanction Trade Units</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: District Skill Development Plans (DSDP) */}
        {activeTab === 'dsdp' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#0C2340]">
                  District Skill Development Plan (DSDP) Annual Approval Hub
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Centralized repository for reviewing District Collectors&apos; annual DSDP submissions across all 36 districts of Maharashtra.
                </p>
              </div>

              <button
                onClick={() => showToast(`Generated printable DSDP 2026 plan for ${currentDistrict.name} district.`)}
                className="px-4 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export DSDP Plan ({currentDistrict.name})</span>
              </button>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-extrabold text-sm text-[#0C2340]">
                  DSDP Document Snapshot: {currentDistrict.name} District (2026-2027)
                </span>
                <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded text-[10px]">
                  APPROVED BY STATE BOARD
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="font-bold text-slate-500 uppercase">Target Trainees</span>
                  <div className="text-base font-extrabold text-slate-900 mt-0.5">3,250 Candidates</div>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase">Priority Sectors</span>
                  <div className="text-xs font-bold text-blue-900 mt-0.5">{currentDistrict.highGrowthSectors.join(', ')}</div>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase">Planned Lab Outlay</span>
                  <div className="text-base font-extrabold text-emerald-700 mt-0.5">₹4.8 Crore</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800">State Committee Recommendation:</span>
                <p className="text-slate-600 leading-relaxed">
                  Allocate capital expenditure toward modernizing local Government ITI workshops to support Industry 4.0 automation, EV diagnostics, and solar installer trades.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Skilling Scheme Budget & ROI */}
        {activeTab === 'budget' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-[#0C2340]">
                State Skilling Budget &amp; Scheme ROI Optimizer
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Real-time tracking of public capital outlay across state and central schemes (PMKVY, PMKUVA, STRIVE, SANKALP, MAPS, DST, DPC).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-500 uppercase">PMKUVA (Pramod Mahajan Abhiyan)</span>
                <div className="text-2xl font-extrabold text-[#0C2340]">₹142.5 Cr</div>
                <div className="text-[11px] text-emerald-700 font-semibold">Placement Velocity: 78.4%</div>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-500 uppercase">STRIVE (World Bank Fund)</span>
                <div className="text-2xl font-extrabold text-blue-900">₹86.0 Cr</div>
                <div className="text-[11px] text-blue-700 font-semibold">Lab Modernization: 92 ITIs</div>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-500 uppercase">MAPS (Apprenticeship Promotion)</span>
                <div className="text-2xl font-extrabold text-emerald-800">₹45.2 Cr</div>
                <div className="text-[11px] text-emerald-700 font-semibold">Stipend Subsidy Disbursed</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <GovernmentFooter />
    </div>
  );
};
