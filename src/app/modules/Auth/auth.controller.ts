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
    success: true,
    statusCode: status.OK,
    message: 'User logged in successfully',
    data: {
      id: result.userData.id,
      name: result.userData.name,
      email: result.userData.email,
      token: result.accessToken,
    },
  });
});

// 2. Getting access token using refresh token
const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Fetching access token successfully',
    data: result,
  });
});
export const AuthController = {
  login,
  refreshToken,
};
