'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect } from 'react';
import Header from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { LoadingProvider } from '@/lib/LoadingContext';

// Lazy load heavy components
const AnimatedBackground = dynamic(() => import('@/components/ui/AnimatedBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-black to-slate-800 -z-10" />
});

const About = dynamic(() => import('@/components/sections/About'), { 
  ssr: false 
});

const ProjectsLazy = dynamic(() => import('@/components/sections/ProjectsLazy'), { 
  ssr: false 
});

const Contact = dynamic(() => import('@/components/sections/Contact'), { 
  ssr: false 
});

export default function Home() {
  // Ensure page always starts at top
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <LoadingProvider>
      <LoadingScreen />
      <div className="overflow-x-hidden">
        <Suspense fallback={<div className="fixed inset-0 bg-gradient-to-br from-black to-slate-800 -z-10" />}>
          <AnimatedBackground />
        </Suspense>
        <main className="min-h-screen relative z-10 max-w-full overflow-x-hidden">
          <Header />
          <Hero />
          <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading...</div>}>
            <About />
          </Suspense>
          <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading Projects...</div>}>
            <ProjectsLazy />
          </Suspense>
          <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading...</div>}>
            <Contact />
          </Suspense>
          <Footer />
        </main>
      </div>
    </LoadingProvider>
  );
}
