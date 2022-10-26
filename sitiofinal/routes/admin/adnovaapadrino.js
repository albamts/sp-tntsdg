var express = require('express');
var router = express.Router();
var apadraModelo = require('./../../modelos/apadraModelo');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);

//LISTO

router.get('/', function (req, res, next) {
    res.render('admin/adnovaapadrino', {
        layout: 'admin/layout',
        nombre: req.session.nombre
    });
});

//esto esta andando ;;-;;
router.post('/agregarapa', async (req, res, next) => {
    try {
        var foto_i = '';
        if (req.files && Object.keys(req.files).length > 0){
            imagen = req.files.imagen;
            foto_i = (await uploader(imagen.tempFilePath)).public_id;
        }
        if (req.body.nombre != "" && req.body.especie != "" && req.body.adicion != "") {
          await apadraModelo.agregarPadrinable({
            ...req.body,
            foto_i
        });
            res.render('admin/adnovaapadrino', {
                layout: 'admin/layout',
                nombre: req.session.nombre,
                mensaje: 'Agregado exitosamente.'
            });
        }    
      } catch (error) {
        console.log(error);
        res.render('admin/adnovaapadrino', {
          nombre: req.session.nombre,
          error: true, message: 'No se pudo agregar el animal.'
        }); 
      }
});


module.exports = router;