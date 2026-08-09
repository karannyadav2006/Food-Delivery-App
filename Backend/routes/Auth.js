import { signup,signin, sendotp, verifyOtp, resetPassword, googleAuth } from "../controllers/Auth.js";
import express from "express"
const route=express.Router();
route.post('/signup',signup);
route.post('/signin',signin);
route.post('/send-otp',sendotp);
route.post('/varify-otp',verifyOtp);
route.post('/reset-password',resetPassword);
route.post('/google-auth',googleAuth)
export default route;