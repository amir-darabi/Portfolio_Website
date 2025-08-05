'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../styles/fonts.css';
import { personalInfo, navigationLinks } from '@/lib/data';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showDesktopNav, setShowDesktopNav] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingProgrammatically = useRef(false);

  // Helper function to clear timeout
  const clearExistingTimeout = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  }, []);

  // Track scroll and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Show navbar when scrolling
      setShowDesktopNav(true);
      
      // Clear existing timeout
      clearExistingTimeout();
      
      // Hide navbar after 3 seconds of no scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setShowDesktopNav(false);
      }, 3000);
      
      // Skip section detection during programmatic scrolling, but allow it to continue
      // We just don't want to re-highlight the same section that was already clicked
      if (!isScrollingProgrammatically.current) {
        const sections = navigationLinks.map(item => {
          const section = document.querySelector(item.href) as HTMLElement;
          if (section) {
            return {
              id: item.id,
              offset: section.getBoundingClientRect().top + window.scrollY - 550,
              height: section.offsetHeight
            };
          }
          return null;
        }).filter((section): section is NonNullable<typeof section> => section !== null);

        const currentPosition = window.scrollY;
        const active = sections.find(section => 
          currentPosition >= section.offset && 
          currentPosition < section.offset + section.height
        );

        if (active) {
          setActiveSection(active.id);
        }
      } else {
        // During programmatic scrolling, still detect sections but avoid double highlighting
        const sections = navigationLinks.map(item => {
          const section = document.querySelector(item.href) as HTMLElement;
          if (section) {
            return {
              id: item.id,
              offset: section.getBoundingClientRect().top + window.scrollY - 550,
              height: section.offsetHeight
            };
          }
          return null;
        }).filter((section): section is NonNullable<typeof section> => section !== null);

        const currentPosition = window.scrollY;
        const active = sections.find(section => 
          currentPosition >= section.offset && 
          currentPosition < section.offset + section.height
        );

        if (active && active.id !== activeSection) {
          setActiveSection(active.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearExistingTimeout();
    };
  }, [clearExistingTimeout, activeSection]);

  // Add mouse move listener for left side hover
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar when mouse is within 100px of the left edge
      if (e.clientX <= 100) {
        setShowDesktopNav(true);
        
        // Clear any existing hide timeout
        clearExistingTimeout();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [clearExistingTimeout]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Smooth scrolling function
  const scrollToSection = (e: React.MouseEvent, href: string, id: string) => {
    e.preventDefault();
    
    // Flag that we're scrolling programmatically
    isScrollingProgrammatically.current = true;
    
    const section = document.querySelector(href);
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top,
        behavior: "smooth"
      });
      
      // Reset the flag after scroll animation completes (approximately 1 second)
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 1000);
    } else {
      // If section not found, reset flag immediately
      isScrollingProgrammatically.current = false;
    }
    
    setIsOpen(false); // Close mobile menu after navigation
  };

  // Helper function to get icon for each navigation item
  const getNavIcon = (id: string) => {
    switch (id) {
      case 'home':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'about':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'projects':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'contact':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Desktop Navigation - Vertical Left Sidebar */}
      <nav 
        className={`hidden md:block fixed left-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ease-in-out ${
          showDesktopNav 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 -translate-x-full"
        }`}
        onMouseEnter={() => setShowDesktopNav(true)}
        onMouseLeave={() => {
          // Start hide timer when mouse leaves navbar
          clearExistingTimeout();
          scrollTimeoutRef.current = setTimeout(() => {
            setShowDesktopNav(false);
          }, 2000);
        }}
      >
        <div className={`rounded-2xl transition-all duration-500 p-4 ${
          scrolled
            ? "bg-[#030014]/80 backdrop-blur-xl border border-blue-500/10 shadow-lg"
            : "bg-[#030014]/20 backdrop-blur-md border border-white/10"
        }`}>
          <div className="flex flex-col space-y-6">
            {/* Logo */}
            <button
              onClick={(e) => scrollToSection(e, "#home", "home")}
              className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4 p-2"
              style={{ fontFamily: 'var(--font-goldman)' }}
              title="Home"
            >
              AD
            </button>

            {/* Navigation Icons */}
            {navigationLinks.map((item) => (
              <button
                key={item.id}
                onClick={(e) => scrollToSection(e, item.href, item.id)}
                className={`group relative p-3 rounded-xl transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                title={item.label}
              >
                <div className={`transition-all duration-300 ${
                  activeSection === item.id 
                    ? "text-blue-400 scale-110" 
                    : "group-hover:scale-110"
                }`}>
                  {getNavIcon(item.id)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Full Width */}
      <nav className="md:hidden fixed w-full top-0 z-50 transition-all duration-500">
        <div 
          className={`w-full transition-all duration-500 ${
            isOpen
              ? "bg-[#030014] border-b border-blue-500/20"
              : scrolled
              ? "bg-[#030014]/80 backdrop-blur-xl border-b border-blue-500/10 shadow-lg"
              : "bg-[#030014]/20 backdrop-blur-md border-b border-white/10"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={(e) => scrollToSection(e, "#home", "home")}
                className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-goldman)' }}
              >
                {personalInfo.name}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative p-2 text-gray-300 hover:text-white transition-transform duration-300 ease-in-out transform focus:outline-none ${
                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
              }`}
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="px-4 py-6 space-y-4">
              {navigationLinks.map((item, index) => (
                <button
                  key={item.id}
                  onClick={(e) => scrollToSection(e, item.href, item.id)}
                  className={`flex items-center gap-4 w-full text-left px-4 py-3 text-lg font-medium transition-all duration-300 ease rounded-xl ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transform: isOpen ? "translateX(0)" : "translateX(50px)",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className={`${
                    activeSection === item.id 
                      ? "text-blue-400" 
                      : "text-gray-400"
                  }`}>
                    {getNavIcon(item.id)}
                  </div>
                  <span className={`${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold"
                      : ""
                  }`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
