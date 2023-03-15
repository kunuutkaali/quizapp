const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect(process.env.mongodb_uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = new Schema({
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String
  },
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  created_date: {
    type: Date,
    default: new Date()
  }
});

User.plugin(passportLocalMongoose, {usernameField: 'email', usernameLowerCase:true});

module.exports = mongoose.model('User', User, 'users');