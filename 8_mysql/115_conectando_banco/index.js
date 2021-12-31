import express from 'express';
import { engine } from 'express-handlebars';
import mysql from 'mysql';

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
})

const conn = mysql.createConnection({ //conectando com o banco
    host: 'localhost',
    port: '3312',
    user: 'root',
    password: '',
    database: 'curso_node'
})

conn.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Conectou ao MySQL!');
        app.listen((port), () => {
            console.log('App rodando!');
        })
    }
})