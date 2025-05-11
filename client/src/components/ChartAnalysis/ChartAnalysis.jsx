import { useState, useEffect } from "react";
import {
  Activity,
  ArrowRight,
  MoreVertical,
  Eye,
} from "lucide-react";
import "./ChartAnalysis.scss";
import axios from "axios";
import TemperatureGraph from "../Chart/TemperatureGraph/TemperatureGraph";
import LightChart from "../Chart/LightChart/LightChart";
import SoilChart from "../Chart/SoilChart/SoilChart";
import HumidityChart from "../Chart/HumidityChart/HumidityChart";
import ClearSky from "../../assets/images/clear-sky.png";
import Rain from "../../assets/images/rain_light.png";

export default function ChartAnalysis() {
  const [dataRain, setDataRain] = useState([]);
  
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

  return (
    <>
      {/* <style>{styles}</style> */}
      <div className="chart-analysis-container">
        <div className="dashboard-card">
          {/* Main Content */}
          <div className="main-container">
            {/* Main Dashboard */}
            <div className="dashboard-content">
              <div className="dashboard-header">
                <h1 className="dashboard-title">Your Charts Analysis</h1>
                <div className="dashboard-actions">
                  {/* <button className="btn btn-primary">
                    <Plus size={16} />
                    Add Widget
                  </button> */}
                  <button className="btn btn-outline btn-icon">
                    <Eye size={18} />
                  </button>
                  <button className="btn btn-outline">Filter</button>
                </div>
              </div>

              {/* Widgets Grid */}
              <div className="widgets-grid">
                {/* AI Assistant Widget */}
                {/* <div className="col-span-4">
                  <div className="widget widget-dark assistant-widget">
                    <h3 className="assistant-title">AI Assistant</h3>
                    <p className="assistant-description">
                      Analyze product sales over last year
                      <br />
                      Compare revenue, quality, sales and brand
                    </p>
                    <div className="assistant-shape">
                      <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M46.5,-73.8C59.7,-67.3,69.8,-54.1,73.5,-40C77.2,-25.9,74.4,-11,71.8,2.9C69.2,16.9,66.9,29.8,60.4,41.5C53.9,53.2,43.3,63.6,30.6,68.4C17.9,73.2,3,72.4,-12.1,71.2C-27.2,70,-42.5,68.4,-53.9,60.7C-65.2,53,-72.5,39.1,-76.7,24.5C-80.9,9.8,-82.1,-5.5,-76.9,-17.6C-71.7,-29.7,-60.2,-38.6,-48,-46.5C-35.8,-54.3,-22.9,-61.2,-8.4,-69.7C6.1,-78.3,33.3,-80.2,46.5,-73.8Z"
                          transform="translate(100 100)"
                        />
                      </svg>
                    </div>
                    <button className="assistant-btn">
                      Analyze product sales
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div> */}

                {/* Humidity Widget */}
                <HumidityChart/>
                {/* temperature graph */}
                <div className="col-span-6">
                  <div className="widget widget-light">
                    <div className="widget-header">
                      <div className="widget-title">
                        <Activity size={18} color="var(--color-gray-400)" />
                        <span>Temperature</span>
                      </div>
                      <button>
                        <MoreVertical size={18} color="var(--color-gray-400)" />
                      </button>
                    </div>
                    <div className="card-content">
                      <TemperatureGraph />
                    </div>
                  </div>
                </div>

                {/* Light */}
                <LightChart />

                {/* Rain Widget */}
                <div className="col-span-3">
                  <div className="widget widget-light">
                    <div className="widget-header">
                      <div className="widget-title">
                        <img
                          src={ClearSky}
                          alt="Rain Icon"
                          style={{
                            width: "42px",
                            height: "42px",
                            objectFit: "contain",
                            filter: "grayscale(100%)",
                          }}
                        />
                        <span>Rain</span>
                      </div>
                      <button>
                        <MoreVertical size={16} color="var(--color-gray-400)" />
                      </button>
                    </div>
                    <div className="growth-chart">
                      <div className="chart-container">
                        {/* <svg width="100" height="100" viewBox="0 0 100 100"> */}
                        {/* <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#e6e6e6"
                            strokeWidth="10"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#4f6ef7"
                            strokeWidth="10"
                            strokeDasharray="282.7"
                            strokeDashoffset="76.33"
                            transform="rotate(-90 50 50)"
                          /> */}
                        {/* </svg> */}
                        <div className="chart-overlay">
                          {dataRain.rain === 1 ? (
                            <>
                              <div className="rain-status">Rain</div>
                              <img
                                src={Rain}
                                alt="Rain Icon"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <div className="rain-status">Sunny</div>
                              <img
                                src={ClearSky}
                                alt="Rain Icon"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Soil Widget */}
                <SoilChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
