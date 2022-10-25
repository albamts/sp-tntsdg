var express = require('express');
var router = express.Router();
var apadraModelo = require('./../../modelos/apadraModelo');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const destroy = util.promisify(cloudinary.uploader.destroy);

// fijate que es asincronica esta funcion!
router.get('/', async function (req, res, next) {
    var apadrinos = await apadraModelo.getApadrinados();
    apadrinos = apadrinos.map(apas => {
        if (apas.foto_i) {
          const imagen = cloudinary.url(apas.foto_i, {
            width: 60,
            crop: 'fill'
          });
          return {
            ...apas,
            imagen
          }
        } else {
          return {
            ...apas,
            imagen: '/images/img_pendiente.png'
          }
        }
      });
    res.render('admin/adapadrinos', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
        apadrinos,
        ingreso: apadrinos.adicion.toLocaleDateString()
    });
});

//para ver las noticias
//---> PROBALO -->
router.post('/verNotas/:i_ser', async function (req, res, next) {
    var i_ser = req.params.i_ser;
    var apadrinos = await apadraModelo.getApadrinados();
    var laspadrinews = await apadraModelo.verTodasNotasApadrinado(i_ser);
    var eseApadrinado = await apadraModelo.selectApadrinado(i_ser);
    res.render('admin/adapadrinos', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
        apadrinos,
        laspadrinews,
        cualApadrinado: eseApadrinado.i_ser,
        cualNombre: eseApadrinado.nombre,
        cualEspecie: eseApadrinado.especie,
        adpadrinew: true
    });

});

//para agregar noticias sobre apadrinados
//---> PROBALO -->
router.post('/agregarNotita', async function (req, res, next) {
  var i_ser = req.body.sni_ser;
  await apadraModelo.agregarNotita({
    i_ser: req.body.sni_ser,
    noticia: req.body.snota
  });
  var apadrinos = await apadraModelo.getApadrinados();
  var laspadrinews = await apadraModelo.verTodasNotasApadrinado(i_ser);
  var eseApadrinado = await apadraModelo.selectApadrinado(i_ser);
  res.render('admin/adapadrinos', {
      layout: 'admin/layout',
      nombre: req.session.nombre,
      apadrinos,
      laspadrinews,
      cualApadrinado: eseApadrinado.i_ser,
      cualNombre: eseApadrinado.nombre,
      cualEspecie: eseApadrinado.especie,
      mensaje: 'Agregado con exito.',
      adpadrinew: true
  });

});

//para eliminar apadrinado con todas sus notas
//---> PROBALO -->
router.get('/borrar/:i_ser', async (req, res, next) => {
  var este = req.params.i_ser;

  let esteFoto = await apadraModelo.selectApadrinado(este);
  if (esteFoto.foto_i) {
    await (destroy(esteFoto.foto_i));
  }

  await apadraModelo.quitarApadrinado(este);
  await apadraModelo.quitarAllNotasDeApadrinado(este);
  var apadrinos = await apadraModelo.getApadrinados();
    apadrinos = apadrinos.map(apas => {
        if (apas.foto_i) {
          const imagen = cloudinary.url(apas.foto_i, {
            width: 60,
            crop: 'fill'
          });
          return {
            ...apas,
            imagen
          }
        } else {
          return {
            ...apas,
            imagen: '/images/img_pendiente.png'
          }
        }
      });
  res.render('admin/adapadrinos', {
      layout: 'admin/layout',
      nombre: req.session.nombre,
      apadrinos,
      ingreso: apadrinos.adicion.toLocaleDateString(),
      mensaje: 'Se ha eliminado el apadrinado y sus notas.'
  });
});


//Para borrar notas en particular
//---> PROBALO -->
router.get('/borrarnota/:i_snew', async (req, res, next) => {
  var este = req.params.i_snew;
  await apadraModelo.borrarNotaApadrinado(este);
  var apadrinos = await apadraModelo.getApadrinados();
    apadrinos = apadrinos.map(apas => {
        if (apas.foto_i) {
          const imagen = cloudinary.url(apas.foto_i, {
            width: 60,
            crop: 'fill'
          });
          return {
            ...apas,
            imagen
          }
        } else {
          return {
            ...apas,
            imagen: '/images/img_pendiente.png'
          }
        }
      });
  res.render('admin/adapadrinos', {
      layout: 'admin/layout',
      nombre: req.session.nombre,
      apadrinos,
      ingreso: apadrinos.adicion.toLocaleDateString(),
      mensaje: 'Se eliminó la nota.'
  });
});


//para mandar a modificar apadrinado
//---> PROBALO -->
router.get('/modificar/:i_ser', async (req, res, next) => {
  try {
    let i_ser = req.params.i_ser;
    let eseApadrino = await apadraModelo.selectApadrinado(i_ser);
    res.render('admodificar', {
      si_ser: eseApadrino.i_ser,
      snombre: eseApadrino.nombre,
      sespecie: eseApadrino.especie,
      sfoto_i: eseApadrino.foto_i,
      // esto es para que me lo levante el date picker del formulario
      sadicion: eseApadrino.adicion.toJSON().slice(0,10),
      edpadrino: true
    });
    

  } catch (error) {
    console.log(error);

  }
  
});


module.exports = router;