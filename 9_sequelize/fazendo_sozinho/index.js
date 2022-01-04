import express from 'express';
import { engine } from 'express-handlebars';
import { sequelize as conn } from './db/conn.js';
import { User } from './Models/User.js';
import { user_router } from './routes/users.js';
import { Address } from './Models/Address.js';
import { address_router } from './routes/address.js';
 
const app = express();
const port = 3000;

//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//diretorio base css
app.use(express.static('public'));
//pegar os dados do body em JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//rota users
app.use('/users', user_router);
app.use('/address', address_router);

app.get('/', async (req, res) => {
    const users = await User.findAll({raw: true});
    res.render('home', {users});
});

conn.sync().then(() => {
    app.listen(port);
}).catch((err) => console.log(err))