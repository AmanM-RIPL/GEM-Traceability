import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const generateToken = (user,message,statusCode,res) => {
//     const token= user.generateToken();
//    res.status(statusCode).cookie("token",token,{  
//          expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
//          httpOnly:true
//     }).json({
//          success:true,
//          message,
//          user,
//          token,
//    });
   
// };

//  const token= user.generateToken();
//    res.status(statusCode).cookie('token',token,{  
//          expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
//          httpOnly:true
//     }).json({
//          success:true,
//          message,
//          user,
//          token,
//    });