const Joi = require('joi');

const validateSigninForm = async (req, res, next) => {
  const user = req.body;

  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(8).not().empty()
    .required(),
  });

  const validation = schema.validate(user);

  if (validation.error) return res.status(400).json({ message: 'invalid entries, try again' });

  next();
};

module.exports = { validateSigninForm };