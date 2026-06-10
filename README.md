# Breath Chakra Liberation — 5-Day Programme Landing Page

A scroll-driven, demonstration-style sales page for Dr. Valarrmathi's **5-Day
Breath Chakra Liberation** programme. Each day's section animates the actual
transformation it describes, grounded on a seated body silhouette.

- **App:** [`bcl-react/`](./bcl-react) — Vite + React + TypeScript + Tailwind v4
  + Framer Motion + Lenis.
- **Chatbot:** a free Groq-backed assistant (Netlify Function) that answers only
  from an editable question bank and hands off to WhatsApp when it can't.
- **Build prompt:** [`BUILD-PROMPT.md`](./BUILD-PROMPT.md) — a reusable prompt to
  recreate this style of page for a different offer.

## Develop

```bash
cd bcl-react
npm install
npm run dev        # http://localhost:5173
```

## Deploy (Netlify)

```bash
cd bcl-react
npm run build
netlify deploy --prod --dir=dist
```

Set `GROQ_API_KEY` in the Netlify site environment for the chatbot Function.
