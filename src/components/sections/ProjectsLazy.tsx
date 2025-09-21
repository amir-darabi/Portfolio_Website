'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load the Projects component
const ProjectsComponent = dynamic(() => import('./Projects'), {
  ssr: false,
  loading: () => (
    <section id="projects" className="py-20 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-blue-500 max-w-32"></div>
              <h2 className="text-3xl md:text-4xl goldman-bold mx-6 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Loading Projects...
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-blue-500/50 to-blue-500/80 max-w-32"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800/50 rounded-2xl h-80"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
});

const ProjectsLazy = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsComponent />
    </Suspense>
  );
};

export default ProjectsLazy;
