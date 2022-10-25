var express = require('express');
var router = express.Router();
var apadraModelo = require('./../../modelos/apadraModelo');
var amigosModelo = require('./../../modelos/amigosModelo');
var cloudinary = require('cloudinary').v2;

router.get('/', async function(req, res, next) {
    var idUsuario = await amigosModelo.getID(req.session.userA);

    var misApadrinados = await amigosModelo.misApadrinados(idUsuario);

    var notisApa = await apadraModelo.verPocasNotasApadrinado(misApadrinados.i_ser);
  
    misApadrinados = misApadrinados.map(apadrinado => {        
      if (apadrinado.foto_i) {
        const imagen = cloudinary.url(apadrinado.foto_i, {
          width: 300,
          height: 300,
          crop: 'fill'
        });
        return {
          ...apadrinado,
          imagen,
          notisApa
        }
      } else {
        return {
          ...apadrinado,
          imagen: '/images/img_pendiente.png',
          notisApa
        }
      };      
    });

    ///fijate como levantar noticias para cada unoooo
    //capaz que con map?

    //dejo esto por si meto la pata experimentando con MAP
  
    // misApadrinados = misApadrinados.map(apadrinado => {
    //   if (apadrinado.foto_i) {
    //     const imagen = cloudinary.url(apadrinado.foto_i, {
    //       width: 300,
    //       height: 300,
    //       crop: 'fill'
    //     });
    //     return {
    //       ...apadrinado,
    //       imagen
    //     }
    //   } else {
    //     return {
    //       ...apadrinado,
    //       imagen: '/images/img_pendiente.png'
    //     }
    //   }
    // });
    
  
    res.render('usuario/portal', {
      nombre: req.session.nombre,
      userA: req.session.userA,
      misApadrinados
    });
  });


module.exports = router;