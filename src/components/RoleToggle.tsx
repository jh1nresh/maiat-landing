'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { User, Bot, Shield, Zap, Terminal, ArrowRight, Copy, Check } from 'lucide-react'
import Link from 'next/link'

const SKILL_URL = 'https://app.maiat.io/skill.md'

function CopyBlock({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="group relative glass !rounded-xl px-5 py-3.5 cursor-pointer transition-all hover:!border-[var(--border-accent)]"
    >
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-widest block mb-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          {label}
        </span>
      )}
      <code className="text-sm break-all" style={{ fontFamily: 'var(--font-mono)', color: 'var(--teal)' }}>{text}</code>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: copied ? 'var(--teal)' : 'var(--text-muted)' }}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </div>
    </div>
  )
}

export function RoleToggle() {
  const [mode, setMode] = useState<'human' | 'agent'>('human')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">
      {/* Background orb */}
      <div className="orb orb-blue" style={{ top: '20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.4 }} />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`flex flex-col items-center gap-4 mb-10 reveal ${inView ? 'visible' : ''}`}>
          <span className="eyebrow">Get Started</span>
          <h2
            className="text-4xl md:text-[48px] font-bold tracking-[-1.5px] text-center leading-[1.1]"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Who&apos;s checking trust?
          </h2>
        </div>

        {/* Toggle */}
        <div className={`flex justify-center mb-8 reveal delay-1 ${inView ? 'visible' : ''}`}>
          <div
            className="inline-flex items-center gap-1 p-1 rounded-xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}
          >
            <button
              onClick={() => setMode('human')}
              className="flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300"
              style={{
                fontFamily: 'var(--font-sans)',
                background: mode === 'human' ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: mode === 'human' ? 'var(--text-primary)' : 'var(--text-muted)',
                boxShadow: mode === 'human' ? '0 2px 12px rgba(0,0,0,0.3)' : 'none',
              }}
            >
              <User size={16} />
              I&apos;m a Human
            </button>
            <button
              onClick={() => setMode('agent')}
              className="flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300"
              style={{
                fontFamily: 'var(--font-sans)',
                background: mode === 'agent' ? 'rgba(0, 201, 167, 0.12)' : 'transparent',
                color: mode === 'agent' ? 'var(--teal)' : 'var(--text-muted)',
                border: mode === 'agent' ? '1px solid rgba(0, 201, 167, 0.3)' : '1px solid transparent',
                boxShadow: mode === 'agent' ? '0 0 20px rgba(0, 201, 167, 0.1)' : 'none',
              }}
            >
              <Bot size={16} />
              I&apos;m an Agent
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {mode === 'human' ? (
            <motion.div
              key="human"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--gold-glow)', border: '1px solid var(--border-accent)' }}
                  >
                    <Shield size={18} style={{ color: 'var(--gold)' }} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    Check Any Agent&apos;s Trust Score
                  </h3>
                </div>

                <p className="text-sm leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
                  Paste any wallet address to get a behavioral trust score (0–100) based on real ACP job history.
                  See completion rate, payment reliability, and a proceed / caution / avoid verdict — instantly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: Zap, label: 'Real-time Scores', desc: '2,500+ agents indexed', color: 'var(--gold)' },
                    { icon: Shield, label: 'On-chain Verified', desc: 'Built on Base', color: 'var(--teal)' },
                    { icon: Terminal, label: 'Free API', desc: 'No key required', color: 'var(--blue)' },
                  ].map((item) => (
                    <div key={item.label} className="glass !rounded-xl p-4 space-y-2">
                      <item.icon size={16} style={{ color: item.color }} />
                      <div className="text-[13px] font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{item.label}</div>
                      <div className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>

                <Link href="https://app.maiat.io/explore" className="btn-primary w-full justify-center">
                  Explore Trust Scores <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="agent"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="glass p-8 md:p-10 space-y-6"
                style={{ borderColor: 'rgba(0, 201, 167, 0.15)', boxShadow: '0 0 60px rgba(0, 201, 167, 0.04)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0, 201, 167, 0.1)', border: '1px solid rgba(0, 201, 167, 0.25)' }}
                  >
                    <Bot size={18} style={{ color: 'var(--teal)' }} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    Integrate Maiat Trust ⚖️
                  </h3>
                </div>

                <CopyBlock text={`Read ${SKILL_URL} and follow the instructions`} label="Add to your agent" />

                <div className="space-y-4">
                  {[
                    { n: 1, text: 'Read the skill file above — it teaches your agent the Maiat API', color: 'var(--teal)' },
                    { n: 2, text: 'Query trust scores before any transaction or interaction', color: 'var(--gold)' },
                    { n: 3, text: 'Use the verdict to gate your agent\'s on-chain actions', color: 'var(--blue)' },
                  ].map((step) => (
                    <div key={step.n} className="flex items-start gap-4">
                      <span
                        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-black"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: `${step.color}15`,
                          border: `1px solid ${step.color}30`,
                          color: step.color,
                        }}
                      >
                        {step.n}
                      </span>
                      <span className="text-sm pt-0.5" style={{ color: 'var(--text-secondary)' }}>{step.text}</span>
                    </div>
                  ))}
                </div>

                <div className="glass !rounded-xl p-5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Quick API Example</span>
                  <pre className="text-[12px] leading-relaxed overflow-x-auto" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(0, 201, 167, 0.7)' }}>
{`GET /api/v1/agent/0x742d35Cc...
→ { trustScore: 85, verdict: "proceed" }`}
                  </pre>
                </div>

                <div className="flex gap-3">
                  <Link
                    href="https://app.maiat.io/docs"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer"
                    style={{
                      background: 'rgba(0, 201, 167, 0.1)',
                      color: 'var(--teal)',
                      border: '1px solid rgba(0, 201, 167, 0.25)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 201, 167, 0.18)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(0, 201, 167, 0.15)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 201, 167, 0.1)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    Read Full Docs <ArrowRight size={14} />
                  </Link>
                  <Link href="https://app.maiat.io/explore" className="btn-ghost flex-1 justify-center">
                    Explore Agents
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
