var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('usuario/portal', {
        layout: 'usuario/layout',
        // nombre: req.session.nombre,
    });
});


module.exports = router;