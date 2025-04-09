import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundErrorHandler from './app/middlewares/notFoundErrorHandler';
import zodErrorHandler from './app/middlewares/zodErrorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', router);

app.use(notFoundErrorHandler);
app.use(zodErrorHandler);
app.use(globalErrorHandler);

app.get('/', (_req: Request, res: Response) => {
  res.send({
    message: 'Hello from travel buddy batching server!',
  });
});

export default app;
