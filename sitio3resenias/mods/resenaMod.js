var pool = require('./bd');

async function getAllResenas() {
    var query = "select * from gourmet order by id_n desc";
    var rows = await pool.query(query);
    return rows;
}

//este va a ser para elegir la reseña especifica
async function getThatResena(esta) {
    var query = "select * from gourmet where id_n=? limit 1";
    var row = await pool.query(query, [esta]);
    return row[0];
}

async function deleteResena(esta) {
    var query = "delete from gourmet where id_n=? ";
    var rows = await pool.query(query, [esta]);
    return rows;
}

// las opciones de añadir y modificar tienen que tener manejo de errores!
async function agregarResena(suma) {
    try {
        console.log(suma)
        var query = "insert into gourmet set ?";
        var rows = await pool.query(query, [suma])
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//este es para la edicion de criticas
async function editarResena(suma, esta) {
    try {
        var query = "update gourmet set ? where id_n=?";
        var rows = await pool.query(query, [suma, esta]);
        return rows;
    } catch (error) {
        throw error;
    }

}

module.exports = { getAllResenas, getThatResena, deleteResena, agregarResena, editarResena }

