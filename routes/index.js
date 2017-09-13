var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

//Register
router.get('/register', (req, res) => {
  res.render('register', {title: 'Register', error_reg: false})
})

module.exports = router;
