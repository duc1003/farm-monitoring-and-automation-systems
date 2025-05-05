import SensorData from '../models/sensor_data/SensorData.model.js';

export const getLightTimestampData = async (req, res) => {
  try {
    const data = await SensorData.findAll({
      attributes: ['light', 'timestamp'],  
      order: [['timestamp', 'DESC']]  
    });

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};