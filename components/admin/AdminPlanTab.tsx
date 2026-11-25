'tsx'
'use client';

import React, { useState } from 'react';
import { useMLM } from '@/context/MLMContext';
import { Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AdminPlanTab: React.FC = () => {
  const { config, updateConfig } = useMLM();
  const [levels, setLevels] = useState(config.levelCommissions);
  const [success, setSuccess] = useState(false);

  const handlePercentageChange = (levelNum: number, newPct: number) => {
    const updated = levels.map((l) => (l.level === levelNum ? { ...l, percentage: newPct } : l));
    setLevels(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({ levelCommissions: levels });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">MLM Compensation Plan Configuration</h1>
        <p className="text-sm text-slate-500">Configure unilevel tier commission percentages and rules dynamically from the admin panel.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Compensation plan updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Unilevel Tier Percentages (%)</h3>
            {levels.map((lvl) => (
              <div key={lvl.level} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900">Level {lvl.level} Commission</span>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={lvl.percentage}
                    onChange={(e) => handlePercentageChange(lvl.level, parseFloat(e.target.value) || 0)}
                    className="w-24 px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-center text-blue-600 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-slate-600">%</span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-500 transition-colors"
          >
            Save Configuration Settings
          </button>
        </form>
      </div>
    </div>
  );
};
