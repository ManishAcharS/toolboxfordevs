export interface ToolGuideLink {
  title: string;
  href: string;
  description?: string;
}

export interface ToolGuideFAQ {
  question: string;
  answer: string;
}

export interface ToolGuide {
  slug: string;
  introduction?: string[];
  whatItDoes?: string[];
  whyUseIt?: string[];
  keyFeatures?: string[];
  howItWorks?: string[];
  useCases?: string[];
  gettingStarted?: string[];
  limitations?: string[];
  faqs?: ToolGuideFAQ[];
  relatedArticles?: ToolGuideLink[];
  officialResources?: ToolGuideLink[];
  lastReviewed?: string;
  reviewedBy?: string;
}
