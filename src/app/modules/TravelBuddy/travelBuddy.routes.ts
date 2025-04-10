import express from 'express';
import { TravelBuddyController } from './travelBuddy.controller';

const router = express.Router();

router.get('/:tripId', TravelBuddyController.getTravelBuddies);

router.get('/', TravelBuddyController.responseTravelBuddyRequest);

export const TravelBuddyRouter = router;
