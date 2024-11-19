import SlightFormWizard from './components/SlightFormWizard';
import { FormStep } from './core/types';

const App = () => {
  const steps: FormStep[] = [
    { id: 'step1', title: 'First one', component: () => (<div>This is the one</div>), validationSchema: { validate: () => true}},
    { id: 'step2', title: 'Second one', component: () => (<div>This is the other</div>), validationSchema: { validate: () => true}},
  ]
  return <SlightFormWizard steps={steps} onComplete={() => {}} key={'form-wizard'}></SlightFormWizard>;
};

export default App;
