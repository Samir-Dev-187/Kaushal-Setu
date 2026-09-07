import React, { useState } from 'react';
import { useTrainingCentre } from '../../context/TrainingCentreContext';
import {
  Compass,
  TrendingUp,
  TrendingDown,
  Download,
  Building2,
  MapPin,
  Briefcase,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  DEMAND_VS_SUPPLY_DATA,
  TOP_GROWING_SKILLS,
  DECLINING_SKILLS,
  INDUSTRY_UPDATES
} from '../../data/trainingCentreData';

export const MarketIntelligenceView: React.FC = () => {
  const { provider } = useTrainingCentre();
  const [selectedDistrict, setSelectedDistrict] = useState('Nashik');
  const [selectedSector, setSelectedSector] = useState('All');

  const handleExport = () => {
    alert('Exporting Maharashtra Labour-Market Intelligence Dossier (AY 2026-27).');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-xs">
                Live Industrial Telemetry
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">
                North Maharashtra Industrial Corridor
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#0C2340] tracking-tight">
              Labour-Market Intelligence Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              District-level aggregation of live job requisitions, apprenticeship quotas, and employer skill shifts.
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold border border-slate-300 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Telemetry Report</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">Cluster District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-md font-semibold text-slate-800"
            >
              <option value="Nashik">Nashik (MIDC Ambad &amp; Satpur)</option>
              <option value="Pune">Pune (Chakan &amp; Bhosari)</option>
              <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar (Waluj &amp; Shendra)</option>
              <option value="Thane">Thane &amp; Belapur</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">Trade Sector:</span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-md font-semibold text-slate-800"
            >
              <option value="All">All Sectors</option>
              <option value="Automotive">Automotive &amp; Electric Mobility</option>
              <option value="Renewable">Renewable Energy &amp; Solar</option>
              <option value="Manufacturing">Capital Goods &amp; CNC</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top Growing vs Declining Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Growing Skills */}
        <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-extrabold text-[#0C2340]">Top Accelerating Industry Competencies</h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              High Hiring Velocity
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {TOP_GROWING_SKILLS.map((sk, idx) => (
              <div
                key={idx}
                className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900">{sk.name}</div>
                  <div className="text-[10px] text-slate-500 font-medium">Sector: {sk.sector}</div>
                </div>
                <span className="text-xs font-black font-mono text-emerald-700 bg-white px-2 py-1 rounded border border-emerald-200">
                  {sk.growth} YoY
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Declining Skills */}
        <div className="bg-white rounded-2xl border border-red-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <h2 className="text-sm font-extrabold text-[#0C2340]">Sunset &amp; Declining Competencies</h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
              Obsolescence Warning
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {DECLINING_SKILLS.map((sk, idx) => (
              <div
                key={idx}
                className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900">{sk.name}</div>
                  <div className="text-[10px] text-red-700 font-bold">
                    Risk Level: {sk.risk}
                  </div>
                </div>
                <span className="text-xs font-black font-mono text-red-600 bg-white px-2 py-1 rounded border border-red-200">
                  {sk.decline} YoY
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demand vs Capacity Comprehensive Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-extrabold text-[#0C2340]">
              District Demand vs. Institute Training Seat Capacity
            </h2>
            <p className="text-xs text-slate-500">
              Comparison between projected industrial recruitments and regional vocational capacity
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Nashik District Cohort</span>
        </div>

        <div className="space-y-4">
          {DEMAND_VS_SUPPLY_DATA.map((row, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="font-extrabold text-sm text-slate-900">{row.trade}</div>
                <div className="text-xs">
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded ${
                      row.type === 'DEFICIT'
                        ? 'bg-red-100 text-red-800'
                        : row.type === 'OVERSUPPLIED'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {row.type === 'DEFICIT'
                      ? `DEFICIT: Need +${Math.abs(row.gapOrSurplus).toLocaleString()} more seats`
                      : row.type === 'OVERSUPPLIED'
                      ? `OVERSUPPLIED: +${row.gapOrSurplus.toLocaleString()} surplus graduates`
                      : 'Equilibrium Capacity'}
                  </span>
                </div>
              </div>

              {/* Progress bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Projected Vacancies:</span>
                    <strong className="text-slate-900">{row.projectedJobs.toLocaleString()}</strong>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 rounded-full"
                      style={{ width: `${Math.min((row.projectedJobs / 60000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Current Institute Capacity:</span>
                    <strong className="text-slate-900">{row.currentCapacity.toLocaleString()}</strong>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        row.currentCapacity > row.projectedJobs ? 'bg-amber-600' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min((row.currentCapacity / 60000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Industry Employer Signals */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-extrabold text-[#0C2340]">
              Direct Employer Hiring Signals &amp; MoUs
            </h2>
            <p className="text-xs text-slate-500">
              Verified corporate hiring requisitions from Nashik, Pune &amp; Chakan industrial corridors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INDUSTRY_UPDATES.map((update) => (
            <div key={update.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between text-xs">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 uppercase">
                  {update.sector}
                </span>
                <h3 className="font-extrabold text-slate-900 text-xs mt-2 leading-snug">
                  {update.trendTitle}
                </h3>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {update.headline}
                </p>
                <div className="mt-2.5 p-2 bg-white rounded-lg border border-slate-200 text-[11px] text-blue-950 font-medium">
                  <strong>Skill Need:</strong> {update.skillImpact}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                <span>{update.clusterLocation}</span>
                <span>{update.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
