import { notFound } from 'next/navigation';
import MainHeader from '@/components/main/MainHeader';
import DigitalTwinStudio from '@/components/main/DigitalTwinStudio';

export default async function TwinPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const decodedDomain = decodeURIComponent(domain);
  
  // Available on the main platform
  if (decodedDomain !== 'kaiee.in') return notFound();

  return (
    <div className="main-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainHeader />
      
      <main style={{ flex: 1, padding: '120px 20px 60px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-tag pulse-text" style={{ margin: '0 auto 15px' }}>Kaiee Enterprise</div>
            <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', color: '#fff' }}>
              Digital Twin <span style={{ color: '#00F0FF' }}>Studio</span>
            </h1>
            <p style={{ fontSize: '20px', color: '#94a3b8', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              Train an autonomous AI clone on your business data. Deploy it as a 24/7 sales agent, customer support bot, or WhatsApp responder.
            </p>
          </header>

          <DigitalTwinStudio />
        </div>
      </main>
      
      {/* Background aesthetics */}
      <div className="bg-orb orb-1" style={{ opacity: 0.5 }}></div>
      <div className="bg-orb orb-2" style={{ opacity: 0.3 }}></div>
    </div>
  );
}
