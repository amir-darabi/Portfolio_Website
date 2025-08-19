"use client";

import React, { useState, useEffect, useRef } from 'react';
import { skills, experience } from '@/lib/data';
import Card from '@/components/ui/Card';
import { TechIconRenderer, ProcessorIcon, ClockIcon, HeartIcon } from '@/components/icons';
import '../../styles/fonts.css'; 

const About = () => {
  const [activeTab, setActiveTab] = useState('Web Development');
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isTechStackVisible, setIsTechStackVisible] = useState(false);
  const [isExperienceVisible, setIsExperienceVisible] = useState(false);
  
  const statsRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === statsRef.current) {
            setIsStatsVisible(true);
          } else if (entry.target === techStackRef.current) {
            setIsTechStackVisible(true);
          } else if (entry.target === experienceRef.current) {
            setIsExperienceVisible(true);
          }
        }
      });
    }, observerOptions);

    // Store current refs
    const currentStatsRef = statsRef.current;
    const currentTechStackRef = techStackRef.current;
    const currentExperienceRef = experienceRef.current;

    if (currentStatsRef) observer.observe(currentStatsRef);
    if (currentTechStackRef) observer.observe(currentTechStackRef);
    if (currentExperienceRef) observer.observe(currentExperienceRef);

    return () => {
      if (currentStatsRef) observer.unobserve(currentStatsRef);
      if (currentTechStackRef) observer.unobserve(currentTechStackRef);
      if (currentExperienceRef) observer.unobserve(currentExperienceRef);
    };
  }, []);
  
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
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-blue-500 max-w-32"></div>
              <h2 className="text-3xl md:text-4xl goldman-bold mx-6 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-blue-500/50 to-blue-500/80 max-w-32"></div>
            </div>
            <p className="text-lg text-gray-300 exo2-regular  max-w-2xl mx-auto">
              Learn more about my background, skills, and experience
            </p>
          </div>

          {/* Stats Cards */}
          <div 
            ref={statsRef}
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 ease-out ${
              isStatsVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Technologies Card */}
            <div 
              className={`transition-all duration-700 ease-out ${
                isStatsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isStatsVisible ? '100ms' : '0ms' }}
            >
              <Card className="p-6 text-center bg-gradient-to-br from-blue-600/10 to-purple-00/10 border border-blue-400/30 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-102 group" hover={true}>
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
            </div>
            
            {/* Experience Card - Changed to Blue Theme */}
            <div 
              className={`transition-all duration-700 ease-out ${
                isStatsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isStatsVisible ? '200ms' : '0ms' }}
            >
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
            </div>
            
            {/* Passion Card */}
            <div 
              className={`transition-all duration-700 ease-out ${
                isStatsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isStatsVisible ? '300ms' : '0ms' }}
            >
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
          </div>

          {/* Tech Stack - Tabbed Interface */}
          <div className="mb-16">
            <h3 className="text-2xl goldman-bold text-blue-600 mb-8 text-center">Tech Stack</h3>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12 px-2 sm:px-4">
              <div className="flex flex-wrap sm:flex-nowrap justify-center bg-gradient-to-r from-black/30 via-black/20 to-black/30 backdrop-blur-md rounded-2xl p-1.5 border border-white/10 shadow-lg shadow-blue-500/20 max-w-full overflow-hidden w-full max-w-sm sm:w-auto sm:max-w-none">
                {tabCategories.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center justify-center gap-1 sm:gap-1 md:gap-2 lg:gap-3 px-6 sm:px-3 md:px-4 lg:px-6 py-3 md:py-4 rounded-xl transition-colors duration-500 exo2-regular relative overflow-hidden group border whitespace-nowrap min-w-fit flex-1 sm:flex-none ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-cyan-500/10 to-blue-600/10 text-white border-cyan-400/30 backdrop-blur-sm '
                        : 'text-gray-400 border-transparent hover:text-cyan-300 hover:bg-gradient-to-r hover:from-white/5 hover:via-cyan-500/5 hover:to-blue-500/5 hover:border-cyan-400/10'
                    }`}
                  >
                    {/* Background glow effect for active tab */}
                    {activeTab === tab.key && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl animate-pulse -z-10"></div>
                    )}
                    
                    {/* Icon with enhanced styling */}
                    <span className={`text-base sm:text-lg md:text-xl transition-transform duration-300 ${
                      activeTab === tab.key 
                        ? 'scale-110 filter ' 
                        : 'group-hover:scale-105 group-hover:rotate-3'
                    }`}>
                      {tab.icon}
                    </span>
                    
                    {/* Text with enhanced typography - Hidden on small screens, shown on larger */}
                    <span className={`hidden sm:inline font-light text-xs sm:text-sm md:text-base tracking-wide transition-colors duration-300 ${
                      activeTab === tab.key 
                        ? 'font-medium' 
                        : ''
                    }`}>
                      {tab.label}
                    </span>
                    

                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div 
              ref={techStackRef}
              className={`min-h-[300px] sm:min-h-[350px] md:min-h-[400px] px-2 sm:px-4 md:px-0 transition-all duration-1000 ease-out ${
                isTechStackVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              {skillsByCategory[activeTab] && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 lg:gap-5 animate-fadeIn justify-items-center">
                  {skillsByCategory[activeTab].map((skill, index) => (
                    <div 
                      key={skill.name}
                      className="group relative w-full max-w-[100px] sm:max-w-[120px] md:max-w-[140px]"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      {/* Glass-like container - Responsive square shaped */}
                      <div className="relative aspect-square p-2 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-400/40 text-center overflow-hidden flex flex-col justify-center">
                        
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Glass reflection effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-xl md:rounded-2xl opacity-20"></div>
                        
                        {/* Content container */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                          {/* Tech Icon */}
                          <div className="mb-2 sm:mb-3 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                            <TechIconRenderer 
                              skillName={skill.name} 
                              size="48"
                              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                            />
                          </div>
                          
                          {/* Tech Name with Exo-2 font */}
                          <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-all duration-300 exo2-regular tracking-wide group-hover:tracking-wider text-center leading-tight">
                            {skill.name}
                          </span>
                        </div>
                        
                        {/* Hover glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>



          {/* Professional Experience - Enhanced Glass Design */}
          <div>
            <h3 className="text-2xl goldman-bold text-blue-600 mb-8 text-center">
              Professional Experience
            </h3>
            
            {/* Super Glassy Container */}
            <div 
              ref={experienceRef}
              className={`relative p-8 bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/30 hover:shadow-cyan-500/10 transition-all duration-1000 overflow-hidden ${
                isExperienceVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              
              {/* Multiple Glass Layers for Enhanced Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/3 via-blue-500/2 to-purple-500/3 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/2 rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 via-white/5 to-transparent rounded-t-3xl"></div>
              
              <div className="relative z-10">
                {experience.map((exp, index) => (
                  <div 
                    key={exp.id} 
                    className={`relative flex gap-6 pb-12 last:pb-0 group transition-all duration-700 ease-out ${
                      isExperienceVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transitionDelay: isExperienceVisible ? `${(index + 1) * 200}ms` : '0ms' }}
                  >
                    {/* Enhanced Timeline line */}
                    {index !== experience.length - 1 && (
                      <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/60 via-blue-400/40 to-cyan-400/60 shadow-sm shadow-cyan-400/20"></div>
                    )}
                    
                    {/* Enhanced Timeline dot */}
                    <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0 mt-3 shadow-lg shadow-cyan-400/30 group-hover:shadow-xl group-hover:shadow-cyan-400/40 transition-all duration-500">
                      <div className="absolute inset-0.5 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full"></div>
                      <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                    </div>
                    
                    {/* Enhanced Content */}
                    <div className="flex-1 group-hover:translate-x-1 transition-transform duration-300">
                      <div className="flex flex-col lg:flex-row justify-between items-start mb-4 gap-2">
                        <div className="flex-1">
                          <h4 className="text-xl md:text-2xl font-bold text-white exo2-bold mb-1 group-hover:text-cyan-100 transition-colors duration-300">
                            {exp.position}
                          </h4>
                          <p className="text-lg md:text-xl text-cyan-400 exo2-semibold font-medium group-hover:text-cyan-300 transition-colors duration-300">
                            {exp.company}
                          </p>
                          <p className="text-sm md:text-base text-gray-400 exo2-light mt-1 flex items-center group-hover:text-gray-300 transition-colors duration-300">
                            <svg className="w-4 h-4 mr-2 text-cyan-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {exp.location}
                          </p>
                        </div>
                        <span className="text-gray-300 exo2-medium font-medium text-sm md:text-base px-3 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-300">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      
                      {/* Enhanced Description */}
                      <ul className="list-none space-y-3">
                        {exp.description.map((item, descIndex) => (
                          <li key={descIndex} className="relative pl-6 text-gray-200 exo2-regular leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                            <div className="absolute left-0 top-2 w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60"></div>
                            <span className="text-sm md:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Bottom highlight */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
