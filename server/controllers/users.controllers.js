import User from "../models/users/users.model.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    res.send("login");
};

export const logout = async (req, res) => {
    res.send("logout");
};

export const register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ where: { username } });
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
            username,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        });

    } catch (err) {
        console.log("Error in signup controller:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
