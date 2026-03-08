'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function URLInputForm() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    // Store URL in session storage to be picked up by the analyse page
    sessionStorage.setItem('fuiyoh_url', url);
    router.push('/analyse');
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit} 
      className="w-full max-w-2xl mx-auto mt-12"
    >
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-400">
          <Search size={24} />
        </div>
        <input
          type="url"
          required
          placeholder="Paste your Google Maps link or Website URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-36 text-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E8470A] focus:border-transparent transition-all"
        />
        <button
          type="submit"
          disabled={isLoading || !url}
          className="absolute right-2 bg-[#E8470A] hover:bg-[#ff5a1a] disabled:opacity-50 disabled:hover:bg-[#E8470A] text-white rounded-xl px-6 py-3 font-medium flex items-center gap-2 transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Analysing...</span>
            </>
          ) : (
            <>
              <span>Start Free</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
      <div className="mt-4 flex gap-4 text-sm text-gray-400 justify-center">
        <span>Example:</span>
        <button type="button" onClick={() => setUrl('https://maps.app.goo.gl/example')} className="hover:text-[#E8470A] underline decoration-white/20 underline-offset-4">
          Nasi Lemak Antarabangsa
        </button>
        <button type="button" onClick={() => setUrl('https://myburgerlab.com')} className="hover:text-[#E8470A] underline decoration-white/20 underline-offset-4">
          myBurgerLab
        </button>
      </div>
    </motion.form>
  );
}
