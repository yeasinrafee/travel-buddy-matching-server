import express from 'express';
import { TripController } from './trip.controller';

const router = express.Router();

router.post('/trips', TripController.createTrip);

export const TripRouter = router;
