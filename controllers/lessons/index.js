/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');
const Lesson = require('../../models/lesson');
const User = require('../../models/user');


const read = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const create = async (req, res) => {
  const { subject, time, classroom } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }
  try {
    const lessons = await Lesson.find({ time, classroom });
    if (lessons.length !== 0) {
      return res.status(400).json({ msg: `Classroom #${classroom} has already been booked at ${time}` });
    }
    const lesson = new Lesson({
      subject, time, classroom, teacherId: req.user.id,
    });

    await lesson.save();
    const user = await User.findById(req.user.id);
    user.lessons.push(lesson.id);
    await user.save();
    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const update = async (req, res) => {
  const { subject, time, classroom } = req.body;
  const lessonFields = {};
  if (subject) lessonFields.subject = subject;
  if (time) lessonFields.time = time;
  if (classroom) lessonFields.classroom = classroom;
  try {
    let lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(400).json({ msg: 'Lesson does not exist' });
    }
    if (req.user.id !== lesson.teacherId.toString()) {
      return res.status(400).json({ msg: 'You do not have permission to edit lessons of other teachers' });
    }
    lesson = await Lesson.findOneAndUpdate(req.params.id,
      { $set: lessonFields },
      { new: true });
    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const del = async (req, res) => {
  try {
    let lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(400).json({ msg: 'Lesson does not exist' });
    }
    if (req.user.id !== lesson.teacherId.toString()) {
      return res.status(400).json({ msg: 'You do not have permission to remove lessons of other teachers' });
    }
    lesson = await Lesson.findByIdAndRemove(req.params.id);
    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const add = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(400).json({ msg: 'Lesson does not exist' });
    }
    const user = await User.findById(req.user.id);
    if (user.lessons.includes(req.params.id)) {
      return res.status(400).json({ msg: 'You have already added this lesson to your list' });
    }
    user.lessons.push(lesson.id);
    await user.save();
    res.json(user.lessons);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
module.exports = {
  read,
  create,
  update,
  del,
  add,
};
