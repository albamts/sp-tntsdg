var express = require('express');
var router = express.Router();
var apadraModelo = require('./../../modelos/apadraModelo');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const destroy = util.promisify(cloudinary.uploader.destroy);

//TODO ANDANDO
router.get('/', async function (req, res, next) {
    var apadrinos = await apadraModelo.getApadrinados();
    apadrinos = apadrinos.map(apas => {
        var ingreso = apas.adicion.toLocaleDateString()
        if (apas.foto_i) {
          const imagen = cloudinary.url(apas.foto_i, {
            width: 60,
            crop: 'fill'
          });
          return {
            ...apas,
            ingreso,
            imagen
          }
        } else {
          return {
            ...apas,
            ingreso,
            imagen: '/images/img_pendiente.png'
          }
        }
      });
    res.render('admin/adapadrinos', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
        apadrinos
    });
});

//para ver las noticias
//LISTO
router.post('/mostrarNotas', async function (req, res, next) {
    var i_ser = req.body.elegiAP;
    var apadrinos = await apadraModelo.getApadrinados();
    apadrinos = apadrinos.map(apas => {
        var ingreso = apas.adicion.toLocaleDateString()
        if (apas.foto_i) {
          const imagen = cloudinary.url(apas.foto_i, {
            width: 60,
            crop: 'fill'
          });
          return {
            ...apas,
            ingreso,
            imagen
          }
        } else {
          return {
            ...apas,
            ingreso,
            imagen: '/images/img_pendiente.png'
          }
        }
      });
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
//LISTO
router.post('/agregarNotita', async function (req, res, next) {
  var i_ser = req.body.sni_ser;
  await apadraModelo.agregarNotita({
    i_ser: req.body.sni_ser,
    noticia: req.body.snota
  });
  var apadrinos = await apadraModelo.getApadrinados();
  apadrinos = apadrinos.map(apas => {
      var ingreso = apas.adicion.toLocaleDateString()
      if (apas.foto_i) {
        const imagen = cloudinary.url(apas.foto_i, {
          width: 60,
          crop: 'fill'
        });
        return {
          ...apas,
          ingreso,
          imagen
        }
      } else {
        return {
          ...apas,
          ingreso,
          imagen: '/images/img_pendiente.png'
        }
      }
    });
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
//LISTO
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
    var ingreso = apas.adicion.toLocaleDateString()
    if (apas.foto_i) {
      const imagen = cloudinary.url(apas.foto_i, {
        width: 60,
        crop: 'fill'
      });
      return {
        ...apas,
        ingreso,
        imagen
      }
    } else {
      return {
        ...apas,
        ingreso,
        imagen: '/images/img_pendiente.png'
      }
    }
  });
  res.render('admin/adapadrinos', {
      layout: 'admin/layout',
      nombre: req.session.nombre,
      apadrinos,
      mensaje: 'Se ha eliminado el apadrinado y sus notas.'
  });
});


//Para borrar notas en particular
//LISTO
router.get('/borrarnota/:i_snew', async (req, res, next) => {
  var este = req.params.i_snew;
  await apadraModelo.borrarNotaApadrinado(este);
  console.log(este);
  var apadrinos = await apadraModelo.getApadrinados();
  apadrinos = apadrinos.map(apas => {
    var ingreso = apas.adicion.toLocaleDateString()
    if (apas.foto_i) {
      const imagen = cloudinary.url(apas.foto_i, {
        width: 60,
        crop: 'fill'
      });
      return {
        ...apas,
        ingreso,
        imagen
      }
    } else {
      return {
        ...apas,
        ingreso,
        imagen: '/images/img_pendiente.png'
      }
    }
  });
  res.render('admin/adapadrinos', {
      layout: 'admin/layout',
      nombre: req.session.nombre,
      apadrinos,
      mensaje: 'Se eliminó la nota.'
  });
});


//para mandar a modificar apadrinado
//LISTO
router.get('/modificar/:i_ser', async (req, res, next) => {
  try {
    let i_ser = req.params.i_ser;
    let eseApadrino = await apadraModelo.selectApadrinado(i_ser);
    res.render('admin/admodificar', {
      nombre: req.session.nombre,
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