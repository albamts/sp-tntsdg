var express = require('express');
var router = express.Router();
var resenaMod = require('./../mods/resenaMod');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var resenas = await resenaMod.getAllResenas();
  res.render('index', {
    title: 'Criticas Gastronomicas',
    resenas,
  });
});

module.exports = router;
