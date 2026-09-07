import React, { createContext, useContext, useState } from 'react';
import {
  ProviderProfile,
  ProviderType,
  CourseCatalogueItem,
  GovernmentNoticeItem,
  TrainerItem,
  EquipmentUpgradeItem,
  NotificationItem,
  RequestApplicationItem,
  HumanValidationReview
} from '../types/trainingCentre';
import {
  PRIMARY_OFFLINE_PROVIDER,
  SECONDARY_ONLINE_PROVIDER,
  TRAINING_CENTRE_COURSES,
  GOVERNMENT_NOTICES,
  TRAINERS_LIST,
  EQUIPMENT_UPGRADE_PLAN,
  NOTIFICATIONS_DATA,
  REQUESTS_APPLICATIONS,
  HUMAN_VALIDATION_WORKFLOW
} from '../data/trainingCentreData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendations?: string[];
}

interface TrainingCentreContextType {
  provider: ProviderProfile;
  setProviderType: (type: ProviderType) => void;
  courses: CourseCatalogueItem[];
  selectedCourse: CourseCatalogueItem | null;
  setSelectedCourse: (course: CourseCatalogueItem | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCourseFilter: string;
  setActiveCourseFilter: (filter: string) => void;
  notices: GovernmentNoticeItem[];
  selectedNotice: GovernmentNoticeItem | null;
  setSelectedNotice: (notice: GovernmentNoticeItem | null) => void;
  markNoticeAsRead: (id: string) => void;
  trainers: TrainerItem[];
  selectedTrainer: TrainerItem | null;
  setSelectedTrainer: (trainer: TrainerItem | null) => void;
  equipmentList: EquipmentUpgradeItem[];
  selectedEquipment: EquipmentUpgradeItem | null;
  setSelectedEquipment: (item: EquipmentUpgradeItem | null) => void;
  requests: RequestApplicationItem[];
  addNewRequest: (request: Omit<RequestApplicationItem, 'id' | 'referenceNumber' | 'stageTimeline'>) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  humanValidation: HumanValidationReview;
  submitCurriculumForReview: () => void;
  requestCurriculumChanges: (note: string) => void;
  isNewRequestModalOpen: boolean;
  setIsNewRequestModalOpen: (open: boolean) => void;
}

const TrainingCentreContext = createContext<TrainingCentreContextType | undefined>(undefined);

export const TrainingCentreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [providerType, setProviderTypeState] = useState<ProviderType>('offline');
  const [provider, setProvider] = useState<ProviderProfile>(PRIMARY_OFFLINE_PROVIDER);

  const [courses, setCourses] = useState<CourseCatalogueItem[]>(TRAINING_CENTRE_COURSES);
  const [selectedCourse, setSelectedCourse] = useState<CourseCatalogueItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseFilter, setActiveCourseFilter] = useState('All');

  const [notices, setNotices] = useState<GovernmentNoticeItem[]>(GOVERNMENT_NOTICES);
  const [selectedNotice, setSelectedNotice] = useState<GovernmentNoticeItem | null>(null);

  const [trainers, setTrainers] = useState<TrainerItem[]>(TRAINERS_LIST);
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerItem | null>(null);

  const [equipmentList, setEquipmentList] = useState<EquipmentUpgradeItem[]>(EQUIPMENT_UPGRADE_PLAN);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentUpgradeItem | null>(null);

  const [requests, setRequests] = useState<RequestApplicationItem[]>(REQUESTS_APPLICATIONS);
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [humanValidation, setHumanValidation] = useState<HumanValidationReview>(HUMAN_VALIDATION_WORKFLOW);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'ai',
      text: 'Namaskar! I am Kaushal AI, your institutional decision-support copilot. I analyze live Maharashtra labour-market telemetry to help you keep courses aligned, identify obsolescence risks, and prepare trainer/equipment upgrade requests.',
      timestamp: 'Just now',
      recommendations: [
        'Which of my courses needs immediate attention?',
        'Why is Fitter marked oversupplied?',
        'What should I update first for EV alignment?'
      ]
    }
  ]);

  const setProviderType = (type: ProviderType) => {
    setProviderTypeState(type);
    if (type === 'offline') {
      setProvider(PRIMARY_OFFLINE_PROVIDER);
    } else {
      setProvider(SECONDARY_ONLINE_PROVIDER);
    }
  };

  const markNoticeAsRead = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  const addNewRequest = (
    req: Omit<RequestApplicationItem, 'id' | 'referenceNumber' | 'stageTimeline'>
  ) => {
    const newReq: RequestApplicationItem = {
      ...req,
      id: `req-${Date.now()}`,
      referenceNumber: `REQ-${req.type.slice(0, 3).toUpperCase()}-NSK-${Math.floor(1000 + Math.random() * 9000)}`,
      stageTimeline: [
        { stage: 'Draft Prepared', date: 'Today', completed: true },
        { stage: 'Submitted to DVET', date: 'Today', completed: true, current: true },
        { stage: 'Technical Committee Evaluation', completed: false },
        { stage: 'State Sanction Order', completed: false },
        { stage: 'Final Execution', completed: false }
      ]
    };
    setRequests((prev) => [newReq, ...prev]);
    setIsNewRequestModalOpen(false);
  };

  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };
    setChatMessages((prev) => [...prev, userMsg]);

    // Generate accurate contextual answers based on prototype data
    setTimeout(() => {
      let aiReplyText = '';
      const lower = text.toLowerCase();

      if (lower.includes('immediate attention') || lower.includes('at risk') || lower.includes('highest')) {
        aiReplyText =
          'Automobile Engineering (MMV-201) currently has the highest technology obsolescence risk. 72% of automotive job postings in Nashik and Pune specify electric powertrains, BMS diagnostics, and high-voltage safety protocols, whereas the current syllabus remains ICE-focused. We recommend deploying the 120-hour modular EV curriculum upgrade.';
      } else if (lower.includes('fitter') || lower.includes('oversupplied') || lower.includes('oversupply')) {
        aiReplyText =
          'Fitter (FIT-102) is flagged as OVERSUPPLIED because across Nashik district, 14 institutes produce 1,840 fitters annually, while local projected job absorption is capped at approximately 1,100 positions. We recommend capping admission intake by 25% and transferring 40 seats into CNC Machining or EV Assembly.';
      } else if (lower.includes('what should i update first') || lower.includes('first') || lower.includes('priority')) {
        aiReplyText =
          'Here is the optimal sequential action roadmap:\n1. Ratify the 120-hour Modular EV Curriculum Annexure.\n2. Depute Instructors Rajesh Kumar and Priya Sharma to the October ARAI Train-the-Trainer cohort.\n3. Submit the capital subsidy request for the EV Battery Diagnostic Trainer Rig (₹4.5 Lakhs).\n4. Upgrade workshop assessments with simulation & fault-injection matrices.';
      } else if (lower.includes('notice') || lower.includes('government') || lower.includes('deadline')) {
        aiReplyText =
          'Your most urgent government deadline is the DVET Annual Training Centre Data Verification window, closing on 30 Sep 2026. Ensure your student enrolment registry and workshop tooling records are verified.';
      } else {
        aiReplyText =
          'Kaushal Setu telemetry confirms strong hiring growth across Electric Mobility (+38%), Solar PV (+26%), and Industrial Automation (+29%) in your district. Use the sidebar navigation to review curriculum updates, trainer upskilling paths, and equipment modernization plans.';
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: 'Just now'
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const submitCurriculumForReview = () => {
    setHumanValidation((prev) => ({
      ...prev,
      currentStage: 'Employer Review',
      progressIndex: 2,
      reviewedByCentre: true,
      statusText: 'Under Review',
      reviewNotes: [
        ...prev.reviewNotes,
        `Submitted by Institute Principal for Employer Advisory Review on ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}.`
      ]
    }));
  };

  const requestCurriculumChanges = (note: string) => {
    setHumanValidation((prev) => ({
      ...prev,
      statusText: 'Revision Required',
      reviewNotes: [
        ...prev.reviewNotes,
        `Institution requested revisions: "${note}" (${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })})`
      ]
    }));
  };

  return (
    <TrainingCentreContext.Provider
      value={{
        provider,
        setProviderType,
        courses,
        selectedCourse,
        setSelectedCourse,
        searchQuery,
        setSearchQuery,
        activeCourseFilter,
        setActiveCourseFilter,
        notices,
        selectedNotice,
        setSelectedNotice,
        markNoticeAsRead,
        trainers,
        selectedTrainer,
        setSelectedTrainer,
        equipmentList,
        selectedEquipment,
        setSelectedEquipment,
        requests,
        addNewRequest,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        chatMessages,
        sendChatMessage,
        humanValidation,
        submitCurriculumForReview,
        requestCurriculumChanges,
        isNewRequestModalOpen,
        setIsNewRequestModalOpen
      }}
    >
      {children}
    </TrainingCentreContext.Provider>
  );
};

export const useTrainingCentre = () => {
  const context = useContext(TrainingCentreContext);
  if (!context) {
    throw new Error('useTrainingCentre must be used within a TrainingCentreProvider');
  }
  return context;
};
