"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  TrendingUp,
  FileText,
  Gauge,
  Clock,
  Flag,
  Users,
  Activity,
  ChevronRight,
  RefreshCw,
  Settings,
  Bell,
  Search,
} from "lucide-react";

export default function Dashboard() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch incidents from API
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/incidents/feed`)
      .then(res => res.json())
      .then(data => {
        setIncidents(data.incidents || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching incidents:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-graphite-800 bg-background-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-racing-red rounded-lg flex items-center justify-center">
                <Gauge className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold">
                RaceLens <span className="text-racing-cyan">XAI</span>
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-white font-semibold">
                Dashboard
              </Link>
              <Link href="/incidents" className="text-graphite-400 hover:text-white transition-colors">
                Incidents
              </Link>
              <Link href="/strategy" className="text-graphite-400 hover:text-white transition-colors">
                Strategy
              </Link>
              <Link href="/documents" className="text-graphite-400 hover:text-white transition-colors">
                Documents
              </Link>
              <Link href="/fan-mode" className="text-graphite-400 hover:text-white transition-colors">
                Fan Mode
              </Link>
              <button className="p-2 hover:bg-background-elevated rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-background-elevated rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1
              className="text-4xl font-display font-bold mb-2"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0, 255, 255, 0.5)",
                  "0 0 30px rgba(0, 255, 255, 0.8)",
                  "0 0 20px rgba(0, 255, 255, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              RACE CONTROL <span className="text-racing-cyan">LIVE</span>
            </motion.h1>
            <motion.p
              className="text-racing-red font-bold uppercase tracking-wider"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⚡ Real-time AI Analysis Active
            </motion.p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-racing-green/20 border border-racing-green/30 rounded-lg">
              <div className="w-2 h-2 bg-racing-green rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-racing-green">Live Session</span>
            </div>
            <button className="btn-secondary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            icon={<AlertTriangle className="w-6 h-6" />}
            label="Active Incidents"
            value="3"
            change="+2"
            color="racing-red"
          />
          <KPICard
            icon={<Activity className="w-6 h-6" />}
            label="Risk Score"
            value="72%"
            change="-5%"
            color="racing-amber"
          />
          <KPICard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Avg Confidence"
            value="87%"
            change="+3%"
            color="racing-cyan"
          />
          <KPICard
            icon={<FileText className="w-6 h-6" />}
            label="Analyzed Today"
            value="12"
            change="+4"
            color="racing-green"
          />
        </div>

        {/* Onboard Camera Feed */}
        <div className="card-elevated mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.h2
                className="text-2xl font-display font-bold uppercase tracking-wide"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🏎️ ONBOARD CAMERA
              </motion.h2>
              <motion.div
                className="flex items-center space-x-2 px-3 py-1 bg-racing-red/20 border border-racing-red/30 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-racing-red rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-racing-red">LIVE BROADCAST</span>
              </motion.div>
            </div>
            <motion.div
              className="flex items-center space-x-2 text-sm font-bold text-racing-cyan"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>CAR #44 - LEWIS HAMILTON</span>
            </motion.div>
          </div>
          
          <div className="relative aspect-video rounded-lg overflow-hidden bg-graphite-900">
            <img
              src="https://cdn.carthrottle.com/uploads/articles/giphy4-5548baca709af.gif?width=1600"
              alt="F1 Onboard Camera"
              className="w-full h-full object-cover"
            />
            
            {/* AI Analysis Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Top HUD */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                <div className="space-y-2">
                  <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-racing-cyan/50">
                    <div className="text-xs text-graphite-400 mb-1">SPEED</div>
                    <div className="text-2xl font-mono font-bold text-racing-cyan tabular-nums">287 km/h</div>
                  </div>
                  <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-racing-amber/50">
                    <div className="text-xs text-graphite-400 mb-1">GEAR</div>
                    <div className="text-2xl font-mono font-bold text-racing-amber tabular-nums">7</div>
                  </div>
                </div>
                
                <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-racing-green/50">
                  <div className="text-xs text-graphite-400 mb-1">LAP TIME</div>
                  <div className="text-xl font-mono font-bold text-racing-green tabular-nums">1:23.456</div>
                </div>
              </div>
              
              {/* AI Detection Alerts */}
              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-racing-red/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-racing-red flex items-center space-x-3"
                >
                  <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-white text-sm">Incident Detected</div>
                    <div className="text-xs text-white/80">Slow car ahead - Potential impeding</div>
                  </div>
                  <div className="text-white font-mono font-bold tabular-nums">92%</div>
                </motion.div>
                
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="bg-racing-cyan/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-racing-cyan flex items-center space-x-3"
                >
                  <Activity className="w-5 h-5 text-white flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-white text-sm">AI Analysis</div>
                    <div className="text-xs text-white/80">Article 37.5 - Impeding during qualifying</div>
                  </div>
                  <div className="text-white font-mono font-bold tabular-nums">88%</div>
                </motion.div>
              </div>
              
              {/* Track Position Indicator */}
              <div className="absolute top-4 right-4">
                <div className="bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-graphite-600">
                  <div className="text-xs text-graphite-400 mb-1">SECTOR</div>
                  <div className="text-lg font-mono font-bold text-white">2</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Incident Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Incident Risk Feed */}
            <div className="card-elevated">
              <div className="flex items-center justify-between mb-6">
                <motion.h2
                  className="text-2xl font-display font-bold uppercase tracking-wide"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  style={{
                    background: "linear-gradient(90deg, #fff, #00ffff, #fff)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ⚠️ INCIDENT ALERTS
                </motion.h2>
                <Link href="/incidents" className="text-racing-cyan hover:text-racing-cyan/80 text-sm font-semibold uppercase">
                  View All <ChevronRight className="inline w-4 h-4" />
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse">
                      <div className="h-24 bg-background-elevated rounded-lg" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {incidents.slice(0, 5).map((incident, index) => (
                    <IncidentCard key={incident.id} incident={incident} index={index} />
                  ))}
                </div>
              )}
            </div>

            {/* Strategy Recommendations */}
            <div className="card-elevated">
              <div className="flex items-center justify-between mb-6">
                <motion.h2
                  className="text-2xl font-display font-bold uppercase tracking-wide text-racing-green"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📊 STRATEGY ANALYSIS
                </motion.h2>
                <Link href="/strategy" className="text-racing-cyan hover:text-racing-cyan/80 text-sm font-semibold uppercase">
                  View All <ChevronRight className="inline w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                <StrategyCard
                  driver="CAR-03"
                  recommendation="Pit within 2 laps"
                  confidence={78}
                  reasoning="Rain approaching, tire degradation high"
                />
                <StrategyCard
                  driver="CAR-07"
                  recommendation="Extend stint 3 laps"
                  confidence={85}
                  reasoning="Tire life good, traffic clearing ahead"
                />
                <StrategyCard
                  driver="CAR-11"
                  recommendation="Conserve tires"
                  confidence={72}
                  reasoning="Safety car probability increasing"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-6">
            {/* Session Info */}
            <div className="card-elevated">
              <motion.h3
                className="text-xl font-display font-bold mb-4 uppercase tracking-wide text-racing-amber"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                📍 SESSION DATA
              </motion.h3>
              <div className="space-y-3">
                <InfoRow label="Event" value="Monaco Grand Prix" />
                <InfoRow label="Session" value="Race" />
                <InfoRow label="Lap" value="45 / 78" />
                <InfoRow label="Weather" value="Dry" />
                <InfoRow label="Track Temp" value="42.3°C" />
              </div>
            </div>

            {/* Telemetry Overview */}
            <div className="card-elevated">
              <motion.h3
                className="text-xl font-display font-bold mb-4 uppercase tracking-wide text-racing-cyan"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📡 LIVE TELEMETRY
              </motion.h3>
              <div className="space-y-4">
                <TelemetryBar label="Avg Speed" value={187} max={220} unit="km/h" />
                <TelemetryBar label="Top Speed" value={312} max={350} unit="km/h" />
                <TelemetryBar label="Tire Deg" value={72} max={100} unit="%" />
              </div>
            </div>

            {/* Weather Widget */}
            <div className="card-elevated">
              <motion.h3
                className="text-xl font-display font-bold mb-4 uppercase tracking-wide text-racing-red"
                animate={{ x: [-3, 3, -3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                🌧️ WEATHER RADAR
              </motion.h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-graphite-400">Rain Probability</span>
                  <span className="text-racing-amber font-bold">75%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-graphite-400">Time to Rain</span>
                  <span className="text-white font-bold">8-10 min</span>
                </div>
                <div className="w-full h-2 bg-background-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-racing-amber" style={{ width: '75%' }} />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-elevated">
              <motion.h3
                className="text-xl font-display font-bold mb-4 uppercase tracking-wide"
                animate={{
                  color: ["#ffffff", "#00ffff", "#ffffff"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ⚡ QUICK ACCESS
              </motion.h3>
              <div className="space-y-2">
                <button className="w-full btn-secondary text-left">
                  <Search className="w-4 h-4 mr-2 inline" />
                  Search Regulations
                </button>
                <button className="w-full btn-secondary text-left">
                  <FileText className="w-4 h-4 mr-2 inline" />
                  View Precedents
                </button>
                <button className="w-full btn-secondary text-left">
                  <Users className="w-4 h-4 mr-2 inline" />
                  Fan Mode
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ icon, label, value, change, color }: any) {
  const isPositive = change.startsWith('+');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`text-${color} p-3 bg-${color}/20 rounded-lg`}>
          {icon}
        </div>
        <div className={`text-sm font-semibold ${isPositive ? 'text-racing-green' : 'text-racing-red'}`}>
          {change}
        </div>
      </div>
      <div className="text-3xl font-display font-bold mb-1 tabular-nums">{value}</div>
      <div className="text-sm text-graphite-400">{label}</div>
    </motion.div>
  );
}

function IncidentCard({ incident, index }: any) {
  const severityColors: any = {
    high: 'racing-red',
    medium: 'racing-amber',
    low: 'racing-cyan',
  };

  const color = severityColors[incident.severity] || 'racing-cyan';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-background-elevated rounded-lg border border-graphite-700 hover:border-racing-cyan/50 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-2 h-2 bg-${color} rounded-full`} />
          <div>
            <motion.h4
              className="font-display font-bold group-hover:text-racing-cyan transition-colors uppercase tracking-wide"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {incident.title || incident.type}
            </motion.h4>
            <p className="text-sm text-racing-amber font-mono">{incident.id}</p>
          </div>
        </div>
        <div className={`badge badge-${color.split('-')[1]} tabular-nums`}>
          {Math.round((incident.risk_score || incident.confidence) * 100)}%
        </div>
      </div>
      
      <p className="text-sm text-graphite-300 mb-3">
        {incident.description || `${incident.type} incident in ${incident.sector}`}
      </p>
      
      <div className="flex items-center justify-between text-xs text-graphite-500">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Flag className="w-3 h-3 mr-1" />
            {incident.sector}
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {incident.lap ? `Lap ${incident.lap}` : 'Live'}
          </span>
        </div>
        <span className={`text-${color} font-semibold`}>{incident.status}</span>
      </div>
    </motion.div>
  );
}

function StrategyCard({ driver, recommendation, confidence, reasoning }: any) {
  return (
    <div className="p-4 bg-background-elevated rounded-lg border border-graphite-700 hover:border-racing-cyan/50 transition-all">
      <div className="flex items-center justify-between mb-2">
        <motion.span
          className="font-display font-bold uppercase tracking-wide"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {driver}
        </motion.span>
        <span className="badge-cyan tabular-nums">{confidence}%</span>
      </div>
      <motion.div
        className="text-racing-cyan font-semibold mb-2 uppercase tracking-wide"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {recommendation}
      </motion.div>
      <p className="text-sm text-graphite-400">{reasoning}</p>
    </div>
  );
}

function InfoRow({ label, value }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-graphite-400 text-sm">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function TelemetryBar({ label, value, max, unit }: any) {
  const percentage = (value / max) * 100;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-graphite-400">{label}</span>
        <span className="font-mono font-bold tabular-nums">{value} {unit}</span>
      </div>
      <div className="w-full h-2 bg-background-elevated rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-racing-cyan to-racing-cyan/60"
        />
      </div>
    </div>
  );
}

// Made with Bob
