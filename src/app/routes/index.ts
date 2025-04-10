import express from 'express';
import { UserRouter } from '../modules/User/user.routes';
import { LoginRouter } from '../modules/Auth/auth.routes';
import { TripRouter } from '../modules/Trip/trip.routes';
import { TravelBuddyRouter } from '../modules/TravelBuddy/travelBuddy.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: UserRouter,
  },
  {
    path: '/',
    route: LoginRouter,
  },
  {
    path: '/',
    route: TripRouter,
  },
  {
    path: '/travel-buddies',
    route: TravelBuddyRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
