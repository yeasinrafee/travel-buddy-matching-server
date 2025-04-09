import express from 'express';
import { UserRouter } from '../modules/User/user.routes';
import { LoginRouter } from '../modules/Auth/auth.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
