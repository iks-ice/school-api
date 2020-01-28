const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  time: {
    type: Date,
    required: true,
  },
  classroom: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('lessons', LessonSchema);
