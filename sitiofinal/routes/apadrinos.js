var express = require('express');
var router = express.Router();
var apadraModelo = require('./../modelos/apadraModelo');

var cloudinary = require('cloudinary').v2;

router.get('/', async function(req, res, next) {
  var apadrinados = await apadraModelo.getApadrinados();

  apadrinados = apadrinados.map(apadrinado => {
    if (apadrinado.foto_i) {
      const imagen = cloudinary.url(apadrinado.foto_i, {
        width: 300,
        height: 300,
        crop: 'fill'
      });
      return {
        ...apadrinado,
        imagen
      }
    } else {
      return {
        ...apadrinado,
        imagen: '/images/img_pendiente.png'
      }
    }
  });


  res.render('apadrinos', {
    nombre: req.session.nombre,
    apadrinados
  });
});

//LISTO
router.get('/link/:i_ser', async function (req, res, next) {
  var i_ser = req.params.i_ser;
  console.log(i_ser)
  var esteApadrinado = await apadraModelo.selectApadrinado(i_ser);
  var notis = await apadraModelo.verTodasNotasApadrinado(i_ser);
  
  if (esteApadrinado.foto_i) {
    var imagen = cloudinary.url(esteApadrinado.foto_i, {
      width: 480,
      height: 480,
      crop: 'fill'
    });
  } else {
    var imagen = '/images/img_pendiente.png'
  };

  res.render('apadrinosnews', {
    nombre: req.session.nombre,
    snombre: esteApadrinado.nombre,
    sespecie: esteApadrinado.especie,
    imagen,
    notis
  });


});

module.exports = router;