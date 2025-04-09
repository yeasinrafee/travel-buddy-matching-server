import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';

// 1. User Login
const login: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthService.login(data);

  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      id: result.userData.id,
      name: result.userData.name,
      email: result.userData.email,
      token: result.accessToken,
    },
  });
});

export const AuthController = {
  login,
};
