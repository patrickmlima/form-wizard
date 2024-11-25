import React from 'react';

import { FormStep } from '../../core/types';
import './FormHeader.css';

export type FormHeaderProps = {
  steps: FormStep[];
  currentStep: FormStep;
  currentStepIndex: number;
  setCurrentStepIndex?: (index: number) => void;
  allowRevision?: boolean;
};

const FormHeader: React.FC<FormHeaderProps> = ({
  steps,
  currentStep,
  currentStepIndex,
  setCurrentStepIndex,
  allowRevision,
}) => {
  return (
    <section className="form-header">
      <h2 className="form-header-title">{currentStep?.title ?? (allowRevision && 'Review')}</h2>
      <div className="form-header-steps">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`form-step-item ${
              index <= currentStepIndex ? 'active-step' : 'inactive-step'
            }`}
            onClick={() => setCurrentStepIndex && setCurrentStepIndex(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FormHeader;
