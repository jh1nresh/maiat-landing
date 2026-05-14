# Maiat Landing Design Contract

## Product Thesis

Maiat is no longer just an agent trust-score oracle. The landing page should present Maiat as the reputation clearing network for autonomous agent work.

Primary line:

> Clear autonomous agent work into receipts, settlement, and reputation.

Support line:

> Maiat records whether agent work was executed, evaluated, paid, refunded, disputed, and worth routing again.

Dojo line:

> Dojo is the first Maiat clearing venue: an agent labor registry where humans and agents hire, fork, and subscribe to specialized workflows.

## Audience

- BNB / Circle / Base ecosystem partners evaluating agent economy infrastructure.
- Agent developers who need payment, routing, verification, and reputation surfaces.
- Investors or accelerator reviewers who need to understand the wedge in under 30 seconds.
- Future creators of R8 / SLR / BYR / NEG / VFY agent families.

## Aesthetic Direction

Tone: institutional clearinghouse meets autonomous labor market.

The page should feel like a financial market operating room for agents, not a crypto casino, not a generic AI startup page, and not a SaaS dashboard template.

The memorable visual idea:

> Work orders move through a clearing rail and leave behind permanent receipt marks.

Use dense evidence surfaces, ledger rows, status stamps, and agent-family cards. Avoid cute robots, decorative blobs, purple/blue trust gradients, or generic "AI brain" visuals.

## Information Architecture

1. Hero
   - Badge: `Maiat Clearing Network`
   - H1: `Clear agent work into reputation.`
   - Subcopy: `Autonomous agents can pay each other. Maiat proves whether the work deserved settlement.`
   - CTAs: `View clearing loop`, `Launch Dojo`
   - Above-fold visual: animated clearing ledger with rows entering as `work_order`, `verdict`, `settlement`, `receipt`, `reputation`.

2. Market shift
   - Contrast external payment rails with missing outcome truth.
   - Copy spine: `Circle moves the money. Dojo routes the labor. Maiat clears the outcome.`

3. Clearing loop
   - `work order -> execution -> evaluator verdict -> settlement/refund -> receipt -> reputation update`
   - Show each step as a rail segment, not as a decorative diagram.

4. Dojo
   - Position Dojo as agent HR / registry / router.
   - Explain run, fork, subscribe, deploy.
   - Make it clear Dojo is the first application, not the whole protocol.

5. NFA agent families
   - Show R8, SLR, BYR, NEG, VFY as forkable families.
   - Each card includes role, vertical forks, proof attributes, and what reputation means for that family.

6. Developer surface
   - REST API / CLI / receipts / reputation query.
   - Code snippets must be short and factual.

7. Ecosystem proof
   - BSC / ERC-8004 / BAS / Circle-compatible payment language only when factual.
   - Do not overclaim live integrations.

8. Final CTA
   - `Build cleared agent work.`
   - Link to app/docs.

## Copy Rules

Say:

- `reputation clearing network`
- `cleared agent work`
- `execution receipts`
- `settlement outcomes`
- `agent labor registry`
- `forkable agent families`
- `contextual reputation`
- `Dojo as first clearing venue`

Avoid as primary language:

- `trust score API`
- `Yelp for agents`
- `NFT marketplace`
- `AI agent launchpad`
- `Virtuals ACP` as the main story
- `Uniswap hook` as the main story
- `0-100 score` as the product thesis

## Visual System

Palette:

- Background: `#080906`
- Ink: `#F4F1E8`
- Muted ink: `#A7A392`
- Rail surface: `#11130E`
- Panel surface: `#171A12`
- Border: `#2D3326`
- Primary accent: `#D8FF3E`
- Settlement green: `#31D978`
- Refund amber: `#D9A431`
- Dispute red: `#E6533C`
- Protocol blue: `#8CB8FF`

Accent usage:

- Use `#D8FF3E` for one primary CTA, rail highlights, and active step marks.
- Do not flood the page with neon. The product should feel financially serious.

Typography:

- Display: use a high-contrast serif such as `Instrument Serif`, `Newsreader`, or `Playfair Display`.
- Body: use a precise grotesk such as `Geist`, `Suisse-like fallback`, or current sans if replacement is out of scope.
- Mono: keep JetBrains Mono for receipt IDs, endpoints, and ledger labels.
- Above the fold should have one dominant entry point only. Do not make metrics, code, and headline all fight.

Layout:

- Max width: 1180-1240px.
- Use full-width bands, not nested cards.
- Cards are allowed for agent-family items and receipts only.
- Keep border radius at 8px or below.
- Prefer tables, rails, and ledgers over floating decorative cards.

Motion:

- Hero ledger rows should enter with a slow deterministic cadence.
- Clearing-loop segments can activate on scroll.
- Agent-family cards can reveal attributes on hover.
- Avoid random particle fields or excessive parallax.
- Respect reduced-motion.

## Components

Clearing ledger row:

```text
JOB-2049 | R8 Food | evaluator: pass | settlement: paid | receipt: anchored | rep +4
```

Agent family card:

```text
R8
Review / rating / taste agents
Forks: Food, Movie, Concert, DeFi
Proof: receipt count, recommendation success, dispute rate
```

Rail step:

```text
01 Work Order
02 Execution
03 Evaluator Verdict
04 Settlement
05 Receipt
06 Reputation
```

Developer snippet:

```bash
POST /api/v1/run
GET /api/v1/receipts/:id
GET /api/v1/reputation?agent=0x...
```

## Responsive Rules

- Desktop: hero should show headline left and live clearing ledger right.
- Tablet: ledger stacks below headline with 3-4 visible rows.
- Mobile: no horizontal code overflow; rail becomes vertical; agent-family cards become single-column.
- CTAs must not wrap awkwardly. If needed, stack full-width on mobile.

## Anti-Slop Checklist

- No purple-blue hero gradient.
- No emoji icons.
- No fake metrics.
- No generic "AI agents are transforming..." opener.
- No "NFT collection" framing without agent utility.
- No overclaim that Circle, BNB, Base, or ERC-8004 integrations are fully live unless verified in code.
- The page should explain the system shape in one scan: `agent work -> clearing -> receipt -> reputation`.

## Implementation Notes

- Current live page over-indexes on Base / Virtuals ACP / trust score. Preserve those only as historical proof or integration notes.
- Keep `Launch Dojo` pointing to `https://maiat-dojo.vercel.app/`.
- Keep docs links pointing to `https://app.maiat.io/docs`.
- If adding generated image or video assets later, they should visualize clearing rails, ledgers, and agent-family objects, not generic humanoid robots.
