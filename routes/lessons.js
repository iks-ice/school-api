const router = require('express').Router();

router.get('/', (req, res) => {
  let lessons;
  res.json(lessons);
});
module.exports = router;
