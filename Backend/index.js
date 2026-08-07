import express from "express";
import dotenv from "dotenv";
import { db } from "./config/config.js";
dotenv.config();
const app=express();
import authroute from "./routes/Auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authroute)



db();
const port=process.env.PORT || 6000;
;
app.listen(port,()=>{
    console.log(`server is started at port :${port}`);
    
})