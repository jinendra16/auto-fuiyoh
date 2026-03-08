'use client';

import { useState } from 'react';
import { BrandProfile, CampaignBrief, ContentCalendarItem, GeneratedAsset, GenerationStatus } from '@/lib/types';

interface CaptionSet {
  dish: string;
  en: string;
  bm: string;
  zh: string;
}
import { motion } from 'motion/react';
import { Globe, Image as ImageIcon, Video, FileText, Calendar, Copy, Check } from 'lucide-react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ImageGrid from '@/components/ImageGrid';

function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton-warm rounded-xl ${className ?? ''}`} />;
}

interface Props {
  brandProfile: BrandProfile;
  campaignBrief: CampaignBrief;
  contentCalendar: ContentCalendarItem[];
  assets: GeneratedAsset[];
  captions: CaptionSet[];
  generationStatus: GenerationStatus;
  onCsvExport: () => void;
  onRegenerateImages?: () => void;
}

export default function ResultsDashboard({
  brandProfile,
  campaignBrief,
  contentCalendar,
  assets,
  captions,
  generationStatus,
  onCsvExport,
  onRegenerateImages,
}: Props) {
  const [activeTab, setActiveTab] = useState<'website' | 'images' | 'videos' | 'captions' | 'calendar'>('website');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [captionLang, setCaptionLang] = useState<'en' | 'bm' | 'zh'>('en');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleHtmlDownload = () => {
    const websiteAsset = assets.find(a => a.type === 'website');
    if (!websiteAsset?.content) return;
    const blob = new Blob([websiteAsset.content as string], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${brandProfile.businessName.replace(/\s+/g, '-').toLowerCase()}-website.html`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const tabs = [
    { id: 'website', label: 'Website', icon: Globe },
    { id: 'images', label: 'Images', icon: ImageIcon },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'captions', label: 'Captions', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ] as const;

  const websiteAsset = assets.find(a => a.type === 'website');
  const imageAssets = assets.filter(a => a.type === 'image');
  const videoAssets = assets.filter(a => a.type === 'video');

  return (
    <div className="w-full flex flex-col">
      {/* Sticky tab bar */}
      <div className="sticky top-0 z-10 bg-[--dark]/80 backdrop-blur-md border-b border-white/10 mb-8">
        <div className="flex relative overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-mono text-xs uppercase tracking-widest whitespace-nowrap transition-colors relative flex-shrink-0 ${
                  activeTab === tab.id ? 'text-[--orange]' : 'text-[--text-muted] hover:text-[--cream]'
                }`}
              >
                <Icon size={14} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-bar"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[--orange]"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-[--dark-2] border border-white/10 rounded-3xl p-8 min-h-[600px]">

        {/* Website Tab */}
        {activeTab === 'website' && (
          <ErrorBoundary>
            <motion.div
              key="website"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-2xl text-[--cream]">Generated Website</h2>
                <button
                  onClick={handleHtmlDownload}
                  className="text-sm font-mono text-[--orange] hover:underline"
                >
                  Download HTML
                </button>
              </div>
              {generationStatus.website === 'loading' && <Skeleton className="h-[500px]" />}
              {generationStatus.website === 'error' && (
                <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                  <p className="text-red-400 font-mono text-sm">Failed to generate website.</p>
                </div>
              )}
              {generationStatus.website === 'done' && websiteAsset && (
                <div className="flex-1 bg-white rounded-xl overflow-hidden border border-gray-200">
                  <iframe
                    srcDoc={websiteAsset.content as string}
                    className="w-full h-full min-h-[500px]"
                    title="Website Preview"
                  />
                </div>
              )}
            </motion.div>
          </ErrorBoundary>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <ErrorBoundary>
            <motion.div
              key="images"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-2xl text-[--cream]">Instagram Posts (Imagen 3)</h2>
                {onRegenerateImages && (
                  <button onClick={onRegenerateImages} className="text-sm font-mono text-[--orange] hover:underline">
                    Regenerate All
                  </button>
                )}
              </div>
              <ImageGrid images={imageAssets} status={generationStatus.images} />
            </motion.div>
          </ErrorBoundary>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <ErrorBoundary>
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-2xl text-[--cream]">TikTok / Reels (Veo 2)</h2>
              </div>
              {generationStatus.videos === 'loading' && (
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="w-48 h-80" />
                  <p className="text-[--text-muted] font-mono text-sm">Veo 2 is generating your video (~2–3 min)…</p>
                </div>
              )}
              {generationStatus.videos === 'error' && (
                <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                  <p className="text-red-400 font-mono text-sm">Failed to start video generation.</p>
                </div>
              )}
              {generationStatus.videos === 'done' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoAssets.map(vid => {
                    const isPending = vid.metadata?.status === 'pending';
                    const isCompleted = vid.metadata?.status === 'completed';
                    return (
                      <div key={vid.id} className="bg-[--dark] rounded-2xl overflow-hidden border border-white/10">
                        <div className="aspect-[9/16] bg-[--dark-2] relative flex items-center justify-center">
                          {isPending && (
                            <div className="text-center px-4">
                              <div className="w-8 h-8 rounded-full border-2 border-[--orange] border-t-transparent animate-spin mx-auto mb-3" />
                              <p className="text-[--text-muted] font-mono text-xs">Generating with Veo 2…</p>
                            </div>
                          )}
                          {isCompleted && vid.url && (
                            <video src={vid.url} controls className="w-full h-full object-cover" />
                          )}
                          {isCompleted && !vid.url && (
                            <p className="text-[--text-muted] font-mono text-xs text-center px-4">
                              Video ready — check Cloud Console for URI
                            </p>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="font-sans text-xs text-[--text-muted] line-clamp-2">
                            {isPending ? 'Video is being generated…' : 'Your Veo 2 video is ready.'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </ErrorBoundary>
        )}

        {/* Captions Tab */}
        {activeTab === 'captions' && (
          <ErrorBoundary>
            <motion.div
              key="captions"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-2xl text-[--cream]">Trilingual Captions</h2>
                {/* Language pill switcher */}
                <div className="flex gap-1 bg-[--dark] rounded-full p-1 border border-white/10">
                  {(['en', 'bm', 'zh'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setCaptionLang(lang)}
                      className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${
                        captionLang === lang
                          ? 'bg-[--orange] text-white'
                          : 'text-[--text-muted] hover:text-[--cream]'
                      }`}
                    >
                      {lang === 'en' ? 'EN' : lang === 'bm' ? 'BM' : 'ZH'}
                    </button>
                  ))}
                </div>
              </div>
              {captions.length === 0 && (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-32" />)}
                </div>
              )}
              {captions.length > 0 && (
                <div className="space-y-4">
                  {captions.map((cap, idx) => (
                    <div key={idx} className="bg-[--dark] rounded-2xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-display font-bold text-[--cream]">Post {idx + 1}</h3>
                          <p className="font-mono text-xs text-[--text-muted]">{cap.dish}</p>
                        </div>
                        <button
                          onClick={() => handleCopy(cap[captionLang], `cap-${idx}-${captionLang}`)}
                          className="text-[--text-muted] hover:text-[--cream] transition-colors p-2"
                        >
                          {copiedId === `cap-${idx}-${captionLang}` ? (
                            <Check size={16} className="text-[--green-brand]" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-[--cream] font-sans bg-white/5 p-4 rounded-xl min-h-[80px] leading-relaxed">
                        {cap[captionLang]}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </ErrorBoundary>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <ErrorBoundary>
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-2xl text-[--cream]">30-Day Content Calendar</h2>
                <button
                  onClick={onCsvExport}
                  className="text-sm font-mono text-[--orange] hover:underline"
                >
                  Export CSV
                </button>
              </div>
              {generationStatus.contentCalendar === 'loading' && (
                <div className="space-y-2">
                  {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-10 mb-2" />)}
                </div>
              )}
              {generationStatus.contentCalendar === 'error' && (
                <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                  <p className="text-red-400 font-mono text-sm">Failed to generate content calendar.</p>
                </div>
              )}
              {generationStatus.contentCalendar === 'done' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['Day', 'Platform', 'Time', 'Format', 'Topic'].map(h => (
                          <th key={h} className="pb-3 font-mono text-xs uppercase tracking-widest text-[--text-muted]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {contentCalendar.map((item, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 font-display font-bold text-[--orange]">Day {item.day}</td>
                          <td className="py-4 text-[--cream] font-sans">{item.platform}</td>
                          <td className="py-4 text-[--cream] font-sans">{item.bestPostingTime}</td>
                          <td className="py-4">
                            <span className="px-2 py-1 rounded-md bg-white/10 font-mono text-xs uppercase tracking-wider text-[--text-muted]">
                              {item.postType}
                            </span>
                          </td>
                          <td className="py-4 text-[--cream] font-sans">{item.topic}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}
