'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

export default function URLInputForm() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    sessionStorage.setItem('fuiyoh_url', url);
    router.push('/analyse');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <motion.div animate={{ scale: isFocused ? 1.01 : 1 }} transition={{ type: 'spring', stiffness: 300 }}>
        <div
          style={{ boxShadow: isFocused ? '0 0 40px rgba(232,71,10,0.25)' : 'none' }}
          className={`relative flex items-center bg-[--dark-2] rounded-full border-2 transition-all duration-300 ${
            isFocused ? 'border-[--orange]' : 'border-white/10'
          }`}
        >
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Drop your Google Maps or website link here lah..."
            className="bg-transparent py-5 pl-7 pr-44 text-base text-[--cream] placeholder:text-[--text-muted] font-sans focus:outline-none w-full"
          />
          <button
            type="submit"
            disabled={isLoading || !url}
            className="absolute right-2 bg-[--orange] hover:bg-[--orange-light] disabled:opacity-50 text-white rounded-full px-6 py-3 font-display font-bold text-sm transition-all"
          >
            {isLoading ? 'Analysing...' : 'Start Free ⚡'}
          </button>
        </div>
      </motion.div>
      <div className="mt-4 flex gap-4 justify-center font-mono text-xs text-[--text-muted]">
        <span>Try:</span>
        <button
          type="button"
          onClick={() => setUrl('https://maps.app.goo.gl/example')}
          className="hover:text-[--orange] underline decoration-white/20 underline-offset-4 transition-colors"
        >
          Nasi Lemak Antarabangsa
        </button>
        <button
          type="button"
          onClick={() => setUrl('https://myburgerlab.com')}
          className="hover:text-[--orange] underline decoration-white/20 underline-offset-4 transition-colors"
        >
          myBurgerLab
        </button>
      </div>
    </form>
  );
}
