const express = require('express');

const router = express.Router();

const { validateSigninForm } = require('../middlewares');
const signinController = require('../controllers/signinController');

router.post('/', [
  validateSigninForm,
  signinController.signIn,
]);

module.exports = router;