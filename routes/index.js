var express = require('express');
var router = express.Router();
var models = require('../models');
var email = require('../helpers/email.js')
var billProccess = require('../helpers/calculate')

/* GET home page. */
router.get('/', (req, res)=>{
  models.Order.findAll({
    include: [{model: models.Payee}]
  })
    .then(order => {
      if (req.session.hasLogin !== false) {
        res.render('index', {title: "Split Bill", session: req.session, data_order: order})
        // res.send(order[0].Payees[0].name)
        // res.send(order)
      } else {
        res.redirect('/login')
      }
    })
    .catch(err => {
      console.log(err);
    })
})

//Bill Rundown
router.get('/billRundown', (req,res) => {
  models.OrderPayee.findAll({
    attributes: [[models.OrderPayee.sequelize.fn('SUM',  models.OrderPayee.sequelize.col('Total')), 'totalPayment'], 'PayeeId'],
    group: ['PayeeId']
  })
  .then((orderPayees) => {
    res.send(orderPayees);
  })
  // models.Order.findAll({
  //   include: [{model: models.Payee}]
  // })
  // .then(order => {
  //   let result = billProccess(order)
  //   res.send(result)
  // })
})
//Add
router.get('/add', (req,res) => {
  res.render('pageOrder', {title: 'Halaman add Order'})
})

router.post('/addOrder', (req,res) => {
  models.Order.create({
    order: `${req.body.menu}`,
    price: `${req.body.price}`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then( order => {
    res.redirect('/')
    // res.send(order)
  })
})

//Edit
router.get('/editOrder', (req,res) => {
  res.render('editOrder', {title: 'Edit your Order'})
})

//Delete
router.get('/delete/:id', (req,res) => {
  models.Order.destroy({
    where: {
      id: `${req.params.id}`
    }
  })
  .then(() => {
    res.redirect('/')
  })
})

//Send email
router.get('/sendMail', (req,res) => {
  email()
  res.redirect('/')
})

//AddnewPayee
router.get('/newPayee', (req,res) => {
  res.render('newPayee', {title: 'Register new Payee'})
})

router.post('/registerPayee', (req,res) => {
  models.Payee.create({
    name: `${req.body.name}`,
    email: `${req.body.email}`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.redirect('/')
  })
})

//AddOrderPayee
router.get('/:id/addPayee', (req,res) => {
  models.Order.findAll({
    where: {
      id: `${req.params.id}`
    }
  })
    .then(order => {
      models.Payee.findAll()
      .then(payees => {
        res.render('addOrderPayee', {data_order: order, data_payee: payees, title: 'Add Payee to Order'})
        // res.send(order)
      })
    })
  
})

router.post('/addOrderPayee/:id', (req,res) => {
  models.OrderPayee.create({
    OrderId: `${req.params.id}`,
    PayeeId: `${req.body.PayeeId}`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(order => {
    res.redirect('/')
  })
  .catch(err => {
    res.send(err)
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
      if(users.length > 0) {
        users.forEach(user => {
          if(req.body.email === user.email && req.body.password === user.password) {
            req.session.hasLogin = true
            res.redirect('/')
            } else {
              res.render('login', {title: 'login', error_login: true})
            }
        })
      } else {
        res.render('login', {title: 'login', error_login: true})
      }
    })
    .catch(err => {
      res.render('login', {title: 'login', error_login: true})
      // console.log(err)
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
