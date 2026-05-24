import { GlassCard } from "@/components/GlassCard";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold font-heading mb-8 text-center">Contact Us</h1>
      <p className="text-center text-gray-400 mb-12">
        Have questions about our enterprise API, need to report critical misinformation, or want to partner with us?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard>
          <h2 className="text-2xl font-bold mb-6 text-neon-blue">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
              <input type="text" className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-neon-blue" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input type="email" className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-neon-blue" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
              <textarea rows={4} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-neon-blue resize-none"></textarea>
            </div>
            <button type="button" className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-lg transition-colors">
              Send Message
            </button>
          </form>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="flex items-start gap-4">
            <Mail className="h-6 w-6 text-neon-purple shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
              <p className="text-gray-400">support@truthguard-ai.com</p>
              <p className="text-gray-400">enterprise@truthguard-ai.com</p>
            </div>
          </GlassCard>
          <GlassCard className="flex items-start gap-4">
            <MessageSquare className="h-6 w-6 text-accent-500 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Live Chat</h3>
              <p className="text-gray-400">Available 24/7 for Enterprise customers and verified fact-checkers.</p>
            </div>
          </GlassCard>
          <GlassCard className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-neon-blue shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Global Headquarters</h3>
              <p className="text-gray-400">Silicon Valley, CA</p>
              <p className="text-gray-400">London, UK (European Hub)</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
