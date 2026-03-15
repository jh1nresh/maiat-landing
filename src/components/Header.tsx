'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const dockLinks = [
  { label: 'Explore', href: 'https://app.maiat.io' },
  { label: 'Docs', href: 'https://app.maiat.io/docs' },
  { label: 'GitHub', href: 'https://github.com/JhiNResH/maiat-protocol' },
];

// ─── macOS Dock magnification ────────────────────────────────────────────────

function DockNav() {
  const mouseX = useMotionValue(-Infinity);
  return (
    <motion.div
      className="hidden md:flex items-center gap-0.5"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(-Infinity)}
    >
      {dockLinks.map((item) => (
        <DockItem key={item.label} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  );
}

function DockItem({ item, mouseX }: { item: { label: string; href: string }; mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const scale = useTransform(distance, [-120, 0, 120], [1, 1.35, 1]);
  const springScale = useSpring(scale, { mass: 0.1, stiffness: 200, damping: 12 });

  return (
    <Link ref={ref} href={item.href} className="relative">
      <motion.div style={{ scale: springScale }} className="px-4 py-2 rounded-full">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors">
          {item.label}
        </span>
      </motion.div>
    </Link>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 z-50 w-[95%] max-w-5xl"
    >
      <div
        className="px-6 py-3 flex items-center justify-between rounded-full border"
        style={{
          background: 'rgba(10, 10, 10, 0.6)',
          backdropFilter: 'blur(60px) saturate(180%)',
          WebkitBackdropFilter: 'blur(60px) saturate(180%)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          boxShadow: 'inset 0 0 30px rgba(255,255,255,0.02), 0 30px 100px rgba(0,0,0,0.3)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Image
            src="/maiat-logo.jpg"
            alt="Maiat"
            width={28}
            height={28}
            className="w-7 h-7 rounded-full shadow-lg"
          />
          <span className="font-mono font-bold text-base tracking-widest text-white uppercase">
            MAIAT
          </span>
        </Link>

        {/* Dock Nav */}
        <DockNav />

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
            style={{
              border: '1px solid rgba(0, 201, 167, 0.3)',
              color: 'rgb(0, 201, 167)',
              background: 'rgba(0, 201, 167, 0.05)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: 'rgb(0, 201, 167)', boxShadow: '0 0 6px rgb(0, 201, 167)' }} />
            Live on Base
          </div>
          <Link
            href="https://app.maiat.io"
            className="bg-white text-black px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-all shadow-lg"
          >
            Launch App
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white/60"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {mobileOpen
              ? <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
              : <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 rounded-2xl p-4 flex flex-col gap-2" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {dockLinks.map((item) => (
            <Link key={item.label} href={item.href} className="py-3 px-4 text-sm font-bold text-white/60 hover:text-white rounded-xl hover:bg-white/5 transition-all">
              {item.label}
            </Link>
          ))}
          <Link href="https://app.maiat.io" className="mt-2 bg-white text-black text-center py-3 rounded-full text-[10px] font-bold uppercase tracking-widest">
            Launch App
          </Link>
        </div>
      )}
    </motion.header>
  )
}
