'use client'

import { useState } from 'react';
import { generateNewsStrategy } from '@/app/[domain]/preview/news/actions';
import { Sparkles, X, ChevronRight, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const trendingNews = [
  { title: "Meta Unveils Next-Gen AI Models for Enterprise", category: "AI & Tech", time: "2 hours ago", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80" },
  { title: "The Future of WhatsApp Automation in 2026", category: "Automation", time: "5 hours ago", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80" },
  { title: "Startups Raising Millions with Minimal Teams", category: "Business", time: "1 day ago", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&q=80" }
];

export default function ActionableNewsList() {
  const [selectedNews, setSelectedNews] = useState<string | null>(null);
  const [niche, setNiche] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState('');

  const handleApplyClick = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedNews(title);
    setStrategy(''); // reset
  };

  const generateStrategy = async () => {
    if (!niche || !selectedNews) return;
    setIsGenerating(true);
    try {
      const result = await generateNewsStrategy(selectedNews, niche);
      setStrategy(result);
    } catch (e) {
      console.error(e);
      alert('Failed to generate strategy');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {trendingNews.map((news, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(0, 240, 255, 0.1)', textAlign: 'left', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }} className="news-card">
                <div style={{ height: '220px', width: '100%', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={news.image} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="news-image" />
                </div>
                <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#00F0FF', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {news.category}
                  </span>
                  <h4 style={{ fontSize: '24px', color: '#fff', margin: '15px 0', lineHeight: '1.4', flex: 1 }}>
                    {news.title}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                    <div style={{ fontSize: '14px', color: '#64748b' }}>
                      {news.time}
                    </div>
                    {/* ACTIONABLE CTA BUTTON */}
                    <button onClick={(e) => handleApplyClick(news.title, e)} className="apply-btn">
                      <Sparkles size={16} /> Apply to My Business
                    </button>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* SLIDE-OUT PANEL */}
      <div className={`slide-panel ${selectedNews ? 'open' : ''}`}>
        <div className="panel-header">
          <h3>Turn News into Action ⚡</h3>
          <button onClick={() => setSelectedNews(null)} className="close-panel-btn"><X size={24} /></button>
        </div>
        
        <div className="panel-content">
          {selectedNews && (
            <div className="news-context-box">
              <span className="context-label">News Context:</span>
              <p>{selectedNews}</p>
            </div>
          )}

          {!strategy ? (
            <div className="generator-form">
              <label>What is your business niche?</label>
              <input 
                type="text" 
                placeholder="e.g. Real Estate Agency in Delhi" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              />
              <button onClick={generateStrategy} disabled={!niche || isGenerating} className="generate-strategy-btn">
                {isGenerating ? <><Loader2 size={18} className="spin" /> Generating Strategy...</> : 'Generate AI Strategy'}
              </button>
            </div>
          ) : (
            <div className="strategy-result fade-in scrollbar-hide">
              <ReactMarkdown>{strategy}</ReactMarkdown>
              
              <button onClick={() => setStrategy('')} className="reset-btn">
                Generate Another Strategy
              </button>
            </div>
          )}
        </div>
      </div>

      {/* STYLES */}
      <style jsx global>{`
        .news-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 20px 40px rgba(0,0,0,0.5); 
          border-color: rgba(0, 240, 255, 0.4) !important; 
        }
        .news-card:hover .news-image {
          transform: scale(1.05);
        }
        .apply-btn {
          background: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3);
          color: #00F0FF; padding: 8px 12px; border-radius: 8px; font-size: 13px; font-weight: 600;
          display: flex; alignItems: center; gap: 6px; cursor: pointer; transition: 0.2s; z-index: 10;
        }
        .apply-btn:hover {
          background: #00F0FF; color: #000; box-shadow: 0 0 15px rgba(0,240,255,0.4);
        }

        /* SLIDE PANEL STYLES */
        .slide-panel {
          position: fixed; top: 0; right: -500px; width: 450px; height: 100vh;
          background: #0f172a; border-left: 1px solid rgba(255,255,255,0.1);
          box-shadow: -10px 0 30px rgba(0,0,0,0.5); z-index: 999;
          transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex; flex-direction: column;
        }
        .slide-panel.open { right: 0; }
        
        .panel-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .panel-header h3 { color: #f8fafc; font-size: 20px; margin: 0; }
        .close-panel-btn { background: transparent; border: none; color: #94a3b8; cursor: pointer; }
        .close-panel-btn:hover { color: #fff; }

        .panel-content { padding: 24px; display: flex; flex-direction: column; flex: 1; overflow-y: hidden; }
        
        .news-context-box {
          background: rgba(87, 115, 255, 0.1); border: 1px solid rgba(87, 115, 255, 0.2);
          padding: 16px; border-radius: 12px; margin-bottom: 30px;
        }
        .context-label { font-size: 12px; text-transform: uppercase; color: #5773FF; font-weight: 700; letter-spacing: 1px; }
        .news-context-box p { color: #f8fafc; font-size: 16px; margin: 8px 0 0; font-weight: 500; }

        .generator-form label { display: block; color: #cbd5e1; font-size: 14px; margin-bottom: 10px; }
        .generator-form input {
          width: 100%; padding: 14px; background: rgba(0,0,0,0.2); border: 1px solid #334155;
          border-radius: 8px; color: #fff; font-size: 16px; margin-bottom: 20px; outline: none;
        }
        .generator-form input:focus { border-color: #00F0FF; }
        
        .generate-strategy-btn {
          width: 100%; padding: 16px; background: linear-gradient(135deg, #00F0FF, #5773FF);
          color: #000; border: none; border-radius: 8px; font-weight: 800; font-size: 16px;
          cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px;
        }
        .generate-strategy-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        .strategy-result {
          flex: 1; overflow-y: auto; color: #e2e8f0; font-size: 15px; line-height: 1.6;
          padding-bottom: 40px; text-align: left;
        }
        .strategy-result h1, .strategy-result h2, .strategy-result h3 { color: #fff; margin-top: 20px; margin-bottom: 10px; }
        .strategy-result ul { padding-left: 20px; margin-bottom: 20px; }
        .strategy-result li { margin-bottom: 8px; }

        .reset-btn {
          width: 100%; padding: 12px; background: transparent; border: 1px solid #334155;
          color: #cbd5e1; border-radius: 8px; margin-top: 20px; cursor: pointer; transition: 0.2s;
        }
        .reset-btn:hover { background: #1e293b; color: #fff; }
      `}</style>
    </>
  );
}
