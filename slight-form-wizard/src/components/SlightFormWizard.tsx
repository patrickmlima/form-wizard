import React, { useState } from 'react';

import { FormWizardProps } from '../core/types';
import FormHeader from './FormHeader/FormHeader';
import FormCard from './FormCard/FormCard';
import FormFooter from './FormFooter/FormFooter';
import { useFormStore } from '../hooks/formStore';
import { SlightFormWizardError } from '../core/interfaces';
import './SlightFormWizard.css';

const SlightFormWizard: React.FC<FormWizardProps> = ({
  steps,
  onComplete,
  initialData = {},
  storeKey = 'slight-form-wizard',
}) => {
  const {
    data: formData,
    setData: setFormData,
    currentStepIndex,
    setCurrentStepIndex,
  } = useFormStore(storeKey, initialData);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStep = steps[currentStepIndex];
  const StepComponent = currentStep?.component;

  const handleDataChange = (newData: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...newData }));
    setErrors({});
  };

  const handleNext = async () => {
    if (currentStep.validationSchema) {
      try {
        await currentStep.validationSchema(formData);
        setErrors({});
      } catch (error: any) {
        if (error instanceof SlightFormWizardError) {
          const mapped = (error as SlightFormWizardError).errors.reduce(
            (res, item) => ({
              ...res,
              [item.field]: item.message,
            }),
            {}
          );
          setErrors(mapped);
          return;
        }
        setErrors({ general: error.message });
        return;
      }
    }

    if (currentStepIndex === steps.length - 1) {
      onComplete(formData);
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStepIndex(prev => prev - 1);
  };

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
          {Object.keys(errors).length > 0 && (
            <div className="alert-card">
              <ul className="alert-list">
                {Object.entries(errors).map(([field, error]) => {
                  return <li key={field}>{error}</li>;
                })}
              </ul>
            </div>
          )}
          <StepComponent
            data={formData}
            allData={formData}
            onDataChange={handleDataChange}
            onStepSubmit={handleNext}
            onStepBack={handleBack}
            isLastStep={currentStepIndex === steps.length - 1}
            isFirstStep={currentStepIndex === 0}
            errors={errors}
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
