const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.mongodb_uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const QuestionAnswer = new Schema({
  index: {
    type: Number,
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'question'
  },
  answer: {
    type: String,
    required: true
  },
  correct: {
    type: Boolean,
    required: true,
    default: false
  }
});


module.exports = mongoose.model('questionAnswer', QuestionAnswer, 'questionAnswers');