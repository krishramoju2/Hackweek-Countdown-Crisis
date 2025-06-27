'use client';
import Countdown from './components/Countdown';
import CommunityInfo from './components/CommunityInfo';

export default function HomePage() {
  return (
    <main style={{ backgroundColor: typeof window !== 'undefined' ? '#f0f0f0' : '#f0f0f1', padding: '20px', borderRadius: '10px'}}>
      <CommunityInfo />
      <Countdown />
    </main>
  );
}

