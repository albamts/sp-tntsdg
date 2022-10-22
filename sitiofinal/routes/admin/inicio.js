var express = require('express');
var router = express.Router();
var usuariosModelo = require('./../../modelos/usuariosModelo');

router.post('/', async (req, res, next) => {
    try {
        var quien = req.body.quien;
        var clave = req.body.clave;

        var data = await usuariosModelo.getUserByUsernameAndPassword(quien, clave);

        if (data != undefined) {
            req.session.id_logueado = data.i_aux;
            req.session.nombre = data.quien;
            res.redirect('/admin/control');
        } else {
            res.render('admin/inicio', {
                layout : 'admin/layout',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/', function (req, res, next) {
    if (req.session.userA!=""){
        res.render('usuario/inicio', {
            layout: 'usuario/layout',
            userA: req.session.userA,
        });
    };
    res.render('admin/inicio', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
    });
});

router.get('/salir', function (req, res, next) {
    req.session.destroy();
    res.render('admin/inicio', {
        layout: 'admin/layout'
    });
});



module.exports = router;