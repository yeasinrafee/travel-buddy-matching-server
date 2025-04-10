import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import status from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(status.UNAUTHORIZED, 'Unauthorized access!');
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      if (!verifiedUser) {
        throw new ApiError(status.UNAUTHORIZED, 'Unauthorized access!');
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
