import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini API Client
export const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }
  return new GoogleGenAI({ apiKey });
};

// Prompt Templates
export const BRAND_ANALYSIS_PROMPT = `
You are an expert Malaysian F&B marketing analyst. 
Analyse the following business data scraped from their Google Maps listing and website.

Business Data:
{scraped_content}

Extract and return a structured JSON with:
- businessName
- cuisineType (in bm, en, zh)
- signatureDishes (top 5)
- priceRange ($ / $$ / $$$)
- inferredAudience (age, ethnicity mix, occasion)
- brandPersonality (3 adjectives)
- currentMarketingMaturityScore (1-10)
- keyStrengths (from reviews)
- missedOpportunities (from reviews + competitors)
- culturalCommunityPrimary (Malay / Chinese / Indian / Mixed)

All output must reflect deep knowledge of Malaysian consumer culture.
`;

export const CAMPAIGN_BRIEF_PROMPT = `
You are an expert Malaysian F&B marketing strategist.
Based on the following Brand Profile and Campaign Goal, generate a campaign brief.

Brand Profile:
{brand_profile}

Campaign Goal:
{campaign_goal}

Extract and return a structured JSON with:
- theme (in bm, en, zh)
- tagline (in bm, en, zh)
- targetAudience
- keyMessages (3 core messages per language: bm, en, zh)
- recommendedChannels (list of platforms)
- toneOfVoice
- campaignDuration
`;

export const CONTENT_CALENDAR_PROMPT = `
You are an expert Malaysian F&B marketing strategist.
Based on the following Brand Profile and Campaign Goal, generate a 30-day content calendar.

Brand Profile:
{brand_profile}

Campaign Goal:
{campaign_goal}

Extract and return a structured JSON array of 30 items, each containing:
- day (1-30)
- postType (image, video, story, text)
- platform (Instagram, TikTok, Facebook, WhatsApp)
- bestPostingTime (e.g., 11am, 6pm)
- topic (brief description of the post content)
`;

export const CAPTION_GENERATION_PROMPT = `
You are a Malaysian F&B social media copywriter. 
Write captions in Bahasa Malaysia, English, and Mandarin for the following:

Business: {business_name}
Dish/Promotion: {content_subject}
Campaign Goal: {campaign_goal}
Platform: {platform}
Tone: {tone_guide}

Requirements:
- BM caption: conversational, warm, use occasional Manglish if appropriate
- EN caption: Malaysian English, relatable, avoid formal British English
- ZH caption: written for Malaysian Chinese audience, not mainland China or Taiwan tone
- Each caption must include a clear CTA
- Include relevant Malaysian hashtags for the platform
- Do NOT directly translate — write each version natively for its audience

Extract and return a structured JSON with:
- bm (Bahasa Malaysia caption)
- en (English caption)
- zh (Mandarin caption)
`;

export const WEBSITE_GENERATION_PROMPT = `
You are an expert web developer and designer for Malaysian F&B businesses.
Generate a complete, modern, mobile-first, single-file HTML website for the following business.
Use inline CSS or Tailwind CSS via CDN.
The website must include:
- Hero section with business name, tagline, and a placeholder hero image (use https://TEMP_IMAGE_HERO)
- About / Story section
- Signature Menu Items section (use https://TEMP_IMAGE_DISH_0, https://TEMP_IMAGE_DISH_1, HTTPS://TEMP_IMAGE_DISH_2 for the first 3 dish images)
- Operating Hours and Location
- Contact / WhatsApp CTA button
- Customer Reviews section
- Promotions / Seasonal Special banner

Brand Profile:
{brand_profile}

Campaign Brief:
{campaign_brief}

Return ONLY the raw HTML string, no markdown formatting, no \`\`\`html tags.
`;
