import { useState, useEffect } from 'react';

export const useFormStore = (key: string, initialData: Record<string, any>) => {
  // Load initial data from localStorage
  const loadPersistedData = (): Record<string, any> => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading persisted form data:', error);
    }
    return initialData;
  };

  const [data, setData] = useState(loadPersistedData);
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    try {
      const saved = localStorage.getItem(`${key}_step`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Persist data whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(`${key}_step`, currentStepIndex.toString());
    } catch (error) {
      console.error('Error persisting form data:', error);
    }
  }, [data, currentStepIndex, key]);

  const clearPersistedData = () => {
    try {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_step`);
      setData(initialData);
      setCurrentStepIndex(0);
    } catch (error) {
      console.error('Error clearing persisted form data:', error);
    }
  };

  return {
    data,
    setData,
    currentStepIndex,
    setCurrentStepIndex,
    clearPersistedData,
  };
};
