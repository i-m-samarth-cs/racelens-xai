"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ChevronLeft,
  Filter,
  Search,
  Download,
  Share2,
  Eye,
  FileText,
  TrendingUp,
  Shield,
} from "lucide-react";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/incidents/feed`)
      .then(res => res.json())
      .then(data => {
        setIncidents(data.incidents || []);
        if (data.incidents && data.incidents.length > 0) {
          setSelectedIncident(data.incidents[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const filteredIncidents = filter === "all" 
    ? incidents 
    : incidents.filter(i => i.type === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-graphite-800 bg-background-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2 text-graphite-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-display font-bold">Incident Analysis Workspace</h1>
            <div className="w-32" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Incident List */}
          <div className="lg:col-span-1">
            <div className="card-elevated sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">Incidents</h2>
                <button className="p-2 hover:bg-background-elevated rounded-lg transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-graphite-500" />
                <input
                  type="text"
                  placeholder="Search incidents..."
                  className="input pl-10"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex space-x-2 mb-4 overflow-x-auto">
                {["all", "impeding", "collision", "track_limits", "strategy"].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                      filter === f
                        ? "bg-racing-cyan text-black"
                        : "bg-background-elevated text-graphite-400 hover:text-white"
                    }`}
                  >
                    {f.replace("_", " ").toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Incident List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {loading ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="h-20 bg-background-elevated rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : (
                  filteredIncidents.map(incident => (
                    <button
                      key={incident.id}
                      onClick={() => setSelectedIncident(incident)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedIncident?.id === incident.id
                          ? "bg-racing-cyan/20 border-2 border-racing-cyan"
                          : "bg-background-elevated border-2 border-transparent hover:border-graphite-600"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-display font-bold text-sm">{incident.title || incident.id}</span>
                        <span className="badge-cyan text-xs tabular-nums">
                          {Math.round((incident.confidence || incident.risk_score) * 100)}%
                        </span>
                      </div>
                      <p className="text-xs text-graphite-400 line-clamp-2">
                        {incident.description || incident.type}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Content - Incident Details */}
          <div className="lg:col-span-2">
            {selectedIncident ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="card-elevated">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-display font-bold mb-2">
                        {selectedIncident.title}
                      </h2>
                      <p className="text-graphite-400">{selectedIncident.id}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-ghost">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="btn-ghost">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MetricCard label="Confidence" value={`${Math.round(selectedIncident.confidence * 100)}%`} />
                    <MetricCard label="Severity" value={selectedIncident.severity} />
                    <MetricCard label="Session" value={selectedIncident.session} />
                    <MetricCard label="Lap" value={selectedIncident.lap} />
                  </div>
                </div>

                {/* Classification */}
                <div className="card-elevated">
                  <h3 className="text-xl font-display font-bold mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-racing-cyan" />
                    AI Classification
                  </h3>
                  <div className="p-4 bg-racing-cyan/10 border border-racing-cyan/30 rounded-lg mb-4">
                    <div className="text-2xl font-display font-bold text-racing-cyan mb-2">
                      {selectedIncident.classification || selectedIncident.type}
                    </div>
                    <div className="text-sm text-graphite-300">
                      Regulation: <span className="text-racing-amber font-mono">{selectedIncident.regulation_clause}</span>
                    </div>
                  </div>
                  <p className="text-graphite-300 leading-relaxed">
                    {selectedIncident.explanation}
                  </p>
                </div>

                {/* Evidence */}
                <div className="card-elevated">
                  <h3 className="text-xl font-display font-bold mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-racing-amber" />
                    Evidence & Analysis
                  </h3>
                  <div className="space-y-3">
                    {selectedIncident.evidence?.map((ev: any, idx: number) => (
                      <div key={idx} className="p-3 bg-background-elevated rounded-lg border border-graphite-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-racing-amber uppercase">{ev.type}</span>
                          <span className="badge-green text-xs tabular-nums">{Math.round(ev.confidence * 100)}%</span>
                        </div>
                        <p className="text-sm text-graphite-300">{ev.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Precedent Cases */}
                {selectedIncident.precedent_cases && (
                  <div className="card-elevated">
                    <h3 className="text-xl font-display font-bold mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-racing-green" />
                      Similar Precedent Cases
                    </h3>
                    <div className="space-y-3">
                      {selectedIncident.precedent_cases.map((precedent: any, idx: number) => (
                        <div key={idx} className="p-4 bg-background-elevated rounded-lg border border-graphite-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-display font-bold">{precedent.case_id}</span>
                            <span className="badge-green text-xs tabular-nums">
                              {Math.round(precedent.similarity * 100)}% similar
                            </span>
                          </div>
                          <p className="text-sm text-graphite-400 mb-2">{precedent.description}</p>
                          <div className="text-sm">
                            <span className="text-graphite-500">Outcome: </span>
                            <span className="text-racing-green font-semibold">{precedent.outcome}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Decision */}
                <div className="card-elevated">
                  <h3 className="text-xl font-display font-bold mb-4">Suggested Steward Decision</h3>
                  <div className="p-4 bg-racing-red/10 border border-racing-red/30 rounded-lg">
                    <div className="text-xl font-display font-bold text-racing-red mb-2">
                      {selectedIncident.suggested_decision}
                    </div>
                    <p className="text-sm text-graphite-400">
                      Based on regulation {selectedIncident.regulation_clause} and {selectedIncident.precedent_cases?.length || 0} precedent cases
                    </p>
                  </div>
                </div>

                {/* Alternative Interpretations */}
                {selectedIncident.alternative_interpretations && (
                  <div className="card-elevated">
                    <h3 className="text-xl font-display font-bold mb-4">Alternative Interpretations</h3>
                    <div className="space-y-2">
                      {selectedIncident.alternative_interpretations.map((alt: string, idx: number) => (
                        <div key={idx} className="p-3 bg-background-elevated rounded-lg border border-graphite-700">
                          <p className="text-sm text-graphite-300">{alt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fan Mode Summary */}
                <div className="card-elevated bg-gradient-to-br from-racing-cyan/10 to-racing-cyan/5 border-racing-cyan/30">
                  <div className="flex items-center space-x-2 mb-4">
                    <Eye className="w-5 h-5 text-racing-cyan" />
                    <h3 className="text-xl font-display font-bold">Fan-Friendly Summary</h3>
                  </div>
                  <p className="text-lg text-graphite-200 leading-relaxed">
                    {selectedIncident.fan_mode_summary}
                  </p>
                  <Link href="/fan-mode" className="inline-flex items-center mt-4 text-racing-cyan hover:text-racing-cyan/80 font-semibold">
                    View in Fan Mode
                    <ChevronLeft className="w-4 h-4 ml-1 rotate-180" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card-elevated h-96 flex items-center justify-center">
                <div className="text-center">
                  <AlertTriangle className="w-16 h-16 text-graphite-600 mx-auto mb-4" />
                  <p className="text-graphite-400">Select an incident to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: any) {
  return (
    <div className="p-3 bg-background-elevated rounded-lg">
      <div className="text-xs text-graphite-500 mb-1">{label}</div>
      <div className="text-lg font-display font-bold">{value}</div>
    </div>
  );
}

// Made with Bob
