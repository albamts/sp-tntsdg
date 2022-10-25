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
    userA: req.session.userA,
    apadrinados
  });
});


router.get('/link/:id', async function (req, res, next) {
  var i_ser = req.params.i_ser;
  if (req.session.userA) {
    // llamar a lo que sea que use para agregar apadrinados al user
    
  } else {
    if (req.session.userA){
        res.render('usuario/portal', {
            layout: 'usuario/layout',
            userA: req.session.userA,
        });
    };
    res.render('usuario/registro', {
        layout: 'usuario/layout',
    });

    
  }
  
});

module.exports = router;