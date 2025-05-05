import React, { useEffect, useState } from "react";
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
  console.log(dataLight);
  

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
          <div className="chart-rows">
            {dataLight.map((item, index) => (
              <div key={index} className="chart-row">
                <span className="chart-label">{item.timestamps}</span>
                <div
                  className="chart-bar"
                  style={{
                    width: `${(item.light / 1100) * 100}%`,
                    minWidth: "2%",
                  }}
                  data-value={item.light}
                ></div>
              </div>
            ))}
          </div>
          <div className="x-axis">
            <div className="x-label">0</div>
            <div className="x-label">200</div>
            <div className="x-label">400</div>
            <div className="x-label">600</div>
            <div className="x-label">800</div>
            <div className="x-label">1000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightChart;
