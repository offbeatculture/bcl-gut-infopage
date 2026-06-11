export type ChakraKey = 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'crown';

export interface DayData {
  n: number;
  chakra: string;        // Sanskrit · English · zone label
  chakraKey: ChakraKey;  // accent color key
  title: string;
  subtitle: string;
  bullets: string[];
  result: string;
  value: string;
  demo: 'root' | 'sacral' | 'solar' | 'full' | 'heart'; // bespoke animation id
}

export const HERO_STATS = [
  { num: 89, suffix: '%', label: 'felt a gut shift during the session' },
  { num: 8, suffix: ' in 10', label: 'reported improved digestion' },
  { num: 10000, suffix: '+', label: 'people reset with Dr. Valarrmathi' },
];

export const KURAL = {
  text: 'The body needs no medicine — if what you eat is fully digested before the next meal.',
  cite: '— Thiruvalluvar, Kural 942',
};

export const RESET = {
  lead: [
    'When you attended the Gut Chakra Reset, your gut received a signal it has not received in a very long time. Not from food. Not from a supplement. Not from willpower.',
    'From your own breath — travelling through all three zones of your body — telling your nervous system one thing:',
  ],
  answer: 'It is safe to digest now.',
  mid: 'That shift you felt — the softness in the belly, the loosening of the knot, the quiet in the gut — that is not a technique. That is your body\u2019s factory setting. The state it was designed to live in.',
  highlight: 'That session was a reset. The 5 days is the rewire.',
  tail: [
    'One session sent the right signal. But the next morning you wake up. The same email is waiting. The same worry tries to take its place in your gut. And the Manipura — which opened that day — begins to brace again.',
    'Not because that session did not work. But because one session cannot overwrite years of pattern. Your nervous system needs repetition. It needs all three zones worked in sequence, day by day, until safety becomes the permanent signal.',
  ],
  emphasis: 'That is exactly what the 5-Day Breath Chakra Liberation does.',
};

export const DIVIDER =
  'In the Gut Chakra Reset you touched Zone 2 — the gut — briefly. The 5 days work all three zones, in sequence, with the depth required to change the nervous system\u2019s default.';

export const ZONES = [
  {
    n: 1,
    name: 'The Basement',
    label: 'Why It Started',
    chakra: 'Muladhara + Svadhisthana · Root & Sacral',
    chakraKey: 'root' as ChakraKey,
    desc: 'Survival fear and unprocessed emotion stored below the navel — continuously sending the danger signal upward into the gut. Chronic financial anxiety, early-life insecurity, suppressed grief, and relational wounds live here. As long as Zone 1 is in survival mode, Zone 2 cannot fully open.',
    symptoms: 'constipation, lower cramping, pelvic floor tension, IBS-C, urgency under stress',
    note: 'Worked on Days 1 & 2 — the foundation is cleared before the gut is addressed directly.',
  },
  {
    n: 2,
    name: 'The Gut Command Centre',
    label: 'Where It Lives',
    chakra: 'Manipura · Solar Plexus',
    chakraKey: 'solar' as ChakraKey,
    desc: 'Every digestive organ — stomach, liver, gallbladder, pancreas, small intestine — is wired through the nerve network in this zone. Manipura also governs personal power. When someone swallows anger, says yes when they mean no, or carries chronic shame, the gut mirrors it physically.',
    symptoms: 'bloating, IBS, acidity, heartburn, poor absorption, low energy after eating',
    note: 'Day 3 is the deepest Manipura session — liver release, anger processed, digestion restored, power reclaimed.',
  },
  {
    n: 3,
    name: 'The Ceiling',
    label: 'Why It Never Heals',
    chakra: 'Anahata · Vishuddha · Ajna · Sahasrara',
    chakraKey: 'throat' as ChakraKey,
    desc: 'Grief in the chest compresses the diaphragm — the gateway to the gut. Swallowed words constrict the vagus nerve, which runs through the throat and governs gut motility. Chronic overthinking keeps cortisol elevated — the rest-and-digest signal never arrives.',
    symptoms: 'GERD, upper bloating, food sitting heavily, slow gut motility',
    note: 'Day 5 removes the ceiling — the gut finally receives permission from above and below at once.',
  },
];

export const ZONES_LOOP =
  'Zone 1 floods the gut with danger from below. Zone 3 suppresses healing from above. Zone 2 — your gut — is caught in the middle. Treating Zone 2 alone, with diet, supplements, or medication, cannot break a loop maintained from both directions. That is why nothing worked permanently. The 5-day programme breaks the loop from all three directions at once.';

export const DAYS: DayData[] = [
  {
    n: 1,
    chakra: 'Muladhara · Root Chakra · Zone 1',
    chakraKey: 'root',
    title: 'The Safety Signal',
    subtitle: 'The nervous system exits survival mode for the first time.',
    bullets: [
      'The root-level anxiety pattern flooding the gut with danger is identified and released.',
      'Five survival anxiety patterns mapped — financial fear, belonging, safety, identity, groundedness.',
      'A deep Muladhara breathwork journey works directly on survival fear in the pelvic floor and lower body.',
      'Sleep typically improves significantly on Night 1.',
    ],
    result: 'By end of Day 1: the foundation stabilises. The gut begins to receive the safety signal. Anxiety drops measurably.',
    value: '₹8,500',
    demo: 'root',
  },
  {
    n: 2,
    chakra: 'Svadhisthana · Sacral Chakra · Zone 1',
    chakraKey: 'sacral',
    title: 'Emotional Fluid Release',
    subtitle: 'The emotional feeder signal is cleared from below.',
    bullets: [
      'Years of suppressed grief, shame, and unexpressed emotion cleared from the sacral zone.',
      'The emotional patterns stored in Zone 1 mapped — guilt, shame, grief, relational wounds.',
      'A fluid breathwork journey releases what words alone cannot reach.',
      'Tears are common and expected on Day 2. That is healing.',
    ],
    result: 'By end of Day 2: the pelvic floor softens. The lower gut moves freely. The emotional backlog stops feeding the gut signal.',
    value: '₹8,500',
    demo: 'sacral',
  },
  {
    n: 3,
    chakra: 'Manipura · Solar Plexus · Zone 2',
    chakraKey: 'solar',
    title: 'Gut Activation',
    subtitle: 'The central gut day — the deepest session of the programme.',
    bullets: [
      'A full power audit — identifying exactly where personal power has been leaking, and reclaiming it.',
      'Liver, stomach, and gallbladder release through targeted organ breathwork.',
      'Anger — the most suppressed emotion in gut sufferers — processed and fully discharged.',
      'The connection between self-worth and digestion broken permanently.',
      '20+ euphoric energy recipes with chakra food mapping introduced.',
    ],
    result: 'By end of Day 3: many report their first complete bowel movement in years. Bloating and acidity reduce. Appetite returns as a reliable signal. Confidence begins to return.',
    value: '₹8,500',
    demo: 'solar',
  },
  {
    n: 4,
    chakra: 'All 7 Chakras · Full System',
    chakraKey: 'crown',
    title: 'Complete Coherence',
    subtitle: 'The new baseline is established across the full body.',
    bullets: [
      'All three zones integrated into one complete nervous system reset.',
      'A 60-minute full-spectrum chakra breathwork journey from root to crown.',
      'Future-vision activation — the nervous system is shown what health feels like and anchors it as the new default.',
      'The Daily 7-Minute Coherence Breath protocol — the maintenance practice for life.',
    ],
    result: 'By end of Day 4: digestion consistent throughout the day. Energy more stable than it has been in years. The gut does not collapse when life gets stressful.',
    value: '₹10,000',
    demo: 'full',
  },
  {
    n: 5,
    chakra: 'Anahata · Heart Chakra · Zone 3',
    chakraKey: 'heart',
    title: 'Heart Healing & Permanent Anchoring',
    subtitle: 'The ceiling is removed. The loop is broken.',
    bullets: [
      'The heart chakra\u2019s physical effect on the diaphragm, stomach, and upper gut released.',
      'The throat-vagus connection — and the gut cost of every word never said — addressed directly.',
      'The Phoenix Breathwork — Dr. Valarr\u2019s signature journey — the deepest release of the 5 days.',
      'The Gut Chakra Commitment Card — a personal declaration of the daily practice going forward.',
      'Graduation: participants share their 5-day transformation live.',
    ],
    result: 'By end of Day 5: the loop is broken. All three zones working together. The gut heals because the signal changed permanently — not because the food changed.',
    value: '₹10,000',
    demo: 'heart',
  },
];

export const INCLUDES = [
  { icon: '🎙', title: '5 Live Sessions with Dr. Valarrmathi', desc: 'One session per day, 7:00 – 9:30 PM. Every session delivered live — not pre-recorded. Teaching, somatic diagnosis, and a 45–60 minute chakra-specific breathwork journey.' },
  { icon: '♾', title: 'Lifetime Access to All Recordings', desc: 'Every session recorded and yours forever. Repeat the Day 3 Manipura journey monthly. Come back to the Day 1 safety anchor whenever life gets hard.' },
  { icon: '🌙', title: 'Bonus 1 — Deep Rest Protocol', desc: 'A 21-minute guided sleep rewire system, plus a sleep and breath hygiene PDF and a specific technique for effortless sleep. The nervous system resets during sleep — without deep rest, the transformation will not stick. Activates melatonin naturally, lowers cortisol spikes, prevents late-night overthinking loops. Value ₹3,000.' },
  { icon: '🎧', title: 'Bonus 2 — Daily Integration Meditation Audio Pack', desc: 'Short 2–5 minute meditations for liver cleansing, blood pressure, power activation, and nervous system reset. Use before work, between meetings, or before sleep. The practice continues between sessions — and after the programme ends. Value ₹5,000.' },
  { icon: '🥗', title: 'Bonus 3 — 20+ Euphoric Energy Recipes', desc: 'Chakra-mapped meals designed to support what each day\u2019s breathwork is releasing. Anti-inflammatory structures, hormone support combinations, what to eat when bloated, what to eat when anxious. Food that works with the nervous system — not against it. Value ₹2,500.' },
  { icon: '📓', title: 'Bonus 4 — Emotional Mastery Journal', desc: 'A daily nervous-system check-in template, an emotional trigger mapping tool, and reframe and release protocols. The journal that makes the invisible visible — tracking what is shifting day by day, keeping the new baseline active long after the 5 days end. Value ₹5,000.' },
];

export const TESTIMONIALS = [
  { text: 'I was suffering from acidity for 20 years. My gut problem has completely healed. Now I am very calm and have learned to handle every situation peacefully.', attr: 'Vijayaprabha, 57' },
  { text: 'So relaxed and light after the first session. For a change I am not going to bed bloated tonight!', attr: 'Ananya, 40 · Bangalore' },
  { text: 'Today was magical. It was like I was just letting go of whatever is holding me back. Not in anger, but just in terms of releasing it.', attr: 'Naimesh, 43' },
  { text: 'I can\u2019t remember the last time I slept without waking up. The night after the masterclass — I didn\u2019t wake up once. Not even once.', attr: 'Arati Prasad, 65 · Navi Mumbai' },
  { text: 'I feel calmer and more energetic. Now my mind is more relaxed. Pains started going away from my body.', attr: 'Shivaranjan, 35 · Bangalore' },
  { text: 'For the first time I was able to understand and identify my anxiety very clearly.', attr: 'Vinkal Ghodasra, 33' },
];

export const VALUE_TABLE = [
  { item: 'Day 1 — Root Chakra Safety Reset', price: 8500 },
  { item: 'Day 2 — Sacral Emotional Liberation', price: 8500 },
  { item: 'Day 3 — Gut Activation (Manipura)', price: 8500 },
  { item: 'Day 4 — 7-Chakra Full Coherence', price: 10000 },
  { item: 'Day 5 — Heart Healing & Anchoring', price: 10000 },
  { item: 'Bonus 1 — Deep Rest Protocol', price: 3000 },
  { item: 'Bonus 2 — Daily Integration Meditation Audio Pack', price: 5000 },
  { item: 'Bonus 3 — 20+ Euphoric Energy Recipes', price: 2500 },
  { item: 'Bonus 4 — Emotional Mastery Journal', price: 5000 },
];
export const TOTAL_VALUE = 61000;
export const REGULAR_PRICE = 14999;
export const PRICE = 7999;

/* Plug your payment / checkout link here (Razorpay, Cashfree, etc.). */
export const CHECKOUT_URL = 'https://pages.razorpay.com/5day-bcl-c?source=cq-gcl-lp';

export const PRICE_INCLUDES = [
  '5 live sessions with Dr. Valarrmathi',
  'Lifetime access to all recordings',
  'Bonus 1 — Deep Rest Protocol',
  'Bonus 2 — Daily Integration Meditation Audio Pack',
  'Bonus 3 — 20+ Euphoric Energy Recipes',
  'Bonus 4 — Emotional Mastery Journal',
];

export const FAQ = [
  { q: 'Will 5 days fix my gut completely?', a: 'Here is the honest answer. You will feel a significant shift during the 5 days. Most people notice concrete changes in digestion, sleep, and energy within the programme itself. Lasting change — where the gut stays healed even when life is stressful — builds over 30–90 days of daily practice. The 5 days give you the methodology, the experience, and the daily practice. The results compound as you use it.' },
  { q: 'I have tried many programmes and nothing worked. How is this different?', a: 'Every programme you have tried worked on the symptom — the food, the thought, the habit. This is the first time you are working on the source — the signal your nervous system is sending. You felt the difference in your own body during the Gut Chakra Reset. Not my explanation. Your experience.' },
  { q: 'My doctor says everything is normal. Is this still for me?', a: '\u201cEverything is normal\u201d means the physical structures are intact. It does not address the nervous-system signal that is keeping digestion suppressed. That is exactly what this programme works on — the layer below the physical that no test currently measures.' },
  { q: 'Can I join if I am on medication?', a: 'Yes. This is a nervous-system regulation and breathwork practice — not a medical treatment. It complements whatever medical care you are already receiving. Continue with your doctor alongside this. Many participants with IBS, GERD, fatty liver, and other diagnosed conditions have found significant relief through this programme.' },
  { q: 'What if I cannot attend a live session?', a: 'All sessions are recorded and you will have lifetime access. The live experience is the most powerful — but the recordings carry the full practice. You will not miss out.' },
  { q: 'What are the session timings?', a: 'Every day the session starts at 7:00 PM and runs till 9:30 PM — sometimes up to 10:00 PM if there are questions. Designed for working professionals. You can join from home. All five sessions are on consecutive days.' },
];

export const CHAKRA_HEX: Record<ChakraKey, string> = {
  root: '#c15f3c',   /* survival — terracotta */
  sacral: '#c07a4e', /* release — clay */
  solar: '#b8502e',  /* gut fire — deep terracotta */
  heart: '#3f6354',  /* heart — forest green */
  throat: '#356152', /* ceiling — green */
  crown: '#2c5141',  /* crown — deep green */
};

/* ─────────────────────────────────────────────
   THE WALL — endless scroll of testimonials.
   Add new entries here as you collect them.

   Text entry:        { type: 'text', text: '...', attr: 'Name, City' }
   Screenshot entry:  { type: 'image', src: '/wall/whatsapp-01.png', alt: 'WhatsApp message' }
     → drop the image file in  public/wall/  and reference it as /wall/<file>.
   ───────────────────────────────────────────── */
export type WallEntry =
  | { type: 'text'; text: string; attr: string }
  | { type: 'image'; src: string; alt?: string };

export const WALL: WallEntry[] = [
  { type: 'text', text: 'I was suffering from acidity for 20 years. My gut problem has completely healed. Now I am calm and handle every situation peacefully.', attr: 'Vijayaprabha, 57' },
  { type: 'text', text: 'For the first time I was able to understand and identify my anxiety very clearly.', attr: 'Vinkal Ghodasra, 33' },
  { type: 'text', text: 'I can’t remember the last time I slept without waking up. That night, I didn’t wake up once.', attr: 'Arati Prasad, 65 · Navi Mumbai' },
  { type: 'text', text: 'Today was magical. It was like letting go of whatever is holding me back — just releasing it.', attr: 'Naimesh, 43' },
  { type: 'text', text: 'So relaxed and light after the first session. For a change I am not going to bed bloated!', attr: 'Ananya, 40 · Bangalore' },
  { type: 'text', text: 'I feel calmer and more energetic. My mind is more relaxed. Pains started leaving my body.', attr: 'Shivaranjan, 35 · Bangalore' },
  // Add WhatsApp / screenshot testimonials below as images, e.g.:
  // { type: 'image', src: '/wall/wa-01.png', alt: 'WhatsApp testimonial' },
];
