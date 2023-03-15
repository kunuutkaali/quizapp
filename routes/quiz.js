var express = require('express');
var router = express.Router();
var connectEnsureLoggedIn = require('connect-ensure-login');
const Category = require('../models/quizCategory');

// Create a quiz category form
router.get('/', (req, res, next)=>{
  res.send('Responded with resource')
})

// Create a quiz category form
router.get('/create-quiz-category', (req, res, next)=>{
  res.render('quiz/create-quiz-category')
})
// Post a quiz category form
router.post('/create-quiz-category', async(req, res, next)=>{
  const category = req.body;
  const data = new Category(category);
  try {
    const result = await data.save();
  } catch (error) {
    console.log(error);
  }
})


// Create a quiz
router.get('/create-quiz', (req, res, next)=>{
  res.render('quiz/create-quiz')
})


// Export the router:
module.exports = router;