import Link from 'next/link';
import MainHeader from '@/components/main/MainHeader';

export default function MainHome() {
  return (
    <div className="main-wrapper">
      {/* Dynamic Background Elements */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
      
      {/* Animated perspective grid floor */}
      <div className="perspective-grid-container">
        <div className="perspective-grid"></div>
      </div>

      <div className="main-container">
        <MainHeader />

        <main>
          <section className="hero">
            
            {/* 3D Automation Core Visual */}
            <div className="hero-3d-visual">
              <div className="cube-container">
                <div className="cube">
                  <div className="face face-front">API</div>
                  <div className="face face-back">CRM</div>
                  <div className="face face-right">AI</div>
                  <div className="face face-left">BOT</div>
                  <div className="face face-top"></div>
                  <div className="face face-bottom"></div>
                </div>
              </div>
              <div className="floating-particles">
                <div className="particle p1"></div>
                <div className="particle p2"></div>
                <div className="particle p3"></div>
              </div>
            </div>

            <div className="hero-content stagger-in">
              <div className="hero-badge slide-up">v2.0 Automation Engine Live</div>
              <h1 className="hero-title slide-up-delay-1">
                Hyper-Scale Your <br />
                <span className="gradient-text">Business Operations</span>
              </h1>
              <p className="hero-subtitle slide-up-delay-2">
                Deploy intelligent AI workflows, automated CRM syncs, and Meta-certified WhatsApp integrations in seconds. Don't just work—dominate.
              </p>
              <div className="hero-actions slide-up-delay-3">
                <button className="primary-btn glow-effect">
                  <span>Start Automating</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <button className="secondary-btn">View Architecture</button>
              </div>
            </div>
            
            <div className="stats-row slide-up-delay-4">
              <div className="stat-item float-element-1">
                <div className="stat-value">99.9%</div>
                <div className="stat-label">Uptime SLA</div>
              </div>
              <div className="stat-item float-element-2">
                <div className="stat-value">50M+</div>
                <div className="stat-label">Tasks Automated</div>
              </div>
              <div className="stat-item float-element-3">
                <div className="stat-value">&lt;20ms</div>
                <div className="stat-label">Avg Latency</div>
              </div>
            </div>
          </section>

          <section className="services-section">
            <div className="section-header">
              <div className="section-tag pulse-text">Enterprise Solutions</div>
              <h2>Intelligent Automation Core</h2>
            </div>
            
            <div className="bento-grid">
              <div className="bento-card feature-large glass-panel card-3d">
                <div className="card-inner">
                  <div className="card-icon whatsapp-icon spin-hover">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <h3>Omnichannel WhatsApp Bot</h3>
                  <p>Official Meta Cloud API integration with NLP intent recognition and instant CRM syncing.</p>
                  <div className="card-visual abstract-flow 3d-layer">
                    <div className="flow-node"></div><div className="flow-line"></div><div className="flow-node active"></div><div className="flow-line"></div><div className="flow-node"></div>
                  </div>
                </div>
              </div>
              
              <div className="bento-card feature-medium glass-panel card-3d">
                <div className="card-inner">
                  <div className="card-icon data-icon float-hover">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                  </div>
                  <h3>Data Pipelines</h3>
                  <p>Real-time ETL workflows connecting your siloed platforms with ultra-low latency.</p>
                </div>
              </div>

              <div className="bento-card feature-medium glass-panel card-3d">
                <div className="card-inner">
                  <div className="card-icon ai-icon float-hover">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </div>
                  <h3>Revenue Operations</h3>
                  <p>Automate invoicing, dynamic lead scoring, and automated pipeline generation instantly.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="free-tools-section">
            <div className="section-header">
              <div className="section-tag pulse-text">Open Ecosystem</div>
              <h2>AI Tooling Sandbox</h2>
              <p>Experience our underlying AI models with these free utility tools.</p>
            </div>
            
            <div className="tools-grid">
              <ToolCard title="Image Generation" desc="Text-to-image synthesis using stable diffusion models." icon="image" />
              <ToolCard title="Prompt Architect" desc="Algorithmic prompt optimization for LLMs." icon="terminal" />
              <ToolCard title="Copywriting Engine" desc="Zero-shot conversion-optimized marketing copy." icon="pen" />
              <ToolCard title="News Scraper" desc="Real-time web scraping and summarization agent." icon="globe" />
            </div>
          </section>
        </main>
        
        <footer className="main-footer">
          <div className="footer-content">
            <div className="logo-text">Kaiee<span className="dot">.in</span></div>
            <p className="copyright">© 2026 Vsurgemedia Automation. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function ToolCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="tool-card glass-panel group card-3d">
      <div className="card-inner">
        <div className="tool-icon-wrapper">
          <div className="tool-icon pulse-glow"></div>
        </div>
        <h4 className="tool-title">{title}</h4>
        <p className="tool-desc">{desc}</p>
        <div className="tool-footer">
          <span className="launch-text">Initialize module</span>
          <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
