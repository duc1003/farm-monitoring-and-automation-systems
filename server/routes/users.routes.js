import express from 'express';
import { login, logout, register } from '../controllers/users.controllers.js';


const route = express.Router();

route.get('/', login);
route.get('/logout', logout);
route.get('/register', register);

export default route;
