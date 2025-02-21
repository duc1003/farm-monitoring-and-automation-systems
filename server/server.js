import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/users.routes.js';


const app = express();
dotenv.config();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use("/api/users", userRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});