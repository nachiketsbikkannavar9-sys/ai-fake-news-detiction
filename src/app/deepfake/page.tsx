"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Upload, Image as ImageIcon, Fingerprint, ShieldAlert, CheckCircle, Video, AlertTriangle } from "lucide-react";

export default function DeepfakePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    
    setIsScanning(true);
    setResult(null);

    // Simulate analysis delay
    setTimeout(() => {
      setIsScanning(false);
      // Dummy result based on random for demo purposes
      setResult({
        manipulationScore: 85,
        aiGeneratedProbability: 92,
        isOriginal: false,
        facesDetected: 1,
        verdict: "High Probability of Deepfake / AI Generation",
        metadata: "EXIF data missing. Noise patterns indicate GAN generation."
      });
    }, 4000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-heading text-glow-purple">Image & Deepfake Detector</h1>
        <p className="text-gray-400">Upload media to detect AI generation, manipulation, and deepfakes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="flex flex-col">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Upload className="h-5 w-5 text-neon-blue" />
            Upload Media
          </h3>
          
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex-1 border-2 border-dashed border-gray-600 hover:border-neon-blue rounded-xl bg-gray-900/30 flex flex-col items-center justify-center p-8 transition-colors text-center cursor-pointer min-h-[300px]"
          >
            {file ? (
              <div className="flex flex-col items-center">
                {file.type.includes('video') ? <Video className="h-16 w-16 text-neon-purple mb-4" /> : <ImageIcon className="h-16 w-16 text-neon-purple mb-4" />}
                <p className="text-white font-medium mb-2">{file.name}</p>
                <p className="text-gray-400 text-sm mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null); }} className="text-sm text-red-400 hover:text-red-300">
                  Remove File
                </button>
              </div>
            ) : (
              <>
                <Upload className="h-12 w-12 text-gray-500 mb-4" />
                <p className="text-white font-medium mb-2">Drag & drop an image or video</p>
                <p className="text-gray-400 text-sm mb-6">Supports JPG, PNG, MP4 (Max 50MB)</p>
                <label className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer transition-colors">
                  Browse Files
                  <input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                </label>
              </>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!file || isScanning}
            className="w-full mt-6 bg-gradient-to-r from-neon-purple to-accent-600 hover:from-accent-500 hover:to-accent-500 disabled:opacity-50 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(176,38,255,0.3)]"
          >
            {isScanning ? "Analyzing Metadata & Pixels..." : "Analyze Media"}
          </button>
        </GlassCard>

        <div className="flex flex-col">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="relative w-48 h-48 mb-8">
                  <div className="absolute inset-0 border-2 border-neon-purple rounded-lg animate-[spin_4s_linear_infinite]"></div>
                  <div className="absolute inset-2 border-2 border-neon-blue rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
                  <Fingerprint className="absolute inset-0 m-auto h-16 w-16 text-white animate-pulse" />
                  
                  {/* Scanning line effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <div className="w-full h-1 bg-neon-blue shadow-[0_0_10px_#00f0ff] animate-[bounce_2s_infinite]"></div>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-neon-purple animate-pulse">Running GAN Detection Models...</h3>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col space-y-6"
              >
                <GlassCard className="border-t-4 border-t-red-500">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldAlert className="h-8 w-8 text-red-500" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Detection Result</h3>
                      <p className="text-red-400 font-medium">{result.verdict}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">AI Generated Probability</span>
                        <span className="text-white font-bold">{result.aiGeneratedProbability}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${result.aiGeneratedProbability}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Manipulation Score</span>
                        <span className="text-white font-bold">{result.manipulationScore}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${result.manipulationScore}%` }}></div>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <h4 className="font-semibold mb-4 text-gray-300 border-b border-gray-800 pb-2">Analysis Details</h4>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-neon-blue mt-0.5" />
                      Faces Detected: {result.facesDetected}
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      Metadata Analysis: {result.metadata}
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      Frequency domain analysis shows unnatural artifacts typical of Stable Diffusion / Midjourney.
                    </li>
                  </ul>
                </GlassCard>
              </motion.div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 min-h-[400px]">
                Upload a file to see deepfake analysis results.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
