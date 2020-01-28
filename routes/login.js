
const router = require('express').Router();
const { check } = require('express-validator');


router.post('/', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').isLength({ min: 6 }),
], require('../controllers/auth/login'));

module.exports = router;
