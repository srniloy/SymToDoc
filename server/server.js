import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import authRoute from './routes/authRoute.js';
import diseaseFinderRoute from './routes/diseaseFinderRoute.js';




const app = express()

app.use(bodyParser.json())
app.use(cors())



configDotenv()
const PORT = process.env.PORT || 5005;
const MONGO_URL = process.env.MONGO_URL;

mongoose
    .connect(MONGO_URL)
    .then(()=>{
        console.log("MongoDB Connected")
        app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
    })
    .catch(error =>  console.log(error))

app.get("/api", (req, res) =>{
    res.json({"users": ["user1","user2","user3"]})
})

app.use('/auth', authRoute)
app.use('/find-disease', diseaseFinderRoute)

