import express from 'express';
import { predictGrowth } from '../controllers/prediction.controllers.js';

const router = express.Router();

router.post('/', predictGrowth);

export default router;
