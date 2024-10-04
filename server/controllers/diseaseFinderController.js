import axios from "axios"
import { configDotenv } from 'dotenv';


configDotenv()
export const GetSymptoms = async (req, res) => {
    try{
        await axios.get(`${"http://localhost:5000"}/get_symptoms`,)
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
        await axios.post(`${"http://localhost:5000"}/disease_finder`, req.body)
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