/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkAuth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.json({ msg: 'Authantication failed' });
  }
  try {
    const decoded = await jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
  }
};


const checkRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role === 'teacher') {
      return next();
    }
    return res.status(400).json({ msg: 'Permission denied' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  checkRole,
  checkAuth,
};
