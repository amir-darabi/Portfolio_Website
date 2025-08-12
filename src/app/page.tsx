import Header from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <AnimatedBackground />
      <main className="min-h-screen relative z-10 max-w-full overflow-x-hidden">
        <Header />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
