/* eslint-disable consistent-return */
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
    // Assumption that a user can have either teacher or student domain only
    const regexEmail = /(?<=@)(.*?)(?=\.)/;
    const role = email.match(regexEmail)[0];
    user = new User({
      name, email, password, role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
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
  } catch (err) {
    console.error(err.message);
  }
};
