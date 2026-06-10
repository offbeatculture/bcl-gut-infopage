# 5-Day Breath Chakra Liberation — Animated Sales Page

An immersive, animation-rich upsell page for Dr. Valarrmathi Srinivasan's
**5-Day Breath Chakra Liberation** programme (₹7,999). Built with React +
TypeScript + Tailwind v4 + Framer Motion + Lenis smooth scroll.

## Concept

The page is the journey *up the body*. A glowing vertical "Sushumna" breath
channel runs down the edge and shifts through the chakra spectrum as you scroll.
Each of the 5 days has its own **bespoke demonstration animation** so the
visitor *feels* the transformation:

| Day | Chakra | Demonstration |
|-----|--------|---------------|
| 1 | Muladhara (Root) | Anxiety meter dropping survival → safe |
| 2 | Svadhisthana (Sacral) | Fluid ripples + releasing droplets |
| 3 | Manipura (Solar) | Gut activation burst, organs igniting |
| 4 | All 7 chakras | Root → Crown spectrum cascade |
| 5 | Anahata (Heart) | The loop drawing, then breaking |

Everything breathes on a shared 8s inhale/exhale rhythm. `prefers-reduced-motion`
is fully respected.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Customise

- **Checkout link** — set `CHECKOUT_URL` in `src/data.ts` to your payment link
  (Razorpay / Cashfree / etc.). All "Join Tonight" buttons use it.
- **Copy, pricing, days, testimonials, FAQ** — all content lives in `src/data.ts`.
- **Colours & fonts** — design tokens are in the `@theme` block of `src/index.css`.

## Structure

```
src/
  data.ts                 — all copy, pricing, chakra colours, checkout URL
  index.css               — theme tokens, fonts, breathing keyframes
  components/
    primitives.tsx        — Reveal, Stagger, CountUp, BreathRings, Section
    Nav.tsx               — sticky nav
    BreathChannel.tsx     — scroll-progress chakra rail
  lib/useSmoothScroll.ts  — Lenis smooth scroll + anchor handling
  sections/               — Hero, ResetMoment, Zones, Days, Includes,
                            Testimonials, Investment, Faq, Close
```
