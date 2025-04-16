// const nodemailer = require('nodemailer');

// const sendUserEmail = async (orderId,deliveryStatus, userEmail) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//        user: "ashu203410@gmail.com",
//         pass: "boqhsfyyhkjupdot",
//       },
//     });

//     // Verify the transporter before sending email
//     const isVerified = await transporter.verify();
//     // if (!isVerified) {
//     //   console.error("❌ Transporter verification failed");
//     //   return;
//     // }
//     try {
//       await transporter.verify();
//       console.log("✅ Transporter verified");
//     } catch (verifyError) {
//       console.error("❌ Transporter verification failed:", verifyError);
//       return;
//     }
    

//     const mailOptions = {
//       from: "ashu203410@gmail.com",
     
//       to: userEmail,
//       subject: ` Order ${deliveryStatus} - Order ID:${orderId}`,
//       text: `
//         Hi,
//         Your  order (Id: ${orderId}) has been ${deliveryStatus} by the admin.
//         Thanlkyou for using our service
//         ...Team Supprt
//             `
//             };

//     // Send the email if transporter is verified
//     await transporter.sendMail(mailOptions);
//     console.log("📧 Email sent to user!");

//   } catch (error) {
//     console.error("❌ Failed to send email to user:", error);
//   }
// };

// module.exports = sendUserEmail;

const nodemailer = require('nodemailer');

const sendUserEmail = async (orderId, deliveryStatus, userEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
      
    });

    // Verify transporter once
    try {
      await transporter.verify();
      console.log("✅ Transporter verified");
    } catch (verifyError) {
      console.error("❌ Transporter verification failed:", verifyError);
      return;
    }

    console.log("Sending email to:", userEmail); // ✅ Debug log

    const mailOptions = {
        from: process.env.ADMIN_EMAIL, // ✅ MUST match transporter user
      to: userEmail,
      subject: `Order ${deliveryStatus} - Order ID: ${orderId}`,
      text: `
Hi,

Your order (ID: ${orderId}) has been ${deliveryStatus} by the admin.

Thank you for using our service.
— Team Support
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("📧 Email sent to user!");
    } catch (mailError) {
      console.error("❌ Error while sending email:", mailError);
    }

  } catch (error) {
    console.error("❌ Failed to send email to user:", error);
  }
};

module.exports = sendUserEmail;

