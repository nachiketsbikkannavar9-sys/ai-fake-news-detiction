"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";

const stats = [
  { label: "Fake News Detected", value: "2.4M+", color: "text-red-400" },
  { label: "Verified Articles", value: "15M+", color: "text-neon-blue" },
  { label: "Active Users", value: "850K+", color: "text-neon-purple" },
  { label: "Detection Accuracy", value: "99.2%", color: "text-green-400" },
];

export function StatsSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <GlassCard hoverEffect className="text-center py-8">
              <div className={`text-4xl font-bold mb-2 ${stat.color} text-glow`}>
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
