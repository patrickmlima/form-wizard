import SlightFormWizard, { FormStep } from 'slight-form-wizard';

import './App.css'
import PersonalInfoStep from './components/PersonalInfoStep/PersonalInfoStep';
import DeliveryPreferenceStep from './components/DeliveryPreferenceStep/DeliveryPreferenceStep';

function App() {
  const steps: FormStep[] = [
    { id: 'personal', title: 'Personal Information', component: PersonalInfoStep },
    { id: 'address', title: 'Delivery Preferences', component: DeliveryPreferenceStep }
  ]

  const handleFormSubmit = () => {
    console.log('will submit here')
  }

  return (<>
    <h3>Fill-in the form required attributes</h3>
    <SlightFormWizard steps={steps} allowRevision={true} storeKey='user-form-data' onComplete={handleFormSubmit}></SlightFormWizard>
  </>)
}

export default App
