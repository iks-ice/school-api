
const router = require('express').Router();

router.post('/', (req, res) => {
  res.json({ msg: 'signed up ' });
});

module.exports = router;
