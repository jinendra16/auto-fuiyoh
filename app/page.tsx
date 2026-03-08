'use client';
import { motion } from 'motion/react';
import URLInputForm from '@/components/URLInputForm';

const WORDS = [
  { text: 'Paste', style: 'text-[--cream]' },
  { text: 'your', style: 'text-[--cream]' },
  { text: 'link.', style: 'text-[--orange]' },
  { text: 'Watch', style: 'text-[--cream]' },
  { text: 'the', style: 'text-[--cream]' },
  { text: 'magic.', style: 'text-[--gold]' },
  { text: 'FUIYOH.', style: 'text-[--orange]' },
  { text: '⚡', style: 'text-[--orange]' },
];

const MARQUEE_ITEMS = [
  'Nasi Lemak', 'Char Koay Teow', 'Teh Tarik', 'Cendol', 'Wonton Mee',
  'Roti Canai', 'Laksa', 'Satay', 'Nasi Kandar', 'Bak Kut Teh',
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[--dark] noise overflow-hidden flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2 border border-[--orange]/30 rounded-full px-4 py-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[--orange] animate-pulse" />
          <span className="font-mono text-xs text-[--orange] uppercase tracking-widest">AI-Powered F&amp;B Marketing</span>
        </motion.div>

        {/* Staggered headline */}
        <h1 className="font-display font-black text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight mb-8 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              className={word.style}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.09, type: 'spring', stiffness: 160, damping: 20 }}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-lg md:text-xl text-[--text-muted] max-w-md font-sans mb-10 leading-relaxed"
        >
          AI-powered marketing for Malaysian F&amp;B —<br />website, content, videos in 5 minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="w-full max-w-2xl"
        >
          <URLInputForm />
          <p className="mt-4 font-mono text-xs text-[--text-muted] text-center">
            Join 500+ kopitiams already using Auto-Fuiyoh
          </p>
        </motion.div>
      </section>

      {/* Bottom marquee strip */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/5 bg-[--dark]/90 backdrop-blur-sm py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-4 px-4">
              <span className="font-mono text-xs text-[--text-muted] uppercase tracking-widest">{item}</span>
              <span className="text-[--orange] text-xs">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
