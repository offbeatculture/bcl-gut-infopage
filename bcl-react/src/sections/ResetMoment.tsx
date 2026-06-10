import { motion, useReducedMotion } from 'framer-motion';
import { Section, Eyebrow, Reveal } from '../components/primitives';
import { RESET, DIVIDER } from '../data';

/* SVG knot that loosens as it enters view */
function LooseningKnot() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto mb-12 h-32 w-32" aria-hidden>
      <motion.svg
        viewBox="0 0 120 120"
        className="h-full w-full"
        initial={reduce ? false : { rotate: -8 }}
        whileInView={reduce ? {} : { rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx="60"
            cy="60"
            r={20 + i * 12}
            fill="none"
            stroke="var(--color-teal)"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            initial={reduce ? false : { pathLength: 0.3, opacity: 0.4, scale: 0.85 }}
            whileInView={reduce ? {} : { pathLength: 1, opacity: 0.8, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, delay: i * 0.25, ease: 'easeOut' }}
            style={{ transformOrigin: '60px 60px' }}
          />
        ))}
        <circle cx="60" cy="60" r="6" fill="var(--color-amber)" className="breathe-soft" />
      </motion.svg>
    </div>
  );
}

export function ResetMoment() {
  return (
    <>
      <Section className="bg-ink-2/60">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <Eyebrow>What You Already Experienced</Eyebrow>
          </Reveal>

          <LooseningKnot />

          {RESET.lead.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="mb-6 text-lg leading-relaxed text-cream-dim">{p}</p>
            </Reveal>
          ))}

          {/* breathing answer */}
          <Reveal>
            <div className="relative my-12 overflow-hidden rounded-2xl border border-teal/30 bg-gradient-to-br from-teal-deep/30 to-ink-2 px-8 py-12 text-center">
              <div className="breathe pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(31,154,160,0.25),transparent_60%)]" />
              <p className="relative font-display text-3xl italic text-cream sm:text-4xl">
                It is safe to digest now.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <p className="mb-6 text-lg leading-relaxed text-cream-dim">{RESET.mid}</p>
          </Reveal>

          <Reveal>
            <p className="my-10 border-y border-amber/25 py-7 text-center font-display text-2xl leading-snug text-amber sm:text-3xl">
              {RESET.highlight}
            </p>
          </Reveal>

          {RESET.tail.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="mb-6 leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}

          <Reveal>
            <p className="mt-8 text-xl font-medium leading-relaxed text-cream">
              {RESET.emphasis}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* divider */}
      <div className="relative overflow-hidden border-y border-border bg-ink px-5 py-20 text-center">
        <Reveal>
          <p className="mx-auto max-w-2xl font-display text-xl italic leading-relaxed text-cream-dim sm:text-2xl">
            In the Gut Chakra Reset, you touched <span className="text-solar">Zone 2 — the gut</span> — briefly.
            The 5 days work <span className="text-cream">all three zones</span>, in sequence, with
            the depth required to change the nervous system’s default.
          </p>
          <span className="sr-only">{DIVIDER}</span>
        </Reveal>
      </div>
    </>
  );
}
