const router = require('express').Router();
const { checkAuth, checkRole } = require('../middlewares/checkPermissons');
const Lesson = require('../models/lesson');
const { addLesson, editLesson } = require('../controllers/lessons');

router.get('/', checkAuth, async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    console.error(err.message);
  }
});


router.post('/', checkAuth, checkRole, addLesson);
router.put('/:id', checkAuth, checkRole, editLesson);
module.exports = router;
