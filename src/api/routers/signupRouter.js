const express = require('express');

const router = express.Router();

const { validateSignupForm } = require('../middlewares');
const signupController = require('../controllers/signupController');

router.post('/', [
  validateSignupForm,
  signupController.signup,
]);

module.exports = router;