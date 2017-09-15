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
      if (req.session.hasLogin) {
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

//Show Payee List
router.get('/payeeList', (req, res)=>{
  models.Payee.findAll()
    .then(payee => {
      if (req.session.hasLogin) {
        // res.render('editpayee', {title: "Edit Payee", session: req.session, data_payee: payee})
        res.render('payeeList', {data_payee: payee, title: "Edit Payee's Data"})
      } else {
        res.redirect('/')
      }
    })
    .catch(err => {
      console.log(err);
    })
})

//Edit Payee Data
router.get('/editpayee/:id', (req, res)=>{
  models.Payee.findAll({
    where: {
      id: `${req.params.id}`
    }
  })
    .then(payee => {
      if (req.session.hasLogin) {
        res.render('editpayee', {title: "Edit Payee", session: req.session, data_payee: payee})
        // res.send(payee)
      } else {
        res.redirect('/')
      }
    })
    .catch(err => {
      console.log(err);
    })
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

//Edit Order
router.get('/editOrder/:id', (req,res) => {
  models.Order.findAll({
    where: {
      id: `${req.params.id}`
    }
  })
  .then(order => {
    res.render('orderEdit', {data_order: order, title: "Edit Order"})
  })
})

router.post('/edit/:id', (req,res) => {
  models.Order.update({
    order: `${req.body.menu}`,
    price: `${req.body.price}`,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    where: {id: `${req.params.id}`}
  })
  .then(()=> {
    res.redirect('/')
  })
})

//Delete
router.get('/delete/:id', (req,res) => {
  models.Order.destroy({
    where: {
      id: `${req.params.id}`
    }
  })
  .then(() => {
    models.OrderPayee.destroy({
      where: {
        OrderId: `${req.params.id}`
      }
    })
  })
  .then(() => {
    res.redirect('/')
  })
})

//Send email
router.get('/:amount/sendMail/:id', (req,res) => {
  models.Payee.findAll({
    where: {
      id: `${req.params.id}`
    }
  })
  .then(payee => {
    email(payee[0].name,payee[0].email,`${req.params.amount}`)
    res.redirect('/billRundown')
  })
  .catch(err => {
    console.log(err)
  })
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
    res.redirect('/payeeList')
  })
})

//Delete Payee
router.get('/deletePayee/:id', (req,res) => {
  models.Payee.destroy({
    where: {
      id: `${req.params.id}`
    }
  })
  .then(() => {
    res.redirect('/payeeList')
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
    Total: `${req.body.Cost}`,
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

//Bill Rundown
router.get('/billRundown', (req,res) => {
  models.OrderPayee.findAll({
    attributes: [[models.OrderPayee.sequelize.fn('SUM',  models.OrderPayee.sequelize.col('Total')), 'totalPayment'], 'PayeeId'],
    group: ['PayeeId']
  })
  .then((orderPayees) => {
    res.render('billOrder', {data: orderPayees, title: 'Bill'});
  })
})

//Login

router.get('/login', (req, res) => {
  res.render('login', {title: 'Login', error_login: false, msg:null})
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
              res.render('login', {title: 'login', error_login: true, msg: 'Email or Password is wrong'})
            }
        })
      } else {
        res.render('login', {title: 'login', error_login: true, msg:'Email or Password is wrong'})
      }
    })
    .catch(err => {
      res.render('login', {title: 'login', error_login: true, msg:'Email or Password is wrong'})
    })
})

//Logout
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

//Register
router.get('/register', (req, res) => {
  res.render('register', {title: 'Register', data_error: false, title:'Add New User', session: req.session})
})

router.post('/registeruser', (req,res) => {
    models.User.create({
      email: `${req.body.email}`,
      password: `${req.body.password}`,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(user => {
      res.redirect('/login')
    })
    .catch(err => {
      let data_temporary = {
        email: `${req.body.email}`,
        password: `${req.body.password}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      res.render('register', {data: data_temporary, data_error: true, title:'Add New User', session: req.session})
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
