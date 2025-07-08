import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3 } from "lucide-react";
import "./LightChart.scss";

const LightChart = () => {
  const [dataLight, setDataLight] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8888/api/data/light")
      .then((res) => setDataLight(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);
  
  console.log("data light", dataLight);

  return (
    <div className="col-span-6">
      <div className="widget widget-light">
        <div className="widget-header">
          <div className="widget-title">
            <BarChart3 size={18} color="var(--color-gray-400)" />
            <span>Light Intensity</span>
          </div>
        </div>

        <div className="light-chart">
          {/* Y-axis labels */}
          <div className="y-axis">
            <div className="y-label">40000</div>
            <div className="y-label">30000</div>
            <div className="y-label">20000</div>
            <div className="y-label">10000</div>
            <div className="y-label">0</div>
          </div>

          {/* Chart columns */}
          <div className="chart-columns">
            {dataLight.map((item, index) => (
              <div key={index} className="chart-column">
                <div
                  className="chart-bar-vertical"
                  style={{
                    height: `${(item.avg_light / 40000) * 85}%`,
                    minHeight: "2%",
                  }}
                  data-value={item.avg_light}
                ></div>
                <span className="chart-label-bottom">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightChart;