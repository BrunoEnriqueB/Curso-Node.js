import express from 'express';
import { engine } from 'express-handlebars';
import { router } from './routes/users.js';
import { conn } from './db/conn.js';
import { User } from './models/User.js';
import { address_router } from './routes/address.js';

const app = express();
const port = 3000;

//setup do handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//css
app.use(express.static('public'));
//pegar json do body
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
//rotas users
app.use('/users', router);
app.use('/address', address_router);

app.get('/', async (req, res) => {
    const users = await User.findAll({raw: true});
    
    res.render('home', {users});
});

conn.sync().then(() => {
    console.log("Conexão feita!");
    app.listen(port);
}).catch((err) => {console.log(err)})