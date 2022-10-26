var express = require('express');
var router = express.Router();
var adoptaModelo = require('../../modelos/adoptaModelo');
var cloudinary = require('cloudinary').v2;



//TODO ANDANDO
router.get('/', function (req, res, next) {
    if (i_mas==undefined) {
        res.redirect('/admin/adadopciones');
    }
});

router.post('/agregarf', async (req, res, next) => {
    try {
        let f = new Date();
        if (req.body.nombre != "" && req.body.apellido != "" && req.body.direccion != "" && req.body.celular != "" && req.body.celular_alternativo != "") {
            await adoptaModelo.registrarFamilia({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                direccion: req.body.direccion,
                celular: req.body.celular,
                celular_alternativo: req.body.celular_alternativo
            });
            var estaFam = await adoptaModelo.getLastFam();
            await adoptaModelo.registrarAdopcion({
                i_fam: estaFam.i_fam,
                i_mas: req.body.i_mas,
                fecha: f            
            });
            await adoptaModelo.marcarAdoptado(req.body.i_mas);
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
            }
            );
            var adoptados = await adoptaModelo.seeAdoptados();
            res.render('admin/adadopciones', {
                layout: 'admin/layout',
                nombre: req.session.nombre,
                adoptables,
                adoptados
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/adfamilia', {
            nombre: req.session.nombre,
            error: true, message: 'Ha ocurrido un error. No pudo registrarse la adopcion.'
        });
    }
});


module.exports = router;