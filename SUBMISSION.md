# ⚡ Auto-Fuiyoh: The 5-Minute Marketing Co-Pilot for Malaysian F&B SMEs

## 1. Project Details

**Name:** Auto-Fuiyoh  
**Overview:**  
Auto-Fuiyoh is an AI-powered web platform that transforms the marketing and brand presence of Malaysian Food & Beverage (F&B) SMEs in under 5 minutes. A business owner pastes their Google Maps link or existing website URL, and Auto-Fuiyoh automatically analyses their brand, regenerates a mobile-first website, and produces a complete marketing campaign — including Imagen 3-generated food photography, Veo 2 TikTok videos, and trilingual copy (Bahasa Malaysia, English, Mandarin).

It is designed specifically for kopitiams, hawker stalls, and cafes who struggle with the cost, time, and language barriers of professional marketing. The name "Fuiyoh" embodies the universal Malaysian expression of amazement we want business owners to have when they see their generated campaign.

## 2. Technical Explanation (Architecture & Tech Stack)

**Frontend:** React (Next.js App Router) + TypeScript + Tailwind CSS
**Backend Orchestration:** Node.js API Routes within Next.js
**AI & Models:**

- **Google Gen AI SDK / Vertex AI:** Core integration layer.
- **Gemini 1.5 Pro:** Orchestrates the web scraping pipeline, processes unstructured website/Google Maps data, builds the Brand Profile, and generates the overarching Campaign Strategy Brief.
- **Imagen 3 (Vertex AI):** Generates photorealistic, food-safe, and culturally appropriate marketing images (hero shots, banners, lifestyle cards) at 1:1 and 9:16 aspect ratios.
- **Veo 2 (Vertex AI):** Generates 8-second 9:16 cinematic video clips showcasing signature dishes and kopitiam aesthetics for TikTok and Instagram Reels.
- **Gemini 1.5 Flash:** Handles high-volume, low-latency generation of culturally-native, trilingual social media captions (Instagram, TikTok, Facebook) and WhatsApp broadcast templates.

**Flow:**

1. A user inputs a URL. The system scrapes the URL and uses **Gemini 1.5 Pro** to build a structured JSON brand profile.
2. The user selects a Campaign Goal.
3. The platform fans out parallel requests:
   - **Imagen 3** generates 9 distinct visual assets.
   - **Veo 2** generates 3 short-form videos.
   - **Gemini 1.5 Flash** writes localized, platform-specific copy for the assets.
   - **Gemini 1.5 Pro** generates raw HTML/CSS for a deployable single-page website.
4. All generated content is bundled into an exportable ZIP file.

## 3. Prompt Design & Engineering

Our prompt engineering focused heavily on **cultural localization and JSON structuring**:

**1. Brand Scraping & Analysis (Gemini 1.5 Pro):**
We designed a strict structured data extraction prompt. We instructed the model to act as a "Malaysian F&B marketing analyst" and constrained its output to a predefined JSON schema containing fields like `inferred_audience`, `brand_personality`, and `cultural_community_primary`. This allowed our UI to deterministically bind to the model's insights.

**2. Trilingual Caption Generation (Gemini 1.5 Flash):**
We explicitly engineered negative constraints for the translation. The prompt instructed: _"Do NOT directly translate — write each version natively for its audience."_ It was guided to use conversational Malay (avoiding overly formal government Bahasa), Malaysian English idioms (avoiding British/American phrasing), and Simplified Mandarin tailored to the Malaysian Chinese community (avoiding mainland Chinese tone).

**3. Visual Prompting (Imagen 3 & Veo 2):**
Prompts were dynamically constructed by combining user data (business name, signature dish) with AI-selected themes and aesthetics (from Gemini Pro). We appended strong style modifiers to ensure consistency: _"Professional food photography of [dish], [cuisine] cuisine, warm natural lighting, vibrant colors, Malaysian restaurant."_

## 4. GitHub Link

[Insert Public GitHub Repository URL Here]

## 5. 1-Minute Demo Video

[Insert Link to YouTube/Drive Demo Video Here]

## 6. Deployed Application Link

[Insert Live Google Cloud Run or Netlify/Vercel URL Here]
