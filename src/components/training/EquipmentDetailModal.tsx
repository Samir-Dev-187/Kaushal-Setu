import React from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  Wrench,
  IndianRupee,
  Users,
  Target,
  FileCheck,
  Send,
  X,
  AlertTriangle
} from 'lucide-react';

export const EquipmentDetailModal: React.FC = () => {
  const { selectedEquipment, setSelectedEquipment, addNewRequest } = useTrainingCentre();

  if (!selectedEquipment) return null;

  const handleSubmitRequest = () => {
    addNewRequest({
      title: `Procurement Subsidy: ${selectedEquipment.name}`,
      type: 'Equipment Request',
      submittedDate: 'Today',
      status: 'Under Review',
      notes: `Target course: ${selectedEquipment.targetCourse}. Estimated outlay: ₹${selectedEquipment.estimatedCostLakhs} Lakhs.`
    });
    alert(`Subsidy request created for "${selectedEquipment.name}". It is now listed under Requests & Applications.`);
    setSelectedEquipment(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl border border-amber-200 shrink-0 mt-0.5">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 uppercase">
                  {selectedEquipment.priority} Priority
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedEquipment.category}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#0C2340] mt-1 leading-snug">
                {selectedEquipment.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setSelectedEquipment(null)}
            className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        {/* Details */}
        <div className="mt-4 space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Estimated Cost:</span>
              <span className="font-extrabold text-slate-900 text-sm">
                ₹{selectedEquipment.estimatedCostLakhs} Lakhs
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Annual Student Impact:</span>
              <span className="font-bold text-blue-900 text-sm">
                {selectedEquipment.studentsImpactedPerYear} Trainees
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Budget Tier:</span>
              <span className="font-bold text-slate-800 text-xs">
                {selectedEquipment.budgetTier}
              </span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="font-bold text-slate-800 mb-1">Target Training Course:</div>
            <p className="text-slate-600 font-semibold">{selectedEquipment.targetCourse}</p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="font-bold text-slate-800 mb-1">Academic &amp; Practical Justification:</div>
            <p className="text-slate-600 leading-relaxed">{selectedEquipment.requiredFor}</p>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-200">
            <div className="font-bold text-blue-950 mb-1">Recommended Vendor / GeM Technical Specifications:</div>
            <p className="text-blue-900 leading-relaxed font-mono text-[11px]">
              {selectedEquipment.recommendedVendorSpecs}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setSelectedEquipment(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Close
          </button>

          <button
            onClick={handleSubmitRequest}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#0C2340] hover:bg-[#1E3A8A] text-white rounded-md text-xs font-bold shadow-2xs transition"
          >
            <Send className="w-3.5 h-3.5 text-amber-400" />
            <span>Submit Equipment Subsidy Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};
