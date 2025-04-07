import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundErrorHandler from './app/middlewares/notFoundErrorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

app.use(globalErrorHandler);
app.use(notFoundErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Hello from travel buddy batching server!',
  });
});

export default app;
