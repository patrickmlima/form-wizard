import React from 'react';

import { FormStep, StepData } from '../../core/types';
import './FormReviewStep.css';

export type FormReviewProps = {
  allData: StepData[];
  steps: FormStep[];
  onSetFormStep: (index: number) => void;
};

const FormReviewStep: React.FC<FormReviewProps> = ({ allData, steps, onSetFormStep }) => {
  const camelCaseToWords = (camelString: string) => {
    return camelString.replace(/([A-Z])/g, ' $1').replace(/^./, match => match.toUpperCase());
  };

  return (
    <section className="form-step">
      {allData.map(({ data }, index) => {
        const formStep = steps[index];
        return (
          <div key={`form-section-${index}`} className="form-section">
            <div className="section-title">
              <h2>{formStep.title}</h2>
              <div className="title-actions">
                <button className="button outlined" onClick={() => onSetFormStep(index)}>
                  Edit
                </button>
              </div>
            </div>
            <div className="section-content">
              {Object.entries(data).map(([prop, value]) => (
                <p className="field-group" key={`form-section_${index}_${prop}`}>
                  <span className="field-name">
                    {(formStep?.keysLabelsDict && formStep.keysLabelsDict[prop]) ??
                      camelCaseToWords(prop)}
                    :{' '}
                  </span>
                  {value}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default FormReviewStep;
