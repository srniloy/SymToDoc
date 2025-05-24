import mongoose from "mongoose";

const saveDisease = new mongoose.Schema({
    user_id : String,
    disease: Object
})
const SaveDiseaseModel = mongoose.model("save_disease", saveDisease)

export default SaveDiseaseModel