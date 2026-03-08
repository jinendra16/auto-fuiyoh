'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, Package, Calendar, PlusCircle, Megaphone, ArrowRight } from 'lucide-react';

const goals = [
  { id: 'dine-in', icon: Utensils, title: 'Increase Dine-in Traffic', desc: 'Get more customers walking through your doors.' },
  { id: 'delivery', icon: Package, title: 'Boost Delivery Orders', desc: 'Push more sales through GrabFood, Foodpanda, etc.' },
  { id: 'festive', icon: Calendar, title: 'Festive Promotion', desc: 'Run a special campaign for an upcoming holiday.' },
  { id: 'new-item', icon: PlusCircle, title: 'Launch New Menu Item', desc: 'Create hype around a new dish or drink.' },
  { id: 'awareness', icon: Megaphone, title: 'Brand Awareness', desc: 'Build your reputation and get your name out there.' },
];

export default function GoalSelector({ onSelect }: { onSelect: (goal: string) => void }) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display font-bold text-white mb-4">What&apos;s your main goal?</h2>
        <p className="text-xl text-gray-400">Choose one primary objective for this marketing campaign.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {goals.map((goal) => {
          const isSelected = selectedGoal === goal.id;
          const Icon = goal.icon;
          
          return (
            <motion.button
              key={goal.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedGoal(goal.id)}
              className={`p-6 rounded-3xl border-2 text-left transition-all ${
                isSelected 
                  ? 'bg-[#E8470A]/10 border-[#E8470A] shadow-lg shadow-[#E8470A]/20' 
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                isSelected ? 'bg-[#E8470A] text-white' : 'bg-white/10 text-gray-300'
              }`}>
                <Icon size={28} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                {goal.title}
              </h3>
              <p className={`text-sm ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                {goal.desc}
              </p>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          disabled={!selectedGoal}
          onClick={() => selectedGoal && onSelect(selectedGoal)}
          className="bg-[#E8470A] hover:bg-[#ff5a1a] disabled:opacity-50 disabled:hover:bg-[#E8470A] text-white rounded-xl px-10 py-5 font-bold text-xl flex items-center gap-3 transition-all shadow-xl shadow-[#E8470A]/20"
        >
          <span>Generate My Campaign</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </motion.div>
  );
}
