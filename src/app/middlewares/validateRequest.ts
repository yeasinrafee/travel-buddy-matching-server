import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (err: any) {
      //   const errors = err.errors.map((error: any) => error.message).join(', ');
      //   return res.status(400).json({
      //     success: false,
      //     message: errors,
      //   });
      next(err);
    }
  };
};

export default validateRequest;
