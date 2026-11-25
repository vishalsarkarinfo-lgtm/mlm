'tsx'
'use client';

import React from 'react';
import { useMLM } from '@/context/MLMContext';
import { Users, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';

export const TeamTab: React.FC = () => {
  const { currentUser, members, getTeamMembers } = useMLM();

  if (!currentUser) return null;

  const directTeam = getTeamMembers(currentUser.id);

  // Also collect level 2 team members
  const level2Team = members.filter((m) => directTeam.some((d) => d.id === m.sponsorId));
  const allTeam = [...directTeam, ...level2Team];

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Team Network</h1>
          <p className="text-sm text-slate-500">Manage and view your direct and indirect unilevel downline members</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <span className="text-2xl font-extrabold text-blue-600">{directTeam.length}</span>
            <span className="block text-xs text-slate-500 font-semibold">Direct Referrals (L1)</span>
          </div>
          <div className="text-right border-l pl-4 border-slate-200">
            <span className="text-2xl font-extrabold text-indigo-600">{allTeam.length}</span>
            <span className="block text-xs text-slate-500 font-semibold">Total Team (L1 + L2)</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Downline Members List</h3>
          <span className="text-xs text-slate-500">Active status monitored</span>
        </div>

        <div className="divide-y divide-slate-200">
          {allTeam.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">No team members yet. Share your referral link to build your unilevel downline!</div>
          ) : (
            allTeam.map((member) => {
              const isDirect = member.sponsorId === currentUser.id;
              return (
                <div key={member.id} className="px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                      {member.name.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">{member.name}</h4>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${isDirect ? 'bg-blue-50 text-blue-700' : 'bg-indigo-50 text-indigo-700'}`}>
                          {isDirect ? 'Level 1 (Direct)' : 'Level 2'}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {member.email}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {member.phone}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined {new Date(member.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> {member.rank}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
