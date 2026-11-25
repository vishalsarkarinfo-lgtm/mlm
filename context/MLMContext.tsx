'tsx'
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  ProductItem,
  OrderItem,
  CommissionItem,
  WalletTransaction,
  WithdrawalRequest,
  SupportTicket,
  AuditLog,
  MLMConfig,
} from '@/types/mlm';
import {
  INITIAL_CONFIG,
  INITIAL_MEMBERS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_COMMISSIONS,
  INITIAL_WALLET_TRANSACTIONS,
  INITIAL_WITHDRAWALS,
  INITIAL_SUPPORT_TICKETS,
  INITIAL_AUDIT_LOGS,
} from '@/lib/mockData';

interface MLMContextType {
  currentUser: UserProfile | null;
  currentView: string;
  setCurrentView: (view: string) => void;
  members: UserProfile[];
  products: ProductItem[];
  orders: OrderItem[];
  commissions: CommissionItem[];
  walletTransactions: WalletTransaction[];
  withdrawals: WithdrawalRequest[];
  supportTickets: SupportTicket[];
  auditLogs: AuditLog[];
  config: MLMConfig;
  
  // Actions
  login: (email: string) => boolean;
  logout: () => void;
  registerMember: (data: {
    name: string;
    email: string;
    phone: string;
    sponsorCode: string;
    password?: string;
  }) => { success: boolean; error?: string; member?: UserProfile };
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  purchaseProduct: (productId: string, paymentMethod: 'upi' | 'razorpay' | 'bank_transfer' | 'wallet') => boolean;
  requestWithdrawal: (amount: number, method: 'bank_transfer' | 'upi', details: string) => { success: boolean; error?: string };
  approveWithdrawal: (withdrawalId: string, notes?: string) => void;
  rejectWithdrawal: (withdrawalId: string, notes?: string) => void;
  updateKycStatus: (memberId: string, status: 'verified' | 'pending' | 'rejected', details?: any) => void;
  createSupportTicket: (subject: string, category: 'commission' | 'withdrawal' | 'kyc' | 'technical' | 'general', message: string) => void;
  replySupportTicket: (ticketId: string, message: string) => void;
  updateConfig: (newConfig: Partial<MLMConfig>) => void;
  
  // Helpers
  getSponsorByCode: (code: string) => UserProfile | undefined;
  getTeamMembers: (memberId: string) => UserProfile[];
  getMemberWalletBalance: (memberId: string) => number;
}

const MLMContext = createContext<MLMContextType | undefined>(undefined);

export const MLMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apex_current_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    // Default to John Doe for quick demo convenience
    return INITIAL_MEMBERS[1]; // John Doe
  });

  const [currentView, setCurrentView] = useState<string>('home');

  const [members, setMembers] = useState<UserProfile[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apex_members');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return INITIAL_MEMBERS;
  });

  const [products] = useState<ProductItem[]>(INITIAL_PRODUCTS);

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apex_orders');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return INITIAL_ORDERS;
  });

  const [commissions, setCommissions] = useState<CommissionItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apex_commissions');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return INITIAL_COMMISSIONS;
  });

  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apex_wallet_tx');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return INITIAL_WALLET_TRANSACTIONS;
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apex_withdrawals');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return INITIAL_WITHDRAWALS;
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apex_support');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return INITIAL_SUPPORT_TICKETS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apex_audit_logs');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return INITIAL_AUDIT_LOGS;
  });

  const [config, setConfig] = useState<MLMConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apex_config');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { console.error(e); }
      }
    }
    return INITIAL_CONFIG;
  });

  // Sync state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('apex_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('apex_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('apex_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('apex_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('apex_commissions', JSON.stringify(commissions));
  }, [commissions]);

  useEffect(() => {
    localStorage.setItem('apex_wallet_tx', JSON.stringify(walletTransactions));
  }, [walletTransactions]);

  useEffect(() => {
    localStorage.setItem('apex_withdrawals', JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem('apex_support', JSON.stringify(supportTickets));
  }, [supportTickets]);

  useEffect(() => {
    localStorage.setItem('apex_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('apex_config', JSON.stringify(config));
  }, [config]);

  // Auth Functions
  const login = (email: string): boolean => {
    const found = members.find((m) => m.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const getSponsorByCode = (code: string): UserProfile | undefined => {
    return members.find((m) => m.referralCode.toUpperCase() === code.toUpperCase());
  };

  const getTeamMembers = (memberId: string): UserProfile[] => {
    return members.filter((m) => m.sponsorId === memberId);
  };

  const getMemberWalletBalance = (memberId: string): number => {
    const txs = walletTransactions.filter((t) => t.memberId === memberId);
    if (txs.length === 0) return 1000; // Welcome bonus for demo members
    return txs[txs.length - 1].balanceAfter;
  };

  const registerMember = (data: {
    name: string;
    email: string;
    phone: string;
    sponsorCode: string;
  }) => {
    const existing = members.find((m) => m.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      return { success: false, error: 'Email already registered in the system.' };
    }

    const sponsor = getSponsorByCode(data.sponsorCode || 'APEXADMIN');
    if (!sponsor) {
      return { success: false, error: 'Invalid sponsor referral code.' };
    }

    const newId = `usr_${Date.now()}`;
    const codePart = data.name.replace(/\s+/g, '').toUpperCase().slice(0, 4);
    const newReferralCode = `${codePart}${Math.floor(1000 + Math.random() * 9000)}`;

    const newMember: UserProfile = {
      id: newId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'member',
      sponsorId: sponsor.id,
      referralCode: newReferralCode,
      status: 'active',
      kycStatus: 'unsubmitted',
      createdAt: new Date().toISOString(),
      rank: 'Associate',
    };

    setMembers((prev) => [...prev, newMember]);
    setCurrentUser(newMember);

    // Give a welcome bonus transaction
    const initialTx: WalletTransaction = {
      id: `wtx_${Date.now()}`,
      memberId: newId,
      type: 'credit',
      category: 'deposit',
      amount: 500, // Signup welcome credit
      balanceAfter: 500,
      description: 'Welcome bonus credit upon registration',
      createdAt: new Date().toISOString(),
    };
    setWalletTransactions((prev) => [...prev, initialTx]);

    return { success: true, member: newMember };
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  const purchaseProduct = (productId: string, paymentMethod: 'upi' | 'razorpay' | 'bank_transfer' | 'wallet') => {
    if (!currentUser) return false;
    const product = products.find((p) => p.id === productId);
    if (!product) return false;

    const newOrder: OrderItem = {
      id: `ord_${Date.now()}`,
      memberId: currentUser.id,
      memberName: currentUser.name,
      productId: product.id,
      productTitle: product.title,
      amount: product.price,
      businessVolume: product.businessVolume,
      status: 'completed',
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Calculate unilevel commissions up to maxLevels (e.g. 5 levels)
    let currentSponsorId = currentUser.sponsorId;
    let level = 1;
    const newCommissions: CommissionItem[] = [];
    const newTxs: WalletTransaction[] = [];

    while (currentSponsorId && level <= config.maxLevels) {
      const sponsor = members.find((m) => m.id === currentSponsorId);
      if (!sponsor) break;

      const levelRule = config.levelCommissions.find((l) => l.level === level);
      const percentage = levelRule ? levelRule.percentage : 1;
      const commissionAmount = Math.round((product.businessVolume * percentage) / 100);

      if (commissionAmount > 0) {
        const comId = `com_${Date.now()}_${level}`;
        const commission: CommissionItem = {
          id: comId,
          recipientId: sponsor.id,
          recipientName: sponsor.name,
          sourceMemberId: currentUser.id,
          sourceMemberName: currentUser.name,
          orderId: newOrder.id,
          level,
          percentage,
          amount: commissionAmount,
          status: 'approved',
          createdAt: new Date().toISOString(),
          description: `Level ${level} (${percentage}%) commission from ${currentUser.name} purchase of ${product.title}`,
        };
        newCommissions.push(commission);

        // Update sponsor wallet
        const currentBal = getMemberWalletBalance(sponsor.id);
        const newBal = currentBal + commissionAmount;
        const tx: WalletTransaction = {
          id: `wtx_${Date.now()}_${level}`,
          memberId: sponsor.id,
          type: 'credit',
          category: 'commission',
          amount: commissionAmount,
          balanceAfter: newBal,
          description: `Level ${level} commission from ${currentUser.name}`,
          referenceId: comId,
          createdAt: new Date().toISOString(),
        };
        newTxs.push(tx);
      }

      currentSponsorId = sponsor.sponsorId;
      level++;
    }

    if (newCommissions.length > 0) {
      setCommissions((prev) => [...newCommissions, ...prev]);
      setWalletTransactions((prev) => [...newTxs, ...prev]);
    }

    return true;
  };

  const requestWithdrawal = (amount: number, method: 'bank_transfer' | 'upi', details: string) => {
    if (!currentUser) return { success: false, error: 'Not logged in' };
    const currentBal = getMemberWalletBalance(currentUser.id);

    if (amount < config.minWithdrawal) {
      return { success: false, error: `Minimum withdrawal amount is ₹${config.minWithdrawal}` };
    }
    if (amount > currentBal) {
      return { success: false, error: 'Insufficient wallet balance' };
    }
    if (config.kycMandatoryForWithdrawal && currentUser.kycStatus !== 'verified') {
      return { success: false, error: 'KYC verification is mandatory before requesting withdrawals. Please submit your KYC.' };
    }

    const newWithdrawal: WithdrawalRequest = {
      id: `wd_${Date.now()}`,
      memberId: currentUser.id,
      memberName: currentUser.name,
      amount,
      method,
      destinationDetails: details,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };

    setWithdrawals((prev) => [newWithdrawal, ...prev]);

    // Deduct from wallet temporarily (pending balance)
    const newBal = currentBal - amount;
    const tx: WalletTransaction = {
      id: `wtx_${Date.now()}`,
      memberId: currentUser.id,
      type: 'debit',
      category: 'withdrawal',
      amount,
      balanceAfter: newBal,
      description: `Withdrawal request #${newWithdrawal.id} pending admin approval`,
      referenceId: newWithdrawal.id,
      createdAt: new Date().toISOString(),
    };
    setWalletTransactions((prev) => [...prev, tx]);

    return { success: true };
  };

  const approveWithdrawal = (withdrawalId: string, notes?: string) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === withdrawalId ? { ...w, status: 'approved', processedAt: new Date().toISOString(), adminNotes: notes || 'Approved by admin' } : w))
    );
    if (currentUser && currentUser.role === 'admin') {
      const log: AuditLog = {
        id: `log_${Date.now()}`,
        adminId: currentUser.id,
        adminName: currentUser.name,
        action: 'APPROVE_WITHDRAWAL',
        details: `Approved withdrawal ID ${withdrawalId}`,
        ipAddress: '127.0.0.1',
        createdAt: new Date().toISOString(),
      };
      setAuditLogs((prev) => [log, ...prev]);
    }
  };

  const rejectWithdrawal = (withdrawalId: string, notes?: string) => {
    const wd = withdrawals.find((w) => w.id === withdrawalId);
    if (wd && wd.status === 'pending') {
      // Refund amount back to member wallet
      const currentBal = getMemberWalletBalance(wd.memberId);
      const refundBal = currentBal + wd.amount;
      const tx: WalletTransaction = {
        id: `wtx_${Date.now()}`,
        memberId: wd.memberId,
        type: 'credit',
        category: 'deposit',
        amount: wd.amount,
        balanceAfter: refundBal,
        description: `Refund for rejected withdrawal #${wd.id}`,
        referenceId: wd.id,
        createdAt: new Date().toISOString(),
      };
      setWalletTransactions((prev) => [...prev, tx]);
    }

    setWithdrawals((prev) =>
      prev.map((w) => (w.id === withdrawalId ? { ...w, status: 'rejected', processedAt: new Date().toISOString(), adminNotes: notes || 'Rejected by admin' } : w))
    );

    if (currentUser && currentUser.role === 'admin') {
      const log: AuditLog = {
        id: `log_${Date.now()}`,
        adminId: currentUser.id,
        adminName: currentUser.name,
        action: 'REJECT_WITHDRAWAL',
        details: `Rejected withdrawal ID ${withdrawalId}`,
        ipAddress: '127.0.0.1',
        createdAt: new Date().toISOString(),
      };
      setAuditLogs((prev) => [log, ...prev]);
    }
  };

  const updateKycStatus = (memberId: string, status: 'verified' | 'pending' | 'rejected', details?: any) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          return {
            ...m,
            kycStatus: status,
            kycDetails: details ? { ...m.kycDetails, ...details } : m.kycDetails,
          };
        }
        return m;
      })
    );
    if (currentUser && currentUser.id === memberId) {
      setCurrentUser((prev) => (prev ? { ...prev, kycStatus: status, kycDetails: details ? { ...prev.kycDetails, ...details } : prev.kycDetails } : null));
    }
  };

  const createSupportTicket = (subject: string, category: 'commission' | 'withdrawal' | 'kyc' | 'technical' | 'general', message: string) => {
    if (!currentUser) return;
    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      memberId: currentUser.id,
      memberName: currentUser.name,
      subject,
      category,
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      messages: [
        {
          senderId: currentUser.id,
          senderName: currentUser.name,
          message,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
  };

  const replySupportTicket = (ticketId: string, message: string) => {
    if (!currentUser) return;
    const newMessage = {
      senderId: currentUser.id,
      senderName: currentUser.name,
      message,
      timestamp: new Date().toISOString(),
    };
    setSupportTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, messages: [...t.messages, newMessage], status: currentUser.role === 'admin' ? 'in_progress' : t.status } : t))
    );
  };

  const updateConfig = (newConfig: Partial<MLMConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
    if (currentUser && currentUser.role === 'admin') {
      const log: AuditLog = {
        id: `log_${Date.now()}`,
        adminId: currentUser.id,
        adminName: currentUser.name,
        action: 'UPDATE_CONFIG',
        details: 'Updated MLM platform configuration settings',
        ipAddress: '127.0.0.1',
        createdAt: new Date().toISOString(),
      };
      setAuditLogs((prev) => [log, ...prev]);
    }
  };

  return (
    <MLMContext.Provider
      value={{
        currentUser,
        currentView,
        setCurrentView,
        members,
        products,
        orders,
        commissions,
        walletTransactions,
        withdrawals,
        supportTickets,
        auditLogs,
        config,
        login,
        logout,
        registerMember,
        updateProfile,
        purchaseProduct,
        requestWithdrawal,
        approveWithdrawal,
        rejectWithdrawal,
        updateKycStatus,
        createSupportTicket,
        replySupportTicket,
        updateConfig,
        getSponsorByCode,
        getTeamMembers,
        getMemberWalletBalance,
      }}
    >
      {children}
    </MLMContext.Provider>
  );
};

export const useMLM = () => {
  const context = useContext(MLMContext);
  if (!context) {
    throw new Error('useMLM must be used within an MLMProvider');
  }
  return context;
};
