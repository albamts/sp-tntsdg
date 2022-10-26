const { application } = require('express');
var express = require('express');
var router = express.Router();
var noticiasModelo = require('./../modelos/noticiasModelo');
//LISTO
router.get('/', async function (req, res, next) {
  // var noticias = await noticiasModelo.getNoticias();
  var noticias;
  var sinRes = false;
  var lastNoticia = await noticiasModelo.getLastNoticia();
  if (req.query.buscar === undefined) {
    noticias = await noticiasModelo.getNoticias();
  } else {
    noticias = await noticiasModelo.buscarNoticia(req.query.buscar);
    if(noticias.length===0){
      noticias = await noticiasModelo.getNoticias();
      sinRes = true

    }
  }
  res.render('noticias', {
    nombre: req.session.nombre,
    noticias,
    is_search: req.query.buscar !== undefined,
    sinRes,
    buscar: req.query.buscar,
    tit_new: lastNoticia.titulo,
    nota_new: lastNoticia.nota,
    fe_new: lastNoticia.fecha.toLocaleDateString()
  });
});

router.get('/id/:i_new', async function (req, res, next) {
  var i_new = req.params.i_new;
  var notita = await noticiasModelo.verNoticia(i_new);
  var noticias = await noticiasModelo.getNoticias();
  res.render('noticias', {
    nombre: req.session.nombre,
    notita,
    noticias,
    tit_new: notita.titulo,
    nota_new: notita.nota,
    fe_new: notita.fecha.toLocaleDateString()
  });
});


module.exports = router;