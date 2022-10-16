var pool = require('./bd');
var md5 = require('md5');


//async y await es para indicar una funcion que no se sabe cuando se va a usar
//try y catch es para manejo de errores
async function getUserAndPassword(user, password){
    try {
        var query = 'select * from ingreso where usuario = ? and pass = ? limit 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error)
    }
}
// var pool = mysql.createPool({
//     connectionLimit: 12,
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DB_NAME,
// })

// pool.query = util.promisify(pool.query);

module.exports = { getUserAndPassword };