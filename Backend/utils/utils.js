import jwt from "jsonwebtoken";
const gentoken=async(UserId)=>{
try{
const token=await jwt.sign({UserId},process.env.JWT_KEY,{expiresIn:"1d"})
return token;
}
catch(err){
console.log(err);

}
}
export default gentoken;