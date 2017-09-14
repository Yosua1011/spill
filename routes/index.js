var express = require('express');
var router = express.Router();
var models = require('../models');
var nodemailer = require("nodemailer");


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
//   models.Order.findAll()
//   .then(
//     res.redirect('/')
//   )
//   .catch(err => {
//     res.send(err)
//   })
// })

// router.post('/addOrder', (req,res) => {
//   models.Order.create({
//     order: `order`,
//     price: `price`,
//   })
//   .then(order => {
//     res.send(order)
//   })
//   .catch(err => {
//     res.send(err)
//     console.log(err);
//   })
// })

router.get('/sendMail', (req,res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "spillproject14@gmail.com",
      pass: "1monitoraoc131"
    }
    });
    
    var mailOptions = {
      from: `spillproject14@gmail.com`,
      to: `yosua1011@outlook.com`,
      subject: `Sending Email using node.js`,
      text: 'That was easy'
    }

    transporter.sendMail(mailOptions, function(error) {
      if(error) {
        console.log(error)
      } else {
        console.log('Email Sent')
      }
    })
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
