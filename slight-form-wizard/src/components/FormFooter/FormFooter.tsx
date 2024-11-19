import React from 'react';
import { FormStep } from '../../core/types';
import './FormFooter.css';

export type FormFooterProps = {
  currentStepIndex: number;
  handleBack: () => void;
  handleNext: () => void;
  steps: FormStep[];
};

const FormFooter: React.FC<FormFooterProps> = ({
  currentStepIndex,
  handleBack,
  handleNext,
  steps,
}) => {
  return (
    <section className="form-footer">
      <button className="button secondary" onClick={handleBack} disabled={currentStepIndex === 0}>
        Back
      </button>
      <button className="button primary" onClick={handleNext}>
        {currentStepIndex === steps.length - 1 ? 'Complete' : 'Next'}
      </button>
    </section>
  );
};

export default FormFooter;
