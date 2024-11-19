import React from 'react';

export type FormStepProps = {
  data: Record<string, any>;
  onDataChange: (newData: Record<string, any>) => void;
  onStepSubmit: () => void;
  onStepBack: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
};

export type FormStep = {
  id: string;
  title: string;
  validationSchema: any;
  component: React.ComponentType<FormStepProps>;
};

export type FormWizardProps = {
  steps: FormStep[];
  onComplete: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
};
