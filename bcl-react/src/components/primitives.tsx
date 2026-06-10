import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
  type Variants,
} from 'framer-motion';

/* ── Section wrapper ───────────────────────────── */
export function Section({
  id,
  className = '',
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative px-5 py-24 sm:px-8 md:py-32 ${className}`}
    >
      {children}
    </section>
  );
}

/* ── Eyebrow label ─────────────────────────────── */
export function Eyebrow({
  children,
  color = 'var(--color-amber)',
  className = '',
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2.5 ${className}`}
      style={{ color }}
    >
      <span
        className="inline-block h-px w-7"
        style={{ background: color, opacity: 0.6 }}
      />
      {children}
    </span>
  );
}

/* ── Reveal on scroll ──────────────────────────── */
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'p' | 'span';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={reduce ? undefined : revealVariants}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/* ── Staggered group ───────────────────────────── */
export function Stagger({
  children,
  className = '',
  gap = 0.1,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}
export const staggerItem: Variants = revealVariants;

/* ── Count-up number ───────────────────────────── */
export function CountUp({
  to,
  suffix = '',
  prefix = '',
  duration = 1.8,
  className = '',
  startOnMount = false,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  startOnMount?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inViewRaw = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const inView = startOnMount || inViewRaw;
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(val).toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

/* ── Breathing rings (concentric, animated) ────── */
export function BreathRings({
  color = 'rgba(255,255,255,0.16)',
  count = 4,
  size = 320,
  className = '',
}: {
  color?: string;
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="breathe absolute inset-0 rounded-full"
          style={{
            border: `1px solid ${color}`,
            animationDelay: `${i * 0.6}s`,
            transform: `scale(${0.5 + i * 0.16})`,
          }}
        />
      ))}
    </div>
  );
}
