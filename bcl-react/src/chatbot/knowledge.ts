import { FAQ, PRICE, REGULAR_PRICE } from '../data';

/* ── WhatsApp hand-off ─────────────────────────── */
export const WHATSAPP_NUMBER = '919361012762'; // +91 93610 12762
export const WHATSAPP_DISPLAY = '+91 93610 12762';
export function whatsappLink(prefill: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;
}
export const TEAM_NAME = "Dr. Valarr's Team";

/* ── Knowledge base ────────────────────────────────
   The bot ONLY answers from these entries (plus the FAQ).
   If nothing matches confidently, it hands off to WhatsApp
   instead of inventing an answer. */
export interface KBEntry {
  keywords: string[];
  answer: string;
}

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const EXTRA_KB: KBEntry[] = [
  {
    keywords: ['price', 'cost', 'fee', 'pay', 'payment', 'rupees', 'amount', 'charge', 'expensive', '7999', '₹'],
    answer: `The 5-Day Breath Chakra Liberation is ${inr(PRICE)} (regular price ${inr(REGULAR_PRICE)}) — a one-time payment with lifetime access to all recordings. It’s a limited-time price.`,
  },
  {
    keywords: ['time', 'timing', 'timings', 'when', 'schedule', 'hours', 'duration', 'start', 'evening', 'consecutive'],
    answer:
      'Every day the session runs 7:00–9:30 PM (sometimes till 10:00 PM if there are questions). It’s designed for working professionals — you can join from home, and all five sessions are on consecutive days.',
  },
  {
    keywords: ['about', 'programme', 'program', 'explain', 'overview', 'liberation'],
    answer:
      'It’s a 5-day live breathwork programme that resets the gut–brain signal across three body zones (root, gut, heart). Each day works a specific chakra so digestion heals because the nervous-system signal changes — not because the food changes.',
  },
  {
    keywords: ['day', 'days', 'schedule', 'happens', 'plan', 'structure', 'five'],
    answer:
      'Day 1 — Root: the safety signal. Day 2 — Sacral: emotional release. Day 3 — Manipura: gut activation (the deepest session). Day 4 — all 7 chakras: full coherence. Day 5 — Heart: anchoring and breaking the loop.',
  },
  {
    keywords: ['include', 'included', 'bonus', 'bonuses', 'recipe', 'recipes', 'journal', 'community', 'recording', 'recordings'],
    answer:
      'You get 5 live sessions with Dr. Valarr, lifetime access to all recordings, private community access, the Gut SOS Audio Pack, 20+ gut-healing recipes, and the Cortisol-Gut Journal.',
  },
  {
    keywords: ['join', 'enroll', 'enrol', 'register', 'sign', 'buy', 'purchase', 'book'],
    answer:
      'Wonderful! Tap any “Join Now — ₹7,999” button on the page to enrol. If you’d like help or to pay another way, message the team on WhatsApp and we’ll set you up.',
  },
];

/* Build KB from the FAQ too — keywords from the question text. */
const STOP = new Set([
  'will', 'this', 'that', 'have', 'many', 'and', 'the', 'are', 'for', 'you',
  'your', 'can', 'i', 'is', 'it', 'a', 'an', 'of', 'to', 'my', 'how', 'what',
  'if', 'on', 'me', 'do', 'does', 'with', 'still', 'am',
]);
const FAQ_KB: KBEntry[] = FAQ.map((f) => ({
  keywords: f.q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w)),
  answer: f.a,
}));

export const KB: KBEntry[] = [...EXTRA_KB, ...FAQ_KB];

/* ── Matching ─────────────────────────────────────
   Returns the best answer, or null if not confident. */
export function findAnswer(input: string): string | null {
  const tokens = input
    .toLowerCase()
    .replace(/[^a-z0-9\s₹]/g, ' ')
    .split(/\s+/)
    .filter((t) => t === '₹' || t.length >= 3);
  if (tokens.length === 0) return null;

  const matches = (token: string, kw: string) =>
    token === kw ||
    (kw.length >= 4 && token.includes(kw)) ||
    (token.length >= 4 && kw.includes(token));

  let best: KBEntry | null = null;
  let bestScore = 0;
  for (const entry of KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (tokens.some((t) => matches(t, kw))) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  // require at least one solid keyword hit
  return bestScore >= 1 && best ? best.answer : null;
}

export const QUICK_REPLIES = [
  'What’s the price?',
  'What are the dates & timings?',
  'Will it fix my gut?',
  'Can I join on medication?',
];

export const GREETING = `Namaste 🌿 I’m here on behalf of ${TEAM_NAME}. Ask me anything about the 5-Day Breath Chakra Liberation — timings, what’s included, pricing, or whether it’s right for you.`;

export const HANDOFF_PREFILL =
  "Hi Dr. Valarr's team, I have a question about the 5-Day Breath Chakra Liberation.";

/* Light greeting detection — replies warmly instead of handing off. */
const GREETING_WORDS = ['hi', 'hii', 'hey', 'hello', 'helo', 'namaste', 'vanakkam', 'hola', 'yo', 'good morning', 'good evening'];
export function isGreeting(input: string): boolean {
  const t = input.toLowerCase().trim().replace(/[^a-z\s]/g, '');
  if (t.split(/\s+/).length > 3) return false;
  return GREETING_WORDS.some((g) => t === g || t.startsWith(g + ' '));
}
export const GREETING_REPLY =
  'Namaste 🌿 Happy to help. You can ask me about pricing, timings, what’s included, or whether the programme is right for you.';
