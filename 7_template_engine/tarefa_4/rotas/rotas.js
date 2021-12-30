import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const router = express.Router();

const products = [{
    id: 1,
    name: 'teclado',
    category: 'Eletronico',
    price: 200
}, {
    id: 2,
    name: 'Mouse',
    category: 'Eletronico',
    price: 150
}, {
    id: 3,
    name: 'Mousepad',
    category: 'Eletronico',
    price: 50
}]

app.engine('handlebars', engine({
    layoutsDir: '../views',
    defaultLayout: '../views',
    partialsDir: '../views/partials'
}))
app.set('view engine', 'handlebars');

router.get('/', (req, res) => {
    res.render('inicio')
});

router.get('/home', (req, res) => {
    res.render('home', {products: products});
});

router.get('/produto/:id', (req, res) => {
    const id = req.params.id;
    const produto = products[id - 1];
    res.render(`produto`, {produto: produto});
})

export {router};