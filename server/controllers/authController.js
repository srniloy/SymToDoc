import User from "../models/userModel.js"
import bcrypt from 'bcrypt'

export const signUpController = async (req, res) => {
    try{
        if(!req.body){
            return res.status(400).json({error: "body is empty"})
        }
        const user = req.body
        const hashedPassword = await bcrypt.hash(user.password, 14)
        const userData = new User({
            name: user.name,
            email: user.email,
            password: hashedPassword,
            picture: user.picture
        })
        const {email} = userData
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message: "user already exist"})
        }
        await userData.save()
        res.status(200).json({message: "Successfully Signed Up", user: userData})

    }catch(error){
        res.status(500).json({error: "internal server error"})
    }
}

export const signInController = async (req, res) => {
    try{
        if(!req.body){
            return res.status(400).json({error: "body is empty"})
        }
        const user = req.body
        const userExist = await User.findOne({email: user.email})
        if(userExist){
            bcrypt.compare(user.password, userExist.password).then(function(result) {
                if(result){
                    res.status(200).json({message: "Successfully Signed In", user: userExist})
                }else{
                    res.status(400).json({message: "Password doesn't match"})
                }
            });
        }else{
            res.status(400).json({message: "User doesn't exist"})
        }

    }catch(error){
        res.status(500).json({error: "internal server error"})
    }
}
