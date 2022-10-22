var express = require('express');
var router = express.Router();
var resenaMod = require('./../mods/resenaMod');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var resenas = await resenaMod.getAllResenas();
  res.render('anadir', {
    title: 'Criticas Gastronomicas',
    resenas,
  });
});

router.post('/', async (req, res, next) => {
  try {
    if (req.body.titulo != "" && req.body.autor != "" && req.body.fecha != "" && req.body.tipo != "" && req.body.critica != "" && req.body.estrellas != "") {
      await resenaMod.agregarResena(req.body);
      res.redirect('/')
    } else {
      res.render('anadir', {
        error: true, message: 'Rellene todos los campos'
      })        
    }    
  } catch (error) {
    console.log(error);
    res.render('anadir', {
      error: true, message: 'No se añadió la reseña.'
    }); 
  }
});

module.exports = router;
