require('dotenv').config();
const mysql = require('mysql12');
const inqurier = require('inquirer');
require('console.table');
var confirm = require('inqurier-confirm');

const db = mysql.createConnection (
    {
        host:'localhost',
        database: process.env.DB_name,
        user: process.env.DB_USER,
        password: process.env.DB_PW
    },
    console.log('Successfully Connected!')
);