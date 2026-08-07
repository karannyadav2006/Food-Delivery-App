import React from 'react'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from "axios";
export default function Signin() {
    const [password,setpassword]=useState("")
      const [showPassword, setShowPassword] = useState(false);
    const [email,setemail]=useState("")
    const handleform = async (e) => {
console.log("Form Submitted");
    e.preventDefault();

    const userData = {
    
        email,
        password,
        
    }
console.log(userData);

    try{

        const res = await axios.post(
            "http://localhost:3000/api/auth/signin",
            userData,
             {
        withCredentials: true
    }
        );

        console.log(res.data);

    }catch(err){

        console.log(err.response.data);

    }

}
  return (
    <div className=' min-h-screen flex items-center justify-center'>
     <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 my-10">
    
            {/* Logo */}
            <h1 className="text-[36px] font-bold text-[#E45B38] leading-none">
              Vingo
            </h1>
    
            <p className="text-gray-500 text-sm mt-2 mb-7">
              Create your account to get started with delicious food deliveries
            </p>
    
            <form onSubmit={handleform} className="space-y-5">
    
             
    
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
    
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
    onChange={(e)=>setemail(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                />
              </div>
    
              {/* Mobile */}
              
    
              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>
    
                <div className="relative">
    
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
    onChange={(e)=>setpassword(e.target.value)}
                    className="w-full h-11 px-4 pr-11 rounded-lg border border-gray-300 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  />
    
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
    
                </div>
                <div className="mt-2 flex justify-end">
                    <Link to='/forget' className="text-sm text-orange-500 hover:text-orange-600 hover:underline font-medium transition">Forget password</Link> 
                  </div>
              </div>
    
              {/* Role */}
            
    
              {/* Signup */}
              <button
                className="w-full h-11 rounded-lg bg-[#FF5A36] hover:bg-[#ef4b26] text-white font-semibold transition"
                type="submit"
              >
                Sign In
              </button>
    
              {/* Google */}
              
            </form>
    
          </div>
          </div>
  )
}
