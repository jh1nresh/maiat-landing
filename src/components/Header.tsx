"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(6, 7, 16, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="relative flex items-center justify-between px-6 md:px-10 h-16 max-w-7xl mx-auto">
        {/* Logo — Left */}
        <Link
          href="/"
          className="relative z-10 flex items-center gap-2.5 group"
        >
          <Image
            src="/maiat-logo.jpg"
            alt="Maiat"
            width={28}
            height={28}
            className="w-7 h-7 rounded-lg shadow-lg shadow-[#3b82f6]/20 group-hover:shadow-[#3b82f6]/40 transition-shadow"
          />
          <span className="font-mono text-[15px] font-bold tracking-[4px] uppercase text-[#f1f5f9]">
            Maiat
          </span>
        </Link>

        {/* Desktop Nav — Absolute Center */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[
            {
              label: "Explore",
              href: "https://maiat-protocol.vercel.app/explore",
            },
            {
              label: "API Docs",
              href: "https://maiat-protocol.vercel.app/docs",
            },
            { label: "GitHub", href: "https://github.com/JhiNResH/maiat" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-white/4"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA — Right */}
        <div className="relative z-10 hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold border border-[#00c9a7]/30 text-[#00b4d8] bg-[#00c9a7]/5">
            <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#00c9a7] shadow-[0_0_6px_#00c9a7] animate-pulse" />
            Live on Base Mainnet
          </div>
          <Link
            href="https://maiat-protocol.vercel.app/explore"
            className="btn-primary text-sm"
          >
            Launch App
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "var(--text-secondary)" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {mobileOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-4 flex flex-col gap-1"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          {[
            {
              label: "Explore",
              href: "https://maiat-protocol.vercel.app/explore",
            },
            {
              label: "API Docs",
              href: "https://maiat-protocol.vercel.app/docs",
            },
            { label: "GitHub", href: "https://github.com/JhiNResH/maiat" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="py-3 text-sm font-medium"
              style={{
                color: "var(--text-secondary)",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="https://maiat-protocol.vercel.app/explore"
            className="btn-primary mt-3 justify-center"
          >
            Launch App
          </Link>
        </div>
      )}
    </header>
  );
}
