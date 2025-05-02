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
