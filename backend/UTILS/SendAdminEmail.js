// const nodemailer = require('nodemailer');

// const sendAdminEmail = async (order, userEmail) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.ADMIN_EMAIL,
//         pass: process.env.ADMIN_EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.ADMIN_EMAIL,
//       to: process.env.ADMIN_EMAIL,
//       replyTo: userEmail,
//       subject: '🛒 New Order Placed!',
//       text: `
// New Order Received!

// 📅 Service Date: ${order.serviceDate}
// 💰 Total Amount: ₹${order.totalAmount}
// 📧 Ordered by: ${userEmail}

// 🛍️ Items:
// ${order.cartItems.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('\n')}
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
// console.log("ADMIN_EMAIL_PASSWORD:", process.env.ADMIN_EMAIL_PASSWORD);

//     console.log("📧 Email sent to admin!");
//   } catch (error) {
//     console.error("❌ Failed to send email to admin:", error);
//   }
// };

// module.exports = sendAdminEmail;





const nodemailer = require('nodemailer');

const sendAdminEmail = async (order, userEmail) => {
  try {
    console.log(process.env.ADMIN_EMAIL);
    console.log(process.env.ADMIN_EMAIL_PASSWORD);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
      
      
    });
    

    // Verify the transporter before sending email
    const isVerified = await transporter.verify();
    // if (!isVerified) {
    //   console.error("❌ Transporter verification failed");
    //   return;
    // }
    try {
      await transporter.verify();
      console.log("✅ Transporter verified");
    } catch (verifyError) {
      console.error("❌ Transporter verification failed:", verifyError);
      return;
    }
    

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      replyTo: userEmail,
      subject: '🛒 New Order Placed!',
      text: `
        New Order Received!
        
        📅 Service Date: ${order.serviceDate}
        💰 Total Amount: ₹${order.totalAmount}
        📧 Ordered by: ${userEmail}
        
        🛍️ Items:
        ${order.cartItems.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('\n')}
      `,
    };

    // Send the email if transporter is verified
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent to admin!");

  } catch (error) {
    console.error("❌ Failed to send email to admin:", error);
  }
};

module.exports = sendAdminEmail;
