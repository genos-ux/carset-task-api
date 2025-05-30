import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.js";

const authRoute = Router();

authRoute.post('/login',loginUser);
authRoute.post('/register',registerUser)


export default authRoute;