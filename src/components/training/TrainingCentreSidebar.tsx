import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  LayoutDashboard,
  BookOpen,
  Cpu,
  Compass,
  Sparkles,
  Users,
  Wrench,
  Award,
  GraduationCap,
  Briefcase,
  Bell,
  Radio,
  FileText,
  FileSpreadsheet,
  Building,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Video
} from 'lucide-react';

interface TrainingCentreSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const TrainingCentreSidebar: React.FC<TrainingCentreSidebarProps> = ({
  isOpenMobile = false,
  onCloseMobile
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { provider, unreadNotificationCount } = useTrainingCentre();

  const handleSignOut = () => {
    logout();
    navigate('/login?role=training-centre');
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
      isActive
        ? 'bg-[#0C2340] text-white shadow-xs font-bold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between overflow-y-auto py-4 px-3 space-y-6">
      <div className="space-y-6">
        {/* GROUP 1: MAIN */}
        <div>
          <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
            Main
          </div>
          <nav className="space-y-1">
            <NavLink to="/training-centres" end className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                <span>Dashboard</span>
              </div>
            </NavLink>

            <NavLink to="/training-centres/courses" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-4 h-4 text-blue-700" />
                <span>My Courses</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-mono">
                12
              </span>
            </NavLink>

            <NavLink to="/training-centres/curriculum" end className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>Curriculum Intelligence</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-100 text-red-700 font-bold">
                Review
              </span>
            </NavLink>

            <NavLink to="/training-centres/market-intelligence" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>Market Intelligence</span>
              </div>
            </NavLink>

            <NavLink to="/training-centres/ai-recommendations" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI Recommendations</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-bold">
                7
              </span>
            </NavLink>
          </nav>
        </div>

        {/* GROUP 2: TRAINING & OPERATIONS */}
        <div>
          <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
            Training &amp; Operations
          </div>
          <nav className="space-y-1">
            <NavLink to="/training-centres/trainers" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Trainers &amp; Faculty</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                4 Gaps
              </span>
            </NavLink>

            <NavLink to="/training-centres/equipment" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                {provider.providerType === 'offline' ? (
                  <Wrench className="w-4 h-4 text-amber-700" />
                ) : (
                  <Video className="w-4 h-4 text-purple-600" />
                )}
                <span>
                  {provider.providerType === 'offline'
                    ? 'Equipment & Infrastructure'
                    : 'Learning Content'}
                </span>
              </div>
            </NavLink>

            <NavLink to="/training-centres/assessment" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Assessment &amp; Cert</span>
              </div>
            </NavLink>

            <NavLink to="/training-centres/outcomes" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Learner Outcomes</span>
              </div>
            </NavLink>

            <NavLink to="/training-centres/placements" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <Briefcase className="w-4 h-4 text-emerald-700" />
                <span>Placement Outcomes</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                68%
              </span>
            </NavLink>
          </nav>
        </div>

        {/* GROUP 3: COMMUNICATION & REGULATION */}
        <div>
          <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
            Communication
          </div>
          <nav className="space-y-1">
            <NavLink to="/training-centres/notices" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <Bell className="w-4 h-4 text-red-500" />
                <span>Government Notices</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-100 text-red-700 font-bold">
                2 Active
              </span>
            </NavLink>

            <NavLink to="/training-centres/industry-updates" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <Radio className="w-4 h-4 text-blue-600" />
                <span>Industry Updates</span>
              </div>
            </NavLink>

            <NavLink to="/training-centres/requests" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Requests &amp; Applications</span>
              </div>
            </NavLink>

            <NavLink to="/training-centres/notifications" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <Layers className="w-4 h-4 text-slate-600" />
                <span>Notifications</span>
              </div>
              {unreadNotificationCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-600 text-white font-bold">
                  {unreadNotificationCount}
                </span>
              )}
            </NavLink>
          </nav>
        </div>

        {/* GROUP 4: MANAGEMENT */}
        <div>
          <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
            Management
          </div>
          <nav className="space-y-1">
            <NavLink to="/training-centres/reports" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <FileSpreadsheet className="w-4 h-4 text-slate-600" />
                <span>Reports &amp; Analytics</span>
              </div>
            </NavLink>

            <NavLink to="/training-centres/profile" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <Building className="w-4 h-4 text-slate-600" />
                <span>Institute Profile</span>
              </div>
            </NavLink>

            <NavLink to="/training-centres/settings" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <Settings className="w-4 h-4 text-slate-600" />
                <span>Settings &amp; Security</span>
              </div>
            </NavLink>

            <NavLink to="/training-centres/help" className={navItemClass} onClick={onCloseMobile}>
              <div className="flex items-center space-x-2.5">
                <HelpCircle className="w-4 h-4 text-slate-600" />
                <span>Help &amp; Support</span>
              </div>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Profile Completion & Verification Card */}
      <div className="pt-4 border-t border-slate-200">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0C2340] text-[11px]">Institute Profile</span>
            <span className="font-mono font-bold text-blue-700">{provider.profileCompletion}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-700 rounded-full transition-all"
              style={{ width: `${provider.profileCompletion}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Provider</span>
            </span>
            <NavLink
              to="/training-centres/profile"
              onClick={onCloseMobile}
              className="text-[10px] font-bold text-blue-700 hover:underline"
            >
              Complete
            </NavLink>
          </div>
        </div>

        {/* Sign Out Action */}
        <button
          onClick={handleSignOut}
          className="mt-3 w-full flex items-center justify-center space-x-1.5 py-2 px-3 text-red-600 hover:bg-red-50 rounded-lg text-xs font-bold transition border border-transparent hover:border-red-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Portal</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] sticky top-16 shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="font-bold text-sm text-[#0C2340]">Training Centre Portal</div>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
