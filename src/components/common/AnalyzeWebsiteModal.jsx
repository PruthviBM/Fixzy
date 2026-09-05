import React, { useState } from 'react';
import {
  Globe,
  Sparkles,
  X,
  ArrowRight,
  ClipboardPaste,
  ShieldCheck,
  CheckCircle2,
  BrainCircuit,
  Loader2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AnalyzeWebsiteModal() {
  const {
    isUrlModalOpen,
    setIsUrlModalOpen,
    customSite,
    analyzeCustomSite,
    isScanningUrl,
    setCurrentView,
  } = useApp();

  const [inputUrl, setInputUrl] = useState(customSite.url || '');
  const [inputName, setInputName] = useState(customSite.name || '');

  if (!isUrlModalOpen) return null;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInputUrl(text.trim());
    } catch {
      // Fallback if permission blocked
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputUrl) return;
    analyzeCustomSite(inputUrl, inputName);
  };

  const presetExamples = [
    { name: 'Shopify Checkout', url: 'https://mybrand.myshopify.com/checkout' },
    { name: 'SaaS Signup Funnel', url: 'https://app.cloudhub.io/signup' },
    { name: 'Fintech Transfer', url: 'https://pay.quicktransfer.com/send' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl border border-sky-500/40 bg-slate-900 p-6 shadow-2xl glow-blue">
        {/* Close Button */}
        <button
          onClick={() => !isScanningUrl && setIsUrlModalOpen(false)}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          disabled={isScanningUrl}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Analyze Website & Detect Friction
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Paste any website link or name to generate instant AI breakpoint diagnosis.
            </p>
          </div>
        </div>

        {isScanningUrl ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-slate-800 border-t-sky-500 animate-spin" />
              <BrainCircuit className="h-7 w-7 text-sky-400 absolute inset-0 m-auto animate-pulse" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">
                Ingesting {inputName || inputUrl}...
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Parsing DOM form structure, mapping 8 behavioral friction dimensions, and generating causal explanation...
              </p>
            </div>

            <div className="w-64 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 animate-pulse w-3/4" />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* URL Input */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Website Link or Funnel URL <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="e.g. https://mystore.com/checkout or myapp.com/signup"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-3 pr-24 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-lg bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <ClipboardPaste className="h-3 w-3 text-sky-400" />
                  <span>Paste</span>
                </button>
              </div>
            </div>

            {/* Optional Website / Brand Name */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Website / Product Name <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="e.g. Acme Fashion Store, CloudSync App"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* Quick Example Presets */}
            <div className="pt-1">
              <span className="text-[11px] font-medium text-slate-400 block mb-1.5">
                Or choose a quick demo preset:
              </span>
              <div className="flex flex-wrap gap-2">
                {presetExamples.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setInputUrl(item.url);
                      setInputName(item.name);
                    }}
                    className="rounded-lg border border-slate-800 bg-slate-800/60 px-2.5 py-1 text-[11px] text-slate-300 hover:border-sky-500 hover:text-sky-300 transition-all"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsUrlModalOpen(false)}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-lg hover:from-sky-400 hover:to-indigo-500 transition-all active:scale-[0.98]"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Analyze Breakpoint & Generate Explanation</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
