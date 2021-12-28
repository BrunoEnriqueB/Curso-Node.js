import express from "express";
import path from 'path';

const app = express(); // invocar o express
const port = 3000;
const __dirname = path.resolve(); //se não por isso daqui, o __dirname não funciona por um erro de tipagem do package.json
const basepath = path.join(__dirname, 'templates'); //entra na pasta templates para mandarmos os HTML's

const checkAuth = function(req, res, next) { // nossa função que verifica se o usuário está logado
    req.authStatus = false;

    if (req.authStatus) {  //verifica se está autenticado
        console.log('Está logado!');
        next(); //usamos o next para que o usuário consiga acessar a rota!
    } else {
        console.log('Nao está logado, faça o login para continuar!');
        res.send('<h1> Not Authenticated! </h1>')
    }
}

app.use(checkAuth); //Isso aqui serve para que toda requisição feita, esse middleware será usado!

app.get('/', (req, res) => { //req = requisição (dado que veio quando o usuário acessou ou ele mandou) res= resposta (o que vai ser devolvido ao usuário)
    res.sendFile(`${basepath}/index.html`);
});

app.get('notAuth', (req, res) => {
    res.sendFile(`${basepath}/notAuth.html`);
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})