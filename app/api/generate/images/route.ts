import { NextResponse } from 'next/server';
import { generateMarketingImages } from '@/lib/imagen';
import type { BrandProfile, CampaignBrief } from '@/lib/types';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { brandProfile, campaignBrief }: { brandProfile: BrandProfile; campaignBrief: CampaignBrief } = await req.json();

    if (!brandProfile || !campaignBrief) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const images = await generateMarketingImages(
      brandProfile.businessName,
      brandProfile.cuisineType.en,
      brandProfile.signatureDishes,
      campaignBrief.theme.en,
      campaignBrief.toneOfVoice
    );

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Image Generation API Error:', error);
    return NextResponse.json({ error: 'Failed to generate images' }, { status: 500 });
  }
}
