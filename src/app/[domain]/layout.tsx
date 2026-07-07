import { notFound } from 'next/navigation';

export default async function DomainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);
  
  if (decodedDomain === 'kaiee.in') {
    return <div className="main-site-layout">{children}</div>;
  }
  if (decodedDomain === 'community.kaiee.in') {
    return <div className="community-site-layout">{children}</div>;
  }
  if (decodedDomain === 'news.kaiee.in') {
    return <div className="news-site-layout">{children}</div>;
  }
  
  return notFound();
}
