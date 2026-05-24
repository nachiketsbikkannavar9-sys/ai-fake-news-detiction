"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { BrainCircuit, Search, Database, Fingerprint } from "lucide-react";

const features = [
  {
    title: "Advanced NLP Processing",
    description: "Our AI reads and understands context, extracting claims and analyzing sentiment using state-of-the-art transformer models.",
    icon: BrainCircuit,
    color: "text-neon-blue",
  },
  {
    title: "Cross-Reference Engine",
    description: "Automatically compares claims against thousands of verified trusted databases and fact-checking organizations.",
    icon: Database,
    color: "text-neon-purple",
  },
  {
    title: "Deepfake Detection",
    description: "Upload images or videos to analyze metadata and detect AI-generated or manipulated media content.",
    icon: Fingerprint,
    color: "text-accent-500",
  },
  {
    title: "Real-Time Tracking",
    description: "Monitor the spread of viral misinformation across social platforms as it happens with our live dashboard.",
    icon: Search,
    color: "text-primary-500",
  },
];

export function FeaturesSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
          How <span className="text-neon-blue">TruthGuard AI</span> Works
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Our multi-layered AI verification system analyzes content in milliseconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard hoverEffect className="h-full flex flex-col md:flex-row gap-6 p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                <div className={`p-4 rounded-2xl glass-panel h-fit ${feature.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
