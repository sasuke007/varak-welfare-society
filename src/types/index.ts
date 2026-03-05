import type {
  Campaign,
  CancerType,
  Donation,
  User,
  Ngo,
  Comment,
  CampaignUpdate,
  CampaignDocument,
  State,
  District,
  MenuItem,
  Notification,
  Withdrawal,
  Subscription,
  SubscriptionPlan,
} from "@prisma/client";

// Re-export Prisma types
export type {
  Campaign,
  CancerType,
  Donation,
  User,
  Ngo,
  Comment,
  CampaignUpdate,
  CampaignDocument,
  State,
  District,
  MenuItem,
  Notification,
  Withdrawal,
  Subscription,
  SubscriptionPlan,
};

// Extended types with relations
export type CampaignWithRelations = Campaign & {
  cancerType: CancerType | null;
  createdBy: Pick<User, "id" | "firstName" | "lastName" | "avatarUrl">;
  state: State | null;
  district: District | null;
  _count?: {
    donations: number;
    comments: number;
  };
};

export type CampaignDetailData = Campaign & {
  cancerType: CancerType | null;
  createdBy: Pick<User, "id" | "firstName" | "lastName" | "avatarUrl" | "email">;
  state: State | null;
  district: District | null;
  documents: CampaignDocument[];
  updates: CampaignUpdate[];
  comments: (Comment & {
    author: Pick<User, "id" | "firstName" | "lastName" | "avatarUrl">;
  })[];
  donations: Pick<Donation, "id" | "amount" | "donorName" | "isAnonymous" | "createdAt">[];
};

export type DonationWithRelations = Donation & {
  campaign: Pick<Campaign, "id" | "title" | "slug" | "beneficiaryImage">;
  donor: Pick<User, "id" | "firstName" | "lastName" | "avatarUrl"> | null;
};

// API response types
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// Filter types
export type CampaignFilters = {
  search?: string;
  cancerType?: string;
  state?: string;
  status?: string;
  sortBy?: "recent" | "most_funded" | "most_donors" | "ending_soon";
  page?: number;
  pageSize?: number;
};
