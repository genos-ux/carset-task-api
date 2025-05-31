import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import rootRoute from "./routes/index.js";
import cors from 'cors';
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const PORT = process.env.PORT || 5000;

await mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database connected'))
.catch(err => console.log('Error while connecting db'))

app.use(express.json());

app.use(cors());

app.use('/api', rootRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} `);
})