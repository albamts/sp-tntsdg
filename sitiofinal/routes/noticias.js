const { application } = require('express');
var express = require('express');
var router = express.Router();
var noticiasModelo = require('./../modelos/noticiasModelo');

router.get('/', async function (req, res, next) {
  var noticias = await noticiasModelo.getNoticias();
  res.render('noticias', {
    nombre: req.session.nombre,
    usuarA: req.session.usuarA,
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