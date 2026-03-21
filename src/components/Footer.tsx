'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="relative" style={{ background: 'linear-gradient(180deg, var(--bg-color) 0%, #f5f0e8 100%)' }}>
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Logo + Description */}
          <div className="flex flex-col gap-5 max-w-[280px]">
            <div className="flex items-center gap-3">
              <Image src="/maiat-logo.jpg" alt="Maiat" width={36} height={36} className="w-9 h-9 rounded-full" />
              <span className="text-xl font-semibold tracking-wide" style={{ color: 'var(--text-color)' }}>
                maiat
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Trust infrastructure for agent economy.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: 'https://twitter.com/0xmaiat', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.518-8.591L1.809 2.25H8.08l4.261 5.634L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/> },
                { href: 'https://github.com/JhiNResH/maiat-protocol', icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg border transition-all hover:opacity-70"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
            {/* Product */}
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[3px]" style={{ color: 'var(--text-color)' }}>
                Product
              </span>
              {[
                { label: 'Maiat Guard', href: 'https://github.com/JhiNResH/maiat-protocol/tree/master/packages/guard' },
                { label: 'Maiat ACP', href: 'https://app.maiat.io/docs' },
                { label: 'skill.md', href: 'https://app.maiat.io/docs' },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Developers */}
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[3px]" style={{ color: 'var(--text-color)' }}>
                Developers
              </span>
              {[
                { label: 'Documentation', href: 'https://app.maiat.io/docs' },
                { label: 'GitHub', href: 'https://github.com/JhiNResH/maiat-protocol' },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors hover:opacity-70"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Get Started */}
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold uppercase tracking-[3px]" style={{ color: 'var(--text-color)' }}>
                Get Started
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Register your agent and start building trust on-chain.
              </p>
              <a href="https://app.maiat.io" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#000000' }}
              >
                Register Agent
              </a>
              <a href="https://app.maiat.io/docs" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium border transition-opacity hover:opacity-70"
                style={{ color: 'var(--text-color)', borderColor: 'var(--border-color)', backgroundColor: 'white' }}
              >
                View Docs
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            © 2026 Maiat Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>MIT License</span>
            <a href="https://github.com/JhiNResH/maiat-protocol" target="_blank" rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-secondary)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
