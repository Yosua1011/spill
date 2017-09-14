var express = require('express');
var router = express.Router();
var models = require('../models');
var calculator = require('../helpers/calculate')

/* GET home page. */
// router.use((req,res,next) => {
//   if(req.session.hasLogin) {
//     next()
//   } else {
//     res.redirect('/login')
//   }
// })

router.get('/', (req, res)=>{
  models.Order.findAll({
    // include: [{models: models.Payee}]
  })
  // .then(order => {
  //   if(order === []) {
  //     // res.redirect('/addorder')
  //     res.send(error)
  //   }
  // })
    .then(order => {
      if (req.session.hasLogin) {
        res.render('index', {title: "Split Bill", session: req.session, data_order: order})
        // res.redirect('/counter')
        // res.send(order)
      } else {
        res.redirect('/login')
      }
    })
    .catch(err => {
      console.log(err);
    })
})

// router.get('/addOrder', (req,res,next) => {
//   models.Order.findAll({

//   })
//   .then(
//     res.redirect('/')
//   )
// })

router.post('/addOrder', (req,res) => {
  models.Order.create({
    order: `order`,
    price: `price`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
})

// router.get('/counter', (req,res) => {
//   res.render('counter', {title: "Counter", session: req.session})
// })

// router.post('/counterinput', (req,res) => {
//   if (req.session.hasLogin) {
//     res.render('index', {title: "Split Bill", session: req.session, amount: req.body.amount})
//   } else {
//     res.redirect('/login')
//   }
// })

// router.post('/order/add/:amount', function(req,res) {
//   // let result = calculator(req.body,amount)
//   res.send(req.body)
// })

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
