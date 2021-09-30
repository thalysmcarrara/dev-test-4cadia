const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const userModel = require('../models/userModel');

const { emailConflict, internalError, wrongEmailOrPassword } = require('./exceptions');

const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const checkUser = async (password, hash = '') => {
  const match = await bcrypt.compare(password, hash);

  return match;
};

const signup = async ({ name, email, password }) => {
  const exists = await userModel.findByEmail(email);

  if (exists) return emailConflict;

  const encryptedPassword = await encryptPassword(password);

  const releaseDate = new Date();

  const userWithDate = {
    name,
    email,
    password: encryptedPassword,
    releaseDate,
  };

  const result = await userModel.signup(userWithDate);

  if (!result) return internalError;

  return result;
};

const signIn = async ({ email, password }) => {
  const user = await userModel.findByEmail(email);
  
  const match = await checkUser(password, user.password);

  if (!match) return wrongEmailOrPassword;

  const { _id } = user;

  const payload = {
    _id,
  };

  const options = { expiresIn: '7d' };

  const { SECRET } = process.env;

  const token = jwt.sign(payload, SECRET, options);

  return { token };
};

module.exports = { signup, signIn };
