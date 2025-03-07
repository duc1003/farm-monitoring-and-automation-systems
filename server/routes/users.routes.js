import express from 'express';
import { login, logout, register, getAllUsers } from '../controllers/users.controllers.js';


const route = express.Router();

route.post('/login', login);
route.post('/logout', logout);
route.post('/register', register);
// test
route.get('/users', getAllUsers);

export default route;
