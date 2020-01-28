
const { check } = require('express-validator');
const router = require('express').Router();

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').isLength({ min: 6 }),
], require('../controllers/auth/signup'));

module.exports = router;
