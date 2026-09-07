import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GovernmentHeader } from '../components/layout/GovernmentHeader';
import { BrandHeader } from '../components/layout/BrandHeader';
import { GovernmentFooter } from '../components/layout/GovernmentFooter';
import { MAHARASHTRA_DISTRICTS } from '../data/mockData';
import {
  Briefcase,
  Building,
  FileText,
  CheckCircle2,
  Send,
  Plus,
  Sparkles,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  LogOut,
  Layers,
  Filter,
  MapPin,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  ThumbsUp,
  MessageSquare,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Vote
} from 'lucide-react';
import { EmployerConversationalSurveyModal } from '../components/employer/EmployerConversationalSurveyModal';
import { INITIAL_EMPLOYER_SUGGESTIONS } from '../data/questionnairesData';
import { EmployerSuggestionItem } from '../types/questionnaire';

interface EmployerSurveyState {
  spocEmail: string;
  spocName: string;
  spocPhone: string;
  orgName: string;
  orgType: string;
  district: string;
  sector: string;
  companySize: string;
  qualificationNeeded: string;
  languageNeeded: string[];
  employPwD: string;
  genderMajority: string;
  requiredRoles: string;
  skillGapsObserved: string;
}

export const EmployerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Tab State: 'survey' | 'demand' | 'curriculum' | 'apprenticeships'
  const [activeTab, setActiveTab] = useState<'survey' | 'demand' | 'curriculum' | 'apprenticeships'>(() => {
    if (location.pathname.includes('/survey')) return 'survey';
    if (location.pathname.includes('/signals')) return 'demand';
    if (location.pathname.includes('/feedback')) return 'curriculum';
    if (location.pathname.includes('/apprenticeships')) return 'apprenticeships';
    return 'survey';
  });

  // Synchronize activeTab with URL location
  React.useEffect(() => {
    if (location.pathname.includes('/survey')) setActiveTab('survey');
    else if (location.pathname.includes('/signals')) setActiveTab('demand');
    else if (location.pathname.includes('/feedback')) setActiveTab('curriculum');
    else if (location.pathname.includes('/apprenticeships')) setActiveTab('apprenticeships');
    else setActiveTab('survey');
  }, [location.pathname]);

  const handleTabClick = (tab: 'survey' | 'demand' | 'curriculum' | 'apprenticeships') => {
    setActiveTab(tab);
    switch (tab) {
      case 'demand': navigate('/employers/signals'); break;
      case 'curriculum': navigate('/employers/feedback'); break;
      case 'apprenticeships': navigate('/employers/apprenticeships'); break;
      case 'survey': default: navigate('/employers'); break;
    }
  };

  // Toast / Submission Notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Conversational Check-In (Part B) Modal State
  const [isEmployerSurveyOpen, setIsEmployerSurveyOpen] = useState(false);

  // Suggestions & Live Upvoting State for Curriculum Tab (Q22/Q23 telemetry)
  const [suggestions, setSuggestions] = useState<EmployerSuggestionItem[]>(() => {
    try {
      const stored = localStorage.getItem('kaushal_employer_suggestions');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_EMPLOYER_SUGGESTIONS;
  });

  const [votedIds, setVotedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('kaushal_employer_voted_ids');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  const [curriculumFilterSector, setCurriculumFilterSector] = useState<string>('All');
  const [newSyllabusProposal, setNewSyllabusProposal] = useState('');
  const [selectedProposalSector, setSelectedProposalSector] = useState('Automotive & EV Manufacturing');

  // Trigger on first login / account creation
  React.useEffect(() => {
    const isNew = localStorage.getItem('kaushal_employer_new_account') === 'true';
    const surveyDone = localStorage.getItem('kaushal_employer_survey_completed') === 'true';
    if (isNew || !surveyDone) {
      setIsEmployerSurveyOpen(true);
    }
  }, []);

  const handleToggleUpvote = (id: string) => {
    setSuggestions(prev => {
      const isVoted = votedIds.includes(id);
      const updated = prev.map(s => {
        if (s.id === id) {
          return {
            ...s,
            upvotes: isVoted ? s.upvotes - 1 : s.upvotes + 1
          };
        }
        return s;
      });
      try {
        localStorage.setItem('kaushal_employer_suggestions', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setVotedIds(prev => {
      const isVoted = prev.includes(id);
      const updated = isVoted ? prev.filter(v => v !== id) : [...prev, id];
      try {
        localStorage.setItem('kaushal_employer_voted_ids', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleAddSyllabusProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSyllabusProposal.trim()) return;
    const newSug: EmployerSuggestionItem = {
      id: `sug-${Date.now()}`,
      sector: selectedProposalSector,
      text: newSyllabusProposal.trim(),
      upvotes: 1,
      submittedBy: `${user?.orgName || survey.orgName} (${user?.userName || survey.spocName})`,
      timestamp: 'Just now'
    };
    const updated = [newSug, ...suggestions];
    setSuggestions(updated);
    setVotedIds(prev => [...prev, newSug.id]);
    try {
      localStorage.setItem('kaushal_employer_suggestions', JSON.stringify(updated));
    } catch {}
    setNewSyllabusProposal('');
    showToast('Your curriculum change proposal was submitted to the state review board and opened for peer employer voting!');
  };

  const handleEmployerSurveyComplete = (answers: Record<string, any>) => {
    localStorage.setItem('kaushal_employer_survey_completed', 'true');
    localStorage.removeItem('kaushal_employer_new_account');
    setIsEmployerSurveyOpen(false);
    showToast('Part B Check-In & Syllabus Votes recorded! Response ingested into Maharashtra Skill Gap & Curriculum Advisory Engine.');
    // Reload suggestions from localStorage if updated during survey
    try {
      const stored = localStorage.getItem('kaushal_employer_suggestions');
      if (stored) setSuggestions(JSON.parse(stored));
    } catch {}
  };

  // Form State for PDF Annexure 2 Questionnaire
  const [survey, setSurvey] = useState<EmployerSurveyState>({
    spocEmail: user?.email || 'hr@autotech-dynamics.in',
    spocName: user?.userName || 'Vikram Mehta',
    spocPhone: user?.mobile || '+91 98230 44890',
    orgName: user?.orgName || 'AutoTech Dynamics & EV Systems Ltd',
    orgType: 'Private Enterprise',
    district: 'Pune',
    sector: 'Automotive',
    companySize: '120-500 Employees (Medium Enterprise)',
    qualificationNeeded: 'Higher Secondary Certificate (HSC) & Diploma',
    languageNeeded: ['Marathi', 'Hindi', 'English'],
    employPwD: 'Yes',
    genderMajority: 'Male Majority (70%+)',
    requiredRoles: 'EV Battery Technician, CNC Machining Operator, Automotive Quality Inspector',
    skillGapsObserved: 'Trainees have basic mechanical knowledge but lack high-voltage battery safety protocol and CAN-bus diagnostic capabilities.'
  });

  // Mock Postings State
  const [jobPostings, setJobPostings] = useState([
    {
      id: 'JOB-2026-081',
      title: 'EV Powertrain Assembly Technician',
      sector: 'Automotive & EVs',
      district: 'Pune (Chakan Industrial Zone)',
      vacancies: 45,
      nsqfLevel: 'NSQF Level 5',
      proficiency: 'Advanced',
      status: 'ACTIVE TELEMETRY',
      postedDate: '2026-08-28'
    },
    {
      id: 'JOB-2026-044',
      title: 'CNC Precision Turning & Milling Operator',
      sector: 'Capital Goods & Machinery',
      district: 'Chhatrapati Sambhajinagar (AURIC)',
      vacancies: 30,
      nsqfLevel: 'NSQF Level 4',
      proficiency: 'Intermediate',
      status: 'ACTIVE TELEMETRY',
      postedDate: '2026-08-15'
    },
    {
      id: 'JOB-2026-012',
      title: 'Solar Micro-Grid Maintenance Specialist',
      sector: 'Renewable Energy & Green Jobs',
      district: 'Nashik',
      vacancies: 20,
      nsqfLevel: 'NSQF Level 4',
      proficiency: 'Intermediate',
      status: 'FILL RATE 85%',
      postedDate: '2026-08-02'
    }
  ]);

  // New Job Modal State
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobSector, setNewJobSector] = useState('Automotive');
  const [newJobDistrict, setNewJobDistrict] = useState('Pune');
  const [newJobVacancies, setNewJobVacancies] = useState('25');
  const [newJobNsqf, setNewJobNsqf] = useState('NSQF Level 5');

  // Curriculum Feedback State
  const [curriculumProposals, setCurriculumProposals] = useState([
    {
      id: 'CURR-EV-01',
      trade: 'Mechanic Motor Vehicle (MMV)',
      proposal: 'Add 120-hour Modular Unit: EV Battery Pack Assembly & High-Voltage Isolation',
      provider: 'Govt. ITI Aundh (Pune)',
      status: 'EMPLOYER VALIDATED',
      validationsCount: 18,
      obsoleteTopicsFlagged: 'Carburetor Tuning & Conventional Mechanical Fuel Pumps'
    },
    {
      id: 'CURR-CNC-04',
      trade: 'Turner & Machinist Trade',
      proposal: 'Upgrade Lab Equipment: Multi-Axis CNC Machine Simulation Rigs',
      provider: 'Govt. ITI Satpur (Nashik)',
      status: 'UNDER REVIEW',
      validationsCount: 12,
      obsoleteTopicsFlagged: 'Manual Engine Lathe Gear Calculation'
    },
    {
      id: 'CURR-SOL-09',
      trade: 'Electrician & Wireman Trade',
      proposal: 'Add Solar Inverter & Micro-Grid Telemetry Module',
      provider: 'Govt. ITI Nagpur',
      status: 'EMPLOYER VALIDATED',
      validationsCount: 24,
      obsoleteTopicsFlagged: 'Legacy Analog Meter Calibration'
    }
  ]);

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Survey submitted successfully! Response ingested into Maharashtra Skill Gap Analysis Engine.');
  };

  const handleCreateJobPosting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim()) return;

    const newJob = {
      id: `JOB-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newJobTitle,
      sector: newJobSector,
      district: `${newJobDistrict} Industrial Cluster`,
      vacancies: parseInt(newJobVacancies) || 10,
      nsqfLevel: newJobNsqf,
      proficiency: 'Industry Ready',
      status: 'ACTIVE TELEMETRY',
      postedDate: new Date().toISOString().split('T')[0]
    };

    setJobPostings([newJob, ...jobPostings]);
    setShowNewJobModal(false);
    setNewJobTitle('');
    showToast(`Job demand posting "${newJobTitle}" created and broadcasted to local ITIs and Polytechnics.`);
  };

  const handleValidateCurriculum = (id: string) => {
    setCurriculumProposals(prev =>
      prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            status: 'EMPLOYER VALIDATED',
            validationsCount: p.validationsCount + 1
          };
        }
        return p;
      })
    );
    showToast('Validated competency unit! Endorsement recorded for State Skill Development Directorate.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9] font-sans">
      <GovernmentHeader />
      <BrandHeader />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Toast Notification */}
        {toastMsg && (
          <div className="mb-6 p-4 bg-emerald-700 text-white rounded-xl shadow-lg border border-emerald-600 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
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
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-700 shrink-0">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-100 text-amber-900">
                    Employer &amp; Industry Partner Portal
                  </span>
                  <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded font-semibold border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified MIDC Hiring Partner
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C2340] tracking-tight mt-1">
                  {user?.orgName || 'AutoTech Dynamics & EV Systems Ltd'}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  SpOC: <strong className="text-slate-800">{user?.userName || 'Vikram Mehta'}</strong> ({user?.userId || 'employer_123'}) &bull; Maharashtra Skill Need Assessment Survey (MSNAS 2023) Partner
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setIsEmployerSurveyOpen(true)}
                className="px-4 py-2.5 rounded-lg bg-[#0C2340] hover:bg-blue-900 text-amber-300 text-xs font-bold shadow-xs transition flex items-center gap-1.5 border border-amber-500/40"
              >
                <Vote className="w-4 h-4 text-amber-400" />
                <span>Conversational Check-In &amp; Voting (Part B)</span>
              </button>
              <button
                onClick={() => setShowNewJobModal(true)}
                className="px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Post Skill Demand</span>
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

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Quarterly Demand Status</span>
              <div className="text-lg font-extrabold text-blue-900 mt-0.5">Submitted</div>
              <div className="text-[10px] text-emerald-700 font-medium">MSNAS 2023 Ingested</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Active Vacancies Broadcast</span>
              <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                {jobPostings.reduce((sum, j) => sum + j.vacancies, 0)} Positions
              </div>
              <div className="text-[10px] text-blue-700 font-medium">{jobPostings.length} Active Telemetry Signals</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Curriculum Validations</span>
              <div className="text-lg font-extrabold text-amber-900 mt-0.5">
                {curriculumProposals.filter(p => p.status === 'EMPLOYER VALIDATED').length} Endorsed
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Direct ITI Board Inputs</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Apprenticeship Cohorts</span>
              <div className="text-lg font-extrabold text-emerald-800 mt-0.5">4 Mapped</div>
              <div className="text-[10px] text-emerald-700 font-medium">MAPS &amp; NAPS Matched</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-300 bg-white rounded-t-xl px-4 pt-2 gap-2 overflow-x-auto shadow-2xs">
          <button
            onClick={() => handleTabClick('survey')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'survey'
                ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>1. Industry Skill Requirement Survey (MSNAS Annexure 2)</span>
          </button>

          <button
            onClick={() => handleTabClick('demand')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'demand'
                ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>2. Live Skill Demand Postings ({jobPostings.length})</span>
          </button>

          <button
            onClick={() => handleTabClick('curriculum')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'curriculum'
                ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>3. Curriculum Co-Design &amp; Validation</span>
          </button>

          <button
            onClick={() => handleTabClick('apprenticeships')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'apprenticeships'
                ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-purple-600" />
            <span>4. Regional Apprenticeship Pipeline</span>
          </button>
        </div>

        {/* Tab 1: Industry Skill Requirement Survey (Annexure 2 of PDF) */}
        {activeTab === 'survey' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  State Government Questionnaire Reference: Annexure 2
                </span>
                <h2 className="text-xl font-extrabold text-[#0C2340] mt-2">
                  Maharashtra Industry Skill Requirement Questionnaire
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Submitted by enterprise hiring managers to directly inform District Skill Development Plans (DSDP) and course design across Maharashtra.
                </p>
              </div>
              <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-600 font-mono">
                MSSDS Survey ID: <strong className="text-slate-900">MSNAS-2023-IND-884</strong>
              </div>
            </div>

            {/* Fast-Track Conversational Check-In Callout */}
            <div className="p-4 bg-gradient-to-r from-[#0C2340] to-blue-900 rounded-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md border border-amber-500/30">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-amber-400/20 text-amber-300 rounded-xl shrink-0">
                  <Vote className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      Adaptive Check-In (Part B)
                    </span>
                    <span className="text-xs text-emerald-300 font-semibold">&bull; 12–14 Adaptive Questions</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">Prefer a friendly check-in with live syllabus voting?</h4>
                  <p className="text-xs text-slate-200 mt-0.5 leading-relaxed max-w-2xl">
                    Skip static government form tables. Complete our adaptive conversational check-in to forecast skill demands and vote on ITI curriculum modernization proposals.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEmployerSurveyOpen(true)}
                className="shrink-0 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg shadow-sm transition flex items-center space-x-1.5"
              >
                <span>Launch Check-In &amp; Voting</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSurveySubmit} className="space-y-6">
              {/* Section 1: SpOC & Enterprise Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 text-blue-900">
                  <Building className="w-4 h-4 text-blue-700" />
                  <span>Section A: SpOC &amp; Organization Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={survey.spocEmail}
                      onChange={e => setSurvey({ ...survey, spocEmail: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Name of Official (SpOC) *</label>
                    <input
                      type="text"
                      required
                      value={survey.spocName}
                      onChange={e => setSurvey({ ...survey, spocName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={survey.spocPhone}
                      onChange={e => setSurvey({ ...survey, spocPhone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Organization Name *</label>
                    <input
                      type="text"
                      required
                      value={survey.orgName}
                      onChange={e => setSurvey({ ...survey, orgName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Type of Organization</label>
                    <select
                      value={survey.orgType}
                      onChange={e => setSurvey({ ...survey, orgType: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    >
                      <option value="Private Enterprise">Private Limited Enterprise</option>
                      <option value="Public Limited / Listed">Public Limited / Listed Firm</option>
                      <option value="MSME">Micro, Small &amp; Medium Enterprise (MSME)</option>
                      <option value="Government Undertaking">PSU / Government Enterprise</option>
                      <option value="Industry Association">Industry Association / CII / FICCI Cluster</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Primary District Location *</label>
                    <select
                      value={survey.district}
                      onChange={e => setSurvey({ ...survey, district: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    >
                      {MAHARASHTRA_DISTRICTS.map(d => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.marathiName})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Sector & Workforce Demographics */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 text-amber-900">
                  <Filter className="w-4 h-4 text-amber-700" />
                  <span>Section B: Sector, Size &amp; Demographics</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Industry Sector (40 Options) *</label>
                    <select
                      value={survey.sector}
                      onChange={e => setSurvey({ ...survey, sector: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    >
                      <option value="Automotive">Automotive &amp; EVs (Top Sector)</option>
                      <option value="Electronics">Electronics &amp; Hardware (Top Sector)</option>
                      <option value="Capital Goods">Capital Goods &amp; Machinery</option>
                      <option value="Food Processing">Food Processing &amp; Agri-Tech</option>
                      <option value="BFSI">BFSI - Banking &amp; Insurance</option>
                      <option value="IT/ITeS">IT / Information Technology Services</option>
                      <option value="Logistics">Logistics, Supply Chain &amp; Warehousing</option>
                      <option value="Textile">Textiles &amp; Garmenting</option>
                      <option value="Healthcare">Healthcare &amp; Medical Devices</option>
                      <option value="Renewable Energy">Solar &amp; Green Energy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Organization Size (Employees)</label>
                    <select
                      value={survey.companySize}
                      onChange={e => setSurvey({ ...survey, companySize: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    >
                      <option value="Micro Enterprise (<50 Employees)">Micro Enterprise (&lt;50 Employees)</option>
                      <option value="51-120 Employees">Small Enterprise (51-120 Employees)</option>
                      <option value="120-500 Employees (Medium Enterprise)">Medium Enterprise (120-500 Employees)</option>
                      <option value="Large Enterprise (500+ Employees)">Large Enterprise (500+ Employees)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Educational Qualification Required</label>
                    <select
                      value={survey.qualificationNeeded}
                      onChange={e => setSurvey({ ...survey, qualificationNeeded: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    >
                      <option value="Higher Secondary Certificate (HSC) & Diploma">HSC (66%) &amp; Graduation (61.6%)</option>
                      <option value="Diploma & ITI Trade Certification">Diploma (59.5%) &amp; ITI Trade (58.8%)</option>
                      <option value="Graduate Engineers (B.Tech / B.E)">Graduate Engineers &amp; Technologists</option>
                      <option value="Pre-SSC & Basic Vocational">Pre-SSC &amp; Short-Term Skilled Certificate</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Employ Persons with Disability (PwD)?</label>
                    <select
                      value={survey.employPwD}
                      onChange={e => setSurvey({ ...survey, employPwD: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    >
                      <option value="Yes">Yes, Currently Employed</option>
                      <option value="No">No, Planning PwD Hiring Cell</option>
                      <option value="Can't say">Under Evaluation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Workforce Gender Profile</label>
                    <select
                      value={survey.genderMajority}
                      onChange={e => setSurvey({ ...survey, genderMajority: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    >
                      <option value="Male Majority (70%+) font-bold">Male Majority (70%+)</option>
                      <option value="Balanced Gender Ratio (50/50)">Balanced Gender Ratio (50/50)</option>
                      <option value="Female Majority">Female Majority</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Language Proficiency Required</label>
                    <div className="flex items-center space-x-3 pt-2 text-slate-800 font-semibold">
                      <label className="flex items-center space-x-1">
                        <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                        <span>Marathi (95.6%)</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                        <span>Hindi (83.7%)</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                        <span>English (68.5%)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Specific Roles & Skill Gap Feedback */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 text-emerald-900">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <span>Section C: Specific Job Roles &amp; Competency Gaps</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Required Job Roles in Your Organization (Select / Describe Multiple) *
                    </label>
                    <input
                      type="text"
                      required
                      value={survey.requiredRoles}
                      onChange={e => setSurvey({ ...survey, requiredRoles: e.target.value })}
                      placeholder="e.g. EV Battery Technician, CNC Milling Operator, Quality Inspector"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Observed Skill Deficits &amp; Recommended Course Modifications *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={survey.skillGapsObserved}
                      onChange={e => setSurvey({ ...survey, skillGapsObserved: e.target.value })}
                      placeholder="Describe what practical tools, software, or safety protocols trainees are missing upon graduation..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 font-mono">
                  Transmitted over secure SSL to SEEID &amp; MSSDS State Analytics Center
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0C2340] hover:bg-[#1E3A8A] text-white font-extrabold rounded-lg text-xs shadow-md transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Submit Industry Skill Requirement Survey</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Live Skill Demand Postings */}
        {activeTab === 'demand' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-[#0C2340]">
                  Active Skill Demand Signals &amp; Vacancies
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  High-frequency demand postings parsed by Kaushal Setu AI to compute district-level skill deficit heatmaps.
                </p>
              </div>
              <button
                onClick={() => setShowNewJobModal(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Skill Demand</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {jobPostings.map((job) => (
                <div
                  key={job.id}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                        {job.id}
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                        {job.status}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Posted: {job.postedDate}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900">{job.title}</h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-amber-600" />
                        {job.sector}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-600" />
                        {job.district}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-purple-600" />
                        {job.nsqfLevel} ({job.proficiency})
                      </span>
                    </div>
                  </div>

                  <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6 shrink-0">
                    <div className="text-2xl font-extrabold text-[#0C2340]">{job.vacancies}</div>
                    <div className="text-[11px] text-slate-500 uppercase font-semibold">Open Positions</div>
                    <button
                      onClick={() => showToast(`Broadcasting demand signal for ${job.title} to affiliated ITIs in ${job.district}.`)}
                      className="mt-2 text-xs text-blue-700 hover:text-blue-900 font-bold underline inline-block"
                    >
                      Trigger Local Cohort Match &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Curriculum Co-Design & Validation Desk */}
        {activeTab === 'curriculum' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
            {/* Header & Context */}
            <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                    Live Employer Telemetry
                  </span>
                  <span className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-semibold border border-amber-200">
                    Part B Question 22 &amp; 23 Ingestion
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-[#0C2340] mt-1.5">
                  Employer Curriculum Advisory &amp; Live Syllabus Voting Board
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Co-designing Maharashtra vocational curricula. Real-time employer upvotes rank syllabus modernizations for the State Review Council.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEmployerSurveyOpen(true)}
                className="shrink-0 px-4 py-2 bg-[#0C2340] hover:bg-blue-900 text-amber-300 font-bold text-xs rounded-lg shadow-xs transition flex items-center space-x-1.5 border border-amber-500/40"
              >
                <Vote className="w-4 h-4 text-amber-400" />
                <span>Open Full Part B Survey</span>
              </button>
            </div>

            {/* SECTION 1: LIVE INDUSTRY PULSE & UPVOTING LEADERBOARD */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-extrabold text-[#0C2340] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Top Curriculum Change Requests (Ranked by Employer Upvotes)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live upvote tallies determining priority additions for upcoming ITI academic cycles.
                  </p>
                </div>

                {/* Sector Filter */}
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-500 font-semibold hidden sm:inline">Filter Sector:</span>
                  <select
                    value={curriculumFilterSector}
                    onChange={(e) => setCurriculumFilterSector(e.target.value)}
                    className="p-1.5 bg-white border border-slate-300 rounded-md font-medium text-slate-800 text-xs"
                  >
                    <option value="All">All Sectors</option>
                    <option value="Automotive & EV Manufacturing">Automotive &amp; EV</option>
                    <option value="Capital Goods, CNC & Precision Engineering">Capital Goods &amp; CNC</option>
                    <option value="Renewable Energy & Solar">Renewable Energy &amp; Solar</option>
                    <option value="IT / Software & Technology">IT &amp; Software</option>
                  </select>
                </div>
              </div>

              {/* Proposals Cards List */}
              <div className="space-y-3">
                {suggestions
                  .filter((s) => curriculumFilterSector === 'All' || s.sector === curriculumFilterSector)
                  .sort((a, b) => b.upvotes - a.upvotes)
                  .map((sug, idx) => {
                    const isVoted = votedIds.includes(sug.id);
                    return (
                      <div
                        key={sug.id}
                        className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isVoted
                            ? 'bg-amber-50/60 border-amber-300 shadow-2xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#0C2340] text-amber-300 font-extrabold text-[10px] flex items-center justify-center">
                              #{idx + 1}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                              {sug.sector}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              By {sug.submittedBy} &bull; {sug.timestamp}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                            &ldquo;{sug.text}&rdquo;
                          </p>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleUpvote(sug.id)}
                            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                              isVoted
                                ? 'bg-amber-600 text-white shadow-xs hover:bg-amber-700 ring-2 ring-amber-400/40'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                            }`}
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'fill-white' : ''}`} />
                            <span>{sug.upvotes}</span>
                            <span>{isVoted ? 'Upvoted' : 'Upvote'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Inline Form to Propose New Syllabus Change */}
              <form
                onSubmit={handleAddSyllabusProposal}
                className="p-4 rounded-xl bg-white border border-dashed border-amber-400/80 space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-amber-600" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Submit a New Curriculum Change Proposal (Auto-Enters Live Voting)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Target Sector</label>
                    <select
                      value={selectedProposalSector}
                      onChange={(e) => setSelectedProposalSector(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                    >
                      <option value="Automotive & EV Manufacturing">Automotive &amp; EV</option>
                      <option value="Capital Goods, CNC & Precision Engineering">Capital Goods &amp; CNC</option>
                      <option value="Renewable Energy & Solar">Renewable Energy &amp; Solar</option>
                      <option value="IT / Software & Technology">IT / Software</option>
                      <option value="Healthcare & Medical Devices">Healthcare &amp; MedTech</option>
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Specific Module, Equipment, or Practical Topic Needed
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={newSyllabusProposal}
                        onChange={(e) => setNewSyllabusProposal(e.target.value)}
                        placeholder="e.g. Add 40 hours hands-on battery pack disassembly and thermal testing to Motor Mechanic trade"
                        className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900 text-xs"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#0C2340] hover:bg-blue-900 text-amber-300 font-bold text-xs rounded-md shadow-xs shrink-0 flex items-center space-x-1"
                      >
                        <Send className="w-3 h-3 text-amber-400" />
                        <span>Post &amp; Vote</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* SECTION 2: INSTITUTIONAL 120-HOUR MODULAR SUBMISSIONS */}
            <div className="space-y-4 pt-2">
              <div>
                <h3 className="text-base font-extrabold text-[#0C2340]">
                  Institutional 120-Hour Modular Course Endorsement Desk
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Formal modular updates submitted by ITIs, Polytechnics, and VTPs in Maharashtra pending industry sign-off.
                </p>
              </div>

              <div className="space-y-4">
                {curriculumProposals.map((proposal) => (
                  <div key={proposal.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/60">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-blue-900 text-white font-mono text-[10px] font-bold">
                          {proposal.id}
                        </span>
                        <span className="font-extrabold text-sm text-[#0C2340]">
                          {proposal.trade}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-500 font-semibold">{proposal.provider}</span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                            proposal.status === 'EMPLOYER VALIDATED'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}
                        >
                          {proposal.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-800">Proposed Modular Skill Annexure:</div>
                      <p className="text-xs text-slate-700 mt-0.5 font-medium leading-relaxed">
                        {proposal.proposal}
                      </p>
                    </div>

                    <div className="p-3 bg-red-50/70 rounded-lg border border-red-200 text-xs text-red-900 space-y-0.5">
                      <span className="font-bold flex items-center gap-1 text-red-800">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        Obsolete Component Flagged for Sunset:
                      </span>
                      <p className="text-slate-700">{proposal.obsoleteTopicsFlagged}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-slate-500">
                        Endorsed by <strong className="text-slate-800">{proposal.validationsCount} Enterprise Partners</strong> in Maharashtra
                      </div>

                      <button
                        onClick={() => handleValidateCurriculum(proposal.id)}
                        className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-xs shadow-2xs transition flex items-center gap-1.5"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Validate &amp; Endorse Competency</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Regional Cluster Apprenticeship Pipeline */}
        {activeTab === 'apprenticeships' && (
          <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-[#0C2340]">
                Maharashtra Apprenticeship Promotion Scheme (MAPS / NAPS)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Direct recruitment matching with graduating cohorts from 419 Govt ITIs, 616 Private ITIs, and Polytechnics across Maharashtra.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded">
                    Pune Automotive Cluster
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">94 Candidates Graduating</span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900">
                  Govt. ITI Aundh &amp; Kalyani ITI Cohort
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialized in EV Powertrain Wiring, Motor Diagnostics, and CNC Tooling. Available for 1-year NAPS apprenticeship deployment starting Oct 2026.
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast('Apprenticeship drive invitation dispatched to Govt. ITI Aundh placement cell.')}
                    className="px-3.5 py-1.5 bg-[#0C2340] hover:bg-[#1E3A8A] text-white text-xs font-bold rounded transition"
                  >
                    Schedule Campus Placement Drive &rarr;
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded">
                    Marathwada Industrial Hub
                  </span>
                  <span className="text-xs text-emerald-700 font-bold">60 Candidates Graduating</span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900">
                  AURIC Shendra-Bidkin Polytechnic Cohort
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Trained on Industrial Automation, PLC Logic, and Quality Inspection. Ready for immediate deployment in AURIC DMIC industrial zone.
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast('Apprenticeship drive invitation dispatched to AURIC Polytechnic placement cell.')}
                    className="px-3.5 py-1.5 bg-[#0C2340] hover:bg-[#1E3A8A] text-white text-xs font-bold rounded transition"
                  >
                    Schedule Campus Placement Drive &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* New Job Demand Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-base text-[#0C2340]">Broadcast Industry Skill Demand</h3>
              </div>
              <button
                onClick={() => setShowNewJobModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateJobPosting} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Job Role Title *</label>
                <input
                  type="text"
                  required
                  value={newJobTitle}
                  onChange={e => setNewJobTitle(e.target.value)}
                  placeholder="e.g. EV High-Voltage Test Bench Specialist"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sector</label>
                  <select
                    value={newJobSector}
                    onChange={e => setNewJobSector(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                  >
                    <option value="Automotive & EVs">Automotive &amp; EVs</option>
                    <option value="Electronics & Hardware">Electronics &amp; Hardware</option>
                    <option value="Capital Goods">Capital Goods</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                    <option value="Logistics">Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">District Location</label>
                  <select
                    value={newJobDistrict}
                    onChange={e => setNewJobDistrict(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                  >
                    {MAHARASHTRA_DISTRICTS.map(d => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vacancies Count</label>
                  <input
                    type="number"
                    value={newJobVacancies}
                    onChange={e => setNewJobVacancies(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">NSQF Competency Level</label>
                  <select
                    value={newJobNsqf}
                    onChange={e => setNewJobNsqf(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-900"
                  >
                    <option value="NSQF Level 3">NSQF Level 3 (Basic)</option>
                    <option value="NSQF Level 4">NSQF Level 4 (Technician)</option>
                    <option value="NSQF Level 5">NSQF Level 5 (Advanced Specialist)</option>
                    <option value="NSQF Level 6">NSQF Level 6 (Supervisor)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg text-slate-700 border border-blue-100 text-[11px] leading-relaxed">
                This demand signal will be ingested by the State Skill Intelligence Engine to update course health ratings and alert local training providers.
              </div>

              <div className="mt-5 flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewJobModal(false)}
                  className="px-3.5 py-2 text-slate-600 hover:text-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white font-extrabold rounded-lg shadow-sm"
                >
                  Broadcast Demand Signal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Conversational Check-In & Syllabus Voting Modal (Part B - Max 14 adaptive questions) */}
      <EmployerConversationalSurveyModal
        isOpen={isEmployerSurveyOpen}
        onClose={() => {
          setIsEmployerSurveyOpen(false);
          localStorage.removeItem('kaushal_employer_new_account');
        }}
        companyName={user?.orgName || survey.orgName}
        contactName={user?.userName || survey.spocName}
        onComplete={handleEmployerSurveyComplete}
      />

      <GovernmentFooter />
    </div>
  );
};
