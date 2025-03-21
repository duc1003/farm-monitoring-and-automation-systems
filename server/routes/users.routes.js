import express from 'express';
import { login, logout, register, googleLogin } from '../controllers/users.controllers.js';


const route = express.Router();

route.post('/login', login);
route.post('/logout', logout);
route.post('/register', register);
route.post("/google-login", googleLogin);

export default route;
