import { Router } from "express";
import { GetPossibleDisease, GetSymptoms } from "../controllers/diseaseFinderController.js";

const diseaseFinderRoute = Router()

diseaseFinderRoute.get('/get-symptoms', GetSymptoms)

diseaseFinderRoute.post('/get-possible-disease', GetPossibleDisease)

export default diseaseFinderRoute