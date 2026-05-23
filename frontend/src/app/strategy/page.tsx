"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  TrendingUp,
  Cloud,
  Gauge,
  AlertCircle,
  CheckCircle2,
  XCircle,
  BarChart3,
  Zap,
} from "lucide-react";

export default function StrategyPage() {
  const [selectedScenario, setSelectedScenario] = useState<any>({
    id: "STRAT-001",
    driver: "CAR-03",
    lap: 52,
    totalLaps: 78,
    position: 3,
    tireCompound: "MEDIUM",
    tireAge: 18,
    fuelLoad: 45.2,
    weather: "Dry → Rain approaching",
    recommendation: "Pit within 2 laps for intermediates",
    confidence: 0.78,
    reasoning: "Weather radar shows rain approaching in 8-10 minutes. Current tire age (18 laps) and degradation rate suggest pitting within 2 laps provides optimal window before rain. Extending risks being caught out by weather change.",
    factors: {
      tireDegradation: 0.72,
      weatherRisk: 0.75,
      trafficImpact: 0.45,
      safetyCarProbability: 0.20,
    },
    alternatives: [
      {
        strategy: "Pit now",
        confidence: 0.65,
        reasoning: "Immediate pit ensures dry tire change but loses track position",
        pros: ["Guaranteed dry pit stop", "Fresh tires before rain"],
        cons: ["Lose 2 positions", "Tires may be too fresh for rain"],
      },
      {
        strategy: "Extend 5 laps",
        confidence: 0.42,
        reasoning: "High risk of being caught by rain on worn tires",
        pros: ["Maintain track position", "Possible safety car"],
        cons: ["Very high weather risk", "Tire degradation critical"],
      },
    ],
    expectedOutcome: {
      positionChange: 0,
      timeGain: 2.3,
      riskLevel: "medium",
    },
  });

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
            <h1 className="text-xl font-display font-bold">Strategy Explainability Workspace</h1>
            <div className="w-32" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Context */}
          <div className="space-y-6">
            {/* Current Situation */}
            <div className="card-elevated">
              <h3 className="text-xl font-display font-bold mb-4">Current Situation</h3>
              <div className="space-y-3">
                <InfoRow label="Driver" value={selectedScenario.driver} />
                <InfoRow label="Position" value={`P${selectedScenario.position}`} />
                <InfoRow label="Lap" value={`${selectedScenario.lap} / ${selectedScenario.totalLaps}`} />
                <InfoRow label="Tire" value={`${selectedScenario.tireCompound} (${selectedScenario.tireAge} laps)`} />
                <InfoRow label="Fuel" value={`${selectedScenario.fuelLoad} kg`} />
                <InfoRow label="Weather" value={selectedScenario.weather} />
              </div>
            </div>

            {/* Decision Factors */}
            <div className="card-elevated">
              <h3 className="text-xl font-display font-bold mb-4">Decision Factors</h3>
              <div className="space-y-4">
                <FactorBar
                  label="Tire Degradation"
                  value={selectedScenario.factors.tireDegradation}
                  color="racing-red"
                />
                <FactorBar
                  label="Weather Risk"
                  value={selectedScenario.factors.weatherRisk}
                  color="racing-amber"
                />
                <FactorBar
                  label="Traffic Impact"
                  value={selectedScenario.factors.trafficImpact}
                  color="racing-cyan"
                />
                <FactorBar
                  label="Safety Car Probability"
                  value={selectedScenario.factors.safetyCarProbability}
                  color="racing-green"
                />
              </div>
            </div>

            {/* Expected Outcome */}
            <div className="card-elevated">
              <h3 className="text-xl font-display font-bold mb-4">Expected Outcome</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-graphite-400">Position Change</span>
                  <span className={`font-bold ${selectedScenario.expectedOutcome.positionChange >= 0 ? 'text-racing-green' : 'text-racing-red'}`}>
                    {selectedScenario.expectedOutcome.positionChange >= 0 ? '+' : ''}{selectedScenario.expectedOutcome.positionChange}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-graphite-400">Time Gain</span>
                  <span className="font-bold text-racing-green">+{selectedScenario.expectedOutcome.timeGain}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-graphite-400">Risk Level</span>
                  <span className={`badge ${
                    selectedScenario.expectedOutcome.riskLevel === 'low' ? 'badge-green' :
                    selectedScenario.expectedOutcome.riskLevel === 'medium' ? 'badge-amber' :
                    'badge-red'
                  }`}>
                    {selectedScenario.expectedOutcome.riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Recommendation */}
            <div className="card-elevated bg-gradient-to-br from-racing-cyan/10 to-racing-cyan/5 border-racing-cyan/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-6 h-6 text-racing-cyan" />
                    <h2 className="text-2xl font-display font-bold">AI Recommendation</h2>
                  </div>
                  <div className="text-3xl font-display font-bold text-racing-cyan mb-4">
                    {selectedScenario.recommendation}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-graphite-400 mb-1">Confidence</div>
                  <div className="text-4xl font-display font-bold text-racing-cyan tabular-nums">
                    {Math.round(selectedScenario.confidence * 100)}%
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background-surface/50 rounded-lg border border-racing-cyan/20">
                <h4 className="font-display font-bold mb-2 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reasoning
                </h4>
                <p className="text-graphite-200 leading-relaxed">
                  {selectedScenario.reasoning}
                </p>
              </div>
            </div>

            {/* Alternative Strategies */}
            <div className="card-elevated">
              <h3 className="text-2xl font-display font-bold mb-6">Alternative Strategies</h3>
              <div className="space-y-4">
                {selectedScenario.alternatives.map((alt: any, idx: number) => (
                  <AlternativeCard key={idx} alternative={alt} />
                ))}
              </div>
            </div>

            {/* Why This / Why Not */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-elevated border-racing-green/30">
                <h4 className="font-display font-bold mb-4 flex items-center text-racing-green">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Why This Strategy
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-racing-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-graphite-300">Optimal timing before rain arrival</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-racing-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-graphite-300">Tire degradation reaching critical point</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-racing-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-graphite-300">Minimal position loss risk</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-racing-green mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-graphite-300">Historical data supports this window</span>
                  </li>
                </ul>
              </div>

              <div className="card-elevated border-racing-red/30">
                <h4 className="font-display font-bold mb-4 flex items-center text-racing-red">
                  <XCircle className="w-5 h-5 mr-2" />
                  Why Not Alternatives
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-racing-red mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-graphite-300">Pitting now loses track position unnecessarily</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-racing-red mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-graphite-300">Extending stint risks rain on worn tires</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-racing-red mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-graphite-300">Weather window too narrow for delay</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-racing-red mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-graphite-300">Safety car unlikely in current conditions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Telemetry Context */}
            <div className="card-elevated">
              <h3 className="text-xl font-display font-bold mb-4 flex items-center">
                <Gauge className="w-5 h-5 mr-2 text-racing-cyan" />
                Telemetry Context
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <TelemetryCard
                  label="Lap Time Trend"
                  value="+0.3s/lap"
                  status="warning"
                  icon={<TrendingUp className="w-4 h-4" />}
                />
                <TelemetryCard
                  label="Tire Temp"
                  value="95°C"
                  status="good"
                  icon={<Gauge className="w-4 h-4" />}
                />
                <TelemetryCard
                  label="Weather ETA"
                  value="8-10 min"
                  status="alert"
                  icon={<Cloud className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Historical Data */}
            <div className="card-elevated">
              <h3 className="text-xl font-display font-bold mb-4">Historical Analysis</h3>
              <div className="p-4 bg-background-elevated rounded-lg">
                <p className="text-sm text-graphite-300 mb-3">
                  In similar scenarios (rain approaching, tire age 15-20 laps, P3-P5 position):
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-racing-green mb-1">73%</div>
                    <div className="text-xs text-graphite-500">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-racing-cyan mb-1">+1.2</div>
                    <div className="text-xs text-graphite-500">Avg Position Gain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-racing-amber mb-1">12</div>
                    <div className="text-xs text-graphite-500">Similar Cases</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

function FactorBar({ label, value, color }: any) {
  const percentage = value * 100;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-graphite-400">{label}</span>
        <span className="font-mono font-bold text-sm tabular-nums">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-background-elevated rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-${color}`}
        />
      </div>
    </div>
  );
}

function AlternativeCard({ alternative }: any) {
  return (
    <div className="p-4 bg-background-elevated rounded-lg border border-graphite-700">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-display font-bold">{alternative.strategy}</h4>
        <span className="badge-amber text-xs tabular-nums">
          {Math.round(alternative.confidence * 100)}%
        </span>
      </div>
      <p className="text-sm text-graphite-400 mb-3">{alternative.reasoning}</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs text-racing-green font-semibold mb-1">PROS</div>
          <ul className="space-y-1">
            {alternative.pros.map((pro: string, idx: number) => (
              <li key={idx} className="text-xs text-graphite-400 flex items-start">
                <CheckCircle2 className="w-3 h-3 text-racing-green mr-1 mt-0.5 flex-shrink-0" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs text-racing-red font-semibold mb-1">CONS</div>
          <ul className="space-y-1">
            {alternative.cons.map((con: string, idx: number) => (
              <li key={idx} className="text-xs text-graphite-400 flex items-start">
                <XCircle className="w-3 h-3 text-racing-red mr-1 mt-0.5 flex-shrink-0" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TelemetryCard({ label, value, status, icon }: any) {
  const statusColors: any = {
    good: 'racing-green',
    warning: 'racing-amber',
    alert: 'racing-red',
  };
  
  const color = statusColors[status];
  
  return (
    <div className="p-3 bg-background-elevated rounded-lg border border-graphite-700">
      <div className={`text-${color} mb-2`}>{icon}</div>
      <div className="text-xs text-graphite-500 mb-1">{label}</div>
      <div className={`text-lg font-display font-bold text-${color}`}>{value}</div>
    </div>
  );
}

// Made with Bob
