import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const SPECTRUM = ['#c15f3c', '#c07a4e', '#b8502e', '#7d7a47', '#4f7a59', '#2c5141'];

/* A fixed vertical "Sushumna" channel on the page edge.
   Fills as you scroll; the breath dot travels down and
   shifts through the chakra spectrum. */
export function BreathChannel() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const top = useTransform(progress, [0, 1], ['0%', '100%']);
  const fillH = useTransform(progress, [0, 1], ['0%', '100%']);
  const color = useTransform(progress, [0, 0.2, 0.4, 0.6, 0.8, 1], SPECTRUM);
  const glow = useTransform(color, (c) => `0 0 18px 4px ${c}`);

  return (
    <div
      className="pointer-events-none fixed left-3 top-0 z-40 hidden h-screen w-px md:left-6 md:block"
      aria-hidden
    >
      {/* track */}
      <div className="absolute inset-0 bg-border/60" />
      {/* fill */}
      <motion.div
        className="absolute left-0 top-0 w-px"
        style={{ height: fillH, background: color, opacity: 0.5 }}
      />
      {/* traveling breath dot */}
      <motion.div
        className="breathe-soft absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
        style={{ top, background: color, boxShadow: glow }}
      />
    </div>
  );
}
