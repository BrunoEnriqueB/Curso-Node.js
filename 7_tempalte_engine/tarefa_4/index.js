import express from 'express';
import { engine } from 'express-handlebars';
import { router } from './rotas/rotas.js';

const app = express();
const port = 3000;

app.engine('handlebars', engine({}))
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.use('/', router);

app.listen(port, () => {
    console.log('App rodando')
});