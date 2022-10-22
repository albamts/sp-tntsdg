var express = require('express');
var router = express.Router();
var noticiasModelo = require('./../modelos/noticiasModelo');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var noticias = await noticiasModelo.getFewNoticias();
  res.render('index', {
    nombre: req.session.nombre,
    userA: req.session.userA,
    noticias
  });  
});



router.get('/id/:i_new', async function (req, res, next) {
  var i_new = req.params.i_new;
  var notita = await noticiasModelo.verNoticia(i_new);
  var noticias = await noticiasModelo.getNoticias();
  res.render('noticias', {
    notita,
    noticias,
    tit_new: notita.titulo,
    nota_new: notita.nota,
    fe_new: notita.fecha.toLocaleDateString()
  });
});


module.exports = router;
