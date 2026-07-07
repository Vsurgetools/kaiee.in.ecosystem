'use client'

import { useState } from 'react';
import { UploadCloud, Link as LinkIcon, FileText, Settings, Play, MessageSquare, Send, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function DigitalTwinStudio() {
  const [activeTab, setActiveTab] = useState<'train' | 'simulate'>('train');
  
  // Training State
  const [personaName, setPersonaName] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [knowledgeText, setKnowledgeText] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [isTrained, setIsTrained] = useState(false);

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'twin', content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleTrain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personaName.trim() || !knowledgeText.trim()) return;
    
    setIsTraining(true);
    // Simulate AI embeddings generation & training
    setTimeout(() => {
      setIsTraining(false);
      setIsTrained(true);
      setActiveTab('simulate');
      setChatHistory([{ role: 'twin', content: `Hello! I am ${personaName}. I have been trained on your data and I'm ready to assist your customers. How can I help you today?` }]);
    }, 2500);
  };

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newHistory = [...chatHistory, { role: 'user', content: chatInput } as const];
    setChatHistory(newHistory);
    setChatInput('');
    setIsTyping(true);

    // Simulate Twin Response
    setTimeout(() => {
      setChatHistory([...newHistory, { 
        role: 'twin', 
        content: `Based on my training data, I understand your question. Since I am a simulated Digital Twin of "${personaName}", I am programmed to respond dynamically using the knowledge base you provided earlier.` 
      } as const]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="twin-studio">
      <div className="studio-sidebar glass-panel">
        <nav className="studio-nav">
          <button 
            className={`nav-btn ${activeTab === 'train' ? 'active' : ''}`}
            onClick={() => setActiveTab('train')}
          >
            <Settings size={18} /> 1. Train Twin
          </button>
          <button 
            className={`nav-btn ${activeTab === 'simulate' ? 'active' : ''}`}
            onClick={() => setActiveTab('simulate')}
            disabled={!isTrained}
          >
            <Play size={18} /> 2. Test Simulator {isTrained && <CheckCircle2 size={14} color="#4ade80" style={{marginLeft: 'auto'}} />}
          </button>
        </nav>
        
        <div className="twin-status">
          <h4>Status</h4>
          <div className="status-indicator">
            <span className={`dot ${isTrained ? 'green' : 'red'}`}></span>
            {isTrained ? 'Twin is Active' : 'Not Trained'}
          </div>
        </div>
      </div>

      <div className="studio-main glass-panel">
        {activeTab === 'train' && (
          <div className="train-panel fade-in">
            <h2>Configure Your Digital Twin</h2>
            <p className="subtitle">Upload your company data to create an AI clone that acts on your behalf.</p>

            <form onSubmit={handleTrain} className="train-form">
              <div className="form-group">
                <label>Twin Persona Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Alex - Customer Success Lead" 
                  value={personaName}
                  onChange={e => setPersonaName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Behavior & Tone (System Prompt)</label>
                <textarea 
                  placeholder="e.g., You are a helpful sales assistant. Always try to schedule a demo..."
                  rows={3}
                  value={systemPrompt}
                  onChange={e => setSystemPrompt(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Knowledge Base (Upload or Paste Data)</label>
                <div className="kb-tabs">
                  <button type="button" className="kb-tab active"><FileText size={16}/> Text</button>
                  <button type="button" className="kb-tab"><LinkIcon size={16}/> Website URL</button>
                  <button type="button" className="kb-tab"><UploadCloud size={16}/> PDF/Docs</button>
                </div>
                <textarea 
                  className="kb-input"
                  placeholder="Paste your company FAQs, product descriptions, or sales scripts here..."
                  rows={8}
                  value={knowledgeText}
                  onChange={e => setKnowledgeText(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="train-btn" disabled={isTraining || !personaName || !knowledgeText}>
                {isTraining ? <><RefreshCw size={18} className="spin" /> Generating Embeddings...</> : <><SparklesIcon /> Train & Deploy Twin</>}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'simulate' && (
          <div className="simulate-panel fade-in">
            <div className="chat-header">
              <div className="twin-avatar">🤖</div>
              <div>
                <h3>{personaName}</h3>
                <span className="online-status">Online (Trained on your KB)</span>
              </div>
            </div>

            <div className="chat-window">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`chat-msg ${msg.role}`}>
                  <div className="msg-bubble">{msg.content}</div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-msg twin">
                  <div className="msg-bubble typing">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleChat} className="chat-input-area">
              <input 
                type="text" 
                placeholder="Message your digital twin to test its knowledge..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
              />
              <button type="submit" disabled={!chatInput.trim() || isTyping}>
                <Send size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        .twin-studio { display: grid; grid-template-columns: 280px 1fr; gap: 30px; align-items: start; }
        
        /* SIDEBAR */
        .studio-sidebar { padding: 25px; border-radius: 20px; display: flex; flex-direction: column; gap: 40px; min-height: 400px; }
        .studio-nav { display: flex; flex-direction: column; gap: 10px; }
        .nav-btn { background: transparent; border: 1px solid rgba(255,255,255,0.05); color: #94a3b8; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 600; cursor: pointer; transition: 0.2s; text-align: left; }
        .nav-btn:hover:not(:disabled) { background: rgba(255,255,255,0.05); color: #fff; }
        .nav-btn.active { background: rgba(0,240,255,0.1); border-color: rgba(0,240,255,0.3); color: #00F0FF; }
        .nav-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .twin-status h4 { color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px; }
        .status-indicator { display: flex; align-items: center; gap: 10px; color: #e2e8f0; font-size: 14px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 10px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.red { background: #ef4444; box-shadow: 0 0 10px #ef4444; }
        .dot.green { background: #4ade80; box-shadow: 0 0 10px #4ade80; }

        /* MAIN PANEL */
        .studio-main { padding: 35px; border-radius: 20px; min-height: 600px; display: flex; flex-direction: column; }
        .fade-in { animation: fadeIn 0.3s ease-out forwards; flex: 1; display: flex; flex-direction: column; }
        
        /* TRAIN UI */
        .train-panel h2 { color: #fff; margin: 0 0 8px; font-size: 28px; }
        .subtitle { color: #94a3b8; margin: 0 0 35px; font-size: 15px; }
        
        .form-group { margin-bottom: 25px; }
        .form-group label { display: block; color: #e2e8f0; margin-bottom: 10px; font-weight: 500; font-size: 14px; }
        .form-group input, .form-group textarea { width: 100%; background: #0b1120; border: 1px solid #334155; border-radius: 12px; padding: 15px; color: #fff; font-family: inherit; font-size: 15px; outline: none; transition: 0.2s; }
        .form-group input:focus, .form-group textarea:focus { border-color: #00F0FF; box-shadow: 0 0 0 3px rgba(0,240,255,0.1); }
        
        .kb-tabs { display: flex; gap: 10px; margin-bottom: 15px; }
        .kb-tab { background: #1e293b; border: 1px solid #334155; color: #94a3b8; padding: 8px 15px; border-radius: 8px; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: 0.2s; }
        .kb-tab.active { background: rgba(0,240,255,0.1); border-color: rgba(0,240,255,0.3); color: #00F0FF; }
        
        .train-btn { width: 100%; padding: 18px; background: linear-gradient(135deg, #00F0FF, #5773FF); color: #000; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px; transition: 0.2s; margin-top: 10px; }
        .train-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,240,255,0.3); }
        .train-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .spin { animation: spin 1s linear infinite; }

        /* SIMULATE UI */
        .chat-header { display: flex; align-items: center; gap: 15px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px; }
        .twin-avatar { font-size: 32px; background: rgba(0,240,255,0.1); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid rgba(0,240,255,0.2); }
        .chat-header h3 { color: #fff; margin: 0 0 5px; font-size: 18px; }
        .online-status { color: #4ade80; font-size: 13px; font-weight: 500; }
        
        .chat-window { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; padding-right: 10px; margin-bottom: 20px; max-height: 400px; }
        .chat-msg { display: flex; width: 100%; }
        .chat-msg.user { justify-content: flex-end; }
        .chat-msg.twin { justify-content: flex-start; }
        
        .msg-bubble { max-width: 80%; padding: 15px 20px; border-radius: 18px; line-height: 1.5; font-size: 15px; }
        .user .msg-bubble { background: linear-gradient(135deg, #00F0FF, #5773FF); color: #000; font-weight: 500; border-bottom-right-radius: 4px; }
        .twin .msg-bubble { background: #1e293b; color: #e2e8f0; border: 1px solid rgba(255,255,255,0.05); border-bottom-left-radius: 4px; }
        
        .chat-input-area { display: flex; gap: 10px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); }
        .chat-input-area input { flex: 1; background: transparent; border: none; padding: 10px 15px; color: #fff; font-size: 15px; outline: none; }
        .chat-input-area button { background: rgba(0,240,255,0.1); color: #00F0FF; border: none; width: 45px; height: 45px; border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
        .chat-input-area button:hover:not(:disabled) { background: #00F0FF; color: #000; }
        .chat-input-area button:disabled { opacity: 0.5; cursor: not-allowed; }

        .typing span { animation: blink 1.4s infinite both; font-size: 20px; line-height: 1; }
        .typing span:nth-child(2) { animation-delay: 0.2s; }
        .typing span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
      `}</style>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/>
    </svg>
  );
}
