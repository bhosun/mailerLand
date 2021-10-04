// - when a route is hit  schedule a mail to be sent
// - trigger an eventt(mail) when a task is done eg login and signup
//     . finance(when a user withdraws)

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const nodemailer = require("nodemailer") 

async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
});

  // send mail with defined transport object
let info = await transporter.sendMail({
    from: '"Boss Buzz 👻" <bhorsun@yahoo.com>', // sender address
    to: "bhorsun71@gmail.com, bhorsun71@gmail.com", // list of receivers
    subject: "Hello from the mailer Project", // Subject line
    text: "Welcome to the movement, the movement of moving mails", // plain text body
    html: "<b>Hello world?</b>", // html body
});

console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

app.get("/fire", (req, res) => {  
    main().catch(console.error);
})

app.listen('3000', () => 
    console.log('app running on port 3000')
);