var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('productos', { title: 'M3: Productos' });
});

module.exports = router;