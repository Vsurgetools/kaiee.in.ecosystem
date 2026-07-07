import { notFound } from 'next/navigation';
import WritePageClient from './WritePageClient';

export default async function WritePage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);
  
  // Only allow access on community subdomain
  if (decodedDomain !== 'community.kaiee.in') return notFound();

  return (
    <div className="community-site-layout">
      <header className="community-header">
        <div className="logo">kaiee.in/community</div>
        <nav className="community-nav">
          <button className="login-btn">Sign Out</button>
        </nav>
      </header>
      <WritePageClient domain={decodedDomain} />
    </div>
  );
}
