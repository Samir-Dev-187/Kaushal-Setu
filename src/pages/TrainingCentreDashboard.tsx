import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GovernmentHeader } from '../components/layout/GovernmentHeader';
import { TrainingCentreHeader } from '../components/training/TrainingCentreHeader';
import { TrainingCentreSidebar } from '../components/training/TrainingCentreSidebar';
import { TrainingCentreFooter } from '../components/training/TrainingCentreFooter';
import { CourseDetailDrawer } from '../components/training/CourseDetailDrawer';
import { GovernmentNoticeModal } from '../components/training/GovernmentNoticeModal';
import { TrainerDetailModal } from '../components/training/TrainerDetailModal';
import { EquipmentDetailModal } from '../components/training/EquipmentDetailModal';
import { NewRequestModal } from '../components/training/NewRequestModal';
import { NotificationPanel } from '../components/training/NotificationPanel';
import { AskKaushalAiDrawer } from '../components/training/AskKaushalAiDrawer';

import { DashboardOverviewView } from '../components/training/DashboardOverviewView';
import { CoursesCatalogueView } from '../components/training/CoursesCatalogueView';
import { CurriculumIntelligenceView } from '../components/training/CurriculumIntelligenceView';
import { MarketIntelligenceView } from '../components/training/MarketIntelligenceView';
import { TrainersFacultyView } from '../components/training/TrainersFacultyView';
import { EquipmentOperationsView } from '../components/training/EquipmentOperationsView';
import { GovernmentNoticesView } from '../components/training/GovernmentNoticesView';
import { RequestsApplicationsView } from '../components/training/RequestsApplicationsView';
import { InstituteProfileView } from '../components/training/InstituteProfileView';
import { SettingsSecurityView } from '../components/training/SettingsSecurityView';
import { HelpDeskView } from '../components/training/HelpDeskView';
import { TrainingCentreProvider } from '../context/TrainingCentreContext';

const TrainingCentreDashboardContent: React.FC = () => {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Map route to active view
  const renderActiveView = () => {
    const path = location.pathname;

    if (path.includes('/courses')) {
      return <CoursesCatalogueView />;
    }
    if (path.includes('/curriculum') || path.includes('/ai-recommendations')) {
      return <CurriculumIntelligenceView />;
    }
    if (path.includes('/market-intelligence') || path.includes('/industry-updates') || path.includes('/placements')) {
      return <MarketIntelligenceView />;
    }
    if (path.includes('/trainers')) {
      return <TrainersFacultyView />;
    }
    if (path.includes('/equipment')) {
      return <EquipmentOperationsView />;
    }
    if (path.includes('/notices') || path.includes('/notifications')) {
      return <GovernmentNoticesView />;
    }
    if (path.includes('/requests')) {
      return <RequestsApplicationsView />;
    }
    if (path.includes('/profile')) {
      return <InstituteProfileView />;
    }
    if (path.includes('/settings')) {
      return <SettingsSecurityView />;
    }
    if (path.includes('/help')) {
      return <HelpDeskView />;
    }

    // Default overview
    return <DashboardOverviewView />;
  };

  const getBreadcrumbLabel = () => {
    const path = location.pathname;
    if (path.includes('/courses')) return 'Courses Catalogue';
    if (path.includes('/curriculum')) return 'Curriculum Intelligence';
    if (path.includes('/market-intelligence')) return 'Market Intelligence';
    if (path.includes('/trainers')) return 'Faculty & Trainers';
    if (path.includes('/equipment')) return 'Equipment & Labs';
    if (path.includes('/notices')) return 'Government Notices';
    if (path.includes('/requests')) return 'Requests & Applications';
    if (path.includes('/profile')) return 'Institute Profile';
    if (path.includes('/settings')) return 'Settings & Security';
    if (path.includes('/help')) return 'Help Desk';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* 1. Official Government Header (Tricolor & Accessibility) */}
      <GovernmentHeader />

      {/* 2. Training Centre Portal Header */}
      <TrainingCentreHeader
        onToggleMobileMenu={() => setIsMobileSidebarOpen(true)}
        activeBreadcrumbLabel={getBreadcrumbLabel()}
      />

      {/* 3. Main Portal Body (Sidebar + Content Workspace) */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <TrainingCentreSidebar
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* 4. Portal Footer */}
      <TrainingCentreFooter />

      {/* 5. Drawers, Modals & Floating AI Assistant */}
      <CourseDetailDrawer />
      <GovernmentNoticeModal />
      <TrainerDetailModal />
      <EquipmentDetailModal />
      <NewRequestModal />
      <NotificationPanel />
      <AskKaushalAiDrawer />
    </div>
  );
};

export const TrainingCentreDashboard: React.FC = () => {
  return (
    <TrainingCentreProvider>
      <TrainingCentreDashboardContent />
    </TrainingCentreProvider>
  );
};
