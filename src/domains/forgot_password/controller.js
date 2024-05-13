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
            throw Error("Invalid code passed, check your");
        }


        //updatae user record with new password
        if (newPassword.length<5){
            throw Error("Password is too");
        }
        

       const hashedNewPassword = await hashData(newPassword);
       await User.updateOne({email}, {password:hashedNewPassword});
       await deleteOTP(email);
    } catch (error) {
        throw error;
    }
}









const sendPasswordResetOTPEmail = async (email)=>{
    try {

        //check if account exist
        const existingUser= await User.findOne({email});
        if (!existingUser){
            throw Error("Theres no account for the provided email");
        }


        if (!existingUser.verified){
            throw Error("Email hasn't been verified yet, check your inbox")
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
        throw error
    }
}





module.exports={sendPasswordResetOTPEmail,resetUserPassword};