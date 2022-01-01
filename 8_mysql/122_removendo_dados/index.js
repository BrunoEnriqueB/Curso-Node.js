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

app.get('/books', (req, res) => { //resgatando os dados do nosso banco
    const sql = `SELECT * FROM books`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return;
        };

        const books = data;
        res.render('books', { books })
    });
});

app.get('/book/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM books WHERE id = ${id}`;

    conn.query(sql, (err, data) => {    
        if(err) {
            console.log(err);
            return;
        };

        const book = data[0];

        res.render('book', { book })
    });
});

app.get('/book/edit/:id', (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE id = ${id}`;
    
    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const book = data[0];

        res.render(('editbook'), { book });
    })
});

app.post('/book/updatebook', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const page = req.body.pagety;

    const sql = `UPDATE books SET title='${title}', page='${page}' WHERE id=${id}`;

    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            return;
        };

        res.redirect(`/books`);
    })
});

app.post('/book/remove/:id', (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM books WHERE id=${id}`;

    conn.query(sql, (err, data) => {
        if(err) {
            console.log(err);
            return;
        }

        res.redirect('/books')
    });
});

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
        res.redirect('/books');
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
        app.listen((port), () => {
            
            console.log('App rodando!');
        });
    }
});