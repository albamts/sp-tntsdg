var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('nosotros', {nombre: req.session.nombre});
});

module.exports = router;