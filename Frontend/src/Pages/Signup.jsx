import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import { auth,app } from "../../GoogleAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [name,setname]=useState("")
  const [password,setpassword]=useState("")
  const [mobile,setmobile]=useState("")
  const [email,setemail]=useState("")
  const[err,setErr]=useState("")
  const[loading,setLoading]=useState(false)
const navigate=useNavigate()
 

const handleform = async (e) => {
console.log("Form Submitted");
    e.preventDefault();
setLoading(true)
    const userData = {
      
        fullName:name,
        email,
        mobile,
        password,
        role
    }
console.log(userData);
setErr("")
    try{

        const res = await axios.post(
            "http://localhost:3000/api/auth/signup",
            userData,
             {
        withCredentials: true
    }
        );

        console.log(res);

    }catch(err){

         setErr(
      err.response?.data?.msg || "Something went wrong"
    );

    }
   { setLoading(false)}

}
const signupwithgoogle=async()=>{
  
  setErr("")
  setLoading(true)
try{
if(!mobile){
    return alert('Mobile no. is required');
  }
    const provider=new  GoogleAuthProvider();
  const result = await signInWithPopup(auth,provider);
  
  console.log(result);

   const res = await axios.post(
            "http://localhost:3000/api/auth/google-auth",{
fullname:result.user.displayName,
email:result.user.email,
role,
mobile,
            },
            
             {
        withCredentials: true,
        
        
    }
        );

        console.log(res);

  
  }
  catch(err){
   
      setErr(
      err.response?.data?.msg || "Something went wrong"
    );
  }
  {setLoading(false)}
}

  return (
    <div className="min-h-screen  bg-[#FCF8F4] flex items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 my-10">

        {/* Logo */}
        <h1 className="text-[36px] font-bold text-[#E45B38] leading-none">
          Vingo
        </h1>

        <p className="text-gray-500 text-sm mt-2 mb-7">
          Create your account to get started with delicious food deliveries
        </p>

        <form onSubmit={handleform} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your Full Name"
              value={name}
              required
onChange={(e)=>setname(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-gray-300 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              required
onChange={(e)=>setemail(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-gray-300 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Mobile
            </label>

            <input
              type="tel"
              placeholder="Enter your Mobile Number"
              value={mobile}
              required
              maxLength={10}
              
onChange={(e)=>{const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 10) {
      setmobile(value);
    }
  }
}
              className="w-full h-11 px-4 rounded-lg border border-gray-300 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
            />
     
          </div>

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
                required
                
onChange={(e)=>setpassword(e.target.value)}
                className="w-full h-11 px-4 pr-11 rounded-lg border border-gray-300 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
              />
       <p className="text-xs text-gray-500 mt-1">
  Password must be at least 6 characters
</p>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>
          </div>

          {/* Role */}
          <div>

            <label className="block text-sm font-semibold mb-2">
              Role
            </label>

            <div className="grid grid-cols-3 gap-3">

              {["user", "shopowner", "deliveryboy"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className={`h-11 rounded-lg border font-medium transition-all duration-200 capitalize

                  ${
                    role === item
                      ? "bg-[#FF5A36] text-white border-[#FF5A36]"
                      : "bg-white hover:bg-orange-50 border-gray-300 text-gray-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

          </div>

          {/* Signup */}
          <button
            className="w-full h-11 rounded-lg bg-[#FF5A36] hover:bg-[#ef4b26] text-white font-semibold transition"
            type="submit"
          >
           {loading?<ClipLoader size={20}/>:"Sign Up"}
          </button>
 {err && (
  <p className="text-red-500 text-center ">
    *{err}
  </p>
)}
          {/* Google */}
          <button
            type="button"
            className="w-full h-11 border rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition" onClick={signupwithgoogle}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
              alt=""
            />

            Sign up with Google
          </button>

         <Link to="/signin"> <p className="text-center text-sm text-gray-600">

            Already have an account?

            <span className="ml-1 text-[#FF5A36] cursor-pointer hover:underline" >
              Sign In
            </span>

          </p></Link>

        </form>

      </div>
    </div>
  );
};

export default Signup;