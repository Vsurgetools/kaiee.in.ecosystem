import { notFound } from 'next/navigation';
import MainHome from '@/components/main/Home';
import CommunityHome from '@/components/community/Home';
import NewsHome from '@/components/news/Home';

export default async function DomainPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);
  
  if (decodedDomain === 'kaiee.in') {
    return <MainHome />;
  }
  if (decodedDomain === 'community.kaiee.in') {
    return <CommunityHome />;
  }
  if (decodedDomain === 'news.kaiee.in') {
    return <NewsHome />;
  }
  
  return notFound();
}
