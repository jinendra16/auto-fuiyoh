import { NextResponse } from 'next/server';
import { startVideoGeneration } from '@/lib/veo';
import type { BrandProfile, CampaignBrief } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { brandProfile, campaignBrief }: { brandProfile: BrandProfile; campaignBrief: CampaignBrief } = await req.json();

    if (!brandProfile || !campaignBrief) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { operationName } = await startVideoGeneration(
      brandProfile.businessName,
      brandProfile.cuisineType.en,
      brandProfile.signatureDishes,
      campaignBrief.theme.en,
      campaignBrief.toneOfVoice
    );

    return NextResponse.json({ operationName, status: 'pending' });
  } catch (error) {
    console.error('Video Generation API Error:', error);
    return NextResponse.json({ error: 'Failed to start video generation' }, { status: 500 });
  }
}
