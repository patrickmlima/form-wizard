import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import { readSwaggerFile } from './utils/swagger.util';
import { createClientDeliveryController, createFormRegistryController, listFormRegistriesController } from './controllers';

const router = Router();


readSwaggerFile().then((docs) => {
  router.use('/spec', swaggerUi.serve);
  router.get('/spec', swaggerUi.setup(docs as swaggerUi.JsonObject));
});

router.post('/forms', createFormRegistryController);

router.get('/forms', listFormRegistriesController);

router.post('/clients', createClientDeliveryController);

export default router;
