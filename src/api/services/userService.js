const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { emailConflict, internalError } = require('./exceptions');

const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
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

module.exports = { signup };