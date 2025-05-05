import { useState, useEffect } from "react";
import {
  BarChart3,
  Settings,
  Activity,
  ArrowRight,
  ChevronDown,
  MoreVertical,
  RefreshCw,
  Eye,
} from "lucide-react";
import "./SalesDashboard.scss";
import axios from "axios";
import TemperatureGraph from "../TemperatureGraph/TemperatureGraph";
import LightChart from "../LightChart/LightChart";

export default function SalesDashboard() {
  const [timeframe, setTimeframe] = useState("Week");
  const [dataHumidity, setDataHumidity] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8888/api/data/humidity")
      .then((res) => {
        setDataHumidity(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  console.log(dataHumidity);

  const recentSales = [
    {
      id: 1,
      name: "Timothy Williams",
      status: "New",
      amount: 324.99,
      time: "Today",
    },
    {
      id: 2,
      name: "Glen Wood",
      status: "New",
      amount: 200.0,
      time: "2 Days Ago",
    },
    {
      id: 3,
      name: "Raymond Johnson",
      status: "Cancelled",
      amount: 0,
      time: "1 Day Ago",
    },
    {
      id: 4,
      name: "Kenneth Henderson",
      status: "Completed",
      amount: 840.99,
      time: "2 Days Ago",
    },
  ];

  const topItems = [
    { name: "DualSense", category: "Controller", amount: 320.24 },
    { name: "Gamepad", category: "Accessory", amount: 180.9 },
    { name: "VR2", category: "Accessory", amount: 124.0 },
    { name: "Steam codes", category: "Subscription", amount: 100.4 },
  ];

  return (
    <>
      {/* <style>{styles}</style> */}
      <div className="dashboard-container">
        <div className="dashboard-card">
          {/* Main Content */}
          <div className="main-container">
            {/* Main Dashboard */}
            <div className="dashboard-content">
              <div className="dashboard-header">
                <h1 className="dashboard-title">Your Sales Analysis</h1>
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
                <div className="col-span-4">
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
                </div>

                {/* Total Sales Widget */}
                <div className="col-span-4">
                  <div className="widget widget-light">
                    <div className="widget-header">
                      <div className="widget-title">
                        <BarChart3 size={18} color="var(--color-gray-400)" />
                        <span>Humidity</span>
                      </div>
                      {/* <div className="widget-actions">
                        <div className="dropdown">
                          <span>{timeframe}</span>
                          <ChevronDown size={16} />
                        </div>
                        <button>
                          <MoreVertical
                            size={18}
                            color="var(--color-gray-400)"
                          />
                        </button>
                      </div> */}
                    </div>
                    <div className="humidity-chart">
                      {/* Label mốc độ ẩm */}
                      <div className="y-axis">
                        <div className="y-label">100</div>
                        <div className="y-label">80</div>
                        <div className="y-label">60</div>
                        <div className="y-label">40</div>
                        <div className="y-label">20</div>
                        <div className="y-label">0</div>
                      </div>
                      {/* Biểu đồ độ ẩm */}
                      <div className="humidity-chart-container">
                        {dataHumidity.map((item, index) => (
                          <div key={index} className="chart-column">
                            <div
                              className={`chart-bar ${
                                item.timestamps === "Wed" ? "active" : ""
                              }`}
                              style={{
                                height: `${(item.humidity / 100) * 140}px`,
                              }}
                            ></div>
                            <span className="chart-label">
                              {item.timestamps}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* temperature graph */}
                <div className="col-span-4">
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

                {/* Growth Widget */}
                <div className="col-span-3">
                  <div className="widget widget-light">
                    <div className="widget-header">
                      <div className="widget-title">
                        <Activity size={16} color="var(--color-gray-400)" />
                        <span>Growth</span>
                      </div>
                      <button>
                        <MoreVertical size={16} color="var(--color-gray-400)" />
                      </button>
                    </div>
                    <div className="growth-chart">
                      <div className="chart-container">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                          <circle
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
                          />
                        </svg>
                        <div className="chart-overlay">
                          <span className="growth-rate">+73,1%</span>
                          <span className="growth-label">Growth rate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Items Widget */}
                <div className="col-span-3">
                  <div className="widget widget-light">
                    <div className="widget-header">
                      <div className="widget-title">
                        <Settings size={16} color="var(--color-gray-400)" />
                        <span>Top Item Sales</span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-primary)",
                        }}
                      >
                        View All
                      </span>
                    </div>
                    <div className="top-items-list">
                      {topItems.map((item, index) => (
                        <div key={index} className="item-row">
                          <div className="item-info">
                            <h4 className="item-name">{item.name}</h4>
                            <p className="item-category">{item.category}</p>
                          </div>
                          <div className="item-stats">
                            <div className="progress-bar">
                              <div
                                className="progress-value"
                                style={{
                                  width: `${(item.amount / 320.24) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="item-amount">${item.amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
