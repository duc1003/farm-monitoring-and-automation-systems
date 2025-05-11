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

  return (
    <div className="dashboard-container">
      <div className="metrics-grid">
        <div className="ai-assistant-card ">
          <h1 className="card-title">AI Assistant</h1>
          <p className="card-description">The tree is improving well</p>
          {/* <p className="card-description">
            Compare revenue, quality, sales and brand
          </p> */}

          <button className="analyze-button">
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
          </button>
        </div>
        <MetricCard
          title="Temperature"
          value={dataTemperature.temperature}
          unit="°F"
          type="temperature"
        />

        <MetricCard
          title="Light Intensity"
          value={dataLight.light}
          unit="lux"
          type="light"
        />

        <MetricCard title="Rain" value={dataRain.rain} unit="%" type="rain" />

        <MetricCard
          title="Soil Moisture"
          value={dataMoisture.soil_moisture}
          unit="ppm"
          type="moisture"
        />
        <MetricCard title="Humidity" value={dataHumidity.humidity} unit="°C" type="humidity" />
      </div>
    </div>
  );
};

export default Dashboard;
