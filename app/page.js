"use client";
import { useState } from 'react';
import { Download, CheckCircle, Zap, Shield, Smartphone, ChevronDown, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!input) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: input }),
      });
      const data = await res.json();
      if (data.error) alert(data.error);
      else setResult(data);
    } catch (e) {
      alert("Failed to connect to server.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      {/* HEADER */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black italic text-blue-600 tracking-tighter">CLIPJET</div>
          <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
            <a href="#how" className="hover:text-blue-600 transition">How it Works</a>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
            <span className="text-slate-200">|</span>
            <div className="flex gap-4">
              <Instagram size={18} /> <Facebook size={18} /> <Twitter size={18} />
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-20 pb-32 px-6 bg-gradient-to-b from-white to-[#f8fafc]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
            Free & Unlimited Downloads
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900 leading-[1.1]">
            Download Social Media <span className="text-blue-600">Videos.</span>
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            The fastest way to download Reels, Shorts, and Videos in HD. No registration, no watermarks.
          </p>

          {/* SEARCH BOX */}
          <div className="relative max-w-3xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex flex-col md:flex-row gap-2 bg-white p-2 rounded-2xl shadow-2xl">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste link from Instagram, FB, or Twitter..."
                className="flex-1 px-6 py-4 text-lg bg-transparent border-none outline-none focus:ring-0"
              />
              <button 
                onClick={handleFetch}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 disabled:bg-slate-400"
              >
                {loading ? "Processing..." : "Download"}
              </button>
            </div>
          </div>

          {/* RESULT CARD */}
          {result && (
            <div className="mt-12 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-2xl mx-auto flex flex-col md:flex-row gap-8 text-left animate-in fade-in slide-in-from-bottom-4">
              <img src={result.thumbnail} className="w-full md:w-48 h-48 object-cover rounded-2xl" alt="Preview" />
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-xs font-bold text-blue-600 uppercase mb-2 tracking-widest">{result.source} Video</span>
                <h3 className="text-xl font-bold mb-4 line-clamp-2 leading-tight">{result.title}</h3>
                <div className="flex flex-wrap gap-2">
                  <a 
                    href={result.url} 
                    target="_blank"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                  >
                    <Download size={20} /> Download HD MP4
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SEO CONTENT: HOW IT WORKS */}
      <section id="how" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">How to Download Videos in 3 Steps</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Copy Link", desc: "Copy the URL of the video or Reel from your social media app.", icon: <Smartphone /> },
            { step: "02", title: "Paste URL", desc: "Paste the link into the search box above on ClipJet.", icon: <Zap /> },
            { step: "03", title: "Save Video", desc: "Click download and the video will be saved to your device instantly.", icon: <CheckCircle /> }
          ].map((item, idx) => (
            <div key={idx} className="relative p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="text-blue-600 mb-4">{item.icon}</div>
              <div className="absolute top-8 right-8 text-4xl font-black text-slate-100">{item.step}</div>
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
            {[
              { q: "Is it free to use?", a: "Yes, ClipJet is 100% free with no hidden charges or signups." },
              { q: "Which platforms are supported?", a: "We support Instagram (Reels/Videos), Facebook, Twitter (X), and YouTube Shorts." },
              { q: "Do you store the videos?", a: "No. We do not store any videos on our servers. We simply help you fetch the direct link from the social platform." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-800 rounded-2xl">
                <h4 className="font-bold text-lg mb-2 flex items-center justify-between">
                  {faq.q} <ChevronDown className="text-slate-500" />
                </h4>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>© 2026 ClipJet Downloader • Made for the Global Creator Community</p>
      </footer>
    </div>
  );
}
