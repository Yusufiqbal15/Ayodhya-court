const nodemailer = require('nodemailer');

// Simple Gmail configuration
const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
};

if (!emailConfig.auth.user || !emailConfig.auth.pass) {
  throw new Error('Email credentials not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.');
}

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

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
    console.log('📧 emailConfig: Starting to send email');
    console.log('📧 emailConfig: Using credentials for:', emailConfig.auth.user);
    
    const mailOptions = {
      from: {
        name: 'District Magistrate Office, Ayodhya',
        address: emailConfig.auth.user
      },
      to: to,
      subject: subject,
      html: html
    };

    console.log('📧 emailConfig: Mail options prepared, sending...');
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 emailConfig: Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ emailConfig: Email sending failed:', error.message);
    console.error('❌ emailConfig: Full error:', error);
    throw error;
  }
};

module.exports = {
  transporter,
  sendEmail,
  testEmailConfig,
  emailConfig
};
