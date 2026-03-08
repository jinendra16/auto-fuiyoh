# ⚡ Auto-Fuiyoh
## Product Requirements Document (PRD)
**Version:** 1.0 — Initial Draft  
**Status:** Draft — Pending Stakeholder Review  
**Product Type:** Web Application (SaaS)  
**Target Market:** Malaysian F&B SMEs — Kopitiams, Hawker Stalls, Restaurants  
**Prepared For:** Google x Malaysia Hackathon — Digital Economy & Smarter SMBs Track  
**Classification:** Confidential  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Product Vision & Goals](#3-product-vision--goals)
4. [Target Users & Personas](#4-target-users--personas)
5. [Market Opportunity](#5-market-opportunity)
6. [Product Overview & Core Loop](#6-product-overview--core-loop)
7. [Feature Requirements](#7-feature-requirements)
8. [Google AI Model Stack](#8-google-ai-model-stack)
9. [User Flows](#9-user-flows)
10. [Technical Architecture](#10-technical-architecture)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [Content & Localisation Requirements](#12-content--localisation-requirements)
13. [MVP Scope](#13-mvp-scope)
14. [Success Metrics & KPIs](#14-success-metrics--kpis)
15. [Risks & Mitigations](#15-risks--mitigations)
16. [Timeline & Milestones](#16-timeline--milestones)
17. [Open Questions](#17-open-questions)

---

## 1. Executive Summary

Auto-Fuiyoh is an AI-powered web platform that transforms the marketing and brand presence of Malaysian Food & Beverage (F&B) SMEs in under 5 minutes. A business owner pastes their Google Maps link or existing website URL, and Auto-Fuiyoh automatically analyses their brand, regenerates their website UI, and produces a complete, ready-to-deploy marketing campaign — including AI-generated social media posts, TikTok videos, trilingual copy in Bahasa Malaysia, English, and Mandarin, and a 30-day content calendar.

The platform is built on Google's AI model ecosystem — leveraging Gemini 1.5 Pro for analysis and strategy, Imagen 3 for visual content, Veo 2 for video generation, and Gemini Flash for high-volume trilingual copywriting — making it the most comprehensive AI marketing co-pilot ever built for Malaysian SMEs.

The name "Fuiyoh" is deliberately Malaysian — it is the universal expression of amazement used across all ethnicities in Malaysia, embodying the exact reaction we want business owners to have when they see what the platform produces for them.

---

## 2. Problem Statement

### 2.1 The Malaysian SME Marketing Gap

Malaysia has over 1.2 million registered SMEs, with F&B being one of the largest segments. The overwhelming majority — particularly kopitiams, hawker stalls, and independent restaurants — operate with zero or near-zero marketing budgets and no dedicated marketing personnel.

These businesses face a compounding set of challenges:

- **No digital presence:** Most have no website, or a poorly maintained one that was set up years ago and never updated
- **Language barrier in marketing:** Malaysia's trilingual market (BM, English, Mandarin) means a single post must resonate across three culturally distinct audiences. Most owners are fluent in one or two languages but not all three
- **No time:** F&B operators work 12–16 hour days. Creating social media content, writing captions, or redesigning a website is not feasible alongside running a kitchen
- **No budget for agencies:** A professional marketing agency retainer costs RM 3,000–10,000/month, which is completely out of reach for a stall owner earning RM 5,000–15,000/month net
- **Generic tools don't work:** Tools like Canva, ChatGPT, or Mailchimp are not localised for Malaysia. They don't understand that "economy rice," "nasi campur," and "chap fan" are the same dish with three different audience expectations, or that Hari Raya content should feel different from Chinese New Year content even when promoting the same product
- **Poor discoverability:** Most F&B SMEs are invisible on Google Search and social media, losing customers to better-marketed competitors who may serve inferior food

### 2.2 The Opportunity Cost

A kopitiam that runs zero marketing is leaving significant revenue on the table. Studies from similar markets show that consistent social media presence alone can increase foot traffic by 15–30% for F&B businesses. For a stall doing RM 20,000/month in revenue, that is a RM 3,000–6,000/month opportunity being missed — entirely due to a lack of accessible marketing tools.

### 2.3 Why Now

The convergence of three factors makes this the right moment to build Auto-Fuiyoh:

1. **Generative AI maturity:** Gemini, Imagen, and Veo are now capable of producing genuinely high-quality, localised content at scale
2. **SME digital urgency:** Post-pandemic, even traditional F&B operators understand they need digital presence — they just don't know how to get it
3. **Google AI ecosystem:** The breadth of Google's model suite means a single platform can now handle the full content pipeline — analysis, copywriting, images, and video — without stitching together multiple third-party services

---

## 3. Product Vision & Goals

### 3.1 Vision Statement

> **To be the marketing team that every Malaysian F&B SME owner wishes they could afford.**

Auto-Fuiyoh democratises professional-grade marketing by putting the full power of Google's AI models into the hands of a hawker stall owner who has never used a marketing tool in their life.

### 3.2 Product Goals

| Goal | Description |
|---|---|
| **Accessibility** | Any F&B SME owner, regardless of tech literacy, can produce professional marketing materials in under 10 minutes |
| **Localisation** | All output is genuinely Malaysian — culturally aware, trilingual, and calibrated to local consumer behaviour |
| **Comprehensiveness** | A single session produces everything needed: website, campaign strategy, images, videos, and copy |
| **Actionability** | All output is ready to use immediately — no editing, no design skills, no agency required |
| **Affordability** | Priced within reach of micro-businesses (freemium model with paid tiers) |

### 3.3 Out of Scope (v1.0)

- Direct social media scheduling and posting (planned for v1.5)
- E-commerce / online ordering integration (planned for v2.0)
- Non-F&B SME verticals (planned for v2.0)
- Mobile native app (web-first, mobile-responsive)
- CRM or customer data management

---

## 4. Target Users & Personas

### Persona 1 — Ah Keong, The Kopitiam Owner
- **Age:** 52
- **Business:** 3rd generation kopitiam in Chow Kit, KL. Serves nasi lemak, kopi, and char koay teow
- **Revenue:** ~RM 18,000/month
- **Tech literacy:** Low. Uses WhatsApp daily, has a Facebook page that hasn't been updated in 2 years
- **Languages:** Cantonese, Malay, basic English
- **Pain point:** "My food is good but the new mamak down the road always has a queue because they post on TikTok every day. I don't know how to do that."
- **Goal:** More lunchtime customers, especially office workers from nearby buildings
- **How Auto-Fuiyoh helps:** Generates a TikTok video of his signature dish with Mandarin and Malay captions, a refreshed website, and a Hari Raya promotion campaign — all from his Google Maps link

### Persona 2 — Nurul, The Home Baker Turned Café Owner
- **Age:** 31
- **Business:** Opened a small café in Subang Jaya 18 months ago. Specialises in local kuih and specialty coffee
- **Revenue:** ~RM 12,000/month
- **Tech literacy:** Medium. Active on Instagram but struggles with consistency and professional-looking content
- **Languages:** Malay, English
- **Pain point:** "I spend 2 hours every Sunday trying to plan content for the week and it still looks amateurish. I can't afford a photographer."
- **Goal:** Build a stronger Instagram presence and attract the weekend brunch crowd
- **How Auto-Fuiyoh helps:** Generates 9 Imagen 3-powered food photography-style posts, a 30-day content calendar, and English + BM captions optimised for Instagram reach

### Persona 3 — Mr. Tan, The Hawker Stall Chain Aspirant
- **Age:** 44
- **Business:** Runs 2 successful wonton mee stalls in Penang and wants to expand to KL
- **Revenue:** ~RM 35,000/month combined
- **Tech literacy:** Medium-high. Has tried hiring a freelancer for marketing but results were inconsistent
- **Languages:** Hokkien, Mandarin, English, basic Malay
- **Pain point:** "I need to build a brand, not just a stall. If I want to franchise one day, I need people to know my name."
- **Goal:** Brand differentiation, a proper website, and Mandarin-language content targeting the Chinese community in KL
- **How Auto-Fuiyoh helps:** Generates a branded website with franchise enquiry CTA, Mandarin-first social content, and a brand identity brief

---

## 5. Market Opportunity

### 5.1 Total Addressable Market (TAM)

- **1.2 million SMEs** in Malaysia (SME Corp Malaysia, 2024)
- F&B is the **2nd largest SME sector**, representing ~200,000 businesses
- An estimated **85% have no professional website** and **70% have no consistent social media presence**

### 5.2 Serviceable Addressable Market (SAM)

- ~120,000 F&B SMEs in the Klang Valley, Penang, and Johor Bahru — the primary urban markets
- Of these, ~80,000 have smartphones and basic internet connectivity required to use the platform

### 5.3 Serviceable Obtainable Market (SOM) — Year 1

- Target: **5,000 active monthly users** within 12 months of launch
- At RM 49/month average revenue per user: **RM 245,000 MRR / ~RM 2.94M ARR**

### 5.4 Competitive Landscape

| Competitor | What They Do | Why Auto-Fuiyoh Wins |
|---|---|---|
| Canva | Design templates | Not AI-driven, not localised, requires design skills |
| ChatGPT | Text generation | No images/video, not culturally Malaysian, no website gen |
| Freelance agencies | Full service marketing | 10–50x more expensive, slow turnaround |
| Meta Business Suite | Ad management | Requires existing assets, no content generation |
| Shopify/Wordpress | Website builders | Requires significant time and technical skill |
| **Auto-Fuiyoh** | **End-to-end AI transformation** | **Localised, instant, full-stack, affordable** |

---

## 6. Product Overview & Core Loop

### 6.1 The Auto-Fuiyoh Core Loop

```
┌─────────────────────────────────────────────────────────────┐
│                    THE AUTO-FUIYOH LOOP                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. INPUT          User pastes Google Maps URL or website    │
│       │                                                       │
│       ▼                                                       │
│  2. ANALYSE        Gemini 1.5 Pro scrapes & understands      │
│       │            brand, menu, reviews, photos, audience    │
│       ▼                                                       │
│  3. STRATEGISE     AI generates campaign brief, goals,       │
│       │            positioning, and content plan             │
│       ▼                                                       │
│  4. GENERATE ⚡    Website UI + Images (Imagen 3) +          │
│       │            Videos (Veo 2) + Copy (Gemini Flash)      │
│       ▼                                                       │
│  5. REVIEW         Owner previews all assets, can           │
│       │            regenerate individual items               │
│       ▼                                                       │
│  6. EXPORT         Download ZIP / deploy website /          │
│                    copy-paste to social media                │
│                                                               │
│           FUIYOH. 🎉                                          │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Platform Modules

The platform consists of five core modules:

| Module | Name | Description |
|---|---|---|
| M1 | **Brand Analyser** | Ingests URL, scrapes data, builds brand profile |
| M2 | **Campaign Strategist** | Generates campaign brief, goals, and 30-day calendar |
| M3 | **Website Regenerator** | Produces new website UI code, deployable instantly |
| M4 | **Content Factory** | Generates images, videos, captions, and ad copy |
| M5 | **Export Hub** | Packages and delivers all assets for download/deployment |

---

## 7. Feature Requirements

### 7.1 M1 — Brand Analyser

#### F-001 — URL Ingestion
- **Priority:** P0 (Must Have)
- **Description:** User inputs a Google Maps URL or existing website URL
- **Acceptance Criteria:**
  - System accepts Google Maps short URLs, full Google Maps URLs, and standard HTTP/HTTPS website URLs
  - System handles invalid or unreachable URLs gracefully with a clear error message
  - Processing begins within 3 seconds of URL submission

#### F-002 — Automated Brand Scraping
- **Priority:** P0 (Must Have)
- **Description:** Gemini 1.5 Pro scrapes and analyses all publicly available information about the business
- **Data extracted includes:**
  - Business name, address, operating hours
  - Cuisine type and menu items (from website, Google Business, or food delivery platforms)
  - Google review sentiment and recurring themes (e.g., "fast service," "great laksa")
  - Existing photos and visual brand identity
  - Price range and target demographic signals
  - Competitor businesses in the same area (via Google Maps proximity)
- **Acceptance Criteria:**
  - Extraction completes within 30 seconds for 90% of inputs
  - System surfaces a "Brand Profile Summary" card the user can review and correct
  - User can manually edit any extracted field before proceeding

#### F-003 — Brand Profile Summary
- **Priority:** P0 (Must Have)
- **Description:** A structured summary card presented to the user showing what the AI has understood about their business
- **Fields displayed:** Business name, cuisine type, signature dishes, price range, inferred audience, brand personality score, current marketing maturity score
- **Acceptance Criteria:**
  - Summary is presented in all three languages (BM, EN, ZH) simultaneously
  - User can approve or edit any field
  - Editing a field triggers downstream regeneration of relevant assets

#### F-004 — Competitor Snapshot
- **Priority:** P1 (Should Have)**
- **Description:** System identifies 3–5 nearby competitors and benchmarks the user's brand against them
- **Output:** Simple comparison table showing digital presence score, review rating, estimated social media activity
- **Acceptance Criteria:**
  - Competitor data is sourced from Google Maps proximity search
  - Data is presented as opportunity gaps, not as criticism of competitors

---

### 7.2 M2 — Campaign Strategist

#### F-005 — Campaign Goal Selection
- **Priority:** P0 (Must Have)
- **Description:** User selects the primary objective of their marketing campaign
- **Goal options:**
  - 🍽️ Increase dine-in foot traffic
  - 📦 Boost food delivery orders
  - 🎉 Promote a festive special (Hari Raya, CNY, Deepavali, etc.)
  - 🆕 Launch a new menu item or branch
  - 🏆 Build long-term brand awareness
- **Acceptance Criteria:**
  - User can select one primary goal and one secondary goal
  - Goal selection updates the campaign strategy, content calendar, and messaging tone downstream
  - Festive goal option automatically detects and surfaces the next upcoming Malaysian public holiday

#### F-006 — AI Campaign Brief Generation
- **Priority:** P0 (Must Have)
- **Description:** Gemini 1.5 Pro generates a full campaign brief based on brand profile + selected goal
- **Brief includes:**
  - Campaign theme and tagline (in BM, EN, ZH)
  - Target audience definition
  - Key messages (3 core messages per language)
  - Recommended channels (Instagram, TikTok, Facebook, WhatsApp, Google Business)
  - Tone of voice guide
  - Campaign duration and phasing recommendation
- **Acceptance Criteria:**
  - Brief is generated within 15 seconds
  - All copy is culturally appropriate and avoids direct translation (must feel native in each language)
  - User can regenerate any individual section of the brief

#### F-007 — 30-Day Content Calendar
- **Priority:** P1 (Should Have)
- **Description:** Auto-generates a 30-day posting calendar with recommended post topics, formats, and timings
- **Calendar includes:**
  - Post type per day (image, video, story, text)
  - Platform recommendation per post
  - Best posting time based on Malaysian F&B audience behaviour (e.g., 11am for lunch posts, 6pm for dinner promotions)
  - Festive dates and national events pre-populated
- **Acceptance Criteria:**
  - Calendar is exportable as CSV or PNG
  - Each calendar slot links to the corresponding generated content asset
  - User can drag and reschedule calendar items

#### F-008 — Audience Targeting Recommendations
- **Priority:** P2 (Nice to Have)**
- **Description:** AI recommends Facebook/Instagram ad audience parameters based on business location and target demographic
- **Output:** Suggested interest targeting, radius, age range, and language targeting settings for Meta Ads Manager
- **Acceptance Criteria:**
  - Output is formatted as a copy-pasteable guide for Meta Ads Manager
  - Recommendations are explained in plain language, not ad-platform jargon

---

### 7.3 M3 — Website Regenerator

#### F-009 — AI Website UI Generation
- **Priority:** P0 (Must Have)
- **Description:** Gemini generates a complete, modern, mobile-first website for the business
- **Website sections generated:**
  - Hero section with business name, tagline, and hero image
  - About / Story section
  - Signature Menu Items section (with AI-generated food imagery)
  - Operating Hours and Location (with embedded Google Maps)
  - Contact / WhatsApp CTA button
  - Customer Reviews section (pulled from Google)
  - Promotions / Seasonal Special banner
- **Technical output:** Clean, deployable HTML/CSS/JS single file
- **Acceptance Criteria:**
  - Website renders correctly on mobile (375px), tablet (768px), and desktop (1280px)
  - Website loads in under 3 seconds
  - All text is in the user's preferred primary language with toggle for secondary languages
  - User can preview website in-browser before downloading

#### F-010 — One-Click Website Deployment
- **Priority:** P1 (Should Have)
- **Description:** User can deploy the generated website to a live URL with one click
- **Deployment targets:** Netlify (primary), Vercel (secondary), custom domain support
- **Acceptance Criteria:**
  - Deployment completes within 60 seconds
  - User receives a shareable live URL immediately
  - Custom domain connection guide is provided for users with existing domains

#### F-011 — Website Content Editing
- **Priority:** P1 (Should Have)
- **Description:** User can edit text content on the generated website via a simple inline editor before deployment
- **Acceptance Criteria:**
  - Inline editing works for all text blocks
  - Image replacement supported via drag-and-drop upload
  - Changes are saved in real time and reflected in preview

---

### 7.4 M4 — Content Factory

#### F-012 — Instagram Post Image Generation (Imagen 3)
- **Priority:** P0 (Must Have)
- **Description:** Imagen 3 generates a set of 9 professional-quality social media images for Instagram
- **Image types generated:**
  - 3x Hero food shots (signature dishes in appetising lighting)
  - 2x Promotional banners (sale, festive, new item)
  - 2x Brand lifestyle images (ambience, interior, team)
  - 2x Customer testimonial quote cards
- **Format:** 1080x1080px (square) and 1080x1920px (Story/Reel cover) variants for each
- **Acceptance Criteria:**
  - All images are food-safe and culturally appropriate (e.g., halal-sensitive when applicable)
  - User can regenerate individual images with a "Try Again" button
  - Images include auto-generated caption text overlays in the selected primary language
  - Download available as PNG, individually or as ZIP

#### F-013 — TikTok / Instagram Reel Video Generation (Veo 2)
- **Priority:** P0 (Must Have)
- **Description:** Veo 2 generates 3 short-form videos (15–30 seconds each) optimised for TikTok and Instagram Reels
- **Video types:**
  - V1 — "Come Try Our [Signature Dish]" — appetising close-up food video with BM voiceover
  - V2 — "Our Story" — brand introduction montage with ambient kopitiam atmosphere
  - V3 — "Today's Special" — daily/weekly special announcement template
- **Format:** 9:16 vertical, 1080x1920px, MP4
- **Acceptance Criteria:**
  - Each video includes AI-generated voiceover narration (Google TTS, Malaysian-accented)
  - Auto-generated subtitles in the user's selected language(s)
  - Videos are under 30 seconds to comply with TikTok best practice
  - User can regenerate videos individually

#### F-014 — Trilingual Caption Generation (Gemini Flash)
- **Priority:** P0 (Must Have)
- **Description:** Every generated image and video is paired with platform-optimised captions in BM, English, and Mandarin
- **Caption formats per platform:**
  - Instagram: 150–220 words, emoji usage, hashtag sets (Malaysian F&B specific)
  - TikTok: Short punchy text, trend-aware hooks, trending Malaysian hashtags
  - Facebook: Conversational, community-oriented, slightly longer format
  - WhatsApp Broadcast: Compact, direct CTA, no hashtags
- **Acceptance Criteria:**
  - All captions feel culturally native — not translated, but written for each language's audience
  - Mandarin copy uses Simplified Chinese (primary) with Traditional Chinese option
  - Captions are copy-pasteable with one click
  - Hashtag sets are updated monthly based on trending F&B topics in Malaysia

#### F-015 — WhatsApp Broadcast Templates
- **Priority:** P1 (Should Have)
- **Description:** Generates 5 ready-to-send WhatsApp broadcast messages for different occasions
- **Template types:** New item launch, festive greeting + promotion, weekly special, customer win-back ("We miss you!"), event announcement
- **Acceptance Criteria:**
  - Messages are under 300 characters (WhatsApp best practice)
  - Available in BM, English, and Mandarin
  - Include a clear CTA (e.g., "Call us," "Directions," "Order now")

#### F-016 — Google Business Profile Copy
- **Priority:** P1 (Should Have)
- **Description:** Generates optimised Google Business Profile description, post copy, and Q&A responses
- **Acceptance Criteria:**
  - Business description is keyword-optimised for local search (e.g., "best nasi lemak Chow Kit KL")
  - Copy is within Google Business character limits
  - Available in all three languages

#### F-017 — Audio Ad Generation
- **Priority:** P2 (Nice to Have)
- **Description:** Generates a 30-second radio-style audio advertisement using Google TTS with Malaysian English/BM/Mandarin narration
- **Acceptance Criteria:**
  - Audio is exported as MP3
  - User can select narrator language and gender
  - Script is editable before audio generation

---

### 7.5 M5 — Export Hub

#### F-018 — Asset ZIP Download
- **Priority:** P0 (Must Have)
- **Description:** All generated assets are bundled into a single organised ZIP file for download
- **ZIP structure:**
  ```
  auto-fuiyoh-[business-name]/
  ├── website/
  │   └── index.html
  ├── instagram/
  │   ├── posts/ (9 images, square format)
  │   └── stories/ (9 images, vertical format)
  ├── tiktok/
  │   └── videos/ (3 MP4 files)
  ├── captions/
  │   ├── captions-EN.txt
  │   ├── captions-BM.txt
  │   └── captions-ZH.txt
  ├── whatsapp/
  │   └── broadcast-templates.txt
  └── campaign-brief.pdf
  ```
- **Acceptance Criteria:**
  - ZIP download initiates within 5 seconds of request
  - ZIP file size does not exceed 150MB
  - All filenames are human-readable and organised logically

#### F-019 — Campaign Brief PDF
- **Priority:** P1 (Should Have)
- **Description:** A professionally formatted PDF summarising the entire campaign strategy, content plan, and all generated copy
- **Acceptance Criteria:**
  - PDF is branded with Auto-Fuiyoh and the business's name
  - Includes the 30-day content calendar as a visual grid
  - Suitable for sharing with a freelancer or business partner

---

## 8. Google AI Model Stack

| Function | Google Model | Justification |
|---|---|---|
| Business analysis & brand understanding | **Gemini 1.5 Pro** | Long context window handles full website scraping + review analysis in one pass |
| Campaign strategy & copywriting | **Gemini 1.5 Pro** | Complex reasoning required for culturally nuanced strategy |
| High-volume trilingual caption generation | **Gemini 1.5 Flash** | Fast and cost-efficient for bulk copy generation across 3 languages |
| Instagram & banner image generation | **Imagen 3** | State-of-the-art photorealistic food photography and graphic generation |
| TikTok / Reel video generation | **Veo 2** | High-quality short-form video generation for social media |
| Voiceover narration | **Google Cloud TTS (Neural2)** | Malaysian English, BM, and Mandarin voice support |
| On-device / lightweight suggestions | **Gemini Nano** | Low-latency autocomplete and micro-suggestions in the editor |
| Semantic search for competitor matching | **Vertex AI Embeddings** | Nearest-neighbour search for competitor business identification |

### 8.1 Model Interaction Architecture

```
User Input (URL)
      │
      ▼
Gemini 1.5 Pro ──── Brand Profile ────► Gemini Flash ──► Trilingual Copy
      │                                                         │
      ▼                                                         ▼
Campaign Brief ──────────────────────────────────────► Content Calendar
      │
      ├──► Imagen 3 ──────────────────────────────────► Images (9)
      │
      ├──► Veo 2 ────────────────────────────────────► Videos (3)
      │
      ├──► Google TTS ────────────────────────────────► Audio Ad (1)
      │
      └──► Gemini + Code Gen ──────────────────────────► Website HTML
```

---

## 9. User Flows

### 9.1 Primary User Flow — First-Time Session

```
1. LANDING PAGE
   └── User sees value proposition: "Transform your stall's marketing in 5 minutes"
   └── CTA: "Start Free — Paste Your Link"

2. URL INPUT SCREEN
   └── Input field: "Paste your Google Maps or website link"
   └── Example links shown for guidance
   └── "Analyse My Business" button

3. ANALYSIS IN PROGRESS (30 seconds)
   └── Animated progress screen
   └── Live status: "Reading your menu... Analysing your reviews... Understanding your brand..."

4. BRAND PROFILE REVIEW
   └── Summary card with all extracted data
   └── User reviews and edits any incorrect fields
   └── "This looks right — let's build my campaign" CTA

5. GOAL SELECTION
   └── "What do you want to achieve?" 
   └── Goal cards (dine-in / delivery / festive / new item / brand awareness)
   └── "Generate My Campaign" button

6. GENERATION IN PROGRESS (60–90 seconds)
   └── Split screen showing assets populating in real time
   └── Website preview renders first
   └── Images appear one by one
   └── Videos load last

7. RESULTS DASHBOARD
   └── Tabbed interface: Website | Images | Videos | Captions | Calendar
   └── Each asset has a "Regenerate" button
   └── "Export Everything" CTA (prominent)

8. EXPORT
   └── Download ZIP
   └── Optional: One-click website deployment
   └── Share campaign brief link
```

### 9.2 Returning User Flow

```
1. Login → Dashboard shows previous sessions
2. "Refresh Campaign" — regenerates content for a new month or occasion
3. "Festive Mode" — triggered automatically as Malaysian public holidays approach
4── Quick Export — re-download previous assets
```

---

## 10. Technical Architecture

### 10.1 Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend** | React + TypeScript + Tailwind CSS | Component-based, rapid development, responsive |
| **Backend** | Node.js + Express / FastAPI (Python) | Dual stack — Node for API gateway, Python for AI pipeline |
| **AI Orchestration** | Google Vertex AI + Gemini API | Unified access to all Google AI models |
| **Image Generation** | Vertex AI — Imagen 3 API | |
| **Video Generation** | Vertex AI — Veo 2 API | |
| **Web Scraping** | Puppeteer + Google Places API | JS rendering for modern websites + structured Places data |
| **Website Deployment** | Netlify API | Programmatic deployment of generated HTML |
| **File Storage** | Google Cloud Storage | Asset storage and ZIP packaging |
| **Database** | Firebase Firestore | Session data, user profiles, generated asset metadata |
| **Authentication** | Firebase Auth (Google Sign-In) | Low-friction onboarding with Google account |
| **CDN** | Google Cloud CDN | Fast asset delivery |
| **Hosting** | Google Cloud Run | Serverless, scales to zero |

### 10.2 API Architecture

```
Client (React)
     │
     ▼
API Gateway (Cloud Run)
     │
     ├──► /api/analyse        → Scraping pipeline (Puppeteer + Places API + Gemini 1.5 Pro)
     │
     ├──► /api/strategise     → Campaign brief generation (Gemini 1.5 Pro)
     │
     ├──► /api/generate/website  → Website HTML generation (Gemini + code gen)
     │
     ├──► /api/generate/images   → Imagen 3 pipeline
     │
     ├──► /api/generate/videos   → Veo 2 pipeline
     │
     ├──► /api/generate/copy     → Gemini Flash multilingual pipeline
     │
     └──► /api/export            → GCS bundling + ZIP generation
```

### 10.3 Data Privacy & Compliance

- All scraped data is publicly available business information only (Google Maps, public websites)
- No personal customer data is collected or stored
- Generated assets are stored for 30 days, then deleted unless user has an active subscription
- User data is stored in compliance with Malaysia's Personal Data Protection Act (PDPA) 2010
- Google Cloud infrastructure is used in the Singapore region (closest to Malaysia) for latency and data residency considerations

---

## 11. Non-Functional Requirements

### 11.1 Performance
- URL analysis completes in under 30 seconds for 90th percentile of inputs
- Full asset generation (website + 9 images + 3 videos + copy) completes in under 3 minutes
- Web app loads in under 2 seconds on a 4G connection
- ZIP download of all assets initiates within 5 seconds

### 11.2 Reliability
- Platform uptime SLA: 99.5%
- AI pipeline failures must not expose raw error messages to the user — a graceful fallback message is shown and the failed asset slot shows a "Retry" option
- Session state is preserved — if a user's browser closes mid-generation, they can resume from the results screen on next login

### 11.3 Scalability
- Platform must support 1,000 concurrent generation sessions at launch
- Horizontal scaling via Cloud Run ensures burst capacity during marketing events (e.g., if featured in Harian Metro or goes viral on TikTok)

### 11.4 Accessibility
- WCAG 2.1 AA compliance for the web app UI
- All UI copy available in BM, English, and Mandarin (the platform UI itself is multilingual)
- Works on Android devices as low as Android 9 with Chrome browser (reflecting SME owner device demographics)

### 11.5 Security
- HTTPS enforced across all endpoints
- API keys stored in Google Secret Manager, never exposed to the client
- Rate limiting: 5 generations per day on free tier, unlimited on paid tiers
- Content safety filtering on all Imagen 3 and Veo 2 outputs to prevent policy violations

---

## 12. Content & Localisation Requirements

### 12.1 Language Strategy

Auto-Fuiyoh is built for Malaysia's trilingual reality. This is not a translation feature — it is a core product differentiator.

| Language | Use Case | Cultural Nuance Required |
|---|---|---|
| **Bahasa Malaysia** | National identity, formal contexts, government-adjacent messaging | Avoid overly formal Bahasa — conversational Malay resonates better for F&B |
| **English** | Professional tone, younger urban audience, tourism | Malaysian English idioms are acceptable and preferred over British/American English |
| **Mandarin (Simplified)** | Chinese-Malaysian community, authentic community connection | Must reflect Malaysian Chinese culture, not mainland Chinese or Taiwanese tone |

### 12.2 Malaysian Cultural Calendar Integration

The platform maintains a dynamic Malaysian cultural calendar covering:

- **Islamic calendar:** Ramadan (with pre-buka puasa content windows), Hari Raya Aidilfitri, Hari Raya Aidiladha
- **Chinese calendar:** Chinese New Year, Chap Goh Meh, Mooncake Festival, Qingming
- **Hindu/Tamil calendar:** Deepavali, Thaipusam, Ponggal
- **National:** Merdeka Day (31 Aug), Malaysia Day (16 Sep), school holiday periods
- **F&B-specific:** Payday weeks (25th–1st of month), weekend peaks, major sports events (Malaysian Cup, World Cup)

### 12.3 Food Culture Knowledge Base

Gemini is prompted with a specialised Malaysia F&B knowledge base covering:

- Dish name equivalencies across languages (economy rice = nasi campur = chap fan)
- Halal/non-halal sensitivity in content generation
- Regional food identities (Penang hawker culture, KL kopitiam culture, Johor Bahru Singaporean crossover)
- Price expectation norms per segment (e.g., kopitiam pricing vs. café pricing)
- Trending Malaysian F&B terms and aesthetics (e.g., "shiok," "sedap gila," "wajib try")

---

## 13. MVP Scope

For the hackathon demo and initial launch, the following features constitute the MVP:

### 13.1 In MVP (Must Ship)

| Feature | Module |
|---|---|
| URL ingestion (Google Maps + website) | M1 |
| Brand scraping + Brand Profile Summary | M1 |
| Campaign goal selection | M2 |
| Campaign brief generation (EN + BM) | M2 |
| AI website UI generation | M3 |
| Website preview in-browser | M3 |
| Instagram image generation — 3 images (Imagen 3) | M4 |
| 1 TikTok video generation (Veo 2) | M4 |
| Trilingual caption generation for all assets | M4 |
| Asset ZIP download | M5 |

### 13.2 Post-MVP (v1.1 — 4 weeks after launch)

- Full 9-image Instagram set
- 3 TikTok videos
- 30-day content calendar
- One-click website deployment (Netlify)
- WhatsApp broadcast templates
- Google Business Profile copy
- Competitor snapshot

### 13.3 Future Roadmap (v1.5 — v2.0)

- Direct social media scheduling (Meta API, TikTok API)
- Audio ad generation
- CRM and customer loyalty tools
- Non-F&B SME verticals (retail, beauty, services)
- Mobile app (React Native)
- Franchise readiness module

---

## 14. Success Metrics & KPIs

### 14.1 Product Metrics

| Metric | Target (Month 1) | Target (Month 6) | Target (Month 12) |
|---|---|---|---|
| Total sessions | 500 | 5,000 | 25,000 |
| Completed generations (%) | >60% | >70% | >75% |
| Assets downloaded per session | >3 | >5 | >6 |
| Return sessions per user | 1.2x | 2.5x | 4x |
| Website deployments | 50 | 500 | 3,000 |
| NPS Score | >40 | >50 | >60 |

### 14.2 Business Metrics

| Metric | Target (Month 6) | Target (Month 12) |
|---|---|---|
| Monthly Active Users (MAU) | 2,000 | 8,000 |
| Paying subscribers | 300 | 2,000 |
| MRR | RM 14,700 | RM 98,000 |
| CAC (Customer Acquisition Cost) | < RM 50 | < RM 30 |
| Churn rate | < 15% | < 10% |

### 14.3 SME Impact Metrics (Qualitative)

- % of users who report increased social media engagement after using Auto-Fuiyoh
- % of users who report new customer enquiries attributed to generated content
- Qualitative satisfaction score on cultural relevance of generated content

---

## 15. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Veo 2 / Imagen 3 API availability or rate limits | Medium | High | Implement queue system + fallback to lower-tier model; pre-generate demo assets for hackathon |
| Generated content is culturally inappropriate or offensive | Medium | High | Multi-layer content safety filter; human review layer for flagged outputs; user reporting mechanism |
| SME owners abandon the flow mid-generation (too long) | High | Medium | Progressive disclosure — show quick wins (website preview) immediately while other assets generate in background |
| Google Maps scraping blocked or unreliable | Medium | High | Fallback to manual input form; Google Places API as structured data source |
| Low trust from traditional SME owners ("AI will tak betul") | High | Medium | Show before/after examples prominently; offer 100% free tier for first generation; testimonials from real stall owners |
| Language quality issues in Mandarin output | Medium | High | Human QA on Mandarin outputs; partner with Malaysian Chinese copywriter for prompt engineering |
| Competitors copy the idea quickly | Medium | Low | Network effects from user base; proprietary Malaysia F&B knowledge base; Google partnership moat |

---

## 16. Timeline & Milestones

### Hackathon Phase (48 Hours)

| Hour | Milestone |
|---|---|
| 0–4 | Project setup, API keys configured, tech stack initialised |
| 4–12 | M1 Brand Analyser — URL scraping + Gemini analysis pipeline |
| 12–20 | M4 Content Factory — Imagen 3 image generation + Gemini Flash captions |
| 20–28 | M3 Website Regenerator — HTML generation + preview |
| 28–36 | M4 Veo 2 video generation + integration |
| 36–42 | M5 Export Hub — ZIP packaging |
| 42–46 | UI polish, demo flow rehearsal, edge case handling |
| 46–48 | Presentation prep, live demo dry run |

### Post-Hackathon Launch Roadmap

| Phase | Timeline | Milestone |
|---|---|---|
| **Beta** | Month 1–2 | 100 beta users from Klang Valley F&B community |
| **v1.0 Launch** | Month 3 | Public launch, free tier available |
| **v1.1** | Month 4–5 | Full content suite, one-click deployment, content calendar |
| **v1.5** | Month 8–9 | Social media scheduling integration, audio ads |
| **v2.0** | Month 12 | Non-F&B verticals, mobile app |

---

## 17. Open Questions

The following questions require resolution before or during development:

1. **Veo 2 API Access:** Is Veo 2 available via Vertex AI for hackathon use, or will we need to use Veo 2 in preview mode? What are the rate limits?

2. **Google Maps ToS:** What are the permitted uses of Google Maps data scraping? Should we use the Places API exclusively to ensure ToS compliance?

3. **Halal Certification Display:** Should Auto-Fuiyoh auto-detect and prominently display halal status in generated content? How should non-halal businesses be handled?

4. **Mandarin Character Set:** Should Simplified Chinese (Malaysia standard) be the default, with an option for Traditional Chinese? How do we handle the mix used in the Malaysian Chinese community?

5. **Pricing Model:** What is the right free tier limit? Options: (a) 1 free full generation per business, (b) unlimited free with watermarked assets, (c) free website + paid content
   
6. **Video Generation Time:** Veo 2 generation can take several minutes. How do we handle UX during this wait? Options: (a) async notification (email/WhatsApp), (b) progress bar with live preview frames, (c) offer a static video template as fallback

7. **User Accounts vs. Guestmode:** Should we require sign-up before generation or allow guest mode with download gated behind sign-up?

8. **Content Ownership:** Do generated assets belong to the SME owner? We should explicitly state in ToS that all generated content is owned by the user upon download.

---

## Appendix A — Glossary

| Term | Definition |
|---|---|
| **Fuiyoh** | Malaysian exclamation of amazement or admiration, used across all ethnicities |
| **Kopitiam** | Traditional Malaysian coffee shop, typically serving local breakfast and beverages |
| **SME** | Small and Medium Enterprise |
| **BM** | Bahasa Malaysia |
| **ZH** | Mandarin Chinese (Simplified) |
| **P0** | Must Have — blocks launch if missing |
| **P1** | Should Have — high value, targeted for MVP+ |
| **P2** | Nice to Have — future consideration |
| **Veo 2** | Google DeepMind's video generation model |
| **Imagen 3** | Google's state-of-the-art image generation model |
| **Gemini Flash** | Fast, cost-efficient variant of Google's Gemini model family |
| **Vertex AI** | Google Cloud's unified AI/ML platform |

---

## Appendix B — Sample Prompt Templates

### B.1 Brand Analysis Prompt (Gemini 1.5 Pro)
```
You are an expert Malaysian F&B marketing analyst. 
Analyse the following business data scraped from their Google Maps listing and website.

Business Data:
{scraped_content}

Extract and return a structured JSON with:
- business_name
- cuisine_type (in BM, EN, ZH)
- signature_dishes (top 5)
- price_range ($ / $$ / $$$)
- inferred_audience (age, ethnicity mix, occasion)
- brand_personality (3 adjectives)
- current_marketing_maturity_score (1–10)
- key_strengths (from reviews)
- missed_opportunities (from reviews + competitors)
- cultural_community_primary (Malay / Chinese / Indian / Mixed)

All output must reflect deep knowledge of Malaysian consumer culture.
```

### B.2 Caption Generation Prompt (Gemini Flash)
```
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
```

---

*Document End — Auto-Fuiyoh PRD v1.0*  
*⚡ Fuiyoh lah, let's build this.*
