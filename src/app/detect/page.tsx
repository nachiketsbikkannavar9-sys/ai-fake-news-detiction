"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { BrainCircuit, Link as LinkIcon, FileText, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

export default function DetectPage() {
  const [activeTab, setActiveTab] = useState<"text" | "url">("text");
  const [input, setInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [scanStep, setScanStep] = useState(0);

  const scanSteps = [
    "Extracting claims...",
    "Analyzing sentiment & emotional language...",
    "Cross-referencing trusted databases...",
    "Verifying source credibility...",
    "Generating final trust score..."
  ];

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsScanning(true);
    setResult(null);
    setScanStep(0);

    // Simulate scan steps animation
    const stepInterval = setInterval(() => {
      setScanStep(prev => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input, type: activeTab }),
      });
      const data = await response.json();
      
      clearInterval(stepInterval);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-heading text-glow">AI Misinformation Scanner</h1>
        <p className="text-gray-400">Analyze articles, claims, or URLs for authenticity and bias.</p>
      </div>

      <GlassCard className="mb-8">
        <div className="flex border-b border-glass-border mb-6">
          <button
            onClick={() => setActiveTab("text")}
            className={`flex-1 py-3 font-medium transition-all flex items-center justify-center gap-2 ${activeTab === "text" ? "text-neon-blue border-b-2 border-neon-blue" : "text-gray-400 hover:text-white"}`}
          >
            <FileText className="h-4 w-4" /> Text/Article
          </button>
          <button
            onClick={() => setActiveTab("url")}
            className={`flex-1 py-3 font-medium transition-all flex items-center justify-center gap-2 ${activeTab === "url" ? "text-neon-blue border-b-2 border-neon-blue" : "text-gray-400 hover:text-white"}`}
          >
            <LinkIcon className="h-4 w-4" /> URL
          </button>
        </div>

        <div className="mb-6">
          {activeTab === "text" ? (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste article text or claims here... (Try including words like 'aliens' or 'secret cure' to see fake detection)"
              className="w-full h-48 bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue resize-none transition-all"
            />
          ) : (
            <input
              type="url"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://example.com/news-article"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
            />
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isScanning || !input.trim()}
          className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 disabled:opacity-50 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]"
        >
          {isScanning ? (
            <>
              <BrainCircuit className="h-5 w-5 animate-pulse" />
              Scanning...
            </>
          ) : (
            <>Analyze Content</>
          )}
        </button>
      </GlassCard>

      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <GlassCard className="text-center py-12 flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-t-neon-blue border-r-neon-purple border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <BrainCircuit className="absolute inset-0 m-auto h-10 w-10 text-neon-blue animate-pulse" />
              </div>
              <h3 className="text-xl font-medium text-neon-blue mb-2 animate-pulse">{scanSteps[scanStep]}</h3>
              <p className="text-gray-400">Processing with TruthGuard AI core...</p>
            </GlassCard>
          </motion.div>
        )}

        {result && !isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Main Score Card */}
            <GlassCard className="md:col-span-1 flex flex-col items-center justify-center text-center p-8 border-t-4 border-t-neon-blue">
              <h3 className="text-gray-400 font-medium mb-4">Authenticity Score</h3>
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={result.authenticityScore > 50 ? "#4ade80" : "#f87171"}
                    strokeWidth="8"
                    strokeDasharray={`${(result.authenticityScore / 100) * 283} 283`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className={`text-4xl font-bold ${result.authenticityScore > 50 ? "text-green-400" : "text-red-400"}`}>
                    {result.authenticityScore}
                  </span>
                  <span className="text-xs text-gray-500">/100</span>
                </div>
              </div>
              <div className={`flex items-center gap-2 font-bold ${result.authenticityScore > 50 ? "text-green-400" : "text-red-400"}`}>
                {result.authenticityScore > 50 ? <CheckCircle className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                {result.verdict}
              </div>
            </GlassCard>

            {/* Analysis Details */}
            <GlassCard className="md:col-span-2 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-4 font-heading border-b border-glass-border pb-2">AI Explanation</h3>
                <p className="text-gray-300 mb-6">{result.explanation}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                    <div className="text-sm text-gray-400 mb-1">Fake Probability</div>
                    <div className="text-xl font-bold text-red-400">{result.fakeProbability}%</div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                    <div className="text-sm text-gray-400 mb-1">Source Credibility</div>
                    <div className="text-xl font-bold text-blue-400">{result.sourceCredibilityScore}/100</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3 tracking-wider">Verification Evidence</h4>
                <div className="space-y-3">
                  {result.evidence.map((ev: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 bg-gray-900/30 p-3 rounded-lg border border-gray-800/50">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-white text-sm">{ev.title}</div>
                        <div className="text-xs text-gray-400">{ev.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
