"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  Brain,
  FileText,
  Workflow,
  Zap,
  Shield,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Cpu,
  Database,
  GitBranch,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: "IBM Granite LLM",
      description: "Advanced reasoning engine that understands racing context, regulations, and precedents to generate explainable decisions.",
      color: "racing-cyan",
    },
    {
      icon: FileText,
      title: "Docling Parser",
      description: "Intelligent document processing that extracts structured data from FIA regulations and steward decisions.",
      color: "racing-green",
    },
    {
      icon: Workflow,
      title: "Langflow Orchestration",
      description: "Visual AI workflow builder that chains retrieval, reasoning, and explanation steps seamlessly.",
      color: "racing-red",
    },
    {
      icon: Database,
      title: "FastF1 Integration",
      description: "Real telemetry data from actual racing sessions for authentic incident analysis and strategy recommendations.",
      color: "amber",
    },
  ];

  const useCases = [
    {
      icon: Target,
      title: "Race Control",
      description: "Assist stewards with evidence-based incident classification and penalty recommendations grounded in regulations.",
    },
    {
      icon: TrendingUp,
      title: "Strategy Teams",
      description: "Provide explainable strategy recommendations with confidence scores and alternative scenario analysis.",
    },
    {
      icon: Users,
      title: "Broadcasters",
      description: "Generate fan-friendly explanations of complex racing incidents for live commentary and analysis.",
    },
    {
      icon: Shield,
      title: "Sim Racing",
      description: "Fair and transparent stewarding for online racing leagues with consistent rule enforcement.",
    },
  ];

  const architectureSteps = [
    {
      step: "1",
      title: "Data Ingestion",
      description: "FastF1 telemetry + FIA documents parsed by Docling",
      icon: Database,
    },
    {
      step: "2",
      title: "Retrieval Layer",
      description: "Semantic search finds relevant regulations and precedents",
      icon: FileText,
    },
    {
      step: "3",
      title: "Reasoning Engine",
      description: "IBM Granite analyzes context and generates explanations",
      icon: Brain,
    },
    {
      step: "4",
      title: "Orchestration",
      description: "Langflow chains the workflow with confidence scoring",
      icon: Workflow,
    },
    {
      step: "5",
      title: "Explainability",
      description: "Multi-level outputs: technical, fan-mode, evidence traces",
      icon: Sparkles,
    },
  ];

  const principles = [
    {
      icon: Shield,
      title: "Transparency First",
      description: "Every decision includes evidence, confidence scores, and reasoning traces.",
    },
    {
      icon: CheckCircle,
      title: "Regulation Grounded",
      description: "All outputs cite specific FIA rules and precedent cases.",
    },
    {
      icon: Users,
      title: "Multi-Audience",
      description: "Technical mode for experts, fan mode for everyone else.",
    },
    {
      icon: Zap,
      title: "Real-Time Ready",
      description: "Optimized for live race analysis with sub-second response times.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-graphite-800 bg-background-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-graphite-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-display font-bold">About RaceLens XAI</h1>
            <div className="w-32" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-racing-cyan/5 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-racing-cyan/20 border border-racing-cyan/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-racing-cyan" />
              <span className="text-sm font-semibold text-racing-cyan">Explainable AI for Motorsport</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              When Every Millisecond Matters,
              <br />
              <span className="text-racing-cyan">Trust The Reason Behind The Decision</span>
            </h1>
            <p className="text-xl text-graphite-300 mb-8">
              RaceLens XAI combines IBM's enterprise AI stack with real racing data to deliver transparent,
              regulation-grounded incident analysis and strategy recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dashboard" className="btn-primary">
                Launch Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a href="#architecture" className="btn-secondary">
                See How It Works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-background-elevated">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">The Problem</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card-elevated text-center">
                <div className="w-12 h-12 bg-racing-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="font-display font-bold mb-2">Inconsistent Decisions</h3>
                <p className="text-sm text-graphite-400">
                  Similar incidents receive different penalties, eroding trust in race control.
                </p>
              </div>
              <div className="card-elevated text-center">
                <div className="w-12 h-12 bg-racing-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-display font-bold mb-2">Black Box Reasoning</h3>
                <p className="text-sm text-graphite-400">
                  Fans and teams don't understand why decisions were made.
                </p>
              </div>
              <div className="card-elevated text-center">
                <div className="w-12 h-12 bg-racing-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏱️</span>
                </div>
                <h3 className="font-display font-bold mb-2">Time Pressure</h3>
                <p className="text-sm text-graphite-400">
                  Stewards must make complex decisions in seconds during live races.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IBM Stack Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">
              Powered by <span className="text-racing-cyan">IBM's Enterprise AI Stack</span>
            </h2>
            <p className="text-xl text-graphite-400 max-w-3xl mx-auto">
              Built on production-grade AI infrastructure designed for mission-critical applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated hover:border-racing-cyan/50 transition-all group"
              >
                <div className={`w-12 h-12 bg-${feature.color}/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-graphite-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-16 bg-background-elevated">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-xl text-graphite-400 max-w-3xl mx-auto">
              A RAG-powered pipeline that retrieves relevant regulations and generates explainable decisions.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-racing-cyan/20 via-racing-cyan/50 to-racing-cyan/20 hidden lg:block" />

              <div className="grid lg:grid-cols-5 gap-6">
                {architectureSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="card-elevated text-center hover:border-racing-cyan/50 transition-all">
                      <div className="w-12 h-12 bg-racing-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                        <step.icon className="w-6 h-6 text-racing-cyan" />
                      </div>
                      <div className="text-2xl font-display font-bold text-racing-cyan mb-2">{step.step}</div>
                      <h3 className="font-display font-bold mb-2 text-sm">{step.title}</h3>
                      <p className="text-xs text-graphite-400">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Architecture Diagram Placeholder */}
          <div className="mt-12 card-elevated">
            <h3 className="text-2xl font-display font-bold mb-6 text-center">System Architecture</h3>
            <div className="bg-background-surface rounded-lg p-8 border border-graphite-700">
              <div className="text-center text-graphite-400">
                <Cpu className="w-16 h-16 mx-auto mb-4 text-racing-cyan" />
                <p className="mb-4">Complete architecture diagram showing:</p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-center">
                    <GitBranch className="w-4 h-4 mr-2 text-racing-cyan" />
                    Frontend → Backend → AI Pipeline
                  </div>
                  <div className="flex items-center justify-center">
                    <Database className="w-4 h-4 mr-2 text-racing-green" />
                    Data Sources → Processing → Storage
                  </div>
                  <div className="flex items-center justify-center">
                    <Workflow className="w-4 h-4 mr-2 text-racing-red" />
                    Langflow → Granite → Response
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Who Benefits?</h2>
            <p className="text-xl text-graphite-400 max-w-3xl mx-auto">
              From professional race control to sim racing leagues, RaceLens XAI serves multiple audiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated hover:border-racing-cyan/50 transition-all"
              >
                <div className="w-12 h-12 bg-racing-cyan/20 rounded-lg flex items-center justify-center mb-4">
                  <useCase.icon className="w-6 h-6 text-racing-cyan" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{useCase.title}</h3>
                <p className="text-sm text-graphite-400">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 bg-background-elevated">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Core Principles</h2>
            <p className="text-xl text-graphite-400 max-w-3xl mx-auto">
              The foundation of trustworthy AI-assisted decision making.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated text-center"
              >
                <div className="w-12 h-12 bg-racing-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="w-6 h-6 text-racing-green" />
                </div>
                <h3 className="font-display font-bold mb-2">{principle.title}</h3>
                <p className="text-sm text-graphite-400">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="card-elevated bg-gradient-to-br from-racing-cyan/10 to-racing-cyan/5 border-racing-cyan/30 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-4">
              Ready to Experience Explainable Racing Intelligence?
            </h2>
            <p className="text-xl text-graphite-300 mb-8">
              Explore live demos, analyze incidents, and see how AI can make motorsport decisions more transparent.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/dashboard" className="btn-primary">
                Launch Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/incidents" className="btn-secondary">
                Analyze Incidents
              </Link>
              <Link href="/fan-mode" className="btn-secondary">
                Try Fan Mode
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Disclaimer */}
      <footer className="border-t border-graphite-800 py-8 bg-background-surface">
        <div className="container mx-auto px-6">
          <div className="text-center text-sm text-graphite-500">
            <p className="mb-2">
              This website is unofficial and is not associated in any way with the Formula 1 companies.
            </p>
            <p>
              F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks
              are trade marks of Formula One Licensing B.V.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Made with Bob
