import { NextResponse } from 'next/server';
import { getGeminiClient, CONTENT_CALENDAR_PROMPT } from '@/lib/gemini';
import { Type } from '@google/genai';
import type { BrandProfile } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { brandProfile, campaignGoal }: { brandProfile: BrandProfile; campaignGoal: string } = await req.json();

    if (!brandProfile || !campaignGoal) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ai = getGeminiClient();

    const prompt = CONTENT_CALENDAR_PROMPT
      .replace('{brand_profile}', JSON.stringify(brandProfile))
      .replace('{campaign_goal}', campaignGoal);

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.NUMBER },
              postType: { type: Type.STRING },
              platform: { type: Type.STRING },
              bestPostingTime: { type: Type.STRING },
              topic: { type: Type.STRING },
            },
            required: ['day', 'postType', 'platform', 'bestPostingTime', 'topic'],
          },
        },
      },
    });

    const contentCalendar = JSON.parse(response.text ?? '[]');

    if (!Array.isArray(contentCalendar) || contentCalendar.length < 10) {
      return NextResponse.json({ error: 'Incomplete calendar, please retry' }, { status: 500 });
    }

    return NextResponse.json({ contentCalendar });
  } catch (error) {
    console.error('Content Calendar API Error:', error);
    return NextResponse.json({ error: 'Failed to generate content calendar' }, { status: 500 });
  }
}
