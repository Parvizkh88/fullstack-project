import nodemailer from "nodemailer";
import dev from "../config";

//sendEmailWithNodeMailer is a constant that holds a function
// which takes an object with properties email, subject, and
// html (all strings), and returns a promise that resolves to void
const sendEmailWithNodeMailer: (emailData: {
  email: string;
  subject: string;
  html: string;
}) => Promise<void> = async (emailData) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: dev.app.smtpUsername, // generated ethereal user
        pass: dev.app.smtpPassword, // generated ethereal password
      },
    });

    const mailOptions = {
      from: dev.app.smtpUsername, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("-----SMTP ERROR1--------");
        console.log(error);
      } else {
        console.log("Message sent: %s", info.response);
      }
    });
  } catch (error) {
    console.log("-----SMTP ERROR2--------");
    console.log("Problem sending Email: ", error);
  }
};

export default sendEmailWithNodeMailer;
