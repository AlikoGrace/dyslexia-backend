const mongoose = require("mongoose");


const OTPSchema = new mongoose.Schema({
    email:{type: String, unique:true},
    otp:String,
    createdAt:Date,
    expiresAt:Date,
});



const OTP = mongoose.model("OTP", OTPSchema);

module.exports=OTP;