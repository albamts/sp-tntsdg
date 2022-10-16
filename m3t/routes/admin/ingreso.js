var express = require('express');
var router = express.Router();
var modusuarios = require('./../../modelos/modusuarios');

router.get('/', function (req, res, next) {
    res.render('admin/ingreso', {
        // title: 'ACCESO RESTRINGIDO',
        layout: 'admin/layout'
    });
});


router.post('/', async (req, res, next) => {
    try {
        
        var usuario = req.body.usuario;
        var pass = req.body.pass;

        console.log(req.body.usuario);
        console.log(req.body.pass);

        // console.log(req.body);

        var data = await modusuarios.getUserAndPassword (usuario, pass);
        if (data != undefined) {
            res.redirect('/admin/adminnews');
        } else {
            res.render('ingreso', {
                layout : 'admin/layout',
                error: true
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;