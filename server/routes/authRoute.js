import { Router } from "express";
import { signUpController, signInController } from "../controllers/authController.js";

const authRoute = Router()

authRoute.post('/signup', signUpController)

authRoute.post('/signin', signInController)

export default authRoute