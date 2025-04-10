import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import ApiError from '../../errors/ApiError';
import status from 'http-status';
import prisma from '../../../shared/prisma';
import { Prisma } from '@prisma/client';

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

// 2. Get All Trips
const getAllTrips = async (params: any) => {
  const { searchTerm } = params;
  const andCondition: Prisma.TripWhereInput[] = [];
  const whereCondition: Prisma.TripWhereInput = { AND: andCondition };

  if (searchTerm) {
    andCondition.push({
      OR: [
        {
          destination: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          budget: parseFloat(searchTerm),
        },
      ],
    });
  }
  const result = await prisma.trip.findMany({
    where: whereCondition,
  });
  return result;
};

export const TripService = {
  createTrip,
  getAllTrips,
};
