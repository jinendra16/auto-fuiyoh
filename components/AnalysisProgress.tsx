'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, Search, MapPin, Coffee, Star } from 'lucide-react';

const steps = [
  { id: 1, text: 'Scanning Google Maps listing...', icon: MapPin },
  { id: 2, text: 'Reading customer reviews...', icon: Star },
  { id: 3, text: 'Analysing menu & signature dishes...', icon: Coffee },
  { id: 4, text: 'Building brand profile...', icon: Search },
];

export default function AnalysisProgress() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="mb-12 relative">
        <div className="w-32 h-32 mx-auto rounded-full bg-[#E8470A]/10 flex items-center justify-center relative z-10">
          <Loader2 size={48} className="text-[#E8470A] animate-spin" />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#E8470A]/20 blur-xl -z-10"
        />
      </div>

      <h2 className="text-3xl font-display font-bold mb-8">Analysing your brand...</h2>

      <div className="space-y-4 text-left">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isActive || isCompleted ? 1 : 0.3, x: 0 }}
              className={`flex items-center gap-4 p-4 rounded-2xl border ${
                isActive ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-green-500/20 text-green-400' : 
                isActive ? 'bg-[#E8470A]/20 text-[#E8470A]' : 'bg-white/5 text-gray-500'
              }`}>
                <Icon size={20} />
              </div>
              <span className={`font-medium ${
                isCompleted ? 'text-green-400' : 
                isActive ? 'text-white' : 'text-gray-500'
              }`}>
                {step.text}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
