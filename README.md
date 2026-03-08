# ⚡ Auto-Fuiyoh

Auto-Fuiyoh is an AI-powered marketing and brand transformation web platform built for Malaysian F&B SMEs. It takes a business's Google Maps URL or website URL, analyses their brand using Gemini, and generates a complete marketing campaign including a new website, social media posts, trilingual copy, and a 30-day content calendar.

## Features

- **Brand Analysis**: Scrapes and understands your business using Gemini 1.5 Pro.
- **Trilingual Copy**: Generates culturally relevant captions in Bahasa Malaysia, English, and Mandarin using Gemini Flash.
- **Instant Website**: Creates a modern, mobile-first website ready to deploy.
- **Content Calendar**: Auto-generates a 30-day posting calendar.
- **Social Media Assets**: Generates images and videos tailored for Instagram and TikTok (simulated in MVP).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI Models**: Google Gemini 1.5 Pro, Gemini 1.5 Flash
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)

## Setup Instructions

1. **Environment Variables**:
   Copy `.env.example` to `.env.local` and add your API keys:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Required variables:
   - \`GEMINI_API_KEY\`: Your Google Gemini API key.
   - \`GOOGLE_PLACES_API_KEY\`: Your Google Places API key (optional for MVP).

2. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open the App**:
   Navigate to \`http://localhost:3000\` in your browser.

## Usage

1. Paste a Google Maps link or website URL on the home page.
2. Wait for the AI to analyse the brand and generate a profile.
3. Review and edit the brand profile, then select a campaign goal.
4. View your generated website, images, videos, captions, and content calendar on the results dashboard.
