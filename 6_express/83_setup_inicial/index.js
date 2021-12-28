import express from "express";

const app = express(); // invocar o express
const port = 3000;

app.get('/', (req, res) => { //req = requisição (dado que veio quando o usuário acessou ou ele mandou) res= resposta (o que vai ser devolvido ao usuário)
    res.send('Olá mundo!');
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
})