import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFile } from "fs/promises";

dotenv.config();

const serviceAccount = JSON.parse(
  await readFile(new URL("./json/firebase-service.json", import.meta.url), "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Thêm dòng này để cung cấp URL của Firebase Realtime Database
});

export default admin;
