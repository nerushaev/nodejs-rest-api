const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    match: emailRegexp,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  avatarURL: {
    type: String,
    required: true
  },
  token: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    required: [true, "Verify token is required"]
  }
}, { versionKey: false, timestampts: true });

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required()
})

const EmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})

const schemas = {
  registerSchema,
  loginSchema,
  EmailSchema,
}

const User = model("user", userSchema);

module.exports = {
  User,
  schemas
}