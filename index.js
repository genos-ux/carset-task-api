import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 3000;

await mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Database connected'))
.catch(err => console.log('Error while connecting db'))

app.get('/', (req,res) => {
    res.send("hello world");
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} `);
})