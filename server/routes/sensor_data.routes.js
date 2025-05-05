import express from 'express';
import { getHumidityData } from '../controllers/humidity.controllers.js';
import { getTemperatureData } from '../controllers/temperature.controllers.js';
import { getLightTimestampData } from '../controllers/light.controllers.js';

const router = express.Router();

router.get('/humidity', getHumidityData);
router.get('/temperature', getTemperatureData);
router.get('/light', getLightTimestampData);

export default router;
