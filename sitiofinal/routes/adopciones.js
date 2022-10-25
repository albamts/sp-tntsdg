var express = require('express');
var router = express.Router();
var adoptaModelo = require('./../modelos/adoptaModelo');

var cloudinary = require('cloudinary').v2;

router.get('/', async function(req, res, next) {
  var adoptable = await adoptaModelo.getAdoptables();

  adoptable = adoptable.map(adop => {
    if (adop.foto_i) {
      const imagen = cloudinary.url(adop.foto_i, {
        width: 240,
        height: 240,
        crop: 'fill'
      });
      const bigimagen = cloudinary.url(adop.foto_i, {
        width: 400,
        height: 400,
        crop: 'fill'
      });
      return {
        ...adop,
        imagen,
        bigimagen
      }
    } else {
      return {
        ...adop,
        imagen: '/images/img_pendiente.png',
        bigimagen: '/images/img_pendiente.png'
      }
    }
  });


  res.render('adopciones', {
    nombre: req.session.nombre,
    userA: req.session.userA,
    adoptable
  });
});

//---> PROBALO -->
router.get('/link/:i_mas', async function(req, res, next) {
  var cual = req.params.i_mas;
  var este = await adoptaModelo.selectAdoptable(cual);
  var adoptables = await adoptaModelo.getAdoptables();
  res.render('adopcionpedido', {
    nombre: req.session.nombre,
    userA: req.session.userA,
    idMascota: este.i_mas,
    nMascota: este.nombre,
    adoptables
  });
});


module.exports = router;