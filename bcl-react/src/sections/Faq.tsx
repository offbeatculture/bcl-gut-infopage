import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Section, Eyebrow, Reveal } from '../components/primitives';
import { FAQ } from '../data';

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg text-cream sm:text-xl">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-amber/40 text-amber"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <Section className="bg-ink-2/40">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Reveal><Eyebrow>Common Questions</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-light text-cream sm:text-5xl">
              Honest answers.
            </h2>
          </Reveal>
        </div>
        <Reveal className="mt-12">
          <div>
            {FAQ.map((f) => (
              <Item key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
