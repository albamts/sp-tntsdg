var pool = require('./bd');

async function getApadrinados() {
    var query = "select * from padrinados order by i_ser desc";
    var rows = await pool.query(query);
    return rows;
};

async function agregarPadrinable(suma) {
    try {
        console.log(suma)
        var query = "insert into padrinados set ?";
        var rows = await pool.query(query, [suma])
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


async function quitarApadrinado(este) {
    var query = "delete from padrinados where i_ser=? ";
    var rows = await pool.query(query, [este]);
    return rows;
};

async function quitarAllNotasDeApadrinado(este) {
    var query = "delete from padrinews where i_ser=? ";
    var rows = await pool.query(query, [este]);
    return rows;
};


async function borrarNotaApadrinado(este) {
    var query = "delete from padrinews where i_snew=? ";
    var rows = await pool.query(query, [este]);
    return rows;
};

async function selectApadrinado(ese) {
    var query = "select * from padrinados where i_ser=? limit 1 ";
    var row = await pool.query(query, [ese]);
    return row[0];
};

async function verTodasNotasApadrinado(este) {
    var query = "select * from padrinews where i_ser=? order by i_snew desc";
    var rows = await pool.query(query, [este]);
    return rows;
}

async function agregarNotita(suma) {
    try {
        console.log(suma)
        var query = "insert into padrinews set ?";
        var rows = await pool.query(query, [suma])
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function modificarPadrinable(bod, cual) {
    try {
        var query = "update padrinados set ? where i_ser=?";
        var rows = await pool.query(query, [bod, cual]);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function verPocasNotasApadrinado(este) {
    var query = "select * from padrinews where i_ser=? order by i_snew desc limit 5";
    var rows = await pool.query(query, [este]);
    return rows;
}

// async function getNotasApadri {

// }

module.exports = { getApadrinados, agregarPadrinable, quitarApadrinado, quitarAllNotasDeApadrinado, borrarNotaApadrinado, selectApadrinado, verTodasNotasApadrinado, agregarNotita, modificarPadrinable, verPocasNotasApadrinado }