import users from "../config/db/models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const signUp = async function(req, res) {
    try {
        const { name, email, password } = req.body;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Name is required"
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Email is required"
            });
        }

        const checkEmail = await users.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "This email already exists. Try Login"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Password is required"
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const userData = { ...req.body, password: hashedPassword, };
        const user = await users.create(userData);

        const token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });

        return res.status(200).json({
            success: true,
            message: "Successfully registered",
            data: {
                token,
                authId: user._id,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Error during sign-up:", error);
        return res.status(500).json({
            success: false,
            message: error.message || error
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: `${!email ? "Email" : "Password"} is required`,
            });
        }

        const user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "user not found",
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Wrong password. Try again",
            });
        }

        const token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });

        return res.status(200).json({
            success: true,
            message: "Login success",
            data: {
                token,
                authId: user._id,
                role: user.role
            },
        });

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
}

export const adminLogin = async function(req, res) {
    try {
        const { email, password } = req.body;
        if(email !== process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                success: false,
                message: "given informations are wrong please try again"
            });
        }else{
            const token = jwt.sign(email+password, process.env.PRIVATE_KEY);

            return res.status(200).json({
                success: true,
                message: "login successfully",
                data: {
                    token,
                    email
                }
            });
        }
    } catch (error) {
        console.log("error in adminLogin : ",error);
        return res.status(500).json({
            success: false,
            message: error.message || error
        });
    }
}