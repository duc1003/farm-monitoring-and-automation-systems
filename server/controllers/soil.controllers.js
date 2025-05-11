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
export const getLatestSoilMoisture = async (req, res) => {
  try {
    const latestData = await SensorData.findOne({
      attributes: ['soil_moisture', 'timestamp'],
      order: [['timestamp', 'DESC']],
    });

    if (!latestData) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.status(200).json({
      soil_moisture: latestData.soil_moisture,
      timestamp: latestData.timestamp,
    });
  } catch (error) {
    console.error('Error fetching latest soil moisture data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};