
const { check, validationResult } = require('express-validator');
const router = require('express').Router();

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(errors);
  }
  res.json({ msg: 'signed up ' });
});

module.exports = router;
