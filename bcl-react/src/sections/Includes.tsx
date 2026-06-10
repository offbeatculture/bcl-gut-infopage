import { motion, useReducedMotion } from 'framer-motion';
import { Section, Eyebrow, Reveal, Stagger, staggerItem } from '../components/primitives';
import { INCLUDES } from '../data';

export function Includes() {
  const reduce = useReducedMotion();
  return (
    <Section className="bg-ink">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><Eyebrow>What You Get</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-4xl font-light leading-tight text-cream sm:text-5xl">
              Everything you need for a complete reset.
            </h2>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {INCLUDES.map((item) => (
            <motion.article
              key={item.title}
              variants={staggerItem}
              whileHover={reduce ? {} : { y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-7"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(224,160,58,0.16),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-ink-2 text-2xl">
                {item.icon}
              </div>
              <h3 className="font-display text-xl text-cream">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.desc}</p>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
