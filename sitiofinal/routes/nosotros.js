var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('nosotros', {
    nombre: req.session.nombre,
    userA: req.session.userA,
  });
});

module.exports = router;