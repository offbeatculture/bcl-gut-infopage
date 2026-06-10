import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { CHECKOUT_URL } from '../data';

export function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 80));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`flex items-center justify-between px-5 py-4 transition-all duration-500 sm:px-8 ${
          solid
            ? 'border-b border-border/70 bg-ink/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="breathe-soft inline-block h-2.5 w-2.5 rounded-full bg-amber" />
          <span className="font-display text-[15px] tracking-tight text-cream">
            Dr. Valarrmathi
          </span>
        </div>
        <a
          href={CHECKOUT_URL}
          className="group relative overflow-hidden rounded-full border border-amber/40 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-amber transition-colors hover:text-cocoa"
        >
          <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-amber transition-transform duration-400 ease-out group-hover:scale-x-100" />
          <span className="relative z-10">Join — ₹7,999</span>
        </a>
      </div>
    </motion.header>
  );
}
