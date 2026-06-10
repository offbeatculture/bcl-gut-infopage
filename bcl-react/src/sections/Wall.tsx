import { Eyebrow, Reveal } from '../components/primitives';
import { WALL, type WallEntry } from '../data';

function Card({ e }: { e: WallEntry }) {
  if (e.type === 'image') {
    return (
      <figure className="mx-2.5 w-[300px] flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-ink-2/70">
        <img src={e.src} alt={e.alt ?? 'Testimonial'} loading="lazy" className="w-full" />
      </figure>
    );
  }
  return (
    <figure className="mx-2.5 flex w-[340px] flex-shrink-0 flex-col rounded-2xl border border-border bg-ink-2/70 p-6">
      <span className="font-display text-3xl leading-none text-amber/40">“</span>
      <blockquote className="-mt-2 text-[14px] leading-relaxed text-cream/90">{e.text}</blockquote>
      <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
        — {e.attr}
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  dir,
  speed,
}: {
  items: WallEntry[];
  dir: 'left' | 'right';
  speed: string;
}) {
  return (
    <div className="marquee-row group relative overflow-hidden py-2">
      <div
        className={`marquee-track ${dir === 'left' ? 'marquee-left' : 'marquee-right'}`}
        style={{ ['--speed' as string]: speed }}
      >
        {[...items, ...items].map((e, i) => (
          <Card key={i} e={e} />
        ))}
      </div>
    </div>
  );
}

export function Wall() {
  if (WALL.length === 0) return null;
  // split into two rows for opposing motion
  const mid = Math.ceil(WALL.length / 2);
  const rowA = WALL.slice(0, mid);
  const rowB = WALL.slice(mid).length ? WALL.slice(mid) : WALL;

  return (
    <section className="relative overflow-hidden border-t border-border bg-ink py-24 md:py-28">
      <div className="mx-auto mb-12 max-w-2xl px-5 text-center">
        <Reveal><Eyebrow>The Wall</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-4xl font-light text-cream sm:text-5xl">
            The stories keep coming in.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 leading-relaxed text-muted">
            A living wall of messages from people who reset their gut from the root up. More are
            added every week.
          </p>
        </Reveal>
      </div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

      <div className="flex flex-col gap-3">
        <Row items={rowA} dir="left" speed="55s" />
        <Row items={rowB} dir="right" speed="70s" />
      </div>
    </section>
  );
}
