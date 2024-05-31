const User = require("./../user/model");
const {sendOTP,verifyOTP,deleteOTP}= require("./../otp/controller");
const {hashData}= require("./../../utils/hashData");
const { hash } = require("bcrypt");






const resetUserPassword = async ({
    email, otp,newPassword
})=>{

    try {
        const validOTP= await verifyOTP({email,otp});
        if (!validOTP){
            return {error:"Invalid code passed, check your"};
        }


        //updatae user record with new password
        if (newPassword.length<5){
            return {error:"Password is too short"};
        }
        

       const hashedNewPassword = await hashData(newPassword);
       await User.updateOne({email}, {password:hashedNewPassword});
       await deleteOTP(email);
    } catch (error) {
        return { error:error.message};
    }
}









const sendPasswordResetOTPEmail = async (email)=>{
    try {

        //check if account exist
        const existingUser= await User.findOne({email});
        if (!existingUser){
            return {error:"Theres no account for the provided email"};
        }


        if (!existingUser.verified){
            return{error:"Email hasn't been verified yet, check your inbox"}
        }
        

        const otpDetails={
            email,
            subject:"Password Reset",
            message:"Enter the code below to reset your password",
            duration:1,
        };
        
        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        return {error:error.message};
    }
}





module.exports={sendPasswordResetOTPEmail,resetUserPassword};