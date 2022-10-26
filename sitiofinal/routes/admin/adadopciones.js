var express = require('express');
var router = express.Router();
var adoptaModelo = require('../../modelos/adoptaModelo');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const destroy = util.promisify(cloudinary.uploader.destroy);

//TODO ANDANDO
router.get('/', async function (req, res, next) {
    var adoptables = await adoptaModelo.getAdoptables();
    adoptables = adoptables.map(adoptani => {
        if (adoptani.chicos===1) {
          var apchicos = 'Si'      
        } else {
          var apchicos = 'No'      
        };
        if (adoptani.animales===1) {
          var apanimales = 'Si'
        } else {
          var apanimales = 'No'
        }
        if (adoptani.foto_i) {
          const imagen = cloudinary.url(adoptani.foto_i, {
            width: 60,
            crop: 'fill'
          });
          return {
            ...adoptani,
            apchicos,
            apanimales,
            imagen
          }
        } else {
          return {
            ...adoptani,
            apchicos,
            apanimales,
            imagen: '/images/img_pendiente.png'
          }
        }
      });
    var adoptados = await adoptaModelo.seeAdoptados();
    adoptados = adoptados.map(adoptana => {
      if (adoptana.foto_i) {
        const imagen = cloudinary.url(adoptana.foto_i, {
          width: 60,
          crop: 'fill'
        });
        return {
          ...adoptana,
          imagen
        }
      } else {
        return {
          ...adoptana,
          imagen: '/images/img_pendiente.png'
        }
      }
    });
    res.render('admin/adadopciones', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
        adoptables,
        adoptados
    });
});

//con este se elimina el registro de la mascota
//__listo
router.get('/borrar/:i_mas', async (req, res, next) => {
    var esta = req.params.i_mas;

    let estaFoto = await adoptaModelo.selectAdoptable(esta);
    if (estaFoto.foto_i) {
      await (destroy(estaFoto.foto_i));
    }

    await adoptaModelo.quitarAdoptable(esta);
    var adoptables = await adoptaModelo.getAdoptables();
    adoptables = adoptables.map(adoptani => {
        if (adoptani.foto_i) {
          const imagen = cloudinary.url(adoptani.foto_i, {
            width: 60,
            crop: 'fill'
          });
          return {
            ...adoptani,
            imagen
          }
        } else {
          return {
            ...adoptani,
            imagen: '/images/img_pendiente.png'
          }
        }
      });
    var adoptados = await adoptaModelo.seeAdoptados();
    adoptados = adoptados.map(adoptana => {
      if (adoptana.foto_i) {
        const imagen = cloudinary.url(adoptana.foto_i, {
          width: 60,
          crop: 'fill'
        });
        return {
          ...adoptana,
          imagen
        }
      } else {
        return {
          ...adoptana,
          imagen: '/images/img_pendiente.png'
        }
      }
    });
    res.render('admin/adadopciones', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
        adoptables,
        adoptados,
        mensaje: 'Se ha eliminado el registro.'
    });
  });

//con este se elimina a la Familia, tambien libera a la mascota como no adoptada otra vez
//LISTO
router.get('/borrarf/:i_fam/:i_mas', async (req, res, next) => {
  var esta = req.params.i_fam;
  var qsta = req.params.i_mas;
  await adoptaModelo.quitarFamiliar(esta);
  await adoptaModelo.quitarAdopcion(esta, qsta);
  await adoptaModelo.marcarEnAdopcion(qsta);
  var adoptables = await adoptaModelo.getAdoptables();
  adoptables = adoptables.map(adoptani => {
      if (adoptani.foto_i) {
        const imagen = cloudinary.url(adoptani.foto_i, {
          width: 60,
          crop: 'fill'
        });
        return {
          ...adoptani,
          imagen
        }
      } else {
        return {
          ...adoptani,
          imagen: '/images/img_pendiente.png'
        }
      }
    });
  var adoptados = await adoptaModelo.seeAdoptados();
  adoptados = adoptados.map(adoptana => {
    if (adoptana.foto_i) {
      const imagen = cloudinary.url(adoptana.foto_i, {
        width: 60,
        crop: 'fill'
      });
      return {
        ...adoptana,
        imagen
      }
    } else {
      return {
        ...adoptana,
        imagen: '/images/img_pendiente.png'
      }
    }
  });
  res.render('admin/adadopciones', {
      layout: 'admin/layout',
      nombre: req.session.nombre,
      adoptables,
      adoptados,
      mensaje: 'Se ha eliminado el registro y devuelto el animal a adoptables.'
  });
});

// Con este, se va hacia el formulario de registro de adopcion
//__listo
router.get('/adoptado/:i_mas', async (req, res, next) => {
  var este = req.params.i_mas
  var adoptado = await adoptaModelo.selectAdoptable(este);
  res.render('admin/adfamilia', {
    layout: 'admin/layout',
    nombre: req.session.nombre,
    i_mas: adoptado.i_mas,
    mascota: adoptado.nombre,
  });
});


// con este se va a modificar MASCOTA
//---> PROBALO ----->
router.get('/modificarm/:i_mas', async (req, res, next) => {
  try {
    var i_mas = req.params.i_mas;
    var eseMascota = await adoptaModelo.selectAdoptable(i_mas);
    res.render('admin/admodificar', {
      nombre: req.session.nombre,
      mi_mas: eseMascota.i_mas,
      mnombre: eseMascota.nombre,
      mespecie: eseMascota.especie,
      medad: eseMascota.edad,
      mdescripcion: eseMascota.descripcion,
      mchicos: eseMascota.chicos,
      manimales: eseMascota.animales,
      msalud: eseMascota.salud,
      mfoto_i: eseMascota.foto_i,
      edmascota: true
    });
    

  } catch (error) {
    console.log(error);

  }
  
});


// con este se va a modificar FAMILIA
//LISTO
router.get('/modificarf/:i_fam', async (req, res, next) => {
  try {
    var i_fam = req.params.i_fam;
    var eseFamiliar = await adoptaModelo.selectFamilia(i_fam);
    console.log(eseFamiliar);
    res.render('admin/admodificar', {
      nombre: req.session.nombre,
      fi_fam: eseFamiliar.i_fam,
      fnombre: eseFamiliar.nombre,
      fapellido: eseFamiliar.apellido,
      fdireccion: eseFamiliar.direccion,
      fcelular: eseFamiliar.celular,
      fcelular_alternativo: eseFamiliar.celular_alternativo,
      edfamilia: true
    });    

  } catch (error) {
    console.log(error);

  }
  
});

module.exports = router;