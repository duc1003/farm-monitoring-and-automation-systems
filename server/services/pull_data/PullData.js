import admin from "../firebase/firebaseAdmin.js";
import sequelize from "../../configs/connect.js";
import SensorData from "../../models/sensor_data/SensorData.model.js";
import DailySummary from "../../models/sensor_data/DailySummary.model.js"; // ✅ NEW

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ✅ Hàm tính và cập nhật dữ liệu tổng hợp theo ngày
async function updateDailySummaryForToday() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const [summary] = await sequelize.query(`
    SELECT
      DATE(timestamp) AS date,
      AVG(temperature) AS avg_temp,
      AVG(humidity) AS avg_humidity,
      AVG(light) AS avg_light,
      AVG(rain) AS avg_rain,
      AVG(soil_moisture) AS avg_soil
    FROM sensor_data
    WHERE DATE(timestamp) = ?
    GROUP BY DATE(timestamp)
  `, {
    replacements: [today],
    type: sequelize.QueryTypes.SELECT,
  });

  if (summary) {
    await DailySummary.upsert(summary); // INSERT hoặc UPDATE
    console.log(`📊 Đã cập nhật bảng tổng hợp cho ngày ${today}`);
  }
}

// ✅ Hàm đồng bộ dữ liệu từ Firebase về MySQL
export async function syncDataFromFirebase() {
  await sequelize.authenticate();
  console.log("✅ Kết nối đến cơ sở dữ liệu MySQL thành công!");

  const dbRef = admin.database().ref("/sensor_data_final");

  const runSync = async () => {
    try {
      const snapshot = await dbRef.once("value");
      const data = snapshot.val();

      if (!data) {
        console.log("⚠️ Không có dữ liệu từ Firebase.");
        return;
      }

      for (const [id, values] of Object.entries(data)) {
        const { humidity, light, rain, soil_moisture, temperature, timestamp } = values;

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

      // ✅ Cập nhật lại bảng tổng hợp theo ngày hiện tại
      await updateDailySummaryForToday();

      console.log("✅ Đồng bộ và tổng hợp thành công lúc", new Date().toLocaleString());
    } catch (err) {
      console.error("❌ Lỗi khi đồng bộ:", err.message);
    }
  };

  await runSync();
  setInterval(runSync, 30 * 1000); // Lặp lại mỗi 30s
}
