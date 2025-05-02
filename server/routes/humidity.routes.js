import express from 'express';
import { getHumidityData } from '../controllers/humidity.controllers.js';

const router = express.Router();

router.get('/humidity', getHumidityData);

export default router;
