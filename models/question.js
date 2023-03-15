const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.mongodb_uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Question = new Schema({
  index: {
    type: Number,
    required: true
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  question: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Question', Question, 'questions');