import admin from "../services/firebase/firebaseAdmin.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/users/users.model.js";
import bcrypt from "bcrypt";

// Đăng nhập bằng Email/Password
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Invalid email" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Password incorrect!" });
        }
        generateTokenAndSetCookie(user.id, res);
        return res.status(200).json({ user });
    } catch (err) {
        console.error("Error in login controller:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Đăng xuất
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Đăng ký tài khoản
export const register = async (req, res) => {
    try {
        const { fullname, password, email, role } = req.body;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ fullname, email, password: hashedPassword, role });
        generateTokenAndSetCookie(newUser.id, res);
        res.status(201).json({ fullname: newUser.fullname, email: newUser.email, role: newUser.role });
    } catch (err) {
        console.error("Error in register controller:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Đăng nhập bằng Google
export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: "Invalid token" });
        }

        // Xác thực token từ Firebase
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { email, name, picture, uid } = decodedToken;

        let user = await User.findOne({ where: { email } });

        if (!user) {
            user = await User.create({
                fullname: name,
                email,
                password: "", // Không cần mật khẩu
                role: "user",
                googleId: uid,
                avatar: picture,
            });
        }

        generateTokenAndSetCookie(user.id, res);
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error in googleLogin controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
