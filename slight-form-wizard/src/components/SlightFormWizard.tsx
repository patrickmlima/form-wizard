import React, { useCallback } from 'react';

import { FormWizardProps, StepData } from '../core/types';
import FormHeader from './FormHeader/FormHeader';
import FormCard from './FormCard/FormCard';
import FormFooter from './FormFooter/FormFooter';
import { useFormStore } from '../hooks/formStore';
import './SlightFormWizard.css';
import { SlightFormWizardError } from '../core/interfaces';

const SlightFormWizard: React.FC<FormWizardProps> = ({
  steps,
  onComplete,
  initialData = [],
  storeKey = 'slight-form-wizard',
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
        await currentStep.validationSchema(
          currentStepData,
          formData,
        );
        
        updateStepData(currentStepIndex, { 
          isComplete: true, 
          errors: {} 
        });

        return true;
      } catch (error: any) {
        let errors: Record<string, string> = { general: error.message };
        if (error instanceof SlightFormWizardError) {
          errors = error.errors.reduce((obj, err) => ({ ...obj, [err.field]: err.message }));
        }
        updateStepData(currentStepIndex, { 
          isComplete: false, 
          errors: {}
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
    }
    updateStepData(currentStepIndex, updated)
  };

  const handleNext = useCallback(async () => {
    const isValid = await validateCurrentStep();
    console.log('is valid ', isValid)
    
    if (isValid) {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        // Final submission
        onComplete(formData);
        clearPersistedData();
      }
    }
  }, [
    validateCurrentStep, 
    currentStepIndex, 
    steps.length, 
    onComplete, 
    clearPersistedData
  ]);

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

  return (
    <FormCard>
      <FormHeader
        currentStep={currentStep}
        currentStepIndex={currentStepIndex}
        steps={steps}
        setCurrentStepIndex={handleSetIndex}
      />

      {StepComponent && (
        <section>
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

      <FormFooter
        currentStepIndex={currentStepIndex}
        steps={steps}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </FormCard>
  );
};

export default SlightFormWizard;
