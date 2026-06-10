import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '../components/primitives';
import { CHECKOUT_URL } from '../data';

export function Close() {
  const reduce = useReducedMotion();
  return (
    <section
      id="close"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-teal-deep px-5 py-28 text-center"
    >
      {/* full breathing finale */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="breathe absolute rounded-full border border-white/10"
            style={{ width: 200 + i * 130, height: 200 + i * 130, animationDelay: `${i * 0.5}s` }}
          />
        ))}
        <div className="absolute h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(193,95,60,0.18),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <Reveal>
          <span
            className="breathe-soft mx-auto mb-9 block h-12 w-12 rounded-full"
            style={{ background: 'radial-gradient(circle at 35% 30%, #f3d3b0, var(--color-amber))', boxShadow: '0 0 50px rgba(193,95,60,0.55)' }}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance font-display text-4xl font-light leading-tight text-[#f8f2e6] sm:text-5xl">
            Your gut already told you what it needs.{' '}
            <em className="italic text-amber">In the Reset, it said yes.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-[#f8f2e6]/80">
            The 5-Day Breath Chakra Liberation is how you make that your permanent address — not
            just a state you touched once and lost.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <motion.a
            href={CHECKOUT_URL}
            whileHover={reduce ? {} : { scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-amber px-10 py-5 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-cocoa shadow-[0_12px_44px_-10px_rgba(193,95,60,0.6)]"
          >
            Join Now — ₹7,999
            <span>→</span>
          </motion.a>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#f8f2e6]/55">
            ₹7,999 · Lifetime access · Live sessions + recordings · Limited-time offer
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink px-5 py-12 text-center">
      <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted">
        <span className="font-display text-cream-dim">Dr. Valarrmathi Srinivasan</span> · A programme
        by Offbeat Culture Pvt. Ltd.
        <br />
        This is a nervous-system regulation and breathwork programme. It is not a medical treatment
        and does not replace professional medical care.
      </p>
    </footer>
  );
}
