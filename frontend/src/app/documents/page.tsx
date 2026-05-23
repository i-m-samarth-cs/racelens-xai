"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Search,
  FileText,
  Filter,
  Download,
  ExternalLink,
  BookOpen,
  Scale,
} from "lucide-react";

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const documents = [
    {
      id: "REG-2024-37.5",
      title: "Article 37.5 - Impeding",
      type: "regulation",
      year: 2024,
      category: "Sporting Regulations",
      content: "Any driver taking part in any practice session who, in the opinion of the stewards, stops unnecessarily on the circuit or unnecessarily impedes another driver shall be subject to the penalties referred to in Article 18.1.",
      relevance: 0.95,
      page: 45,
      section: "Practice Sessions",
    },
    {
      id: "REG-2024-34.14",
      title: "Article 34.14 - Unsafe Release",
      type: "regulation",
      year: 2024,
      category: "Sporting Regulations",
      content: "A car may not be released from its pit stop position until it is safe to do so. The team must ensure that the car is released in a safe manner.",
      relevance: 0.92,
      page: 42,
      section: "Pit Lane",
    },
    {
      id: "DEC-2023-MON-Q-01",
      title: "Monaco GP Qualifying - Impeding Decision",
      type: "steward_decision",
      year: 2023,
      category: "Precedent",
      content: "The Stewards reviewed video evidence and determined that Car 14 unnecessarily impeded Car 1 during Q2. Grid penalty of 3 places applied.",
      relevance: 0.87,
      event: "Monaco Grand Prix",
      outcome: "3-place grid penalty",
    },
    {
      id: "REG-2024-33.3",
      title: "Article 33.3 - Track Limits",
      type: "regulation",
      year: 2024,
      category: "Sporting Regulations",
      content: "Drivers must make every reasonable effort to use the track at all times and may not leave the track without a justifiable reason.",
      relevance: 0.89,
      page: 40,
      section: "Track Usage",
    },
  ];

  const filteredDocs = searchQuery
    ? documents.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : documents;

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
            <h1 className="text-xl font-display font-bold">Document Explorer</h1>
            <div className="w-32" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Search & Filter */}
          <div className="lg:col-span-1">
            <div className="card-elevated sticky top-24">
              <h2 className="text-xl font-display font-bold mb-6">Search Documents</h2>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-graphite-500" />
                <input
                  type="text"
                  placeholder="Search regulations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                />
              </div>

              {/* Filters */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm text-graphite-400 mb-2 block">Document Type</label>
                  <select className="input">
                    <option>All Types</option>
                    <option>Regulations</option>
                    <option>Steward Decisions</option>
                    <option>Technical Directives</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-graphite-400 mb-2 block">Year</label>
                  <select className="input">
                    <option>All Years</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-graphite-400 mb-2 block">Category</label>
                  <select className="input">
                    <option>All Categories</option>
                    <option>Sporting Regulations</option>
                    <option>Technical Regulations</option>
                    <option>Precedents</option>
                  </select>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4 bg-background-elevated rounded-lg">
                <div className="text-sm text-graphite-400 mb-2">Document Library</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-display font-bold text-racing-cyan">247</div>
                    <div className="text-xs text-graphite-500">Regulations</div>
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold text-racing-green">1,432</div>
                    <div className="text-xs text-graphite-500">Decisions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Document List & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Results */}
            <div className="card-elevated">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">
                  {filteredDocs.length} Documents Found
                </h2>
                <button className="btn-ghost">
                  <Filter className="w-4 h-4 mr-2" />
                  Sort
                </button>
              </div>

              <div className="space-y-3">
                {filteredDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedDoc?.id === doc.id
                        ? "bg-racing-cyan/20 border-2 border-racing-cyan"
                        : "bg-background-elevated border-2 border-transparent hover:border-graphite-600"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {doc.type === "regulation" ? (
                          <Scale className="w-5 h-5 text-racing-amber flex-shrink-0" />
                        ) : (
                          <FileText className="w-5 h-5 text-racing-cyan flex-shrink-0" />
                        )}
                        <div>
                          <h3 className="font-display font-bold">{doc.title}</h3>
                          <p className="text-xs text-graphite-500">{doc.id}</p>
                        </div>
                      </div>
                      <span className="badge-cyan text-xs tabular-nums">
                        {Math.round(doc.relevance * 100)}%
                      </span>
                    </div>
                    <p className="text-sm text-graphite-400 line-clamp-2 ml-8">
                      {doc.content}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 ml-8 text-xs text-graphite-500">
                      <span>{doc.category}</span>
                      <span>•</span>
                      <span>{doc.year}</span>
                      {doc.page && (
                        <>
                          <span>•</span>
                          <span>Page {doc.page}</span>
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Document Details */}
            {selectedDoc && (
              <div className="card-elevated">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-display font-bold mb-2">{selectedDoc.title}</h2>
                    <p className="text-graphite-400">{selectedDoc.id}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn-ghost">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="btn-ghost">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <MetricCard label="Type" value={selectedDoc.type} />
                  <MetricCard label="Year" value={selectedDoc.year} />
                  <MetricCard label="Category" value={selectedDoc.category} />
                  <MetricCard label="Relevance" value={`${Math.round(selectedDoc.relevance * 100)}%`} />
                </div>

                <div className="p-6 bg-background-elevated rounded-lg border border-graphite-700">
                  <h3 className="font-display font-bold mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-racing-cyan" />
                    Full Content
                  </h3>
                  <p className="text-graphite-200 leading-relaxed whitespace-pre-wrap">
                    {selectedDoc.content}
                  </p>
                </div>

                {selectedDoc.type === "steward_decision" && (
                  <div className="mt-6 p-4 bg-racing-green/10 border border-racing-green/30 rounded-lg">
                    <h4 className="font-display font-bold mb-2 text-racing-green">Decision Outcome</h4>
                    <p className="text-graphite-200">{selectedDoc.outcome}</p>
                  </div>
                )}

                {selectedDoc.section && (
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-background-elevated rounded-lg">
                      <div className="text-xs text-graphite-500 mb-1">Section</div>
                      <div className="font-semibold">{selectedDoc.section}</div>
                    </div>
                    {selectedDoc.page && (
                      <div className="p-3 bg-background-elevated rounded-lg">
                        <div className="text-xs text-graphite-500 mb-1">Page</div>
                        <div className="font-semibold">{selectedDoc.page}</div>
                      </div>
                    )}
                  </div>
                )}
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
