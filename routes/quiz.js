var express = require('express');
var router = express.Router();
var connectEnsureLoggedIn = require('connect-ensure-login');
const Category = require('../models/quizCategory');

router.get('/', (req, res, next)=>{
  res.send('Here we are going to show quiz overview')
})
// Quiz categories
router.get('/quiz-categories', async(req, res, next)=>{
  try {
    const data = await Category.find();
    res.render('quiz/quiz-categories', {categories: data});
  } catch (error) {
    console.error(error);
  }
})

// Create quiz category form
router.get('/create-quiz-category', (req, res, next)=>{
  res.render('quiz/create-quiz-category')
})
// Post a quiz category form
router.post('/create-quiz-category', async(req, res, next)=>{
  const category = req.body;
  const data = new Category(category);
  try {
    const result = await data.save();
    console.log(result);
    res.redirect('/quiz/quiz-categories');
  } catch (error) {
    console.log(error);
  }
})


// GET Create a quiz form
router.get('/create-quiz', async(req, res, next)=>{
  try {
    const categories = await Category.find();
    res.render('quiz/create-quiz', {categories: categories});
  } catch (error) {
    res.redirect('Something went wrong getting the categories', '/users/dashboard');
  }
})
// POST Create a quiz form
router.post('/create-quiz', async(req, res, next)=>{
  console.log(req.body.questions);
  res.redirect('/quiz/create-quiz');
})


// Export the router:
module.exports = router;