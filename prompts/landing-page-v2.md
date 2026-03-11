# Maiat Protocol — Landing Page Mega Prompt v2
# Combined techniques: Viktor's website workflow + presentation animation system
# Target: Next.js App Router single page component

Build a full landing page as a single Next.js page component (page.tsx) with 7 sections. Use React, TypeScript, Tailwind CSS, and motion (from motion/react) for animations. All in one file. The entire page has a pure black background (#050508), transitions and sections never show white or any color outside the palette.

## Global Architecture

App container: Full-width, min-h-screen, overflow-x-hidden, font-['Inter',sans-serif], bg-[#050508].

Color palette (CSS variables, define in a style tag or use inline):
- --bg-page: #050508
- --primary-gold: #d4a017
- --primary-gold-light: #e8b84a
- --primary-gold-dim: #b8860b
- --text-primary: #f1f5f9
- --text-secondary: #94a3b8
- --text-muted: #475569
- --success: #10b981
- --danger: #ef4444

All sections full-width with max-w-6xl mx-auto px-6 centered content. Spacing between sections: py-32.

Glass card: bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] rounded-2xl. Hover: border rgba(212,160,23,0.2) + translateY(-2px) over 300ms.

Typography: Use clamp() for all headings — fontSize: clamp(32px, 5vw, 56px) for section headings, clamp(48px, 8vw, 80px) for hero. Body text: clamp(14px, 1.1vw, 18px). Code: JetBrains Mono.

## Shared Animation Components (from presentation technique)

These are reusable motion components. Define them at the top of the file.

### SlideUpLine
Clip-reveal slide-up for headings. Wraps children in overflow-hidden inline-block span. Inner motion.span animates from y: "100%" to y: "0%". Duration: 0.7s. Easing: [0.25, 0.1, 0.25, 1]. Accepts delay prop. Triggers on whileInView with viewport={{ once: true }}.

### WordByWordReveal
Splits text by spaces. Each word wrapped in overflow-hidden inline-block span with mr-[0.27em]. Inner motion.span animates from y: "100%" to y: "0%" with stagger. Default stagger: 0.035s, duration: 0.55s. Same easing. Accepts baseDelay prop. Triggers on whileInView.

### BlurReveal
motion.div animates from opacity: 0, filter: "blur(8px)" to opacity: 1, filter: "blur(0px)". Duration: 0.9s. Same easing. Accepts delay prop. Triggers on whileInView.

### CountUp
Animated number. requestAnimationFrame from 0 to target over 2s, easeOut. Triggers on viewport entry. Displays in font-black font-mono text-[var(--primary-gold-light)].

### GoldLabel
text-xs uppercase tracking-[0.2em] font-mono text-[var(--primary-gold)]. Wrapped in BlurReveal.

---

## Section 1 — Hero (min-h-screen)

### Background: Canvas Particle System
HTML Canvas, absolutely positioned, full hero dimensions, z-0. Renders on every animationFrame.

Particles: 100 count. Each particle: { x, y, radius: random(1,3), opacity: random(0.15, 0.35), speedY: random(-0.1, -0.3), sineOffset: random(0, 2π), sineFreq: random(0.005, 0.015), sineAmp: random(0.3, 0.8) }.

Each frame: y += speedY (drift up), x += sin(frameCount * sineFreq + sineOffset) * sineAmp * 0.1. When particle y < -10, reset to y = canvas.height + 10 with new random x.

Mouse interaction: Track mouse position. For each particle within 120px of cursor, apply repulsion vector: direction = particle - mouse, normalized, scaled by (120 - distance) * 0.03. Particles spring back naturally via their drift.

Draw: ctx.beginPath(), ctx.arc(x, y, radius, 0, π*2), ctx.fillStyle = `rgba(212, 160, 23, ${opacity})`, ctx.fill().

Canvas resizes on window resize via ResizeObserver.

### Content (relative z-10, flex flex-col items-center justify-center min-h-screen)

Title block (text-center, mb-16):
- Flex row: items-center justify-center gap-6
  - Left: Ma'at feather SVG. 24px wide, 64px tall. Vertical line (spine) + 8 barbs each side + ellipse tip. Stroke gradient #e8b84a → #b8860b. Spine draws itself via motion strokeDashoffset over 2s. Barbs stagger in at delay 0.8 + i*0.1s each.
  - Center column:
    - h1 "Maiat Protocol": Uses SlideUpLine, delay={0.3}. fontSize: clamp(48px, 8vw, 80px), font-black, text-[var(--text-primary)], tracking-tight, leading-[0.9].
    - p "Trust infrastructure for the agent economy.": Uses WordByWordReveal, baseDelay={0.6}, stagger={0.04}. fontSize: clamp(16px, 1.5vw, 20px), text-[var(--text-secondary)].
    - p "Verify before you transact.": Uses BlurReveal, delay={1.2}. text-sm text-[var(--text-muted)].
  - Right: Trust gauge SVG. 80x80. Track circle r=34, stroke rgba(212,160,23,0.08) strokeWidth 3. Score arc: motion.circle, stroke gradient #e8b84a→#d4a017, strokeWidth 3, strokeLinecap round. Animates strokeDashoffset from full to 15% over 2s delay 0.5. Center: "85" text-xl font-black text-[var(--primary-gold-light)] fades in delay 1.5. "/100" text-[8px] font-mono text-[var(--text-muted)].

Toggle (mb-8, BlurReveal delay={0.4}):
- Container: flex items-center gap-2 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl
- "I'm a Human" (User icon) / "I'm an Agent" (Bot icon). Each: px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300.
- Active Human: bg-white/[0.1] text-white. Active Agent: bg-[rgba(212,160,23,0.15)] text-[var(--primary-gold-light)] border border-[rgba(212,160,23,0.3)]. Inactive: text-[var(--text-muted)].
- AnimatePresence mode="wait" below.

Human card (max-w-lg, glass card, p-6, space-y-5, motion initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.5 }}):
- Title: Shield icon (16px gold) + "Check Any Agent's Trust Score" text-base font-black text-white.
- Desc: "Paste any wallet address to get a behavioral trust score (0–100) based on real ACP job history. See completion rate, payment reliability, and a proceed / caution / avoid verdict." text-sm text-[var(--text-secondary)].
- 3 pills (grid grid-cols-3 gap-3): each p-3 rounded-xl bg-white/[0.03] border border-[rgba(212,160,23,0.05)]. Icon 14px gold + label text-[11px] font-bold white + desc text-[10px] text-muted. Items: Zap/"Real-time Scores"/"17,000+ agents", Shield/"On-chain Verified"/"Built on Base", Terminal/"Free API"/"No key required".
- CTA: full width py-3 bg-gradient-to-r from-[var(--primary-gold-dim)] to-[var(--primary-gold)] hover:from-[var(--primary-gold)] hover:to-[var(--primary-gold-light)] rounded-xl text-sm font-bold text-white shadow-lg shadow-[rgba(212,160,23,0.15)]. "Open Trust Monitor →". ArrowRight icon translates x+4px on hover. Links to /monitor.

Agent card (same glass card but border-[rgba(212,160,23,0.15)], motion same):
- Title: Bot icon + "Integrate Maiat Trust ⚖️"
- Copy block: bg-black/40 border border-[rgba(212,160,23,0.1)] rounded-xl px-4 py-3 font-mono text-sm text-[var(--primary-gold-light)] cursor-pointer. "Read https://app.maiat.io/skill.md and follow the instructions". Click → clipboard + Check icon 2s.
- 3 steps: numbered badges (24x24 rounded-lg bg-[rgba(212,160,23,0.15)] border border-[rgba(212,160,23,0.25)] text-[11px] font-black gold) + text-sm text-[var(--text-secondary)]. Steps: "Read the skill file to get started" / "Query the API before any transaction" / "Use the verdict to gate your agent's actions".
- API box: bg-black/30 border border-[rgba(212,160,23,0.08)] rounded-xl p-4. Label "QUICK API EXAMPLE" text-[10px] font-bold gold-dim uppercase tracking-widest. Code pre text-[11px] font-mono: GET /api/v1/agent/0x... → { trustScore: 85, verdict: "proceed" }
- Two buttons: "Read Docs" (gold gradient → /docs) + "Explore Agents" (ghost bg-white/5 border white/10 → /monitor).

## Section 2 — Social Proof Marquee

Full width (break out of max-w-6xl). border-t border-b border-white/[0.05]. py-4.

CSS-only marquee: @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }. Wrapper overflow-hidden. Inner flex gap-8, animation: marquee 30s linear infinite. Content duplicated 4x.

Items: "17,000+ Agents Scored" · "Built on Base" · "Powering Virtuals ACP" · "On-chain Trust Oracle" · "Free API — No Key Required" · "Uniswap v4 Hook Integration"

Each: text-xs uppercase tracking-[0.15em] font-mono text-[var(--text-muted)] whitespace-nowrap. Dot separator: "·" text-[var(--primary-gold)] opacity-40 mx-4.

## Section 3 — Problem (Text Left, Visual Right)

flex items-center gap-16 lg:flex-row flex-col.

Left (lg:w-3/5):
- GoldLabel "THE PROBLEM" delay={0.1}
- Heading via WordByWordReveal: "The agent economy has no trust layer." fontSize: clamp(32px, 5vw, 56px), font-black text-[var(--text-primary)] leading-[1.04] mt-4. baseDelay={0.2}, stagger={0.04}.
- Paragraph via BlurReveal delay={0.8}: "17,000 AI agents transact on Virtuals ACP daily. Any wallet can claim to be trustworthy. There's no credit score, no reputation layer, no context about whether an agent will complete a job — or vanish with your funds." fontSize: clamp(14px, 1.1vw, 18px) text-[var(--text-secondary)] leading-relaxed mt-6.

Right (lg:w-2/5):
- motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.5 }} viewport={{ once:true }}.
- Grid 3x4 of 12 mini cards (grid grid-cols-3 gap-2). Each: aspect-square rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center.
- Cards at index 2,5,8,11: border-[rgba(239,68,68,0.3)] shadow-[0_0_12px_rgba(239,68,68,0.1)].
- Cards at index 0,4,7: show "?" in text-lg text-[var(--text-muted)].
- Others: truncated hex "0x7f2..." in text-[9px] font-mono text-[var(--text-muted)].
- Cards at index 1,6,9: slight rotation via style={{ transform: `rotate(${[-2,1.5,-1][i%3]}deg)` }}.
- Behind grid: absolute -inset-8 bg-[radial-gradient(circle,rgba(239,68,68,0.06)_0%,transparent_70%)] pointer-events-none z-0.

## Section 4 — Solution (Visual Left, Text Right)

flex items-center gap-16 lg:flex-row flex-col-reverse.

Left (lg:w-2/5):
- Trust score card. Glass card, p-6, max-w-sm mx-auto. motion.div initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.8, delay:0.3 }}.
- Wallet: "0xE6ac...Af5D" text-xs font-mono text-[var(--text-muted)] mb-4.
- Score row: flex items-center gap-4. "85" in text-6xl font-black text-[var(--primary-gold-light)]. Gauge SVG 96x96 (same as hero but larger).
- Verdict: inline-flex px-3 py-1 rounded-full bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.3)] text-[var(--success)] text-xs font-bold uppercase tracking-wider mt-3. "PROCEED".
- 3 stat bars (mt-4 space-y-3): label text-xs text-[var(--text-muted)] mb-1 + bar container h-1.5 rounded-full bg-white/[0.06] + inner motion.div rounded-full h-full bg-[var(--primary-gold)]. Bars animate width from "0%" to target on whileInView over 1.2s with stagger 0.15s. "Completion Rate" → 94%, "Payment Rate" → 89%, "Job History" → 72%.
- Gold glow behind: absolute -inset-8 bg-[radial-gradient(circle,rgba(212,160,23,0.05)_0%,transparent_70%)] pointer-events-none z-0.

Right (lg:w-3/5):
- GoldLabel "THE SOLUTION" delay={0.1}
- Heading via WordByWordReveal: "One API call. Real trust score." fontSize: clamp(32px, 5vw, 56px), font-black text-[var(--text-primary)] leading-[1.04] mt-4. baseDelay={0.2}.
- Paragraph via BlurReveal delay={0.7}: "Maiat scores any EVM agent wallet (0–100) from real Virtuals ACP job history — completion rate, payment reliability, behavioral patterns. A proceed / caution / avoid verdict in under 100ms. The trust context layer the agent economy has been missing." fontSize: clamp(14px, 1.1vw, 18px) text-[var(--text-secondary)] leading-relaxed mt-6.

## Section 5 — Features (2x2 Glass Cards)

Centered header:
- GoldLabel "BUILT FOR THE AGENT ECONOMY" centered. delay={0.1}.
- Heading via SlideUpLine: "Everything you need to verify trust." centered. fontSize: clamp(32px, 5vw, 56px) font-black text-[var(--text-primary)] mt-4 mb-16. delay={0.2}.

Grid: grid grid-cols-1 sm:grid-cols-2 gap-6. Each card staggers in via motion with delay 0.1*index.

Card 1 — icon Zap, title "Real-time Trust Scores", desc "Behavioral scores (0–100) from live Virtuals ACP job data. Updated with every new transaction."
Card 2 — icon Shield, title "On-chain Oracle", desc "TrustScoreOracle deployed on Base. Smart contracts query trust scores directly on-chain. Fully verifiable."
Card 3 — icon ArrowLeftRight, title "Uniswap v4 Hook", desc "TrustGateHook blocks untrusted agents from swapping. Plug into any v4 pool as a permissions hook."
Card 4 — icon Terminal, title "Free API", desc "No API key. No rate limits. GET /api/v1/agent/{address} — live in 30 seconds."

Each card: glass card, p-8. Icon container: w-12 h-12 rounded-xl bg-[rgba(212,160,23,0.1)] flex items-center justify-center mb-4. Icon 20px text-[var(--primary-gold)]. Title: text-lg font-bold text-[var(--text-primary)] mb-2. Desc: text-sm text-[var(--text-secondary)] leading-relaxed.

## Section 6 — Integration (Text Left, Code Right)

flex items-center gap-12 lg:flex-row flex-col.

Left (lg:w-1/2):
- GoldLabel "INTEGRATE IN 30 SECONDS" delay={0.1}
- Heading via WordByWordReveal: "Three lines. That's it." fontSize: clamp(32px, 5vw, 56px) font-black text-[var(--text-primary)] leading-[1.04] mt-4. baseDelay={0.2}.
- Paragraph via BlurReveal delay={0.7}: "No SDK. No API key. Just a GET request. Works with any language, any framework, any agent runtime." fontSize: clamp(14px, 1.1vw, 18px) text-[var(--text-secondary)] leading-relaxed mt-6.
- Button row flex gap-3 mt-8:
  - "Read Full Docs →": gold gradient, rounded-xl px-6 py-3 text-sm font-bold text-white. Links /docs.
  - "View on GitHub": border border-white/[0.1] hover:bg-white/[0.05] rounded-xl px-6 py-3 text-sm font-bold text-[var(--text-secondary)]. Links https://github.com/JhiNResH/maiat-protocol.

Right (lg:w-1/2):
- Code block via BlurReveal delay={0.4}. Container: bg-[#0a0a0a] border border-white/[0.05] rounded-2xl overflow-hidden.
  - Top bar: flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]. Dots: 3x w-3 h-3 rounded-full (#ef4444, #d4a017, #10b981). Label "terminal" text-xs font-mono text-[var(--text-muted)] ml-3.
  - Code (p-5 font-mono text-sm leading-relaxed):
    - "curl" → text-[var(--primary-gold-light)]
    - " https://app.maiat.io/api/v1/agent/0xE6ac...Af5D" → text-[var(--text-secondary)]
    - "" (blank line)
    - "# Response:" → text-[var(--text-muted)] italic
    - "{" → text-[var(--text-secondary)]
    - '  "trustScore"' → text-[var(--primary-gold)], ": 85," → text-white
    - '  "verdict"' → text-[var(--primary-gold)], ': "proceed",' → text-[var(--success)]
    - '  "completionRate"' → text-[var(--primary-gold)], ": 0.94," → text-white
    - '  "totalJobs"' → text-[var(--primary-gold)], ": 47" → text-white
    - "}" → text-[var(--text-secondary)]
  - Copy button: absolute top-4 right-4, bg-white/[0.05] hover:bg-white/[0.1] rounded-lg p-2. Copy icon 14px. Copies curl line. Check icon 2s.

## Section 7 — CTA + Footer

CTA (py-32 text-center relative):
- Gold glow: absolute centered, w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,160,23,0.04)_0%,transparent_70%)] pointer-events-none.
- Heading via SlideUpLine: "Start verifying agents today." fontSize: clamp(36px, 6vw, 64px) font-black text-[var(--text-primary)]. delay={0.2}.
- Sub via BlurReveal delay={0.5}: "Free. No API key. No signup." text-lg text-[var(--text-secondary)] mt-4.
- Button (mt-8): "Check Any Agent's Trust Score →" gold gradient, rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg. Links /monitor. Arrow +4px on hover.
- Below (mt-4): "or read the docs →" text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)]. Links /docs.

Footer (border-t border-white/[0.05] py-8 max-w-6xl mx-auto):
- grid grid-cols-1 lg:grid-cols-3 gap-8.
- Left: "Maiat Protocol" text-sm font-bold text-[var(--text-primary)]. "Trust infrastructure for AI agents" text-xs text-[var(--text-muted)] mt-1.
- Center: flex gap-4 justify-center. "Monitor" "Docs" "API" "Leaderboard" — text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-secondary)].
- Right: flex gap-4 lg:justify-end justify-center. "Twitter" (→ https://twitter.com/0xmaiat) "GitHub" (→ https://github.com/JhiNResH/maiat-protocol) — same style.
- Below (mt-6 text-center): "Built on Base · Powered by Virtuals ACP" text-[10px] text-[var(--text-muted)].

## Hard Constraints

- Do NOT add a navigation bar or sidebar. Standalone scroll page.
- Do NOT use white backgrounds or gradients on any section. All bg: #050508.
- Do NOT use colors outside the palette.
- Do NOT use spring/bounce animations. All easing: [0.25, 0.1, 0.25, 1].
- Do NOT add stock photos or placeholder images.
- All icons from lucide-react only.
- Single file: everything in one page.tsx with 'use client' directive.
- Import motion from 'motion/react', AnimatePresence from 'motion/react'.
- Import icons from 'lucide-react'.
- Use next/link for internal links.
- Responsive: stack vertically below lg breakpoint.
