import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    picture: String,
    savedDiseases: Array
})
const saveDisease = new mongoose.Schema({
    user_id : String,
    disease: Object
})
const UserModel = mongoose.model("users", newsSchema)

export default UserModel