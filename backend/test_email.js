require('dotenv').config();
const sendEmail = require('./utils/sendEmail');

const testEmail = async () => {
    console.log('Testing email configuration...');
    console.log('SMTP_EMAIL:', process.env.SMTP_EMAIL ? 'Set' : 'Not Set');
    console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? 'Set' : 'Not Set');

    try {
        await sendEmail({
            email: 'cbschandrashrestha@gmail.com', // Sending to the admin email directly
            subject: 'Test Email from Smart Wellness',
            message: 'This is a test email to verify your SMTP configuration.',
        });
        console.log('Test email sent successfully!');
    } catch (error) {
        console.error('Test email failed:', error.message);
        if (error.code === 'EAUTH') {
            console.log('Hint: Check your email and app password. Make sure you are using an App Password, not your login password.');
        }
    }
};

testEmail();
