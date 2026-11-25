export type UserRole = 'admin' | 'member';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  sponsorId: string; // ID of the sponsor (referrer)
  referralCode: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  kycStatus: 'verified' | 'pending' | 'rejected' | 'unsubmitted';
  kycDetails?: {
    panNumber: string;
    aadhaarNumber: string;
    bankAccount: string;
    ifscCode: string;
    accountHolder: string;
  };
  createdAt: string;
  avatar?: string;
  rank: string;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: number;
  businessVolume: number; // BV used for commission calculation
  category: string;
  image: string;
  features: string[];
}

export interface OrderItem {
  id: string;
  memberId: string;
  memberName: string;
  productId: string;
  productTitle: string;
  amount: number;
  businessVolume: number;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: 'upi' | 'razorpay' | 'bank_transfer' | 'wallet';
  createdAt: string;
}

export interface CommissionItem {
  id: string;
  recipientId: string;
  recipientName: string;
  sourceMemberId: string;
  sourceMemberName: string;
  orderId: string;
  level: number; // 1 for direct, 2 for level 2, etc.
  percentage: number;
  amount: number;
  status: 'approved' | 'pending' | 'reversed';
  createdAt: string;
  description: string;
}

export interface WalletTransaction {
  id: string;
  memberId: string;
  type: 'credit' | 'debit';
  category: 'commission' | 'withdrawal' | 'deposit' | 'purchase';
  amount: number;
  balanceAfter: number;
  description: string;
  referenceId?: string;
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  method: 'bank_transfer' | 'upi';
  destinationDetails: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  processedAt?: string;
  adminNotes?: string;
}

export interface SupportTicket {
  id: string;
  memberId: string;
  memberName: string;
  subject: string;
  category: 'commission' | 'withdrawal' | 'kyc' | 'technical' | 'general';
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  messages: {
    senderId: string;
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}

export interface MLMConfig {
  planType: 'unilevel' | 'binary' | 'matrix';
  maxLevels: number;
  levelCommissions: { level: number; percentage: number }[];
  minWithdrawal: number;
  withdrawalFeePercentage: number;
  kycMandatoryForWithdrawal: boolean;
  companyName: string;
  supportEmail: string;
}
