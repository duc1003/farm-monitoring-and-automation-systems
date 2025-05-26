import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3 } from "lucide-react";
import "./HumidityChart.scss";

function HumidityChart() {
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
  console.log("ádadsadsa", dataHumidity);
  return (
    <div className="col-span-6">
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
                  className={`chart-bar ${item.date === "Wed" ? "active" : ""}`}
                  style={{
                    height: `${(item.avg_data / 100) * 140}px`,
                  }}
                ></div>
                <span className="chart-label">
                  {new Date(item.date).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HumidityChart;
