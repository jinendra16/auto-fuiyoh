'use client';

import { useState } from 'react';
import { BrandProfile, CampaignBrief, ContentCalendarItem, GeneratedAsset, GenerationStatus } from '@/lib/types';
import { motion } from 'motion/react';
import { Globe, Image as ImageIcon, Video, FileText, Calendar, Copy, Check } from 'lucide-react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-white/10 rounded-xl ${className ?? ''}`} />;
}

interface Props {
  brandProfile: BrandProfile;
  campaignBrief: CampaignBrief;
  contentCalendar: ContentCalendarItem[];
  assets: GeneratedAsset[];
  generationStatus: GenerationStatus;
  onCsvExport: () => void;
  onRegenerateImages?: () => void;
}

export default function ResultsDashboard({
  brandProfile,
  campaignBrief,
  contentCalendar,
  assets,
  generationStatus,
  onCsvExport,
  onRegenerateImages,
}: Props) {
  const [activeTab, setActiveTab] = useState<'website' | 'images' | 'videos' | 'captions' | 'calendar'>('website');
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    <div className="w-full flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-4 sticky top-8">
          <nav className="flex flex-col gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-[#E8470A]/20 text-[#E8470A]'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[600px]">

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
                <h2 className="text-2xl font-display font-bold">Generated Website</h2>
                <button
                  onClick={handleHtmlDownload}
                  className="text-sm font-medium text-[#E8470A] hover:underline"
                >
                  Download HTML
                </button>
              </div>

              {generationStatus.website === 'loading' && <Skeleton className="h-[500px]" />}
              {generationStatus.website === 'error' && (
                <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                  <p className="text-red-400 mb-3">Failed to generate website.</p>
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
                <h2 className="text-2xl font-display font-bold">Instagram Posts (Imagen 3)</h2>
                {onRegenerateImages && (
                  <button
                    onClick={onRegenerateImages}
                    className="text-sm font-medium text-[#E8470A] hover:underline"
                  >
                    Regenerate All
                  </button>
                )}
              </div>

              {generationStatus.images === 'loading' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="aspect-square" />)}
                </div>
              )}
              {generationStatus.images === 'error' && (
                <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                  <p className="text-red-400">Failed to generate images.</p>
                </div>
              )}
              {generationStatus.images === 'done' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {imageAssets.map((img, idx) => (
                    <div key={img.id} className="bg-black/20 rounded-2xl overflow-hidden border border-white/10 group">
                      <div className="group relative aspect-square overflow-hidden rounded-t-2xl">
                        <img
                          src={img.url ?? ''}
                          alt={`Generated image ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
                        />
                        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a
                            href={img.url ?? '#'}
                            download={`post-${idx + 1}.png`}
                            className="w-full py-2 rounded-lg bg-black/60 text-white text-sm font-medium text-center"
                          >
                            ⬇ Download
                          </a>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                          {(img.content as { en?: string })?.en}
                        </p>
                        <a
                          href={img.url ?? '#'}
                          download={`post-${idx + 1}.png`}
                          className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium text-center transition-colors block"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                <h2 className="text-2xl font-display font-bold">TikTok / Reels (Veo 2)</h2>
              </div>

              {generationStatus.videos === 'loading' && (
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="w-48 h-80" />
                  <p className="text-gray-400 text-sm">Veo 2 is generating your video (~2–3 min)…</p>
                </div>
              )}
              {generationStatus.videos === 'error' && (
                <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                  <p className="text-red-400">Failed to start video generation.</p>
                </div>
              )}
              {generationStatus.videos === 'done' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videoAssets.map(vid => {
                    const isPending = vid.metadata?.status === 'pending';
                    const isCompleted = vid.metadata?.status === 'completed';
                    return (
                      <div key={vid.id} className="bg-black/20 rounded-2xl overflow-hidden border border-white/10">
                        <div className="aspect-[9/16] bg-gray-900 relative flex items-center justify-center">
                          {isPending && (
                            <div className="text-center px-4">
                              <div className="w-8 h-8 rounded-full border-2 border-[#E8470A] border-t-transparent animate-spin mx-auto mb-3" />
                              <p className="text-gray-400 text-sm">Generating with Veo 2…</p>
                            </div>
                          )}
                          {isCompleted && vid.url && (
                            <video src={vid.url} controls className="w-full h-full object-cover" />
                          )}
                          {isCompleted && !vid.url && (
                            <p className="text-gray-400 text-sm text-center px-4">
                              Video ready — check Cloud Console for URI
                            </p>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-400 line-clamp-2">
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
                <h2 className="text-2xl font-display font-bold">Trilingual Captions (Gemini Flash)</h2>
              </div>

              {generationStatus.images === 'loading' && (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-32" />)}
                </div>
              )}
              {generationStatus.images === 'done' && (
                <div className="space-y-6">
                  {imageAssets.map((asset, idx) => {
                    const copy = asset.content as { en?: string; bm?: string; zh?: string } | null;
                    if (!copy) return null;
                    return (
                      <div key={asset.id} className="bg-black/20 rounded-2xl p-6 border border-white/10">
                        <h3 className="text-lg font-bold mb-4">Post {idx + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(['en', 'bm', 'zh'] as const).map(lang => (
                            <div key={lang} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                                  {lang === 'en' ? 'English' : lang === 'bm' ? 'Bahasa Malaysia' : 'Mandarin'}
                                </span>
                                <button
                                  onClick={() => handleCopy(copy[lang] ?? '', `${asset.id}-${lang}`)}
                                  className="text-gray-400 hover:text-white transition-colors"
                                >
                                  {copiedId === `${asset.id}-${lang}` ? (
                                    <Check size={16} className="text-green-500" />
                                  ) : (
                                    <Copy size={16} />
                                  )}
                                </button>
                              </div>
                              <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg min-h-[100px]">
                                {copy[lang]}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
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
                <h2 className="text-2xl font-display font-bold">30-Day Content Calendar</h2>
                <button
                  onClick={onCsvExport}
                  className="text-sm font-medium text-[#E8470A] hover:underline"
                >
                  Export CSV
                </button>
              </div>

              {generationStatus.contentCalendar === 'loading' && (
                <div className="space-y-2">
                  {Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-10" />)}
                </div>
              )}
              {generationStatus.contentCalendar === 'error' && (
                <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                  <p className="text-red-400">Failed to generate content calendar.</p>
                </div>
              )}
              {generationStatus.contentCalendar === 'done' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-sm">
                        <th className="pb-3 font-medium">Day</th>
                        <th className="pb-3 font-medium">Platform</th>
                        <th className="pb-3 font-medium">Time</th>
                        <th className="pb-3 font-medium">Format</th>
                        <th className="pb-3 font-medium">Topic</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {contentCalendar.map((item, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 font-bold text-white">Day {item.day}</td>
                          <td className="py-4 text-gray-300">{item.platform}</td>
                          <td className="py-4 text-gray-300">{item.bestPostingTime}</td>
                          <td className="py-4">
                            <span className="px-2 py-1 rounded-md bg-white/10 text-xs font-medium uppercase tracking-wider">
                              {item.postType}
                            </span>
                          </td>
                          <td className="py-4 text-gray-300">{item.topic}</td>
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
