import Link from 'next/link';
import { notFound } from 'next/navigation';
import ActionableNewsList from '@/components/news/ActionableNewsList';

export default async function NewsPreviewPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);
  
  if (decodedDomain !== 'kaiee.in' && decodedDomain !== 'news.kaiee.in') return notFound();

  return (
    <>
      <style>{`
        .news-site-layout { background: #030712 !important; color: #f8fafc !important; }
      `}</style>
      <div className="main-container" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '52px', fontWeight: '800', marginBottom: '20px', background: 'linear-gradient(90deg, #00F0FF, #5773FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Kaiee News Portal
        </h1>
        <p style={{ fontSize: '22px', margin: '0 auto 60px', color: '#cbd5e1', maxWidth: '800px', lineHeight: '1.6' }}>
          Stay updated with the latest in technology, business, startups, and AI.
          Our dedicated news portal brings you curated stories and breaking updates.
        </p>      {/* TRENDING NEWS PREVIEW WITH ACTIONABLE CTA */}
      <div style={{ marginBottom: '80px' }}>
        <h3 style={{ fontSize: '32px', color: '#f8fafc', marginBottom: '30px', textAlign: 'left', fontWeight: '700' }}>
          🔥 Trending Now
        </h3>
        <ActionableNewsList />
      </div>
      
      {/* FEATURES SECTION (MOVED BELOW NEWS & INCREASED FONT) */}
      <div style={{ margin: '40px auto 60px', padding: '50px', maxWidth: '900px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}>
        <h2 style={{ marginBottom: '35px', fontSize: '36px', color: '#f8fafc', fontWeight: '700' }}>Features</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start', margin: '0 auto', padding: '0 20px', maxWidth: 'max-content' }}>
          <li style={{ fontSize: '22px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '28px' }}>📰</span> Real-time breaking news updates
          </li>
          <li style={{ fontSize: '22px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '28px' }}>📊</span> In-depth business and startup analysis
          </li>
          <li style={{ fontSize: '22px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '28px' }}>📈</span> Ad-optimized reading experience
          </li>
          <li style={{ fontSize: '22px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '28px' }}>📱</span> Mobile friendly, fast-loading architecture
          </li>
        </ul>
      </div>

      {/* HIGHLIGHTED BUTTON */}
      <a href="http://news.localhost:3000" className="know-more-btn" style={{ textDecoration: 'none', display: 'inline-block', padding: '18px 45px', fontSize: '22px', fontWeight: '800', borderRadius: '50px', background: 'linear-gradient(135deg, #00F0FF 0%, #5773FF 100%)', color: '#000', boxShadow: '0 10px 30px rgba(0, 240, 255, 0.3)', transition: 'all 0.3s' }}>
        Know More (Go to News) →
      </a>

      {/* INLINE CSS FOR HOVER EFFECTS */}
      <style>{`
        .news-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 20px 40px rgba(0,0,0,0.5); 
          border-color: rgba(0, 240, 255, 0.4) !important; 
        }
        .news-card:hover .news-image {
          transform: scale(1.05);
        }
        .know-more-btn:hover { 
          transform: translateY(-3px) scale(1.02); 
          box-shadow: 0 15px 40px rgba(0, 240, 255, 0.6) !important; 
        }
      `}</style>
    </div>
    </>
  );
}
