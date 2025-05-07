import express from 'express';
import { getHumidityData, getLatestRainStatus } from '../controllers/humidity.controllers.js';
import { getTemperatureData } from '../controllers/temperature.controllers.js';
import { getLightTimestampData } from '../controllers/light.controllers.js';
import { getSoilMoistureData } from '../controllers/soil.controllers.js';

const router = express.Router();

router.get('/humidity', getHumidityData);
router.get('/temperature', getTemperatureData);
router.get('/light', getLightTimestampData);
router.get('/soil', getSoilMoistureData);
router.get('/rain', getLatestRainStatus);

export default router;
