import { NextResponse } from 'next/server';
import { getGeminiClient, CAMPAIGN_BRIEF_PROMPT } from '@/lib/gemini';
import { Type } from '@google/genai';
import type { BrandProfile } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { brandProfile, campaignGoal }: { brandProfile: BrandProfile; campaignGoal: string } = await req.json();

    if (!brandProfile || !campaignGoal) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ai = getGeminiClient();

    const prompt = CAMPAIGN_BRIEF_PROMPT
      .replace('{brand_profile}', JSON.stringify(brandProfile))
      .replace('{campaign_goal}', campaignGoal);

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            theme: {
              type: Type.OBJECT,
              properties: {
                bm: { type: Type.STRING },
                en: { type: Type.STRING },
                zh: { type: Type.STRING },
              },
            },
            tagline: {
              type: Type.OBJECT,
              properties: {
                bm: { type: Type.STRING },
                en: { type: Type.STRING },
                zh: { type: Type.STRING },
              },
            },
            targetAudience: { type: Type.STRING },
            toneOfVoice: { type: Type.STRING },
            campaignDuration: { type: Type.STRING },
            keyMessages: {
              type: Type.OBJECT,
              properties: {
                bm: { type: Type.ARRAY, items: { type: Type.STRING } },
                en: { type: Type.ARRAY, items: { type: Type.STRING } },
                zh: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
            recommendedChannels: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['theme', 'tagline', 'targetAudience', 'toneOfVoice', 'campaignDuration', 'keyMessages', 'recommendedChannels'],
        },
      },
    });

    const campaignBrief = JSON.parse(response.text ?? '{}');

    return NextResponse.json({ campaignBrief });
  } catch (error) {
    console.error('Campaign Brief API Error:', error);
    return NextResponse.json({ error: 'Failed to generate campaign brief' }, { status: 500 });
  }
}
