const express = require('express');

const router = express.Router();

const { validateSignupForm } = require('../middlewares');
const userController = require('../controllers/userController');

router.post('/', [
  validateSignupForm,
  userController.signup,
]);

module.exports = router;