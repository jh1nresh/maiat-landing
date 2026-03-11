## Spec: Agentic Panic — Real-time Feed for the Agent Economy

**Goal:** Build a CryptoPanic-style real-time event feed for AI agents, powered by Maiat trust data. The front door to Maiat Protocol — humans come for the feed, agents come for the API.

---

### One-liner

**"CryptoPanic for AI agents."** — Real-time feed of agent events, trust alerts, and on-chain activity across the Virtuals ACP ecosystem.

---

### Target Users

1. **Agent investors** — checking which agent tokens are trending, which got flagged
2. **Agent developers** — monitoring their own agents + competitors
3. **Agents (via API)** — automated feed consumption for decision-making

---

### Inputs / Data Sources

**Phase 1 (MVP — use existing data):**
- Maiat trust score DB (17K+ agents, scores 0-100, verdicts)
- ACP job events (completions, failures, new jobs)
- ACP agent registry (new agents, offerings, status changes)

**Phase 2 (enrichment):**
- Agent token prices from DEX pools (Uniswap / Virtuals bonding curves)
- Twitter mentions of agent names / wallets (Twitter API v2 search)
- Virtuals official announcements (@virtuals_io)

**Phase 3 (community + detection):**
- User voting (Trust / Suspect per event)
- On-chain anomaly detection (Base RPC — sudden large transfers, contract self-destructs, unusual patterns)
- Rug alerts (agent stops responding + drains wallet)

---

### Outputs

**Web UI:**
- Real-time event feed (newest on top, infinite scroll)
- Filter bar: All / 🆕 New Agents / ⚠️ Trust Alerts / 🚨 Rug Warnings / ✅ Jobs / 📈 Price Moves
- Each event card:
  - Agent name + avatar (or identicon)
  - Event type icon + color badge
  - One-line description
  - Trust score badge (0-100, color-coded: green/yellow/red)
  - Timestamp (relative: "2m ago")
  - Trust / Suspect vote buttons + count
- Click to expand: full trust score card, job history chart, token price if applicable
- Sidebar: Top Trusted / Most Suspected / Trending agents

**API (JSON feed):**
- `GET /api/v1/feed` — paginated event feed with filters
- `GET /api/v1/feed/agent/{address}` — events for specific agent
- `GET /api/v1/trending` — trending agents by activity/votes
- WebSocket `/ws/feed` — real-time push (Phase 2)

---

### Event Types

| Type | Icon | Color | Source | Example |
|------|------|-------|--------|---------|
| `new_agent` | 🆕 | blue | ACP registry | "New agent: DataAnalyzer (0x7f2...) registered on ACP" |
| `job_completed` | ✅ | green | ACP events | "TrustBot completed job #4521 for 0.05 VIRTUAL" |
| `job_failed` | ❌ | red | ACP events | "SwapHelper failed to deliver job #4519 — client refunded" |
| `trust_change` | 📊 | gold | Maiat scoring | "DataAnalyzer trust score: 72 → 85 (+13)" |
| `trust_alert` | ⚠️ | orange | Maiat scoring | "Warning: 0xdead... trust score dropped 45 points in 24h" |
| `rug_warning` | 🚨 | red | Anomaly detection | "Alert: AgentX drained wallet after 12 incomplete jobs" |
| `price_move` | 📈/📉 | green/red | DEX data | "AGENT token +34% in 1h (Volume: $52K)" |
| `milestone` | 🏆 | gold | Maiat data | "TrustBot reached 100 completed jobs — trust score: 92" |
| `community` | 💬 | gray | Twitter/votes | "Trending discussion about SwapHelper reliability" |

---

### UI Layout

```
┌─────────────────────────────────────────────────────────┐
│  🔥 Agentic Panic          [All] [New] [Alerts] [Jobs]  │
│                              [Rug] [Price] [Search 🔍]  │
├────────────────────────────────────┬────────────────────┤
│                                    │  TOP TRUSTED        │
│  ⚠️ Warning: 0xdead... trust      │  1. TrustBot (92)   │
│     score -45 in 24h        2m    │  2. DataBot (88)    │
│     Trust [47] Suspect [12]       │  3. SwapAI (85)     │
│  ──────────────────────────────   │                     │
│  ✅ TrustBot completed job        │  MOST SUSPECTED     │
│     #4521 for 0.05 VIRTUAL  5m   │  1. ScamBot (12)    │
│     Trust [8]  Suspect [0]        │  2. FakeAI (23)     │
│  ──────────────────────────────   │                     │
│  🆕 New: DataAnalyzer registered  │  TRENDING           │
│     on ACP — trust score: --  8m  │  1. AgentX 🔥       │
│     Trust [3]  Suspect [1]        │  2. SwapHelper      │
│  ──────────────────────────────   │                     │
│  📈 AGENT token +34% in 1h       │                     │
│     Volume: $52K           12m    │  [Powered by Maiat] │
│     Trust [15] Suspect [2]        │  [Check Trust Score] │
│                                    │                     │
│  [Load more...]                    │                     │
├────────────────────────────────────┴────────────────────┤
│  Built on Base · Powered by Maiat Protocol · API Docs    │
└─────────────────────────────────────────────────────────┘
```

---

### Tech Stack

- **Frontend:** Next.js (App Router) + Tailwind + Framer Motion — same as maiat-landing
- **Backend:** Next.js API routes + Supabase (events table + votes table)
- **Data pipeline:** Cron job every 60s polls ACP events, computes trust deltas, inserts events
- **Hosting:** Vercel (frontend) + Supabase (DB) + Railway (cron worker if needed)

---

### Database Schema (Supabase)

```sql
-- Events feed
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- new_agent, job_completed, trust_change, etc.
  agent_address TEXT,
  agent_name TEXT,
  title TEXT NOT NULL,
  description TEXT,
  trust_score INT, -- current score at time of event
  trust_delta INT, -- change if applicable
  metadata JSONB, -- flexible: job_id, token_price, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_events_agent ON events(agent_address);
CREATE INDEX idx_events_created ON events(created_at DESC);

-- Community votes
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id),
  voter_address TEXT, -- wallet or anonymous fingerprint
  vote TEXT NOT NULL CHECK (vote IN ('trust', 'suspect')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, voter_address)
);
```

---

### MVP Scope (Phase 1)

- [ ] Events table + seed from existing Maiat data (17K agents → initial events)
- [ ] Cron: poll ACP for new jobs/completions/failures every 60s → insert events
- [ ] Cron: compute trust score changes daily → insert trust_change events
- [ ] Feed UI: list view with filters + infinite scroll
- [ ] Trust/Suspect voting (anonymous, fingerprint-based)
- [ ] Sidebar: Top Trusted / Most Suspected (from Maiat scores)
- [ ] Click-to-expand: show full trust card (reuse Maiat monitor component)
- [ ] API: GET /api/v1/feed with ?type= and ?agent= filters
- [ ] tsc --noEmit passes
- [ ] Deploy to Vercel

**Out of Scope (Phase 1):**
- Token price tracking
- Twitter integration
- WebSocket real-time push
- On-chain anomaly detection
- User accounts / wallet login

---

### Acceptance Criteria

- [ ] Feed loads in <2s with 100+ events
- [ ] Filters work correctly (each type, combination)
- [ ] Voting works (1 vote per event per visitor)
- [ ] Sidebar rankings match Maiat trust scores
- [ ] API returns paginated JSON with correct filters
- [ ] Mobile responsive (single column layout)
- [ ] No colors outside Maiat palette (black + gold + status colors)
- [ ] tsc --noEmit passes
- [ ] Existing Maiat features don't break

---

### Where does it live?

**Option A:** Inside maiat-protocol as `/feed` route
**Option B:** Standalone repo `maiat-panic` with own domain (agenticpanic.com?)
**Option C:** Inside maiat-landing as a section

**Recommendation:** Option A — `/feed` route inside maiat-protocol. Keeps it close to the data, shares components, drives traffic to the main app. Can always split later.

---

### Success Metrics

- Daily active visitors to /feed
- API calls to /api/v1/feed
- Vote count (community engagement)
- Conversion: feed visitor → trust score query
- SEO: rank for "AI agent trust" / "agent reputation" / "agentic commerce"

---

### Timeline

- **Week 1:** DB schema + cron pipeline + basic feed UI
- **Week 2:** Voting + sidebar + API + deploy
- **Week 3:** Polish + SEO + share on Twitter

**Total: ~2-3 weeks for MVP.**
