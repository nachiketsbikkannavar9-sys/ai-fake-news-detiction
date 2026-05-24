"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Shield, AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function FactCheckPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("/api/trending");
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Fake": return "text-red-400 bg-red-400/10 border-red-400/20";
      case "Misleading": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified": return <CheckCircle className="h-4 w-4" />;
      case "Fake": return <AlertCircle className="h-4 w-4" />;
      case "Misleading": return <Shield className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="h-8 w-8 text-neon-blue" />
        <h1 className="text-3xl font-bold font-heading">Real-Time Fact Check Feed</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
            </div>
          ) : (
            reports.map((report) => (
              <GlassCard key={report.id} hoverEffect className="relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    {report.status}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(report.timestamp), { addSuffix: true })}
                  </div>
                </div>
                
                <h3 className="text-xl font-medium mb-3 text-white">{report.claim}</h3>
                
                <div className="flex items-center justify-between border-t border-gray-800 pt-4 mt-4">
                  <div className="flex gap-2 text-sm text-gray-400">
                    <span>Category: <span className="text-white">{report.category}</span></span>
                    <span>•</span>
                    <span>Sources: <span className="text-white">{report.sources.join(", ")}</span></span>
                  </div>
                  <div className="text-sm">
                    Trust Score: <span className={`font-bold ${report.score > 50 ? "text-green-400" : "text-red-400"}`}>{report.score}/100</span>
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>

        <div className="space-y-6">
          <GlassCard className="border-neon-purple/30">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-neon-purple" />
              Viral Alerts
            </h3>
            <ul className="space-y-4">
              <li className="border-l-2 border-red-500 pl-3">
                <p className="text-sm text-gray-300">Fake election audio circulating on WhatsApp in multiple regions.</p>
                <span className="text-xs text-red-400 font-medium mt-1 block">Critical Severity</span>
              </li>
              <li className="border-l-2 border-yellow-500 pl-3">
                <p className="text-sm text-gray-300">Misleading statistics about new tax laws trending on Twitter.</p>
                <span className="text-xs text-yellow-400 font-medium mt-1 block">High Severity</span>
              </li>
            </ul>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-bold mb-4">Trusted Databases</h3>
            <div className="flex flex-wrap gap-2">
              {["Snopes", "Reuters", "AP News", "FactCheck.org", "PolitiFact"].map(db => (
                <span key={db} className="px-3 py-1 bg-gray-900 rounded-md text-xs border border-gray-700 text-gray-400">
                  {db}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
