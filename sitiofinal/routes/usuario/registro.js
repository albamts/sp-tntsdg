var express = require('express');
var router = express.Router();
var amigosModelo = require('./../../modelos/amigosModelo')


router.get('/', function (req, res, next) {
    if (req.session.nombre){
        res.render('admin/inicio', {
            layout: 'admin/layout',
            nombre: req.session.nombre,
        });
    } else if (req.session.userA){
        res.render('usuario/portal', {
            layout: 'usuario/layout',
            userA: req.session.userA,
        });
    };
    res.render('usuario/registro', {
        layout: 'usuario/layout',
    });
});

//REGISTRO DEL USUARIO
//---> PROBALO -->
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

        if (x === false) {
            res.render('usuario/registro', {
                layout : 'usuario/layout',
                alerta:"Error: Ingrese solo letras y numeros."
            });
        }
    };

    var noDups = await amigosModelo.noDupliquesUsuario(newUsuario);

    if (noDups) {
        res.render('usuario/registro', {
            layout : 'usuario/layout',
            alerta:"Error: Elija otro nombre de usuario."
        });
    }

    await amigosModelo.registrarUserA(newUsuario, newClave);            
    res.render('usuario/entrada', {
        layout : 'usuario/layout',
        mensaje: "Te registraste con exito."                
    });
      
});



module.exports = router;