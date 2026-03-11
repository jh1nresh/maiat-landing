# Maiat Protocol — Landing Page v3
# 2026 UI Trends: Trust-first design, oversized typography, expansive white space,
# subtle micro-interactions, light/neutral palette, editorial layout
# Reference: Lido.fi + Virtuals.io + Eigenlayer aesthetic

Build a full landing page for Maiat Protocol — a trust infrastructure protocol for the AI agent economy. Single Next.js page component. React, TypeScript, Tailwind CSS, motion (from motion/react).

---

## Design Direction

This is NOT a developer tool landing page. This is an infrastructure protocol. Think Lido, Eigenlayer, Chainlink — institutional, authoritative, premium.

**Palette — warm neutral, NOT pure black:**
- Background: #faf9f7 (warm off-white, main page)
- Background alt: #f0eeeb (slightly darker sections for rhythm)
- Surface: #ffffff (cards, elevated elements)
- Primary accent: #1a1a2e (deep navy-ink, headings)
- Secondary text: #5c5c6b (body text)
- Muted text: #9a9aab (captions, labels)
- Trust gold: #c4953a (accent highlights, trust indicators, subtle — NOT primary)
- Success: #2d8a6e (trust verified)
- Warning: #d4763c (caution)
- Danger: #c44a4a (untrusted)
- Border: rgba(0,0,0,0.06)

**Typography — editorial, NOT monospace:**
- Headings: font-family 'Inter', weight 800 (Extra Bold), tracking tight, leading tight
- Hero heading: clamp(52px, 7vw, 96px), #1a1a2e
- Section headings: clamp(36px, 5vw, 64px), #1a1a2e
- Body: 'Inter', weight 400, clamp(16px, 1.2vw, 20px), #5c5c6b, leading-relaxed (1.7)
- Labels/overlines: 'Inter', weight 600, 12px, uppercase, tracking-[0.15em], #9a9aab
- Numbers/stats: 'Inter', weight 800, large sizes, #1a1a2e
- NO monospace fonts except in the one code example section

**Spacing — extremely generous:**
- Sections: py-40 (160px vertical padding)
- Content max-width: max-w-5xl (1024px) for text, max-w-6xl for full-width elements
- Paragraph max-width: max-w-2xl (672px) — never let body text stretch full width
- Element gaps: generous (gap-8, gap-12, gap-16)

**Cards — clean elevated, NOT glass/blur:**
- bg-white rounded-2xl border border-black/[0.06] shadow-sm
- Hover: shadow-md + translateY(-2px) over 300ms
- NO backdrop-blur, NO glass effects, NO transparency tricks

**Animations — subtle, trust-building:**
- All motion whileInView, viewport={{ once: true }}
- Headings: fade up from y: 30, opacity: 0. Duration 0.8s. Easing [0.25, 0.1, 0.25, 1]
- Body text: fade in with slight blur. Delay 0.15 after heading.
- Cards: stagger fade-up, 0.1s between each
- Numbers: count-up animation on viewport entry (2s, easeOut)
- NO particle systems, NO canvas effects, NO video backgrounds

---

## Section 1 — Hero (min-h-[85vh], bg #faf9f7)

Centered layout. Extreme whitespace above and below. No background effects. 

Top: Minimal nav bar. Left: Maiat wordmark (text only, "Maiat" in font-extrabold text-xl #1a1a2e, small ⚖️ emoji or Ma'at feather icon before it). Right: "Explore Agents" / "Docs" / "API" as text links in #5c5c6b, 14px, weight 500. One CTA button "Open App →" with bg-[#1a1a2e] text-white rounded-lg px-5 py-2.5 text-sm font-semibold.

Hero content (centered, text-center, mt-32):
- Overline label: "TRUST INFRASTRUCTURE" in 12px uppercase tracking-widest #9a9aab font-semibold. Fade in.
- Headline: "The trust layer for the agent economy." in clamp(52px, 7vw, 96px) font-extrabold #1a1a2e tracking-tight leading-[1.04]. Fade up from y:30, duration 0.8s.
- Subheadline: "Maiat Protocol provides behavioral trust scores for AI agents — so protocols, humans, and other agents can verify trust before any transaction." in clamp(16px, 1.3vw, 22px) #5c5c6b leading-relaxed max-w-2xl mx-auto mt-6. Fade in delay 0.2.
- Two buttons centered, mt-10, gap-4:
  - "Check Agent Trust →" bg-[#1a1a2e] text-white rounded-xl px-7 py-3.5 font-semibold text-base shadow-sm hover:shadow-md. Arrow moves +3px on hover.
  - "Read Documentation" bg-transparent border border-black/[0.1] text-[#1a1a2e] rounded-xl px-7 py-3.5 font-semibold text-base hover:bg-black/[0.03].

Below buttons (mt-20): Three stat counters in a row (flex justify-center gap-16):
- "17,000+" with label "Agents Scored" — number uses CountUp animation, font-extrabold text-4xl #1a1a2e. Label text-sm #9a9aab.
- "$3M+" / "Agent Economy Revenue"
- "<100ms" / "Query Response"

Thin divider line: mt-20, w-16 h-px bg-black/[0.08] mx-auto.

---

## Section 2 — Problem (bg #faf9f7, py-40)

Two columns: left text (55%), right visual (45%). flex items-center gap-16. Stack on mobile.

Left:
- Overline: "THE PROBLEM"
- Heading: "An economy without trust doesn't scale." clamp(36px, 5vw, 64px) font-extrabold #1a1a2e leading-[1.08] mt-3.
- Paragraph: "Over 17,000 AI agents transact autonomously every day. They buy services, execute trades, and handle real funds — with no way to verify if a counterparty will deliver. There's no credit score. No reputation layer. No trust context." max-w-lg mt-6 #5c5c6b.
- Small callout card below (mt-8, max-w-md): bg-[#f0eeeb] rounded-xl p-5 border border-black/[0.04]. Italic text: "The agent economy just surpassed $3M in revenue. Trust infrastructure can't be an afterthought." — attribution "Virtuals Protocol, March 2026" in text-xs #9a9aab mt-2.

Right:
- A clean illustration of distrust: 6 small agent cards (2x3 grid, gap-3) on a subtle surface. Each card: rounded-xl bg-white border border-black/[0.06] p-4 w-28 h-20. Contains: truncated wallet "0x7f2..." in text-xs #9a9aab and a "?" trust badge (rounded-full bg-[#f0eeeb] text-[#9a9aab] w-8 h-8, centered). Two cards have a subtle orange border (warning color) and show "⚠️" instead of "?". Whole grid slightly rotated -1deg for organic feel. Fade in on scroll.

---

## Section 3 — Solution (bg #f0eeeb, py-40)

Centered layout, text-center.

- Overline: "THE SOLUTION"
- Heading: "One query. Real trust." clamp(36px, 5vw, 64px) font-extrabold #1a1a2e mt-3.
- Paragraph: "Maiat scores any EVM wallet (0–100) based on real job history — completion rate, payment reliability, behavioral patterns. You get a clear verdict before any funds move." max-w-2xl mx-auto mt-6 #5c5c6b.

Below (mt-16): A single large trust score card, centered, max-w-md.
- Card: bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8.
  - Top row: wallet address "0xE6ac...Af5D" text-xs #9a9aab + small "Verified" badge (bg-[#2d8a6e]/10 text-[#2d8a6e] text-xs px-2 py-0.5 rounded-full font-semibold)
  - Center: Large "85" text-7xl font-extrabold #1a1a2e + "/100" text-xl #9a9aab. Below: "Trust Score" text-sm #9a9aab.
  - Verdict: "PROCEED" badge. bg-[#2d8a6e]/10 text-[#2d8a6e] px-4 py-1.5 rounded-full text-sm font-bold mt-4.
  - Three progress bars (mt-6 space-y-3):
    - "Completion Rate" → 94% bar in #2d8a6e
    - "Payment Reliability" → 89% bar in #c4953a
    - "Job History" → 72% bar in #5c5c6b
    - Each: label text-xs #9a9aab + percentage text-xs #1a1a2e right-aligned + h-2 rounded-full bg-black/[0.04] with inner fill bar animating on scroll.
  - Subtle gold left-border accent: border-l-4 border-[#c4953a] on the card.

---

## Section 4 — How It Works (bg #faf9f7, py-40)

Centered heading:
- Overline: "HOW IT WORKS"
- Heading: "Trust, verified in three steps." mt-3.

Three steps in a horizontal row (flex gap-8, stack on mobile). Each step:
- Step number: "01" / "02" / "03" in text-6xl font-extrabold #f0eeeb (very light, decorative background number)
- Title: "Query" / "Score" / "Verify" in text-xl font-bold #1a1a2e mt-2
- Description in text-sm #5c5c6b mt-2, max-w-xs

Step 1: "Query" — "Send any EVM wallet address to Maiat's API. No key required, no signup, free to use."
Step 2: "Score" — "Maiat computes a behavioral trust score (0–100) from real ACP job history — completions, payments, patterns."
Step 3: "Verify" — "Receive a proceed / caution / avoid verdict. Use it in your agent's logic, your smart contract, or your protocol."

Between steps: thin connecting line (w-12 h-px bg-black/[0.08]) visible on desktop only.

Stagger animation: each step fades up with 0.15s delay.

---

## Section 5 — Features (bg #f0eeeb, py-40)

Centered heading:
- Overline: "CAPABILITIES"
- Heading: "Built for protocols, agents, and humans."

4 feature cards in 2x2 grid (gap-6). Stack single column on mobile.

Card 1 — "Real-time Scoring": "Behavioral trust scores computed from live Virtuals ACP job data. Updated with every new transaction."
Card 2 — "On-chain Oracle": "TrustScoreOracle deployed on Base. Any smart contract can query trust scores directly on-chain."
Card 3 — "Uniswap v4 Hook": "TrustGateHook blocks untrusted agents from pool access. The first trust-gated DeFi primitive."
Card 4 — "Open API": "Free, keyless API. Query any agent's trust score in under 100ms. Build trust into your stack today."

Each card: bg-white rounded-2xl border border-black/[0.06] shadow-sm p-7.
- Small icon area: 40x40 rounded-lg bg-[#f0eeeb] flex items-center justify-center mb-4. Icon in #1a1a2e, 18px (Zap, Shield, ArrowLeftRight, Globe from lucide-react).
- Title: text-base font-bold #1a1a2e mb-2.
- Description: text-sm #5c5c6b leading-relaxed.
- NO gold colors on cards. Keep them neutral and clean.

---

## Section 6 — Integration (bg #faf9f7, py-40)

Two columns: left text (50%), right code example (50%).

Left:
- Overline: "FOR DEVELOPERS"
- Heading: "Three lines to trust." clamp(36px, 5vw, 64px) font-extrabold #1a1a2e mt-3.
- Paragraph: "No SDK. No API key. One GET request. Works with any language, any agent runtime." mt-6 #5c5c6b max-w-md.
- Two buttons (mt-8):
  - "Read Docs →" bg-[#1a1a2e] text-white rounded-xl px-6 py-3 font-semibold
  - "View on GitHub" border border-black/[0.1] rounded-xl px-6 py-3 font-semibold #5c5c6b

Right:
- Code card: bg-[#1a1a2e] rounded-2xl p-6 overflow-hidden. THIS is the one place where we use monospace.
  - Top: "terminal" label in text-xs #9a9aab font-mono, 3 dots (muted colors).
  - Code in font-mono text-sm leading-relaxed:
    - "curl" in #c4953a
    - URL in #9a9aab
    - Response JSON with keys in #c4953a, values in #faf9f7, "proceed" in #2d8a6e
  - Copy button top-right corner.
- This is the ONLY dark-background element on the entire page. It creates contrast because everything else is light.

---

## Section 7 — Social Proof (bg #f0eeeb, py-24)

Centered. Clean horizontal list of logos/badges:
- "Built on" + Base logo
- "Powering" + Virtuals Protocol wordmark
- "Competing in" + Uniswap Hookathon badge
- Each in grayscale, opacity-50, hover:opacity-100 transition.

Below (mt-8): One-line stat bar centered: "17,000+ agents scored · $3M+ agent economy · <100ms response time" in text-sm #9a9aab font-medium.

---

## Section 8 — CTA (bg #faf9f7, py-40, text-center)

- Heading: "Start verifying trust today." clamp(36px, 5vw, 64px) font-extrabold #1a1a2e.
- Paragraph: "Free. No API key. No signup." text-lg #5c5c6b mt-4.
- Button (mt-8): "Open Trust Monitor →" bg-[#1a1a2e] text-white rounded-xl px-8 py-4 text-base font-bold shadow-sm hover:shadow-md.
- Below (mt-4): "or read the docs →" text-sm #9a9aab hover:#5c5c6b.

---

## Footer (border-t border-black/[0.06] py-10)

Three columns:
- Left: "Maiat Protocol" font-bold #1a1a2e + "Trust infrastructure for AI agents" text-xs #9a9aab
- Center: "Monitor" "Docs" "API" "Leaderboard" — text-xs #9a9aab hover:#5c5c6b
- Right: "Twitter" "GitHub" — text-xs #9a9aab
- Below: "© 2026 Maiat Protocol · Built on Base" text-[11px] #9a9aab

---

## Hard Constraints

- Light backgrounds ONLY. No dark sections except the single code block in Section 6.
- No glass/blur effects. No particle systems. No canvas animations. No video backgrounds.
- No monospace except the one code block.
- Max body text width: max-w-2xl. Never stretch copy across full width.
- Generous whitespace everywhere. When in doubt, add more space.
- Cards are white with subtle border and shadow. No colored backgrounds on cards.
- Gold (#c4953a) is accent only — trust indicators, subtle highlights. Never dominant.
- Headings are #1a1a2e (deep navy-ink). Not black, not gray.
- Icons from lucide-react only, 18-20px, #1a1a2e or #9a9aab.
- Responsive: stack vertically below lg breakpoint.
- Import motion from 'motion/react'.
- Single file: page.tsx with 'use client'.
