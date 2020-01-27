const { check } = require('express-validator');

const checkSignupData = (req, res, next) => {
  check('name', 'Name is required').not().isEmpty();
  check('email', 'Email is required').isEmail();
  check('password', 'Password is required').isLength({ min: 6 });
  return next();
};

module.exports = {
  checkSignupData,
};
