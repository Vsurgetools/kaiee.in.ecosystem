"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { useState } from 'react';
import { generateArticle, generateOmnichannelContent } from './actions';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Heading1, Heading2, List, ListOrdered, Quote, Code, 
  ImageIcon, Link as LinkIcon, Sparkles, Settings, Search, ImagePlus, Upload
} from 'lucide-react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="editor-toolbar">
      <div className="toolbar-group">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''} title="Bold">
          <Bold size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''} title="Italic">
          <Italic size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'is-active' : ''} title="Underline">
          <UnderlineIcon size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''} title="Strikethrough">
          <Strikethrough size={16} />
        </button>
      </div>
      
      <div className="toolbar-divider" />
      
      <div className="toolbar-group">
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} title="Heading 1">
          <Heading1 size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} title="Heading 2">
          <Heading2 size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''} title="Bullet List">
          <List size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''} title="Numbered List">
          <ListOrdered size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''} title="Quote">
          <Quote size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''} title="Code Block">
          <Code size={16} />
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''} title="Add Link">
          <LinkIcon size={16} />
        </button>
        <button onClick={addImage} title="Add Image">
          <ImageIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default function WritePageClient({ domain }: { domain: string }) {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [activeTab, setActiveTab] = useState<'ai' | 'keywords' | 'media' | 'seo'>('ai');
  
  // Publish State
  const [isPublishing, setIsPublishing] = useState(false);
  const [marketingKit, setMarketingKit] = useState<{linkedinPost: string, twitterThread: string, videoScript: string} | null>(null);

  // AI State
  const [businessInfo, setBusinessInfo] = useState('');
  const [tone, setTone] = useState('Professional & Authoritative');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Keyword State
  const [seedKeyword, setSeedKeyword] = useState('');
  const [isSearchingKeywords, setIsSearchingKeywords] = useState(false);
  const [keywordResults, setKeywordResults] = useState<{word: string, vol: string, diff: string}[]>([]);

  // Media State
  const [imagePrompt, setImagePrompt] = useState('');
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);

  // SEO State
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [tags, setTags] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Underline,
      Placeholder.configure({
        placeholder: 'Tell your story...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose-editor focus:outline-none',
      },
    },
  });

  const handleGenerate = async () => {
    if (!businessInfo) return;
    setIsGenerating(true);
    
    try {
      const result = await generateArticle(businessInfo + ` (Tone: ${tone})`);
      editor?.commands.setContent(result.articleHtml);
      setSeoTitle(result.seoTitle);
      setMetaDesc(result.metaDesc);
      if(!title) setTitle(result.seoTitle);
      setActiveTab('seo'); // Switch to SEO tab to show results
    } catch (e) {
      console.error(e);
      alert('Failed to generate article.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeywordSearch = () => {
    if (!seedKeyword) return;
    setIsSearchingKeywords(true);
    // Mocking a keyword research API call
    setTimeout(() => {
      setKeywordResults([
        { word: `${seedKeyword} automation`, vol: '12K', diff: 'Medium' },
        { word: `best ${seedKeyword} software`, vol: '8.5K', diff: 'High' },
        { word: `${seedKeyword} tools 2026`, vol: '4K', diff: 'Low' },
        { word: `how to use ${seedKeyword}`, vol: '22K', diff: 'Medium' }
      ]);
      setIsSearchingKeywords(false);
    }, 1500);
  };

  const handlePublish = async () => {
    if (!editor) return;
    setIsPublishing(true);
    try {
      const text = editor.getText();
      const kit = await generateOmnichannelContent(text);
      setMarketingKit(kit);
    } catch (e) {
      console.error(e);
      alert('Failed to publish and generate kit.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleGenerateImage = () => {
    if(!imagePrompt) return;
    setIsGeneratingImg(true);
    // Mocking DALL-E image generation
    setTimeout(() => {
      const mockUrl = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80";
      editor?.chain().focus().setImage({ src: mockUrl }).run();
      setIsGeneratingImg(false);
    }, 2000);
  }

  const handleCoverUpload = () => {
    const url = window.prompt('Enter Cover Image URL (Unsplash etc):');
    if(url) setCoverImage(url);
  };

  return (
    <div className="editor-layout">
      {/* Top Navbar */}
      <nav className="editor-nav">
        <div className="nav-left">
          <span className="status-badge draft">Draft</span>
          <span className="save-status">Saved just now</span>
        </div>
        <div className="nav-right">
          <button className="preview-btn">Preview</button>
          <button onClick={handlePublish} disabled={isPublishing} className="publish-btn">
            {isPublishing ? 'Publishing...' : 'Publish to Community'}
          </button>
        </div>
      </nav>

      <div className="editor-workspace">
        {/* Main Editor Area */}
        <div className="editor-main scrollbar-hide">
          <div className="editor-canvas">
            {coverImage ? (
              <div className="cover-image-container group">
                <img src={coverImage} alt="Cover" className="cover-image" />
                <button onClick={handleCoverUpload} className="change-cover-btn">Change Cover</button>
                <button onClick={() => setCoverImage('')} className="remove-cover-btn">Remove</button>
              </div>
            ) : (
              <button onClick={handleCoverUpload} className="add-cover-btn">
                <ImageIcon size={18} /> Add Cover Image
              </button>
            )}

            <input 
              type="text" 
              className="article-title-input" 
              placeholder="Article Title..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="tiptap-container">
              <MenuBar editor={editor} />
              <div className="tiptap-content-wrapper">
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar for AI & Settings */}
        <aside className="editor-sidebar">
          <div className="sidebar-tabs">
            <button className={activeTab === 'ai' ? 'active' : ''} onClick={() => setActiveTab('ai')} title="AI Writer">
              <Sparkles size={18} />
            </button>
            <button className={activeTab === 'keywords' ? 'active' : ''} onClick={() => setActiveTab('keywords')} title="Keyword Research">
              <Search size={18} />
            </button>
            <button className={activeTab === 'media' ? 'active' : ''} onClick={() => setActiveTab('media')} title="Media (Generate/Upload)">
              <ImagePlus size={18} />
            </button>
            <button className={activeTab === 'seo' ? 'active' : ''} onClick={() => setActiveTab('seo')} title="SEO & Meta">
              <Settings size={18} />
            </button>
          </div>

          <div className="sidebar-content scrollbar-hide">
            
            {/* AI WRITER TAB */}
            {activeTab === 'ai' && (
              <div className="ai-panel fade-in">
                <div className="panel-header">
                  <h4>Article Copilot</h4>
                  <p>Let AI draft your business story optimized for engagement.</p>
                </div>
                
                <div className="form-group">
                  <label>Business Context & Prompt</label>
                  <textarea 
                    placeholder="E.g., Write about how implementing CRM automation saved my agency 20 hours a week..."
                    value={businessInfo}
                    onChange={(e) => setBusinessInfo(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="form-group">
                  <label>Content Tone</label>
                  <select value={tone} onChange={(e) => setTone(e.target.value)}>
                    <option>Professional & Authoritative</option>
                    <option>Conversational & Friendly</option>
                    <option>Data-Driven & Analytical</option>
                    <option>Inspirational</option>
                  </select>
                </div>

                <button onClick={handleGenerate} disabled={isGenerating || !businessInfo} className="generate-btn">
                  {isGenerating ? <><span className="spinner"></span> Generating...</> : <><Sparkles size={18} /> Generate Full Article</>}
                </button>
                
                <div className="ai-tip">
                  <strong>Tip:</strong> The more specific details you provide, the better the AI output will be.
                </div>
              </div>
            )}

            {/* KEYWORD RESEARCH TAB */}
            {activeTab === 'keywords' && (
              <div className="keywords-panel fade-in">
                <div className="panel-header">
                  <h4>Keyword Research</h4>
                  <p>Find high-volume, low-competition keywords for your article.</p>
                </div>

                <div className="form-group">
                  <label>Seed Keyword</label>
                  <div className="search-input-wrapper">
                    <input 
                      type="text" 
                      value={seedKeyword} 
                      onChange={(e) => setSeedKeyword(e.target.value)} 
                      placeholder="e.g. WhatsApp Automation" 
                      onKeyDown={(e) => e.key === 'Enter' && handleKeywordSearch()}
                    />
                    <button onClick={handleKeywordSearch} disabled={!seedKeyword || isSearchingKeywords} className="search-btn">
                      {isSearchingKeywords ? <span className="spinner-small"></span> : <Search size={16} />}
                    </button>
                  </div>
                </div>

                {keywordResults.length > 0 && (
                  <div className="keyword-results">
                    <div className="table-header">
                      <span>Keyword</span>
                      <span>Vol</span>
                      <span>Diff</span>
                    </div>
                    {keywordResults.map((kw, i) => (
                      <div key={i} className="keyword-row" onClick={() => {
                        setBusinessInfo(prev => prev ? prev + `, focusing on ${kw.word}` : `Focus on ${kw.word}`);
                        setActiveTab('ai');
                      }}>
                        <span className="kw-word">{kw.word}</span>
                        <span className="kw-vol">{kw.vol}</span>
                        <span className={`kw-diff ${kw.diff.toLowerCase()}`}>{kw.diff}</span>
                      </div>
                    ))}
                    <div className="ai-tip" style={{marginTop: '15px'}}>
                      <strong>Tip:</strong> Click a keyword to add it to your AI Prompt.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MEDIA (GENERATE & UPLOAD) TAB */}
            {activeTab === 'media' && (
              <div className="media-panel fade-in">
                <div className="panel-header">
                  <h4>Media Center</h4>
                  <p>Upload your own assets or generate custom AI images.</p>
                </div>

                <div className="media-section">
                  <h5>1. Generate AI Image</h5>
                  <div className="form-group">
                    <textarea 
                      placeholder="Describe the image you want to generate..." 
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <button onClick={handleGenerateImage} disabled={isGeneratingImg || !imagePrompt} className="generate-btn secondary">
                    {isGeneratingImg ? <><span className="spinner"></span> Generating...</> : <><Sparkles size={18} /> Generate & Insert</>}
                  </button>
                </div>

                <div className="divider"><span>OR</span></div>

                <div className="media-section">
                  <h5>2. Upload Image</h5>
                  <div className="upload-dropzone">
                    <Upload size={24} color="#94a3b8" style={{marginBottom: '10px'}}/>
                    <p>Drag & drop image here</p>
                    <span>or click to browse files</span>
                    <input type="file" className="file-input" accept="image/*" />
                  </div>
                </div>
              </div>
            )}

            {/* SEO TAB */}
            {activeTab === 'seo' && (
              <div className="seo-panel fade-in">
                <div className="panel-header">
                  <h4>Search Optimization</h4>
                  <p>Configure how your article appears on Google and social media.</p>
                </div>

                <div className="form-group">
                  <label>SEO Title <span className="char-count">{seoTitle.length}/60</span></label>
                  <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Catchy title for search results" />
                </div>

                <div className="form-group">
                  <label>Meta Description <span className="char-count">{metaDesc.length}/160</span></label>
                  <textarea value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} placeholder="A compelling summary of the article..." rows={4} />
                </div>

                <div className="form-group">
                  <label>Tags / Categories</label>
                  <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., Marketing, Automation (comma separated)" />
                </div>
                
                <div className="seo-preview">
                  <div className="preview-title">Google Search Preview</div>
                  <div className="g-title">{seoTitle || 'Your SEO Title Here'}</div>
                  <div className="g-url">community.kaiee.in › post › {seoTitle ? seoTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'your-url-slug'}</div>
                  <div className="g-desc">{metaDesc || 'Your meta description will appear here. Make it descriptive and engaging to encourage clicks.'}</div>
                </div>
              </div>
            )}
          </div>
        </aside>
        {/* MARKETING KIT MODAL */}
        {marketingKit && (
          <div className="modal-overlay fade-in">
            <div className="modal-content">
              <div className="modal-header">
                <h2>🎉 Published Successfully!</h2>
                <button onClick={() => setMarketingKit(null)} className="close-btn">X</button>
              </div>
              <p className="modal-sub">We've generated a complete omnichannel marketing kit for your article to boost your reach.</p>
              
              <div className="kit-grid">
                <div className="kit-card">
                  <h3><span style={{color: '#0077b5'}}>in</span> LinkedIn Post</h3>
                  <textarea readOnly value={marketingKit.linkedinPost} rows={6} />
                  <button onClick={() => navigator.clipboard.writeText(marketingKit.linkedinPost)} className="copy-btn">Copy</button>
                </div>
                <div className="kit-card">
                  <h3><span style={{color: '#1DA1F2'}}>🐦</span> Twitter Thread</h3>
                  <textarea readOnly value={marketingKit.twitterThread} rows={6} />
                  <button onClick={() => navigator.clipboard.writeText(marketingKit.twitterThread)} className="copy-btn">Copy</button>
                </div>
                <div className="kit-card video-card">
                  <h3><span style={{color: '#FF0000'}}>▶️</span> 60s Video Script</h3>
                  <textarea readOnly value={marketingKit.videoScript} rows={6} />
                  <button onClick={() => navigator.clipboard.writeText(marketingKit.videoScript)} className="copy-btn">Copy</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <style jsx global>{`
        /* Custom TipTap Prosemirror Styles (Dark Theme) */
        .prose-editor {
          min-height: 50vh;
          font-family: var(--comm-font-serif, 'Merriweather', serif);
          font-size: 20px;
          line-height: 1.8;
          color: #e2e8f0;
          padding-bottom: 100px;
          outline: none;
          border: none;
        }
        .prose-editor:focus {
          outline: none;
        }
        .prose-editor p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #475569;
          pointer-events: none;
          height: 0;
        }
        .prose-editor h1, .prose-editor h2, .prose-editor h3 {
          font-family: var(--comm-font-sans, 'Inter', sans-serif);
          color: #f8fafc;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 700;
        }
        .prose-editor h1 { font-size: 32px; }
        .prose-editor h2 { font-size: 26px; }
        .prose-editor p { margin-bottom: 1.2em; }
        .prose-editor a { color: #00F0FF; text-decoration: underline; }
        .prose-editor img { max-width: 100%; border-radius: 8px; margin: 2em 0; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
        .prose-editor blockquote {
          border-left: 4px solid #5773FF;
          padding-left: 20px;
          color: #94a3b8;
          font-style: italic;
          margin: 1.5em 0;
          background: rgba(87, 115, 255, 0.05);
          border-radius: 0 8px 8px 0;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .prose-editor pre {
          background: #020617;
          border: 1px solid #1e293b;
          color: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: monospace;
          font-size: 16px;
          margin: 1.5em 0;
        }
        .prose-editor ul, .prose-editor ol { padding-left: 20px; margin-bottom: 1.2em; }
      `}</style>
      
      <style jsx global>{`
        .editor-layout {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 70px);
          background: #030712;
          font-family: var(--comm-font-sans, 'Inter', sans-serif);
          color: #f8fafc;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .editor-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .nav-left { display: flex; align-items: center; gap: 15px; }
        .status-badge {
          font-size: 12px; font-weight: 600; text-transform: uppercase;
          padding: 4px 8px; border-radius: 4px;
        }
        .status-badge.draft { background: rgba(0, 240, 255, 0.1); color: #00F0FF; border: 1px solid rgba(0, 240, 255, 0.2); }
        .save-status { font-size: 13px; color: #64748b; }
        
        .nav-right { display: flex; gap: 12px; }
        .preview-btn {
          background: transparent; border: 1px solid #334155; color: #cbd5e1;
          padding: 8px 16px; border-radius: 8px; font-weight: 500; cursor: pointer; transition: 0.2s;
        }
        .preview-btn:hover { background: #1e293b; color: #fff; border-color: #475569; }
        .publish-btn {
          background: linear-gradient(135deg, #00F0FF 0%, #5773FF 100%); color: #000; border: none;
          padding: 8px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s;
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
        }
        .publish-btn:hover { transform: translateY(-1px); box-shadow: 0 0 20px rgba(0, 240, 255, 0.4); }

        .editor-workspace {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* MAIN CANVAS */
        .editor-main {
          flex: 1;
          overflow-y: auto;
          display: flex;
          justify-content: center;
          padding: 40px 20px;
          background: radial-gradient(circle at 50% 0%, rgba(87, 115, 255, 0.05) 0%, transparent 70%);
        }
        .editor-canvas {
          width: 100%;
          max-width: 800px;
          padding: 0 40px;
        }

        .add-cover-btn {
          display: flex; align-items: center; gap: 8px;
          background: transparent; border: none; color: #64748b;
          font-size: 15px; font-weight: 500; cursor: pointer;
          margin-bottom: 20px; padding: 0; transition: color 0.2s;
        }
        .add-cover-btn:hover { color: #00F0FF; }
        
        .cover-image-container { position: relative; margin-bottom: 30px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .cover-image { width: 100%; height: auto; max-height: 400px; object-fit: cover; display: block; }
        .change-cover-btn, .remove-cover-btn {
          position: absolute; top: 15px;
          background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); color: #fff;
          padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;
          cursor: pointer; opacity: 0; transition: opacity 0.2s, background 0.2s;
          backdrop-filter: blur(4px);
        }
        .change-cover-btn { right: 90px; }
        .remove-cover-btn { right: 15px; color: #f87171; border-color: rgba(248, 113, 113, 0.2); }
        .change-cover-btn:hover { background: rgba(15, 23, 42, 1); border-color: #00F0FF; }
        .remove-cover-btn:hover { background: rgba(15, 23, 42, 1); }
        .cover-image-container:hover .change-cover-btn, .cover-image-container:hover .remove-cover-btn { opacity: 1; }

        .article-title-input {
          width: 100%;
          font-size: 48px;
          font-weight: 800;
          background: transparent;
          border: none;
          outline: none;
          margin-bottom: 30px;
          font-family: var(--comm-font-sans, 'Inter', sans-serif);
          color: #fff;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }
        .article-title-input::placeholder { color: #334155; }

        .tiptap-container { position: relative; }
        .editor-toolbar {
          position: sticky; top: -40px; z-index: 10;
          background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;
          padding: 8px; display: flex; gap: 10px; align-items: center;
          margin-bottom: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          flex-wrap: wrap; width: max-content; margin-left: auto; margin-right: auto;
        }
        .toolbar-group { display: flex; gap: 4px; }
        .editor-toolbar button {
          background: transparent; border: 1px solid transparent; padding: 8px; border-radius: 8px;
          color: #94a3b8; cursor: pointer; display: flex; align-items: center; transition: 0.2s;
        }
        .editor-toolbar button:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .editor-toolbar button.is-active { background: rgba(0, 240, 255, 0.1); color: #00F0FF; border-color: rgba(0, 240, 255, 0.2); }
        .toolbar-divider { width: 1px; background: rgba(255,255,255,0.1); margin: 0 4px; }

        /* RIGHT SIDEBAR */
        .editor-sidebar {
          width: 380px;
          flex-shrink: 0;
          background: #0f172a;
          border-left: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          box-shadow: -5px 0 20px rgba(0,0,0,0.2);
          z-index: 20;
        }
        .sidebar-tabs {
          display: flex;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: #0b1120;
        }
        .sidebar-tabs button {
          flex: 1;
          padding: 16px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
        }
        .sidebar-tabs button.active {
          color: #00F0FF;
          border-bottom-color: #00F0FF;
          background: rgba(0, 240, 255, 0.03);
        }
        .sidebar-tabs button:hover:not(.active) { color: #e2e8f0; background: rgba(255,255,255,0.02); }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }
        
        .fade-in { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .panel-header { margin-bottom: 24px; }
        .panel-header h4 { font-size: 18px; margin-bottom: 6px; color: #fff; font-weight: 600; display: flex; align-items: center; gap: 8px;}
        .panel-header p { font-size: 13px; color: #94a3b8; line-height: 1.5; }

        .form-group { margin-bottom: 24px; }
        .form-group label {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px; font-weight: 500; color: #cbd5e1; margin-bottom: 10px;
        }
        .char-count { color: #64748b; font-weight: 400; font-size: 12px; }
        
        .form-group input, .form-group textarea, .form-group select {
          width: 100%; padding: 12px 14px;
          background: #1e293b; border: 1px solid #334155; border-radius: 8px;
          font-family: inherit; font-size: 14px; color: #f8fafc;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
          outline: none; border-color: #5773FF;
          box-shadow: 0 0 0 3px rgba(87, 115, 255, 0.2);
        }
        .form-group input::placeholder, .form-group textarea::placeholder { color: #475569; }
        .form-group textarea { resize: vertical; min-height: 100px; }
        .form-group select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px; }

        .generate-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(135deg, #00F0FF 0%, #5773FF 100%); color: #000;
          border: none; padding: 14px; border-radius: 8px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          transition: 0.3s; box-shadow: 0 4px 15px rgba(0, 240, 255, 0.2);
        }
        .generate-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0, 240, 255, 0.4); }
        .generate-btn:disabled { background: #334155; color: #64748b; cursor: not-allowed; box-shadow: none; transform: none; }

        .spinner {
          width: 18px; height: 18px; border: 2px solid rgba(0,0,0,0.1);
          border-top-color: #000; border-radius: 50%;
          animation: spin 1s infinite linear;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .ai-tip {
          margin-top: 20px; padding: 15px; background: rgba(87, 115, 255, 0.1); border: 1px solid rgba(87, 115, 255, 0.2);
          border-radius: 8px; font-size: 13px; color: #cbd5e1; line-height: 1.5;
        }
        .ai-tip strong { color: #5773FF; }

        /* KEYWORDS TAB STYLES */
        .search-input-wrapper { display: flex; gap: 8px; }
        .search-input-wrapper input { flex: 1; }
        .search-btn {
          background: #334155; color: white; border: 1px solid #475569; padding: 0 16px;
          border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s;
        }
        .search-btn:hover:not(:disabled) { background: #475569; border-color: #64748b; }
        .search-btn:disabled { background: #1e293b; color: #475569; border-color: #334155; }
        
        .keyword-results { margin-top: 24px; border: 1px solid #334155; border-radius: 8px; overflow: hidden; background: #1e293b; }
        .table-header, .keyword-row {
          display: grid; grid-template-columns: 2fr 1fr 1fr; padding: 12px 14px;
          font-size: 13px; border-bottom: 1px solid #334155;
        }
        .table-header { background: #0f172a; font-weight: 600; color: #94a3b8; }
        .keyword-row { cursor: pointer; transition: 0.2s; align-items: center; }
        .keyword-row:hover { background: rgba(255,255,255,0.05); }
        .keyword-row:last-child { border-bottom: none; }
        .kw-word { font-weight: 500; color: #f8fafc; }
        .kw-vol { color: #cbd5e1; }
        .kw-diff { font-size: 11px; padding: 3px 8px; border-radius: 12px; display: inline-block; width: max-content; font-weight: 700; letter-spacing: 0.5px;}
        .kw-diff.low { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
        .kw-diff.medium { background: rgba(234, 179, 8, 0.15); color: #facc15; }
        .kw-diff.high { background: rgba(239, 68, 68, 0.15); color: #f87171; }
        
        .spinner-small {
          width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: spin 1s infinite linear;
        }

        /* MEDIA TAB STYLES */
        .media-section { margin-bottom: 24px; }
        .media-section h5 { font-size: 14px; color: #e2e8f0; margin-bottom: 12px; font-weight: 600; }
        .generate-btn.secondary { 
          background: rgba(87, 115, 255, 0.1); border: 1px solid rgba(87, 115, 255, 0.3); color: #5773FF; box-shadow: none;
        }
        .generate-btn.secondary:hover:not(:disabled) { 
          background: rgba(87, 115, 255, 0.2); transform: none; box-shadow: none; border-color: #5773FF;
        }
        .generate-btn.secondary .spinner { border-top-color: #5773FF; border-left-color: rgba(87, 115, 255, 0.2); border-right-color: rgba(87, 115, 255, 0.2); border-bottom-color: rgba(87, 115, 255, 0.2); }
        
        .divider { display: flex; align-items: center; text-align: center; margin: 24px 0; color: #475569; font-size: 12px; font-weight: 600; }
        .divider::before, .divider::after { content: ''; flex: 1; border-bottom: 1px solid #334155; }
        .divider span { padding: 0 15px; }
        
        .upload-dropzone {
          border: 2px dashed #475569; border-radius: 12px; padding: 40px 20px;
          text-align: center; background: rgba(30, 41, 59, 0.5); position: relative;
          display: flex; flex-direction: column; align-items: center; transition: 0.2s;
        }
        .upload-dropzone:hover { border-color: #00F0FF; background: rgba(0, 240, 255, 0.02); }
        .upload-dropzone p { margin: 0; font-size: 14px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px;}
        .upload-dropzone span { font-size: 12px; color: #94a3b8; }
        .file-input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }

        /* SEO PREVIEW */
        .seo-preview {
          margin-top: 30px; padding: 20px; background: #1e293b;
          border: 1px solid #334155; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .preview-title { font-size: 12px; text-transform: uppercase; font-weight: 700; color: #94a3b8; margin-bottom: 16px; letter-spacing: 1px; }
        .g-title { font-size: 20px; color: #8ab4f8; font-family: arial, sans-serif; margin-bottom: 4px; line-height: 1.3; cursor: pointer; }
        .g-title:hover { text-decoration: underline; }
        .g-url { font-size: 14px; color: #81c995; font-family: arial, sans-serif; margin-bottom: 6px; }
        .g-desc { font-size: 14px; color: #bdc1c6; font-family: arial, sans-serif; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        /* MARKETING KIT MODAL STYLES */
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(3, 7, 18, 0.9); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 100;
        }
        .modal-content {
          background: #0f172a; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 40px; width: 95%; max-width: 1200px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5); max-height: 90vh; overflow-y: auto;
        }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .modal-header h2 { font-size: 28px; color: #fff; margin: 0; }
        .close-btn { background: transparent; border: none; color: #94a3b8; font-size: 24px; cursor: pointer; transition: 0.2s; }
        .close-btn:hover { color: #f87171; }
        .modal-sub { color: #cbd5e1; font-size: 16px; margin-bottom: 40px; }
        
        .kit-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;
        }
        .kit-card {
          background: #1e293b; padding: 25px; border-radius: 12px; border: 1px solid #334155;
          display: flex; flex-direction: column;
        }
        .kit-card h3 { font-size: 18px; color: #f8fafc; margin-top: 0; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .kit-card textarea {
          flex: 1; width: 100%; min-height: 300px; background: #0b1120; border: 1px solid #475569; border-radius: 8px;
          padding: 16px; color: #f8fafc; font-family: inherit; font-size: 15px; line-height: 1.6; margin-bottom: 20px; resize: none;
        }
        .copy-btn {
          width: 100%; background: rgba(87, 115, 255, 0.1); color: #5773FF; border: 1px solid rgba(87, 115, 255, 0.3);
          padding: 12px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.2s;
        }
        .copy-btn:hover { background: #5773FF; color: #fff; }
      `}</style>
    </div>
  );
}
