import { NextResponse } from 'next/server';
import { getGeminiClient, WEBSITE_GENERATION_PROMPT } from '@/lib/gemini';
import type { BrandProfile, CampaignBrief } from '@/lib/types';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { brandProfile, campaignBrief }: { brandProfile: BrandProfile; campaignBrief: CampaignBrief } = await req.json();

    if (!brandProfile || !campaignBrief) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ai = getGeminiClient();

    const prompt = WEBSITE_GENERATION_PROMPT
      .replace('{brand_profile}', JSON.stringify(brandProfile))
      .replace('{campaign_brief}', JSON.stringify(campaignBrief));

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents: prompt,
    });

    const html = (response.text ?? '')
      .replace(/^```html\n?/, '')
      .replace(/\n?```$/, '');

    return NextResponse.json({ html });
  } catch (error) {
    console.error('Website Generation API Error:', error);
    return NextResponse.json({ error: 'Failed to generate website' }, { status: 500 });
  }
}
