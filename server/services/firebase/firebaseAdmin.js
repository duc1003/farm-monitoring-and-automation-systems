import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFile } from "fs/promises";

dotenv.config();

const serviceAccount = JSON.parse(
  await readFile(new URL("./json/firebase-service.json", import.meta.url), "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
