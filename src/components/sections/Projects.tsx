'use client';

import React, { useState } from 'react';
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

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-gray-600'
              }`}
            >
              All
            </button>
            {allTechStack.slice(0, 6).map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === tech
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-gray-600'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedProjects.map((project) => (
              <Card key={project.id} hover className="overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                {/* Project Image */}
                <div className="h-48 bg-gray-800/50 overflow-hidden">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Project Screenshot
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <Button
                        href={project.demoUrl}
                        variant="primary"
                        size="sm"
                      >
                        Demo
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        href={project.githubUrl}
                        variant="outline"
                        size="sm"
                      >
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Show More/Less Button */}
          {!showAll && filteredProjects.length > displayedProjects.length && (
            <div className="text-center">
              <Button
                onClick={() => setShowAll(true)}
                variant="outline"
                size="lg"
              >
                View All Projects ({filteredProjects.length})
              </Button>
            </div>
          )}

          {showAll && filteredProjects.length > 3 && (
            <div className="text-center">
              <Button
                onClick={() => setShowAll(false)}
                variant="outline"
                size="lg"
              >
                Show Featured Only
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
