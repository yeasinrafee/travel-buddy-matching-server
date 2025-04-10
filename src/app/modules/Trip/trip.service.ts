import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import ApiError from '../../errors/ApiError';
import status from 'http-status';
import prisma from '../../../shared/prisma';
import { Prisma } from '@prisma/client';
import paginationHelper from '../../../helpers/paginationHelper';

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
const getAllTrips = async (params: any, options: any) => {
  const { searchTerm, minBudget, maxBudget, ...filterData } = params;
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper(options);
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

  if (Object.keys(filterData).length) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  if (minBudget || maxBudget) {
    const minB = parseFloat(minBudget);
    const maxB = parseFloat(maxBudget);
    const budgetFilter: any = {};

    if (!isNaN(minB)) {
      budgetFilter.gte = minB;
    }

    if (!isNaN(maxB)) {
      budgetFilter.lte = maxB;
    }

    if (Object.keys(budgetFilter).length > 0) {
      andCondition.push({
        budget: budgetFilter,
      });
    }
  }

  const result = await prisma.trip.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.trip.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const TripService = {
  createTrip,
  getAllTrips,
};
