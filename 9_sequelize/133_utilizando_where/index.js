import express from 'express';
import { engine } from 'express-handlebars';
import { sequelize as conn } from './db/conn.js';
import { User } from './models/User.js';

const app = express();
const port = 3000;
//configura o handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//configra pasta padrão do css
app.use(express.static('public'));
//configurar o express para pegar os dados do body
app.use(express.urlencoded({
    extended: true
}))
//pegar o body em JSON
app.use(express.json()); 

app.get('/users/create',  (req, res) => {
    res.render('adduser');
})

app.post('/users/create', async (req, res) => { //determinado a função como assincrona
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.create({name, occupation, newsletter}); //passando a criação de uma nova row no banco de dados com esses dados
    //A gente coloca await pra esperar a criação do usuário para poder redirecionar a página
    res.redirect('/');
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({raw: true, where:  { id:id }});

    res.render('userview', { user });
});

app.get('/', async (req, res) => {

    const users = await User.findAll({raw: true});
    res.render('home', { users: users });
});

conn.sync().then(() => {
    app.listen(port);
}).catch((err) => console.log(err))