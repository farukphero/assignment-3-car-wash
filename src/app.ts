import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandle from './app/middlewares/error-handling';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('E-commerce with express start.');
});

// handle global error
app.use(globalErrorHandle);
app.use(notFound);
export default app;
