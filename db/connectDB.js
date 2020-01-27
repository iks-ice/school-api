const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo db connected');
  } catch (err) {
    console.error(err.messaage);
  }
};
module.exports = connectDB;
