/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
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
