import React, { useState } from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  Building,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Users,
  Edit,
  Save
} from 'lucide-react';

export const InstituteProfileView: React.FC = () => {
  const { provider } = useTrainingCentre();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(provider.contactPhone);
  const [email, setEmail] = useState(provider.contactEmail);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>NCVET Verified Provider</span>
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-mono">
                Reg: {provider.registrationNumber}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0C2340] tracking-tight">
              {provider.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {provider.campusName} &bull; Established {provider.establishedYear}
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-lg text-xs font-bold shadow-2xs transition"
            >
              <Edit className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEditing ? 'Cancel Editing' : 'Update Profile Details'}</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold animate-in fade-in">
            ✓ Institute contact profile updated and synced with DVET registry.
          </div>
        )}
      </div>

      {/* Profile Completion Card (82%) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-extrabold text-[#0C2340]">
            Statutory Verification Readiness
          </span>
          <span className="text-base font-black text-blue-900 font-mono">
            {provider.profileCompletion}%
          </span>
        </div>

        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-blue-700 rounded-full transition-all"
            style={{ width: `${provider.profileCompletion}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-center space-x-2 text-emerald-950 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Institutional Registration &amp; NCVET Affiliation (100%)</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-center space-x-2 text-emerald-950 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Faculty &amp; Instructor NCVT Credentials (100%)</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-center space-x-2 text-emerald-950 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Workshop Carpet Area &amp; Layout Clearance (100%)</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-center space-x-2 text-emerald-950 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Biometric Student Attendance Sync Active (100%)</span>
          </div>

          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center space-x-2 text-amber-950 font-semibold">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Workshop Equipment Geo-Tagging (Pending - 60% complete)</span>
          </div>

          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center space-x-2 text-amber-950 font-semibold">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Dual-System (DST) OEM MoU Signatures (Pending - 50% complete)</span>
          </div>
        </div>
      </div>

      {/* Campus & Contact Information */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <h2 className="text-base font-extrabold text-[#0C2340] mb-4">
          Campus Location &amp; Administrative Contacts
        </h2>

        {!isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <div className="text-slate-400 font-bold uppercase text-[10px]">Physical Address</div>
              <div className="font-semibold text-slate-800 flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{provider.address}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <div className="text-slate-400 font-bold uppercase text-[10px]">Primary Contact Details</div>
              <div className="space-y-1 text-slate-700">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-mono">{phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-mono">{email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-blue-800 font-mono">{provider.website}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4 text-xs max-w-lg">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Administrative Telephone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official NCVET Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0C2340] text-white rounded-lg font-bold"
            >
              <Save className="w-3.5 h-3.5 text-amber-400" />
              <span>Save &amp; Broadcast Update</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
