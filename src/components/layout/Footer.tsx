'use client';

import React from 'react';
import { personalInfo } from '@/lib/data';
import Button from '@/components/ui/Button';
import '../../styles/fonts.css';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black/60 backdrop-blur-sm text-white py-6 border-t border-white/10 shadow-2xl shadow-black/50" style={{ overscrollBehavior: 'none' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between space-x-4" >
          <p className="text-gray-300 rajdhani-medium text-sm md:text-base">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <Button
            onClick={scrollToTop}
            variant="primary"
            size="sm"
            className="flex-shrink-0"
            aria-label="Back to top"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
