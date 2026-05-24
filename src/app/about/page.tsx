import { GlassCard } from "@/components/GlassCard";

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold font-heading mb-8 text-glow text-center">About TruthGuard AI</h1>
      <GlassCard className="prose prose-invert max-w-none">
        <h2 className="text-2xl text-neon-blue mb-4">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          At TruthGuard AI, our mission is to empower individuals, organizations, and governments with state-of-the-art artificial intelligence tools to combat the spread of misinformation and fake news. We believe that access to verified, fact-checked information is a fundamental right in the digital age.
        </p>
        <h2 className="text-2xl text-neon-purple mb-4">How We Work</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Our platform utilizes advanced Natural Language Processing (NLP) models, specifically fine-tuned BERT and RoBERTa architectures, to analyze text semantics, emotional language, and stylistic patterns commonly found in deceptive content. Additionally, our system cross-references claims against trusted global databases in real-time.
        </p>
        <h2 className="text-2xl text-accent-500 mb-4">The Technology</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
          <li><strong>Transformers:</strong> Deep learning models for context-aware claim extraction.</li>
          <li><strong>Computer Vision:</strong> CNNs and ViTs to detect artifacts left by GANs in deepfake images.</li>
          <li><strong>Real-time Scraping:</strong> Distributed nodes monitoring social media for viral misinformation.</li>
        </ul>
      </GlassCard>
    </div>
  );
}
