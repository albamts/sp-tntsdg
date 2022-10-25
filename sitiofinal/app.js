var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var fileUpload = require('express-fileupload');

require('dotenv').config();
var pool = require('./modelos/bd');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var inicioRt = require('./routes/admin/inicio');
var adopcionesRt = require('./routes/adopciones');
var contactoRt = require('./routes/contacto');
var nosotrosRt = require('./routes/nosotros');
var noticiasRt = require('./routes/noticias');
var apadrinosRT = require('./routes/apadrinos');
var adopformRt = require('./routes/adopcionpedido');
var controlRt = require('./routes/admin/control');
var anoticiasRt = require('./routes/admin/adnoticias');
var adadoptaRt = require('./routes/admin/adadopciones');
var adpadrinaRt = require('./routes/admin/adapadrinos');
var adfamiliaRT = require('./routes/admin/adfamilia');
var adnovapadrinoRt = require('./routes/admin/adnovaapadrino');
var adnovamascotaRt = require('./routes/admin/adnovamascota');
var admodificarRt = require('./routes/admin/admodificar');
var usentradadRt = require('./routes/usuario/entrada');
var usregistrodRt = require('./routes/usuario/registro');
var usportaldRt = require('./routes/usuario/portal');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret: 'a0akuytyr909w0kfdaksjd0q9wntnr90a0sw89q',
  resave: false,
  saveUninitialized: true
}));

secured = async(req, res, next) => {
  try{
    console.log(req.session.id_logueado);
    if(req.session.id_logueado){
      next();
    } else {
      res.redirect('/admin/inicio');
    }
  } catch(error) {
    console.log(error);
  }

};

//esta va a ser para las userA
securato = async(req, res, next) => {
  try{
    console.log(req.session.id_amigueado);
    if(req.session.id_amigueado){
      next();
    } else {
      res.redirect('/usuario/entrada');
    }
  } catch(error) {
    console.log(error);
  }

};

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/adopciones', adopcionesRt);
app.use('/contacto', contactoRt);
app.use('/nosotros', nosotrosRt);
app.use('/noticias', noticiasRt);
app.use('/apadrinos', apadrinosRT);
app.use('/adopcionpedido', adopformRt);
app.use('/admin/inicio', inicioRt);
app.use('/admin/control', secured, controlRt);
app.use('/admin/adnoticias', secured, anoticiasRt);
app.use('/admin/adadopciones', secured, adadoptaRt);
app.use('/admin/adapadrinos', secured, adpadrinaRt);
// ada aca a abajo van todos ocn secured luego!!
app.use('/admin/adfamilia', adfamiliaRT);
app.use('/admin/adnovaapadrino', adnovapadrinoRt);
app.use('/admin/adnovamascota', adnovamascotaRt);
app.use('/admin/admodificar', admodificarRt);
// de aca arriba van con secured, abajo van con securato
app.use('/usuario/entrada', usentradadRt);
app.use('/usuario/registro', usregistrodRt);
app.use('/usuario/portal', usportaldRt);
//app.use('/usuario/portal', securato, usportaldRt);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
