import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./TemperatureLineChart.scss";

const TemperatureGraph = () => {
  const [dataTemperature, setDataTemperature] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8888/api/data/temperature"
        );
        setDataTemperature(res.data);
      } catch (err) {
        console.error("Error fetching temperature data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="temperature-line-chart">
      <ResponsiveContainer>
        <LineChart data={dataTemperature}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: "°C", position: "insideLeft" }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="avg_temp"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ r: 0.5 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureGraph;
