var express = require('express');
var router = express.Router();
var models = require('../models');
var calculator = require('../helpers/calculate')

/* GET home page. */
router.post('/', function(req, res, next) {
  if (req.session.hasLogin) {
    res.render('index', {title: "Split Bill", session: req.session, amount: req.body.amount})
  } else {
    res.redirect('/login')
  }
  // res.send(req.body)
});

router.get('/counter', (req,res) => {
  res.render('counter', {title: "Counter", session: req.session})
})

router.post('/order/add/:amount', function(req,res) {
  let result = calculator(req.body,amount)
  res.send(result)
})

//Login

router.get('/login', (req, res) => {
  res.render('login', {title: 'Login', error_login: false})
})

router.post('/login', (req, res) => {
  models.User.findAll({
    where: {
      email: `${req.body.email}`
    }
  })
    .then( users => {
      users.forEach(user => {
        if(req.body.email === user.email && req.body.password === user.password) {
          req.session.hasLogin = true
          res.redirect('/counter')
          }
        })
      })
    .catch(err => {
      res.render('login', {title: 'login', error_login: true})
    })
})

//Logout
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})
module.exports = router;

//Register
router.get('/register', (req, res) => {
  res.render('register', {title: 'Register', error_reg: false, session: req.session})
})

router.post('/registeruser', (req,res) => {
    models.User.create({
      email: `${req.body.email}`,
      password: `${req.body.password}`,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      console.log(err);
    })
  })


module.exports = router;
