import React from 'react';
import Image from 'next/image';
import { personalInfo } from '@/lib/data';
import Button from '@/components/ui/Button';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8">
            <Image
              src="/images/profile/avatar.jpg"
              alt={personalInfo.name}
              width={128}
              height={128}
              className="rounded-full mx-auto mb-6 shadow-lg border-4 border-white/20"
              priority
            />
          </div>

          {/* Main Content */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Hi, I&apos;m <span className="text-blue-400">{personalInfo.name}</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-gray-300 mb-8">
            {personalInfo.title}
          </h2>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            {personalInfo.bio}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="#projects"
              variant="primary"
              size="lg"
              className="px-8"
            >
              View My Projects
            </Button>
            <Button
              href="#contact"
              variant="outline"
              size="lg"
              className="px-8"
            >
              Get In Touch
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
