import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Section, Eyebrow, Reveal } from '../components/primitives';
import { DAYS, CHAKRA_HEX, type DayData } from '../data';

const GREEN = '#3f6354';
const GREEN_DEEP = '#2c5141';

/* ════════════ BODY FIGURE ════════════
   A faint seated meditation silhouette grounds every demo in the
   physical body. The day's chakra centre(s) light up along the
   spinal channel, and breath rises through them. */

const SPINE_X = 100;
const BODY_CHAKRAS: { key: string; y: number }[] = [
  { key: 'crown', y: 17 },
  { key: 'throat', y: 56 },
  { key: 'heart', y: 76 },
  { key: 'solar', y: 95 },
  { key: 'sacral', y: 113 },
  { key: 'root', y: 132 },
];

const DEMO_ACTIVE: Record<string, string[]> = {
  root: ['root'],
  sacral: ['sacral'],
  solar: ['solar'],
  full: ['root', 'sacral', 'solar', 'heart', 'throat', 'crown'],
  heart: ['heart'],
};

/* shared 7-centre column (warm root → cool crown), aligned to the spine */
const SPINE7: { y: number; c: string }[] = [
  { y: 17, c: '#2c5141' }, // crown
  { y: 36, c: '#356152' }, // third eye
  { y: 56, c: '#4f7a59' }, // throat
  { y: 76, c: '#7d7a47' }, // heart
  { y: 95, c: '#b8502e' }, // solar
  { y: 113, c: '#c07a4e' }, // sacral
  { y: 132, c: '#c15f3c' }, // root
];

/* the ghosted seated figure — drawn in the same 200×175 space every demo uses */
function Silhouette() {
  return (
    <>
      <g fill="none" stroke="var(--color-cream)" strokeWidth="1.4" opacity="0.16">
        <circle cx={SPINE_X} cy="34" r="17" />
        <path
          d="M100 52 C 116 53 127 61 129 79 C 131 95 127 109 119 119
             C 145 125 165 137 167 150 C 168 158 150 162 100 162
             C 50 162 32 158 33 150 C 35 137 55 125 81 119
             C 73 109 69 95 71 79 C 73 61 84 53 100 52 Z"
          strokeLinejoin="round"
        />
      </g>
      <line
        x1={SPINE_X} y1="17" x2={SPINE_X} y2="150"
        stroke="var(--color-cream)" strokeWidth="1" opacity="0.1"
      />
    </>
  );
}

/* wrapper that puts a demo's animation inside the body's coordinate space */
function BodyStage({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 200 175" className="h-[112%] w-auto" aria-hidden="true">
        <Silhouette />
        {children}
      </svg>
    </div>
  );
}

function BodyFigure({ demo, hex }: { demo: string; hex: string }) {
  const reduce = useReducedMotion();
  const active = DEMO_ACTIVE[demo] ?? [];
  const activeYs = BODY_CHAKRAS.filter((c) => active.includes(c.key)).map((c) => c.y);
  const topY = activeYs.length ? Math.min(...activeYs) : 132;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
      <svg viewBox="0 0 200 175" className="h-[112%] w-auto" aria-hidden="true">
        <Silhouette />

        {/* rising breath mote — root → highest active centre */}
        {!reduce && active.length > 0 && (
          <motion.circle
            cx={SPINE_X} r="3.2" fill={hex}
            initial={{ cy: 138, opacity: 0 }}
            whileInView={{ cy: [138, topY], opacity: [0, 0.9, 0] }}
            viewport={{ once: true }}
            transition={{
              duration: 2.2,
              delay: 0.6,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: 'easeInOut',
            }}
            style={{ filter: `drop-shadow(0 0 5px ${hex})` }}
          />
        )}

        {/* chakra centres */}
        {BODY_CHAKRAS.map((c, i) => {
          const on = active.includes(c.key);
          return (
            <g key={c.key}>
              {on && !reduce && (
                <motion.circle
                  cx={SPINE_X} cy={c.y} fill="none" stroke={hex} strokeWidth="1.2"
                  initial={{ r: 5, opacity: 0 }}
                  whileInView={{ r: [5, 13], opacity: [0.55, 0] }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2.6, repeat: Infinity,
                    delay: 0.8 + i * 0.18, ease: 'easeOut',
                  }}
                />
              )}
              <motion.circle
                cx={SPINE_X} cy={c.y} r={on ? 4 : 2.4}
                fill={on ? hex : 'var(--color-cream)'}
                initial={on && !reduce ? { opacity: 0.2, scale: 0.7 } : { opacity: on ? 0.85 : 0.16 }}
                whileInView={
                  on && !reduce
                    ? { opacity: [0.45, 0.95, 0.45], scale: [0.9, 1.15, 0.9] }
                    : {}
                }
                viewport={{ once: true }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.8 + i * 0.18, ease: 'easeInOut' }}
                style={{ transformOrigin: `${SPINE_X}px ${c.y}px` }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ════════════ PER-DAY DEMONSTRATIONS ════════════
   Each demo represents the day's actual shift, rendered as
   restrained editorial line-art that reads on warm paper. */

/* Day 1 — Root: a frantic nervous-system signal settles into calm breath */
function RootDemo({ hex }: { hex: string }) {
  const reduce = useReducedMotion();
  const jagged =
    'M0 50 L20 50 28 18 36 82 44 30 52 70 60 22 68 78 76 44 84 56 100 50 L140 50 L160 50 168 26 176 74 184 38 192 62 200 50 L260 50';
  const calm =
    'M0 50 C 26 50 30 38 50 38 C 72 38 74 62 96 62 C 120 62 122 42 146 42 C 170 42 172 58 196 58 C 220 58 224 50 260 50';
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8 p-2">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
        <span style={{ color: hex }}>Survival mode</span>
        <span style={{ color: GREEN }}>Safe</span>
      </div>

      <svg viewBox="0 0 260 100" className="w-full" preserveAspectRatio="none">
        <line x1="0" y1="50" x2="260" y2="50" stroke="var(--color-border)" strokeWidth="1" />
        {/* frantic signal fades out */}
        <motion.path
          d={jagged}
          fill="none"
          stroke={hex}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { opacity: 0.25 } : { opacity: 0.9 }}
          whileInView={reduce ? {} : { opacity: [0.9, 0.9, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 3, times: [0, 0.45, 1], ease: 'easeInOut' }}
        />
        {/* calm breath draws in and remains */}
        <motion.path
          d={calm}
          fill="none"
          stroke={GREEN}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={reduce ? {} : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* settling pulse */}
      <div className="relative mt-1 flex items-center justify-center">
        <motion.span
          className="absolute rounded-full"
          style={{ width: 64, height: 64, border: `1.5px solid ${GREEN}55` }}
          animate={reduce ? {} : { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="breathe-soft h-9 w-9 rounded-full" style={{ background: GREEN }} />
      </div>
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        Nervous system, settling
      </p>
    </div>
  );
}

/* Day 2 — Sacral: tightly held emotion unwinds and is released as flow */
function SacralDemo({ hex }: { hex: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-full min-h-[260px] w-full items-center justify-center overflow-hidden">
      <svg viewBox="0 0 200 200" className="h-52 w-52">
        {/* the coiled knot — unwinds open */}
        <motion.path
          d="M100 100 m0 0 a8 8 0 1 1 0.1 0 a18 18 0 1 1 -0.2 0 a30 30 0 1 1 0.3 0 a44 44 0 1 1 -0.4 0"
          fill="none"
          stroke={hex}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? { rotate: 0, opacity: 0.5 } : { rotate: -90, opacity: 0.85, scale: 0.7 }}
          whileInView={reduce ? {} : { rotate: 30, opacity: [0.85, 0.85, 0.15], scale: 1.25 }}
          viewport={{ once: true }}
          transition={{ duration: 3, times: [0, 0.5, 1], ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 100px' }}
        />
      </svg>

      {/* released flow — droplets descend and ripple away */}
      {!reduce &&
        [0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={`d${i}`}
            className="absolute rounded-full"
            style={{ left: `${28 + i * 11}%`, top: 40, width: 6, height: 6, background: GREEN }}
            animate={{ y: [0, 200], opacity: [0, 0.85, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.4 + i * 0.5, ease: 'easeIn' }}
          />
        ))}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={`r${i}`}
            className="absolute bottom-6 rounded-full"
            style={{ width: 60, height: 60, border: `1.5px solid ${GREEN}` }}
            animate={{ scale: [0.3, 2.4], opacity: [0.6, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 + i * 0.9, ease: 'easeOut' }}
          />
        ))}
      <span className="absolute bottom-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        Held → released
      </span>
    </div>
  );
}

/* Day 3 — Solar: a cold gut ignites into digestive fire; organs warm in place */
function SolarDemo({ hex }: { hex: string }) {
  const reduce = useReducedMotion();
  // anatomically clustered in the abdomen, around the solar-plexus core
  const organs = [
    { x: 78, y: 88, lx: 73, ly: 88, anchor: 'end' as const, label: 'STOMACH' },
    { x: 122, y: 90, lx: 127, ly: 90, anchor: 'start' as const, label: 'LIVER' },
    { x: 100, y: 119, lx: 100, ly: 132, anchor: 'middle' as const, label: 'GUT' },
  ];
  return (
    <>
      <BodyStage>
        <defs>
          <radialGradient id="ember" cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#f2cf9e" />
            <stop offset="55%" stopColor={hex} />
            <stop offset="100%" stopColor={GREEN_DEEP} />
          </radialGradient>
        </defs>

        {/* warmth spreading through the belly */}
        {!reduce &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={SPINE_X} cy="98" fill="none" stroke={hex} strokeWidth="1"
              initial={{ r: 7, opacity: 0 }}
              whileInView={{ r: [7, 32], opacity: [0.5, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 + i * 0.9, ease: 'easeOut' }}
            />
          ))}

        {/* organs warm up where they actually sit */}
        {organs.map((o, i) => (
          <g key={o.label}>
            <motion.circle
              cx={o.x} cy={o.y} r="3"
              initial={reduce ? { fill: hex, opacity: 1 } : { fill: '#b9b3a4', opacity: 0.5 }}
              whileInView={reduce ? {} : { fill: hex, opacity: [0.5, 1, 0.7] }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1.3 + i * 0.4, ease: 'easeOut' }}
            />
            <text
              x={o.lx} y={o.ly} textAnchor={o.anchor}
              fontFamily="ui-monospace, monospace" fontSize="5" letterSpacing="0.6"
              fill="var(--color-muted)" dominantBaseline="middle"
            >
              {o.label}
            </text>
          </g>
        ))}

        {/* the digestive fire — cold ember ignites at the solar plexus */}
        <motion.circle
          cx={SPINE_X} cy="98" fill="url(#ember)"
          initial={reduce ? { r: 13, opacity: 1 } : { r: 4, opacity: 0.55 }}
          whileInView={reduce ? {} : { r: 13, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${hex}aa)` }}
        />
      </BodyStage>
      <span className="absolute inset-x-0 bottom-1 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        Digestive fire, activated
      </span>
    </>
  );
}

/* Day 4 — Full: scattered centres snap onto the spine into one coherent column */
function FullDemo() {
  const reduce = useReducedMotion();
  const scatter = [
    { x: -30, y: 7 }, { x: 26, y: -9 }, { x: -22, y: 8 }, { x: 30, y: -6 },
    { x: -26, y: 9 }, { x: 22, y: -8 }, { x: -16, y: 6 },
  ];
  return (
    <>
      <BodyStage>
        <defs>
          <linearGradient id="spineGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#c15f3c" />
            <stop offset="50%" stopColor="#7d7a47" />
            <stop offset="100%" stopColor="#2c5141" />
          </linearGradient>
        </defs>

        {/* the unified channel draws once everything is aligned */}
        <motion.line
          x1={SPINE_X} y1="132" x2={SPINE_X} y2="17"
          stroke="url(#spineGrad)" strokeWidth="1.6" strokeLinecap="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={reduce ? {} : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1.7, ease: 'easeOut' }}
        />

        {/* breath flows up the aligned channel */}
        {!reduce && (
          <motion.circle
            cx={SPINE_X} r="3" fill={GREEN}
            initial={{ cy: 132, opacity: 0 }}
            whileInView={{ cy: [132, 17], opacity: [0, 0.9, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, delay: 3.2, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
            style={{ filter: `drop-shadow(0 0 5px ${GREEN})` }}
          />
        )}

        {/* seven centres: scattered → aligned on the spine */}
        {SPINE7.map((n, i) => (
          <motion.circle
            key={i}
            r="5" fill={n.c}
            initial={
              reduce
                ? { cx: SPINE_X, cy: n.y, opacity: 1 }
                : { cx: SPINE_X + scatter[i].x, cy: n.y + scatter[i].y, opacity: 0.3 }
            }
            whileInView={reduce ? {} : { cx: SPINE_X, cy: n.y, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </BodyStage>
      <span className="absolute inset-x-0 bottom-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        Scattered &rarr; coherent
      </span>
    </>
  );
}

/* Day 5 — Heart: the closed relapse loop breaks open and energy lifts free */
function HeartDemo({ hex }: { hex: string }) {
  const reduce = useReducedMotion();
  const TERRA = CHAKRA_HEX.root;
  // a full circle around the heart centre, opening at the top
  const LOOP = 'M100 50 a26 26 0 1 0 0 52 a26 26 0 1 0 0 -52';
  return (
    <>
      <BodyStage>
        {/* the loop forms (terracotta), holds, then fades as it breaks */}
        <motion.path
          d={LOOP} fill="none" stroke={TERRA} strokeWidth="2.2" strokeLinecap="round"
          initial={reduce ? { pathLength: 0.72, opacity: 0.25 } : { pathLength: 0, opacity: 0.9 }}
          whileInView={reduce ? {} : { pathLength: [0, 1, 1], opacity: [0.9, 0.9, 0.14] }}
          viewport={{ once: true }}
          transition={{ duration: 2.6, times: [0, 0.5, 1], ease: 'easeInOut' }}
        />

        {/* it re-forms as an open green arc — the loop is broken */}
        <motion.path
          d={LOOP} fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round"
          initial={reduce ? { pathLength: 0.72, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          whileInView={reduce ? {} : { pathLength: 0.72, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* released energy lifts free through the opening */}
        <motion.circle
          cx={SPINE_X} r="3.5" fill={GREEN}
          initial={reduce ? { cy: 22, opacity: 1 } : { cy: 76, opacity: 0 }}
          whileInView={reduce ? {} : { cy: [76, 18], opacity: [0, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 2, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 5px ${GREEN})` }}
        />

        {/* the steady, open heart */}
        <motion.circle
          cx={SPINE_X} cy="76" r="7" fill={hex}
          initial={reduce ? { scale: 1, opacity: 1 } : { scale: 0.2, opacity: 0 }}
          whileInView={reduce ? {} : { scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.8, ease: 'backOut' }}
          style={{ transformOrigin: `${SPINE_X}px 76px` }}
        />
      </BodyStage>
      <span className="absolute inset-x-0 bottom-1 text-center font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: GREEN }}>
        The loop is broken
      </span>
    </>
  );
}

function DayDemo({ day, hex }: { day: DayData; hex: string }) {
  switch (day.demo) {
    case 'root': return <RootDemo hex={hex} />;
    case 'sacral': return <SacralDemo hex={hex} />;
    case 'solar': return <SolarDemo hex={hex} />;
    case 'full': return <FullDemo />;
    case 'heart': return <HeartDemo hex={hex} />;
  }
}

/* ════════════ DAY STAGE ════════════ */
function DayStage({ day, index }: { day: DayData; index: number }) {
  const hex = CHAKRA_HEX[day.chakraKey];
  const flip = index % 2 === 1;

  return (
    <div className="relative py-12 md:py-16">
      <div
        className={`mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16 ${
          flip ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* demo panel — light editorial stage */}
        <Reveal>
          <div
            className="relative aspect-square overflow-hidden rounded-3xl border p-8"
            style={{
              borderColor: `${hex}33`,
              background: `radial-gradient(115% 100% at 50% 0%, ${hex}10, var(--color-surface) 62%), var(--color-surface)`,
              boxShadow: `0 24px 60px -36px ${hex}66, inset 0 1px 0 #ffffffcc`,
            }}
          >
            {/* giant day number watermark */}
            <span
              className="pointer-events-none absolute -right-2 -top-6 font-display text-[10rem] font-light leading-none opacity-[0.09]"
              style={{ color: hex }}
            >
              {day.n}
            </span>
            {day.demo === 'root' || day.demo === 'sacral' ? (
              <BodyFigure demo={day.demo} hex={hex} />
            ) : null}
            <div className="relative z-10 h-full w-full">
              <DayDemo day={day} hex={hex} />
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm tracking-[0.2em]" style={{ color: hex }}>
                DAY {day.n}
              </span>
              <span className="h-px flex-1" style={{ background: `${hex}40` }} />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {day.chakra}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-2 font-display text-3xl font-light text-cream sm:text-4xl">
              {day.title}
            </h3>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-2 text-balance text-lg italic text-cream-dim">{day.subtitle}</p>
          </Reveal>

          <ul className="mt-6 space-y-3">
            {day.bullets.map((b, i) => (
              <Reveal as="li" key={i} delay={0.2 + i * 0.06} className="flex gap-3 text-cream-dim">
                <span
                  className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: hex }}
                />
                <span className="leading-relaxed">{b}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <p
              className="mt-6 rounded-xl border-l-2 px-5 py-4 text-[15px] leading-relaxed text-cream"
              style={{ borderColor: hex, background: `${hex}10` }}
            >
              {day.result}
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Programme value{' '}
              <span className="ml-1 text-base font-semibold" style={{ color: hex }}>
                {day.value}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export function Days() {
  return (
    <Section id="days" className="bg-ink-2/40">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal><Eyebrow>The Programme</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-balance font-display text-4xl font-light leading-tight text-cream sm:text-5xl">
            Five days. Three zones. One complete reset.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Each day works a specific zone and chakra — building cumulatively toward a complete
            nervous-system baseline reset.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 divide-y divide-border/60">
        {DAYS.map((day, i) => (
          <DayStage key={day.n} day={day} index={i} />
        ))}
      </div>
    </Section>
  );
}
