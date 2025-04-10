import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TravelBuddyService } from './travelBuddy.service';

// 1. Get Potential Travel Buddies
const getTravelBuddies = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const token = req.headers.authorization;
  const result = await TravelBuddyService.getTravelBuddies(tripId, token);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Potential travel buddies retrieved successfully',
    data: result,
  });
});

// 2. Response Travel Buddy Request
const responseTravelBuddyRequest = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await TravelBuddyService.responseTravelBuddyRequest(token);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: 'Travel buddy request responded successfully',
    data: result,
  });
});

export const TravelBuddyController = {
  getTravelBuddies,
  responseTravelBuddyRequest,
};
