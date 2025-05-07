import { useEffect, useState } from 'react';
import axios from 'axios';
import './SoilChart.scss';

const SoilChart = () => {
  const [dataSoil, setDataSoil] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8888/api/data/soil')
      .then((res) => setDataSoil(res.data))
      .catch((err) => console.error('Error:', err));
  }, []);

  const maxSoil = Math.max(...dataSoil.map((d) => d.soil_moisture || 0), 100);
  const xSteps = 5;
  const xLabels = Array.from({ length: xSteps + 1 }, (_, i) =>
    Math.round((i * maxSoil) / xSteps)
  );

  return (
    <div className="col-span-3">
      <div className="widget widget-soil">
        <div className="widget-header">
          <div className="widget-title">
            {/* <img
              src="/assets/images/icon_soil.png"
              alt="Soil Icon"
              style={{ width: '18px', height: '18px', marginRight: '6px' }}
            /> */}
            <span>Soil Moisture</span>
          </div>
        </div>

        <div className="soil-chart">
          <div className="chart-rows">
            {dataSoil.map((item, index) => (
              <div key={index} className="chart-row">
                <span className="chart-label">{item.timestamps}</span>
                <div
                  className="chart-bar"
                  style={{
                    width: `${(item.soil_moisture / maxSoil) * 90}%`,
                    minWidth: '2%',
                  }}
                  data-value={item.soil_moisture}
                ></div>
              </div>
            ))}
          </div>

          <div className="x-axis">
            {xLabels.map((label, i) => (
              <span key={i} className="x-label">{label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilChart;
