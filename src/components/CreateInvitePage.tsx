import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Link as LinkIcon, Copy, Check, Send, ArrowLeft, ShieldCheck, Heart } from 'lucide-react';
import { encodeInvite } from '../utils/token';

interface CreateInvitePageProps {
  onBackToHome: () => void;
}

export const CreateInvitePage: React.FC<CreateInvitePageProps> = ({ onBackToHome }) => {
  const [chatId, setChatId] = useState('');
  const [girlName, setGirlName] = useState('');
  const [yourName, setYourName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatId.trim()) return;

    const token = encodeInvite({
      chatId: chatId.trim(),
      senderName: yourName.trim(),
      recipientName: girlName.trim(),
    });

    const origin = window.location.origin;
    const nameParam = girlName.trim() ? `&to=${encodeURIComponent(girlName.trim())}` : '';
    const link = `${origin}/?ref=${token}${nameParam}`;

    setGeneratedLink(link);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-xl border border-rose-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-200/50 relative text-left"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mb-2 shadow-inner">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
          Öz Dəvət Linkini Yarat ✨
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Qız bu linki açacaq və cavablar yalnız sənin Telegram-ına gələcək!
        </p>
      </div>

      {/* Step by step info banner */}
      <div className="bg-rose-50/80 border border-rose-200/70 rounded-2xl p-4 mb-6 text-xs text-slate-700 space-y-2">
        <div className="font-bold text-rose-700 flex items-center gap-1.5 text-xs">
          <ShieldCheck className="w-4 h-4 text-rose-500" />
          <span>Sadəcə 2 addım (100% Məxfilik):</span>
        </div>
        <ol className="list-decimal list-inside space-y-1 text-slate-600 text-[11px] leading-relaxed">
          <li>
            Telegram-da bota daxil olub <strong>/start</strong> göndər:{' '}
            <a
              href="https://t.me/MY_Beauty_bot"
              target="_blank"
              rel="noreferrer"
              className="text-rose-600 font-semibold underline"
            >
              @MY_Beauty_bot 🤖
            </a>
          </li>
          <li>
            <a
              href="https://t.me/userinfobot"
              target="_blank"
              rel="noreferrer"
              className="text-rose-600 font-semibold underline"
            >
              @userinfobot
            </a>-dan öz Telegram <strong>ID</strong> nömrəni götürüb aşağıya yaz.
          </li>
        </ol>
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        {/* Telegram Chat ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Sənin Telegram ID Nömrən <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Məsələn: 1449636139"
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 font-mono"
          />
        </div>

        {/* Girl Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Qızın Adı <span className="text-[10px] text-slate-400 font-normal lowercase">(könüllü)</span>
          </label>
          <input
            type="text"
            placeholder="Məsələn: Ayan, Leyla"
            value={girlName}
            onChange={(e) => setGirlName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>

        {/* Your Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Sənin Adın <span className="text-[10px] text-slate-400 font-normal lowercase">(könüllü)</span>
          </label>
          <input
            type="text"
            placeholder="Məsələn: Murad"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-lg shadow-rose-400/40 flex items-center justify-center gap-2 text-sm sm:text-base transition cursor-pointer"
        >
          <LinkIcon className="w-4 h-4" />
          <span>Xüsusi Dəvət Linkini Yarat ✨</span>
        </button>
      </form>

      {/* Generated Link Result Box */}
      {generatedLink && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-2xl bg-rose-50/90 border border-rose-300 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Hazır Linkin:</span>
            </span>
            {copied && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Kopyalandı!</span>
              </span>
            )}
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 font-mono break-all select-all">
            {generatedLink}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 py-2.5 px-4 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Linki Kopyala</span>
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Sənə bir mesajım var ✨\n${generatedLink}`)}`}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp ilə at</span>
            </a>
          </div>
        </motion.div>
      )}

      {/* Back button */}
      <div className="mt-6 pt-4 border-t border-rose-100 text-center">
        <button
          type="button"
          onClick={onBackToHome}
          className="text-xs text-slate-500 hover:text-rose-600 flex items-center justify-center gap-1 mx-auto transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Əsas səhifəyə qayıt</span>
        </button>
      </div>
    </motion.div>
  );
};
