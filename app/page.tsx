import URLInputForm from '@/components/URLInputForm';
import { Sparkles, TrendingUp, Globe, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-20 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-8">
        <Sparkles size={16} className="text-[#E8470A]" />
        <span>Built for Malaysian F&B SMEs</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-tight max-w-4xl">
        Transform your stall&apos;s marketing in <span className="text-[#E8470A]">5 minutes</span>
      </h1>
      
      <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
        Paste your Google Maps link or website URL. Our AI will analyse your brand, build a new website, and generate a month of trilingual social media content.
      </p>

      <URLInputForm />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-5xl mx-auto text-left">
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-[#E8470A]/20 flex items-center justify-center mb-6">
            <Globe size={24} className="text-[#E8470A]" />
          </div>
          <h3 className="text-xl font-bold mb-3">Instant Website</h3>
          <p className="text-gray-400">A modern, mobile-first website generated from your existing online presence. Ready to deploy instantly.</p>
        </div>
        
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-[#E8470A]/20 flex items-center justify-center mb-6">
            <TrendingUp size={24} className="text-[#E8470A]" />
          </div>
          <h3 className="text-xl font-bold mb-3">Trilingual Content</h3>
          <p className="text-gray-400">Social media posts, captions, and videos generated in Bahasa Malaysia, English, and Mandarin.</p>
        </div>
        
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-[#E8470A]/20 flex items-center justify-center mb-6">
            <Clock size={24} className="text-[#E8470A]" />
          </div>
          <h3 className="text-xl font-bold mb-3">30-Day Calendar</h3>
          <p className="text-gray-400">A complete marketing strategy and content calendar tailored to your business goals and local holidays.</p>
        </div>
      </div>
    </div>
  );
}
