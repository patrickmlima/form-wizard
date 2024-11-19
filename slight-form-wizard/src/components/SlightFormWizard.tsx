import React, { useState } from 'react';
import { FormWizardProps } from '../core/types';
import FormHeader from './FormHeader/FormHeader';
import FormCard from './FormCard/FormCard';
import FormFooter from './FormFooter/FormFooter';

const SlightFormWizard: React.FC<FormWizardProps> = ({ steps, onComplete, initialData = {} }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState(initialData);

  const currentStep = steps[currentStepIndex];
  const StepComponent = currentStep?.component;

  const handleDataChange = (newData: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = async () => {
    if (currentStep.validationSchema) {
      try {
        await currentStep.validationSchema.validate(formData);
      } catch (error) {
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

  return (
    <FormCard>
      <FormHeader currentStep={currentStep} currentStepIndex={currentStepIndex} steps={steps} />

      {StepComponent && (
      <section >
        <StepComponent
          data={formData}
          onDataChange={handleDataChange}
          onStepSubmit={handleNext}
          onStepBack={handleBack}
          isLastStep={currentStepIndex === steps.length - 1}
          isFirstStep={currentStepIndex === 0}
        />
      </section>)
      }

      <FormFooter currentStepIndex={currentStepIndex} steps={steps} handleBack={handleBack} handleNext={handleNext}/>
    </FormCard>
  );
};

export default SlightFormWizard;
