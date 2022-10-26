var express = require('express');
var router = express.Router();
var adoptaModelo = require('./../modelos/adoptaModelo');
var nodemailer = require('nodemailer');
const { route } = require('.');

router.get('/', async function(req, res, next) {
  var adoptables = await adoptaModelo.getAdoptables();
  res.render('adopcionpedido', {
    nombre: req.session.nombre,
    adoptables
  });
});

//LISTO
router.post('/', async (req, res, next) => {

  console.log(req.body);

  var iMascota = req.body.iMascota;
  var nMascota = req.body.nMascota;
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var telefono = req.body.telefono;
  var direccion = req.body.direccion;
  var mensaje = req.body.mensaje;

  var msjs = {
    to: 'alba_m90@hotmail.com',
    subject: 'LECHIGUANAS: PEDIDO DE ADOPCION',
    html: "Mensaje de " + nombre + " " + apellido + ", quiere adoptar a " + nMascota + " (id: " + iMascota + " ):<br>" + mensaje + ". <br>Deja la siguiente info para contacto <br>Telefono: " + telefono + "<br>Direccion: " + direccion + "."
  };

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(msjs);

  res.render('adopcionpedido', {
    nombre: req.session.nombre,
    enviado: 'Se envío tu mensaje.'
  });
})

module.exports = router;