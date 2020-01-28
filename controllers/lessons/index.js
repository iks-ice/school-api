/* eslint-disable consistent-return */
const Lesson = require('../../models/lesson');

const addLesson = async (req, res) => {
  const { subject, time, classroom } = req.body;
  try {
    const lessons = await Lesson.find({ time, classroom });
    if (lessons.length !== 0) {
      return res.status(400).json({ msg: `Classroom #${classroom} has already been booked at ${time}` });
    }
    const lesson = new Lesson({
      subject, time, classroom, teacherId: req.user.id,
    });
    await lesson.save();
    res.json(lesson);
  } catch (err) {
    console.error(err.message);
  }
};
module.exports = {
  addLesson,
};
