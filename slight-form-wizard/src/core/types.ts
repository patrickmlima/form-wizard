import React from 'react';

export type FormStepProps = {
  data: Record<string, any>;
  allData: Record<string, any>;
  onDataChange: (newData: Record<string, any>) => void;
  onStepSubmit: () => void;
  onStepBack: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  errors?: Record<string, any>;
};

export type FormStep = {
  id: string;
  title: string;
  validationSchema?: (data: Record<string, any>) => Promise<unknown>;
  component: React.ComponentType<FormStepProps>;
};

export type FormWizardProps = {
  steps: FormStep[];
  onComplete: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
  storeKey?: string;
};
