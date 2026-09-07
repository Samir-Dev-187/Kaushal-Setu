/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { OtpVerificationPage } from './pages/OtpVerificationPage';
import { CandidateSignupPage } from './pages/CandidateSignupPage';
import { EmployerSignupPage } from './pages/EmployerSignupPage';
import { TrainingCentreSignupPage } from './pages/TrainingCentreSignupPage';
import { TrainingCentreDashboard } from './pages/TrainingCentreDashboard';
import { CandidateDashboard } from './pages/CandidateDashboard';

import { EmployerDashboard } from './pages/EmployerDashboard';
import { AdminGovernmentDashboard } from './pages/AdminGovernmentDashboard';

const AppShell: React.FC = () => {
  const { fontScale } = useAuth();

  return (
    <div className={`min-h-screen text-slate-800 bg-[#F8FAFC] font-sans ${fontScale === 'large' ? 'text-lg' : ''}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/signup/candidate" element={<CandidateSignupPage />} />
        <Route path="/signup/employer" element={<EmployerSignupPage />} />
        <Route path="/signup/training-centre" element={<TrainingCentreSignupPage />} />

        {/* Stakeholder Workspaces */}
        <Route path="/training-centres" element={<TrainingCentreDashboard />} />
        <Route path="/training-centres/*" element={<TrainingCentreDashboard />} />
        <Route path="/employers" element={<EmployerDashboard />} />
        <Route path="/employers/*" element={<EmployerDashboard />} />
        <Route path="/candidates" element={<CandidateDashboard />} />
        <Route path="/candidates/*" element={<CandidateDashboard />} />
        <Route path="/candidate" element={<CandidateDashboard />} />
        <Route path="/admin" element={<AdminGovernmentDashboard />} />
        <Route path="/admin/*" element={<AdminGovernmentDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  );
}

