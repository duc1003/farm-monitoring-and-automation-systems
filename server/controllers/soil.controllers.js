import SensorData from '../models/sensor_data/SensorData.model.js';

export const getSoilMoistureData = async (req, res) => {
  try {
    const data = await SensorData.findAll({
      attributes: ['soil_moisture', 'timestamp'],
      order: [['timestamp', 'DESC']],
      limit: 20,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to get soil moisture data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
