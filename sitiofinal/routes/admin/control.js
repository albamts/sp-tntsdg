var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin/control', {
        layout: 'admin/layout',
        nombre: req.session.nombre,
    });
});


module.exports = router;