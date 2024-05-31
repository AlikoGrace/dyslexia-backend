const User = require("./../user/model");
const {sendOTP,verifyOTP,deleteOTP}= require("./../otp/controller");



const verifyUserEmail= async({email,otp})=>{
    try {

        const validOTP = await verifyOTP({email,otp});
        if (!validOTP){
            return {error:"Invalid code passed, check your inbox."};
        }

        //update user record to show verified.
        await User.updateOne({email}, {verified: true});

        await deleteOTP(email);
        return{message:'Email verified successfully'}
        
    } catch (error) {
         return {error:error.message};
    }
}




const sendVerificationOTPEmail = async (email)=>{
    try {

        //check if account exist
    
        const existingUser = await User.findOne({email});
    
        if(!existingUser){
            return {error:"There's no account for the provided email."};
        }

        const otpDetails ={
            email,
            subject:"Email verification",
            message:"Verify your email with the code below.",
            duration:1
        };

        const createdOTP = await sendOTP(otpDetails);
        return {message:'OTP sent successfully',otp:createdOTP};
        
    } catch (error) {
        console.error("Error searching for user:", error);
        return{error:error.message}; 
      }
}


module.exports={sendVerificationOTPEmail,verifyUserEmail};