import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

    // Basic email validation                   
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedpassword,
            phone
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).json({ message: "user not found" });

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid user credentials " });

        const token = jwt.sign(
            { user: foundUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.json({
            data: {
                accessToken: token,
                user: foundUser
            }
        });
    } catch (error) {
        console.log("login error",error);
        res.status(500).json({ message: error.message });
    }
}