const mysql = require('mysql2')

require('dotenv').config()

var mysqlConfig = mysql.createConnection({
    host: process.env.SQL_SERVER,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
})

module.exports = mysqlConfig