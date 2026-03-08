export interface BrandProfile {
  businessName: string;
  cuisineType: {
    bm: string;
    en: string;
    zh: string;
  };
  signatureDishes: string[];
  priceRange: string;
  inferredAudience: string;
  brandPersonality: string[];
  currentMarketingMaturityScore: number;
  keyStrengths: string[];
  missedOpportunities: string[];
  culturalCommunityPrimary: string;
}

export interface CampaignBrief {
  theme: {
    bm: string;
    en: string;
    zh: string;
  };
  tagline: {
    bm: string;
    en: string;
    zh: string;
  };
  targetAudience: string;
  keyMessages: {
    bm: string[];
    en: string[];
    zh: string[];
  };
  recommendedChannels: string[];
  toneOfVoice: string;
  campaignDuration: string;
}

export interface ContentCalendarItem {
  day: number;
  postType: string;
  platform: string;
  bestPostingTime: string;
  topic: string;
}

export interface GeneratedCopy {
  bm: string;
  en: string;
  zh: string;
}

export interface GeneratedAsset {
  id: string;
  type: 'image' | 'video' | 'website' | 'copy';
  url?: string;
  content?: GeneratedCopy | string;
  metadata?: Record<string, unknown>;
}

export interface ImageGenerationResult {
  id: string;
  base64Data: string;
  mimeType: string;
  prompt: string;
}

export interface VideoGenerationResult {
  operationName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUri?: string;
}

export type GenerationStatus = {
  campaignBrief: 'idle' | 'loading' | 'done' | 'error';
  contentCalendar: 'idle' | 'loading' | 'done' | 'error';
  website: 'idle' | 'loading' | 'done' | 'error';
  images: 'idle' | 'loading' | 'done' | 'error';
  videos: 'idle' | 'loading' | 'done' | 'error';
};

export interface CampaignData {
  url: string;
  brandProfile: BrandProfile;
  campaignGoal: string;
  campaignBrief: CampaignBrief;
  contentCalendar: ContentCalendarItem[];
  assets: GeneratedAsset[];
}
