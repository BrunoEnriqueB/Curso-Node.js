import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

app.use(express.static('public'))

//setup para instalar o handlebars
app.engine('handlebars', engine()); //define o handlebars como template engine
app.set('view engine', 'handlebars'); 

app.get('/dashboard', (req, res) => {
    const auth = true;
    res.render('dashboard', {auth: auth});
})

app.get('/', (req, res) => {
    const user = {
        name: "Bruno",
        surname: "Enrique",
        age: 18
    }

    const auth = true;
    const aproved = false;

    res.render('home', {user: user, auth, aproved}); //renderiza a view home. O segundo argumento estamos mandando dados para nossa
})

app.listen (port, () => {
    console.log('App funcionando!')
})