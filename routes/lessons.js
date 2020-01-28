const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const Lesson = require('../models/lesson');
const { addLesson } = require('../controllers/lessons');

router.get('/', checkAuth, async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    console.error(err.message);
  }
});


router.post('/', checkAuth, addLesson);
module.exports = router;
