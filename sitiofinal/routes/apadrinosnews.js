var express = require('express');
var router = express.Router();
var apadraModelo = require('./../modelos/apadraModelo');

// var cloudinary = require('cloudinary').v2;

//aca tendria que mandarte de nuevo a aapdrinos si venis derecho a la direccion
router.get('/', function (req, res, next) {
    router.redirect('apadrinos');
});




module.exports = router;