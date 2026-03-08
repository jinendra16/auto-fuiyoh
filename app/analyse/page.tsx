'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnalysisProgress from '@/components/AnalysisProgress';
import BrandProfileCard from '@/components/BrandProfileCard';
import GoalSelector from '@/components/GoalSelector';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { BrandProfile } from '@/lib/types';

export default function AnalysePage() {
  const [url, setUrl] = useState<string | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(true);
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'analysing' | 'review' | 'goal'>('analysing');
  const router = useRouter();

  useEffect(() => {
    const storedUrl = sessionStorage.getItem('fuiyoh_url');
    if (!storedUrl) {
      router.push('/');
      return;
    }
    setUrl(storedUrl);
    
    // Start analysis
    const analyseUrl = async () => {
      try {
        const res = await fetch('/api/analyse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: storedUrl }),
        });
        
        if (!res.ok) throw new Error('Failed to analyse URL');
        
        const data = await res.json();
        setBrandProfile(data.brandProfile);
        setStep('review');
        setIsAnalysing(false);
      } catch (err) {
        console.error(err);
        setError('We could not analyse this URL. Please try again with a different link.');
        setIsAnalysing(false);
      }
    };

    analyseUrl();
  }, [router]);

  const handleProfileApproved = (updatedProfile: BrandProfile) => {
    setBrandProfile(updatedProfile);
    sessionStorage.setItem('fuiyoh_brand_profile', JSON.stringify(updatedProfile));
    setStep('goal');
  };

  const handleGoalSelected = async (goal: string) => {
    sessionStorage.setItem('fuiyoh_campaign_goal', goal);
    // Redirect to results page which will handle generation
    router.push('/results');
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-20 text-center">
        <div className="p-8 rounded-3xl bg-red-500/10 border border-red-500/20 max-w-md">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Alamak!</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-white/10 hover:bg-white/20 text-white rounded-xl px-6 py-3 font-medium transition-all"
          >
            Try Another Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12 w-full max-w-4xl mx-auto">
      {step === 'analysing' && <AnalysisProgress />}
      {step === 'review' && brandProfile && (
        <ErrorBoundary>
          <BrandProfileCard profile={brandProfile} onApprove={handleProfileApproved} />
        </ErrorBoundary>
      )}
      {step === 'goal' && (
        <GoalSelector onSelect={handleGoalSelected} />
      )}
    </div>
  );
}
