import SensorData from '../models/sensor_data/SensorData.model.js';

export const getHumidityData = async (req, res) => {
  try {
    const data = await SensorData.findAll({
      attributes: ['humidity', 'timestamp'],
      order: [['timestamp', 'DESC']]
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching humidity data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getLatestRainStatus = async (req, res) => {
  try {
    const latestData = await SensorData.findOne({
      attributes: ['rain', 'timestamp'],
      order: [['timestamp', 'DESC']],
    });

    if (!latestData) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.json({
      rain: latestData.rain,
      timestamp: latestData.timestamp,
    });
  } catch (error) {
    console.error('Error fetching latest rain status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
