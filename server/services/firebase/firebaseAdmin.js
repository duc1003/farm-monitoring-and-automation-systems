import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

import serviceAccount from "./path/to/your-firebase-admin-sdk.json"; // Đường dẫn đến file JSON tải từ Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
