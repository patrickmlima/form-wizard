import React from 'react';
import { FormStep } from '../../core/types';
import './FormFooter.css';

export type FormFooterProps = {
  currentStepIndex: number;
  handleBack: () => void;
  handleNext: () => void;
  steps: FormStep[];
  allowRevision?: boolean;
};

const FormFooter: React.FC<FormFooterProps> = ({
  currentStepIndex,
  handleBack,
  handleNext,
  steps,
  allowRevision,
}) => {
  const getNextButtonLabel = (): string => {
    const isLastStep = currentStepIndex === steps.length - 1;
    const isReviewStep = currentStepIndex === steps.length;
    if (isLastStep) {
      if (allowRevision) {
        return 'Review';
      }
      return 'Complete';
    }
    if (allowRevision) {
      if (isReviewStep) {
        return 'Complete';
      }
    }
    return 'Next';
  };
  return (
    <section className="form-footer">
      <button className="button secondary" onClick={handleBack} disabled={currentStepIndex === 0}>
        Back
      </button>
      <button className="button primary" onClick={handleNext}>
        {getNextButtonLabel()}
      </button>
    </section>
  );
};

export default FormFooter;
