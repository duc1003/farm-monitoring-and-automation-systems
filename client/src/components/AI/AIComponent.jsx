import { useState, useEffect } from "react";
import {
  ThermometerSun,
  Droplets,
  CloudRain,
  Sun,
  Flower,
  Bell,
} from "lucide-react";
import "./AIComponent.scss";
import axios from "axios";

export default function AIComponent() {
  // Dữ liệu giả lập cho các cảm biến
  // const [sensorData, setSensorData] = useState({
  //   temperature: 28,
  //   humidity: 65,
  //   rainfall: 0,
  //   brightness: 80,
  //   soilMoisture: 45,
  // });
  const [sensorData, setSensorData] = useState({});

  // Danh sách thông báo
  const [notifications, setNotifications] = useState([
    "Hệ thống hoạt động bình thường",
  ]);

  // Hàm tạo dữ liệu ngẫu nhiên để mô phỏng cập nhật từ cảm biến
  const updateSensorData = () => {
    axios
      .get("http://localhost:8888/api/data/latestSensorData")
      .then((res) => {
        setSensorData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
    // setSensorData({
    //   temperature: Math.floor(25 + Math.random() * 10),
    //   humidity: Math.floor(60 + Math.random() * 20),
    //   rainfall: Math.floor(Math.random() * 5),
    //   brightness: Math.floor(70 + Math.random() * 30),
    //   soilMoisture: Math.floor(40 + Math.random() * 30),
    // });
  };
  console.log("sensor: ", sensorData);

  // Cập nhật dữ liệu mỗi 30s
  useEffect(() => {
    updateSensorData();
    const interval = setInterval(updateSensorData, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sensorData) return;
    console.log("test");
    
    const newNotifications = [];

    if (sensorData.temperature > 35) {
      newNotifications.push(
        "Cảnh báo nghiêm trọng: Nhiệt độ quá cao, cây có thể bị sốc nhiệt!"
      );
    } else if (sensorData.temperature > 32) {
      newNotifications.push("Cảnh báo: Nhiệt độ cao!");
    } else if (sensorData.temperature < 18) {
      newNotifications.push(
        "Cảnh báo: Nhiệt độ thấp, cây có thể chậm phát triển."
      );
    }

    if (sensorData.humidity > 85) {
      newNotifications.push("Thông báo: Độ ẩm không khí cao, có thể có mưa.");
    } else if (sensorData.humidity < 40) {
      newNotifications.push(
        "Cảnh báo: Không khí khô, cần kiểm tra tưới phun sương."
      );
    }

    if (sensorData.soil_moisture > 800) {
      newNotifications.push("Cảnh báo: Đất quá khô, cần tưới nước!");
    } else if (sensorData.soil_moisture < 300) {
      newNotifications.push(
        "Cảnh báo: Độ ẩm đất cao, cần kiểm tra hệ thống thoát nước."
      );
    }

    if (sensorData.rain <=700) {
      newNotifications.push("Thông báo: Đang có mưa.");
    } else if (sensorData.rain > 700) {
      newNotifications.push(
        "Thông báo: Đã lâu không có mưa, theo dõi độ ẩm đất."
      );
    }

    if (sensorData.light > 20000) {
      newNotifications.push(
        "Cảnh báo: Ánh sáng quá mạnh, cây có thể bị cháy lá."
      );
    } else if (sensorData.light < 1000) {
      newNotifications.push(
        "Cảnh báo: Thiếu ánh sáng, cây có thể chậm phát triển."
      );
    }

    // Thêm các cảnh báo vào danh sách
    newNotifications.forEach(addNotification);
  }, [sensorData]);

  const addNotification = (message) => {
    setNotifications((prev) => {
      // Tránh thông báo trùng lặp
      if (!prev.includes(message)) {
        // Giới hạn 5 thông báo gần nhất
        const newNotifications = [message, ...prev];
        return newNotifications.slice(0, 5);
      }
      return prev;
    });
  };
  console.log("notifications: ", notifications);
  

  // Xác định class cảnh báo cho thông báo
  const getNotificationClass = (notification) => {
    if (notification.includes("Cảnh báo")) {
      return "important";
    }
    return "";
  };

  // Xác định class dot cho thông báo
  const getNotificationDotClass = (notification) => {
    if (notification.includes("Cảnh báo")) {
      return "warning";
    }
    return "";
  };

  return (
    <div className="ai-monitor-container">
      <h1 className="ai-monitor-title">Hệ Thống Giám Sát</h1>

      <div className="ai-monitor-grid">
        {/* Hàng đầu tiên */}
        <div>
          <div className="sensor-tile">
            <div
              className={`sensor-icon ${
                sensorData.temperature > 32 ? "warning" : "temperature"
              }`}
            >
              <ThermometerSun />
            </div>
            <h3 className="sensor-title">Nhiệt Độ</h3>
            <p
              className={`sensor-value ${
                sensorData.temperature > 32
                  ? "high"
                  : sensorData.temperature < 20
                  ? "low"
                  : "normal"
              }`}
            >
              {sensorData.temperature}
              <span className="sensor-unit">°C</span>
            </p>
          </div>
        </div>

        <div>
          <div className="sensor-tile">
            <div className={`sensor-icon humidity`}>
              <Droplets />
            </div>
            <h3 className="sensor-title">Độ Ẩm Không Khí</h3>
            <p
              className={`sensor-value ${
                sensorData.humidity > 80
                  ? "high"
                  : sensorData.humidity < 40
                  ? "medium"
                  : "normal"
              }`}
            >
              {sensorData.humidity}
              <span className="sensor-unit">%</span>
            </p>
          </div>
        </div>

        <div>
          <div className="sensor-tile">
            <div className={`sensor-icon rainfall`}>
              <CloudRain />
            </div>
            <h3 className="sensor-title">Lượng Mưa</h3>
            <p
              className={`sensor-value ${
                sensorData.rain > 3 ? "high" : "normal"
              }`}
            >
              {sensorData.rain}
              <span className="sensor-unit"></span>
            </p>
          </div>
        </div>

        {/* Hàng thứ hai: Thông báo ở giữa */}
        <div className="notification-panel">
          <div className="notification-header">
            <Bell className="notification-icon" />
            <h2 className="notification-title">Bảng Thông Báo</h2>
          </div>
          <div className="notification-divider">
            <ul className="notification-list">
              {notifications.map((notification, index) => (
                <li key={index} className="notification-item">
                  <span
                    className={`notification-dot ${getNotificationDotClass(
                      notification
                    )}`}
                  ></span>
                  <span
                    className={`notification-message ${getNotificationClass(
                      notification
                    )}`}
                  >
                    {notification}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hàng thứ ba */}
        <div>
          <div className="sensor-tile">
            <div className={`sensor-icon brightness`}>
              <Sun />
            </div>
            <h3 className="sensor-title">Độ Sáng</h3>
            <p
              className={`sensor-value ${
                sensorData.light > 80
                  ? "medium"
                  : sensorData.light < 40
                  ? "low"
                  : "normal"
              }`}
            >
              {sensorData.light}
              <span className="sensor-unit">lux</span>
            </p>
          </div>
        </div>

        <div>
          <div className="sensor-tile">
            <div
              className={`sensor-icon ${
                sensorData.soil_moisture < 30 ? "warning" : "soil"
              }`}
            >
              <Flower />
            </div>
            <h3 className="sensor-title">Độ Ẩm Đất</h3>
            <p
              className={`sensor-value ${
                sensorData.soil_moisture > 70
                  ? "high"
                  : sensorData.soil_moisture < 30
                  ? "medium"
                  : "normal"
              }`}
            >
              {sensorData.soil_moisture}
              <span className="sensor-unit"></span>
            </p>
          </div>
        </div>
      </div>

      <div className="ai-monitor-footer">
        Dữ liệu được cập nhật lần cuối: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}
