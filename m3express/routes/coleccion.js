var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>Ayyyyy mis colecciones</h1> <p>Escribi colecciones de 3 formas distintas ya, hurra!!!</p>');
});

module.exports = router;
