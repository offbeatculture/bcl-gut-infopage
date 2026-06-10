import { useSmoothScroll } from './lib/useSmoothScroll';
import { Nav } from './components/Nav';
import { BreathChannel } from './components/BreathChannel';
import { Hero } from './sections/Hero';
import { Zones } from './sections/Zones';
import { Days } from './sections/Days';
import { Includes } from './sections/Includes';
import { Testimonials } from './sections/Testimonials';
import { Investment } from './sections/Investment';
import { Faq } from './sections/Faq';
import { Close, Footer } from './sections/Close';
import { Wall } from './sections/Wall';
import { ChatWidget } from './components/ChatWidget';

export default function App() {
  useSmoothScroll();
  return (
    <div className="grain relative">
      <Nav />
      <BreathChannel />
      <main className="relative z-10">
        <Hero />
        <Days />
        <Zones />
        <Includes />
        <Testimonials />
        <Investment />
        <Faq />
        <Close />
        <Wall />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
