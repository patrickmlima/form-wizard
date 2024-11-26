import { z, ZodError } from 'zod';
import type { SlightFormWizardFieldError, StepData } from "slight-form-wizard";
import { SlightFormWizardError } from 'slight-form-wizard';
import { DeliveryPreferredTime } from './enums';

const parseZodErrors = (error: ZodError): SlightFormWizardError => {
  const errorsMap: SlightFormWizardFieldError[] = error.errors.map<SlightFormWizardFieldError | undefined>((err) => {
    const key = err.path[0] as string;

    if (key) {
      return { field: key, message: `${key}: ${err?.message}` }
    }
    return undefined;
  }).filter(item => item !== undefined);

  return new SlightFormWizardError(errorsMap);
}

const validateData = (schema: z.AnyZodObject, stepData: StepData) => {
  try {
    schema.parse(stepData.data);
    return Promise.resolve();
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
      const newError = parseZodErrors(err);
      return Promise.reject(newError);
    }
    return Promise.reject(err);
  }
}

export const validatePersonalInfo = (stepData: StepData) => {
  const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().min(1).email(),
  });

  return validateData(schema, stepData);
}

export const validateDeliveryPreference = (stepData: StepData) => {
  const schema = z.object({
    deliveryAddress: z.string().min(1),
    preferredTime: z.nativeEnum(DeliveryPreferredTime),
    specialInstructions: z.string().optional(),
  });

  return validateData(schema, stepData);
}