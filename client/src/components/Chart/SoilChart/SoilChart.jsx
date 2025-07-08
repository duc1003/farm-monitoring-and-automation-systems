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
                <span className="chart-label">{item.date}</span>
                <div
                  className="chart-bar"
                  style={{
                    width: `${(item.avg_soil / 1023) * 95}%`,
                    minWidth: '2%',
                  }}
                  data-value={item.soil_moisture}
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

export default SoilChart;
