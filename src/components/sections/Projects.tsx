'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { projects } from '@/lib/data';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import '../../styles/fonts.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === projectsRef.current) {
            setIsProjectsVisible(true);
          }
        }
      });
    }, observerOptions);

    // Store current ref
    const currentProjectsRef = projectsRef.current;

    if (currentProjectsRef) observer.observe(currentProjectsRef);

    return () => {
      if (currentProjectsRef) observer.unobserve(currentProjectsRef);
    };
  }, []);

  // Get unique tech stack items for filtering
  const allTechStack = Array.from(
    new Set(projects.flatMap(project => project.techStack))
  );

  // Filter projects based on selected filter
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.techStack.includes(filter));

  // Show only featured projects initially, or all if showAll is true
  const displayedProjects = showAll 
    ? filteredProjects 
    : filteredProjects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-blue-500 max-w-32"></div>
              <h2 className="text-3xl md:text-4xl goldman-bold mx-6 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                My Projects
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-blue-500/50 to-blue-500/80 max-w-32"></div>
            </div>
            <p className="text-lg text-gray-300 exo2-regular max-w-2xl mx-auto">
              Here are some of the projects I&apos;ve worked on. Each project represents 
              a unique challenge and learning experience.
            </p>
          </div>

          {/* Enhanced Filter Buttons */}
            <div className="flex justify-center mb-12 px-2 sm:px-4">
              <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`relative px-6 py-3 rounded-xl transition-all duration-500 exo2-regular overflow-hidden group border whitespace-nowrap ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-cyan-500/10 to-blue-600/10 text-white border-cyan-400/30 backdrop-blur-sm shadow-lg shadow-cyan-500/20'
                    : 'text-gray-400 border-blue-500 hover:text-cyan-300 hover:bg-gradient-to-r hover:from-white/5 hover:via-cyan-500/5 hover:to-blue-500/5 hover:border-cyan-400/10'
                }`}
              >
                {/* Background glow effect for active button */}
                {filter === 'all' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl animate-pulse -z-10"></div>
                )}
                
                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-xl opacity-20"></div>
                
                <span className={`relative z-10 font-light text-sm tracking-wide transition-colors duration-300 ${
                  filter === 'all' ? 'font-medium' : ''
                }`}>
                  All Projects
                </span>
              </button>
              
              {allTechStack.slice(0, 6).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`relative px-6 py-3 rounded-xl transition-all duration-500 exo2-regular overflow-hidden group border whitespace-nowrap ${
                    filter === tech
                      ? 'bg-gradient-to-r from-cyan-500/10 to-blue-600/10 text-white border-cyan-400/30 backdrop-blur-sm shadow-lg shadow-cyan-500/20'
                      : 'text-gray-400 border-transparent hover:text-cyan-300 hover:bg-gradient-to-r hover:from-white/5 hover:via-cyan-500/5 hover:to-blue-500/5 hover:border-cyan-400/10'
                  }`}
                >
                  {/* Background glow effect for active button */}
                  {filter === tech && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl animate-pulse -z-10"></div>
                  )}
                  
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-xl opacity-20"></div>
                  
                  <span className={`relative z-10 font-light text-sm tracking-wide transition-colors duration-300 ${
                    filter === tech ? 'font-medium' : ''
                  }`}>
                    {tech}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Projects Grid with Right-to-Left Animation */}
          <div 
            ref={projectsRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 transition-all duration-1000 ease-out ${
              isProjectsVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`}
          >
            {displayedProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`group relative transition-all duration-700 ease-out ${
                  isProjectsVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-20'
                }`}
                style={{ 
                  transitionDelay: isProjectsVisible ? `${index * 300}ms` : '0ms'
                }}
              >
                {/* Enhanced Glass Card */}
                <Card hover className="relative overflow-hidden bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 group-hover:scale-102 group-hover:border-cyan-400/40 h-full">
                  
                  {/* Multiple Glass Layers for Enhanced Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/2 rounded-2xl"></div>
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-t-2xl"></div>
                  
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-800/50 to-gray-900/50 overflow-hidden rounded-t-2xl">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm">
                        <div className="text-center">
                          <svg className="w-12 h-12 mx-auto mb-2 text-cyan-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm exo2-light">Project Preview</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>

                  {/* Enhanced Project Content */}
                  <div className="relative z-10 p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-blue-600 goldman-regular group-hover:text-cyan-100 transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-300 mb-4 exo2-regular leading-relaxed group-hover:text-gray-200 transition-colors duration-300 flex-1">
                      {project.description}
                    </p>

                    {/* Enhanced Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-xs rounded-lg border border-blue-500/30 backdrop-blur-sm exo2-regular hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-cyan-500/30 hover:text-blue-200 transition-all duration-300 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Enhanced Show More/Less Button */}
          {!showAll && filteredProjects.length > displayedProjects.length && (
            <div className="text-center">
              <Button
                onClick={() => setShowAll(true)}
                variant="secondary"
                size="lg"
                className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 hover:from-cyan-500/30 hover:to-blue-600/30 hover:border-cyan-400/50 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 backdrop-blur-xl px-8 py-4"
              >
                <span className="flex items-center gap-3 goldman-regular">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  View All Projects ({filteredProjects.length})
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </Button>
            </div>
          )}

          {showAll && filteredProjects.length > 3 && (
            <div className="text-center">
              <Button
                onClick={() => setShowAll(false)}
                variant="outline"
                size="lg"
                className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 hover:from-white/10 hover:to-white/15 hover:border-white/40 shadow-lg shadow-black/20 hover:shadow-white/10 backdrop-blur-xl px-8 py-4"
              >
                <span className="flex items-center gap-3 goldman-regular">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Show Featured Only
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;