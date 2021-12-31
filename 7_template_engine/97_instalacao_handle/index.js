import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

//setup para instalar o handlebars
app.engine('handlebars', engine()); //define o handlebars como template engine
app.set('view engine', 'handlebars'); 

app.get('/', (req, res) => {
    res.render('home', { layout: false }); //renderiza a view home
})

app.listen (port, () => {
    console.log('App funcionando!')
})