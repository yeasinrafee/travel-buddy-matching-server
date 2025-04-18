import prisma from '../../../shared/prisma';
import * as bcrypt from 'bcrypt';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import status from 'http-status';

// 1. User login
const login = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  // Check password is correct or not
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  // If password is incorrect then throw error
  if (!isCorrectPassword) {
    throw new ApiError(400, 'Password is incorrect');
  }

  // Generate Access Token
  const accessToken = jwtHelpers.generateToken(
    { id: userData.id, email: userData.email },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  // Generate Refresh Token
  const refreshToken = jwtHelpers.generateToken(
    { id: userData.id, email: userData.email },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );
  return {
    userData,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

// 2. Getting access token using refresh token
const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
  } catch (err) {
    throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: decodedData.id,
    },
  });

  // Generate Access Token
  const accessToken = jwtHelpers.generateToken(
    { id: userData.id, email: userData.email },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  login,
  refreshToken,
};
