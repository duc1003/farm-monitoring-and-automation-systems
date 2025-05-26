import "./Dashboard.scss";
import MetricCard from "../MetricCard/MetricCard";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [dataRain, setDataRain] = useState([]);
  const [dataLight, setDataLight] = useState([]);
  const [dataHumidity, setDataHumidity] = useState([]);
  const [dataMoisture, setDataMoisture] = useState([]);
  const [dataTemperature, setDataTemperature] = useState([]);
  const [dataGrowth, setDataGrowth] = useState([]);
  const [dataSensor, setDataSensor] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8888/api/data/rain")
      .then((res) => {
        setDataRain(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  console.log("data rain: ", dataRain);
  useEffect(() => {
    axios
      .get("http://localhost:8888/api/data/latestLight")
      .then((res) => {
        setDataLight(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8888/api/data/latestHumidity")
      .then((res) => {
        setDataHumidity(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8888/api/data/latestSoilMoisture")
      .then((res) => {
        setDataMoisture(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8888/api/data/latestTemperature")
      .then((res) => {
        setDataTemperature(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  useEffect(() => {
    axios
      .post("http://localhost:8888/api/prediction")
      .then((res) => {
        setDataGrowth(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8888/api/data/latestSensorData")
      .then((res) => {
        setDataSensor(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  console.log("data sensor: ", dataSensor);
  console.log("data grow: ", dataGrowth);
  const getGrowthLevelClass = (level) => {
    switch (level) {
      case "tốt":
        return "good";
      case "trung bình":
        return "medium";
      case "kém":
        return "bad";
      default:
        return "";
    }
  };
  const getGrowthConclusion = (label) => {
    if (label === "kém") {
      return "Cây đang trong tình trạng kém phát triển — cần được chăm sóc ngay để phục hồi.";
    }
    if (label === "trung bình") {
      return "Cây đang phát triển ở mức trung bình — vẫn còn cơ hội cải thiện nếu được theo dõi sát sao.";
    }
    return "Cây đang phát triển mạnh mẽ — hãy tiếp tục duy trì điều kiện chăm sóc hiện tại!";
  };
  console.log("data growth: ", dataGrowth.prediction); 
  

  return (
    <div className="dashboard-container">
      <div className="metrics-grid">
        <div
          className={`ai-assistant-card ${getGrowthLevelClass(
            dataGrowth.prediction
          )}`}
        >
          <h1 className="card-title">AI Hỗ trợ</h1>
          <p className="card-description">
            {/* {getGrowthConclusion(dataGrowth.prediction)} */}
            {getGrowthConclusion(dataGrowth.prediction)}
          </p>
          <p className="card-description">{dataGrowth.suggest}</p>

          {/* <button className="analyze-button">
            <span>Analyze</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="button-icon"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button> */}
        </div>
        <MetricCard
          title="Nhiệt độ"
          value={dataTemperature.temperature}
          unit="°C"
          type="temperature"
        />

        <MetricCard
          title="Độ sáng"
          value={dataLight.light}
          unit="lux"
          type="light"
        />

        <MetricCard title="Mưa" value={dataRain.rain} unit="-" type="rain" />

        <MetricCard
          title="Độ ẩm đất"
          value={dataMoisture.soil_moisture}
          unit=""
          type="moisture"
        />
        <MetricCard
          title="Độ ẩm không khí"
          value={dataHumidity.humidity}
          unit="%"
          type="humidity"
        />
      </div>
    </div>
  );
};

export default Dashboard;
