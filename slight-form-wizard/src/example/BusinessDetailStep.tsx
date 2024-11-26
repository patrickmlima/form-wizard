import { FormStepProps } from '../core/types';

const BusinessDetailsStep: React.FC<FormStepProps> = ({ stepData, allData, onUpdateStepData }) => {
  const accountType = allData.find(step =>
    Object.keys(step.data).find(key => key === 'accountType')
  )?.data?.accountType;
  if (accountType !== 'business') {
    return <div>Only required for business accounts</div>;
  }

  return (
    <div className="row">
      <input
        type="text"
        value={stepData.data.companyName || ''}
        onChange={e => onUpdateStepData({ companyName: e.target.value })}
        placeholder="Company Name"
      />
      <input
        type="text"
        value={stepData.data.taxId || ''}
        onChange={e => onUpdateStepData({ taxId: e.target.value })}
        placeholder="Tax ID"
      />
    </div>
  );
};

export default BusinessDetailsStep;
