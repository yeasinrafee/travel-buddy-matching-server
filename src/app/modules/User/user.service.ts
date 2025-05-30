import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../errors/ApiError';
import status from 'http-status';
import { User } from '@prisma/client';
// 1. Register User
const registerUser = async (userData: any) => {
  const { password, profile, ...user } = userData;

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;

  const userProfile: {
    userId: string;
    bio: string;
    age: number;
  } = {
    userId: '',
    bio: profile.bio,
    age: profile.age,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    // create User
    const registeredUserData = await transactionClient.user.create({
      data: user,
    });

    // Create UserProfile
    userProfile.userId = registeredUserData.id;
    await transactionClient.userProfile.create({
      data: userProfile,
    });

    return registeredUserData;
  });

  return result;
};

// 2. Get user
const getUserFromDB = async (token: string | undefined) => {
  // Verification of the user
  const verifiedToken = jwtHelpers.verifyToken(
    token as string,
    config.jwt.jwt_secret as Secret
  );

  if (!verifiedToken) {
    throw new ApiError(status.UNAUTHORIZED, 'Unauthorized access!');
  }

  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: verifiedToken.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

// 3. Update User
const updateUserIntoDB = async (
  token: string | undefined,
  data: Partial<User>
) => {
  // Verification of the user
  const verifiedToken = jwtHelpers.verifyToken(
    token as string,
    config.jwt.jwt_secret as Secret
  );

  if (!verifiedToken) {
    throw new ApiError(status.UNAUTHORIZED, 'Unauthorized access!');
  }

  await prisma.user.findUniqueOrThrow({
    where: {
      id: verifiedToken.id,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: verifiedToken.id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

export const UserService = {
  registerUser,
  getUserFromDB,
  updateUserIntoDB,
};
