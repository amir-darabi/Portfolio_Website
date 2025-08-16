"use client";

import React, { useState } from 'react';
import { skills, experience } from '@/lib/data';
import Card from '@/components/ui/Card';
import { ProcessorIcon, ClockIcon, HeartIcon, TechIcon } from '@/components/icons/Icons';
import '../../styles/fonts.css'; 

const About = () => {
  const [activeTab, setActiveTab] = useState('Web Development');
  
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Define tab categories with icons and display names
  const tabCategories = [
    { key: 'Web Development', label: 'Web Dev', icon: '🌐' },
    { key: 'Programming', label: 'Programming', icon: '💻' },
    { key: 'Data & Backend', label: 'Data & Backend', icon: '🗄️' },
    { key: 'Development Tools', label: 'Dev Tools', icon: '🛠️' },
  ];

  return (
    <section id="about" className="py-20 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 goldman-regular">About Me</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto rajdhani-regular">
              I'm a passionate software developer with expertise in modern web technologies. 
              I love creating efficient, scalable solutions and learning new technologies to solve complex problems.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Projects Card */}
            <Card className="p-6 text-center bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-400/30 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-102 group" hover={true}>
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="w-12 h-12 mb-3 bg-gradient-to-br from-blue-500/80 to-purple-500/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ProcessorIcon className="w-6 h-6 text-white" />
                </div>
                {/* Number */}
                <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {Object.values(skillsByCategory).flat().length}+
                </div>
                {/* Label */}
                <div className="text-gray-300 goldman-regular group-hover:text-white transition-colors duration-300 mt-1">Technologies</div>
              </div>
            </Card>
            
            {/* Experience Card */}
            <Card className="p-6 text-center bg-gradient-to-br from-cyan-600/10 to-cyan-800/10 border border-blue-400/30 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-102 group" hover={true}>
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="w-12 h-12 mb-3 bg-gradient-to-br from-cyan-500/80 to-cyan-700/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <ClockIcon className="w-6 h-6 text-white" />
                </div>
                {/* Number */}
                <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  {1}+
                </div>
                {/* Label */}
                <div className="text-gray-300 goldman-regular group-hover:text-white transition-colors duration-300 mt-1">Years Experience</div>
              </div>
            </Card>
            
            {/* Passion Card */}
            <Card className="p-6 text-center bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-400/30 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:scale-102 group" hover={true}>
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="w-12 h-12 mb-3 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                {/* Number */}
                <div className="text-5xl font-bold text-purple-400 mb-0 group-hover:text-purple-300 transition-colors duration-300">
                  ∞
                </div>
                {/* Label */}
                <div className="text-gray-300 goldman-regular group-hover:text-white transition-colors duration-300 mt-0">Passion for Code</div>
              </div>
            </Card>
          </div>

          {/* Tech Stack - Tabbed Interface */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Tech Stack</h3>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-white/5 backdrop-blur-sm rounded-xl p-2 border border-white/10">
                {tabCategories.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                      activeTab === tab.key
                        ? 'bg-blue-500/20 text-white shadow-lg border border-blue-400/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {skillsByCategory[activeTab] && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fadeIn">
                  {skillsByCategory[activeTab].map((skill) => (
                    <Card key={skill.name} className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 group text-center" hover={true}>
                      <div className="flex flex-col items-center">
                        {/* Tech Icon */}
                        <div className="w-12 h-12 mb-3 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                          <TechIcon className="w-6 h-6 text-blue-400" />
                        </div>
                        {/* Tech Name */}
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Professional Experience - LinkedIn Style */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">
              Professional Experience
            </h3>
            <Card className="p-8 bg-white/10 backdrop-blur-sm border border-white/20" hover={true}>
              <div className="relative">
                {experience.map((exp, index) => (
                  <div key={exp.id} className="relative flex gap-6 pb-8 last:pb-0">
                    {/* Timeline line */}
                    {index !== experience.length - 1 && (
                      <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-blue-400/50"></div>
                    )}
                    
                    {/* Timeline dot */}
                    <div className="w-6 h-6 rounded-full bg-blue-400 flex-shrink-0 mt-3 shadow-lg"></div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-1">{exp.position}</h4>
                          <p className="text-blue-400 font-medium">{exp.company}</p>
                        </div>
                        <div className="text-gray-400 text-sm md:text-right mt-1 md:mt-0">
                          <span className="bg-gray-800/50 px-3 py-1 rounded-full">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <ul className="text-gray-300 space-y-2 mb-4">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-400 mt-2 text-xs">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Tech Stack */}
                      {exp.techStack && (
                        <div className="flex flex-wrap gap-2">
                          {exp.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
