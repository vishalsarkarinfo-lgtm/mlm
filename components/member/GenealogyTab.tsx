'tsx'
'use client';

import React, { useState } from 'react';
import { useMLM } from '@/context/MLMContext';
import { Users, ChevronRight, Award, ShieldCheck, User } from 'lucide-react';

export const GenealogyTab: React.FC = () => {
  const { currentUser, members, getTeamMembers } = useMLM();
  const [expandedId, setExpandedId] = useState<string | null>(currentUser?.id || null);

  if (!currentUser) return null;

  const renderNode = (memberId: string, level: number = 1) => {
    const member = members.find((m) => m.id === memberId);
    if (!member) return null;

    const children = getTeamMembers(member.id);
    const isExpanded = expandedId === member.id;

    return (
      <div key={member.id} className="space-y-3 pl-4 sm:pl-8 border-l-2 border-blue-200 my-3">
        <div
          onClick={() => setExpandedId(isExpanded ? null : member.id)}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            member.id === currentUser.id
              ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white border-transparent shadow-md'
              : 'bg-white hover:border-blue-300 border-slate-200 text-slate-900 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
              member.id === currentUser.id ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
            }`}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm">{member.name}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  member.id === currentUser.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  L{level}
                </span>
              </div>
              <p className={`text-xs ${member.id === currentUser.id ? 'text-slate-300' : 'text-slate-500'}`}>
                Ref Code: {member.referralCode} • Rank: {member.rank}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
              {children.length} Referrals
            </span>
            {children.length > 0 && (
              <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            )}
          </div>
        </div>

        {isExpanded && children.length > 0 && (
          <div className="space-y-2 pt-1">
            {children.map((child) => renderNode(child.id, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <h1 className="text-2xl font-bold text-slate-900">Genealogy Tree View</h1>
        <p className="text-sm text-slate-500">Interactive unilevel tree hierarchy. Click any member card to expand or collapse downline branches.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
        {renderNode(currentUser.id, 1)}
      </div>
    </div>
  );
};
