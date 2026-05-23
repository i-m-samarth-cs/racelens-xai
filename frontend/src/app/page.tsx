"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  Zap,
  Shield,
  Brain,
  TrendingUp,
  FileText,
  Users,
  ChevronRight,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Problem Statement */}
      <ProblemSection />

      {/* IBM Stack Section */}
      <IBMStackSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Demo Scenarios */}
      <DemoScenariosSection />

      {/* Architecture Preview */}
      <ArchitectureSection />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}

function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-graphite-700/50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-racing-red rounded-lg flex items-center justify-center">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-white">
              RaceLens <span className="text-racing-cyan">XAI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-graphite-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#demos" className="text-graphite-300 hover:text-white transition-colors">
              Demos
            </Link>
            <Link href="#architecture" className="text-graphite-300 hover:text-white transition-colors">
              Architecture
            </Link>
            <Link href="/about" className="text-graphite-300 hover:text-white transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="btn-primary">
              Launch Demo
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* F1 Racing GIF Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.carthrottle.com/uploads/articles/giphy4-5548baca709af.gif?width=1600"
          alt="F1 Racing"
          className="w-full h-full object-cover opacity-30"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/70 to-background-dark/90" />
      </div>

      {/* Background */}
      <div className="absolute inset-0 carbon-fiber opacity-30 z-0" />
      <div className="absolute inset-0 grid-overlay opacity-20 z-0" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-racing-red/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-racing-cyan/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-racing-red/20 border border-racing-red/30 rounded-full mb-8">
            <div className="w-2 h-2 bg-racing-red rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-racing-red">Powered by IBM Granite, Docling & Langflow</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
            When every millisecond
            <br />
            <span className="text-gradient-red">matters</span>, trust the
            <br />
            <span className="text-gradient-cyan">reason</span> behind the decision
          </h1>

          <p className="text-xl md:text-2xl text-graphite-300 mb-12 max-w-3xl mx-auto">
            Explainable motorsport intelligence for race control, engineers, analysts, and fans.
            <br />
            AI-powered decisions grounded in regulations, backed by evidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="btn-primary text-lg px-8 py-4">
              Enter Race Control
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
            <Link href="#architecture" className="btn-secondary text-lg px-8 py-4">
              See Architecture
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            <StatCard number="<100ms" label="Response Time" />
            <StatCard number="95%" label="Confidence Score" />
            <StatCard number="5" label="Demo Scenarios" />
            <StatCard number="100%" label="Explainable" />
          </div>
        </motion.div>
      </div>

      {/* Racing Thumbnail Preview */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 hidden lg:block"
      >
        <div className="relative group cursor-pointer">
          <div className="w-64 h-36 rounded-xl overflow-hidden border-2 border-racing-red/50 shadow-2xl">
            <img
              src="https://64.media.tumblr.com/tumblr_md4guz7ygK1qlt7lao1_500.gifv"
              alt="F1 Racing Action"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">🏎️ LIVE RACING</span>
                <div className="w-2 h-2 bg-racing-red rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-racing-red to-racing-cyan rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />
        </div>
      </motion.div>

    </section>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-display font-bold text-racing-cyan mb-2 tabular-nums">
        {number}
      </div>
      <div className="text-sm text-graphite-400">{label}</div>
    </motion.div>
  );
}

function ProblemSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            The Problem with <span className="text-racing-red">Black Box</span> Decisions
          </h2>
          <p className="text-xl text-graphite-300">
            In motorsport, split-second decisions determine race outcomes. But current tools provide data without transparent reasoning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProblemCard
            icon={<AlertTriangle className="w-8 h-8" />}
            title="Race Engineers"
            description="Should we pit now or extend? Current tools show data but don't explain the reasoning."
            delay={0}
            inView={inView}
          />
          <ProblemCard
            icon={<Shield className="w-8 h-8" />}
            title="Stewards"
            description="Was that incident worthy of a penalty? Decisions need regulation-grounded explanations."
            delay={0.1}
            inView={inView}
          />
          <ProblemCard
            icon={<FileText className="w-8 h-8" />}
            title="Broadcasters"
            description="How do we explain complex technical decisions to millions of fans instantly?"
            delay={0.2}
            inView={inView}
          />
          <ProblemCard
            icon={<Users className="w-8 h-8" />}
            title="Fans"
            description="Why did race control make that call? Fans deserve transparent explanations."
            delay={0.3}
            inView={inView}
          />
        </div>
      </div>
    </section>
  );
}

function ProblemCard({
  icon,
  title,
  description,
  delay,
  inView,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="card-elevated group hover:border-racing-red/50"
    >
      <div className="text-racing-red mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
      <p className="text-graphite-400">{description}</p>
    </motion.div>
  );
}

function IBMStackSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-32 relative bg-background-surface">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Built on <span className="text-racing-cyan">IBM's</span> AI Stack
          </h2>
          <p className="text-xl text-graphite-300">
            Leveraging enterprise-grade AI tools for explainable, trustworthy motorsport intelligence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <IBMStackCard
            title="IBM Granite"
            description="Core reasoning and explanation LLM for incident classification, strategy recommendations, and rule-grounded decisions"
            features={[
              "Incident classification",
              "Strategy reasoning",
              "Fan-mode translation",
              "Alternative analysis",
            ]}
            delay={0}
            inView={inView}
          />
          <IBMStackCard
            title="Docling"
            description="Document parsing and chunk extraction for FIA regulations and steward decisions"
            features={[
              "PDF parsing",
              "Structured extraction",
              "Chunk creation",
              "Metadata extraction",
            ]}
            delay={0.1}
            inView={inView}
          />
          <IBMStackCard
            title="Langflow"
            description="AI workflow orchestration for end-to-end retrieval and reasoning pipelines"
            features={[
              "Visual workflows",
              "RAG orchestration",
              "Multi-step flows",
              "Evidence retrieval",
            ]}
            delay={0.2}
            inView={inView}
          />
        </div>
      </div>
    </section>
  );
}

function IBMStackCard({
  title,
  description,
  features,
  delay,
  inView,
}: {
  title: string;
  description: string;
  features: string[];
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="card-elevated"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-racing-cyan/20 rounded-lg flex items-center justify-center">
          <Brain className="w-6 h-6 text-racing-cyan" />
        </div>
        <h3 className="text-2xl font-display font-bold">{title}</h3>
      </div>
      <p className="text-graphite-400 mb-6">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2 text-sm text-graphite-300">
            <CheckCircle2 className="w-4 h-4 text-racing-green flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function FeaturesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Live Incident Risk Detection",
      description: "Real-time monitoring with proactive alerts based on telemetry patterns",
      color: "racing-red",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Explainable Strategy",
      description: "Context-aware recommendations with confidence scores and reasoning",
      color: "racing-cyan",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Rule-Grounded Decisions",
      description: "Regulation clause matching with precedent-based explanations",
      color: "racing-amber",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Fan-Friendly Mode",
      description: "Technical-to-simple translation for broadcast and social media",
      color: "racing-green",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Document Intelligence",
      description: "Searchable FIA regulations and steward decisions corpus",
      color: "racing-cyan",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Trust Layer",
      description: "Evidence traces, confidence metrics, and 'why not' alternatives",
      color: "racing-red",
    },
  ];

  return (
    <section id="features" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Features Built for <span className="text-racing-cyan">Explainability</span>
          </h2>
          <p className="text-xl text-graphite-300">
            Every decision backed by evidence, every recommendation explained with confidence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  delay,
  inView,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="card group hover:border-racing-cyan/50"
    >
      <div className={`text-${color} mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
      <p className="text-graphite-400">{description}</p>
    </motion.div>
  );
}

function DemoScenariosSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const videoScenarios = [
    {
      title: "Max Verstappen - Monaco GP 2023",
      gifUrl: "https://cdn.carthrottle.com/uploads/articles/giphy4-5548baca709af.gif?width=1600",
      description: "Onboard camera - Qualifying lap incident detection",
      regulation: "Article 37.5",
      outcome: "Grid penalty + fine",
      confidence: 92,
      detections: ["Slow car ahead", "Speed differential", "Impeding detected"],
    },
    {
      title: "Lewis Hamilton - Silverstone 2023",
      gifUrl: "https://tse2.mm.bing.net/th/id/OIP.xCozQbicqvjue7f48GeVBwHaEK?rs=1&pid=ImgDetMain",
      description: "Pit lane camera - Unsafe release detection",
      regulation: "Article 34.14",
      outcome: "Time penalty",
      confidence: 88,
      detections: ["Car released", "Traffic approaching", "Unsafe release"],
    },
    {
      title: "Charles Leclerc - Monza 2023",
      gifUrl: "https://tse2.mm.bing.net/th/id/OIP.MErjI1JF66lgB4ZmNsNmcgHaEK?rs=1&pid=ImgDetMain",
      description: "Turn 1 camera - Contact analysis",
      regulation: "Article 38.1",
      outcome: "5-second penalty",
      confidence: 76,
      detections: ["Contact detected", "Racing incident", "Penalty assessed"],
    },
    {
      title: "Sergio Perez - Red Bull Ring 2023",
      gifUrl: "https://tse4.mm.bing.net/th/id/OIP.Ep2pLcB2nl1wJDpsOjMtzwHaEK?rs=1&pid=ImgDetMain",
      description: "Track limits camera - Multiple violations",
      regulation: "Article 33.3",
      outcome: "Position swap",
      confidence: 94,
      detections: ["Off track", "Advantage gained", "3 violations"],
    },
    {
      title: "Fernando Alonso - Spa 2023",
      gifUrl: "https://64.media.tumblr.com/tumblr_md4guz7ygK1qlt7lao1_500.gifv",
      description: "Weather radar + onboard telemetry",
      regulation: "Strategy Analysis",
      outcome: "Pit within 2 laps",
      confidence: 78,
      detections: ["Rain approaching", "Tire degradation", "Pit window"],
    },
  ];

  return (
    <section id="demos" ref={ref} className="py-32 relative bg-background-surface">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-racing-red/20 border border-racing-red/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-racing-red rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-racing-red">LIVE VIDEO ANALYSIS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Watch AI <span className="text-racing-red">Analyze</span> Real F1 Footage
          </h2>
          <p className="text-xl text-graphite-300">
            See incident detection, regulation matching, and decision-making in action
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {videoScenarios.map((scenario, index) => (
            <VideoScenarioCard key={index} {...scenario} delay={index * 0.1} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/dashboard" className="btn-primary text-lg px-8 py-4">
            Launch Live Analysis Dashboard
            <ChevronRight className="inline-block ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function VideoScenarioCard({
  title,
  gifUrl,
  description,
  regulation,
  outcome,
  confidence,
  detections,
  delay,
  inView,
}: {
  title: string;
  gifUrl: string;
  description: string;
  regulation: string;
  outcome: string;
  confidence: number;
  detections: string[];
  delay: number;
  inView: boolean;
}) {
  const [showDetections, setShowDetections] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="card-elevated group hover:border-racing-cyan/50 overflow-hidden"
    >
      {/* GIF Player */}
      <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-graphite-900">
        <img
          src={gifUrl}
          alt={title}
          className="w-full h-full object-cover"
          onMouseEnter={() => setShowDetections(true)}
          onMouseLeave={() => setShowDetections(false)}
        />
        
        {/* AI Detection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none">
          {showDetections && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-2 left-2 right-2"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-racing-red rounded-full animate-pulse" />
                <span className="text-xs font-bold text-white">AI ANALYZING...</span>
              </div>
              <div className="space-y-1">
                {detections.map((detection, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.3 }}
                    className="text-xs bg-racing-cyan/20 border border-racing-cyan/50 rounded px-2 py-1 text-racing-cyan font-mono"
                  >
                    ✓ {detection}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Always show LIVE indicator */}
          <div className="absolute top-2 right-2">
            <div className="flex items-center space-x-1 bg-racing-red/90 px-2 py-1 rounded">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-xs font-bold text-white">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-display font-bold group-hover:text-racing-cyan transition-colors">
          {title}
        </h3>
        <div className="badge-cyan tabular-nums text-xs">{confidence}%</div>
      </div>
      
      <p className="text-sm text-graphite-400 mb-4">{description}</p>
      
      <div className="space-y-2 text-xs border-t border-graphite-800 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-graphite-500">Regulation:</span>
          <span className="text-racing-amber font-mono">{regulation}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-graphite-500">AI Decision:</span>
          <span className="text-racing-green">{outcome}</span>
        </div>
      </div>
    </motion.div>
  );
}

function ArchitectureSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="architecture" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            RAG-Powered <span className="text-racing-cyan">Architecture</span>
          </h2>
          <p className="text-xl text-graphite-300">
            Retrieval-Augmented Generation for regulation-grounded, explainable decisions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-elevated max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-5 gap-4 text-center">
            <ArchStep number="1" label="Event Input" icon={<Zap />} />
            <ArchStep number="2" label="Normalize" icon={<FileText />} />
            <ArchStep number="3" label="Retrieve" icon={<Brain />} />
            <ArchStep number="4" label="Reason" icon={<Shield />} />
            <ArchStep number="5" label="Explain" icon={<CheckCircle2 />} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/about" className="btn-secondary text-lg px-8 py-4">
            View Full Architecture
            <ChevronRight className="inline-block ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ArchStep({
  number,
  label,
  icon,
}: {
  number: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-racing-cyan/20 rounded-full flex items-center justify-center mb-3 text-racing-cyan">
        {icon}
      </div>
      <div className="text-sm font-mono text-graphite-500 mb-1">Step {number}</div>
      <div className="font-display font-semibold">{label}</div>
    </div>
  );
}

function CTASection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-32 relative bg-background-surface">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Ready to see <span className="text-racing-red">explainable</span> AI in action?
          </h2>
          <p className="text-xl text-graphite-300 mb-12">
            Launch the demo dashboard and explore incident analysis, strategy reasoning, and fan-mode explanations
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="btn-primary text-lg px-8 py-4">
              Enter Race Control
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </Link>
            <Link href="/about" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// Made with Bob
