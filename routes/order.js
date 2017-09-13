var express = require('express');
var router = express.Router();
const models = require('../models')

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('order');
});

router.get('/addorder', (req,res) => {
    res.render('billdetails')
})

module.exports = router;
