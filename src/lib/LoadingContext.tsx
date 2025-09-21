'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isLoadingComplete: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoadingComplete) {
      // Add a small delay before marking as complete to ensure smooth transition
      const timer = setTimeout(() => {
        setIsLoadingComplete(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isLoadingComplete]);

  const value = {
    isLoading,
    setIsLoading,
    isLoadingComplete,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};