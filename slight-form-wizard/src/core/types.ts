import React from 'react';

export type StepData = {
  id: string;
  data: Record<string, any>;
  isComplete: boolean;
  errors?: Record<string, string>;
}

export type FormStepProps = {
  stepData: StepData;
  allData: StepData[];
  onUpdateStepData: (updates: StepData['data']) => void;
  onStepSubmit: () => void;
  onStepBack: () => void;
  onSetStep: (index: number) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
};

export type FormStep = {
  id: string;
  title: string;
  validationSchema?: (stepData: StepData, allData?: StepData[]) => Promise<unknown>;
  component: React.ComponentType<FormStepProps>;
};

export type FormWizardProps = {
  steps: FormStep[];
  onComplete: (data: Record<string, any>) => void;
  initialData?: StepData[];
  storeKey?: string;
};
