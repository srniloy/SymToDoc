import { Router } from "express";
import { signUpController, signInController } from "../controllers/authController.js";
import { GetSymptoms } from "../controllers/diseaseFinderController.js";

const authRoute = Router()

authRoute.post('/signup', signUpController)

authRoute.post('/signin', signInController)

authRoute.post('/get_symptoms', GetSymptoms)

export default authRoute