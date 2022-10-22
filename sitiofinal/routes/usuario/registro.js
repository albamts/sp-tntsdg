var express = require('express');
var router = express.Router();
var amigosModelo = require('./../../modelos/amigosModelo')


router.get('/', function (req, res, next) {
    if (req.session.nombre!=""){
        res.render('admin/inicio', {
            layout: 'admin/layout',
            nombre: req.session.nombre,
        });
    } else if (req.session.userA!=""){
        res.render('usuario/inicio', {
            layout: 'usuario/layout',
            userA: req.session.userA,
        });
    };
    res.render('usuario/registro', {
        layout: 'usuario/layout',
        // nombre: req.session.nombre,
    });
});


router.post('/', async (req, res, next) => {
    
    var newUsuario = req.body.nuevoUser;
    var newClave = req.body.nuevaClave;
    var chkClave = req.body.nuevaRClave
    var checar = [newUsuario, newClave];

    if (newClave != chkClave){
        res.render('usuario/registro', {
            layout : 'usuario/layout',
            alerta: "Error: Claves no coincidentes."
        });
    }

    for (var i = 1; i<3; i++) {
        var w = checar[i-1];
        var x = Boolean(w.match(/^[A-Za-z0-9]*$/));
        console.log(checar[i-1]);
        console.log(x);

        if (x == false) {
            res.render('usuario/registro', {
                layout : 'usuario/layout',
                alerta:"Error: Ingrese solo letras y numeros."
            });
        } else if (w.length > 90) {
            res.render('usuario/registro', {
                layout : 'usuario/layout',
                alerta:"Error: No sobrepase las 90 letras."
            });
        } else {
            res.render('usuario/registro', {
                layout : 'usuario/layout',
                alerta: "Success!!"
            });

        }
    //   falta terminar que no estas registrando a nadies ajaja  
    };
});



module.exports = router;