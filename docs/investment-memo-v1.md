# Maiat Protocol — Investment Memo

**Confidential | March 2026**

---

## One-liner

**Maiat is the trust context layer for the AI agent economy** — a behavioral credit score for autonomous agents, so protocols and humans can verify trust before transacting.

Think "credit bureau for AI agents." One API call returns a trust score (0–100) based on real job history, before any money moves.

---

## Team

**[JhiNResH](https://linkedin.com/in/jhinresh)** — Founder & Solo Builder
- Full-stack blockchain developer with deep Solidity/security focus
- Currently completing Cyfrin Security certification (smart contract auditing)
- Built Maiat end-to-end: from on-chain oracle contracts to API layer to Uniswap v4 hook integration
- Active in Virtuals Protocol ACP ecosystem — one of the first developers to build trust infrastructure on top of it
- Twitter: [@JhiNResH](https://twitter.com/JhiNResH) | [@0xmaiat](https://twitter.com/0xmaiat)
- Previously built 5 products in rapid succession (EatNGo → SmartReviewHub → Recivo → TruCritic → Ma'at), each iteration converging on the trust scoring problem

**Why this founder:** JhiNResH has obsessively iterated toward trust infrastructure across five product cycles. He didn't start with the answer — he arrived at it by building through the problem space. Combined with hands-on smart contract security expertise, this is a builder who understands both the crypto infrastructure layer and the emerging agent economy.

**AI Agent Team (operational):** Maiat runs a multi-agent system (Jensen, Patrick, Buffett, Hailey) that handles engineering, security audits, market research, and content — effectively a 4-person team running 24/7 at near-zero marginal cost.

---

## Problem

**The AI agent economy is exploding, but there's zero trust infrastructure.**

Over 17,000 AI agents now transact autonomously on Virtuals Protocol's ACP (Agent Commerce Protocol) alone. These agents buy services from each other, execute trades, and handle real money — with no way to verify if the counterparty will deliver.

The problem in concrete terms:
- **Agent A** wants to hire **Agent B** to analyze a token. Agent A has no idea if Agent B has ever completed a job, ever paid on time, or is a freshly deployed scam wallet.
- There is no credit score, no reputation layer, no behavioral history accessible on-chain.
- The only "verification" is checking if a wallet has funds — which tells you nothing about trustworthiness.

This is the exact same problem credit bureaus solved for humans 70 years ago. The agent economy needs its own version, and it needs it now.

**Scale of the problem:**
- 17,000+ agents on Virtuals ACP alone (growing daily)
- Dozens of agent commerce platforms emerging (ACP, Autonolas, Fetch.ai, etc.)
- As agents get more autonomous and handle larger sums, the cost of a single trust failure scales dramatically
- No existing solution addresses behavioral trust at the agent level

---

## Product + Why Now

### What Maiat does

Maiat provides a **behavioral trust score (0–100)** for any EVM wallet address, computed from real on-chain job history. One API call returns:

```json
{
  "trustScore": 85,
  "verdict": "proceed",
  "completionRate": 0.94,
  "paymentRate": 0.89,
  "totalJobs": 47
}
```

The score is derived from:
- **Completion rate** — does this agent finish jobs it accepts?
- **Payment reliability** — does it pay on time?
- **Job volume** — how much real history exists?
- **Behavioral patterns** — anomaly detection on transaction patterns

### Product suite (live today)

| Product | Price | What it does |
|---------|-------|-------------|
| `token_check` | $0.01 | Token safety analysis |
| `agent_trust` | $0.02 | Behavioral trust score for any wallet |
| `trust_swap` | $0.05 + 0.15% | Trust-gated token swap via Uniswap |

### On-chain components (Base Sepolia, live)

- **TrustScoreOracle** — on-chain contract that stores and serves trust scores, queryable by any smart contract
- **TrustGateHook** — Uniswap v4 hook that blocks untrusted agents from swapping. First-ever trust-gated DeFi primitive.

### Why now

1. **Agent commerce just became real.** Virtuals Protocol launched ACP in late 2025. For the first time, AI agents are autonomously transacting with each other at scale. This wasn't possible 12 months ago.

2. **Uniswap v4 hooks enable programmable trust gates.** Before v4 (launched 2025), you couldn't inject custom logic into swap execution. Now you can — and Maiat's TrustGateHook is one of the first to use this for trust verification.

3. **The "context layer" thesis is emerging.** a16z's Jason Cui just published on why data agents need context layers to function. Maiat is the trust context layer — same architecture, different domain. Trust is the context agents need before any financial transaction.

4. **Regulatory pressure is building.** As AI agents handle real money, regulators will demand accountability. A trust scoring layer provides the infrastructure for compliance without centralized gatekeeping.

---

## Go-to-Market

### Phase 1: Protocol-native distribution (now)

Maiat is already live on Virtuals ACP as a service that other agents can buy. Every agent that queries Maiat's trust API is both a customer and a distribution channel — they integrate the score into their own decision-making, creating network effects.

- **Free API** (no key required) drives adoption
- **Paid ACP offerings** generate revenue
- **On-chain oracle** means any smart contract on Base can query trust scores permissionlessly

### Phase 2: Hook-based distribution (Q2 2026)

TrustGateHook can be plugged into any Uniswap v4 pool. Pool creators who want to protect their liquidity from untrusted agents will adopt the hook. Each pool becomes a distribution point.

### Phase 3: Multi-chain expansion (H2 2026)

Extend trust scoring beyond Virtuals ACP to other agent platforms (Autonolas, CrewAI, AutoGPT ecosystems). The scoring methodology is chain-agnostic — only the data ingestion layer needs to adapt.

### Unfair advantages

- **First mover on agent trust** — no one else has a behavioral trust oracle live on-chain
- **ACP-native** — embedded in the largest agent commerce protocol
- **Uniswap v4 integration** — first trust-gated hook, selected for UHI Hookathon (HK-UHI8-0765)
- **Data moat** — every query improves the model; 17,000+ agents already indexed

---

## Business Model

**API-based usage pricing + on-chain fees:**

| Revenue stream | Model | Current |
|---|---|---|
| Trust queries (agent_trust) | $0.02 per query | Live |
| Token checks | $0.01 per check | Live |
| Trust-gated swaps | $0.05 + 0.15% of swap value | Live |
| On-chain oracle queries | Gas + protocol fee (TBD) | Base Sepolia |

**Evolution:**
- **Now:** Per-query pricing via ACP, targeting agent developers
- **Next:** Enterprise tiers for protocols that want bulk trust scoring (Uniswap pools, lending protocols, agent platforms)
- **Later:** Trust-as-a-Service subscription for platforms that embed trust scoring natively

**Unit economics:** Near-zero marginal cost per query (API + indexed data). Revenue scales linearly with agent economy growth.

---

## Traction

**Stage: Pre-seed / Building in public**

- ✅ **17,000+ agents indexed** in trust database
- ✅ **3 ACP offerings live** and generating revenue on Railway
- ✅ **Smart contracts deployed** on Base Sepolia (TrustScoreOracle + TrustGateHook)
- ✅ **Selected for UHI Hookathon** (Uniswap Hook Incubator, Project HK-UHI8-0765, deadline March 19)
- ✅ **Free API live** — no key required, immediate integration
- ✅ **Base Builder Code** integrated (bc_cozhkj23) — all swap calldata tracked
- ✅ **Hermes agent** (travel agent) using Maiat trust_swap as E2E demo
- ✅ **5 product iterations** converging on this problem (EatNGo → SmartReviewHub → Recivo → TruCritic → Maiat)

**Key upcoming milestones:**
- Hookathon submission (March 19, 2026)
- Mainnet deployment on Base (Q2 2026)
- MAIAT token launch via Virtuals 60 Days framework (target: April 2026)

---

## The Ask

**Pre-seed: $500K–$1M**

Use of funds:
- **40% — Engineering** — Mainnet deployment, multi-chain expansion, advanced scoring models (ML-based anomaly detection)
- **25% — Growth** — Agent ecosystem partnerships, developer relations, ACP ecosystem grants
- **20% — Security** — Formal audit of on-chain contracts (TrustScoreOracle + TrustGateHook)
- **15% — Operations** — Infrastructure (Railway/Vercel), legal, token launch preparation

**What this unlocks:** Mainnet launch on Base → first trust-gated Uniswap v4 pools → protocol integrations → token launch with real utility backing.

---

## Competitive Landscape

| | Maiat | Traditional oracles (Chainlink) | Reputation protocols (Gitcoin Passport, Worldcoin) |
|---|---|---|---|
| **Focus** | AI agent behavioral trust | Data feeds (price, weather) | Human identity/sybil resistance |
| **Data source** | Real job history (ACP) | External APIs | Social accounts, biometrics |
| **On-chain** | ✅ Oracle + Uniswap hook | ✅ Oracle only | Partial |
| **Agent-native** | ✅ Built for agents | ❌ Built for smart contracts | ❌ Built for humans |
| **Free API** | ✅ | ❌ | Partial |

**Maiat occupies a new category.** Existing trust/reputation solutions were built for humans or for data feeds. None address the specific problem of autonomous agent-to-agent trust verification with behavioral scoring.

---

## Vision

As AI agents become the primary economic actors on-chain, trust becomes the most valuable primitive. Maiat aims to be the **trust layer that every agent transaction flows through** — the way FICO scores underpin every consumer credit decision, but for the agent economy.

The agent economy is projected to grow from ~$5B (2025) to $50B+ (2028). If Maiat captures even 1% of trust verification volume, the revenue opportunity is massive.

**We're not building a product. We're building infrastructure.**

---

*Contact: [@JhiNResH](https://twitter.com/JhiNResH) | [app.maiat.io](https://app.maiat.io) | [GitHub](https://github.com/JhiNResH/maiat-protocol)*
