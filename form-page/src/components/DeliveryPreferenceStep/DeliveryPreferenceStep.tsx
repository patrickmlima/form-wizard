import React from 'react';
import { FormStepProps } from 'slight-form-wizard';

import './DeliveryPreferenceStep.css';

const DeliveryPreferenceStep: React.FC<FormStepProps> = ({ stepData, onUpdateStepData }) => {
  enum DeliveryPreferredTime {
    MORNING = 'morning',
    AFTERNOON = 'afternoon',
    EVENING = 'evening',
  }

  const handleChange = (key: string, value: any) => {
    onUpdateStepData({ [key]: value })
  }

  return (
    <>
      <div className="form-row">
        <label htmlFor='form_delivery-addr'>Delivery address</label>
        <input
          id="form_delivery-addr"
          name="delivery-address"
          type="text"
          value={stepData.data.deliveryAddress || ''}
          onChange={(event) => handleChange('deliveryAddress', event.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Prefered Time</label>
        <div className="preferred-time-row">
          {
            Object.entries(DeliveryPreferredTime).map(([key, value]) => (
              <>
                <input
                  key={`form_delivery_preferred_time_${key}`}
                  id={`form_delivery-preferred-time_${key}`}
                  name="preferred-time"
                  type="radio"
                  value={value}
                  checked={stepData.data.preferredTime === value}
                  onChange={(event) => handleChange('preferredTime', event.target.value)}
                />
                <label htmlFor={`form_delivery-preferred-time_${key}`}
                  key={`form_delivery_preferred_time_label_${key}`}
                  id={`form_delivery-preferred-time-label_${key}`}>
                  {value}
                </label>
              </>
            ))
          }
        </div>
        <div className="form-row">
          <label htmlFor='form_special_instructions'>Special Instructions</label>
          <textarea
            id="form_special_instructions"
            name="specialInstructions"
            value={stepData.data.specialInstructions || ''}
            onChange={(event) => handleChange('specialInstructions', event.target.value)}
          />
        </div>
      </div >
    </>
  );
};

export default DeliveryPreferenceStep;
