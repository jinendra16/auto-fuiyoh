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

// Trilingual captions stored independently from images
interface CaptionSet {
  dish: string;
  en: string;
  bm: string;
  zh: string;
}

export default function ResultsPage() {
  const [isGenerating, setIsGenerating] = useState(true);
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [campaignGoal, setCampaignGoal] = useState<string | null>(null);
  const [campaignBrief, setCampaignBrief] = useState<CampaignBrief | null>(null);
  const [contentCalendar, setContentCalendar] = useState<ContentCalendarItem[]>([]);
  const [assets, setAssets] = useState<GeneratedAsset[]>([]);
  const [captions, setCaptions] = useState<CaptionSet[]>([]);
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
        // Wave 1: campaign brief + content calendar (parallel)
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

        // Wave 2: website, images, videos + captions (all parallel, require brief)
        if (brief) {
          setGenerationStatus(prev => ({ ...prev, website: 'loading', images: 'loading', videos: 'loading' }));

          const dishes = profile.signatureDishes.slice(0, 3);

          // Captions run independently — one per signature dish regardless of image success
          const captionFetches = dishes.map((dish, idx) =>
            fetch('/api/generate/copy', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                businessName: profile.businessName,
                contentSubject: dish,
                campaignGoal: storedGoal,
                platform: 'Instagram',
                toneGuide: brief!.toneOfVoice,
              }),
            })
          );

          const [websiteRes, imagesRes, videosRes, ...captionResArr] = await Promise.allSettled([
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
            ...captionFetches,
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

          // Captions (independent of images)
          const resolvedCaptions: CaptionSet[] = await Promise.all(
            dishes.map(async (dish, idx) => {
              const res = captionResArr[idx];
              if (res?.status === 'fulfilled' && res.value.ok) {
                const data = await res.value.json();
                return { dish, ...data.captions };
              }
              return { dish, en: '', bm: '', zh: '' };
            })
          );
          setCaptions(resolvedCaptions);

          // Images (asset URLs only — captions already resolved above)
          if (imagesRes.status === 'fulfilled' && imagesRes.value.ok) {
            const data = await imagesRes.value.json();
            const imageResults: ImageGenerationResult[] = data.images;

            imageResults.forEach((img, idx) => {
              newAssets.push({
                id: img.id,
                type: 'image',
                url: `data:image/jpeg;base64,${img.base64Data}`,
                content: resolvedCaptions[idx]
                  ? { en: resolvedCaptions[idx].en, bm: resolvedCaptions[idx].bm, zh: resolvedCaptions[idx].zh }
                  : { en: '', bm: '', zh: '' },
                metadata: { prompt: img.prompt },
              });
            });

            setGenerationStatus(prev => ({ ...prev, images: 'done' }));
          } else {
            setGenerationStatus(prev => ({ ...prev, images: 'error' }));
          }

          // Videos
          if (videosRes.status === 'fulfilled' && videosRes.value.ok) {
            const data = await videosRes.value.json();
            setVideoOperationName(data.operationName);
            newAssets.push({ id: 'vid-1', type: 'video', metadata: { status: 'pending' } });
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
        base64Data: (a.url ?? '').replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', ''),
        mimeType: 'image/jpeg',
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
    a.download = `auto-fuiyoh-${brandProfile.businessName.replace(/\s+/g, '-').toLowerCase()}.zip`;
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
      <div className="flex flex-col items-center justify-center flex-1 py-20 relative">
        <p className="font-mono text-xs text-[--orange] uppercase tracking-widest mb-4">Generating</p>
        <h2 className="font-display font-black text-5xl text-[--cream] mb-12 text-center">
          Your campaign<br />is being crafted…
        </h2>
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {STEPS.map(step => {
            const status = generationStatus[step.key];
            return (
              <div
                key={step.key}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                  status === 'loading' ? 'bg-[--orange]/10 border border-[--orange]/30' :
                  status === 'done' ? 'bg-[--green-brand]/10 border border-[--green-brand]/20' :
                  status === 'error' ? 'bg-red-500/10 border border-red-500/20' :
                  'bg-[--dark-2] border border-white/5'
                }`}
              >
                {status === 'loading' && <Loader2 size={16} className="text-[--orange] animate-spin shrink-0" />}
                {status === 'done' && <CheckCircle size={16} className="text-[--green-brand] shrink-0" />}
                {status === 'error' && <XCircle size={16} className="text-red-400 shrink-0" />}
                {status === 'idle' && <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />}
                <span className={`font-mono text-xs tracking-wider ${
                  status === 'loading' ? 'text-[--orange]' :
                  status === 'done' ? 'text-[--green-brand]' :
                  status === 'error' ? 'text-red-400' :
                  'text-[--text-muted]'
                }`}>
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
    <div className="flex flex-col flex-1 pb-24 md:pb-0 py-8 w-full max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-black text-4xl text-[--cream] mb-2">Your Campaign is Ready!</h1>
          <p className="text-[--text-muted] font-sans">Review your generated assets below.</p>
        </div>
        <button
          onClick={handleExport}
          className="hidden md:flex bg-[--orange] hover:bg-[--orange-light] text-white rounded-2xl px-6 py-3 font-display font-bold items-center gap-2 transition-all"
        >
          Download Everything ⚡
        </button>
      </div>

      {brandProfile && campaignBrief && (
        <ErrorBoundary onReset={() => router.push('/')}>
          <ResultsDashboard
            brandProfile={brandProfile}
            campaignBrief={campaignBrief}
            contentCalendar={contentCalendar}
            assets={assets}
            captions={captions}
            generationStatus={generationStatus}
            onCsvExport={handleCsvExport}
          />
        </ErrorBoundary>
      )}

      {/* Mobile export fixed bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[--dark]/95 backdrop-blur-md border-t border-white/10 md:hidden z-50">
        <button
          onClick={handleExport}
          className="w-full bg-[--orange] text-white py-4 rounded-2xl font-display font-bold text-lg"
        >
          Download Everything ⚡
        </button>
      </div>
    </div>
  );
}
