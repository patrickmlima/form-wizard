import SlightFormWizard, { FormStep, StepData } from 'slight-form-wizard';

import './App.css'
import PersonalInfoStep from './components/PersonalInfoStep/PersonalInfoStep';
import DeliveryPreferenceStep from './components/DeliveryPreferenceStep/DeliveryPreferenceStep';
import { validatePersonalInfo, validateDeliveryPreference } from './core/validation';
import { ClientDeliveryService } from './services/ClientDelivery.service';

function App() {
  const steps: FormStep[] = [
    { id: 'personal', title: 'Personal Information', component: PersonalInfoStep, validationSchema: validatePersonalInfo },
    { id: 'address', title: 'Delivery Preferences', component: DeliveryPreferenceStep, validationSchema: validateDeliveryPreference }
  ]

  const handleFormSubmit = async (allData: StepData[]) => {
    const mappedData: Record<string, any> = allData.reduce((formData, step) => ({
      ...formData,
      ...step.data,
    }), {});

    try {
      const clientDeliveryService = new ClientDeliveryService();
      await clientDeliveryService.saveData(mappedData);
      const msg = `Successfully saved data for client ${mappedData.firstName}`;
      window.alert(msg);
    } catch (error: any) {
      window.alert(`Error submitting data ${error?.message ?? ''}`)
      console.error('Error submit ', error);
      throw error;
    }
  }

  return (<>
    <h3>Fill-in the form required attributes</h3>
    <SlightFormWizard steps={steps} allowRevision={true} storeKey='user-form-data' onComplete={handleFormSubmit}></SlightFormWizard>
  </>)
}

export default App
