'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, Package, Calendar, PlusCircle, Megaphone } from 'lucide-react';

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
      <div className="text-center mb-10">
        <h2 className="font-display font-black text-4xl text-[--cream] mb-2">What&apos;s your main goal?</h2>
        <p className="font-sans text-[--text-muted]">Choose one primary objective for this marketing campaign.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const isSelected = selectedGoal === goal.id;
          const Icon = goal.icon;

          return (
            <motion.button
              key={goal.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedGoal(goal.id)}
              className={`p-6 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-[--orange]/10 border-[--orange] shadow-lg shadow-[--orange]/10'
                  : 'bg-[--dark-2] border-white/10 hover:border-white/20'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                isSelected ? 'bg-[--orange] text-white' : 'bg-white/5 text-[--text-muted]'
              }`}>
                <Icon size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-[--cream]">{goal.title}</h3>
              <p className="font-sans text-sm text-[--text-muted] mt-1">{goal.desc}</p>
            </motion.button>
          );
        })}
      </div>

      <button
        disabled={!selectedGoal}
        onClick={() => selectedGoal && onSelect(selectedGoal)}
        className="w-full bg-[--orange] hover:bg-[--orange-light] disabled:opacity-40 text-white rounded-2xl py-5 font-display font-black text-xl mt-8 transition-all"
      >
        Generate My Campaign ⚡
      </button>
    </motion.div>
  );
}
