import { notFound } from 'next/navigation';
import BountyBoard from '@/components/community/BountyBoard';

export default async function BountiesPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);
  
  // Only accessible on the community domain
  if (decodedDomain !== 'community.kaiee.in') return notFound();

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f8fafc', padding: '60px 20px', fontFamily: 'var(--main-font)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', background: 'linear-gradient(90deg, #F59E0B, #EF4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Prompt Bounties 🎯
          </h1>
          <p style={{ fontSize: '20px', color: '#cbd5e1', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Solve real-world challenges by submitting your best AI prompts and automation workflows. Win <strong style={{color: '#F59E0B'}}>Kaiee Points</strong>, climb the leaderboard, and build your reputation!
          </p>
        </header>

        <BountyBoard />
      </div>
    </div>
  );
}
