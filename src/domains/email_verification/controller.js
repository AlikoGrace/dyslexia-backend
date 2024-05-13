const User = require("./../user/model");
const {sendOTP,verifyOTP,deleteOTP}= require("./../otp/controller");



const verifyUserEmail= async({email,otp})=>{
    try {

        const validOTP = await verifyOTP({email,otp});
        if (!validOTP){
            throw Error("Invalid code passed, check your inbox.");
        }

        //update user record to show verified.
        await User.updateOne({email}, {verified: true});

        await deleteOTP(email);
        return;
        
    } catch (error) {
         throw error;
    }
}




const sendVerificationOTPEmail = async (email)=>{
    try {

        //check if account exist
    
        const existingUser = await User.findOne({email});
    
        if(!existingUser){
            throw Error("There's no account for the provided email.");
        }

        const otpDetails ={
            email,
            subject:"Email verification",
            message:"Verify your email with the code below.",
            duration:1
        };

        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
        
    } catch (error) {
        console.error("Error searching for user:", error);
        throw error;  // Re-throw the error for handling in routes.js
      }
}


module.exports={sendVerificationOTPEmail,verifyUserEmail};