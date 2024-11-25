import { useState, useEffect, useCallback } from 'react';
import { FormStep, StepData } from '../core/types';

export const useFormStore = (key: string, initialData: StepData[], steps: FormStep[]) => {
  const initializeStepsData = useCallback(() => {
    const idsList =
      initialData?.length > 0 ? initialData?.map(item => item.id) : steps.map(step => step.id);
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        const storedData = JSON.parse(savedData) as StepData[];

        return idsList.map(id => {
          const savedStepData = storedData.find(step => step.id === id);
          return (
            savedStepData || {
              id,
              data: {},
              isComplete: false,
              errors: {},
            }
          );
        });
      }
    } catch (error) {
      console.error('Error loading persisted form data:', error);
    }

    return idsList.map<StepData>(id => ({
      id,
      data: {},
      isComplete: false,
      errors: {},
    }));
  }, [key, initialData, steps]);

  const [data, setData] = useState<StepData[]>(initializeStepsData);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${key}_step`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(`${key}_step`, currentStepIndex.toString());
    } catch (error) {
      console.error('Error persisting form data:', error);
    }
  }, [data, currentStepIndex, key]);

  const updateStepData = useCallback((stepIndex: number, updates: Partial<StepData>) => {
    setData(current =>
      current.map((step, index) => (index === stepIndex ? { ...step, ...updates } : step))
    );
  }, []);

  const clearPersistedData = () => {
    try {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_step`);

      const idsList =
        initialData?.length > 0 ? initialData?.map(item => item.id) : steps.map(step => step.id);

      const initializedSteps = idsList.map(id => ({
        id: id,
        data: {},
        isComplete: false,
        errors: {},
      }));
      setData(initializedSteps);
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
    updateStepData,
    clearPersistedData,
  };
};
