'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { ShieldAlert, Calendar } from 'lucide-react';

export const AdminAuditTab: React.FC = () => {
  const { auditLogs } = useMLM();

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Security Audit Logs</h1>
          <p className="text-sm text-slate-500">Immutable audit log of sensitive administrative actions and configuration updates</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-200">
          {auditLogs.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">No audit logs recorded.</div>
          ) : (
            auditLogs.map((log) => (
              <div key={log.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 uppercase">
                      {log.action}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{log.details}</h4>
                  </div>
                  <p className="text-xs text-slate-500">Admin: {log.adminName} • IP: {log.ipAddress}</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(log.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
