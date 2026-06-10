import { motion } from 'framer-motion';
import { Eyebrow, Reveal, Stagger, staggerItem } from '../components/primitives';
import { TESTIMONIALS } from '../data';

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-teal-deep/20 px-5 py-24 sm:px-8 md:py-32">
      {/* ambient breathing glow */}
      <div className="breathe pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(31,154,160,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><Eyebrow>Words From People Who Were Exactly Where You Are</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-light text-cream sm:text-5xl">
              Real shifts. Real people.
            </h2>
          </Reveal>
        </div>

        <Stagger className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5" gap={0.07}>
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.attr}
              variants={staggerItem}
              className="break-inside-avoid rounded-2xl border border-border bg-ink-2/70 p-6"
            >
              <span className="font-display text-4xl leading-none text-amber/50">“</span>
              <blockquote className="-mt-3 text-[15px] leading-relaxed text-cream/90">
                {t.text}
              </blockquote>
              <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                — {t.attr}
              </figcaption>
            </motion.figure>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
