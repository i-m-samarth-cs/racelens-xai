"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Users,
  MessageCircle,
  ThumbsUp,
  Share2,
  Volume2,
  Eye,
  Sparkles,
} from "lucide-react";

export default function FanModePage() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Play crowd cheering sound when page loads
  useEffect(() => {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/crowd-cheer-1.mp3');
    audio.loop = true; // Loop the crowd sound
    audio.volume = 0.3; // Set volume to 30%
    
    // Try to play automatically
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked, will play on user interaction
          console.log('Autoplay blocked - will play on interaction');
        });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const playCheeringSound = () => {
    setIsPlaying(true);
    const audio = new Audio('https://www.soundjay.com/misc/sounds/crowd-cheer-1.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {
      console.log('Audio play failed');
    });
    audio.onended = () => setIsPlaying(false);
  };

  const [selectedIncident, setSelectedIncident] = useState<any>({
    id: "DEMO-001",
    title: "Qualifying Impeding",
    fanSummary: "The slower car didn't get out of the way when the faster car was coming up behind on a flying lap. That's against the rules and usually gets a penalty.",
    whatHappened: "Driver in Car 14 was going slow and blocked Driver in Car 1 who was on a fast lap trying to set a good qualifying time.",
    whyItMatters: "In qualifying, every tenth of a second counts. When someone blocks you, it can ruin your lap and cost you grid positions for the race.",
    whatRuleSays: "The rules say you can't unnecessarily block or slow down another driver. It's called 'impeding' and it's not allowed.",
    whatUsuallyHappens: "Usually the driver who blocked gets a grid penalty - they have to start a few places further back in the race. Sometimes they also get a fine.",
    thisCase: "Car 14 will probably get a 3-place grid penalty and might have to pay a €10,000 fine.",
    confidence: 92,
    relatable: "It's like if you're trying to run your fastest time in a race, and someone steps in front of you right before the finish line!",
  });

  const fanExplanations = [
    {
      id: "DEMO-001",
      title: "Qualifying Impeding",
      emoji: "🚗💨",
      summary: "Slow car blocked fast car on hot lap",
      confidence: 92,
    },
    {
      id: "DEMO-002",
      title: "Unsafe Pit Release",
      emoji: "⚠️🏁",
      summary: "Team let car out when another was too close",
      confidence: 88,
    },
    {
      id: "DEMO-003",
      title: "Lap 1 Collision",
      emoji: "💥🏎️",
      summary: "Two cars touched at first corner",
      confidence: 76,
    },
    {
      id: "DEMO-004",
      title: "Track Limits",
      emoji: "🛣️❌",
      summary: "Driver went off track too many times",
      confidence: 94,
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Stadium Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.xCozQbicqvjue7f48GeVBwHaEK?rs=1&pid=ImgDetMain"
          alt="F1 Stadium"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark/80 to-background-dark/95" />
      </div>

      {/* Navigation */}
      <nav className="border-b border-graphite-800 bg-background-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2 text-graphite-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <motion.h1
              className="text-2xl font-display font-bold flex items-center uppercase tracking-wider"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0, 255, 255, 0.5)",
                  "0 0 30px rgba(0, 255, 255, 0.8)",
                  "0 0 20px rgba(0, 255, 255, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-8 h-8 mr-3 text-racing-cyan" />
              🏟️ FAN ZONE
            </motion.h1>
            <div className="w-20" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Stadium Atmosphere Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              y: [-5, 5, -5],
              rotate: [-2, 2, -2]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🏁🏎️🏆
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold mb-4 uppercase tracking-wide"
            style={{
              background: "linear-gradient(90deg, #ff0000, #00ffff, #ff0000)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            LIVE FROM THE TRACK
          </motion.h1>
        </motion.div>

        {/* Incident Cards - Stadium Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {fanExplanations.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative"
            >
              <div className="card-elevated bg-gradient-to-br from-racing-red/20 to-racing-cyan/20 border-2 border-racing-cyan/50 cursor-pointer group overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-racing-red/20 to-racing-cyan/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative z-10 p-6 text-center">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {incident.emoji}
                  </motion.div>
                  <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-wide">
                    {incident.title}
                  </h3>
                  <p className="text-sm text-graphite-300 mb-4">{incident.summary}</p>
                  <motion.div
                    className="inline-block px-4 py-2 bg-racing-cyan/30 rounded-full font-mono font-bold text-racing-cyan"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {incident.confidence}%
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Crowd Atmosphere */}
        <motion.div
          className="text-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-6xl mb-6">
            👥👥👥👥👥👥👥👥
          </div>
          <motion.p
            className="text-3xl font-display font-bold uppercase tracking-widest text-racing-cyan mb-8"
            animate={{
              opacity: [0.6, 1, 0.6],
              y: [-5, 5, -5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉 FANS CHEERING 🎉
          </motion.p>
        </motion.div>

        {/* Quick Actions - Stadium Style */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={playCheeringSound}
            className="card-elevated bg-gradient-to-br from-racing-red/30 to-racing-red/10 border-2 border-racing-red p-8 text-center cursor-pointer"
          >
            <motion.div
              animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
            >
              <Volume2 className="w-12 h-12 mx-auto mb-4 text-racing-red" />
            </motion.div>
            <h3 className="text-xl font-display font-bold uppercase">
              {isPlaying ? '🎉 CHEERING!' : '🔊 LISTEN'}
            </h3>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="card-elevated bg-gradient-to-br from-racing-cyan/30 to-racing-cyan/10 border-2 border-racing-cyan p-8 text-center"
          >
            <Share2 className="w-12 h-12 mx-auto mb-4 text-racing-cyan" />
            <h3 className="text-xl font-display font-bold uppercase">📱 SHARE</h3>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="card-elevated bg-gradient-to-br from-racing-green/30 to-racing-green/10 border-2 border-racing-green p-8 text-center"
          >
            <ThumbsUp className="w-12 h-12 mx-auto mb-4 text-racing-green" />
            <h3 className="text-xl font-display font-bold uppercase">👍 REACT</h3>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
