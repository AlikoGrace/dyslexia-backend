const express = require("express");
const router = express.Router();
const {sendPasswordResetOTPEmail, resetUserPassword}= require("./controller");


router.post("/reset",async (req,res)=>{
    try {

        let{email,otp,newPassword}=req.body;
        if (!(email && otp && newPassword)) {
            return res.status(400).json({ error: "Empty credentials are not allowed" });
        }
        const result = await resetUserPassword({ email, otp, newPassword });
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ email, passwordReset: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//passord reset request
router.post("/", async(req, res)=>{

    try {
        const {email}= req.body;
        if(!email){
            return res.status(400).json({ error: "An email is required" });

        }

        const result = await sendPasswordResetOTPEmail(email);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports=router;