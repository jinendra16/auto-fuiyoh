'use client';
import { motion } from 'motion/react';
import type { GeneratedAsset } from '@/lib/types';

const ROTATIONS = [-1.5, 1.2, -0.8];

interface Props {
  images: GeneratedAsset[];
  status: 'idle' | 'loading' | 'done' | 'error';
}

export default function ImageGrid({ images, status }: Props) {
  if (status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton-warm rounded-2xl aspect-square" />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
        <p className="text-red-400 font-mono text-sm">Image generation failed.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
      {images.map((img, idx) => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, rotate: ROTATIONS[idx % 3] }}
          whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
          transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
          className="bg-[--dark] rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer"
        >
          <div className="aspect-square relative group overflow-hidden">
            <img
              src={img.url ?? ''}
              alt={`Post ${idx + 1}`}
              className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-75"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <a
                href={img.url ?? '#'}
                download={`post-${idx + 1}.png`}
                className="w-full py-2.5 rounded-xl bg-[--orange] text-white text-sm font-mono text-center"
              >
                ⬇ Download
              </a>
            </div>
          </div>
          <div className="p-4">
            <p className="font-sans text-xs text-[--text-muted] line-clamp-2">
              {(img.content as { en?: string })?.en}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
