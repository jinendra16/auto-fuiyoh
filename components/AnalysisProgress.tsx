'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MESSAGES = [
  'Reading your menu...',
  'Analysing Google reviews...',
  'Understanding your brand...',
  'Building campaign strategy...',
];

export default function AnalysisProgress() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < MESSAGES.length - 1 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] relative noise">
      {/* Scanner ring */}
      <div className="relative w-52 h-52 mb-12">
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full border border-[--orange]/30"
        />
        {/* Rotating scan line */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
          className="absolute inset-4"
        >
          <div className="absolute top-0 left-1/2 -translate-x-px h-1/2 w-px bg-gradient-to-b from-[--orange] to-transparent origin-bottom" />
        </motion.div>
        {/* Centre dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[--orange] animate-pulse" />
        </div>
      </div>

      {/* Typewriter message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-sm text-[--text-muted] tracking-wider uppercase"
        >
          {MESSAGES[currentStep] ?? MESSAGES[MESSAGES.length - 1]}
        </motion.p>
      </AnimatePresence>

      <p className="mt-4 font-display font-bold text-2xl text-[--cream]">Analysing your brand</p>
    </div>
  );
}
