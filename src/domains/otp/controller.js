const OTP = require("./model");
const generateOTP = require("./../../utils/generateOTP");
const sendEmail= require("./../../utils/sendEmail");
const{hashData,verifyHashedData}= require("./../../utils/hashData")
const {AUTH_EMAIL}= process.env;


const verifyOTP = async ({email, otp})=>{
    try {

     if (!(email && otp)){
        throw Error("provide values for email, otp");
     }

     //ensure otp record exist 
     const matchedOTPRecord = await OTP.findOne({
        email
     });

     if (!matchedOTPRecord){
        throw Error("No otp records found.")
     }

    const {expiresAt}= matchedOTPRecord;

    //checking for exipired code
     if (expiresAt< Date.now()){
        await OTP.deleteOne({email});
        throw Error("code has expired.Request for a new one");
     }

     

     //not expired yet, verify value
     const hashedOTP = matchedOTPRecord.otp;
     const validOTP = await verifyHashedData(otp,hashedOTP); 
     return validOTP;
        
    } catch (error) {
        throw error;
        
    }
}

const sendOTP = async ({email,subject, message,duration=1})=>{

    try {

        if(!(email && subject && message)){
            throw Error("provide values for email, subject,message");
        }


    
        //clear my old record
        await OTP.deleteOne({email});

        //gemerate new pin 
        const generatedOTP = await generateOTP();

        //send email
        const mailOptions={
            from: AUTH_EMAIL,
            to:email,
            subject,
            html:`<p>${message}</p><p style="color:tomato;
            font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration}
            hour(s)</b>.</p>`,
        };
        await sendEmail(mailOptions);

        //save otp record
        const hashedOTP =await hashData(generatedOTP);
        const newOTP = await new OTP({
            email,
            otp:hashedOTP,
            createdAt:Date.now(),
            expiresAt:Date.now() + 3600000 * +duration,
            //the plus in the middle will cast it into an integer value if it's not.
        });

        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;

        
    } catch (error) {
        throw error;
    }
}


const deleteOTP= async(email)=>{
    try {

        await OTP.deleteOne({email});
        
    } catch (error) {
        throw error;
    }
}


module.exports= {sendOTP, verifyOTP,deleteOTP};