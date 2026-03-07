'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="relative" style={{ background: 'var(--bg-surface)' }}>
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--gold-dim), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-5 max-w-[280px]">
            <div className="flex items-center gap-2.5">
              <Image src="/maiat-logo.jpg" alt="Maiat" width={28} height={28} className="w-7 h-7 rounded-lg" />
              <span className="text-[15px] font-bold tracking-[4px] uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                Maiat
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Trust infrastructure for AI agents. Built on Base.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: 'https://github.com/JhiNResH/maiat', icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/> },
                { href: 'https://twitter.com/0xmaiat', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.518-8.591L1.809 2.25H8.08l4.261 5.634L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all border"
                  style={{ color: 'var(--text-muted)', borderColor: 'var(--border-subtle)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-default)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: 'Product', links: [
                { label: 'Explore', href: 'https://app.maiat.io/explore' },
                { label: 'API Docs', href: 'https://app.maiat.io/docs' },
                { label: 'Trust Score', href: 'https://app.maiat.io/docs' },
              ]},
              { title: 'Integrate', links: [
                { label: 'MCP Server', href: '#' },
                { label: 'AgentKit', href: '#' },
                { label: 'ElizaOS', href: '#' },
              ]},
              { title: 'Community', links: [
                { label: 'GitHub', href: 'https://github.com/JhiNResH/maiat' },
                { label: 'Twitter', href: 'https://twitter.com/0xmaiat' },
              ]},
            ].map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <span className="text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {col.title}
                </span>
                {col.links.map((link) => (
                  <Link key={link.label} href={link.href} className="text-sm transition-colors hover:text-[var(--text-secondary)]" style={{ color: 'var(--text-muted)' }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            © 2026 Maiat Protocol
          </p>
          <p className="text-xs flex items-center gap-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            Built on <span style={{ color: '#0052FF', fontWeight: 600 }}>Base</span> · Powered by <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Uniswap v4</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
