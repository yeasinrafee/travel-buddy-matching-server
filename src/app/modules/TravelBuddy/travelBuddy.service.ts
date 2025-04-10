import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import ApiError from '../../errors/ApiError';
import status from 'http-status';
import prisma from '../../../shared/prisma';

// 1. Get Potential Travel Buddies
const getTravelBuddies = async (tripId: string, token: string | undefined) => {
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

  const isTripExist = await prisma.trip.findUniqueOrThrow({
    where: {
      id: tripId,
      userId: verifiedToken.id,
    },
  });

  if (!isTripExist) {
    throw new ApiError(status.NOT_FOUND, 'Trip is not found!');
  }

  const result = await prisma.travelBuddyRequest.findMany({
    where: {
      tripId,
    },
    include: {
      trip: true,
      user: true,
    },
  });

  return result;
};

export const TravelBuddyService = {
  getTravelBuddies,
};
