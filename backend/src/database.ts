import mongoose from 'mongoose';

import { appConfig } from './config';

const { dbHost, dbPort, dbName } = appConfig.db;

mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

const genericObjectSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, { strict: false });

export const FormDataModel = mongoose.model('FormData', genericObjectSchema);
