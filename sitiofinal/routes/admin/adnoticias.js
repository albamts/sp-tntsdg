var express = require('express');
var router = express.Router();
var noticiasModelo = require('./../../modelos/noticiasModelo');

// fijate que es asincronica esta funcion!
router.get('/', async function (req, res, next) {
    var noticias = await noticiasModelo.getNoticias();
    res.render('admin/adnoticias', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
        noticias,
        edicion: false
    });
});

router.post('/agregarnoticia', async (req, res, next) => {
    try {
        if (req.body.ntitulo != "" && req.body.nfecha != "" && req.body.nnota != "") {
          await noticiasModelo.sumarNoticia({
            titulo: req.body.ntitulo,
            fecha: req.body.nfecha,
            nota: req.body.nnota
          });
            var noticias = await noticiasModelo.getNoticias();
            res.render('admin/adnoticias', {
                layout: 'admin/layout',
                nombre: req.session.nombre,
                enviado: 'Noticia agregada exitosamente.',
                noticias
            });
        } else {
          res.render('admin/adnoticias', {
            error: true, message: 'Rellene todos los campos.'
          })        
        }    
      } catch (error) {
        console.log(error);
        res.render('admin/adnoticias', {
          error: true, message: 'No pudo guardarse la noticia.'
        }); 
      }
});

router.get('/editar/:i_new', async function (req, res, next) {
  var esta = req.params.i_new
  var esaNoticia = await noticiasModelo.verNoticia(esta);
  var noticias = await noticiasModelo.getNoticias();
  console.log(esaNoticia.fecha.toJSON().slice(0,10))
  res.render('admin/adnoticias', {
      layout: 'admin/layout',
      nombre: req.session.nombre,
      noticias,
      edicion: true,
      edi_new: esaNoticia.i_new,
      edtitulo: esaNoticia.titulo,
      edfecha:esaNoticia.fecha.toJSON().slice(0,10),
      ednota: esaNoticia.nota
  });
});

router.post('/editarnoticia', async (req, res, next) => {
  try {
      if (req.body.etitulo != "" && req.body.efecha != "" && req.body.enota != "") {
        var compi = {
          titulo: req.body.etitulo,
          fecha: req.body.efecha,
          nota: req.body.enota
        };
        var esta = req.body.ei_new;
        await noticiasModelo.modificarNoticia(compi, esta);
          var noticias = await noticiasModelo.getNoticias();
          res.render('admin/adnoticias', {
              layout: 'admin/layout',
              nombre: req.session.nombre,
              enviado: 'Cambios guardados con exito.',
              noticias,
              edicion: false
          });
      } else {
        res.render('admin/adnoticias', {
          error: true, message: 'Rellene todos los campos.'
        })        
      }    
    } catch (error) {
      console.log(error);
      var noticias = await noticiasModelo.getNoticias();
      res.render('admin/adnoticias', {
        noticias,
        edicion: false,
        error: true,
        message: 'No han podido guardarse los cambios.'
      }); 
    }
});


router.get('/borrar/:i_new', async (req, res, next) => {
  var esta = req.params.i_new;
  await noticiasModelo.borrarNoticia(esta);
  var noticias = await noticiasModelo.getNoticias();
  res.render('admin/adnoticias', {
    layout: 'admin/layout',
    nombre: req.session.nombre,
    noticias,
    enviado: 'Se ha borrado la noticia',
    edicion: false
});
});


module.exports = router;