const mysql = require('mysql');

function connect(){
    var connection = mysql.createConnection({
        multipleStatements: true,
        host     : 'localhost',
        user     : 'siddhant',
        password : 'asdqwe99',
        database : 'connexis-test'
    });
    console.log('Successfull Database CONNECTION');
    connection.connect();
    return connection;
}

module.exports = {
    connect : connect
};