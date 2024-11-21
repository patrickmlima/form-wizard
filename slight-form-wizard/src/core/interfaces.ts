export type SlightFormWizardFieldError = {
  field: string;
  message: string;
};

export class SlightFormWizardError extends Error {
  errors: SlightFormWizardFieldError[] = [];

  constructor(errors: SlightFormWizardFieldError[]) {
    super();
    this.errors = errors;
  }
}
