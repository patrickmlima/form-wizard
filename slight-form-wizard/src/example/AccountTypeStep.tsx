import { FormStepProps } from '../core/types';

const AccountTypeStep: React.FC<FormStepProps> = ({ stepData, onUpdateStepData }) => {
  return (
    <div>
      <select
        value={stepData.data.accountType || ''}
        onChange={e => onUpdateStepData({ accountType: e.target.value })}
      >
        <option value="">Select Account Type</option>
        <option value="personal">Personal</option>
        <option value="business">Business</option>
      </select>
    </div>
  );
};

export default AccountTypeStep;
