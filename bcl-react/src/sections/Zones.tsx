import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { Section, Eyebrow, Reveal, Stagger, staggerItem } from '../components/primitives';
import { ZONES, ZONES_LOOP } from '../data';

/* three distinct zone hues within the warm palette:
   basement = earthy umber · gut = terracotta · ceiling = green */
const ZONE = { basement: '#9a6238', gut: '#c15f3c', ceiling: '#356152' };
const CHAKRA_HEX: Record<string, string> = { root: ZONE.basement, solar: ZONE.gut, throat: ZONE.ceiling };

/* The body as three stacked zones; the gut is squeezed
   by danger from below and suppression from above —
   held in a self-sustaining relapse loop. */
function BodyLoop() {
  const reduce = useReducedMotion();
  const NAVY = '#1f2b50';

  const Arrows = ({ dir, color, delay }: { dir: 'down' | 'up'; color: string; delay: number }) => (
    <div className="flex flex-col items-center leading-[0.6]">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="text-[11px]"
          style={{ color }}
          animate={reduce ? {} : { opacity: [0.15, 1, 0.15] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: delay + i * 0.18, ease: 'easeInOut' }}
        >
          {dir === 'down' ? '▼' : '▲'}
        </motion.span>
      ))}
    </div>
  );

  const Panel = ({
    tag, title, sub, hex, brace = false,
  }: { tag: string; title: string; sub: string; hex: string; brace?: boolean }) => (
    <motion.div
      className="relative overflow-hidden rounded-2xl border px-5 py-5 text-center"
      style={{
        borderColor: `${hex}66`,
        background: `radial-gradient(120% 120% at 50% 0%, ${hex}1f, var(--color-surface) 78%)`,
        boxShadow: `0 10px 30px -18px ${hex}99`,
      }}
      animate={brace && !reduce ? { scale: [1, 0.97, 1] } : {}}
      transition={brace ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${hex}, transparent)` }}
      />
      <div className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: hex }}>
        {tag}
      </div>
      <div className="mt-1 font-display text-lg leading-tight text-cream">{title}</div>
      <div className="mt-0.5 text-[11px] text-muted">{sub}</div>
    </motion.div>
  );

  return (
    <div className="relative mx-auto w-full max-w-[330px] pr-8">
      {/* relapse-loop arc on the right */}
      <svg
        className="pointer-events-none absolute -right-1 top-6 bottom-6 h-[calc(100%-3rem)] w-12 overflow-visible"
        viewBox="0 0 48 240"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M6 14 C 44 40, 44 200, 6 226"
          fill="none"
          stroke={NAVY}
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeDasharray="3 5"
          strokeLinecap="round"
        />
        <path d="M6 14 l 7 -1 M6 14 l 2 6" fill="none" stroke={NAVY} strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
        {!reduce && (
          <motion.circle
            r="2.6"
            fill={CHAKRA_HEX.solar}
            animate={{ offsetDistance: ['0%', '100%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ offsetPath: 'path("M6 14 C 44 40, 44 200, 6 226")', offsetRotate: '0deg' } as CSSProperties}
          />
        )}
      </svg>
      <div
        className="absolute -right-1 top-1/2 -translate-y-1/2 translate-x-full font-mono text-[9px] uppercase tracking-[0.2em] text-muted"
        style={{ writingMode: 'vertical-rl' }}
      >
        Relapse loop
      </div>

      <div className="flex flex-col gap-2.5">
        <Panel tag="Zone 3 · Ceiling" title="Suppresses from above" sub="Heart · Throat · Mind" hex={CHAKRA_HEX.throat} />
        <Arrows dir="down" color={CHAKRA_HEX.throat} delay={0} />
        <Panel tag="Zone 2 · The Gut" title="Caught in the middle" sub="Navel to sternum · Manipura" hex={CHAKRA_HEX.solar} brace />
        <Arrows dir="up" color={CHAKRA_HEX.root} delay={0.9} />
        <Panel tag="Zone 1 · Basement" title="Danger from below" sub="Root + Sacral" hex={CHAKRA_HEX.root} />
      </div>

      <div className="mt-5 rounded-xl border border-border bg-surface/70 px-4 py-3 text-left text-[12px] leading-relaxed text-cream-dim">
        <span style={{ color: CHAKRA_HEX.root }}>Zone 1</span> starts the problem ·{' '}
        <span style={{ color: CHAKRA_HEX.throat }}>Zone 3</span> sustains it ·{' '}
        <span style={{ color: CHAKRA_HEX.solar }}>Zone 2</span> is where symptoms appear.
      </div>
    </div>
  );
}

export function Zones() {
  return (
    <Section id="zones" className="bg-ink">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><Eyebrow>The Root Cause</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-4xl font-light leading-tight text-cream sm:text-5xl">
              Your gut is caught between the basement and the ceiling.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Your gut does not get stuck on its own. It is held in place by a loop running across
              three zones. Until all three are addressed, the gut cannot fully heal.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[320px_1fr]">
          <Reveal className="lg:sticky lg:top-28">
            <BodyLoop />
          </Reveal>

          <Stagger className="flex flex-col gap-5" gap={0.12}>
            {ZONES.map((z) => {
              const hex = CHAKRA_HEX[z.chakraKey];
              return (
                <motion.article
                  key={z.n}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-7 transition-colors hover:border-[color:var(--c)]"
                  style={{ ['--c' as string]: `${hex}88` }}
                >
                  <span
                    className="absolute left-0 top-0 h-full w-1 transition-all group-hover:w-1.5"
                    style={{ background: hex }}
                  />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="font-display text-5xl leading-none" style={{ color: hex }}>
                      {z.n}
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                        {z.label}
                      </div>
                      <h3 className="font-display text-2xl text-cream">{z.name}</h3>
                    </div>
                    <span className="ml-auto font-mono text-[11px] tracking-wide text-muted">
                      {z.chakra}
                    </span>
                  </div>
                  <p className="mt-4 leading-relaxed text-cream-dim">{z.desc}</p>
                  <p className="mt-3 text-sm text-muted">
                    <span className="font-semibold text-cream/80">Symptoms:</span> {z.symptoms}.
                  </p>
                  <p
                    className="mt-4 rounded-lg px-4 py-2.5 text-sm"
                    style={{ background: `${hex}14`, color: hex }}
                  >
                    {z.note}
                  </p>
                </motion.article>
              );
            })}
          </Stagger>
        </div>

        <Reveal>
          <p className="mx-auto mt-14 max-w-3xl rounded-2xl border border-amber/25 bg-amber/[0.05] px-8 py-7 text-center text-lg leading-relaxed text-cream-dim">
            <span className="font-semibold text-cream">
              Zone 1 floods the gut with danger from below. Zone 3 suppresses healing from above.
              Zone 2 — your gut — is caught in the middle.
            </span>{' '}
            Treating Zone 2 alone — with diet, supplements, or medication — cannot break a loop
            maintained from both directions. That is why nothing worked permanently.{' '}
            <span className="text-amber">
              The 5-day programme breaks the loop from all three directions at once.
            </span>
            <span className="sr-only">{ZONES_LOOP}</span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
