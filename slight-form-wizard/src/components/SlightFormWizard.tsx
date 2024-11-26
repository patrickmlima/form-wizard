import React, { useCallback } from 'react';

import { SlightFormWizardError } from '../core/interfaces';
import { FormWizardProps, StepData } from '../core/types';
import { useFormStore } from '../hooks/formStore';
import FormCard from './FormCard/FormCard';
import FormFooter from './FormFooter/FormFooter';
import FormHeader from './FormHeader/FormHeader';
import FormReviewStep from './FormReview/FormReviewStep';

import './SlightFormWizard.css';

const SlightFormWizard: React.FC<FormWizardProps> = ({
  steps,
  onComplete,
  initialData = [],
  storeKey = 'slight-form-wizard',
  allowRevision,
}) => {
  const {
    data: formData,
    currentStepIndex,
    setCurrentStepIndex,
    updateStepData,
    clearPersistedData,
  } = useFormStore(storeKey, initialData, steps);

  const currentStep = steps[currentStepIndex];
  const StepComponent = currentStep?.component;

  const validateCurrentStep = useCallback(async () => {
    const currentStep = steps[currentStepIndex];
    const currentStepData = formData[currentStepIndex];

    if (currentStep.validationSchema) {
      try {
        await currentStep.validationSchema(currentStepData, formData);

        updateStepData(currentStepIndex, {
          isComplete: true,
          errors: {},
        });

        return true;
      } catch (error: any) {
        let errorsRecord: Record<string, string> = { general: error.message };
        if (error instanceof SlightFormWizardError) {
          errorsRecord = error.errors.reduce(
            (obj, err) => ({ ...obj, [err.field]: err.message }),
            {}
          );
        }
        updateStepData(currentStepIndex, {
          isComplete: false,
          errors: errorsRecord,
        });
        return false;
      }
    }
    return true;
  }, [steps, currentStepIndex, formData, updateStepData]);

  const onUpdateStepData = (newData: StepData['data']) => {
    const currentStepData = formData[currentStepIndex];
    const updated: StepData = {
      ...currentStepData,
      data: {
        ...currentStepData.data,
        ...newData,
      },
      errors: {},
    };
    updateStepData(currentStepIndex, updated);
  };

  const handleNext = useCallback(async () => {
    const isValid = isReviewStep() ? true : await validateCurrentStep();

    if (isValid) {
      if (currentStepIndex < steps.length - (allowRevision ? 0 : 1)) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        onComplete(formData);
        clearPersistedData();
      }
    }
  }, [validateCurrentStep, currentStepIndex, steps.length, onComplete, clearPersistedData]);

  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  const handleSetIndex = (index: number) => {
    if (index < currentStepIndex) {
      setCurrentStepIndex(index);
    }
  };

  const isReviewStep = () => currentStepIndex === steps.length;

  return (
    <FormCard>
      <FormHeader
        key="form-header-comp"
        currentStep={currentStep}
        currentStepIndex={currentStepIndex}
        steps={steps}
        setCurrentStepIndex={handleSetIndex}
        allowRevision={allowRevision}
      />

      {StepComponent && (
        <section key="form-content-section" className="form-content-section">
          {Object.keys(formData[currentStepIndex]?.errors ?? {}).length > 0 && (
            <div className="alert-card">
              <ul className="alert-list">
                {Object.entries(formData[currentStepIndex]?.errors ?? {}).map(([field, error]) => {
                  return <li key={field}>{error}</li>;
                })}
              </ul>
            </div>
          )}
          <StepComponent
            stepData={formData[currentStepIndex]}
            allData={formData}
            onUpdateStepData={onUpdateStepData}
            onStepSubmit={handleNext}
            onStepBack={handleBack}
            onSetStep={handleSetIndex}
            isLastStep={currentStepIndex === steps.length - 1}
            isFirstStep={currentStepIndex === 0}
          />
        </section>
      )}

      {isReviewStep() && (
        <FormReviewStep
          key="form-review-comp"
          steps={steps}
          allData={formData}
          onSetFormStep={handleSetIndex}
        ></FormReviewStep>
      )}

      <FormFooter
        key="form-footer-comp"
        currentStepIndex={currentStepIndex}
        steps={steps}
        handleBack={handleBack}
        handleNext={handleNext}
        allowRevision={allowRevision}
      />
    </FormCard>
  );
};

export default SlightFormWizard;
