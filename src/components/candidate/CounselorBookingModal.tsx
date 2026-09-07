import React, { useState } from 'react';
import { SupportedLang, TRANSLATIONS } from '../../data/candidateTranslations';
import { Phone, Calendar, Clock, CheckCircle2, X, UserCheck, ShieldCheck } from 'lucide-react';

interface CounselorBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLang;
  candidateDistrict: string;
}

export const CounselorBookingModal: React.FC<CounselorBookingModalProps> = ({
  isOpen,
  onClose,
  language,
  candidateDistrict
}) => {
  // All hooks MUST be called before any early return (React Rules of Hooks)
  const t = TRANSLATIONS[language];
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow, 3:30 PM');
  const [mobileNumber, setMobileNumber] = useState('+91 98230 45891');
  const [topic, setTopic] = useState('Checking if EV is better than ICE Fitter');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const availableSlots = [
    'Tomorrow, 11:00 AM',
    'Tomorrow, 3:30 PM',
    'Wednesday, 10:30 AM',
    'Wednesday, 4:00 PM'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 flex flex-col my-auto">
        {/* Header */}
        <div className="bg-[#0C2340] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white">
                Vocational Career Counselor
              </h2>
              <p className="text-xs text-slate-300">
                15-Minute Free Consultation ({candidateDistrict})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs text-slate-800">
          {isBooked ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                Counselor Call Confirmed!
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Shri D. B. Shinde (District Skill Development Office, {candidateDistrict})
                will call you on <strong className="text-slate-900">{mobileNumber}</strong> at{' '}
                <strong className="text-slate-900">{selectedSlot}</strong>.
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-3.5">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-950 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <strong>100% Impartial Guidance:</strong> Our district counselors have no sales targets.
                  They are government officers mandated to advise you on genuine employment realities.
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select a convenient phone slot:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableSlots.map((slot, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 rounded-lg border text-xs font-semibold text-left transition-colors flex items-center space-x-1.5 ${
                        selectedSlot === slot
                          ? 'border-blue-900 bg-blue-50 text-blue-900 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number for Call:
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={e => setMobileNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  What would you like advice on?
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="e.g. Which trade gives highest starting pay in Nashik..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-bold text-xs shadow-sm transition-colors"
                >
                  Confirm Free Callback
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
