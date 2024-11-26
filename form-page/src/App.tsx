import SlightFormWizard, { FormStep, StepData } from 'slight-form-wizard';

import './App.css'
import PersonalInfoStep from './components/PersonalInfoStep/PersonalInfoStep';
import DeliveryPreferenceStep from './components/DeliveryPreferenceStep/DeliveryPreferenceStep';
import { validatePersonalInfo, validateDeliveryPreference } from './core/validation';

function App() {
  const steps: FormStep[] = [
    { id: 'personal', title: 'Personal Information', component: PersonalInfoStep, validationSchema: validatePersonalInfo },
    { id: 'address', title: 'Delivery Preferences', component: DeliveryPreferenceStep, validationSchema: validateDeliveryPreference }
  ]

  const handleFormSubmit = async (allData: StepData[]) => {
    const mappedData = allData.reduce((formData, step) => ({
      ...formData,
      ...step.data,
    }), {});

    try {
      

      window.alert('Success!');
    } catch (error: any) {
      window.alert(`Error submitting data ${error?.message ?? ''}`)
      console.error('Error submit')
      throw error;
    }
    console.log('will submit here')
  }

  return (<>
    <h3>Fill-in the form required attributes</h3>
    <SlightFormWizard steps={steps} allowRevision={true} storeKey='user-form-data' onComplete={handleFormSubmit}></SlightFormWizard>
  </>)
}

export default App
