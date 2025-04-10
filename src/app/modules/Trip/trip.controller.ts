import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TripService } from './trip.service';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './trip.constant';

// 1. Create Trip
const createTrip = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const data = req.body;
  const result = await TripService.createTrip(token, data);

  sendResponse(res, {
    success: true,
    statusCode: status.CREATED,
    message: 'Trip created successfully',
    data: result,
  });
});

// 2. Create Trip
const getAllTrips = catchAsync(async (req, res) => {
  const filter = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await TripService.getAllTrips(filter, options);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Trips retrieved  successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const TripController = {
  createTrip,
  getAllTrips,
};
