import http from 'http';

const port = 3000; // a gente cria uma constante pra porta do servidor

const server = http.createServer((req, res) => { //cria o servidor e utilizamos os argunmentos req de request e res de resposta, para podemos conversar com as requisições do usuário
    res.write('Oi HTTP') // manda uma mensagem escreta para o usuário
    res.end() // finaliza a resposta
})

server.listen(port, () => { //fazemos o servidor "ouvir" a rota e o segundo argumento é o call back
    console.log(`Servidor rodando na porta: ${port}`)
})