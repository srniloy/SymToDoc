import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    picture: String
})

const UserModel = mongoose.model("users", newsSchema)

export default UserModel