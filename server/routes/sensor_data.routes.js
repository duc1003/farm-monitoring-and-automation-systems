import express from 'express';

import { getHumidityData, getLatestHumidityData, getLatestLightValue, getLatestRainStatus, getLatestRainStatusByDay, getLatestSensorData, getLatestSensorDataHaveCheckNull, getLatestSoilMoisture, getLatestTemperature, getLightData, getSoilMoistureData, getTemperatureData } from '../controllers/sensor.controllers.js';

const router = express.Router();

router.get('/humidity', getHumidityData);
router.get('/temperature', getTemperatureData);
router.get('/light', getLightData);
router.get('/soil', getSoilMoistureData);
router.get('/rain', getLatestRainStatus);
router.get('/rain_by_day', getLatestRainStatusByDay);
router.get('/latestLight', getLatestLightValue);
router.get('/latestHumidity', getLatestHumidityData);
router.get('/latestSoilMoisture', getLatestSoilMoisture);
router.get('/latestTemperature', getLatestTemperature);
router.get('/latestSensorData', getLatestSensorData);



export default router;
