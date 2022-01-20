 const express = require('express');
const { engine } = require('express-handlebars');
const { main } = require('./db/conn')
const productsRouter = require('./routes/productsRoutes')

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

app.use('/products', productsRouter);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});