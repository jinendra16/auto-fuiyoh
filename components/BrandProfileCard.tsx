'use client';

import { useState } from 'react';
import { BrandProfile } from '@/lib/types';
import { Edit3, Save, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function BrandProfileCard({ profile, onApprove }: { profile: BrandProfile; onApprove: (p: BrandProfile) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<BrandProfile>(profile);

  const handleSave = () => {
    setIsEditing(false);
    onApprove(editedProfile);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative bg-[--dark-2] rounded-3xl p-8 border-l-4 border-[--orange] shadow-2xl w-full max-w-3xl"
    >
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-[--text-muted] mb-2">Brand Profile</p>
          {isEditing ? (
            <input
              type="text"
              value={editedProfile.businessName}
              onChange={(e) => setEditedProfile({ ...editedProfile, businessName: e.target.value })}
              className="bg-transparent border-b border-[--orange]/40 text-[--cream] font-display font-black text-3xl focus:outline-none focus:border-[--orange] py-1 w-full"
            />
          ) : (
            <h2 className="font-display font-black text-4xl text-[--cream]">{editedProfile.businessName}</h2>
          )}
        </div>
        <div className="flex flex-col items-center ml-4">
          {/* SVG arc score */}
          <svg viewBox="0 0 120 70" className="w-36 overflow-visible">
            <path d="M15,65 A50,50 0 0,1 105,65" fill="none" stroke="#2C2420" strokeWidth="8" strokeLinecap="round" />
            <motion.path
              d="M15,65 A50,50 0 0,1 105,65"
              fill="none"
              stroke="#E8470A"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: editedProfile.currentMarketingMaturityScore / 10 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            />
          </svg>
          <span className="font-display font-black text-3xl text-[--orange] -mt-4">
            {editedProfile.currentMarketingMaturityScore}
            <span className="text-lg text-[--text-muted]">/10</span>
          </span>
          <span className="font-mono text-xs text-[--text-muted] uppercase tracking-widest mt-1">Marketing Maturity</span>
        </div>
      </div>

      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[--cream] transition-colors text-sm font-medium"
        >
          <Edit3 size={16} /> Edit
        </button>
      ) : (
        <div className="absolute top-8 right-8 flex gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[--text-muted] transition-colors text-sm"
          >
            <X size={16} /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[--orange] hover:bg-[--orange-light] text-white transition-colors text-sm"
          >
            <Save size={16} /> Save
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[--text-muted] mb-3">Cuisine Type</p>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.cuisineType.en}
                onChange={(e) => setEditedProfile({ ...editedProfile, cuisineType: { ...editedProfile.cuisineType, en: e.target.value } })}
                className="bg-transparent border-b border-[--orange]/40 text-[--cream] font-sans focus:outline-none focus:border-[--orange] py-1 w-full"
              />
            ) : (
              <p className="text-[--cream] font-sans">
                {editedProfile.cuisineType.en} / {editedProfile.cuisineType.bm} / {editedProfile.cuisineType.zh}
              </p>
            )}
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[--text-muted] mb-3">Signature Dishes</p>
            {isEditing ? (
              <textarea
                value={editedProfile.signatureDishes.join(', ')}
                onChange={(e) => setEditedProfile({ ...editedProfile, signatureDishes: e.target.value.split(',').map(s => s.trim()) })}
                className="bg-transparent border-b border-[--orange]/40 text-[--cream] font-sans focus:outline-none focus:border-[--orange] py-1 w-full min-h-[80px]"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {editedProfile.signatureDishes.map((dish, i) => (
                  <span key={i} className="bg-[--gold]/15 text-[--gold] border border-[--gold]/30 px-3 py-1 rounded-full font-mono text-xs">
                    {dish}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[--text-muted] mb-3">Target Audience</p>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.inferredAudience}
                onChange={(e) => setEditedProfile({ ...editedProfile, inferredAudience: e.target.value })}
                className="bg-transparent border-b border-[--orange]/40 text-[--cream] font-sans focus:outline-none focus:border-[--orange] py-1 w-full"
              />
            ) : (
              <p className="text-[--cream] font-sans">{editedProfile.inferredAudience}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[--text-muted] mb-3">Brand Personality</p>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.brandPersonality.join(', ')}
                onChange={(e) => setEditedProfile({ ...editedProfile, brandPersonality: e.target.value.split(',').map(s => s.trim()) })}
                className="bg-transparent border-b border-[--orange]/40 text-[--cream] font-sans focus:outline-none focus:border-[--orange] py-1 w-full"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {editedProfile.brandPersonality.map((trait, i) => (
                  <span key={i} className="bg-[--orange]/10 text-[--orange] border border-[--orange]/20 px-3 py-1 rounded-full font-mono text-xs">
                    {trait}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[--text-muted] mb-3">Key Strengths</p>
            {isEditing ? (
              <textarea
                value={editedProfile.keyStrengths.join(', ')}
                onChange={(e) => setEditedProfile({ ...editedProfile, keyStrengths: e.target.value.split(',').map(s => s.trim()) })}
                className="bg-transparent border-b border-[--orange]/40 text-[--cream] font-sans focus:outline-none focus:border-[--orange] py-1 w-full min-h-[80px]"
              />
            ) : (
              <ul className="space-y-1">
                {editedProfile.keyStrengths.map((strength, i) => (
                  <li key={i} className="text-[--cream] font-sans text-sm flex items-start gap-2">
                    <span className="text-[--orange] font-bold">→</span>
                    {strength}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {!isEditing && (
        <button
          onClick={() => onApprove(editedProfile)}
          className="w-full bg-[--orange] hover:bg-[--orange-light] text-white rounded-2xl py-4 font-display font-bold text-lg mt-8 transition-all"
        >
          Looks Good, Let&apos;s Go ⚡
        </button>
      )}
    </motion.div>
  );
}
