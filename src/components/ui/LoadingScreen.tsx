'use client';

import { useState, useEffect } from 'react';
import { useLoading } from '@/lib/LoadingContext';

const LoadingScreen = () => {
  const { setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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

    let wordTimer: NodeJS.Timeout;

    // Start showing words after icons appear
    const wordTimeout = setTimeout(() => {
      wordTimer = setInterval(() => {
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
        const increment = Math.random() * 8 + 2; // Ensure minimum increment of 2
        const newProgress = Math.min(prevProgress + increment, 100);
        return newProgress;
      });
    }, 150);

    // Cleanup function
    return () => {
      clearTimeout(wordTimeout);
      clearInterval(wordTimer);
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

            {/* Digital Circuit */}
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(43, 120, 187, 1)" />
                  </linearGradient>
                </defs>
                
                {/* Circuit paths */}
                <g stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" fill="none">
                  <path d="M20,50 L40,50 L40,30 L60,30 L60,50 L80,50" />
                  <path d="M20,50 L40,50 L40,70 L60,70 L60,50 L80,50" />
                  <path d="M50,20 L50,80" />
                </g>
                
                {/* Animated progress path */}
                <path
                  d="M20,50 L40,50 L40,30 L60,30 L60,50 L80,50"
                  stroke="url(#gradient8)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progress}
                  className="transition-all duration-300"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' }}
                />
                
                {/* Circuit nodes */}
                {[{x: 20, y: 50}, {x: 40, y: 50}, {x: 40, y: 30}, {x: 60, y: 30}, {x: 60, y: 50}, {x: 80, y: 50}].map((node, i) => (
                  <circle
                    key={i}
                    cx={node.x}
                    cy={node.y}
                    r="3"
                    fill={progress > i * 16.67 ? "url(#gradient8)" : "rgba(59, 130, 246, 0.3)"}
                    className="transition-all duration-300"
                    style={{ filter: progress > i * 16.67 ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.8))' : 'none' }}
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-cyan-300">{Math.round(progress)}%</span>
              </div>
            </div>

          </div>

          
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
