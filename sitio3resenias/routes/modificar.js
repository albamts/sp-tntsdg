var express = require('express');
var router = express.Router();
var resenaMod = require('./../mods/resenaMod');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var resenas = await resenaMod.getAllResenas();
  res.render('modificar', {
    title: 'Criticas Gastronomicas',
    visa: 'oculto',
    resenas,
  });
});

router.get('/cambiar/:id_n', async (req, res, next) => {
  try {
    let id_n = req.params.id_n;
    var resenas = await resenaMod.getAllResenas();
    let esaResena = await resenaMod.getThatResena(id_n);
    //verCosa('fichaMod');
    res.render('modificar', {
      title: 'Criticas Gastronomicas',
      visa: 'visible',
      resenas,
      esaResena,
      ffecha: esaResena.fecha.toISOString().split('T')[0]
    });
    

  } catch (error) {
    console.log(error);

  }
  
});

router.get('/borrar/:id_n', async (req, res, next) => {
  var esta = req.params.id_n;
  await resenaMod.deleteResena(esta);
  var resenas = await resenaMod.getAllResenas();
  res.render('modificar', {
    title: 'Criticas Gastronomicas',
    visa: 'oculto',
    exito: 'Se ha eliminado la reseña.',
    resenas,
  });
});


router.post('/cambiar', async (req, res,next) => {
  try {
    var suma = {
      titulo: req.body.ntitulo,
      autor: req.body.nautor,
      fecha: req.body.nfecha,
      critica: req.body.ncritica,
      estrellas: req.body.nestrellas,
      tipo: req.body.ntipo,
    }
    console.log(suma)
    await resenaMod.editarResena(suma, req.body.nid_n);
    var resenas = await resenaMod.getAllResenas();
    res.render('modificar', {
      title: 'Criticas Gastronomicas',
      visa: 'oculto',
      exito: 'Editado con exito.',
      resenas,
    });
  } catch (error) {
    console.log(error)
    res.render('modificar', {
      error: true,
      message: 'No se pudieron guardar los cambios.'
    })
    
  }
})

module.exports = router;
