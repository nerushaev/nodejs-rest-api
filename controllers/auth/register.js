const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const randomId = require('random-id');
const { User } = require('../../models/user');
const { sendEmail } = require('../../middlewares');
const createHttpError = require('http-errors');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createHttpError(409, "Email in use...")
  }
  
  const hashPassword = await bcrypt.hash(password, 10); 
  const avatarURL = gravatar.url(email);
  const verificationCode = randomId();

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode });
  
  const verifyEmail = {
    to: email,
    subject: "Verify you email",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationCode}">Click verify email</a>`
  };

  await sendEmail(verifyEmail);


  res.status(201).json({
    name: newUser.name,
    email: newUser.email
  })
}

module.exports = register;