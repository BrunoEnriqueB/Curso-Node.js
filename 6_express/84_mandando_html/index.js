import express from "express";
import path from 'path';

const app = express(); // invocar o express
const port = 3000;
const __dirname = path.resolve(); //se não por isso daqui, o __dirname não funciona por um erro de tipagem do package.json
const basepath = path.join(__dirname, 'templates'); //entra na pasta templates para mandarmos os HTML's

app.get('/', (req, res) => { //req = requisição (dado que veio quando o usuário acessou ou ele mandou) res= resposta (o que vai ser devolvido ao usuário)
    res.sendFile(`${basepath}/index.html`);
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})