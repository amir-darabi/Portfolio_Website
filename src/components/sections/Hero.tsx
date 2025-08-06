'use client'
import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import Button from '@/components/ui/Button';
import '../../styles/fonts.css';



const Home = () => {
  const [text, setText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const titleText = personalInfo.title;

  // Scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Download resume function
  const downloadResume = () => {
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = '/resume.md'; // Path to your resume file in public folder
    link.download = 'Amir_Darabi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let isTyping = true;

    const timer = setInterval(() => {
      if (isTyping) {
        if (!isDeleting) {
          setText(titleText.slice(0, index));
          index++;
          if (index > titleText.length) {
            isTyping = false;
            setTimeout(() => {
              isDeleting = true;
              isTyping = true;
            }, 2000); // Pause before deleting
          }
        } else {
          setText(titleText.slice(0, index));
          index--;
          if (index === 0) {
            isDeleting = false;
            setTimeout(() => {
              isTyping = true;
            }, 500); // Short pause before retyping
          }
        }
      }
    }, isDeleting ? 100 : 150); // Faster deletion than typing

    return () => clearInterval(timer);
  }, [titleText]);

  return (
    <section id="home" className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Main Content Container */}
      <div
        className={`container mx-auto px-8 py-12 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center md:justify-between gap-0 sm:gap-12 lg:gap-20">

          {/* Left Side - Text Content */}
          <div
            className="flex-1 text-center lg:text-left space-y-6 max-w-2xl animate-fade-in-left"
          >
            <div className="space-y-2 animate-fade-in-up">
              <p
                className="text-lg md:text-xl text-purple-300 goldman-regular tracking-wider animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                Hello, I&apos;m
              </p>

              <h1
                className="text-2xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent goldman-bold leading-tight animate-fade-in-scale"
                style={{ animationDelay: '0.4s' }}
              >
                {personalInfo.name}
              </h1>

              <div
                className="text-xl md:text-2xl lg:text-3xl text-cyan-300 orbitron-regular animate-fade-in-right"
                style={{ animationDelay: '0.6s' }}
              >
                {/* Typing Effect */}
                <div className="h-8 flex items-center">
                  <span className="text-xl md:text-2xl text-cyan-300 font-light goldman-regular">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>
              </div>
            </div>

            <p
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '0.8s' }}
            >
              {personalInfo.bio}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: '1s' }}
            >
              <Button
                onClick={downloadResume}
                variant="outline"
              >
                <span className="flex items-center gap-2">
                  <Download size={20} />
                  Resume
                </span>
              </Button>

              <Button
                onClick={scrollToProjects}
                variant="outline"
              >
                View My Work
              </Button>
            </div>

            {/* Social Links */}
            <div
              className="flex gap-6 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: '1.2s' }}
            >
              {[
                { icon: Github, href: personalInfo.socialLinks.github, label: "GitHub" },
                { icon: Linkedin, href: personalInfo.socialLinks.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" }
              ].map(({ icon: IconComponent, href, label }, index) => {
                const Icon = IconComponent;
                return (
                  <a
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel={label !== "Email" ? "noopener noreferrer" : undefined}
                    className="p-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl text-white hover:bg-gray-800/50 hover:border-purple-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 animate-fade-in-up"
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                    aria-label={label}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Side - Lottie Animation */}
          <div
            className="flex-1 flex justify-center items-center animate-floating"
          >
            <div className="relative transition-transform duration-500 hover:scale-105">
              {/* Decorative rings around animation */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-slow-ping"></div>
              <div className="absolute inset-4 rounded-full border border-cyan-400/20 animate-slow-pulse"></div>

              {/* Lottie Animation Container */}
              <div
                className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 shadow-2xl shadow-purple-500/20"
              >
                <DotLottieReact
                  src="https://lottie.host/3eb66a13-773a-4d4f-a3dd-ec93e749aef9/DG8qZgiAA0.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-fade-in-up"
          style={{ animationDelay: '1.2s' }}
        >
          <div
            className="flex flex-col items-center text-white/60 hover:text-white transition-colors cursor-pointer animate-bounce-slow"
            onClick={scrollToAbout}
          >
            <span className="text-sm mb-2 goldman-regular">Scroll Down</span>
            <ChevronDown size={24} />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Home;