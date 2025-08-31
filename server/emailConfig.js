const nodemailer = require('nodemailer');

// Simple Gmail configuration
const emailConfig = {
  service: 'gmail',
  auth: {
    user: 'jrkwrit53@gmail.com', // Your Gmail address
    pass: 'bqvd jtyv dilm pnnr'  // Your Gmail App Password
  }
};

// Create transporter
const transporter = nodemailer.createTransporter(emailConfig);

// Test email configuration
const testEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return false;
  }
};

// Send email function
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: {
        name: 'District Magistrate Office, Ayodhya',
        address: emailConfig.auth.user
      },
      to: to,
      subject: subject,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    throw error;
  }
};

module.exports = {
  transporter,
  sendEmail,
  testEmailConfig,
  emailConfig
};
