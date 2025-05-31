import { Router } from "express";
import authRoute from "./auth.js";
import taskRoute from "./tasks.js";

const rootRoute = Router();

rootRoute.use('/auth',authRoute);
rootRoute.use('/tasks',taskRoute)

export default rootRoute;