var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.hasLogin) {
    res.render('index', {title: "Split Bill", session: req.session})
  } else {
    res.redirect('/login')
  }
});


//Login

router.get('/login', (req, res) => {
  res.render('login', {title: 'Login', error_login: false})
})

router.post('/login', (req, res) => {
  models.User.findAll({
    where: {
      username: `${req.body.username}`
    }
  })
    .then( users => {
      users.forEach(user => {
        if(req.body.username === user.username && req.body.password === user.password) {
          req.session.hasLogin = true
          res.redirect('/')
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
