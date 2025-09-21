'use client';

import { useState, useEffect } from 'react';
import { useLoading } from '@/lib/LoadingContext';

const LoadingScreen = () => {
  const { setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [progressStyle] = useState(5); // 1-5 for different styles
  const [visibleWords, setVisibleWords] = useState(0);

  // Words that will appear one by one
  const words = ['Welcome', 'To', 'My', 'Portfolio', 'Website'];

  useEffect(() => {
    // Scroll to top immediately when component mounts
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';

    // Start showing words after icons appear
    setTimeout(() => {
      const wordTimer = setInterval(() => {
        setVisibleWords((prev) => {
          if (prev < words.length) {
            return prev + 1;
          }
          clearInterval(wordTimer);
          return prev;
        });
      }, 400); // Each word appears after 400ms
    }, 400); // Start after icons animation

    // Progress simulation
    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            // Start fade out
            setIsVisible(false);
            // Complete loading after fade transition
            setTimeout(() => {
              setIsComplete(true);
              setIsLoading(false); // Notify the context that loading is complete
              // Re-enable scrolling when loading is complete
              document.body.style.overflow = 'unset';
            }, 800); // Match the transition duration
          }, 500);
          return 100;
        }
        const nextProgress = prevProgress + Math.random() * 8;
        return Math.min(nextProgress, 100); // Ensure it never goes over 100
      });
    }, 150);

    return () => {
      clearInterval(progressTimer);
      // Re-enable scrolling on cleanup
      document.body.style.overflow = 'unset';
    };
  }, [words.length, setIsLoading]);

  if (isComplete) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-gradient-to-br from-black via-slate-900 to-slate-800 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
      }`}
    >      
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Welcome Text */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl space-y-2 sm:space-y-4">
              <div className="mb-2 sm:mb-4">
                {words.slice(0, 3).map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block px-1 sm:px-2 mr-1 sm:mr-2 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent goldman-bold animate-fadeInRight ${
                      index < visibleWords ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                      animationDelay: `${400 + index * 400}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
              <div>
                {words.slice(3).map((word, index) => (
                  <span
                    key={index + 3}
                    className={`inline-block px-1 sm:px-2 mr-1 sm:mr-2 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent goldman-bold animate-fadeInUp ${
                      index + 3 < visibleWords ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                      animationDelay: `${1600 + index * 400}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </h1>
          </div>

          {/* Progress Indicators */}
          <div className="mt-8 flex flex-col items-center space-y-4">

            {/*  Morphing Shape */}
            {progressStyle === 5 && (
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20" viewBox="0 0 80 80">
                  <defs>
                    <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  {/* Morphing shape based on progress */}
                  <path
                    d={`M40,10 
                        L${55 + (progress/100) * 10},25 
                        L${55 + (progress/100) * 10},55 
                        L40,${60 + (progress/100) * 10}
                        L${25 - (progress/100) * 10},55 
                        L${25 - (progress/100) * 10},25 Z`}
                    fill="url(#gradient5)"
                    className="transition-all duration-300 ease-out"
                    style={{
                      filter: `drop-shadow(0 2px ${3 + (progress/100) * 4}px rgba(6, 182, 212, 0.3))`
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{Math.round(progress)}%</span>
                </div>
              </div>
            )}

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
