'use client';

import { useState } from 'react';
import { BrandProfile } from '@/lib/types';
import { CheckCircle2, Edit3, Save, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function BrandProfileCard({ profile, onApprove }: { profile: BrandProfile, onApprove: (p: BrandProfile) => void }) {
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
      className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Brand Profile</h2>
          <p className="text-gray-400">Here&apos;s what our AI understood about your business.</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-sm font-medium"
          >
            <Edit3 size={16} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 transition-colors text-sm font-medium"
            >
              <X size={16} /> Cancel
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E8470A] hover:bg-[#ff5a1a] text-white transition-colors text-sm font-medium"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Business Name</label>
            {isEditing ? (
              <input 
                type="text" 
                value={editedProfile.businessName}
                onChange={(e) => setEditedProfile({...editedProfile, businessName: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E8470A]"
              />
            ) : (
              <p className="text-xl font-bold text-white">{editedProfile.businessName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Cuisine Type</label>
            {isEditing ? (
              <input 
                type="text" 
                value={editedProfile.cuisineType.en}
                onChange={(e) => setEditedProfile({...editedProfile, cuisineType: {...editedProfile.cuisineType, en: e.target.value}})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E8470A]"
              />
            ) : (
              <p className="text-lg text-white">{editedProfile.cuisineType.en} / {editedProfile.cuisineType.bm} / {editedProfile.cuisineType.zh}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Signature Dishes</label>
            {isEditing ? (
              <textarea 
                value={editedProfile.signatureDishes.join(', ')}
                onChange={(e) => setEditedProfile({...editedProfile, signatureDishes: e.target.value.split(',').map(s => s.trim())})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E8470A] min-h-[100px]"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {editedProfile.signatureDishes.map((dish, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-[#E8470A]/20 text-[#E8470A] text-sm font-medium">
                    {dish}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Target Audience</label>
            {isEditing ? (
              <input 
                type="text" 
                value={editedProfile.inferredAudience}
                onChange={(e) => setEditedProfile({...editedProfile, inferredAudience: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E8470A]"
              />
            ) : (
              <p className="text-lg text-white">{editedProfile.inferredAudience}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Brand Personality</label>
            {isEditing ? (
              <input 
                type="text" 
                value={editedProfile.brandPersonality.join(', ')}
                onChange={(e) => setEditedProfile({...editedProfile, brandPersonality: e.target.value.split(',').map(s => s.trim())})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E8470A]"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {editedProfile.brandPersonality.map((trait, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                    {trait}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Key Strengths</label>
            {isEditing ? (
              <textarea 
                value={editedProfile.keyStrengths.join(', ')}
                onChange={(e) => setEditedProfile({...editedProfile, keyStrengths: e.target.value.split(',').map(s => s.trim())})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E8470A] min-h-[100px]"
              />
            ) : (
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {editedProfile.keyStrengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {!isEditing && (
        <div className="mt-10 pt-8 border-t border-white/10 flex justify-end">
          <button 
            onClick={() => onApprove(editedProfile)}
            className="bg-[#E8470A] hover:bg-[#ff5a1a] text-white rounded-xl px-8 py-4 font-bold text-lg flex items-center gap-3 transition-all shadow-lg shadow-[#E8470A]/20"
          >
            <span>Looks Good, Let&apos;s Go</span>
            <CheckCircle2 size={24} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
