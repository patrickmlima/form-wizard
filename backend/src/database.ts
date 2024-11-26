import mongoose from 'mongoose';

import { appConfig } from './config';
import { DeliveryPreferredTime } from './utils/enums';

const { dbHost, dbPort, dbName } = appConfig.db;

mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

const genericObjectSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, { strict: false });

export const FormDataModel = mongoose.model('FormData', genericObjectSchema);

const clientDeliverySchema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  lastName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  preferredTime: {
    type: mongoose.Schema.Types.String,
    required: true,
    enum: Object.values(DeliveryPreferredTime).map(item => item as string)
  },
  specialInstructions: {
    type: mongoose.Schema.Types.String,
    required: false,
  },
});

export const ClientDeliveryModel = mongoose.model('ClientDelivery', clientDeliverySchema);
