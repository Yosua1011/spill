var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

// router.post('/login', (req,res) => {
//   models.User.findAll({
//     where: {
//       email: `${req.body.email}`
//     }
//   })
//   .then(user => {
//     // if(req.body.email === user[0])
//     res.send(user)
//   })
// })

//Register
router.get('/register', (req, res) => {
  res.render('register', {title: 'Register', error_reg: false})
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
