import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import status from 'http-status';

const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(status.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err?.message || 'Something went wrong!',
    errorDetails: err,
  });
};

export default globalErrorHandler;
