import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CountUp } from '../components/primitives';
import { HERO_STATS, KURAL, CHECKOUT_URL } from '../data';

const TITLE = ['5-Day', 'Breath', 'Chakra', 'Liberation'];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-28 text-center"
    >
      {/* ambient radial glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(53,97,82,0.10),transparent_62%)]" />
        <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(193,95,60,0.10),transparent_65%)]" />
        <div className="absolute right-[12%] top-[18%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(193,95,60,0.08),transparent_65%)]" />
      </div>

      {/* drifting breath particles */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-cream/30"
              style={{
                left: `${(i * 61) % 100}%`,
                bottom: `-10px`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                animation: `drift ${10 + (i % 6)}s linear ${i * 0.7}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* breathing orb */}
      <motion.div
        style={{ y: reduce ? 0 : orbY, opacity: fade }}
        className="relative mb-10 flex h-44 w-44 items-center justify-center"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="breathe absolute rounded-full"
            style={{
              inset: `${i * 14}px`,
              border: `1px solid rgba(53,97,82,${0.34 - i * 0.05})`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
        <span
          className="breathe-soft h-16 w-16 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #f3d3b0, var(--color-amber) 55%, var(--color-amber-deep))',
            boxShadow: '0 0 60px 12px rgba(193,95,60,0.34)',
          }}
        />
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="eyebrow mb-7 rounded-full border border-amber/30 bg-amber/5 px-4 py-1.5 text-amber"
      >
        5-Day Live Programme
      </motion.span>

      {/* word-by-word title reveal */}
      <h1 className="font-display text-[clamp(2.6rem,9vw,6rem)] font-light leading-[0.98] tracking-tight text-cream">
        {TITLE.map((word, i) => (
          <span key={word} className="mx-[0.18em] inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 0.35 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word === 'Liberation' ? <em className="italic text-amber">{word}</em> : word}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-7 max-w-xl text-balance text-lg text-cream-dim"
      >
        From a gut that never settles — to a body that finally says yes.
      </motion.p>

      {/* kural */}
      <motion.figure
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mt-9 max-w-lg border-l border-amber/40 pl-5 text-left"
      >
        <blockquote className="font-display text-lg italic leading-relaxed text-cream/90">
          “{KURAL.text}”
        </blockquote>
        <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {KURAL.cite}
        </figcaption>
      </motion.figure>

      {/* stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.45 }}
        className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3"
      >
        {HERO_STATS.map((s) => (
          <div key={s.label} className="bg-ink-2/90 px-5 py-6">
            <div className="font-display text-3xl text-amber">
              <CountUp to={s.num} suffix={s.suffix} startOnMount duration={2.2} />
            </div>
            <div className="mt-1 text-[13px] leading-snug text-muted">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.a
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.65 }}
        href={CHECKOUT_URL}
        className="group mt-12 inline-flex items-center gap-3 rounded-full bg-teal-deep px-8 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-cocoa transition-all hover:gap-4 hover:shadow-[0_12px_36px_-10px_rgba(31,58,46,0.7)]"
      >
        Join the Programme
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </motion.a>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Breathe & scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mt-2 h-7 w-px bg-gradient-to-b from-amber to-transparent"
        />
      </motion.div>
    </section>
  );
}
