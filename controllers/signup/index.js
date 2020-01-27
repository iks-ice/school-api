const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(errors);
  }
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: 'User exists' });
    }
    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: 360000,
    }, (err, token) => {
      if (err) {
        console.error(err.message);
      }
      res.json(token);
    });
    await user.save();
  } catch (err) {
    console.error(err.message);
  }
  res.json({ msg: 'signed up ' });
};
