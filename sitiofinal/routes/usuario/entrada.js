var express = require('express');
var router = express.Router();
var amigosModelo = require('./../../modelos/amigosModelo')

router.get('/', function (req, res, next) {
    if (req.session.nombre!=""){
        res.render('admin/inicio', {
            layout: 'admin/layout',
            nombre: req.session.nombre,
        });
    }
    res.render('usuario/entrada', {
        layout: 'usuario/layout',
        userA: req.session.userA,
    });
});

router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var clave = req.body.clave;

        var data = await amigosModelo.getUserByUsernameAndPassword(usuario, clave);

        if (data != undefined) {
            req.session.id_amigueado = data.i_am;
            req.session.userA = data.usuario;
            res.redirect('/usuario/portada');
        } else {
            res.render('usuario/entrada', {
                layout : 'usuario/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/salir', function (req, res, next) {
    req.session.destroy();
    res.render('usuario/entrada', {
        layout: 'usuario/layout'
    });
});



module.exports = router;