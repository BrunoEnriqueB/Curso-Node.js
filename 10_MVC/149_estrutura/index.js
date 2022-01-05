import express from 'express';
import { conn } from './db/conn.js';
import { engine } from 'express-handlebars';
import { Task } from './models/Task.js';
import { router } from './routes/taskRoutes.js';

const app = express();
const port = 3000;

//seta o handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//seta a pasta do css
app.use(express.static('public'));
//seta body em json
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/tasks', router);

conn.sync().then(() => {
    app.listen(port);
}).catch((err) => {console.log(err)});
