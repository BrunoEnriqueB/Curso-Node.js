import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: '3312',
    user: 'root',
    password: '',
    database: 'curso_node'
});

export {pool};