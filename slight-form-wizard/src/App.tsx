import SlightFormWizard from './components/SlightFormWizard';
import { FormStep } from './core/types';
import AccountTypeStep from './example/AccountTypeStep';
import BusinessDetailsStep from './example/BusinessDetailStep';

const App = () => {
  const steps: FormStep[] = [
    {
      id: 'step1',
      title: 'Account Type',
      component: AccountTypeStep,
      validationSchema: async () => true,
    },
    {
      id: 'step2',
      title: 'Business Detail',
      component: BusinessDetailsStep,
      validationSchema: async () => true,
    },
  ];
  return (
    <SlightFormWizard
      steps={steps}
      onComplete={() => {
        console.log('should complete here');
      }}
      key="form-wizard"
      allowRevision={true}
    ></SlightFormWizard>
  );
};

export default App;
