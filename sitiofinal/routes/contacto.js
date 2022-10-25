var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const { route } = require('.');


router.get('/', function(req, res, next) {
  res.render('contacto', {
    nombre: req.session.nombre,
    userA: req.session.userA
  });
});

router.post('/', async (req, res, next) => {

  console.log(req.body);

  var nombre = req.body.nombre;
  var correo = req.body.correo; 
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var msjs = {
    to: 'alba_m90@hotmail.com',
    subject: 'CONTACTO LECHIGUANAS',
    html: "Mensaje de " + nombre + ": " + mensaje + ". <br>Deja la siguiente info para contacto <br>Telefono: " + telefono + "<br>EMail: " + correo 
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

  res.render('contacto', {
    enviado: 'Se envío tu mensaje.'
  });
})

module.exports = router;