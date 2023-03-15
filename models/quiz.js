const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.mongodb_uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Quiz = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  quizCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});


module.exports = mongoose.model('Quiz', Quiz, 'quiz');