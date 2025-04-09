import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import status from 'http-status';
import { ZodError } from 'zod';

const zodErrorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ZodError) {
    const issues = err.errors.map((er) => ({
      field: er?.path[er.path.length - 1],
      message: er.message,
    }));

    res.status(status.BAD_REQUEST).json({
      success: false,
      message: issues.map((i) => i.message).join(' '),
      errorDetails: {
        issues,
      },
    });
    return;
  }
  next(err);
};

export default zodErrorHandler;
