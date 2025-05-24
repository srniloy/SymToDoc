import { Router } from "express";
import { GetPossibleDisease, GetSavedDiseases, GetSymptoms, SaveDisease } from "../controllers/diseaseFinderController.js";

const diseaseFinderRoute = Router()

diseaseFinderRoute.get('/get-symptoms', GetSymptoms)
diseaseFinderRoute.post('/get-diseases', GetSavedDiseases)

diseaseFinderRoute.post('/get-possible-disease', GetPossibleDisease)
diseaseFinderRoute.post('/save', SaveDisease)



export default diseaseFinderRoute