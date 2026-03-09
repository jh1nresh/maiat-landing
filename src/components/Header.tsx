'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        background: scrolled ? 'rgba(2, 4, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-16 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/maiat-logo.jpg"
            alt="Maiat"
            width={28}
            height={28}
            className="w-7 h-7 rounded-lg shadow-lg transition-shadow"
          />
          <span
            className="text-[15px] font-bold tracking-[4px] uppercase"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}
          >
            Maiat
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[
            { label: 'Explore', href: 'https://app.maiat.io/monitor' },
            { label: 'Docs', href: 'https://app.maiat.io/docs' },
            { label: 'GitHub', href: 'https://github.com/JhiNResH/maiat-protocol' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
            style={{
              fontFamily: 'var(--font-mono)',
              border: '1px solid rgba(0, 201, 167, 0.3)',
              color: 'var(--teal)',
              background: 'rgba(0, 201, 167, 0.05)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block pulse-dot" style={{ background: 'var(--teal)', boxShadow: '0 0 6px var(--teal)' }} />
            Live on Base
          </div>
          <Link href="https://app.maiat.io/monitor" className="btn-primary text-sm !py-2.5 !px-6">
            Launch App
          </Link>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: 'var(--text-secondary)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {mobileOpen
              ? <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
              : <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
            }
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-1" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {[
            { label: 'Explore', href: 'https://app.maiat.io/monitor' },
            { label: 'Docs', href: 'https://app.maiat.io/docs' },
            { label: 'GitHub', href: 'https://github.com/JhiNResH/maiat-protocol' },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="py-3 text-sm font-medium" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
              {item.label}
            </Link>
          ))}
          <Link href="https://app.maiat.io/monitor" className="btn-primary mt-3 justify-center">
            Launch App
          </Link>
        </div>
      )}
    </header>
  )
}
