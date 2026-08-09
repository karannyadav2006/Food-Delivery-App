import gentoken from '../utils/utils.js'
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import sendemail from '../utils/email.js';
export const signup = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);

        const isuser = await User.findOne({ email: body.email })
        if (isuser) {
            return res.status(400).json({ msg: "User is already exist" });
        }
        const haspassword = await bcrypt.hash(body.password, 10);
        body.password = haspassword;
        const user = await User.create(body);
        const token = await gentoken(user._id);
        res.cookie("token", token, {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        })
        return res.status(201).json({
            msg: "Login register Successful",
            user
        });
    }
    catch (err) {
        console.log(err);
console.log(err);

        res.status(500).json({ msg: "internal server Error" })

    }

}
//login controllers
export const signin = async (req, res) => {
    try {
 
        const { email,password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "Incorrect Username or Password" });
        }
        const haspassword = await bcrypt.compare(password,user.password);
        if (!haspassword) {
            return res.status(400).json({ msg: "Incorrect Username or Password" })
        }

        const token = await gentoken(user._id);
        res.cookie("token", token, {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        })
        return res.json({msg:"Login Successfully"})
    }
    catch (err) {
        
        console.log(err);
        
        res.status(500).json({msg: "Internal Server Error"})

    }
}
export const sendotp = async (req, res) => {
    try {

        const { email } = req.body;

        // 1. Check user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        // 2. Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // 3. Save OTP in Database
        user.resetotp = otp;
        user.expireotp = Date.now() + 5 * 60 * 1000; // 10 minutes


        await user.save();

        // 4. Send OTP Email
        await sendemail(email, otp);

        // 5. Response
        return res.status(200).json({
            success:true,
            msg: "OTP sent successfully"
        });

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            msg: "Server Error"
        });
    }
};
export const verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;

        // Find User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        // Check OTP
        if (user.resetotp != otp) {
            return res.status(400).json({
                msg: "Invalid OTP"
            });
        }

        // Check Expiry
        if (user.expireotp < Date.now()) {
            return res.status(400).json({
                msg: "OTP Expired"
            });
        }
user.varifiedotp = true;
await user.save();
        return res.status(200).json({
            success:true,
            msg: "OTP Verified Successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            msg: "Server Error"
        });

    }
}


export const resetPassword = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }
        if (!user.varifiedotp) {
    return res.status(400).json({
        msg: "Verify OTP first"
    });
}

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
        user.password = hashedPassword;

        // Clear OTP
        user.resetotp = null;
        user.expireotp = null;

        await user.save();

        return res.status(200).json({
            success:true,
            msg: "Password reset successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            msg: "Server Error"
        });

    }
};

export const googleAuth = async (req, res) => {
  try {

    const { fullName, email, mobile, role } = req.body;

    // Check user
    let user = await User.findOne({ email });
  console.log("Existing User:");
    // User doesn't exist
    if (!user) {

      user = await User.create({
        fullName,
        email,
        mobile,
        role,
      });

    }

    // User exists OR newly created
    const token = await gentoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({
      success: true,
      msg: "Google authentication successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        mobile:user.mobile
      },
    });

  } catch (err) {

    console.log("Google Auth Error:", err);

    // return res.status(500).json({
    //   success: false,
    //   msg: "Google authentication failed",
    //   error: err.message,
    // });

  }
};