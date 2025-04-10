import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TripService } from './trip.service';

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
  const result = await TripService.getAllTrips(req.query);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Trips retrieved  successfully',
    data: result,
  });
});

export const TripController = {
  createTrip,
  getAllTrips,
};
