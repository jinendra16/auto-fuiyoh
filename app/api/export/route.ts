import { NextResponse } from 'next/server';
import JSZip from 'jszip';
import type { BrandProfile, CampaignBrief, ContentCalendarItem, ImageGenerationResult } from '@/lib/types';

export const maxDuration = 30;

interface ExportBody {
  brandProfile: BrandProfile;
  campaignBrief: CampaignBrief;
  contentCalendar: ContentCalendarItem[];
  websiteHtml?: string;
  images: ImageGenerationResult[];
}

export async function POST(req: Request) {
  try {
    const { brandProfile, campaignBrief, contentCalendar, websiteHtml, images }: ExportBody = await req.json();

    const zip = new JSZip();
    const folderName = `auto-fuiyoh-${brandProfile.businessName.replace(/\s+/g, '-').toLowerCase()}`;
    const root = zip.folder(folderName)!;

    // Website
    if (websiteHtml) {
      root.folder('website')!.file('index.html', websiteHtml);
    }

    // Images
    const postsFolder = root.folder('instagram')!.folder('posts')!;
    images.forEach((img, idx) => {
      postsFolder.file(`post-${idx + 1}.png`, img.base64Data, { base64: true });
    });

    // Campaign brief JSON
    root.file('campaign-brief.json', JSON.stringify(campaignBrief, null, 2));

    // Content calendar CSV
    const csvRows = contentCalendar.map(
      r => `${r.day},"${r.platform}","${r.bestPostingTime}","${r.postType}","${r.topic}"`
    );
    const csv = ['Day,Platform,Best Time,Format,Topic', ...csvRows].join('\n');
    root.file('content-calendar.csv', csv);

    const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' });

    return new Response(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="auto-fuiyoh-campaign.zip"`,
      },
    });
  } catch (error) {
    console.error('Export API Error:', error);
    return NextResponse.json({ error: 'Failed to export campaign' }, { status: 500 });
  }
}
