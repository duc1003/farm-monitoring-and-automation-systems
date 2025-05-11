import express from 'express';
import { getHumidityData, getLatestRainStatus, getLatestHumidityData } from '../controllers/humidity.controllers.js';
import { getTemperatureData, getLatestTemperature } from '../controllers/temperature.controllers.js';
import { getLightTimestampData, getLatestLightValue } from '../controllers/light.controllers.js';
import { getSoilMoistureData, getLatestSoilMoisture } from '../controllers/soil.controllers.js';

const router = express.Router();

router.get('/humidity', getHumidityData);
router.get('/temperature', getTemperatureData);
router.get('/light', getLightTimestampData);
router.get('/soil', getSoilMoistureData);
router.get('/rain', getLatestRainStatus);
router.get('/latestLight', getLatestLightValue);
router.get('/latestHumidity', getLatestHumidityData);
router.get('/latestSoilMoisture', getLatestSoilMoisture);
router.get('/latestTemperature', getLatestTemperature);



export default router;
