var express = require('express');
var router = express.Router();
var noticiasModelo = require('./../../modelos/noticiasModelo');

// fijate que es asincronica esta funcion!
router.get('/', async function (req, res, next) {
    var noticias = await noticiasModelo.getNoticias();
    res.render('admin/adnoticias', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
        noticias
    });
});


router.get('/admin/adnoticias/borrar')


module.exports = router;