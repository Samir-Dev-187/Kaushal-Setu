import React, { useState } from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  Shield,
  Lock,
  Key,
  Bell,
  RefreshCw,
  CheckCircle2,
  Save
} from 'lucide-react';

export const SettingsSecurityView: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [syncFreq, setSyncFreq] = useState('daily');
  const [autoFlagAlerts, setAutoFlagAlerts] = useState(true);
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center space-x-2 mb-1">
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-xs">
            Security &amp; System Configuration
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#0C2340] tracking-tight">
          Institute Settings &amp; Data Governance
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Manage Aadhaar-based biometric 2FA, telemetry ingestion frequency, and API authorizations.
        </p>

        {saveToast && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold animate-in fade-in">
            ✓ Preferences saved and applied to active institutional session.
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Security & 2FA */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-900" />
            <h2 className="text-base font-extrabold text-[#0C2340]">
              Authentication &amp; Access Controls
            </h2>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <div className="font-bold text-slate-800">
                Aadhaar-linked Biometric Two-Factor Authentication (2FA)
              </div>
              <div className="text-slate-500 mt-0.5">
                Mandatory for principal sign-offs and NCVET examination registry approvals.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
            </label>
          </div>
        </div>

        {/* Telemetry & Synchronization */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-blue-900" />
            <h2 className="text-base font-extrabold text-[#0C2340]">
              Labour-Market Intelligence Synchronization
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Live Job Market Telemetry Ingestion Rate:
              </label>
              <select
                value={syncFreq}
                onChange={(e) => setSyncFreq(e.target.value)}
                className="w-full sm:w-80 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              >
                <option value="realtime">Continuous Real-Time Webhooks</option>
                <option value="daily">Daily Morning Batch (6:00 AM IST) - Recommended</option>
                <option value="weekly">Weekly Consolidated Digest</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <div className="font-bold text-slate-800">
                  Automated Critical Course Obsolescence Alerts
                </div>
                <div className="text-slate-500 mt-0.5">
                  Send immediate SMS / Email notifications when a trade exceeds 70% tech gap threshold.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoFlagAlerts}
                  onChange={() => setAutoFlagAlerts(!autoFlagAlerts)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-900"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-lg text-xs font-bold shadow-md transition"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
