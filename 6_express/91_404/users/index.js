import express from 'express';
import path from 'path';

const router = express.Router();

const __dirname = path.resolve(); 
const basepath = path.join(__dirname, './templates');

router.get('/add', (req, res) => {
    res.sendFile(`${basepath}/userform.html`);
});

router.post('/save', (req, res) => {
    const name = req.body.name;
    const age = req.body.idade;
    console.log(`O nome do usuário é ${name} e ele tem ${age} anos`)
    res.sendFile(`${basepath}/userform.html`)
})

router.get('/:id', (req, res) => { //req = requisição (dado que veio quando o usuário acessou ou ele mandou) res= resposta (o que vai ser devolvido ao usuário)
    const id = req.params.id;

    //leitura da tabela users, resgatar um usuário do banco
    console.log(`Estamos buscando pelo usuário: ${id}`);
    res.sendFile(`${basepath}/users.html`)
});

export { router };