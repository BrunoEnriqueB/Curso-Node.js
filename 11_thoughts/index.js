const express = require('express');
const {engine} = require('express-handlebars');
const conn = require('./db/conn.js')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const Thought = require('./models/Thought.js');
const User = require('./models/User.js');
const routerThoughts = require('./routes/thoughtsRoutes.js');
const ThoughtController = require('./controllers/ThoughtController')
const routerAuth = require('./routes/authRoutes.js');
const AuthController = require('./controllers/AuthController.js');

const app = express();
const port = 3000;
//template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//JSON do body
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
//session middleware
app.use(
    session({
        name: "session", //nome da seção
        secret: "nosso_secret", //ajuda a proteger a senha dos usuários
        resave: false, //quando cair a seção do usuário, ele vai desconectar
        saveUninitialized: false, //tempo que dura a autenticação do usuário
        store: new FileStore({ //permite salvar as seções em arquivos no servidor
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions') //diretório
        }),
        cookie: { //cookie que vai ter no pc do usuário
            secure: false,
            maxAge: 360000, //tempo que ele dura
            expires: new Date(Date.now() + 360000), // podemos forçar ele expirar, nesse caso vai expirar em 1 dia
            httpOnly: true //o cookie vem configurado pra HTTPS, mas como vamos usar em servidor local, configuramos pra HTTP
        }
    }),
);

// flash messages
app.use(flash());
// public path
app.use(express.static('public'));
//set session to res
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});

app.use('/thoughts', routerThoughts);
app.get('/', ThoughtController.showAll);
app.use('/', routerAuth);


conn.sync().then(() => {
    app.listen(port);
}
).catch((err) => console.log(err));