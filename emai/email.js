"use strict";
const nodemailer = require("nodemailer");







module.exports.sendEmail=function(email,otp,callback){
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'valmikibrahmin@gmail.com',
            pass: 'ugmsageofthe'
        }
      });
    
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: 'valmikibrahmin@gmail.com', // sender address
        to:email, // list of receivers
        subject: "OTP For Prescription Checkout", // Subject line
        text:otp      
      });
      //console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
}