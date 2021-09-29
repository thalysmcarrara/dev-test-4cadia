const userService = require('../services/userService');

const signup = async (req, res) => {
  const user = req.body;

  const result = await userService.signup(user);

  const { error } = result;

  if (error) return res.status(error.code).json({ message: error.message });

  return res.status(201).json(result);
};

module.exports = { signup };
