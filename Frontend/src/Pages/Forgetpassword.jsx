import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Forgetpassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 
 const handleSendOTP = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/send-otp",
      {
        email,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data);

    if (res.data.success) {
      setStep(2);
    }

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};
 const handleSendOTP2 = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/varify-otp",
      {
        email,
        otp
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data);

    if (res.data.success) {
      setStep(3);
    }

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};
const handleResetPassword = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/reset-password",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data);

    if (res.data.success) {
      alert("Password Updated Successfully");
      navigate("/signin");
    }

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center items-center">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">

        <button
          type="button"
          onClick={() => navigate("/signin")}
          className="text-xl mb-5"
        >
          <FaArrowLeft />
        </button>

        <form  className="space-y-5">

          {/* STEP 1 */}

          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold">
                Forgot Password
              </h2>

              <div>
                <label>Email</label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="w-full border rounded p-2 mt-2"
                />
              </div>

              <button
                className="w-full bg-orange-500 text-white py-2 rounded"
              onClick={handleSendOTP}>
                {loading?<ClipLoader size={20}/>:"Send OTP"}
              </button>
               {err && (
  <p className="text-red-500 text-center ">
    *{err}
  </p>
)}
            </>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold">
                Verify OTP
              </h2>

              <div>
                <label>OTP</label>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border rounded p-2 mt-2"
                />
              </div>

              <button
                className="w-full bg-orange-500 text-white py-2 rounded" onClick={handleSendOTP2}
              >
               {loading?<ClipLoader size={20}/>:"Varify OTP"}
              </button>
               {err && (
  <p className="text-red-500 text-center ">
    *{err}
  </p>
)}
            </>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold">
                Reset Password
              </h2>

              <div>
                <label>New Password</label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="w-full border rounded p-2 mt-2"
                />
              </div>

              <div>
                <label>Confirm Password</label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full border rounded p-2 mt-2"
                />
              </div>

              <button
                className="w-full bg-orange-500 text-white py-2 rounded" onClick={handleResetPassword}
              >
               {loading?<ClipLoader size={20}/>:"Reset Password"}
              </button>
               {err && (
  <p className="text-red-500 text-center ">
    *{err}
  </p>
)}
            </>
          )}

        </form>

      </div>

    </div>
  );
};

export default Forgetpassword;