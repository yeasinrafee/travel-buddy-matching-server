import express from 'express';
import { TripController } from './trip.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TripValidation } from './trip.validation';

const router = express.Router();

router.post(
  '/trips',
  validateRequest(TripValidation.createTripZodValidation),
  TripController.createTrip
);

router.get('/trips', TripController.getAllTrips);

export const TripRouter = router;
