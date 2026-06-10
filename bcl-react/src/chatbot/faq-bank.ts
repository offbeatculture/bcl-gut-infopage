/* ============================================================
   QUESTION BANK  —  EDIT THIS FILE TO TEACH THE CHATBOT
   ------------------------------------------------------------
   The AI assistant answers ONLY from what is written here.
   • Add a new Q&A?  ->  add an item to EXTRA_QA below.
   • Add a loose fact (no question)?  ->  add a line to FACTS.
   If the visitor asks something NOT covered here, the bot will
   politely redirect them to your team on WhatsApp instead of
   guessing. So the more you add, the more it can answer.

   SOURCE SHEETS (re-pull these when they change):
   • Question bank (health/programme Q&A):
     https://docs.google.com/spreadsheets/d/e/2PACX-1vTudreDWnpmq2jhQe4GVlGC_r9HlRvSztUUdAscn7aVNhTh3D1gJXEaZxNm6ByO3z8xUzJUa-s2GZfA/pub?gid=410572440&single=true&output=csv
   • Dates & time (cell D2 = dates, E2 = time):
     https://docs.google.com/spreadsheets/d/e/2PACX-1vR7k_ibL4l57reSl5_tU-Iy8f8o2u_FpC3Pvjj_38AalAQLxGmFEqcbrLElxub1pso31_ZdukwyIqCI/pub?gid=138894925&single=true&output=csv
   ============================================================ */

import { FAQ, PRICE, REGULAR_PRICE } from '../data';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/* Upcoming 5-Day programme schedule — from the dates sheet (D2 = dates, E2 = time). */
export const PROGRAMME_DATES = '15–19 June';
export const PROGRAMME_DAYS = 'Monday to Friday';
export const PROGRAMME_TIME = '7:00 PM to 9:30 PM';

/* The page FAQ is included automatically. Add EXTRA Q&As here. */
export const EXTRA_QA: { q: string; a: string }[] = [
  /* ── Programme basics ───────────────────────────── */
  {
    q: 'How much does it cost? / What is the price?',
    a: `The 5-Day Breath Chakra Liberation is ${inr(PRICE)} (regular price ${inr(
      REGULAR_PRICE,
    )}). It is a one-time payment with lifetime access to all recordings, and it is a limited-time price.`,
  },
  {
    q: 'What is the programme about?',
    a: 'It is a 5-day live breathwork programme that resets the gut–brain signal across three body zones (root, gut, heart). Each day works a specific chakra so digestion heals because the nervous-system signal changes — not because the food changes.',
  },
  {
    q: 'What happens on each of the 5 days?',
    a: 'Day 1 — Root: the safety signal. Day 2 — Sacral: emotional release. Day 3 — Manipura: gut activation (the deepest session). Day 4 — all 7 chakras: full coherence. Day 5 — Heart: anchoring and breaking the loop.',
  },
  {
    q: 'What is included? Are there bonuses?',
    a: 'You get 5 live sessions with Dr. Valarrmathi, lifetime access to all recordings, private community access, the Gut SOS Audio Pack, 20+ gut-healing recipes, and the Cortisol-Gut Journal.',
  },
  {
    q: 'How do I join / enrol / buy?',
    a: 'Tap any “Join Now — ₹7,999” button on the page to enrol. If you would like help or to pay another way, message the team on WhatsApp and they will set you up.',
  },
  {
    q: 'When does it start? What are the dates and timings?',
    a: `The upcoming 5-Day Breath Chakra Liberation runs ${PROGRAMME_DATES} (${PROGRAMME_DAYS}). All five sessions are live from ${PROGRAMME_TIME} each evening.`,
  },
  {
    q: 'What are the session timings? Do you have a morning batch?',
    a: 'All five sessions are in the evening, from 7:00 PM to 9:30 PM (sometimes up to 10:00 PM if there are questions). There is no morning batch for the 5-day programme — it is designed so working professionals can join after the day.',
  },
  {
    q: 'How much time do I need to spend daily?',
    a: 'Just the live session from 7:00 PM to 9:30 PM each evening — that is your only real commitment. Outside of that, 5 to 10 minutes every morning for a simple grounding and breath practice. No homework, no complicated routines.',
  },
  {
    q: 'Where is it held? Is it online or offline?',
    a: 'It is a fully online programme, conducted on Zoom for all 5 days. Once you make the payment, you are added to a dedicated WhatsApp community for the 5-day programme. You join from the comfort of your home.',
  },
  {
    q: 'Is this for both men and women?',
    a: 'Yes — the programme is for both men and women.',
  },
  {
    q: 'What language is it in?',
    a: 'The sessions are conducted in English.',
  },
  {
    q: 'Is it advanced or beginner-friendly?',
    a: 'It is beginner-friendly — 5 days of easy, step-by-step guidance to gently work through stored emotional patterns. No prior experience needed.',
  },
  {
    q: 'What if I cannot attend a live session / want a different batch?',
    a: 'All sessions are recorded and you get lifetime access, so you will not miss out. If you are travelling and want to join a later batch, you can still register — the team will help you with dates that work for you.',
  },

  /* ── Health-related (from Dr. Valarrmathi's question bank) ── */
  {
    q: 'Will it help with my anxiety?',
    a: 'That is one of the main reasons people join. Breathwork helps teach the body safety, improves emotional regulation, and supports a calmer nervous-system response to stress.',
  },
  {
    q: 'Will my sugar cravings go down?',
    a: 'Very often, yes. When the nervous system feels safer and stress levels reduce, the body’s demand for quick energy through sugar and comfort foods often decreases naturally.',
  },
  {
    q: 'At night my body shivers or vibrates from inside. Why?',
    a: 'This can happen when the body is carrying a lot of stress, tension, or fatigue. As the nervous system begins relaxing, some people notice internal vibrations, trembling, or shaking sensations becoming more noticeable.',
  },
  {
    q: 'What causes eye tightness / strain?',
    a: 'Eye tightness is commonly linked to stress, mental overload, poor sleep, screen exposure, and nervous-system tension. As the body relaxes, many people notice reduced strain around the eyes.',
  },
  {
    q: 'I feel tingling, twitching or brief electric shocks during practice. Why?',
    a: 'Some people experience tingling, twitching, warmth, or brief electrical sensations as muscles relax and circulation improves. These sensations are usually temporary and settle on their own.',
  },
  {
    q: 'I feel an adrenaline or blood rush in my body. Is that normal?',
    a: 'You may be becoming more aware of sensations already present in the body. Increased warmth, circulation, energy movement, or temporary activation can occur as the nervous system responds to the practice.',
  },
  {
    q: 'How will I know my nervous-system baseline has changed?',
    a: 'You will usually notice it in daily life — better sleep, less overthinking, fewer emotional triggers, improved focus, calmer reactions, and faster recovery from stress are common signs.',
  },
  {
    q: 'How many days until I feel relief?',
    a: 'Every body is different. Some people feel calmer and lighter within a few sessions, while deeper changes may take weeks or months of consistent practice.',
  },
  {
    q: 'Will this help with insomnia / sleep issues / sleep medication?',
    a: 'Do not worry about your sleep issues. We work on activating the body’s rest and recovery, which supports the whole nervous system and brings more sleep to your body. As you feel safer, you will sleep better. Continue any medication alongside, as advised by your doctor.',
  },
  {
    q: 'Will this help my OCD?',
    a: 'Yes, this can help with OCD because we are fundamentally working on the parasympathetic nervous system — activating rest and recovery in the body — so obsessive-compulsive tendencies often reduce.',
  },
  {
    q: 'Can I do this if I have High BP?',
    a: 'Yes — and it is especially relevant, because high blood pressure is very often the body’s physical response to chronic suppressed emotion and nervous-system overactivation. Continue your medication as prescribed; the practice works alongside your treatment, not instead of it.',
  },
  {
    q: 'Can I do this if I have Low BP?',
    a: 'Low BP participants generally do very well in the programme, and many find their levels regulate naturally as the nervous system settles.',
  },
  {
    q: 'Will this help my Sciatica pain?',
    a: 'Yes — sciatica is very commonly connected to psoas muscle tension and sacral-chakra imbalance, both directly addressed on Day 2. Many participants with chronic sciatica report significant reduction in pain within the five days as the pelvic and lower-back region releases what it has been holding.',
  },
  {
    q: 'Will I regain bladder control with this?',
    a: 'Yes, this practice supports regaining bladder control.',
  },
  {
    q: 'Does it work for ADHD children?',
    a: 'The breathwork and grounding practices are highly beneficial for ADHD — they calm the nervous-system dysregulation that underlies most ADHD presentations. The five-day live programme is designed for adults, so we recommend parents attend first and then introduce the simple daily practices to their child at home.',
  },
  {
    q: 'Is this okay for Autism?',
    a: 'The breathwork and sensory grounding practices can be genuinely supportive for people on the autism spectrum — particularly for nervous-system regulation and emotional processing. We recommend starting with the gentler practices and adjusting intensity based on individual comfort; the programme is flexible enough to meet each person where they are.',
  },
  {
    q: 'Can someone with epilepsy practise this?',
    a: 'Anyone with epilepsy should first consult their neurologist or treating doctor. Gentle breathing practices are often well tolerated, but certain intensive techniques may not be appropriate for everyone.',
  },
  {
    q: 'Does this work for Cerebral Palsy?',
    a: 'The breathwork can support nervous-system regulation, reduce spasticity, and improve rest and emotional wellbeing for people with Cerebral Palsy. It does not reverse the neurological condition itself, but as a complementary practice it can meaningfully improve daily quality of life — we recommend joining with a caregiver present for support.',
  },
  {
    q: 'Can it cure multiple sclerosis / a specific medical condition?',
    a: 'No. We do not claim to cure multiple sclerosis or any medical condition. Breathwork may support stress management, emotional wellbeing, energy levels, and quality of life alongside your medical treatment.',
  },
  {
    q: 'Will it heal my optic nerve / trigeminal neuralgia / a nerve condition?',
    a: 'These conditions require proper medical evaluation and treatment. Breathwork may support relaxation, circulation, reduce stress-related aggravation, and improve overall nervous-system regulation — but it should not be considered a cure. Please continue working with your specialist for appropriate medical care.',
  },
];

/* Loose facts the bot can use that are not phrased as questions. */
export const FACTS: string[] = [
  `Programme name: 5-Day Breath Chakra Liberation.`,
  `Price: ${inr(PRICE)} one-time (regular ${inr(REGULAR_PRICE)}), lifetime access to recordings.`,
  `Upcoming dates: ${PROGRAMME_DATES} (${PROGRAMME_DAYS}), all 5 sessions live ${PROGRAMME_TIME}.`,
  `Format: 5 consecutive days, live, online on Zoom. You join from home.`,
  `It complements medical care; it is not a medical treatment or a replacement for a doctor. Always continue prescribed medication.`,
  `Tone: warm, calm, supportive — like a caring support team member, never pushy.`,
];

/* Builds the knowledge text that is sent to the AI as context. */
export function buildKnowledge(): string {
  const qa = [...EXTRA_QA, ...FAQ]
    .map((x, i) => `${i + 1}. Q: ${x.q}\n   A: ${x.a}`)
    .join('\n\n');
  const facts = FACTS.map((f) => `- ${f}`).join('\n');
  return `KEY FACTS:\n${facts}\n\nQ&A:\n${qa}`;
}
