import { NextResponse } from 'next/server';
import { getGeminiClient, BRAND_ANALYSIS_PROMPT } from '@/lib/gemini';
import { Type } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Basic scraping: fetch the HTML content of the URL
    // In a production app, we would use Puppeteer or a dedicated scraping service
    // to handle JavaScript-rendered sites and Google Maps listings properly.
    let scrapedContent = '';
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });
      if (response.ok) {
        const html = await response.text();
        // Strip HTML tags to get raw text, limit to first 15000 chars to fit context window comfortably
        scrapedContent = html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').slice(0, 15000);
      } else {
        scrapedContent = `Failed to fetch content from ${url}. Status: ${response.status}`;
      }
    } catch (e) {
      console.error('Scraping error:', e);
      scrapedContent = `Error fetching content from ${url}.`;
    }

    const ai = getGeminiClient();

    const prompt = BRAND_ANALYSIS_PROMPT.replace('{scraped_content}', scrapedContent || url);

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            businessName: { type: Type.STRING },
            cuisineType: {
              type: Type.OBJECT,
              properties: {
                bm: { type: Type.STRING },
                en: { type: Type.STRING },
                zh: { type: Type.STRING },
              },
            },
            signatureDishes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            priceRange: { type: Type.STRING },
            inferredAudience: { type: Type.STRING },
            brandPersonality: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            currentMarketingMaturityScore: { type: Type.NUMBER },
            keyStrengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            missedOpportunities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            culturalCommunityPrimary: { type: Type.STRING },
          },
          required: [
            'businessName',
            'cuisineType',
            'signatureDishes',
            'priceRange',
            'inferredAudience',
            'brandPersonality',
            'currentMarketingMaturityScore',
            'keyStrengths',
            'missedOpportunities',
            'culturalCommunityPrimary',
          ],
        },
      },
    });

    const brandProfile = JSON.parse(response.text ?? '{}');

    return NextResponse.json({ brandProfile });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Analyse API Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
