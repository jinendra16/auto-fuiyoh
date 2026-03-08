import { NextResponse } from 'next/server';
import { getGeminiClient, CAPTION_GENERATION_PROMPT } from '@/lib/gemini';
import { Type } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { businessName, contentSubject, campaignGoal, platform, toneGuide } = await req.json();

    if (!businessName || !contentSubject || !campaignGoal || !platform || !toneGuide) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ai = getGeminiClient();

    const prompt = CAPTION_GENERATION_PROMPT
      .replace('{business_name}', businessName)
      .replace('{content_subject}', contentSubject)
      .replace('{campaign_goal}', campaignGoal)
      .replace('{platform}', platform)
      .replace('{tone_guide}', toneGuide);

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bm: { type: Type.STRING },
            en: { type: Type.STRING },
            zh: { type: Type.STRING },
          },
          required: ['bm', 'en', 'zh'],
        },
      },
    });

    const captions = JSON.parse(response.text ?? '{}');

    return NextResponse.json({ captions });
  } catch (error) {
    console.error('Copy Generation API Error:', error);
    return NextResponse.json({ error: 'Failed to generate copy' }, { status: 500 });
  }
}
