'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { projects } from '@/lib/data';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import '../../styles/fonts.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

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

          {/* Enhanced Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="group relative animate-fade-in-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
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

                    {/* Enhanced Project Links */}
                    {/* <div className="flex gap-3 mt-auto">
                      {project.demoUrl && (
                        <Button
                          href={project.demoUrl}
                          variant="primary"
                          size="sm"
                          className="flex-1 text-center bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 hover:from-cyan-500/30 hover:to-blue-600/30 hover:border-cyan-400/50 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Demo
                          </span>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          href={project.githubUrl}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-center bg-gradient-to-r from-white/5 to-white/10 border border-white/20 hover:from-white/10 hover:to-white/15 hover:border-white/40 shadow-lg shadow-black/20 hover:shadow-white/10"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            Code
                          </span>
                        </Button>
                      )}
                    </div> */}


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
