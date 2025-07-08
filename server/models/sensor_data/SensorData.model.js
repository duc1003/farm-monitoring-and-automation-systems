import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../configs/connect.js';

const SensorData = sequelize.define('SensorData', {
  id: {
    type: DataTypes.STRING(30),
    primaryKey: true,
    allowNull: false
  },
  humidity: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  light: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  rain: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  soil_moisture: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'sensor_data',
  timestamps: false
});

export default SensorData;
