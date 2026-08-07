import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();
 
const transporter = nodemailer.createTransport({
 
  service: "gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const sendemail=async(to,otp)=>{
try {
 console.log("To:", to);
    console.log("OTP:", otp);
  const res = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to, // list of recipients
    subject: "Reset your otp", // subject line
    text: "Hello world?", // plain text body
    html: `<h2>Password Reset OTP</h2>
<p>Your OTP is <strong>${otp}</strong></p>
<p>This OTP will expire in 10 minutes.</p>
<p>If you didn't request a password reset, you can ignore this email.</p>` // HTML body
  });
// console.log(res);
  
  console.log("otp send successfully", );
  
} catch (err) {
  console.error("Error while sending mail:", err);
}
}
export default sendemail;