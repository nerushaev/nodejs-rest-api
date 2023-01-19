const { User } = require('../../models/user');
const createHttpError = require('http-errors');

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  console.log(verificationCode);
  const user = await User.findOne({ verificationCode });
  console.log(user);
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: '' });

  res.json({
    status: 200,
    message: 'Verification successful',
  })
}

module.exports = verify;
