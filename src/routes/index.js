const express = require("express");
const router = express.Router();



const userRoutes = require("./../domains/user");
const OTPRoutes= require("./../domains/otp");
const EmailVerificationRoutes=require("./../domains/email_verification");
const ForgotPasswordRoutes=require("./../domains/forgot_password");
const childRoute = require("./../domains/child");

router.use("/user",userRoutes);
router.use("/otp", OTPRoutes);
router.use("/email_verification", EmailVerificationRoutes);
router.use("/forgot_password", ForgotPasswordRoutes);
router.use("/child", childRoute);


module.exports=router;