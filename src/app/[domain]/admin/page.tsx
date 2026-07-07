import { notFound } from 'next/navigation';
import NewsAdminDashboard from '@/components/news/Admin';

export default async function NewsAdminPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);
  
  // Only allow access on news subdomain
  if (decodedDomain !== 'news.kaiee.in') return notFound();

  return <NewsAdminDashboard />;
}
