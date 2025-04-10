import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import ApiError from '../../errors/ApiError';
import status from 'http-status';
import prisma from '../../../shared/prisma';

// 1. Create Trip
const createTrip = async (token: string | undefined, data: any) => {
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

  data.userId = verifiedToken.id;

  const result = await prisma.trip.create({
    data,
  });

  return result;
};

export const TripService = {
  createTrip,
};
