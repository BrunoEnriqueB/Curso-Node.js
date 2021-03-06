import express from 'express';
import { engine } from 'express-handlebars';
import { pool } from './db/conn.js';

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

    pool.query(sql, (err, data) => {
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
    const sql = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]
    pool.query(sql, data, (err, data) => {    
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

    const sql = `SELECT * FROM books WHERE ?? = ?`;
    const data = ['id', id]
    pool.query(sql, data, (err, data) => {
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

    const sql = `UPDATE books SET ??=?, ?? = ? WHERE ?? = ?`;
    const data = ['title', title, 'page', page, 'id', id];

    pool.query(sql, data, (err, data) => {
        if (err) {
            console.log(err);
            return;
        };

        res.redirect(`/books`);
    })
});

app.post('/book/remove/:id', (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM books WHERE ??=?`;
    const data = ['id', id];

    pool.query(sql, data, (err, data) => {
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

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
    const data = ['title', 'page', title, pagety]
    pool.query(sql, data, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/books');
    });
});


app.listen((port), () => {
    
    console.log('App rodando!');
});