"use client";

import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Users, Shield, FileText, Settings, Check } from "lucide-react";

export default function AdminPage() {
  const [reports, setReports] = useState([
    { id: 1, claim: "Elections delayed by 2 months...", user: "user123@...", confidence: "98% Fake", status: "Pending" },
    { id: 2, claim: "New virus variant found in...", user: "anon_99...", confidence: "65% Fake", status: "In Review" },
    { id: 3, claim: "CEO of TechCorp steps down", user: "john_doe", confidence: "12% Fake", status: "Verified" },
  ]);

  const handleDelete = (id: number) => {
    setReports(reports.filter(r => r.id !== id));
  };

  const handleReview = (id: number) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: "Reviewed" } : r));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-neon-blue" />
        <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Active Users", value: "12,450", icon: Users, color: "text-blue-400" },
          { label: "Reported News", value: "3,210", icon: FileText, color: "text-red-400" },
          { label: "AI Models Status", value: "Online", icon: Settings, color: "text-green-400" },
          { label: "Pending Fact Checks", value: reports.filter(r => r.status === "Pending").length.toString(), icon: Shield, color: "text-yellow-400" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <GlassCard key={i} className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gray-900/50 ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard>
        <h3 className="text-xl font-bold mb-6">Recent Reported Misinformation</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="pb-3 px-4 font-medium">Claim</th>
                <th className="pb-3 px-4 font-medium">Reported By</th>
                <th className="pb-3 px-4 font-medium">AI Confidence</th>
                <th className="pb-3 px-4 font-medium">Status</th>
                <th className="pb-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">No reported misinformation found.</td>
                </tr>
              ) : (
                reports.map((row) => (
                  <tr key={row.id} className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors">
                    <td className="py-4 px-4 text-white font-medium">{row.claim}</td>
                    <td className="py-4 px-4 text-gray-400">{row.user}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${row.confidence.includes('9') ? 'bg-red-500/20 text-red-400' : row.confidence.includes('6') ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                        {row.confidence}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-xs border ${row.status === 'Reviewed' ? 'border-green-500 text-green-400' : 'border-gray-700 text-gray-400'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right flex justify-end gap-3">
                      {row.status !== "Reviewed" && (
                        <button onClick={() => handleReview(row.id)} className="text-neon-blue hover:text-blue-400 transition-colors flex items-center gap-1">
                          <Check className="h-3 w-3" /> Review
                        </button>
                      )}
                      <button onClick={() => handleDelete(row.id)} className="text-red-400 hover:text-red-300 transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
