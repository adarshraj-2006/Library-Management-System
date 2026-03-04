import user from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedpassword = await bcrypt.hash(password,10);
        const user = await user.create(
            {
             name,
             email,
             password: hashedpassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req,res) =>{
    try{
        const { email,password} = req.body;
        const user = await user.findOne({email});
        if (!user) return res.status(400).json({message: "user not found"});
        const isMatch =await bcrypt.compare(password,user.password);
        if (!isMatch)return res.status(400).json({message : "Invalid user credentials "});

        const token=jwt.sign(
            {user:user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        res.json({token,user});


    }catch(error){
        res.status(200).json({message : error.message});
    }
}