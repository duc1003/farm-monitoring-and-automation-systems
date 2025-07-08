import SensorData from '../models/sensor_data/SensorData.model.js';
import DailySummary from '../models/sensor_data/DailySummary.model.js';
import { Op } from 'sequelize';

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

//temperature controllers

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


export const getTemperatureData = async (req, res) => {
  try {
    const data = await DailySummary.findAll({
      attributes: ['avg_temp', 'date'],
      order: [['date', 'DESC']],
      limit: 10,
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

// humidity controllers

export const getHumidityData = async (req, res) => {
  try {
    const data = await DailySummary.findAll({
      attributes: ['avg_humidity', 'date'],
      order: [['date', 'DESC']],
      limit: 10,
    });
    const dataFinal = data.map(item => ({
      avg_data: item.avg_humidity,
      date: item.date
    }))
    console.log('Humidity data fetched successfully:', data);
    res.status(200).json(dataFinal);
  } catch (error) {
    console.error('Error fetching humidity data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLatestHumidityData = async (req, res) => {
  try {
    const oldestData = await SensorData.findOne({
      attributes: ['humidity', 'timestamp'],
      order: [['timestamp', 'DESC']],
    });

    if (!oldestData) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.status(200).json({
      humidity: oldestData.humidity,
      timestamp: oldestData.timestamp,
    });
  } catch (error) {
    console.error('Error fetching oldest humidity data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// rain controllers


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

export const getLatestRainStatusByDay = async (req, res) => {
  try {
    const latestData = await DailySummary.findOne({
      attributes: ['avg_rain', 'date'],
      order: [['date', 'DESC']],
    });

    if (!latestData) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.json({
      rain: latestData.avg_rain,
      date: latestData.date,
    });
  } catch (error) {
    console.error('Error fetching latest rain status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// light controllers
export const getLightData = async (req, res) => {
  try {
    const data = await DailySummary.findAll({
      attributes: ['avg_light', 'date'],  
      order: [['date', 'DESC']],
      limit: 10,
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
export const getLatestLightValue = async (req, res) => {
  try {
    const data = await SensorData.findOne({
      attributes: ['light', 'timestamp'],
      order: [['timestamp', 'DESC']],
    });

    if (!data) {
      return res.status(404).json({ message: 'No data found' });
    }
    return res.status(200).json({
      light: data.light,
      timestamp: data.timestamp,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// soil moisture controllers
export const getSoilMoistureData = async (req, res) => {
  try {
    const data = await DailySummary.findAll({
      attributes: ['avg_soil', 'date'],
      order: [['date', 'DESC']],
      limit: 10,
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