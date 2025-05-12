// controllers/temperature.controller.js
import SensorData from '../models/sensor_data/SensorData.model.js';
import { Op } from 'sequelize';

export const getTemperatureData = async (req, res) => {
  try {
    const data = await SensorData.findAll({
      attributes: ['temperature', 'timestamp'],
      order: [['timestamp', 'ASC']]
    });
    res.json(data);
  } catch (err) {
    console.error('Error fetching temperature data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getLatestTemperature = async (req, res) => {
  try {
    const latestData = await SensorData.findOne({
      attributes: ['temperature', 'timestamp'],
      order: [['timestamp', 'DESC']],
    });

    if (!latestData) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.json({
      temperature: latestData.temperature,
      timestamp: latestData.timestamp,
    });
  } catch (err) {
    console.error('Error fetching latest temperature data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getLatestSensorDataHaveCheckNull = async (req, res) => {
  try {
    const latestTimestamp = await SensorData.max('timestamp');
    if (!latestTimestamp) return res.status(404).json({ message: 'No data found' });

    const data = await SensorData.findAll({
      where: {
        timestamp: latestTimestamp,
        humidity: { [Op.not]: null },
        light: { [Op.not]: null },
        rain: { [Op.not]: null },
        soil_moisture: { [Op.not]: null },
        temperature: { [Op.not]: null },
      },
      order: [['id', 'DESC']],
      limit: 1
    });

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No valid data at latest timestamp' });
    }

    res.json(data);
  } catch (err) {
    console.error('Error fetching latest sensor data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getLatestSensorData = async (req, res) => {
  try {
    const latestData = await SensorData.findOne({
      order: [['timestamp', 'DESC']],
    });

    if (!latestData) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.json(latestData);
  } catch (err) {
    console.error('Error fetching latest sensor data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


