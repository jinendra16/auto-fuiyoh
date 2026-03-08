# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Auto-Fuiyoh** is an AI-powered marketing automation platform for Malaysian F&B SMEs. It scrapes a business URL, extracts a brand profile via Google Gemini, and generates trilingual (English/Malay/Chinese) marketing content including captions, campaign briefs, and content calendars.

## Commands

```bash
npm run dev       # Start development server (port 3000)
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # Run ESLint
npm run clean     # Remove .next/ build folder
```

There are no tests configured.

## Environment Variables

```
GEMINI_API_KEY              # Required: Google Gemini API key (server-side)
NEXT_PUBLIC_GEMINI_API_KEY  # Alternative public key
GOOGLE_PLACES_API_KEY       # Optional: future Google Places integration
```

## Architecture

**Stack**: Next.js 15 App Router + React 19 + Tailwind v4 + Google Gemini API

**Three-page user flow**:
1. `/` — URL input form → stores URL in `sessionStorage['fuiyoh_url']`
2. `/analyse` — calls `POST /api/analyse` (Gemini Pro), user reviews/edits brand profile, selects campaign goal → stores in `sessionStorage['fuiyoh_brand_profile']` and `sessionStorage['fuiyoh_campaign_goal']`
3. `/results` — calls `POST /api/generate/copy` (Gemini Flash), displays tabbed dashboard

**API routes** (`app/api/`):
- `POST /api/analyse` — scrapes URL, extracts structured `BrandProfile` via Gemini Pro with JSON schema validation
- `POST /api/generate/copy` — generates trilingual captions via Gemini Flash

**State management**: Browser `sessionStorage` only — no database, no auth. MVP single-session architecture.

## Key Files

- `lib/gemini.ts` — Gemini client, 5 prompt templates (brand analysis, campaign brief, content calendar, caption generation, website generation), response schema definitions
- `lib/types.ts` — Core TypeScript interfaces: `BrandProfile`, `CampaignBrief`, `ContentCalendarItem`, `GeneratedAsset`, `CampaignData`
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

## Design System

- Primary color: `#E8470A` (orange-red)
- Dark background: `#1A1A2E`
- Fonts: Space Grotesk (display) + Inter (body)
- Animations via `motion` library (transpiled in next.config.ts)
- Use `cn()` from `lib/utils.ts` for conditional class composition

## MVP Limitations

The Results Dashboard has simulated/hardcoded content for: website generation, images, videos, and content calendar. Only caption generation via Gemini Flash is fully implemented. These tabs are marked as MVP placeholders.
