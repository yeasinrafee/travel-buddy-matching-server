import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';

// 1. Register User
const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await UserService.registerUser(data);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
  });
});

export const UserController = {
  registerUser,
};
