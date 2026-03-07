'use client'

import { motion, useInView } from 'motion/react'
import Link from 'next/link'
import { useRef, useEffect, useState, useCallback } from 'react'
import { ArrowRight, Search, Shield, Zap } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

/* ─── Count-up Hook ─── */
function useCountUp(end: number, duration: number = 2000, decimals: number = 0) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setValue(Number((ease * end).toFixed(decimals)))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration, decimals])

  return { ref, value }
}

/* ─── Trust Gauge Component ─── */
function TrustGauge() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [score, setScore] = useState(0)
  const targetScore = 8.47
  const circumference = 2 * Math.PI * 40

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 2500
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setScore(Number((ease * targetScore).toFixed(2)))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView])

  const progress = score / 10
  const offset = circumference * (1 - progress)
  const color = score < 3 ? '#ef4444' : score < 6 ? '#f59e0b' : '#d4a017'

  return (
    <div ref={ref} className="relative w-32 h-32 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle
          cx="50" cy="50" r="40" fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? offset : circumference}
          className="gauge-ring transition-all duration-[2500ms] ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color }}>{score.toFixed(1)}</span>
        <span className="text-[9px] uppercase tracking-[0.25em] mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Trust Score</span>
      </div>
    </div>
  )
}

/* ─── Signal Bars ─── */
const SIGNALS = [
  { label: 'Wallet Age', value: 92, color: 'var(--gold)' },
  { label: 'DeFi Activity', value: 78, color: 'var(--teal)' },
  { label: 'EAS Attestations', value: 95, color: 'var(--gold)' },
  { label: 'Blacklist Check', value: 100, color: 'var(--teal)' },
  { label: 'Contract Analysis', value: 65, color: 'var(--blue)' },
  { label: 'Social Verification', value: 40, color: 'var(--text-muted)' },
]

function SignalBars() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="space-y-3 w-full max-w-sm">
      {SIGNALS.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3">
          <span className="text-[11px] w-28 text-right shrink-0" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{s.label}</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div
              className="h-full rounded-full transition-all ease-out"
              style={{
                width: inView ? `${s.value}%` : '0%',
                background: s.color,
                transitionDuration: `${1200 + i * 200}ms`,
                transitionDelay: `${300 + i * 100}ms`,
                boxShadow: `0 0 8px ${s.color}40`,
              }}
            />
          </div>
          <span className="text-[11px] w-8 tabular-nums" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{inView ? s.value : 0}%</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Steps Data ─── */
const STEPS = [
  {
    num: '01',
    title: 'Query Any Address',
    desc: 'Pass any EVM address — wallet, contract, or agent. One API call across 6 chains.',
    icon: <Search size={20} />,
    color: 'var(--gold)',
  },
  {
    num: '02',
    title: 'Score Is Computed',
    desc: 'On-chain history, EAS attestations, blacklist checks, and DeFi activity — all in under 120ms.',
    icon: <Zap size={20} />,
    color: 'var(--blue)',
  },
  {
    num: '03',
    title: 'Protect & Gate',
    desc: 'Our Uniswap v4 Hook blocks untrusted swaps. Your agent trades with confidence.',
    icon: <Shield size={20} />,
    color: 'var(--teal)',
  },
]

/* ─── Integrations Data ─── */
const INTEGRATIONS = [
  { name: 'AgentKit', desc: 'Coinbase AgentKit plugin', color: '#0052FF', tag: 'Plugin' },
  { name: 'MCP Server', desc: 'Model Context Protocol', color: '#d4a017', tag: 'Server' },
  { name: 'ElizaOS', desc: 'ai16z ElizaOS plugin', color: '#7C3AED', tag: 'Plugin' },
  { name: 'Uniswap v4', desc: 'TrustGateHook on-chain', color: '#FF007A', tag: 'Hook' },
]

/* ─── Stats Data ─── */
const STATS = [
  { end: 847, suffix: 'K+', label: 'Addresses Scored' },
  { end: 120, prefix: '<', suffix: 'ms', label: 'Avg Latency' },
  { end: 6, suffix: '', label: 'Chains Supported' },
  { end: 99.9, suffix: '%', label: 'API Uptime', decimals: 1 },
]

function StatItem({ end, suffix, prefix, label, decimals }: { end: number; suffix: string; prefix?: string; label: string; decimals?: number }) {
  const { ref, value } = useCountUp(end, 2000, decimals || 0)
  return (
    <div className="flex flex-col items-center gap-1 py-4">
      <span ref={ref} className="text-3xl font-bold tracking-tight stat-value" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
        {prefix}{value}{suffix}
      </span>
      <span className="text-xs" style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{label}</span>
    </div>
  )
}

/* ─── MAIN PAGE ─── */
export default function HomePage() {
  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1, rootMargin: '-50px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="flex flex-col min-h-screen grain" style={{ background: 'var(--bg-base)' }}>
      <Header />

      {/* ═══════ HERO ═══════ */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-16 px-6 overflow-hidden">
        {/* Orbs */}
        <div className="orb orb-gold" style={{ top: '5%', left: '45%', transform: 'translateX(-50%)' }} />
        <div className="orb orb-purple" style={{ top: '30%', right: '10%' }} />
        <div className="orb orb-blue" style={{ bottom: '15%', left: '15%' }} />

        <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest"
            style={{ border: '1px solid rgba(212,160,23,0.3)', color: 'var(--gold)', background: 'rgba(212,160,23,0.06)', fontFamily: 'var(--font-mono)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block pulse-dot" style={{ background: 'var(--gold)' }} />
            Now live on Base
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(48px,8vw,88px)] font-extrabold tracking-[-3px] leading-[0.95]"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Trust infrastructure<br />
            <span className="text-gold">for AI agents.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl max-w-[540px] leading-[1.65]"
            style={{ color: 'var(--text-secondary)' }}
          >
            Query any address. Get a trust score. Gate swaps, tool calls, and agent interactions — on-chain.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="https://maiat-protocol.vercel.app/" className="btn-primary">
              Launch App <ArrowRight size={16} />
            </Link>
            <Link href="https://maiat-protocol.vercel.app/docs" className="btn-ghost">
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-cue">
          <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Scroll</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, var(--text-muted))' }} />
        </div>
      </section>

      {/* ═══════ STATS BAR ═══════ */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-0">
          {STATS.map((s, i) => (
            <div key={s.label} style={{ borderRight: i < 3 ? '1px solid var(--border-subtle)' : undefined }}>
              <StatItem {...s} />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-16 reveal">
            <span className="eyebrow">How It Works</span>
            <h2 className="text-4xl md:text-[48px] font-bold tracking-[-1.5px] text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              From query to protection<br />in milliseconds.
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            {STEPS.map((step, i) => (
              <div key={step.num} className={`flex-1 glass p-8 reveal delay-${i + 1}`}>
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6"
                  style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}
                >
                  {step.icon}
                </div>
                <div className="text-[11px] font-bold tracking-widest mb-3" style={{ fontFamily: 'var(--font-mono)', color: step.color }}>{step.num}</div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-sm leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ INTEGRATIONS ═══════ */}
      <section className="py-28 px-6" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-16 reveal">
            <span className="eyebrow" style={{ color: 'var(--blue)' }}>Integrations</span>
            <h2 className="text-4xl md:text-[48px] font-bold tracking-[-1.5px] text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Plug into every<br />agent framework.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTEGRATIONS.map((item, i) => (
              <div key={item.name} className={`glass p-6 flex flex-col gap-4 reveal delay-${i + 1}`}>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ fontFamily: 'var(--font-mono)', color: item.color, background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
                    {item.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{item.name}</h3>
                  <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TRUST SCORE VISUAL ═══════ */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="orb orb-gold" style={{ top: '20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center gap-4 mb-16 reveal">
            <span className="eyebrow">Trust Score</span>
            <h2 className="text-4xl md:text-[48px] font-bold tracking-[-1.5px] text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Not just a number.
            </h2>
            <p className="text-base max-w-[480px] text-center leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Every score is an aggregation of on-chain signals. Transparent, explainable, and hard to game.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 reveal">
            {/* Gauge */}
            <div className="flex-1 flex flex-col items-center gap-6">
              <div className="glass p-10 w-full max-w-md flex flex-col items-center gap-8">
                <TrustGauge />
                <div className="text-center">
                  <div className="text-lg font-bold tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    VERDICT: <span style={{ color: 'var(--teal)' }}>ALLOW</span>
                  </div>
                  <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>0x742d35Cc...f2bD28</p>
                </div>
              </div>
            </div>

            {/* Signal Bars */}
            <div className="flex-1 flex flex-col items-center gap-6">
              <SignalBars />

              <div className="grid grid-cols-3 gap-4 mt-4 w-full max-w-sm">
                {[
                  { range: '9-10', label: 'Highly Trusted', color: 'var(--teal)' },
                  { range: '7-9', label: 'Trusted', color: 'var(--gold)' },
                  { range: '<7', label: 'Review', color: 'var(--red)' },
                ].map((tier) => (
                  <div key={tier.range} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: tier.color }} />
                    <div>
                      <div className="text-[11px] font-bold" style={{ fontFamily: 'var(--font-mono)', color: tier.color }}>{tier.range}</div>
                      <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{tier.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="orb orb-gold" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500 }} />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8 text-center reveal">
          <div className="flex items-center gap-2.5 px-5 py-2 rounded-full" style={{ border: '1px solid rgba(212,160,23,0.25)', background: 'rgba(212,160,23,0.04)' }}>
            <Shield size={14} style={{ color: 'var(--gold)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--gold)' }}>Free tier · No API key required</span>
          </div>

          <h2 className="text-[44px] md:text-[60px] font-extrabold tracking-[-2px] leading-[1.05]" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
            Start trusting on-chain.<br />
            <span className="shimmer-text">Today.</span>
          </h2>

          <p className="text-lg max-w-[440px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            The agent economy needs a trust layer. Be the first to deploy one that actually works.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="https://maiat-protocol.vercel.app/" className="btn-primary text-base !px-10 !py-4">
              Launch App <ArrowRight size={18} />
            </Link>
            <Link href="https://maiat-protocol.vercel.app/docs" className="btn-ghost text-base !px-10 !py-4">
              API Reference
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Powered by</span>
            {[
              { label: 'Base', color: '#0052FF' },
              { label: 'Uniswap v4', color: '#FF007A' },
              { label: 'Chainlink', color: '#375BD2' },
              { label: 'EAS', color: 'var(--teal)' },
            ].map((b) => (
              <span key={b.label} className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: b.color }}>{b.label}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
