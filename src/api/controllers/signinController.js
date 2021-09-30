const userService = require('../services/userService');

const signIn = async (req, res) => {
  const user = req.body;

  const result = await userService.signIn(user);

  const { error } = result;

  if (error) return res.status(error.code).json({ message: error.message });

  return res.status(200).json(result);
};

module.exports = { signIn };