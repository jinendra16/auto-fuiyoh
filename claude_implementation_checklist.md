# Auto-Fuiyoh: Claude Implementation Checklist

This checklist is based on the `auto-fuiyoh-prd.md` and is designed to guide Claude (or any AI agent) step-by-step through the implementation of the Auto-Fuiyoh platform.

---

## 🛠️ Phase 1: Project Setup & Infrastructure

- [ ] Initialize repository (Frontend: React/Next.js + TypeScript + Tailwind CSS).
- [ ] Initialize backend service (Node.js/Express or Python/FastAPI).
- [ ] Set up Firebase project (Firestore, Firebase Auth with Google Sign-In).
- [ ] Configure Google Cloud Project and enable necessary APIs:
  - [ ] Vertex AI API (Gemini 1.5 Pro, Gemini 1.5 Flash, Imagen 3, Veo 2).
  - [ ] Google Places API.
  - [ ] Google Cloud Storage.
  - [ ] Google Cloud TTS.
- [ ] Set up environment variables locally and secure them in deployment environments (Secret Manager).
- [ ] Set up basic CI/CD pipeline for Cloud Run (Backend) and Netlify/Vercel (Frontend).

## 🔍 Phase 2: M1 — Brand Analyser

- [ ] **F-001:** Build URL Ingestion UI (handles Google Maps and standard URLs).
- [ ] **F-002:** Implement Web Scraping Pipeline.
  - [ ] Integrate Puppeteer for rendering modern JS websites.
  - [ ] Integrate Google Places API for structured business data.
  - [ ] Integrate Gemini 1.5 Pro to extract brand profile data (business name, cuisine type, menu, reviews, inferred audience).
- [ ] **F-003:** Build Brand Profile Summary UI.
  - [ ] Display extracted data in an editable format (BM, EN, ZH support).
  - [ ] Implement state management to trigger downstream field regenerations upon user edits.
- [ ] **F-004:** Implement Competitor Snapshot (P1).
  - [ ] Query nearby competitors using Google Maps proximity search.
  - [ ] Benchmark user's brand and display a comparison table.

## 🎯 Phase 3: M2 — Campaign Strategist

- [ ] **F-005:** Develop Campaign Goal Selection UI.
  - [ ] Provide options: Dine-in, Delivery, Festive, New Item, Brand Awareness.
  - [ ] Implement logic to automatically detect and surface upcoming Malaysian public holidays.
- [ ] **F-006:** Implement AI Campaign Brief Generator.
  - [ ] Prompt Gemini 1.5 Pro to output campaign theme, target audience, key messages (BM/EN/ZH), and tone guide based on M1 data and selected goal.
  - [ ] Add ability to regenerate individual sections.
- [ ] **F-007:** Generate 30-Day Content Calendar.
  - [ ] Create UI for a drag-and-drop calendar view.
  - [ ] Populate topics, formats (image/video/text), platforms, and optimal posting times.
  - [ ] Implement export functionality (CSV/PNG).
- [ ] **F-008:** Implement Audience Targeting Recommendations (P2).
  - [ ] Prompt AI for Meta Ads Manager settings (interest, radius, age, language) formatted as a copy-pasteable guide.

## 💻 Phase 4: M3 — Website Regenerator

- [ ] **F-009:** Build AI Website UI Generator.
  - [ ] Use Gemini to generate HTML/CSS/JS (mobile-first, responsive) based on brand data.
  - [ ] Ensure sections: Hero, About, Menu, Contact, Location/Map, Reviews, Promotions.
  - [ ] Render website preview in-browser (iframe or isolated container).
- [ ] **F-011:** Implement Inline Website Editing.
  - [ ] Add capability for users to click and edit text/replace images via drag-and-drop inside the preview.
- [ ] **F-010:** Implement One-Click Website Deployment.
  - [ ] Integrate with Netlify API to push generated website assets.
  - [ ] Return live URL to user.

## 📸 Phase 5: M4 — Content Factory

- [ ] **F-012:** Instagram Post Image Generation.
  - [ ] Integrate Imagen 3 API.
  - [ ] Generate 9 square (1080x1080) and 9 vertical (1080x1920) images (food shots, banners, lifestyle, quotes).
  - [ ] Overlay auto-generated text in primary language.
  - [ ] Implement individual image regeneration ("Try Again" button).
- [ ] **F-013:** TikTok / Reel Video Generation.
  - [ ] Integrate Veo 2 API.
  - [ ] Generate 3 MP4 vertical videos (Dish feature, Story montage, Today's Special).
  - [ ] Integrate Google TTS for Malaysian-accented voiceovers.
  - [ ] Add auto-generated subtitles.
- [ ] **F-014:** Trilingual Caption Generation.
  - [ ] Integrate Gemini 1.5 Flash.
  - [ ] Prompt for platform-specific captions (Instagram, TikTok, FB) in BM, EN, and ZH (Simplified).
  - [ ] Ensure culturally native copy, emojis, and Malaysian F&B hashtags.
- [ ] **F-015:** WhatsApp Broadcast Templates.
  - [ ] Generate 5 ready-to-send messages (under 300 chars) for different occasions in all 3 languages.
- [ ] **F-016:** Google Business Profile Copy.
  - [ ] Generate keyword-optimized profile descriptions, post copy, and Q&A responses.
- [ ] **F-017:** Audio Ad Generation (P2).
  - [ ] Implement UI to select language/gender.
  - [ ] Generate 30-second script, then convert to MP3 via Google TTS.

## 📦 Phase 6: M5 — Export Hub

- [ ] **F-018:** Implement Asset ZIP Bundler.
  - [ ] Package website folder, image folders, video folder, caption TXTs, and campaign brief into a ZIP file.
  - [ ] Optimize ZIP size (< 150MB).
- [ ] **F-019:** Generate Campaign Brief PDF.
  - [ ] Format the campaign strategy + calendar into a branded PDF.

## 🔄 Phase 7: Core Loop UX & Full Integration

- [ ] Build the Main Dashboard connecting M1 through M5.
- [ ] Implement the generation loading sequence (split screen, real-time population, progressive disclosure).
- [ ] Optimize generation speed to ensure total time < 3 mins.
- [ ] Handle API Rate Limits/Failures gracefully (Fallback UI, "Retry" buttons instead of breaking the app).
- [ ] Connect Firebase Auth for returning users ("Refresh Campaign", "Dashboard History").

## ✨ Phase 8: Quality Assurance & MVP Polish

- [ ] Multi-layer content safety filter test for text/images.
- [ ] Formally verify WCAG 2.1 AA compliance and mobile-responsive (375px minimum) support.
- [ ] Verify Trilingual output quality (No bad direct translations, culturally aware BM/ZH/EN).
- [ ] Perform End-to-End test of the "5-minute generation loop" from URL input to final ZIP export.

---

> **Note for Claude:** Before taking up any task, review `auto-fuiyoh-prd.md` for specific Acceptance Criteria for that feature. Check off items sequentially and create small, verifiable commits for each sub-task to maintain stability.
