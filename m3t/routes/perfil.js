var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('perfil', { title: 'M3: Perfil' });
});

module.exports = router;