import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/users/users.model.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email" });
        }
        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Password incorrect!" });
        }
        generateTokenAndSetCookie(user._id, res);
        return res.status(200).json({ user });
    } catch (err) {
        console.log("Error in login controller:", err.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
};

export const logout = async (req, res) => {
    try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const register = async (req, res) => {
    try {
        const { fullname, password, email, role } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ where: { fullname } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // check password least 6 characters
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            role
        });
        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            newUser.save();
            res.status(201).json({
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role
            });
        } else {
			res.status(400).json({ error: "Invalid user data" });
		}
    } catch (err) {
        console.log("Error in signup controller:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.log("Error in get all users controller:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};