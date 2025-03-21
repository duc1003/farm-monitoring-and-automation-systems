import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

import serviceAccount from "./json/firebase-service.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
