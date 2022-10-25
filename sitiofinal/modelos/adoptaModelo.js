var pool = require('./bd');

async function getAdoptables() {
    var query = "select * from adopcion where adoptado=0 order by i_mas desc";
    var rows = await pool.query(query);
    return rows;
}

async function seeAdoptados() {
    var query = "SELECT * FROM adoptados";
    var rows = await pool.query(query);
    return rows;
}

async function agregarAdoptable(suma) {
    try {
        console.log(suma)
        var query = "insert into adopcion set ?";
        var rows = await pool.query(query, [suma])
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

async function quitarAdoptable(esta) {
    var query = "delete from adopcion where i_mas=? ";
    var rows = await pool.query(query, [esta]);
    return rows;
};

async function selectAdoptable(esta) {
    var query = "select * from adopcion where i_mas=? ";
    var row = await pool.query(query, [esta]);
    return row[0];
};

async function registrarFamilia(dat1) {
    try {
        var query = "insert into familias set ?";
        var rows = await pool.query(query, [dat1])
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }    
};

async function registrarAdopcion(dat2) {
    try {
        var query = "insert into adopfam set ?";
        var rows = await pool.query(query, [dat2])
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }    
};

async function marcarAdoptado(este) {
    try {
        var query = "update adopcion set adoptado=1 where i_mas=?";
        var rows = await pool.query(query, [este]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getLastFam() {
    var query = "select * from familias order by i_fam desc";
    var row = await pool.query(query);
    return row[0];
};

async function quitarFamiliar(esta) {
    var query = "delete from familias where i_fam=? ";
    var rows = await pool.query(query, [esta]);
    return rows;
};

async function quitarAdopcion(esta, qsta) {
    var query = "delete from adopfam where i_fam=? AND i_mas=?";
    var rows = await pool.query(query, [esta, qsta]);
    return rows;
};

async function marcarEnAdopcion(este) {
    try {
        var query = "update adopcion set adoptado=0 where i_mas=?";
        var rows = await pool.query(query, [este]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function selectFamilia(esta) {
    var query = "select * from familias where i_fam=?";
    var row = await pool.query(query, [esta]);
    return row[0];
};

async function modificarAdoptable(bod, cual) {
    try {
        var query = "update adopcion set ? where i_mas=?";
        var rows = await pool.query(query, [bod, cual]);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function modificarFamilia(bod, cual) {
    try {
        var query = "update familias set ? where i_fam=?";
        var rows = await pool.query(query, [bod, cual]);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = { getAdoptables, seeAdoptados, agregarAdoptable, quitarAdoptable, selectAdoptable, registrarFamilia, registrarAdopcion, getLastFam, marcarAdoptado, quitarFamiliar, quitarAdopcion, marcarEnAdopcion, selectFamilia, modificarAdoptable, modificarFamilia }

