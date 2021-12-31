import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

app.use(express.static('public'))

//setup para instalar o handlebars
app.engine('handlebars', engine({
        partialsDir: ['views/partials']
})); //define o handlebars como template engine e junta o partials
app.set('view engine', 'handlebars'); 

app.get('/dashboard', (req, res) => {
    const auth = true;

    const items = ["Item a", "Item b", "Item c"];
    res.render('dashboard', {auth: auth, items});
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'Javascript',
        body: 'Esse artigo vai te ajudar a aprender node.js',
        comments: 4
    }

    res.render('blogpost', {post})
})

app.get('/blog', (req, res) => { //como funciona a estrutura do partials 
    const posts = [ //array de objetos
        {
            title: 'Aprender Node.js',
            category: 'Javascript',
            body: 'Esse artigo vai te ajudar a aprender node.js',
            comments: 4

        },
        {
            title: 'Aprender PHP',
            category: 'PHP',
            body: 'Esse artigo vai te ajudar a aprender PHP',
            comments: 3
        },
        {
            title: 'Aprender Python',
            category: 'Python',
            body: 'Esse artigo vai te ajudar a aprender Python',
            comments: 10
        }
    ];

    res.render('blog', {posts});
})

app.get('/', (req, res) => {
    const user = {
        name: "Bruno",
        surname: "Enrique",
        age: 18
    };

    const auth = true;
    const aproved = false;

    res.render('home', {user: user, auth, aproved}); //renderiza a view home. O segundo argumento estamos mandando dados para nossa
})

app.listen (port, () => {
    console.log('App funcionando!')
})