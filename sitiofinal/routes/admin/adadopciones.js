var express = require('express');
var router = express.Router();
// cambia el modelo!!
var noticiasModelo = require('../../modelos/noticiasModelo');

// fijate que es asincronica esta funcion!
router.get('/', async function (req, res, next) {
    //var noticias = await noticiasModelo.getNoticias();
    res.render('admin/adadopciones', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
    });
});



module.exports = router;