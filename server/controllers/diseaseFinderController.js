import axios from "axios"
import { configDotenv } from 'dotenv';
import mongoose from "mongoose";
import SaveDiseaseModel from "../models/saveDiseaseModel.js";



configDotenv()

export const GetSymptoms = async (req, res) => {
    try{
        await axios.get(`${process.env.DISEASE_FINDER_URL}/get_symptoms`,)
        .then( async response=>{
            if(response.status){
                res.status(200).json(JSON.stringify(response.data))
            }
        }).catch(error=>{
            console.log(error)
            // console.log(error.response.data)
            response = {status: "error", data: error.response.data}
        })
            

    }catch(error){
        res.status(500).json({error: "internal server error"})
    }
}


export const GetPossibleDisease = async (req, res) => {
    try{
        await axios.post(`${process.env.DISEASE_FINDER_URL}/disease_finder`, req.body)
        .then( async response=>{
            if(response.status){
                res.status(200).json(JSON.stringify(response.data))
            }
        }).catch(error=>{
            console.log(error)
            // console.log(error.response.data)
            response = {status: "error", data: error.response.data}
        })
            

    }catch(error){
        res.status(500).json({error: "internal server error"})
    }
}


export const SaveDisease = async (req, res) => {
    try{
        if(!req.body){
            return res.status(400).json({error: "body is empty"})
        }
        const {disease, user_id} = req.body
        console.log(disease, user_id)
        const saveDisease = new SaveDiseaseModel({
            user_id: user_id,
            disease: disease
        })
        saveDisease.save()
        res.status(200).json({message: 'success'})

    }catch(error){
        res.status(500).json({error: "internal server error"})
    }
}



export const GetSavedDiseases = async (req, res) => {
    try{
        const data = await SaveDiseaseModel.find({user_id: req.body.user_id})
console.log(data)
        res.status(200).json(JSON.stringify(data))

    }catch(error){
        res.status(500).json({error: "internal server error"})
    }
}
