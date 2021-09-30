module.exports = {
  emailConflict: {
    error: {
      message: 'email already exists',
      code: 409,
    },
  },
  internalError: {
    error: {
      message: 'internal server error',
      code: 500,
    },
  },
  wrongEmailOrPassword: {
    error: {
      message: 'Incorrect username or password',
      code: 401,
    },
  },
};