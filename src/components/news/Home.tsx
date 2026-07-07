export default function NewsHome() {
  return (
    <div className="news-container">
      <header className="news-header">
        <div className="logo-section">
          <div className="logo">Kaiee News</div>
          <div className="date">{new Date().toDateString()}</div>
        </div>
        <nav className="news-nav">
          <a href="#">Top Stories</a>
          <a href="#">Technology</a>
          <a href="#">Business</a>
          <a href="#">Startups</a>
          <a href="#">AI</a>
        </nav>
      </header>
      
      <main className="news-main">
        <div className="top-ad-banner">
          <p>Advertisement</p>
        </div>
        
        <div className="news-grid">
          <section className="main-story">
            <div className="story-image-placeholder"></div>
            <h1>Meta announces new WhatsApp Business API features for 2026</h1>
            <p>Major changes are coming to how businesses interact with customers on the world's most popular messaging app...</p>
          </section>
          
          <aside className="trending-sidebar">
            <h3>Trending Now</h3>
            <ul>
              <li>
                <h4>AI Startup raises $50M to revolutionize customer service</h4>
                <span className="time">2 hours ago</span>
              </li>
              <li>
                <h4>Google updates search algorithm, prioritizing local businesses</h4>
                <span className="time">5 hours ago</span>
              </li>
              <li>
                <h4>The state of e-commerce in India: Q3 Report</h4>
                <span className="time">1 day ago</span>
              </li>
            </ul>
            <div className="sidebar-ad-slot">
              <p>Ad Space</p>
            </div>
          </aside>
        </div>
        
        <section className="category-section">
          <h2>Technology</h2>
          <div className="category-grid">
            <article className="small-card">
              <div className="thumb"></div>
              <h4>New semiconductor plant announced</h4>
            </article>
            <article className="small-card">
              <div className="thumb"></div>
              <h4>Cybersecurity threats on the rise for SMEs</h4>
            </article>
            <article className="small-card">
              <div className="thumb"></div>
              <h4>Cloud computing costs drop significantly</h4>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
