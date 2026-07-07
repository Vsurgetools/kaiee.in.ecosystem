import Link from 'next/link';

export default function CommunityHome() {
  return (
    <div className="community-container">
      <header className="community-header">
        <div className="logo">kaiee.in/community</div>
        <nav className="community-nav">
          <Link href="/bounties" style={{ textDecoration: 'none', color: '#1a8917', fontWeight: 'bold', marginRight: '20px' }}>
            🏆 Prompt Bounties
          </Link>
          <Link href="/write">
            <button className="write-btn">Write an Article</button>
          </Link>
          <button className="login-btn">Sign In</button>
        </nav>
      </header>
      
      <main className="community-main">
        <section className="featured-articles">
          <h2>Trending Business Stories</h2>
          <div className="article-list">
            <article className="article-preview">
              <h3>How we scaled our bakery with WhatsApp automation</h3>
              <p className="excerpt">Discover the exact workflow that led to a 300% increase in repeat orders...</p>
              <div className="meta">By John Doe • 5 min read</div>
            </article>
            <article className="article-preview">
              <h3>The ultimate guide to local SEO in 2026</h3>
              <p className="excerpt">A step-by-step framework for small business owners looking to dominate local search.</p>
              <div className="meta">By Jane Smith • 8 min read</div>
            </article>
          </div>
        </section>
        
        <aside className="community-sidebar">
          <div className="ad-slot">
            <p>Ad Space</p>
          </div>
          <div className="topics">
            <h3>Popular Topics</h3>
            <div className="tags">
              <span>Marketing</span>
              <span>Automation</span>
              <span>Growth</span>
              <span>AI</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
