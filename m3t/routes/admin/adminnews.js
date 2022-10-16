var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin/adminnews', {
        title: 'ACCESO RESTRINGIDO',
        layout: 'admin/layout',
    });
});

module.exports = router;