// var nodemailer = require("nodemailer");

// var smtpTransport = nodemailer.createTransport("SMTP",{
// host: "mail.smtp2go.com",
// port: 2525, // 8025, 587 and 25 can also be used. 
// auth: {
// user: "USERNAME",
// pass: "PASSWORD"
// }
// });

// smtpTransport.sendMail({
// from: "Sender Name ",
// to: "Recipient Name ",
// subject: "Your Subject",
// text: "It is a test message"
// }, function(error, response){
// if(error){
// console.log(error);
// }else{
// console.log("Message sent: " + response.message);
// }
// });