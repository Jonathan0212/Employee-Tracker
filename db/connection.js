require('dotenv').config();
const mysql = require('mysql2');


const db = mysql.createConnection (
    {
        host:'localhost',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PW
    },
    console.log('Successfully Connected!')
);
connection.connect=((err) => {if(err) throw err;});

module.exports = connection;