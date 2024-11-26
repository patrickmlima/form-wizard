import { FormStepProps } from 'slight-form-wizard';
import './PersonalInfoStep.css'

const PersonalInfoStep: React.FC<FormStepProps> = ({ stepData, onUpdateStepData }) => {
  return (
    <div className="personal-info-wrapper">
      <label>First name</label>
      <input
        id="form_first-name"
        name="first-name"
        type="text"
        value={stepData.data.firstName || ''}
        onChange={e => onUpdateStepData({ firstName: e.target.value })}
      />

      <label>Last name</label>
      <input
        id="form_last-name"
        name="last-name"
        type="text"
        value={stepData.data.lastName || ''}
        onChange={e => onUpdateStepData({ lastName: e.target.value })}
      />

      <label>E-mail</label>
      <input
        id="form_email"
        name="email"
        type="email"
        value={stepData.data.email || ''}
        onChange={e => onUpdateStepData({ email: e.target.value })}
      />
    </div>
  );
};

export default PersonalInfoStep;