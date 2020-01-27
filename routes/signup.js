
const { check } = require('express-validator');
const router = require('express').Router();

const signup = require('../controllers/signup');

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').isLength({ min: 6 }),
], (req, res) => signup(req, res));

module.exports = router;
