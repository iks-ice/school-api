
const { validationResult } = require('express-validator');
const router = require('express').Router();
const { checkSignupData } = require('../middlewares/checkSignupData');

router.post('/', checkSignupData, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(errors);
  }
  res.json({ msg: 'signed up ' });
});

module.exports = router;
