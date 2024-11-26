import { z } from 'zod';

import { DeliveryPreferredTime } from './enums';

export const clientDeliverySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1).email(),
  deliveryAddress: z.string().min(1),
  preferredTime: z.nativeEnum(DeliveryPreferredTime),
  specialInstructions: z.string().optional(),
});