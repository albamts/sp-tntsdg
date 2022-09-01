var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pedido', { title: 'M3: Pedido' });
});

module.exports = router;