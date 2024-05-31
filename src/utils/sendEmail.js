const nodemailer = require("nodemailer");

const {AUTH_EMAIL, AUTH_PASS}= process.env;

let transporter = nodemailer.createTransport({
  service:'gmail',

  auth: {
      user:AUTH_EMAIL,
      pass:AUTH_PASS,
  },
})


//test transporter

transporter.verify((error, success)=>{
    if (error){
        console.log(error);
    }else{
        console.log("Ready for messages");
        console.log(success);
    }
});

const sendEmail = async (mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      return;
    } catch (error) {
      console.error("Error sending email:", error);
      // You can also throw a custom error here if needed
    }
  };
  


module.exports= sendEmail;