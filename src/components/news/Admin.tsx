"use client";

import { useState } from 'react';

export default function NewsAdminDashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="logo-section">
          <h2>Kaiee News Admin</h2>
        </div>
        <div className="user-profile">Team Member</div>
      </header>
      
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <nav>
            <a href="#" className="active">Dashboard</a>
            <a href="#">Articles</a>
            <a href="#">Categories</a>
            <a href="#">Analytics</a>
            <a href="#">Settings</a>
          </nav>
        </aside>

        <main className="admin-main">
          <div className="dashboard-header">
            <h1>Create New Article</h1>
            <button className="publish-btn">Publish to News Portal</button>
          </div>

          <div className="editor-card">
            <div className="form-group">
              <label>Headline / Title</label>
              <input 
                type="text" 
                placeholder="Enter a catchy headline..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Technology</option>
                  <option>Business</option>
                  <option>Startups</option>
                  <option>AI</option>
                  <option>Market Trends</option>
                </select>
              </div>
              <div className="form-group">
                <label>Author</label>
                <input type="text" value="Kaiee Editorial Team" disabled />
              </div>
            </div>

            <div className="form-group">
              <label>Article Content (Rich Text)</label>
              <div className="mock-editor-toolbar">
                <button>B</button>
                <button>I</button>
                <button>U</button>
                <button>Heading</button>
                <button>Link</button>
                <button>Image</button>
              </div>
              <textarea 
                className="content-editor"
                placeholder="Write the news article here..." 
                rows={15}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            
            <div className="form-group seo-meta">
              <h3>SEO Settings</h3>
              <label>Meta Keywords</label>
              <input type="text" placeholder="tech, AI, startups, funding..." />
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          background: #f4f7f6;
          font-family: var(--news-font);
          color: #333;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 30px;
          background: #fff;
          border-bottom: 1px solid #e0e0e0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        }
        .admin-header h2 {
          margin: 0;
          font-size: 20px;
          color: var(--news-accent);
        }
        .admin-layout {
          display: flex;
          height: calc(100vh - 61px);
        }
        .admin-sidebar {
          width: 250px;
          background: #fff;
          border-right: 1px solid #e0e0e0;
          padding: 20px 0;
        }
        .admin-sidebar a {
          display: block;
          padding: 12px 30px;
          color: #555;
          text-decoration: none;
          font-weight: 500;
          transition: 0.2s;
        }
        .admin-sidebar a:hover, .admin-sidebar a.active {
          background: #f0f0f0;
          color: var(--news-accent);
          border-left: 4px solid var(--news-accent);
        }
        .admin-main {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .dashboard-header h1 {
          font-size: 28px;
          margin: 0;
        }
        .publish-btn {
          background: var(--news-accent);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }
        .editor-card {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .form-group {
          margin-bottom: 25px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #444;
        }
        input[type="text"], select, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-family: inherit;
          font-size: 15px;
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--news-accent);
        }
        .mock-editor-toolbar {
          display: flex;
          gap: 5px;
          background: #f9f9f9;
          border: 1px solid #ccc;
          border-bottom: none;
          padding: 10px;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .mock-editor-toolbar button {
          background: #fff;
          border: 1px solid #ddd;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 3px;
        }
        .content-editor {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          resize: vertical;
        }
        .seo-meta {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
        }
        .seo-meta h3 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 18px;
          color: #333;
        }
      `}</style>
    </div>
  );
}
