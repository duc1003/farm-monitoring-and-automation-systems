// models/sensor_data/DailySummary.model.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../configs/connect.js';

const DailySummary = sequelize.define("daily_sensor_summary", {
  date: {
    type: DataTypes.DATEONLY,
    primaryKey: true,
  },
  avg_temp: DataTypes.FLOAT,
  avg_humidity: DataTypes.FLOAT,
  avg_light: DataTypes.INTEGER,
  avg_rain: DataTypes.FLOAT,
  avg_soil: DataTypes.INTEGER,
}, {
  tableName: "daily_sensor_summary",
  timestamps: false,
});

export default DailySummary;
