var pool = require('./bd');

async function getNoticias() {
    var query = "select * from noticias order by i_new desc";
    var rows = await pool.query(query);
    return rows;
}

// este es para la lista de indexedDB, pruebo con 2 luego pasalo a 7
async function getFewNoticias() {
    var query = "select * from noticias order by i_new desc limit 7";
    var rows = await pool.query(query);
    return rows;
}

// anda bien ;_;
async function verNoticia(i_new){
    var query = "select * from noticias where i_new=? limit 1";
    var row = await pool.query(query, [i_new]);
    return row[0];
}

module.exports = { getNoticias, verNoticia, getFewNoticias }

//asi tomamos las noticias de la BD
// por ahora aca esta todo andando