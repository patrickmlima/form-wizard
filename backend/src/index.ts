import express, { Express, Request, Response } from 'express';

import { appConfig } from './config';
import routes from './routes';

const port = appConfig.server.port;
const host = appConfig.server.host;

const app: Express = express();
app.use(express.json());

app.get('/health-check', (_: Request, res: Response) => {
  res.status(204).json();
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
