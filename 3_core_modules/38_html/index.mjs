import http from 'http';

const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200; //adicionamos o status da requisição
    res.setHeader('Contenty-Type', 'text/html'); //adicionamos o tipo de resposta que vai devolver (nesse caso HTML)
    res.end('<h1>Olá, esse é meu primeiro HTML com HTTP</h1>'); // resposta em HTML
})

server.listen(port, () => {
    console.log(`Server rodando na porta: ${port}`);
})