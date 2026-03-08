import { NextResponse } from 'next/server';
import { getGeminiClient, WEBSITE_GENERATION_PROMPT } from '@/lib/gemini';
import { generateMarketingImages } from '@/lib/imagen';
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

    // Start both HTML generation and Image generation concurrently
    // We request 4 images: 1 for Hero, 3 for Signature Dishes
    const [htmlResponse, images] = await Promise.all([
      ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-preview',
        contents: prompt,
      }),
      generateMarketingImages(
        brandProfile.businessName,
        brandProfile.cuisineType.en,
        [brandProfile.signatureDishes[0] || 'delicious food', ...brandProfile.signatureDishes], // First item used twice to get 4 images (hero + 3 dishes)
        campaignBrief.theme.en,
        campaignBrief.toneOfVoice,
        4
      )
    ]);

    let html = (htmlResponse.text ?? '')
      .replace(/^```html\n?/, '')
      .replace(/\n?```$/, '');

    // Inject base64 images into HTML
    if (images && images.length > 0) {
      // Hero image is the first one
      if (images[0]) {
        html = html.replace(/https:\/\/TEMP_IMAGE_HERO/ig, `data:${images[0].mimeType};base64,${images[0].base64Data}`);
      }
      
      // Dish images are the subsequent ones
      for (let i = 1; i < images.length && i <= 3; i++) {
        const placeholder = new RegExp(`https:\\/\\/TEMP_IMAGE_DISH_${i - 1}`, 'ig');
        html = html.replace(placeholder, `data:${images[i].mimeType};base64,${images[i].base64Data}`);
      }
    }

    return NextResponse.json({ html });
  } catch (error) {
    console.error('Website Generation API Error:', error);
    return NextResponse.json({ error: 'Failed to generate website' }, { status: 500 });
  }
}
