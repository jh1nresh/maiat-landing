'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  ArrowRight, Zap, Shield, Globe, Anchor, Twitter, 
  Disc as Discord, Send, Activity, Cpu, Lock, Terminal,
  ExternalLink, ChevronRight, CheckCircle2, AlertCircle, XCircle,
  Search, Fingerprint, ShieldCheck, RefreshCw, User, Bot, Copy, Check,
  Sun, Moon
} from 'lucide-react';
import { DarkModeProvider, useDarkMode } from './DarkModeContext';

// --- Components ---

// ─── macOS Dock magnification navbar ─────────────────────────────────────────

const dockLinks = [
  { label: 'Explore', href: 'https://app.maiat.io' },
  { label: 'Leaderboard', href: 'https://app.maiat.io/leaderboard' },
  { label: 'Docs', href: 'https://app.maiat.io/docs' },
  { label: 'GitHub', href: 'https://github.com/JhiNResH/maiat-protocol' },
];

function DockItem({ item, mouseX }: { item: { label: string; href: string }; mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const { isDark } = useDarkMode();
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const scale = useTransform(distance, [-120, 0, 120], [1, 1.35, 1]);
  const springScale = useSpring(scale, { mass: 0.1, stiffness: 200, damping: 12 });

  return (
    <a ref={ref} href={item.href} className="relative no-underline">
      <motion.div style={{ scale: springScale }} className="px-5 py-2 rounded-full">
        <span className={`text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
          {item.label}
        </span>
      </motion.div>
    </a>
  );
}

const Navbar = () => {
  const { isDark, toggleDark } = useDarkMode();
  const mouseX = useMotionValue(-Infinity);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setNavVisible(currentY < 50 || currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: navVisible ? 0 : -100, x: '-50%', opacity: navVisible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-6 left-1/2 z-50 w-[95%] max-w-5xl rounded-full px-6 py-3 flex items-center justify-between border transition-all duration-500 ${
        isDark
          ? 'bg-white/5 border-white/[0.08] shadow-[inset_0_0_30px_rgba(255,255,255,0.02),0_30px_100px_rgba(0,0,0,0.3)]'
          : 'bg-white/70 border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
      }`}
      style={{ backdropFilter: 'blur(60px) saturate(180%)', WebkitBackdropFilter: 'blur(60px) saturate(180%)' }}
    >
      <a href="/" className="flex items-center gap-2.5 group cursor-pointer shrink-0 no-underline">
        <img src="/maiat-logo.jpg" alt="Maiat" className="w-7 h-7 rounded-full shadow-lg" />
        <span className={`font-mono font-bold text-base tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>maiat</span>
      </a>

      <motion.div
        className="hidden md:flex items-center gap-0.5"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(-Infinity)}
      >
        {dockLinks.map((item) => (
          <DockItem key={item.label} item={item} mouseX={mouseX} />
        ))}
      </motion.div>

      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30 text-emerald-600 bg-emerald-500/5">
          <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse bg-emerald-500 shadow-[0_0_6px_rgb(16,185,129)]" />
          Live on Base
        </div>
        <button
          onClick={toggleDark}
          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-90 ${
            isDark ? 'bg-white/10 border-white/10 text-yellow-400' : 'bg-black/5 border-black/5 text-gray-500'
          }`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <a href="https://app.maiat.io" className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-all shadow-lg no-underline ${
          isDark ? 'bg-white text-black' : 'bg-black text-white'
        }`}>
          Launch App
        </a>
      </div>
    </motion.nav>
  );
};

const CursorSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hoverType, setHoverType] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [pulses, setPulses] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, .group, .cursor-pointer');
      
      if (interactive) {
        if (!hoverType) {
          setIsScanning(true);
          setTimeout(() => setIsScanning(false), 400);
        }
        
        if (interactive.textContent?.includes('Verified')) setHoverType('AGENT_DATA');
        else if (interactive.tagName === 'BUTTON') setHoverType('ACTION_AUTH');
        else if (interactive.closest('.md\\:grid')) setHoverType('PROTOCOL_SECURE');
        else setHoverType('TRUST_VERIFIED');
      } else {
        setHoverType(null);
        setIsScanning(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setPulses(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setPulses(prev => prev.filter(p => p.id !== id)), 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [mouseX, mouseY, hoverType]);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  return (
    <>
      {/* Verification Pulses */}
      {pulses.map(pulse => (
        <motion.div
          key={pulse.id}
          initial={{ opacity: 0.5, scale: 0 }}
          animate={{ opacity: 0, scale: 4 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ left: pulse.x, top: pulse.y }}
          className="fixed w-20 h-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] rounded-full border-2 border-blue-500/30"
        />
      ))}

      {/* Audit Trail (Faint dots) */}
      <AuditTrail mouseX={smoothX} mouseY={smoothY} />

      {/* Main Spotlight Glow */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
        }}
        className="fixed w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998] opacity-30 mix-blend-soft-light rounded-full bg-gradient-radial from-blue-400/30 via-blue-400/5 to-transparent blur-3xl"
      />
      
      {/* Technical Scanner UI */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
        }}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        {/* Scanner Ring */}
        <motion.div
          animate={{ 
            scale: hoverType ? 1.5 : 1,
            rotate: hoverType ? 180 : 0
          }}
          className={`w-12 h-12 rounded-full border border-dashed transition-colors duration-500 ${
            hoverType ? 'border-blue-500/50' : 'border-black/10'
          }`}
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-blue-500/20" 
          />
        </motion.div>

        {/* Data Readout */}
        <div className="absolute top-0 left-full ml-4 flex flex-col gap-1 font-mono text-[8px] text-blue-500/60 uppercase tracking-tighter whitespace-nowrap">
          <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}>
            LAT: {smoothX.get().toFixed(0)}
          </motion.div>
          <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>
            LNG: {smoothY.get().toFixed(0)}
          </motion.div>
          <div className="text-blue-500/40">SIG: 0x{Math.floor(smoothX.get() * 1234).toString(16).slice(0, 4)}</div>
        </div>
      </motion.div>

      {/* Trust Status Indicator */}
      <AnimatePresence>
        {hoverType && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30, y: 30 }}
            animate={{ opacity: 1, scale: 1, x: 30, y: 30 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              left: smoothX,
              top: smoothY,
            }}
            className="fixed pointer-events-none z-[9999] flex flex-col gap-1"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-blue-500/20 shadow-2xl shadow-blue-500/10">
              {isScanning ? (
                <RefreshCw className="w-3 h-3 text-blue-500 animate-spin" />
              ) : (
                <ShieldCheck className="w-3 h-3 text-blue-500" />
              )}
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                {isScanning ? 'Scanning...' : hoverType.replace('_', ' ')}
              </span>
            </div>
            {!isScanning && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-2 py-0.5 rounded bg-blue-500 text-[8px] text-white font-bold w-fit ml-4"
              >
                SCORE: 0.998
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AuditTrail = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setTrail(prev => [{ id, x: mouseX.get(), y: mouseY.get() }, ...prev].slice(0, 10));
    }, 100);
    return () => clearInterval(interval);
  }, [mouseX, mouseY]);

  return (
    <>
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.2, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 1 }}
          style={{ left: point.x, top: point.y }}
          className="fixed w-1 h-1 bg-blue-400 rounded-full pointer-events-none z-[9998]"
        />
      ))}
    </>
  );
};

const TrustGrid = () => {
  const { isDark } = useDarkMode();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const gridColor = isDark ? 'rgba(255,255,255,0.3)' : '#000';
  const gridColorFine = isDark ? '#fff' : '#000';

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} 
      />
      
      {/* Dynamic Trust Nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <TrustNode key={i} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* Spotlight revealed grid */}
      <motion.div 
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.12), transparent 100%)`
          ),
        }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 opacity-[0.08]" 
          style={{ 
            backgroundImage: `linear-gradient(${gridColorFine} 1px, transparent 1px), linear-gradient(90deg, ${gridColorFine} 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }} 
        />
      </motion.div>
    </div>
  );
};

const TrustNode = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const [pos] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100
  });
  
  const distance = useTransform([mouseX, mouseY], ([x, y]: number[]) => {
    const dx = x - (pos.x / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1000);
    const dy = y - (pos.y / 100) * (typeof window !== 'undefined' ? window.innerHeight : 1000);
    return Math.sqrt(dx * dx + dy * dy);
  });

  const opacity = useTransform(distance, [0, 300], [0.4, 0]);
  const scale = useTransform(distance, [0, 300], [1.5, 0.5]);

  return (
    <motion.div
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        opacity,
        scale,
      }}
      className="absolute w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
    />
  );
};

const BackgroundEffect = () => {
  const { isDark } = useDarkMode();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-1000 ${
          isDark ? 'bg-blue-900/20' : 'bg-blue-100/30'
        }`}
      />
      <div
        className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] transition-colors duration-1000 ${
          isDark ? 'bg-purple-900/10' : 'bg-orange-50/40'
        }`}
      />
    </div>
  );
};

const Hero = ({ onScan }: { onScan: () => void }) => {
  const { isDark } = useDarkMode();
  const [isHovered, setIsHovered] = useState(false);
  const [mode, setMode] = useState<'human' | 'agent'>('human');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('GET /api/v1/agent/{address}');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <section className="relative pt-40 pb-24 px-6 text-center max-w-5xl mx-auto group/hero">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-8 relative z-10 ${
          isDark ? 'bg-white/10 border-white/10 text-gray-300' : 'bg-black/5 border-black/5 text-black'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Mainnet Live on Base
      </motion.div>
      
      <div 
        className="relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.95] text-balance cursor-default"
        >
          The trust layer for <br />
          <span className={`bg-linear-to-r ${isDark ? 'from-white via-gray-300 to-white' : 'from-black via-gray-700 to-black'} bg-clip-text text-transparent`}>agentic intelligence.</span>
        </motion.h1>
        
        {/* Interactive Floating Elements */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div 
                initial={{ opacity: 0, x: -50, rotate: -10 }}
                animate={{ opacity: 1, x: -140, rotate: -5 }}
                exit={{ opacity: 0, x: -50, rotate: -10 }}
                className={`absolute top-0 left-0 hidden lg:flex items-center gap-2 backdrop-blur-md p-3 rounded-2xl border shadow-2xl shadow-blue-500/10 ${
                  isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-white/20'
                }`}
              >
                <div className="bg-blue-500/10 p-1.5 rounded-lg">
                  <Fingerprint className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-left">
                  <div className="text-[8px] font-bold uppercase tracking-tighter text-blue-500/60">Identity</div>
                  <div className={`text-[10px] font-bold ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>Verified</div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50, rotate: 10 }}
                animate={{ opacity: 1, x: 140, rotate: 5 }}
                exit={{ opacity: 0, x: 50, rotate: 10 }}
                className={`absolute bottom-10 right-0 hidden lg:flex items-center gap-2 backdrop-blur-md p-3 rounded-2xl border shadow-2xl shadow-emerald-500/10 ${
                  isDark ? 'bg-white/10 border-white/10' : 'bg-white/80 border-white/20'
                }`}
              >
                <div className="bg-emerald-500/10 p-1.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-left">
                  <div className="text-[8px] font-bold uppercase tracking-tighter text-emerald-500/60">Security</div>
                  <div className={`text-[10px] font-bold ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>Proof Gen</div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed font-medium cursor-default relative z-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
      >
        Verify AI agent behavioral trust scores on Base — powered by real-time Virtuals ACP job history and cryptographic proofs.
      </motion.p>

      {/* Human/Agent Toggle */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="flex justify-center mb-10 relative z-10"
      >
        <div className={`border rounded-xl p-1 inline-flex gap-1 shadow-sm ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/6'}`}>
          <button
            onClick={() => setMode('human')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              mode === 'human' 
                ? 'bg-[#1a1a2e] text-white shadow-md' 
                : `bg-transparent ${isDark ? 'text-gray-400 hover:bg-white/5' : 'text-[#5c5c6b] hover:bg-black/3'}`
            }`}
          >
            <User size={16} />
            I&apos;m a Human
          </button>
          <button
            onClick={() => setMode('agent')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              mode === 'agent' 
                ? 'bg-[#1a1a2e] text-white shadow-md' 
                : `bg-transparent ${isDark ? 'text-gray-400 hover:bg-white/5' : 'text-[#5c5c6b] hover:bg-black/3'}`
            }`}
          >
            <Bot size={16} />
            I&apos;m an Agent
          </button>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-24 relative z-10"
      >
        <AnimatePresence mode="wait">
          {mode === 'human' ? (
            <motion.div
              key="human-cta"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`rounded-3xl p-6 sm:p-8 max-w-lg mx-auto sm:min-h-[420px] flex flex-col justify-between ${
                isDark
                  ? 'bg-white/5 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
                  : 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
              }`}
            >
              <div>
                <h3 className={`text-xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-black'}`}>
                  Verify Trust Before You Transact.
                </h3>
                <div className="relative mb-6 w-full max-w-md mx-auto">
                  <div className={`font-mono rounded-xl p-4 sm:p-5 text-[13px] sm:text-[14px] leading-relaxed text-center ${
                    isDark ? 'bg-white/5 text-gray-400' : 'bg-[#f5f5f5] text-[#5c5c6b]'
                  }`}>
                    Check any AI agent&apos;s behavioral trust score — powered by real Virtuals ACP job history on Base.
                  </div>
                </div>
                <div className={`space-y-4 font-medium text-left text-sm sm:text-base max-w-md mx-auto px-2 sm:px-6 ${isDark ? 'text-gray-400' : 'text-[#5c5c6b]'}`}>
                  <div className="flex gap-3 items-start"><span className={`font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>1.</span> <span>Enter any EVM wallet address</span></div>
                  <div className="flex gap-3 items-start"><span className={`font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>2.</span> <span>Get a trust score (0–100) and verdict</span></div>
                  <div className="flex gap-3 items-start"><span className={`font-bold ${isDark ? 'text-white' : 'text-[#1a1a2e]'}`}>3.</span> <span>Decide whether to proceed, caution, or avoid</span></div>
                </div>
              </div>
              <a 
                href="https://app.maiat.io/monitor"
                className={`mt-8 group relative px-6 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all overflow-hidden active:scale-95 shadow-xl w-full max-w-md mx-auto no-underline ${
                  isDark ? 'bg-white text-black shadow-white/10' : 'bg-black text-white shadow-black/10'
                }`}
              >
                <span className="relative z-10">Launch App</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="agent-cta"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`rounded-3xl p-6 sm:p-8 max-w-lg mx-auto sm:min-h-[420px] flex flex-col justify-between relative overflow-hidden ${
                isDark
                  ? 'bg-white/5 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
                  : 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
              }`}
            >
              <div>
                <div className="relative z-10 flex items-center justify-center gap-2 mb-6">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00D19D]/10' : 'bg-[#f0f9f6]'}`}>
                    <Bot className="w-4 h-4 text-[#00D19D]" />
                  </div>
                  <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                    Integrate Maiat Trust ⚖️
                  </h3>
                </div>
                
                <div className="relative z-10 mb-6 w-full max-w-md mx-auto">
                  <div className={`rounded-xl p-4 sm:p-5 group/copy relative ${isDark ? 'bg-white/5' : 'bg-[#f5f5f5]'}`}>
                    <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-center ${isDark ? 'text-gray-500' : 'text-[#8a8a99]'}`}>ADD TO YOUR AGENT</div>
                    <div className="font-mono text-[13px] sm:text-[14px] leading-relaxed text-center text-[#00D19D] wrap-break-word">
                      Read https://app.maiat.io/skill.md <br className="hidden sm:block" /> and follow the instructions
                    </div>
                  </div>
                </div>
                
                <div className={`relative z-10 space-y-4 mb-6 text-sm sm:text-[15px] font-medium max-w-md mx-auto px-2 ${isDark ? 'text-gray-400' : 'text-[#5c5c6b]'}`}>
                  <div className="flex gap-3 items-start">
                    <span className="text-[#00D19D] font-bold mt-0.5">1</span> 
                    <span>Read the skill file above — it teaches your agent the Maiat API</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-[#00D19D] font-bold mt-0.5">2</span> 
                    <span>Query trust scores before any transaction or interaction</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-[#00D19D] font-bold mt-0.5">3</span> 
                    <span>Use the verdict to gate your agent&apos;s on-chain actions</span>
                  </div>
                </div>

                <div className={`relative z-10 rounded-xl p-4 sm:p-5 mb-6 max-w-md mx-auto text-center ${isDark ? 'bg-white/5' : 'bg-[#f5f5f5]'}`}>
                  <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 ${isDark ? 'text-gray-500' : 'text-[#8a8a99]'}`}>QUICK API EXAMPLE</div>
                  <div className="font-mono text-[12px] sm:text-[13px] leading-relaxed">
                    <div className="text-[#00D19D] mb-1">
                      GET /api/v1/agent/0x742d35Cc...
                    </div>
                    <div className="text-[#00D19D]">
                      → {"{ trustScore: 85, verdict: \"proceed\" }"}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full">
                <a href="https://app.maiat.io/docs" className={`flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg no-underline ${
                  isDark ? 'bg-white text-black shadow-white/10 hover:bg-gray-100' : 'bg-black text-white shadow-black/10 hover:bg-gray-900'
                }`}>
                  Read Full Docs <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <div className={`flex-1 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-[#f5f5f5]'}`}>
                  <a href="https://app.maiat.io/monitor" className={`w-full h-full py-3.5 rounded-xl font-bold text-sm transition-colors block text-center no-underline ${
                    isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-[#eaeaea]'
                  }`} style={{lineHeight: '3.5rem'}}>
                    Explore Agents
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto relative z-10">
        {[
          { label: 'Agents Verified', value: '17,402', sub: '+12% this week', icon: <Cpu className="w-4 h-4" /> },
          { label: 'Total Volume', value: '$3.2M', sub: 'Last 24h', icon: <Activity className="w-4 h-4" /> },
          { label: 'Avg. Latency', value: '84ms', sub: 'Global Edge', icon: <Zap className="w-4 h-4" /> },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.6)",
              borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.8)",
              boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.3)" : "0 20px 40px rgba(0,0,0,0.05)"
            }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className={`p-8 rounded-[32px] backdrop-blur-xl border shadow-sm text-left cursor-pointer group transition-colors ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white/30 border-white/40'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isDark ? 'text-gray-500 group-hover:text-white' : 'text-gray-400 group-hover:text-black'}`}>{stat.label}</div>
              <div className="text-gray-300 group-hover:text-blue-500 transition-colors group-hover:scale-110 duration-300">{stat.icon}</div>
            </div>
            <div className="text-4xl font-display font-bold mb-2 tracking-tight">{stat.value}</div>
            <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              {stat.sub}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const TrustFeed = () => {
  const { isDark } = useDarkMode();
  const [items, setItems] = useState([
    { id: 'Agent-712', target: 'Agent-x9a', status: 'failed', score: 12, time: '2s ago' },
    { id: 'Agent-b2c', target: 'Agent-k41', status: 'caution', score: 45, time: '5s ago' },
    { id: 'Agent-e88', target: 'Agent-m12', status: 'verified', score: 91, time: '8s ago' },
  ]);
  const [isScanning, setIsScanning] = useState(false);

  const addNewItem = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newId = `Agent-${Math.random().toString(36).substring(2, 5)}`;
      const newTarget = `Agent-${Math.random().toString(36).substring(2, 5)}`;
      const statuses = ['failed', 'caution', 'verified'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const score = status === 'failed' ? Math.floor(Math.random() * 20) : status === 'caution' ? 40 + Math.floor(Math.random() * 20) : 85 + Math.floor(Math.random() * 15);
      
      setItems(prev => [{ id: newId, target: newTarget, status, score, time: 'Just now' }, ...prev.slice(0, 4)]);
      setIsScanning(false);
    }, 800);
  };

  useEffect(() => {
    const interval = setInterval(addNewItem, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-32 px-6 relative"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/10 text-[10px] font-bold text-red-600 uppercase tracking-widest mb-6">
            The Problem
          </div>
          <h2 className="font-display text-5xl font-bold mb-8 leading-tight">
            Trust is the bottleneck of <br />
            <span className="italic serif">autonomous agents.</span>
          </h2>
          <p className={`text-lg leading-relaxed mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            As AI agents begin to transact independently, the risk of unverified identity and malicious execution grows. Maiat provides a cryptographic trust score for every agent interaction.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-8 rounded-3xl backdrop-blur-xl border shadow-xl ${
                isDark ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white/40 border-white/40 shadow-black/2'
              }`}
            >
              <AlertCircle className="w-8 h-8 text-red-500 mb-5" />
              <h4 className="font-bold text-lg mb-3">Identity Spoofing</h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Agents mimicking trusted entities to drain liquidity and exploit protocols.</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-8 rounded-3xl backdrop-blur-xl border shadow-xl ${
                isDark ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white/40 border-white/40 shadow-black/2'
              }`}
            >
              <XCircle className="w-8 h-8 text-orange-500 mb-5" />
              <h4 className="font-bold text-lg mb-3">Execution Failure</h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Unreliable agents failing critical cross-chain tasks or deviating from objectives.</p>
            </motion.div>
          </div>
        </div>
        
        <div className="relative">
          <div className={`absolute inset-0 blur-3xl -z-10 ${isDark ? 'bg-linear-to-b from-transparent via-white/3 to-transparent' : 'bg-linear-to-b from-transparent via-black/5 to-transparent'}`} />
          <div className={`backdrop-blur-xl border rounded-[40px] p-8 overflow-hidden ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-black/2 border-black/5'
          }`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Activity className={`w-4 h-4 ${isScanning ? 'text-blue-500 animate-spin' : 'text-emerald-500'}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {isScanning ? 'Scanning Network...' : 'Live Trust Feed'}
                </span>
              </div>
              <button 
                onClick={addNewItem}
                disabled={isScanning}
                className={`p-2 rounded-full transition-colors disabled:opacity-50 ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
              >
                <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map((item, i) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-4 rounded-2xl border shadow-sm flex items-center justify-between group transition-all cursor-pointer ${
                      isDark
                        ? 'bg-white/5 border-white/10 hover:border-white/20'
                        : 'bg-white border-black/5 hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'verified' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                        item.status === 'caution' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 
                        'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                      }`} />
                      <div>
                        <div className="font-mono text-[10px] font-bold flex items-center gap-2">
                          {item.id} <ChevronRight className={`w-3 h-3 group-hover:translate-x-1 transition-transform ${isDark ? 'text-gray-600' : 'text-gray-300'}`} /> {item.target}
                        </div>
                        <div className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.status}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${
                        item.status === 'verified' ? 'text-emerald-600' : 
                        item.status === 'caution' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {item.score}/100
                      </div>
                      <div className={`text-[8px] font-bold uppercase ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>{item.time}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const BentoFeatures = () => {
  const { isDark } = useDarkMode();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
      className="py-32 px-6 max-w-7xl mx-auto relative group/bento"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="font-display text-5xl font-bold mb-6">Built for the <br />machine-to-machine era.</h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>A modular protocol designed for high-frequency agent interactions.</p>
        </div>
        <button className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all group ${isDark ? 'text-gray-300' : 'text-black'}`}>
          Explore Ecosystem <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-4 h-auto md:h-[600px] relative">
        <motion.div 
          whileHover={{ y: -5, scale: 1.01 }}
          className={`md:col-span-3 border rounded-[32px] p-8 flex flex-col justify-between group cursor-pointer overflow-hidden relative ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'
          }`}
        >
          <motion.div 
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.08), transparent 80%)`
              ),
            }}
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all group-hover:rotate-12 relative z-10 ${
            isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50'
          }`}>
            <Zap className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3">Lightning Fast Oracle</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sub-100ms response times globally, built for high-frequency agent interactions and real-time decision making.</p>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5, scale: 1.01 }}
          className="md:col-span-3 bg-black text-white rounded-[32px] p-8 flex flex-col justify-between overflow-hidden relative group cursor-pointer"
        >
          <motion.div 
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1), transparent 80%)`
              ),
            }}
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all">
            <Shield className="w-32 h-32" />
          </div>
          <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all relative z-10">
            <Lock className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3">On-chain Verifiability</h3>
            <p className="text-sm text-gray-400 leading-relaxed">TrustScoreOracle deployed on Base. Any smart contract can query trust scores directly on-chain. Fully verifiable.</p>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5, scale: 1.01 }}
          className={`md:col-span-2 border rounded-[32px] p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'
          }`}
        >
          <motion.div 
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.08), transparent 80%)`
              ),
            }}
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all group-hover:-rotate-12 relative z-10 ${
            isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50'
          }`}>
            <Terminal className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Open API</h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Free, keyless API. Query any agent&apos;s trust score in under 100ms.</p>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5, scale: 1.01 }}
          className={`md:col-span-4 border rounded-[32px] p-8 flex items-center gap-8 group cursor-pointer relative overflow-hidden ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-black/5'
          }`}
        >
          <motion.div 
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(0, 0, 0, 0.03), transparent 80%)`
              ),
            }}
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-sm group-hover:rotate-6 transition-transform relative z-10 ${
            isDark ? 'bg-white/10' : 'bg-white'
          }`}>
            <Anchor className="w-10 h-10" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Uniswap v4 Hook</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>TrustGateHook blocks untrusted agents from pool access. The first trust-gated DeFi primitive.</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const Partners = () => {
  const { isDark } = useDarkMode();
  return (
    <section className={`py-32 px-6 text-center border-t ${isDark ? 'border-white/10' : 'border-black/5'}`}>
      <div className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-16 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>INTEGRATED WITH</div>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-40 hover:opacity-100 transition-all">
        <motion.div whileHover={{ scale: 1.1, filter: "grayscale(0)" }} className="flex items-center gap-4 cursor-pointer">
          <img src="/icons/virtuals.png" alt="Virtuals" className="w-12 h-12 rounded-full" />
          <span className="text-2xl font-display font-bold tracking-tight">Virtuals Protocol</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1, filter: "grayscale(0)" }} className="flex items-center gap-4 cursor-pointer">
          <img src="/icons/uniswap.png" alt="Uniswap" className="w-12 h-12 rounded-full" />
          <span className="text-2xl font-display font-bold tracking-tight">Uniswap</span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1, filter: "grayscale(0)" }} className="flex items-center gap-4 cursor-pointer">
          <img src="/icons/base.png" alt="Base" className="w-12 h-12 rounded-full" />
          <span className="text-2xl font-display font-bold tracking-tight">Base</span>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { isDark } = useDarkMode();
  return (
    <footer className={`pt-32 pb-12 px-8 border-t ${isDark ? 'bg-black/20 border-white/10' : 'bg-white border-black/5'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-32">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <img src="/maiat-logo.jpg" alt="Maiat" className="w-8 h-8 rounded-lg" />
            <span className="font-display font-bold text-2xl tracking-tight">Maiat Protocol</span>
          </div>
          <p className={`mb-8 max-w-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            The decentralized trust infrastructure for the autonomous agent economy.
          </p>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full w-fit border border-blue-100">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Built on Base</span>
          </div>
        </div>
        <div>
          <h4 className={`text-xs font-bold uppercase tracking-widest mb-8 ${isDark ? 'text-white' : 'text-black'}`}>Product</h4>
          <ul className={`space-y-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <li><a href="https://app.maiat.io" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Trust Monitor</a></li>
            <li><a href="https://app.maiat.io/leaderboard" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Leaderboard</a></li>
            <li><a href="https://app.maiat.io/docs" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Documentation</a></li>
          </ul>
        </div>
        <div>
          <h4 className={`text-xs font-bold uppercase tracking-widest mb-8 ${isDark ? 'text-white' : 'text-black'}`}>Developers</h4>
          <ul className={`space-y-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <li><a href="https://github.com/JhiNResH/maiat-protocol" target="_blank" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>GitHub</a></li>
            <li><a href="https://app.maiat.io/skill.md" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Skill File</a></li>
          </ul>
        </div>
        <div>
          <h4 className={`text-xs font-bold uppercase tracking-widest mb-8 ${isDark ? 'text-white' : 'text-black'}`}>Social</h4>
          <ul className={`space-y-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <li><a href="https://twitter.com/0xmaiat" target="_blank" className={`transition-colors flex items-center gap-2 ${isDark ? 'hover:text-white' : 'hover:text-black'}`}><Twitter className="w-4 h-4" /> Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className={`max-w-7xl mx-auto pt-12 border-t flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-widest gap-6 ${
        isDark ? 'border-white/10 text-gray-600' : 'border-black/5 text-gray-400'
      }`}>
        <p>© 2026 Maiat Protocol</p>
        <div className="flex gap-8">
        </div>
      </div>
    </footer>
  );
};

// --- App Transition Overlay ---
const AppTransition = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        className="fixed inset-0 z-9999 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, backgroundColor: '#050508' }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        onAnimationComplete={onComplete}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-2 border-[#d4a017] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#d4a017] text-sm font-semibold tracking-widest uppercase">Entering Maiat</p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

function LandingPageInner() {
  const { isDark } = useDarkMode();
  const { scrollYProgress } = useScroll();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | { score: number; status: string }>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Intercept all app.maiat.io links for smooth transition
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href*="app.maiat.io"]');
      if (link && !isTransitioning) {
        e.preventDefault();
        setIsTransitioning(true);
        setTimeout(() => { window.location.href = (link as HTMLAnchorElement).href; }, 1000);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [isTransitioning]);

  const startScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({ score: 94, status: 'Highly Trusted' });
    }, 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 selection:bg-black selection:text-white relative ${isDark ? 'bg-[#0A0A0A] text-white' : 'bg-[#FDFDFB] text-black'}`}>
      <AppTransition isActive={isTransitioning} onComplete={() => {}} />
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 origin-left z-100 ${isDark ? 'bg-white' : 'bg-black'}`}
        style={{ scaleX: scrollYProgress }}
      />
      
      <BackgroundEffect />
      <TrustGrid />
      <CursorSpotlight />
      <Navbar />
      <Hero onScan={startScan} />
      <TrustFeed />
      <BentoFeatures />
      <Partners />
      <Footer />

      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-110 flex items-center justify-center backdrop-blur-md ${isDark ? 'bg-black/80' : 'bg-white/80'}`}
          >
            <div className="text-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className={`w-20 h-20 border-4 border-t-transparent rounded-full mx-auto mb-8 ${isDark ? 'border-white' : 'border-black'}`}
              />
              <h3 className="text-2xl font-display font-bold mb-2">Analyzing Agent Behavior</h3>
              <p className={`font-mono text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fetching Virtuals ACP job history...</p>
            </div>
          </motion.div>
        )}

        {scanResult && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-110 flex items-center justify-center p-6"
          >
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
              onClick={() => setScanResult(null)}
            />
            <div className={`rounded-[40px] p-12 max-w-md w-full shadow-2xl relative z-10 border ${
              isDark ? 'bg-[#0A0A0A] border-white/10' : 'bg-white border-black/5'
            }`}>
              <button 
                onClick={() => setScanResult(null)}
                className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
              >
                <XCircle className="w-6 h-6" />
              </button>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-2">Verification Complete</h3>
                <div className="text-6xl font-display font-bold text-emerald-600 mb-4">{scanResult.score}</div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-sm mb-8">
                  {scanResult.status}
                </div>
                <p className={`text-sm leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  This agent has a consistent history of successful job execution and verified identity on Base.
                </p>
                <button 
                  onClick={() => setScanResult(null)}
                  className={`w-full py-4 rounded-2xl font-bold transition-all ${
                    isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'
                  }`}
                >
                  Close Report
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  return (
    <DarkModeProvider>
      <LandingPageInner />
    </DarkModeProvider>
  );
}
