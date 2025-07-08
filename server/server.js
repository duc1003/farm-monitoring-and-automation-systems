import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/users.routes.js";
import sensorRoute from "./routes/sensor_data.routes.js";
import cors from "cors";
import { syncDataFromFirebase } from "./services/pull_data/PullData.js";
import predictionRoutes from "./routes/prediction.routes.js";
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/prediction", predictionRoutes);
app.use("/api/users", userRoute);
app.use("/api/data", sensorRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
    syncDataFromFirebase().catch(err => {
    console.error("❌ Lỗi khi đồng bộ dữ liệu từ Firebase:", err);
  });
});
