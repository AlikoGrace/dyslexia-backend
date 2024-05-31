const express = require("express");
const router = express.Router();
const {sendVerificationOTPEmail, verifyUserEmail}= require("./controller")
const User= require("../../domains/user/model")
const createToken = require("./../../utils/createToken")





router.post("/verify",async(req,res)=>{

    try {
        let{email,otp}=req.body

        const fetchedUser = await User.findOne({email});

          //create user token 
          const tokenData = {userId:fetchedUser._id,email}
          const token = await createToken(tokenData);

        if (!(email && otp)) {
            return res.status(400).json({ error: "Empty OTP details are not allowed" });
        }
       const result= await verifyUserEmail({email, otp,token});
       if (result.error){
        return res.status(400).json({ error: result.error });

       }
        res.status(200).json({email, verified:true,token});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'internal server error'});
    }
})

//request new verification otp
router.post("/",async(req,res)=>{
    try {

        const result = await sendVerificationOTPEmail(email);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router ;