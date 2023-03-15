const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.mongodb_uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const QuizCategory = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('QuizCategory', QuizCategory, 'quizCategory');