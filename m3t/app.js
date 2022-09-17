var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')

var indexRouter = require('./routes/index');

//propiooos
var productosRuta = require('./routes/productos');
var requisitosRuta = require('./routes/requisitos');
var pedidoRuta = require('./routes/pedido');
var perfilRuta = require('./routes/perfil');

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
  secret: 'aslkj23poeru432i777wmdla998ssccv8123a',
  resave: false,
  saveUninitialized: true
}));

// app.use('/', indexRouter);

///para contar vistas - visitas? funciona en
// sesion y leugo reinicia
app.use(function(req, res, next) {
  if (!req.session.visita) {
    req.session.visita = {};
  }
  if (!req.session.visita[req.originalUrl]){
    req.session.visita[req.originalUrl] = 1;
  } else {
    req.session.visita[req.originalUrl]++;
  }

  next();
});

app.get('/', function(req, res) {
  var afiliado = Boolean(req.session.quien);

  res.render('index', {
    title: 'Inicio',
    afiliado: afiliado,
    quien: req.session.quien
  });
});

// hasta aprender a hacer logins
app.get('/perfil', function(req, res) {
  var afiliado = Boolean(req.session.quien);

  res.render('perfil', {
    title: 'Perfil',
    afiliado: afiliado,
    quien: req.session.quien,
    visita: req.session.visita[req.originalUrl]
  });
});
// -------------------

app.post('/ingreso', function(req, res) {
  if (req.body.quien) {
    req.session.quien = req.body.quien
  }
  res.redirect('/');
});

app.get('/terminar', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

//mas propios
app.use('/productos', productosRuta);
app.use('/requisitos', requisitosRuta);
app.use('/pedido', pedidoRuta);
app.use('/perfil', perfilRuta);

app.use('/fin', function(req,res){
  res.send('<h1>Fin</h1><p><a href="/">........?</a></p>')
})


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
