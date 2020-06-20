require('dotenv').config();

module.exports = async function getForgotPasswordEmail(userEmail, token) {
  resetUrl = '/reset/' + token;

  return {
    from: process.env.EMAIL_ADDRESS,
    to: userEmail,
    subject: 'Link to Reset Password',
    text:
      'You are receiving this email because you (or someone else) has requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
      resetUrl +
      '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n',
  };
};
