const { User } = require('../../models/user');
const createHttpError = require('http-errors');
const { sendEmail } = require('../../middlewares');


const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  console.log(user);

  if (!user || user.verify) {
    throw createHttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify you email",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationCode}">Click verify email</a>`
  };

  await sendEmail(verifyEmail);

  res.json({
    message: 'Verify email resend'
  })
}

module.exports = resendVerifyEmail;