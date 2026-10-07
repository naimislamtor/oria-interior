import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Building2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000/api"
    : "https://oira-interior-server.onrender.com/api");

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: 'আসসালামু আলাইকুম! ওরিয়া ইন্টেরিয়র (Oria Interior)-এ আপনাকে স্বাগতম। আপনার ফ্ল্যাট, বাসা বা অফিস ডেকোরেশন সংক্রান্ত যেকোনো প্রশ্ন থাকলে সরাসরি মেসেজ লিখুন!',
      createdAt: new Date().toISOString(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let sid = localStorage.getItem('oria_chat_session');
    if (!sid) {
      sid = 'web_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('oria_chat_session', sid);
    }
    setSessionId(sid);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickSuggestions = [
    'আমাদের সেবা সমূহ',
    'ফ্রি কনসালটেশন কীভাবে পাবো?',
    'বাজেট ও খরচ সম্পর্কে ধারণা দিন',
    'WhatsApp-এ কথা বলুন 💬',
  ];

  const handleSend = async (textToSend = null) => {
    const query = textToSend || inputText;
    if (!query || !query.trim() || loading) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      role: 'user',
      text: query.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);

    // If query is specifically about WhatsApp
    if (query.includes('WhatsApp') || query.includes('হোয়াটসঅ্যাপ') || query.toLowerCase().includes('whatsapp')) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: 'wa-cta-' + Date.now(),
            role: 'assistant',
            text: 'অবশ্যই! ওরিয়া ইন্টেরিয়রের অফিশিয়াল হোয়াটসঅ্যাপে সরাসরি কথা বলতে এবং ডিজাইন ক্যাটালগ পেতে নিচের বাটনে ক্লিক করুন:\nhttps://wa.me/8801334003388',
            createdAt: new Date().toISOString(),
          },
        ]);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/chat/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: query.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.reply) {
          const teamMsg = {
            id: 'team-' + Date.now(),
            role: 'assistant',
            text: data.data.reply,
            createdAt: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, teamMsg]);
        }
      } else {
        throw new Error('API server unavailable');
      }
    } catch (err) {
      console.warn('Backend API connection warning, using client fallback:', err);
      const fallbackReply = getFallbackReply(query);
      setMessages((prev) => [
        ...prev,
        {
          id: 'team-fallback-' + Date.now(),
          role: 'assistant',
          text: fallbackReply,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getFallbackReply = (text) => {
    const msg = text.toLowerCase();
    if (msg.includes('সেবা') || msg.includes('সার্ভিস')) {
      return 'ওরিয়া ইন্টেরিয়র প্রধানত ৪টি ক্যাটাগরিতে প্রফেশনাল সার্ভিস প্রদান করে:\n১. রেসিডেন্সিয়াল ইন্টেরিয়র (ফ্ল্যাট/অ্যাপার্টমেন্ট)\n২. কমার্শিয়াল ও অফিস ডেকোরেশন\n৩. আর্কিটেকচারাল ৩ডি প্ল্যানিং\n৪. কাস্টম ফার্নিচার ও কাঠের মেকওভার।';
    }
    if (msg.includes('কনসালটেশন') || msg.includes('ভিজিট')) {
      return 'আমরা সম্পূর্ণ বিনামূল্যে প্রাথমিক কনসালটেশন এবং সাইট মেজারমেন্ট সার্ভিস প্রদান করি। বুক করতে আপনার ফোন নম্বরটি লিখুন।';
    }
    if (msg.includes('বাজেট') || msg.includes('খরচ')) {
      return 'ইন্টেরিয়র ডিজাইন স্কয়ার ফিট এবং উপাদান (Materials)-এর ওপর নির্ভর করে। আপনার স্পেসের আনুমানিক স্কয়ার ফিট ও ফোন নম্বর দিলে আমরা একটি ফ্রি এস্টিমেট বানিয়ে দেব।';
    }
    return 'ধন্যবাদ আপনার মেসেজের জন্য! আমাদের টিম অতি শীঘ্রই আপনার সাথে সরাসরি যোগাযোগ করবে। সরাসরি হোয়াটসঅ্যাপে কথা বলতে লিখুন https://wa.me/8801334003388।';
  };

  const renderFormattedMessage = (text) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(/^https?:\/\//)) {
        const cleanUrl = part.replace(/[).,;!\]]+$/, '');
        const trailing = part.slice(cleanUrl.length);
        return (
          <React.Fragment key={index}>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline font-semibold break-all underline-offset-2 transition-colors"
            >
              {cleanUrl}
            </a>
            {trailing}
          </React.Fragment>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 font-medium cursor-pointer"
        style={{ border: '1px solid rgba(251, 191, 36, 0.4)' }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <div className="relative">
              <MessageSquare className="w-6 h-6 text-amber-200" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            </div>
            <span className="text-sm font-semibold tracking-wide">Live Chat</span>
          </>
        )}
      </motion.button>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[360px] sm:w-[400px] h-[520px] max-h-[80vh] bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-500/30 flex flex-col overflow-hidden text-slate-100"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/80 border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                    Oria Interior
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-amber-600/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                      msg.role === 'user'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-800 border border-amber-500/30 text-amber-400'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-amber-600/90 text-white rounded-tr-none shadow-md'
                        : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none shadow-inner'
                    }`}
                  >
                    {renderFormattedMessage(msg.text)}

                    {(msg.text.includes('wa.me') || msg.text.includes('WhatsApp') || msg.text.includes('হোয়াটসঅ্যাপ') || msg.text.toLowerCase().includes('whatsapp')) && (
                      <div className="mt-2.5 pt-2 border-t border-slate-700/50">
                        <a
                          href="https://wa.me/8801334003388"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg transition-all duration-200 cursor-pointer border border-emerald-400/30 hover:scale-105"
                        >
                          <MessageCircle className="w-4 h-4 fill-white text-emerald-600" /> WhatsApp-এ সরাসরি কথা বলুন 💬
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-amber-400/80 text-xs p-2 bg-slate-800/50 rounded-xl w-fit border border-amber-500/10">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-ping" />
                  <span>ওরিয়া ইন্টেরিয়র উত্তর লিখছে...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickSuggestions.map((sugg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sugg)}
                  className="whitespace-nowrap px-2.5 py-1 text-[11px] rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-all duration-200 cursor-pointer"
                >
                  {sugg}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-slate-950 border-t border-amber-500/20 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="এখানে আপনার প্রশ্ন বা বার্তা লিখুন..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || loading}
                className="p-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:from-amber-500 hover:to-amber-600 transition-all cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
