import { motion, useReducedMotion } from 'framer-motion';
import { Section, Eyebrow, Reveal, CountUp } from '../components/primitives';
import {
  VALUE_TABLE,
  TOTAL_VALUE,
  REGULAR_PRICE,
  PRICE,
  PRICE_INCLUDES,
  CHECKOUT_URL,
} from '../data';

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export function Investment() {
  const reduce = useReducedMotion();
  return (
    <Section id="invest" className="bg-ink">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><Eyebrow>The Investment</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-4xl font-light leading-tight text-cream sm:text-5xl">
              What you are getting vs. what you are paying.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_400px]">
          {/* value tally */}
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface/60 p-3 sm:p-6">
              <ul>
                {VALUE_TABLE.map((row, i) => (
                  <motion.li
                    key={row.item}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    whileInView={reduce ? {} : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-center justify-between border-b border-border/60 py-3.5 text-[15px] last:border-0"
                  >
                    <span className="text-cream-dim">{row.item}</span>
                    <span className="font-mono text-muted">{inr(row.price)}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-amber/[0.07] px-4 py-4">
                <span className="font-display text-xl text-cream">Total Value</span>
                <span className="font-display text-2xl text-amber">
                  <CountUp to={TOTAL_VALUE} prefix="₹" />
                </span>
              </div>
            </div>
          </Reveal>

          {/* price card */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-amber/40 bg-gradient-to-b from-surface-2 to-ink-2 p-8 lg:sticky lg:top-24">
              <div className="breathe pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,160,58,0.22),transparent_65%)]" />
              <div className="relative">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
                  Your Investment
                </div>
                <div className="mt-4 font-mono text-sm text-muted line-through">
                  Regular price: {inr(REGULAR_PRICE)}
                </div>
                <div className="mt-1 flex items-end gap-2">
                  <span className="font-display text-6xl font-light text-cream">{inr(PRICE)}</span>
                </div>
                <div className="mt-1 text-sm text-muted">One time. Lifetime access.</div>

                <ul className="mt-6 space-y-2.5">
                  {PRICE_INCLUDES.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[14px] text-cream-dim">
                      <span className="mt-0.5 text-amber">✦</span>
                      {p}
                    </li>
                  ))}
                </ul>

                <a
                  href={CHECKOUT_URL}
                  className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-teal-deep px-6 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-cocoa transition-all hover:gap-3 hover:shadow-[0_12px_36px_-10px_rgba(31,58,46,0.7)]"
                >
                  Join Now — ₹7,999
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <p className="mt-4 text-center text-[12px] leading-relaxed text-muted">
                  This is a limited-time price. It returns to {inr(REGULAR_PRICE)} soon.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
