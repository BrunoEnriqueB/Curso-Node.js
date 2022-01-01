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

app.get('/', (req, res) => {
    res.render('home');
});

conn.sync().then(() => {
    app.listen(port);
}).catch((err) => console.log(err))