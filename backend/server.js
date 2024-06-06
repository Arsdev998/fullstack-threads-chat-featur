import express from "express";
import dotenv from 'dotenv'
import connectDB from "./db/ConnectDb.js";
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()

const app = express();

const  PORT = process.env.PORT || 5000;

//midleware
app.use(express.json());  // To parse JSON data in the  req.body
app.use(express.urlencoded({ extended : true })) // to parse form data in the  req.body
app.use(cookieParser())

//Routes
app.use('/api/users',userRoutes)

app.listen(5000, () => console.log(`server started in http://localhost:${PORT} `));
