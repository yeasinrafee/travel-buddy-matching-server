import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

// 1. Register User
const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await UserService.registerUser(data);
  sendResponse(res, {
    success: true,
    statusCode: status.CREATED,
    message: 'User registered successfully',
    data: {
      id: result.id,
      name: result.name,
      email: result.email,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
  });
});

export const UserController = {
  registerUser,
};
