import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

//setup para instalar o handlebars
app.engine('handlebars', engine()); //define o handlebars como template engine
app.set('view engine', 'handlebars'); 

app.get('/', (req, res) => {
    const user = {
        name: "Bruno",
        surname: "Enrique",
        age: 18
    }

    res.render('home', {user: user}); //renderiza a view home. O segundo argumento estamos mandando dados para nossa
})

app.listen (port, () => {
    console.log('App funcionando!')
})