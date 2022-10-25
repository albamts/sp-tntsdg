var pool = require('./bd');
var md5 = require('md5');


async function getUserByUsernameAndPassword(user, password) {
    try {
        var query = "select * from amigos where usuario=? and clave=? limit 1";
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

async function registrarUserA(user, password) {
    try {
        var query = "insert into amigos (usuario, clave) VALUES (usuario=?, clave=?)";
        var rows = await pool.query(query, [user, md5(password)]);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function noDupliquesUsuario(checar) {
    try {
        var query = "select * from amigos where usuario=?";
        var rows = await pool.query(query, [checar]);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function misApadrinados(quien) {
    try {
        var query = "select * from misapadrinados where i_am=?";
        var rows = await pool.query(query, [quien]);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function getID(quien) {
    try {
        var query = "select amigos.i_am from amigos where usuario=?";
        var rows = await pool.query(query, [quien]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = { getUserByUsernameAndPassword, registrarUserA, noDupliquesUsuario, misApadrinados, getID }