'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResultsDashboard from '@/components/ResultsDashboard';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  BrandProfile,
  CampaignBrief,
  ContentCalendarItem,
  GeneratedAsset,
  GenerationStatus,
  ImageGenerationResult,
} from '@/lib/types';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const INITIAL_STATUS: GenerationStatus = {
  campaignBrief: 'idle',
  contentCalendar: 'idle',
  website: 'idle',
  images: 'idle',
  videos: 'idle',
};

const STEPS: { key: keyof GenerationStatus; label: string }[] = [
  { key: 'campaignBrief', label: 'Crafting campaign brief…' },
  { key: 'contentCalendar', label: 'Building 30-day calendar…' },
  { key: 'website', label: 'Generating your website…' },
  { key: 'images', label: 'Generating images with Imagen 3…' },
  { key: 'videos', label: 'Starting Veo 2 video generation…' },
];

export default function ResultsPage() {
  const [isGenerating, setIsGenerating] = useState(true);
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [campaignGoal, setCampaignGoal] = useState<string | null>(null);
  const [campaignBrief, setCampaignBrief] = useState<CampaignBrief | null>(null);
  const [contentCalendar, setContentCalendar] = useState<ContentCalendarItem[]>([]);
  const [assets, setAssets] = useState<GeneratedAsset[]>([]);
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>(INITIAL_STATUS);
  const [videoOperationName, setVideoOperationName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedProfile = sessionStorage.getItem('fuiyoh_brand_profile');
    const storedGoal = sessionStorage.getItem('fuiyoh_campaign_goal');

    if (!storedProfile || !storedGoal) {
      router.push('/');
      return;
    }

    const profile: BrandProfile = JSON.parse(storedProfile);
    setBrandProfile(profile);
    setCampaignGoal(storedGoal);

    const generateAll = async () => {
      try {
        // Wave 1: campaign brief + content calendar (parallel, no dependencies)
        setGenerationStatus(prev => ({ ...prev, campaignBrief: 'loading', contentCalendar: 'loading' }));

        const [briefRes, calendarRes] = await Promise.allSettled([
          fetch('/api/generate/campaign-brief', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brandProfile: profile, campaignGoal: storedGoal }),
          }),
          fetch('/api/generate/content-calendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brandProfile: profile, campaignGoal: storedGoal }),
          }),
        ]);

        let brief: CampaignBrief | null = null;

        if (briefRes.status === 'fulfilled' && briefRes.value.ok) {
          const data = await briefRes.value.json();
          brief = data.campaignBrief;
          setCampaignBrief(brief);
          setGenerationStatus(prev => ({ ...prev, campaignBrief: 'done' }));
        } else {
          setGenerationStatus(prev => ({ ...prev, campaignBrief: 'error' }));
        }

        if (calendarRes.status === 'fulfilled' && calendarRes.value.ok) {
          const data = await calendarRes.value.json();
          setContentCalendar(data.contentCalendar);
          setGenerationStatus(prev => ({ ...prev, contentCalendar: 'done' }));
        } else {
          setGenerationStatus(prev => ({ ...prev, contentCalendar: 'error' }));
        }

        // Wave 2: website, images, videos (parallel, require campaignBrief)
        if (brief) {
          setGenerationStatus(prev => ({ ...prev, website: 'loading', images: 'loading', videos: 'loading' }));

          const [websiteRes, imagesRes, videosRes] = await Promise.allSettled([
            fetch('/api/generate/website', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ brandProfile: profile, campaignBrief: brief }),
            }),
            fetch('/api/generate/images', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ brandProfile: profile, campaignBrief: brief }),
            }),
            fetch('/api/generate/videos', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ brandProfile: profile, campaignBrief: brief }),
            }),
          ]);

          const newAssets: GeneratedAsset[] = [];

          // Website
          if (websiteRes.status === 'fulfilled' && websiteRes.value.ok) {
            const data = await websiteRes.value.json();
            newAssets.push({ id: 'web-1', type: 'website', content: data.html });
            setGenerationStatus(prev => ({ ...prev, website: 'done' }));
          } else {
            setGenerationStatus(prev => ({ ...prev, website: 'error' }));
          }

          // Images + captions
          if (imagesRes.status === 'fulfilled' && imagesRes.value.ok) {
            const data = await imagesRes.value.json();
            const imageResults: ImageGenerationResult[] = data.images;

            const captionResults = await Promise.allSettled(
              imageResults.map((img, idx) =>
                fetch('/api/generate/copy', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    businessName: profile.businessName,
                    contentSubject: profile.signatureDishes[idx] ?? profile.signatureDishes[0],
                    campaignGoal: storedGoal,
                    platform: 'Instagram',
                    toneGuide: brief!.toneOfVoice,
                  }),
                })
              )
            );

            for (let i = 0; i < imageResults.length; i++) {
              const img = imageResults[i];
              let captions = { en: '', bm: '', zh: '' };
              const capRes = captionResults[i];
              if (capRes.status === 'fulfilled' && capRes.value.ok) {
                const capData = await capRes.value.json();
                captions = capData.captions;
              }
              newAssets.push({
                id: img.id,
                type: 'image',
                url: `data:image/png;base64,${img.base64Data}`,
                content: captions,
                metadata: { prompt: img.prompt },
              });
            }

            setGenerationStatus(prev => ({ ...prev, images: 'done' }));
          } else {
            setGenerationStatus(prev => ({ ...prev, images: 'error' }));
          }

          // Videos — fire and forget, store operation name for polling
          if (videosRes.status === 'fulfilled' && videosRes.value.ok) {
            const data = await videosRes.value.json();
            setVideoOperationName(data.operationName);
            newAssets.push({
              id: 'vid-1',
              type: 'video',
              metadata: { status: 'pending' },
            });
            setGenerationStatus(prev => ({ ...prev, videos: 'done' }));
          } else {
            setGenerationStatus(prev => ({ ...prev, videos: 'error' }));
          }

          setAssets(newAssets);
        }
      } catch (error) {
        console.error('Generation failed:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateAll();
  }, [router]);

  // Video polling
  useEffect(() => {
    if (!videoOperationName) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/generate/videos/status?op=${encodeURIComponent(videoOperationName)}`);
        const data = await res.json();
        if (data.done) {
          clearInterval(interval);
          setAssets(prev =>
            prev.map(a =>
              a.id === 'vid-1'
                ? { ...a, url: data.videoUri, metadata: { status: 'completed' } }
                : a
            )
          );
        }
      } catch (err) {
        console.error('Video polling error:', err);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [videoOperationName]);

  const handleExport = async () => {
    if (!brandProfile || !campaignBrief) return;
    const imageResults = assets
      .filter(a => a.type === 'image')
      .map(a => ({
        id: a.id,
        base64Data: (a.url ?? '').replace('data:image/png;base64,', ''),
        mimeType: 'image/png',
        prompt: (a.metadata?.prompt as string) ?? '',
      }));

    const websiteAsset = assets.find(a => a.type === 'website');
    const res = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brandProfile,
        campaignBrief,
        contentCalendar,
        websiteHtml: websiteAsset?.content,
        images: imageResults,
      }),
    });

    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `auto-fuiyoh-${brandProfile.businessName.replace(/\s+/g, '-').toLowerCase() ?? 'campaign'}.zip`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleCsvExport = () => {
    const rows = contentCalendar.map(
      r => `${r.day},"${r.platform}","${r.bestPostingTime}","${r.postType}","${r.topic}"`
    );
    const csv = ['Day,Platform,Best Time,Format,Topic', ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'content-calendar.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-20 text-center">
        <h2 className="text-3xl font-display font-bold mb-10">Generating your campaign…</h2>
        <div className="flex flex-col gap-4 w-full max-w-sm text-left">
          {STEPS.map(step => {
            const status = generationStatus[step.key];
            return (
              <div key={step.key} className="flex items-center gap-3">
                {status === 'loading' && <Loader2 size={20} className="text-[#E8470A] animate-spin shrink-0" />}
                {status === 'done' && <CheckCircle size={20} className="text-green-500 shrink-0" />}
                {status === 'error' && <XCircle size={20} className="text-red-500 shrink-0" />}
                {status === 'idle' && <div className="w-5 h-5 rounded-full border border-white/20 shrink-0" />}
                <span
                  className={
                    status === 'idle'
                      ? 'text-gray-500'
                      : status === 'loading'
                      ? 'text-white'
                      : status === 'done'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 py-8 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Your Campaign is Ready!</h1>
          <p className="text-gray-400">Review your generated assets below.</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-[#E8470A] hover:bg-[#ff5a1a] text-white rounded-xl px-6 py-3 font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#E8470A]/20"
        >
          Export Everything (ZIP)
        </button>
      </div>

      {brandProfile && campaignBrief && (
        <ErrorBoundary onReset={() => router.push('/')}>
          <ResultsDashboard
            brandProfile={brandProfile}
            campaignBrief={campaignBrief}
            contentCalendar={contentCalendar}
            assets={assets}
            generationStatus={generationStatus}
            onCsvExport={handleCsvExport}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}
