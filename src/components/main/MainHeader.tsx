'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles, ChevronDown, Layout, Newspaper, Users, Zap, X } from 'lucide-react';

export default function MainHeader() {
  const [askQuery, setAskQuery] = useState('');
  const [askResponse, setAskResponse] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showAskBox, setShowAskBox] = useState(false);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askQuery.trim()) return;
    setIsAsking(true);
    setAskResponse('');
    
    // Simulate AI thinking and routing
    setTimeout(() => {
      const lowerQuery = askQuery.toLowerCase();
      let responseText = "I can help with that! Please explore our automation services below or visit the Community for guides.";
      
      if (lowerQuery.includes('news') || lowerQuery.includes('update')) {
        responseText = "Looking for the latest updates? I suggest checking out the **Kaiee News Portal**.";
      } else if (lowerQuery.includes('community') || lowerQuery.includes('help') || lowerQuery.includes('prompt')) {
        responseText = "Join our **Kaiee Community** to win Prompt Bounties and get expert help!";
      } else if (lowerQuery.includes('whatsapp') || lowerQuery.includes('automate') || lowerQuery.includes('crm')) {
        responseText = "We specialize in WhatsApp & CRM automation. Check out our **Enterprise Solutions** below.";
      }
      
      setAskResponse(responseText);
      setIsAsking(false);
    }, 1200);
  };

  return (
    <>
      <header className="main-header glass-panel sticky-header">
        {/* LOGO */}
        <div className="logo-container">
          <div className="logo-icon spin-slow">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="url(#paint1_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="url(#paint2_linear)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="2" y1="7" x2="22" y2="7" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00F0FF" />
                  <stop offset="1" stopColor="#5773FF" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="2" y1="19.5" x2="22" y2="19.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00F0FF" />
                  <stop offset="1" stopColor="#5773FF" />
                </linearGradient>
                <linearGradient id="paint2_linear" x1="2" y1="14.5" x2="22" y2="14.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00F0FF" />
                  <stop offset="1" stopColor="#5773FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-text">Kaiee<span className="dot">.in</span></div>
        </div>

        {/* ECOSYSTEM SWITCHER */}
        <div className="ecosystem-switcher">
          <div className="switcher-tab active"><Layout size={14} /> Engine</div>
          <Link href="/preview/news" className="switcher-tab"><Newspaper size={14} /> News</Link>
          <Link href="/preview/community" className="switcher-tab"><Users size={14} /> Community</Link>
        </div>

        {/* ACTIONS */}
        <nav className="main-nav">
          <div 
            className="mega-menu-trigger"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            Capabilities <ChevronDown size={14} />
            
            {showMegaMenu && (
              <div className="mega-menu glass-panel">
                <div className="mega-grid">
                  <div className="mega-item">
                    <div className="mega-icon"><Zap size={20} color="#00F0FF" /></div>
                    <div>
                      <h4>WhatsApp Automation</h4>
                      <p>Full CRM sync & AI NLP routing.</p>
                    </div>
                  </div>
                  <div className="mega-item">
                    <div className="mega-icon"><Sparkles size={20} color="#5773FF" /></div>
                    <div>
                      <h4>AI Workflows</h4>
                      <p>Replace manual data entry with agents.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="ask-kaiee-trigger" onClick={() => setShowAskBox(true)}>
            <Sparkles size={16} /> Ask Kaiee
          </button>
          
          <button className="nav-cta">Client Login</button>
        </nav>
      </header>

      {/* ASK KAIEE OVERLAY */}
      {showAskBox && (
        <div className="ask-overlay" onClick={() => setShowAskBox(false)}>
          <div className="ask-box glass-panel" onClick={e => e.stopPropagation()}>
            <div className="ask-header">
              <h3><Sparkles size={18} color="#00F0FF" /> Ask Kaiee AI</h3>
              <button className="close-ask" onClick={() => setShowAskBox(false)}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAsk} className="ask-form">
              <div className="input-wrapper">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Ask me anything... (e.g. 'How do you automate WhatsApp?')"
                  value={askQuery}
                  onChange={e => setAskQuery(e.target.value)}
                />
              </div>
              <button type="submit" disabled={!askQuery.trim()}>Ask</button>
            </form>

            {(isAsking || askResponse) && (
              <div className="ask-response">
                {isAsking ? (
                  <div className="typing-indicator">Kaiee is thinking<span>.</span><span>.</span><span>.</span></div>
                ) : (
                  <div className="response-text">
                    {/* Render simple markdown bold for demo purposes */}
                    {askResponse.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{color: '#00F0FF'}}>{part}</strong> : part)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        /* HEADER STYLES */
        .sticky-header {
          position: fixed !important; top: 0; left: 0; right: 0; z-index: 100;
          border-radius: 0 0 20px 20px; border-top: none;
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px 30px; margin: 0 auto; max-width: 1400px;
          backdrop-filter: blur(15px); background: rgba(3, 7, 18, 0.7);
        }

        /* ECOSYSTEM SWITCHER */
        .ecosystem-switcher {
          display: flex; background: rgba(255,255,255,0.05); padding: 4px;
          border-radius: 100px; border: 1px solid rgba(255,255,255,0.1);
          position: absolute; left: 50%; transform: translateX(-50%);
        }
        .switcher-tab {
          padding: 8px 16px; border-radius: 100px; font-size: 13px; font-weight: 600;
          color: #94a3b8; text-decoration: none; display: flex; align-items: center; gap: 6px;
          transition: 0.3s; cursor: pointer;
        }
        .switcher-tab:hover { color: #fff; }
        .switcher-tab.active { background: rgba(255,255,255,0.1); color: #fff; }

        /* NAV STYLES */
        .main-nav { display: flex; align-items: center; gap: 20px; }
        .mega-menu-trigger {
          color: #e2e8f0; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 4px;
          cursor: pointer; position: relative; padding: 10px 0;
        }
        .mega-menu {
          position: absolute; top: 100%; right: -100px; width: 400px; padding: 20px;
          background: rgba(15, 23, 42, 0.95); border-radius: 16px; margin-top: 10px;
          animation: slideDown 0.2s ease forwards;
        }
        .mega-grid { display: flex; flex-direction: column; gap: 15px; }
        .mega-item { display: flex; gap: 15px; padding: 15px; border-radius: 12px; transition: 0.2s; cursor: pointer; }
        .mega-item:hover { background: rgba(255,255,255,0.05); }
        .mega-item h4 { color: #fff; margin: 0 0 5px; font-size: 15px; }
        .mega-item p { color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.4; }
        .mega-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(0,240,255,0.1); display: flex; align-items: center; justify-content: center; }

        /* ASK KAIEE TRIGGER */
        .ask-kaiee-trigger {
          background: linear-gradient(90deg, rgba(0,240,255,0.1), rgba(87,115,255,0.1));
          border: 1px solid rgba(0,240,255,0.3); color: #00F0FF; padding: 8px 16px;
          border-radius: 100px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px;
          cursor: pointer; transition: 0.3s;
        }
        .ask-kaiee-trigger:hover { background: rgba(0,240,255,0.2); box-shadow: 0 0 15px rgba(0,240,255,0.2); }

        /* ASK OVERLAY */
        .ask-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); z-index: 1000; padding-top: 100px; }
        .ask-box { width: 90%; max-width: 600px; margin: 0 auto; background: #0f172a; padding: 30px; border-radius: 20px; box-shadow: 0 30px 60px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); animation: slideDown 0.3s cubic-bezier(0.4,0,0.2,1); }
        .ask-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .ask-header h3 { margin: 0; color: #fff; display: flex; align-items: center; gap: 8px; font-size: 20px; }
        .close-ask { background: none; border: none; color: #64748b; cursor: pointer; transition: 0.2s; }
        .close-ask:hover { color: #f87171; }
        
        .ask-form { display: flex; gap: 10px; margin-bottom: 20px; }
        .input-wrapper { flex: 1; position: relative; }
        .search-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #64748b; }
        .ask-form input { width: 100%; background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 15px 15px 15px 45px; color: #fff; font-size: 16px; outline: none; transition: 0.2s; }
        .ask-form input:focus { border-color: #00F0FF; }
        .ask-form button { background: linear-gradient(135deg, #00F0FF, #5773FF); color: #000; font-weight: 700; border: none; padding: 0 25px; border-radius: 12px; cursor: pointer; }
        .ask-form button:disabled { opacity: 0.5; cursor: not-allowed; }

        .ask-response { background: rgba(0,240,255,0.05); border: 1px solid rgba(0,240,255,0.1); border-radius: 12px; padding: 20px; color: #e2e8f0; line-height: 1.6; }
        .typing-indicator span { animation: blink 1.4s infinite both; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
      `}</style>
    </>
  );
}
