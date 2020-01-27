
const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
