import axios from "axios";
import { BASE_URL } from "../constants/Values";

export const GetSymptoms = async ()=>{
    let response = {status: "success", data:{message: ''}}
    await axios.get(`${BASE_URL}/find-disease/get-symptoms`,)
    .then( async res=>{
        if(res.status){
            response = {status: "success", data: JSON.parse(res.data)}
        }
    }).catch(error=>{
        console.log(error)
        // console.log(error.response.data)
        response = {status: "error", data: error.response.data}
    })
    
    return response
    
}

export const FindDisease = async (selectedSymptoms:any[])=>{
    let symptoms = ''
    selectedSymptoms.forEach(sym=>{
        if(symptoms != ''){
            symptoms += '+'+sym.symptom
        }else{
            symptoms += sym.symptom
        }
    })
    let response = {status: "success", data:{message: '', diseases: {}}}
    await axios.post(`${BASE_URL}/find-disease/get-possible-disease`,{symptoms})
    .then( async res=>{
        if(res.status){
            response = {status: "success", data: {message: "successfully find diseases", diseases: JSON.parse(res.data)}}
        }
    }).catch(error=>{
        console.log(error)
        // console.log(error.response.data)
        response = {status: "error", data: error.response.data}
    })
    
    return response
    
}

export const SaveDisease = async (disease_info: any)=>{
    
    let response = {status: "success", data:{message: '', diseases: {}}}
    await axios.post(`${BASE_URL}/find-disease/save`,disease_info)
    .then( async res=>{
        if(res.status){
            response = {status: "success", data: res.data}
            console.log(res.data)
        }
    }).catch(error=>{
        console.log(error)
        // console.log(error.response.data)
        response = {status: "error", data: error.response.data}
    })
    
    return response
    
}

export const GetSavedDiseases = async (data: any)=>{
    let response = {status: "success", data:{message: ''}}
    await axios.post(`${BASE_URL}/find-disease/get-diseases`,data)
    .then( async res=>{
        if(res.status){
            response = {status: "success", data: JSON.parse(res.data)}
        }
    }).catch(error=>{
        console.log(error)
        // console.log(error.response.data)
        response = {status: "error", data: error.response.data}
    })
    
    return response
    
}