import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

import serviceAccount from "./json/firebase-service.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Thêm dòng này để cung cấp URL của Firebase Realtime Database
});

export default admin;
