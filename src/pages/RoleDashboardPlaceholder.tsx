import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GovernmentHeader } from '../components/layout/GovernmentHeader';
import { BrandHeader } from '../components/layout/BrandHeader';
import { GovernmentFooter } from '../components/layout/GovernmentFooter';
import {
  ShieldCheck,
  Building,
  Briefcase,
  Users,
  Award,
  ArrowLeft,
  LogOut,
  Clock,
  Sparkles,
  Layers,
  FileText,
  CheckCircle2
} from 'lucide-react';

interface RoleDashboardProps {
  roleName: string;
  roleType: 'training-centre' | 'employer' | 'candidate' | 'admin';
}

export const RoleDashboardPlaceholder: React.FC<RoleDashboardProps> = ({ roleName, roleType }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getRoleIcon = () => {
    switch (roleType) {
      case 'training-centre':
        return <Building className="w-8 h-8 text-blue-700" />;
      case 'employer':
        return <Briefcase className="w-8 h-8 text-amber-600" />;
      case 'candidate':
        return <Users className="w-8 h-8 text-emerald-600" />;
      case 'admin':
      default:
        return <ShieldCheck className="w-8 h-8 text-purple-700" />;
    }
  };

  const getPlannedModules = () => {
    switch (roleType) {
      case 'training-centre':
        return [
          { title: 'Curriculum Health Scoring Index', desc: 'Real-time rating of trade syllabi against regional industrial job vacancies.' },
          { title: 'Modular Course Modernization Annexure', desc: '120-hour modular updates (e.g. EV technology, solar inverter maintenance).' },
          { title: 'Lab Equipment & Tooling Audit', desc: 'Industry 4.0 benchmark checklists for practical trade workshops.' },
          { title: 'Trainer Up-Skilling & Mentorship Cell', desc: 'Direct corporate training linkages for vocational instructors.' }
        ];
      case 'employer':
        return [
          { title: 'Quarterly Industry Demand Survey Window', desc: 'Structured competency checklists submitted directly to state training boards.' },
          { title: 'Regional Cluster Apprenticeship Pipeline', desc: 'Direct recruitment matching with NAPS and local training provider / polytechnic cohorts.' },
          { title: 'Curriculum Co-Design Advisory Desk', desc: 'Collaborative feedback interface for upcoming trade revisions.' },
          { title: 'Micro-Skill Taxonomy Explorer', desc: 'Map your internal job descriptions against NSQF level benchmarks.' }
        ];
      case 'candidate':
        return [
          { title: 'Career Opportunity & Longevity Trajectory', desc: 'Explore hiring velocity, salary benchmarks, and 5-year outlooks across 36 districts.' },
          { title: 'Self-Administered Skill Gap Diagnostic', desc: 'Compare your existing certifications against live industry posting requirements.' },
          { title: 'Personalized Bridge Course Recommendations', desc: 'Short-duration modular units to unlock high-demand sunrise roles.' },
          { title: 'Verified Apprenticeship & Scheme Finder', desc: 'Direct links to PM Vishwakarma, NAPS, and regional industrial internships.' }
        ];
      case 'admin':
      default:
        return [
          { title: '36-District Predictive Skill Deficit Heatmap', desc: 'State-level GIS dashboard correlating industrial investments with training capacity.' },
          { title: 'Evidence-Based Course Sanctioning Workflow', desc: 'Automated evaluation for approving new courses or sunsetting obsolete modules.' },
          { title: 'Public Skilling Budget ROI Optimizer', desc: 'Maximize capital expenditure returns across vocational facilities in Maharashtra.' },
          { title: 'State Directorate Compliance & NSQF Governance', desc: 'Central monitoring and audit logs for all affiliated training centres.' }
        ];
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9]">
      <GovernmentHeader />
      <BrandHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Workspace Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                {getRoleIcon()}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-100 text-blue-900">
                    Authenticated Workspace
                  </span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Two-Factor OTP Verified
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C2340] tracking-tight mt-1">
                  {roleName} Dashboard
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Logged in as: <strong className="text-slate-800">{user?.userName || 'Authorized Stakeholder'}</strong> ({user?.userId || 'Demo Account'}) {user?.orgName ? `• ${user.orgName}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className="px-3.5 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Home</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-3.5 py-2 rounded-md bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Prototype Scope Callout */}
          <div className="mt-6 p-4 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-sm text-[#0C2340]">
                  Training Centre Portal is Live:
                </div>
                <p className="mt-0.5 leading-relaxed text-slate-700">
                  The complete Training Centre workspace (Curriculum Intelligence, Course Health Diagnostics, Risk Cards, Faculty Competency Matrix, and Lab Upgrades) is now active.
                </p>
              </div>
            </div>
            <Link
              to="/training-centres"
              className="inline-flex items-center space-x-1 px-4 py-2 bg-[#0C2340] text-white font-bold rounded-lg hover:bg-[#1E3A8A] transition text-xs shrink-0"
            >
              <span>Open Training Centre Portal</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>

          {/* Planned Features for This Role */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-700" />
                <span>Planned Modules for {roleName} Workspace (Phase 2):</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Architecture Ready</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getPlannedModules().map((mod, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>{mod.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-3.5 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <GovernmentFooter />
    </div>
  );
};
