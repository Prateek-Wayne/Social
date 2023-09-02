const nodeMailer=require('nodemailer');

exports.sendEmail=async(options)=>{
    var transporter = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "8b455b8bd47fb3",
          pass: "3aa5d979c4ad6c"
        }
      });
    const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};