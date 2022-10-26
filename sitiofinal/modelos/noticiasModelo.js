var pool = require('./bd');

async function getNoticias() {
    var query = "select * from noticias order by i_new desc";
    var rows = await pool.query(query);
    return rows;
};

// este es para la lista de indexedDB, 
async function getFewNoticias() {
    var query = "select * from noticias order by i_new desc limit 7";
    var rows = await pool.query(query);
    return rows;
};

// anda bien ;_;
async function verNoticia(i_new){
    var query = "select * from noticias where i_new=? limit 1";
    var row = await pool.query(query, [i_new]);
    return row[0];
};

async function getLastNoticia(){
    var query = "select * from noticias order by i_new desc limit 1";
    var row = await pool.query(query);
    return row[0];
};

async function sumarNoticia(suma) {
    try {
        console.log(suma)
        var query = "insert into noticias set ?";
        var rows = await pool.query(query, [suma])
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function borrarNoticia(esta) {
    var query = "delete from noticias where i_new=? ";
    var rows = await pool.query(query, [esta]);
    return rows;
};

async function modificarNoticia(bod, cual) {
    try {
        var query = "update noticias set ? where i_new=?";
        var rows = await pool.query(query, [bod, cual]);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function buscarNoticia(que) {
    var query = "select * from noticias where titulo like ? OR nota like ?";
    var rows = await pool.query(query, ['%' + que + '%', '%' + que + '%']);
    return rows;
}


module.exports = { getNoticias, verNoticia, getLastNoticia, getFewNoticias, sumarNoticia, borrarNoticia, modificarNoticia, buscarNoticia }

//asi tomamos las noticias de la BD
// por ahora aca esta todo andando