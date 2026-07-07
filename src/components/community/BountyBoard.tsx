'use client'

import { useState } from 'react';
import { Trophy, ChevronRight, X, ThumbsUp, Send } from 'lucide-react';

const MOCK_BOUNTIES = [
  {
    id: 1,
    title: 'The Ultimate Cold Outreach Prompt',
    description: 'We need a highly converting ChatGPT prompt for B2B cold email outreach targeting SaaS founders.',
    reward: 500,
    deadline: '2 days left',
    status: 'Active',
    submissions: 12
  },
  {
    id: 2,
    title: 'Automated Lead Qualification Bot',
    description: 'Share a prompt or workflow architecture for a chatbot that qualifies real estate leads before handing off to a human.',
    reward: 1200,
    deadline: '5 days left',
    status: 'Active',
    submissions: 34
  },
  {
    id: 3,
    title: 'Notion to Webflow CMS Sync Script',
    description: 'Looking for a clean, bug-free prompt or Make.com blueprint to sync Notion databases to Webflow CMS automatically.',
    reward: 800,
    deadline: 'Ended',
    status: 'Completed',
    submissions: 56
  }
];

export default function BountyBoard() {
  const [selectedBounty, setSelectedBounty] = useState<any>(null);
  const [promptSubmission, setPromptSubmission] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptSubmission.trim()) return;
    setHasSubmitted(true);
    // In a real app, send to database
    setTimeout(() => {
      setSelectedBounty(null);
      setHasSubmitted(false);
      setPromptSubmission('');
    }, 2000);
  };

  return (
    <>
      <div className="bounty-grid">
        {MOCK_BOUNTIES.map(bounty => (
          <div key={bounty.id} className={`bounty-card ${bounty.status === 'Completed' ? 'completed' : ''}`}>
            <div className="bounty-header">
              <span className="reward"><Trophy size={16} /> {bounty.reward} Kaiee Points</span>
              <span className={`status-badge ${bounty.status.toLowerCase()}`}>{bounty.status}</span>
            </div>
            <h3>{bounty.title}</h3>
            <p className="desc">{bounty.description}</p>
            <div className="bounty-footer">
              <div className="meta">
                <span>{bounty.submissions} Submissions</span>
                <span className="dot">•</span>
                <span>{bounty.deadline}</span>
              </div>
              <button 
                onClick={() => setSelectedBounty(bounty)} 
                className="view-btn"
                disabled={bounty.status === 'Completed'}
              >
                {bounty.status === 'Completed' ? 'View Winners' : 'Submit Prompt'} <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMISSION MODAL */}
      {selectedBounty && (
        <div className="modal-overlay" onClick={() => !hasSubmitted && setSelectedBounty(null)}>
          <div className="modal-content fade-in" onClick={e => e.stopPropagation()}>
            {hasSubmitted ? (
              <div className="success-state">
                <div className="success-icon">🎉</div>
                <h2>Submission Received!</h2>
                <p>Your prompt has been submitted for review. The winner will be announced once the bounty ends.</p>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <h2>Submit for Bounty</h2>
                  <button onClick={() => setSelectedBounty(null)} className="close-btn"><X size={24} /></button>
                </div>
                
                <div className="bounty-context">
                  <h4>{selectedBounty.title}</h4>
                  <p className="reward-text"><Trophy size={14} /> Reward: <strong>{selectedBounty.reward} Kaiee Points</strong></p>
                </div>

                <form onSubmit={handleSubmit} className="submission-form">
                  <label>Your Prompt / Workflow Strategy</label>
                  <textarea 
                    placeholder="Paste your prompt, strategy, or workflow details here..."
                    value={promptSubmission}
                    onChange={(e) => setPromptSubmission(e.target.value)}
                    rows={8}
                    required
                  ></textarea>
                  <p className="hint">Make sure it's clear, formatted, and easy for others to test.</p>
                  
                  <button type="submit" className="submit-bounty-btn" disabled={!promptSubmission.trim()}>
                    <Send size={18} /> Submit Entry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .bounty-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 30px; }
        .bounty-card {
          background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 25px; display: flex; flex-direction: column;
          transition: 0.3s;
        }
        .bounty-card:hover:not(.completed) { transform: translateY(-5px); border-color: rgba(245, 158, 11, 0.4); box-shadow: 0 10px 30px rgba(245, 158, 11, 0.1); }
        .bounty-card.completed { opacity: 0.6; filter: grayscale(0.8); }
        
        .bounty-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .reward { display: flex; align-items: center; gap: 8px; color: #F59E0B; font-weight: 700; font-size: 14px; background: rgba(245, 158, 11, 0.1); padding: 6px 12px; border-radius: 20px; }
        .status-badge { font-size: 12px; padding: 4px 10px; border-radius: 12px; font-weight: 600; text-transform: uppercase; }
        .status-badge.active { background: rgba(34, 197, 94, 0.1); color: #4ade80; }
        .status-badge.completed { background: rgba(100, 116, 139, 0.2); color: #94a3b8; }
        
        .bounty-card h3 { font-size: 22px; margin-bottom: 15px; color: #fff; line-height: 1.3; }
        .bounty-card .desc { color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 30px; flex: 1; }
        
        .bounty-footer { display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }
        .meta { color: #64748b; font-size: 13px; font-weight: 500; }
        .dot { margin: 0 8px; }
        .view-btn { background: transparent; border: none; color: #fff; font-weight: 600; display: flex; align-items: center; gap: 5px; cursor: pointer; transition: 0.2s; }
        .view-btn:hover:not(:disabled) { color: #F59E0B; }
        .view-btn:disabled { cursor: not-allowed; }

        /* MODAL STYLES */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(3,7,18,0.85); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .modal-content { background: #0f172a; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; width: 100%; max-width: 600px; padding: 35px; box-shadow: 0 25px 50px rgba(0,0,0,0.5); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .modal-header h2 { font-size: 24px; color: #fff; margin: 0; }
        .close-btn { background: transparent; border: none; color: #64748b; cursor: pointer; transition: 0.2s; }
        .close-btn:hover { color: #f87171; }
        
        .bounty-context { background: rgba(245, 158, 11, 0.05); border-left: 4px solid #F59E0B; padding: 15px 20px; border-radius: 4px; margin-bottom: 30px; }
        .bounty-context h4 { margin: 0 0 8px; color: #fff; font-size: 16px; }
        .reward-text { margin: 0; color: #F59E0B; font-size: 14px; display: flex; align-items: center; gap: 6px; }

        .submission-form label { display: block; margin-bottom: 10px; color: #cbd5e1; font-weight: 500; }
        .submission-form textarea { width: 100%; background: #0b1120; border: 1px solid #334155; border-radius: 12px; padding: 16px; color: #fff; font-family: inherit; font-size: 15px; resize: vertical; outline: none; transition: 0.2s; }
        .submission-form textarea:focus { border-color: #F59E0B; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1); }
        .hint { font-size: 13px; color: #64748b; margin-top: 8px; margin-bottom: 30px; }
        
        .submit-bounty-btn { width: 100%; padding: 16px; background: linear-gradient(135deg, #F59E0B, #EF4444); color: #fff; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px; transition: 0.2s; }
        .submit-bounty-btn:hover:not(:disabled) { box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4); transform: translateY(-2px); }
        .submit-bounty-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .success-state { text-align: center; padding: 40px 20px; }
        .success-icon { font-size: 64px; margin-bottom: 20px; animation: bounce 1s ease infinite; }
        .success-state h2 { color: #4ade80; margin-bottom: 15px; }
        .success-state p { color: #94a3b8; line-height: 1.6; }
        
        .fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>
    </>
  );
}
