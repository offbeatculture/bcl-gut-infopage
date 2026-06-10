# Master Build Prompt — "Demonstration-Style" Animated Sales Page

This is a **reusable prompt**. Next time you want a page like the Breath Chakra
Liberation site, paste everything inside the `=== PROMPT ===` block into a fresh
chat, then paste your **new copy / reference page** right under it and send.

The prompt encodes the design philosophy, tech stack, motion rules, structure,
and quality floor that made this page work — so the output stays on-brand even
with completely different content.

---

## How to use it

1. Open a new chat with the coding agent.
2. Paste the whole `=== PROMPT ===` block below.
3. Under the line that says **"HERE IS THE OFFER / COPY:"**, paste your raw
   content — this can be a reference HTML file, a Google Doc dump, bullet points,
   or a webinar transcript. Messy is fine; the agent extracts structure.
4. Fill in the **OFFER VARIABLES** at the top (brand, price, WhatsApp, colors).
   Leave any blank and the agent will choose sensibly.
5. Send. Review the first screenshot pass, then ask for tweaks.

---

```
=== PROMPT ===

You are the design lead at a small studio known for giving every client a
visual identity that could NOT be mistaken for anyone else's. Build me a
single-page, scroll-driven sales/upsell website that does not just *describe*
an offer — it *demonstrates* it. As the visitor scrolls each section, the
animation on screen should act out the transformation that section is talking
about, so the reader feels the value instead of merely reading claims.

------------------------------------------------------------------
OFFER VARIABLES  (fill what you know; leave blank to let me decide)
------------------------------------------------------------------
- Brand / expert name:
- Product / programme name:
- Price (and any "regular" strike-through price):
- Primary call-to-action + checkout URL:
- WhatsApp handoff number (for the chatbot):
- Footer legal entity:
- Palette hint or theme (colors, mood, or a metaphor to ground it in):
- Anything to AVOID mentioning:

------------------------------------------------------------------
DATA SOURCES — REUSE THESE EXACT SHEETS (do not re-invent dates/Q&A)
------------------------------------------------------------------
The upcoming programme dates/timings and the chatbot question bank live in two
published Google Sheets (CSV). Pull the content FROM these — keep them as the
single source of truth so they can be refreshed later without code changes.

- Programme dates & time sheet (read cell D2 = dates, E2 = time):
  https://docs.google.com/spreadsheets/d/e/2PACX-1vR7k_ibL4l57reSl5_tU-Iy8f8o2u_FpC3Pvjj_38AalAQLxGmFEqcbrLElxub1pso31_ZdukwyIqCI/pub?gid=138894925&single=true&output=csv

- Question-bank sheet (health/programme Q&A the chatbot answers from):
  https://docs.google.com/spreadsheets/d/e/2PACX-1vTudreDWnpmq2jhQe4GVlGC_r9HlRvSztUUdAscn7aVNhTh3D1gJXEaZxNm6ByO3z8xUzJUa-s2GZfA/pub?gid=410572440&single=true&output=csv

Fetch both at build time, transcribe their current content into
src/chatbot/faq-bank.ts (the `PROGRAMME_DATES` / `PROGRAMME_DAYS` /
`PROGRAMME_TIME` constants and the `EXTRA_QA` / `FACTS` lists), and keep the URLs
noted in that file so they can be re-pulled when the sheets change. If the
sheets are unreachable, keep the values already in faq-bank.ts.

------------------------------------------------------------------
TECH STACK (non-negotiable)
------------------------------------------------------------------
- Vite + React + TypeScript
- Tailwind CSS v4 (use @tailwindcss/vite, @theme tokens in index.css — NOT a
  tailwind.config.js v3 setup)
- Framer Motion for all animation and scroll-reveal
- Lenis for smooth scrolling
- Keep the page itself 100% static / client-side so it deploys free to Netlify.
- The ONLY server-side piece is one Netlify serverless Function for the chatbot
  (so the AI key is never shipped to the browser). Everything else is static.
- Put ALL copy, pricing, lists, FAQ, and testimonials in a single src/data.ts
  as the one source of truth. Components read from it; never hard-code copy in
  JSX.
- Validate with `npm run build` (this runs `tsc -b`, which is strict). Framer
  Motion string easings like 'easeInOut' must be `as const` or the build fails.

------------------------------------------------------------------
DESIGN PHILOSOPHY
------------------------------------------------------------------
1. GROUND IT IN THE SUBJECT. Derive the palette, typography and the one
   signature element from the offer's own world (its metaphor, instrument,
   ritual, or subject matter) — never a generic template. If I give you a
   reference image or page, treat its palette as law: extract 4–6 exact hex
   values and recolor everything to fit, including the animations. Avoid the
   three AI-default looks (cream + serif + terracotta; near-black + one acid
   accent; broadsheet hairline columns) UNLESS the brief or reference explicitly
   asks for one — if it does, execute it faithfully.
2. EACH SECTION DEMONSTRATES ITS CONTENT, GROUNDED IN A REAL ARTIFACT. The
   centerpiece is a sequence of "stages" (days / steps / modules). Give EACH
   stage its OWN bespoke animation that visually performs that stage's promise —
   a meter calming, a knot loosening, a fire igniting, a scatter snapping into
   alignment, a loop breaking. CRUCIALLY: anchor these animations in a single
   literal artifact from the subject's world (here, a faint seated human body
   silhouette) drawn in ONE shared SVG coordinate space, so every moving element
   lands where it truly belongs (e.g. the gut animation sits on the abdomen, the
   chakra column aligns down the spine, the heart loop opens at the chest). Do
   NOT render the artifact and the animation as two separate overlapping layers
   with duplicated elements — they will fight and look chaotic. One coordinate
   space, elements placed anatomically/meaningfully. These grounded per-stage
   animations are the thing the page is remembered by; never reuse one generic
   fade for all of them.
3. A GLOBAL RHYTHM. Pick one ambient motion that runs through the whole page
   (a slow "breathing" pulse, a flowing rail, a heartbeat) tied to the subject,
   so the site feels alive and coherent rather than a stack of effects.
4. STRUCTURE IS INFORMATION. Use numbering/eyebrows/dividers only where the
   content truly is a sequence. Encode meaning, don't decorate.
5. MOTION SERVES MEANING, WITH RESTRAINT. Orchestrate a few moments that land
   hard (a hero reveal, scroll-triggered stage reveals, tasteful hover
   micro-interactions). Cut anything that's motion for motion's sake.
6. TYPOGRAPHY CARRIES PERSONALITY. Pair a characterful display face (used with
   restraint) with a clean body face and, if useful, a mono/utility face for
   data and labels. Set a real type scale.

------------------------------------------------------------------
PAGE STRUCTURE (adapt to the actual copy)
------------------------------------------------------------------
- Sticky/minimal nav with the offer name + a "Join / Buy" CTA.
- HERO as a thesis: open with the single most characteristic thing in the
  subject's world (a bold statement + a small set of animated proof stats with
  count-up). Not a generic big-number-with-gradient.
- A "why this / the shift" narrative section that reframes the reader's current
  state and the promise.
- The DEMONSTRATION sequence: one stage per step/day/module, alternating
  layout, each with its own signature animation (see philosophy #2).
- What's included / deliverables, with value framing.
- Social proof: testimonials, PLUS an endless horizontal "wall" of testimonial
  cards (two opposite-direction infinite marquee rows). Support both text and
  image cards so screenshots can be dropped in later (e.g. /public/wall/).
- Investment / pricing section with the price, regular-price anchor, and a
  value stack. One clear CTA.
- FAQ (accordion) built from the data file.
- Final emotional close + CTA.
- Footer crediting the legal entity. Do NOT invent or include any brand the
  user told you to avoid.

------------------------------------------------------------------
CHATBOT (AI-backed but strictly grounded — free tier)
------------------------------------------------------------------
- A floating launcher bottom-right: "Have any questions? You can ask here."
- Opens a chat panel headed "<Brand>'s Team".
- Powered by a FREE LLM (Groq, e.g. llama-3.3-70b-versatile) called from a
  Netlify serverless Function — the API key lives ONLY in a server env var
  (GROQ_API_KEY), never in the browser bundle.
- The model is hard-constrained by a system prompt to answer ONLY from a local,
  editable QUESTION BANK (the page FAQ + an EXTRA_QA list + loose FACTS in
  src/chatbot/faq-bank.ts), seeded from the question-bank Google Sheet above. It
  must NOT invent prices, dates, medical advice, or claims.
- The function returns strict JSON: {"reply": string, "canAnswer": boolean}.
  • canAnswer true  → show the warm, concise answer.
  • canAnswer false → for anything not in the bank, opinions ("is it good?",
    "should I buy?"), medical/health advice, complaints, or refund/EMI/payment
    issues, show a kind hand-off message + a WhatsApp deep link
    (https://wa.me/<NUMBER>?text=<prefilled message>).
- Greetings (hi/hello/namaste) → answer warmly and invite a question.
- Do NOT add a permanent "Talk to team" button. The WhatsApp hand-off should
  appear only when the bot genuinely can't answer, so the bank resolves most
  questions itself.
- Provide quick-reply chips for the top questions.
- Graceful fallback: if the key/function is missing, fail quietly to the
  WhatsApp hand-off rather than erroring.

------------------------------------------------------------------
QUALITY FLOOR (build it in quietly, don't announce it)
------------------------------------------------------------------
- Fully responsive down to ~360px mobile.
- Respect prefers-reduced-motion (disable/shorten animations, keep content).
- Visible keyboard focus; semantic headings; alt text.
- Take screenshots (desktop + mobile) and self-critique before declaring done.
- Then give me: the local dev command, and one-line Netlify deploy steps.

------------------------------------------------------------------
HERE IS THE OFFER / COPY:
------------------------------------------------------------------
<paste your reference page or raw copy below this line>

=== END PROMPT ===
```

---

## Reference implementation (what this prompt produced)

The live example built from this philosophy:

- **Project:** `bcl-react/` (in this folder)
- **Live site:** https://breath-chakra-liberation.netlify.app
- **Signature element:** a faint seated meditation body silhouette that grounds
  every per-day demonstration — each day's animation plays out ON the body in a
  shared SVG space: Day 1 a frantic nervous-system signal settling to a calm
  breath at the base, Day 2 a held knot unwinding into release, Day 3 a cold gut
  igniting into digestive fire with the organs warming in their real positions,
  Day 4 seven scattered chakra centres snapping into one aligned column down the
  spine, Day 5 the closed relapse loop breaking open at the heart. A vertical
  "breath rail" runs the whole page as the ambient rhythm.
- **Palette (light, warm editorial — from the client's reference image):** cream
  paper (`#f4f0e7` / cards `#fbf8f1`), forest green (`#356152`, deep bands +
  primary buttons `#1f3a2e`), terracotta accent (`#c15f3c`), deep
  forest-charcoal text (`#233029`). Per-stage chakra accents run warm→cool: root
  `#c15f3c`, sacral `#c07a4e`, solar `#b8502e`, heart `#3f6354`, throat
  `#356152`, crown `#2c5141`.
- **Type:** Fraunces (display) · Inter (body) · IBM Plex Mono (data/labels).

### Run locally
```bash
cd bcl-react
npm install
npm run dev        # http://localhost:5173
```

### Deploy (Netlify, free)
```bash
cd bcl-react
npm run build
netlify deploy --prod --dir=dist
```
Set `GROQ_API_KEY` in the Netlify site env vars (Site settings → Environment)
so the chatbot Function can reach the LLM. Get a free key at console.groq.com.

### Things to set per new offer
- `src/data.ts` → `CHECKOUT_URL` (real payment link — every "Join / Buy" CTA in
  the nav, hero, investment and close sections reads from this one constant),
  `PRICE`, `REGULAR_PRICE`, and all copy/days/FAQ/testimonials.
- `src/chatbot/faq-bank.ts` → the question bank the bot answers from: `EXTRA_QA`,
  `FACTS`, and the upcoming `PROGRAMME_DATES` / `PROGRAMME_DAYS` /
  `PROGRAMME_TIME`. These are sourced from two published Google Sheets — the
  dates/time sheet (cells D2 & E2) and the question-bank sheet (URLs noted at the
  top of the build prompt and in this file). Re-pull them when the sheets change;
  the more Q&A you add, the more the bot answers without hand-off.
- `src/chatbot/knowledge.ts` → `WHATSAPP_NUMBER`, `TEAM_NAME`.
- `GROQ_API_KEY` → Netlify env var (never commit it).
- Drop testimonial screenshots into `public/wall/` and reference them in the
  `WALL` array.
