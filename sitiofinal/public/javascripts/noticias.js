var noticiasModelo = require('./../../modelos/noticiasModelo');
var noticias = noticiasModelo.getNoticias();


class nota {
    constructor(titulo, fecha, cuerpo){
        this.titulo = titulo;
        this.fecha = fecha;
        this.cuerpo = cuerpo;
    }
}


