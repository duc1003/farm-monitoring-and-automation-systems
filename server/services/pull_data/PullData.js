import admin from "../firebase/firebaseAdmin.js";
import sequelize from "../../configs/connect.js";
import SensorData  from "../../models/sensor_data/SensorData.model.js"; // Import model Sequelize

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ✅ Hàm đồng bộ dữ liệu từ Firebase về MySQL
export async function syncDataFromFirebase() {
  // Kết nối tới cơ sở dữ liệu bằng Sequelize (dùng model SensorData)
  await sequelize.authenticate();
  console.log("✅ Kết nối đến cơ sở dữ liệu MySQL thành công!");

  const dbRef = admin.database().ref("/sensor_data");

  const runSync = async () => {
    try {
      // Lấy dữ liệu từ Firebase
      const snapshot = await dbRef.once("value");
      const data = snapshot.val();

      if (!data) {
        console.log("⚠️ Không có dữ liệu từ Firebase.");
        return;
      }

      for (const [id, values] of Object.entries(data)) {
        const { humidity, light, rain, soil_moisture, temperature, timestamp } = values;

        // Đồng bộ dữ liệu vào MySQL sử dụng Sequelize
        await SensorData.upsert({
          id,
          humidity,
          light,
          rain,
          soil_moisture,
          temperature,
          timestamp
        });

        console.log(`✅ Đồng bộ dữ liệu cho ID: ${id}`);
      }

      console.log("✅ Đồng bộ thành công lúc", new Date().toLocaleString());
    } catch (err) {
      console.error("❌ Lỗi khi đồng bộ:", err.message);
    }
  };

  // ✅ Chạy lần đầu và lặp lại mỗi 2 phút
  await runSync();
  setInterval(runSync, 10 * 60 * 1000);
}
