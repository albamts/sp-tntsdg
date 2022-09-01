var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tarea Modulo 3: Unidad 2' });
});

module.exports = router;
