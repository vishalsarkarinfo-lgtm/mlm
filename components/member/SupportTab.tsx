'tsx'
'use client';

import React, { useState } from 'react';
import { useMLM } from '@/context/MLMContext';
import { HelpCircle, MessageSquare, Plus, Send } from 'lucide-react';

export const SupportTab: React.FC = () => {
  const { currentUser, supportTickets, createSupportTicket, replySupportTicket } = useMLM();
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'commission' | 'withdrawal' | 'kyc' | 'technical' | 'general'>('general');
  const [message, setMessage] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  if (!currentUser) return null;

  const userTickets = supportTickets.filter((t) => t.memberId === currentUser.id || currentUser.role === 'admin');
  const activeTicket = supportTickets.find((t) => t.id === selectedTicketId);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createSupportTicket(subject, category, message);
    setNewModalOpen(false);
    setSubject('');
    setMessage('');
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !replyText.trim()) return;
    replySupportTicket(selectedTicketId, replyText);
    setReplyText('');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Support & Help Center</h1>
          <p className="text-sm text-slate-500">Raise support tickets and track communications with admin</p>
        </div>
        <button
          onClick={() => setNewModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-500"
        >
          <Plus className="w-4 h-4" />
          <span>New Ticket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tickets List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-200">
          <div className="px-6 py-4 bg-slate-50 font-bold text-sm text-slate-900">My Support Tickets</div>
          {userTickets.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">No support tickets found.</div>
          ) : (
            userTickets.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTicketId(t.id)}
                className={`p-6 cursor-pointer transition-colors space-y-1 ${
                  selectedTicketId === t.id ? 'bg-blue-50/60 border-l-4 border-blue-600' : 'hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-blue-600">{t.category}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    t.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{t.subject}</h4>
                <span className="text-xs text-slate-500">By {t.memberName} • {new Date(t.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>

        {/* Ticket Chat View */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[600px]">
          {activeTicket ? (
            <>
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="font-bold text-slate-900">{activeTicket.subject}</h3>
                  <span className="text-xs text-slate-500">Category: {activeTicket.category} • Member: {activeTicket.memberName}</span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 uppercase">{activeTicket.status}</span>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeTicket.messages.map((msg, i) => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-md p-4 rounded-2xl text-sm ${
                        isMe ? 'bg-blue-600 text-white rounded-br-xs' : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                      }`}>
                        <span className="block text-[10px] font-bold opacity-75 mb-1">{msg.senderName}</span>
                        <p>{msg.message}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleReply} className="p-4 border-t border-slate-200 flex gap-3">
                <input
                  type="text"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-500 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-slate-500">
              Select a support ticket from the list to view conversation.
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Create Support Ticket</h3>
              <button onClick={() => setNewModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none text-sm bg-white"
                >
                  <option value="general">General Inquiry</option>
                  <option value="commission">Commission Payout</option>
                  <option value="withdrawal">Withdrawal Request</option>
                  <option value="kyc">KYC Verification</option>
                  <option value="technical">Technical Support</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Summary of your inquiry..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detailed description..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none text-sm"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="w-1/2 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-md hover:bg-blue-500"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
