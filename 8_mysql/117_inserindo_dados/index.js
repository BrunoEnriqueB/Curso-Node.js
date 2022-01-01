import express from 'express';
import { engine } from 'express-handlebars';
import mysql from 'mysql';

const app = express();
const port = 3000;

app.use( //configurar o express para pegar os dados do body
    express.urlencoded({
        extended: true
    })
);
app.use(express.json()); //pegar o body em JSON

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/books/insertbook', (req, res) => { //rota para inserir dados
    const title = req.body.title;
    const pagety = req.body.pagety;

    const sql = `INSERT INTO books (title, page) VALUES ('${title}', '${pagety}')`;
    conn.query(sql, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

const conn = mysql.createConnection({ //conectando com o banco
    host: 'localhost',
    port: '3312',
    user: 'root',
    password: '',
    database: 'curso_node'
});

conn.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Conectou ao MySQL!');
        app.listen((port), () => {
            console.log('App rodando!');
        });
    }
});