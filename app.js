import dotenv from "dotenv";
import express from 'express';

import connectDB from "./config/db.js";
import healtcheckRoutes from "./routes/healtcheckRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { mongo } from "mongoose";

dotenv.config();


connectDB();

const app = express()

//Routes
app.use(express.json())
app.use('/api/v0/', healtcheckRoutes)
app.use('/api/v0/', userRoutes)





const PORT = 5010;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})