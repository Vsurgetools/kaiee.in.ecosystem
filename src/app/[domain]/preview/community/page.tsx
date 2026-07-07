import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CommunityPreviewPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);
  
  if (decodedDomain !== 'kaiee.in') return notFound();

  return (
    <div className="main-container" style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1>Kaiee Community</h1>
      <p style={{ fontSize: '20px', margin: '20px 0', color: '#cbd5e1' }}>
        A dedicated platform for business owners to share insights, write articles, and grow together.
        Leverage our AI tools to write SEO optimized business stories instantly.
      </p>
      
      <div style={{ margin: '40px 0', padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ marginBottom: '20px' }}>What you get:</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <li>🚀 AI-driven SEO article generation</li>
          <li>✍️ Rich text editor for manual writing</li>
          <li>📈 Connect with other business owners</li>
          <li>🔍 High visibility and organic traffic</li>
        </ul>
      </div>

      <a href="http://community.localhost:3000" className="cta-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
        Know More (Go to Community)
      </a>
    </div>
  );
}
