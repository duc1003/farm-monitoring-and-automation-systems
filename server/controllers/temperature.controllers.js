// controllers/temperature.controller.js
import SensorData from '../models/sensor_data/SensorData.model.js';

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
