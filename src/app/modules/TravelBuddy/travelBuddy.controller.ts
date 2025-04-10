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

export const TravelBuddyController = {
  getTravelBuddies,
};
