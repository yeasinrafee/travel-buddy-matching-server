import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.registerUserZodValidation),
  UserController.registerUser
);

router.get('/profile', UserController.getUser);

router.put(
  '/profile',
  validateRequest(UserValidation.updateUserZodValidation),
  UserController.updateUserIntoDB
);

export const UserRouter = router;
